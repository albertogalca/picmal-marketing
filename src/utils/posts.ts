import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";
import { existsSync } from "node:fs";
import { join } from "node:path";

// Blog posts with a future pubDate are scheduled, not live: they're kept out of
// the listing, the routes, RSS, and (by having no page) the sitemap.
// ponytail: evaluated at build time, so a scheduled post goes live on the first
// deploy on or after its date. Add a daily Cloudflare cron build if that's not
// prompt enough.
export const getPublishedPosts = () =>
  getCollection("blog", ({ data }) => data.pubDate <= new Date());

// Every post card shows a picture. A post with no heroImage falls back to the
// shared default rather than leaving a hole in the grid, and the fallback lives
// here so the four surfaces that render post cards can't drift apart.
export const DEFAULT_COVER = "/images/blog/default.png";

// The cover (heroImage) carries the title, because it is also the OG image and a
// social preview has nothing else around it. On a card the title already sits
// under the picture, so cards use card.png instead: the same art with one big
// label and no text to read twice. scripts/generate-blog-covers.js --cards makes
// them, one colour per category; a post without one keeps its cover.
export const postCover = (post: CollectionEntry<"blog">) => {
  const card = `/images/blog/${post.id}/card.png`;
  if (existsSync(join(process.cwd(), "public", card))) return card;
  return post.data.heroImage || DEFAULT_COVER;
};

// The same card for the site's dark theme. Undefined when there is none, and
// the card then shows the light picture in both themes.
export const postCoverDark = (post: CollectionEntry<"blog">) => {
  const card = `/images/blog/${post.id}/card-dark.png`;
  return existsSync(join(process.cwd(), "public", card)) ? card : undefined;
};

// "Tutorial" and "Guide" were two names for the same kind of post, and a reader
// could not tell them apart in the filter. They show as one. Mapped here rather
// than in the frontmatter so no post file has to change.
const CATEGORY_ALIASES: Record<string, string> = { Tutorial: "Guide" };

export const displayCategory = (category?: string) =>
  category ? (CATEGORY_ALIASES[category] ?? category) : undefined;
