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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const upstream = UPSTREAM[url.pathname];
    if (!upstream) return env.ASSETS.fetch(request);

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
