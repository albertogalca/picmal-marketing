import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) =>
  `
User-agent: *
# https://contentsignals.org/ — ai-train=yes since brand presence in LLMs helps; flip to no to opt out of training
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

# --- Reduce wasted crawl budget (Bing "Limited crawl capacity") ---
# Keep only the lines that match real paths on your site; remove the rest.
Disallow: /api/            # server/API routes — not useful to index
Disallow: /_astro/         # build assets (hashed JS/CSS)
Disallow: /*?*             # parameterized/duplicate URLs (sort, filter, tracking, etc.)
Disallow: /*&*             # extra query params
Disallow: /search          # on-site search results pages
Disallow: /404
Disallow: /*.json$         # raw JSON endpoints

# One group on purpose. A crawler that finds a group naming it ignores every
# other group (RFC 9309), so per-agent "User-agent: GPTBot / Allow: /" blocks
# would detach those bots from the Content-Signal and the disallows above —
# Bingbot included, the one the crawl-budget rules were written for. Allow is
# the default anyway, so the blocks bought nothing. Don't re-add them.

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
