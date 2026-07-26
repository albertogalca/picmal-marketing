import { getCollection } from "astro:content";

// Blog posts with a future pubDate are scheduled, not live: they're kept out of
// the listing, the routes, RSS, and (by having no page) the sitemap.
// ponytail: evaluated at build time, so a scheduled post goes live on the first
// deploy on or after its date. Add a daily Cloudflare cron build if that's not
// prompt enough.
export const getPublishedPosts = () =>
  getCollection("blog", ({ data }) => data.pubDate <= new Date());
