// First-party proxy for the Affonso affiliate pixel. Content blockers kill
// direct requests to *.affonso.io, so the pixel loads and reports through the
// neutral /r prefix on our own domain. Everything else falls through to the
// static assets (dist/), where _headers and _redirects still apply.
// Docs: https://affonso.io/help/installation-guides/proxy-setup/pixel-tracking-proxy
const UPSTREAM = {
  "/r/pixel.js": "https://cdn.affonso.io/js/pixel.min.js",
  "/r/psl.min.js": "https://cdn.affonso.io/js/psl.min.js",
  "/r/track": "https://api.affonso.io/v1/track",
  "/r/signups": "https://api.affonso.io/v1/signups",
};

// Every representation below is picked by Accept, so every one of them must say
// so. Without it a CDN serves whichever variant landed in cache first to
// everyone: the HTML page to an agent asking for markdown, or the reverse.
const VARY = "Accept, Accept-Encoding";

const MARKDOWN = "text/markdown; charset=utf-8";

// Responses built here bypass _headers (which only decorates asset responses),
// and a sniffed content type is the one security header that matters for them.
const NOSNIFF = { "x-content-type-options": "nosniff" };

// Media-type quality from an Accept header, per RFC 9110 12.5.1: q defaults to
// 1, a type nobody asked for scores 0, and `text/*` or `*/*` count as an ask.
// Explicit beats wildcard only because we compare two scores and require a
// strict win, so `Accept: */*` (curl, most crawlers) keeps getting HTML.
export function quality(accept, type) {
  const family = `${type.split("/")[0]}/*`;
  let best = 0;
  for (const entry of accept.split(",")) {
    const [name, ...params] = entry.trim().split(";");
    const candidate = name.trim().toLowerCase();
    if (![type, family, "*/*"].includes(candidate)) continue;
    const q = params
      .map((p) => /^\s*q=([\d.]+)\s*$/i.exec(p))
      .find(Boolean);
    best = Math.max(best, q ? Number.parseFloat(q[1]) : 1);
  }
  return best;
}

// What the caller asked for, in the only three flavours we can produce.
function negotiate(request) {
  const accept = request.headers.get("accept") || "*/*";
  return {
    markdown: quality(accept, "text/markdown"),
    html: quality(accept, "text/html"),
    json: quality(accept, "application/json"),
  };
}

// Agents can't parse the HTML 404 page, so anything that asks for JSON gets a
// machine-readable error instead. ponytail: 404 and 406 only, because a static
// asset binding produces nothing else.
export function jsonError(url, { code, status, message }) {
  return Response.json(
    {
      error: {
        code,
        status,
        message,
        hints: [
          "picmal.app is a static site; there is no hosted conversion API.",
          "List every page: https://picmal.app/sitemap-index.xml",
          "Site summary for agents: https://picmal.app/llms.txt",
          "When to use Picmal: https://picmal.app/AGENTS.md",
          "Machine-readable endpoints: https://picmal.app/openapi.json",
        ],
      },
    },
    { status, headers: { vary: VARY, ...NOSNIFF } },
  );
}

// The markdown twin of the 404 page: a recovery map an agent can actually read,
// rather than a nav bar it has to strip tags off.
const MARKDOWN_404 = `# 404: page not found

No page exists at %PATH% on picmal.app.

Picmal is a native macOS app for converting and compressing images, video,
audio and PDFs. Everything runs on the user's Mac; there is no hosted API.

## Where to look next

- [Site summary for agents](https://picmal.app/llms.txt): what Picmal is, every important link
- [When to use Picmal](https://picmal.app/AGENTS.md): best-fit jobs and how to call the CLI
- [Sitemap](https://picmal.app/sitemap-index.xml): every indexable page
- [Machine-readable endpoints](https://picmal.app/openapi.json): OpenAPI 3.1 spec
- [Documentation](https://picmal.app/docs): full product docs
- [Blog](https://picmal.app/blog): conversion and compression guides
- [Home](https://picmal.app)
`;

function markdownResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "content-type": MARKDOWN, vary: VARY, ...NOSNIFF },
  });
}

// ASSETS response headers are immutable, so re-wrap to tag the HTML variant.
function withVary(response) {
  const tagged = new Response(response.body, response);
  tagged.headers.set("vary", VARY);
  return tagged;
}

function notFound(request, url) {
  const want = negotiate(request);
  if (want.markdown > want.html) {
    return markdownResponse(MARKDOWN_404.replace("%PATH%", url.pathname), 404);
  }
  return want.json > want.html
    ? jsonError(url, {
        code: "not_found",
        status: 404,
        message: `No resource exists at ${url.pathname}.`,
      })
    : null;
}

// Only pages are negotiable. Images, JSON and feeds have exactly one
// representation, so they must never be second-guessed (or 406'd).
function isHtml(response) {
  return (response.headers.get("content-type") || "").startsWith("text/html");
}

// `/` has no `.md` sibling of its own; its twin is the generated /index.md.
function markdownTwin(url) {
  const path = url.pathname.replace(/\/$/, "");
  return new URL(path ? `${path}.md` : "/index.md", url);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const upstream = UPSTREAM[url.pathname];
    if (!upstream) {
      const response = await env.ASSETS.fetch(request);

      if (response.status === 404) {
        return notFound(request, url) || withVary(response);
      }
      if (!isHtml(response)) return response;

      const want = negotiate(request);
      if (want.markdown > want.html) {
        const twin = await env.ASSETS.fetch(
          new Request(markdownTwin(url), request),
        );
        if (twin.status === 200) return markdownResponse(twin.body);
      }
      // Asked for something we cannot render this page as, and would not take
      // HTML either. Saying so beats shipping tags the caller told us it can't
      // read. A browser or crawler always sends text/html or */*, so it lands
      // here only on a deliberate machine request.
      if (want.html === 0) {
        return jsonError(url, {
          code: "not_acceptable",
          status: 406,
          message: `${url.pathname} is available as text/html, and as text/markdown where a .md twin exists.`,
        });
      }
      return withVary(response);
    }

    // Allowlist, not passthrough: same-origin requests carry every picmal.app
    // cookie (Seline, PostHog), which must not leak to a third party.
    const headers = new Headers();
    for (const h of ["content-type", "user-agent", "referer", "origin"]) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }
    // Without the visitor's real IP, Affonso's country data is wrong or missing.
    const ip = request.headers.get("CF-Connecting-IP");
    if (ip) headers.set("X-Real-IP", ip);

    return fetch(upstream + url.search, {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    });
  },
};
