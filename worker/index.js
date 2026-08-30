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

// Agents can't parse the HTML 404 page, so anything that asks for JSON gets a
// machine-readable error instead. ponytail: 404 only, because a static asset
// binding produces nothing else; add a status switch if the worker ever serves
// real endpoints.
export function jsonError(url) {
  return Response.json(
    {
      error: {
        code: "not_found",
        status: 404,
        message: `No resource exists at ${url.pathname}.`,
        hints: [
          "picmal.app is a static site; there is no hosted conversion API.",
          "List every page: https://picmal.app/sitemap-index.xml",
          "Site summary for agents: https://picmal.app/llms.txt",
          "Machine-readable endpoints: https://picmal.app/openapi.json",
        ],
      },
    },
    { status: 404, headers: { vary: VARY } },
  );
}

// Both 404 variants are picked by Accept, so both must say so. Without it a CDN
// serves whichever landed in cache first to everyone.
const VARY = "Accept, Accept-Encoding";

// ASSETS response headers are immutable, so re-wrap to tag the HTML variant.
function withVary(response) {
  const tagged = new Response(response.body, response);
  tagged.headers.set("vary", VARY);
  return tagged;
}

// Only when JSON is asked for by name. `Accept: */*` (curl's default) is not a
// preference, and browsers send `text/html` first, so both still get the page.
export function wantsJson(request) {
  return /\bapplication\/json\b/.test(request.headers.get("accept") || "");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const upstream = UPSTREAM[url.pathname];
    if (!upstream) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
      return wantsJson(request) ? jsonError(url) : withVary(response);
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
