import type { CollectionEntry } from "astro:content";

type ChangelogEntry = CollectionEntry<"changelog">;

// Releases with at least this many words of release notes get their own
// SEO-friendly page. Shorter patch notes stay inline on the index.
// Tune this number to grow/shrink the set of standalone pages.
export const STANDALONE_WORD_THRESHOLD = 40;

/** Turn a title into a URL-safe, hyphenated slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[''"".]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Strip MDX/markdown/HTML noise from raw body so we can count/preview text. */
function stripBody(body: string): string {
  return body
    .replace(/<[^>]+>/g, " ") // html tags (e.g. <img ... />)
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown links -> text
    .replace(/[#>*_`-]+/g, " ") // markdown punctuation / list bullets
    .replace(/\s+/g, " ")
    .trim();
}

function wordCount(body: string): number {
  const text = stripBody(body);
  return text ? text.split(" ").length : 0;
}

/** Whether a release should get its own standalone page. */
export function isStandalone(entry: ChangelogEntry): boolean {
  if (typeof entry.data.standalone === "boolean") return entry.data.standalone;
  return wordCount(entry.body ?? "") >= STANDALONE_WORD_THRESHOLD;
}

/** URL slug for a release's standalone page (descriptive, version fallback). */
export function getEntrySlug(entry: ChangelogEntry): string {
  if (entry.data.slug) return entry.data.slug;
  if (entry.data.title) return slugify(entry.data.title);
  return entry.data.version;
}

/** Path to a release's standalone page. */
export function getEntryUrl(entry: ChangelogEntry): string {
  return `/changelog/${getEntrySlug(entry)}`;
}

/** Short summary used for meta descriptions and the index list. */
export function getEntryDescription(entry: ChangelogEntry, maxLength = 160): string {
  if (entry.data.description) return entry.data.description;
  // First non-empty paragraph of the body.
  const firstBlock = (entry.body ?? "")
    .split(/\n\s*\n/)
    .map((b) => stripBody(b))
    .find((b) => b.length > 0);
  const text = firstBlock ?? entry.data.title ?? "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")}…`;
}

/** First image in a release's notes (HTML <img> or markdown), or null. */
export function getFirstImage(
  entry: ChangelogEntry,
): { src: string; alt: string } | null {
  const body = entry.body ?? "";
  const imgTag = body.match(/<img\b[^>]*>/i);
  if (imgTag) {
    const src = imgTag[0].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (src) {
      const alt = imgTag[0].match(/\balt=["']([^"']*)["']/i)?.[1] ?? "";
      return { src, alt };
    }
  }
  const md = body.match(/!\[([^\]]*)\]\(([^)\s]+)/);
  if (md) return { src: md[2], alt: md[1] };
  return null;
}

/** Sort releases newest-first (by pubDate, falling back to version). */
export function sortEntries(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort((a, b) => {
    if (a.data.pubDate && b.data.pubDate) {
      return b.data.pubDate.getTime() - a.data.pubDate.getTime();
    }
    if (a.data.pubDate) return -1;
    if (b.data.pubDate) return 1;
    return b.data.version.localeCompare(a.data.version, undefined, {
      numeric: true,
    });
  });
}
