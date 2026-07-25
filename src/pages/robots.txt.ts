import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) =>
  `
User-agent: *
# https://contentsignals.org/ — ai-train=yes since brand presence in LLMs helps; flip to no to opt out of training
Content-Signal: search=yes, ai-input=yes, ai-train=yes
Allow: /

# Never disallow /_astro/. It holds the CSS and JS every page loads, and
# blocking it makes Googlebot render the whole site unstyled. That cost ~65% of
# impressions and 10 positions between 2026-07-16 and 2026-07-24.
Disallow: /api/

# One group on purpose. A crawler that finds a group naming it ignores every
# other group (RFC 9309), so per-agent "User-agent: GPTBot / Allow: /" blocks
# would detach those bots from the Content-Signal above. Allow is the default
# anyway, so the blocks bought nothing. Don't re-add them.

Sitemap: ${sitemapURL.href}
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
