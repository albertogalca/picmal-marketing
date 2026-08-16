// First-party proxy for the Affonso affiliate pixel (Cloudflare Pages Function).
// Content blockers kill direct requests to *.affonso.io, so the pixel loads and
// reports through this neutral /r prefix on our own domain instead.
// Docs: https://affonso.io/help/installation-guides/proxy-setup/pixel-tracking-proxy
const UPSTREAM = {
  "pixel.js": "https://cdn.affonso.io/js/pixel.min.js",
  "psl.min.js": "https://cdn.affonso.io/js/psl.min.js",
  track: "https://api.affonso.io/v1/track",
  signups: "https://api.affonso.io/v1/signups",
};

export async function onRequest({ request, params }) {
  const upstream = UPSTREAM[(params.path || []).join("/")];
  if (!upstream) return new Response("Not found", { status: 404 });

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

  const url = new URL(request.url);
  return fetch(upstream + url.search, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
  });
}
