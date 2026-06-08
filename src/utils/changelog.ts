import type { CollectionEntry } from "astro:content";
import { INDEXED_CONVERSIONS } from "../data/conversions";
import { compressions } from "../data/compressions";

type ChangelogEntry = CollectionEntry<"changelog">;

export interface RelatedLink {
  label: string;
  href: string;
}

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
  // Bare version numbers make poor, non-descriptive URLs — prefix them.
  return `picmal-${entry.data.version}`;
}

/** Path to a release's standalone page. */
export function getEntryUrl(entry: ChangelogEntry): string {
  return `/changelog/${getEntrySlug(entry)}`;
}

/** Short summary used for meta descriptions and the index list. */
export function getEntryDescription(entry: ChangelogEntry, maxLength = 155): string {
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

/** Format codes that appear in conversion slugs (uppercased for display). */
function formatLabel(code: string): string {
  return code.toUpperCase();
}

/**
 * Internal links to surface out of a standalone release page, so entries link
 * to product pages instead of becoming SEO orphans. Curated `related`
 * frontmatter comes first; the rest is auto-detected from the body and points
 * ONLY to real, indexed pages (`INDEXED_CONVERSIONS` + the compress formats).
 */
export function getRelatedLinks(
  entry: ChangelogEntry,
  max = 4,
): RelatedLink[] {
  const links: RelatedLink[] = [...(entry.data.related ?? [])];
  const seen = new Set(links.map((l) => l.href));
  const text = ` ${stripBody(entry.body ?? "").toLowerCase()} `;

  const add = (link: RelatedLink) => {
    if (seen.has(link.href)) return;
    seen.add(link.href);
    links.push(link);
  };

  // Conversions: detect "<from> to <to>" phrasing for indexed slugs only.
  for (const slug of INDEXED_CONVERSIONS) {
    if (links.length >= max) break;
    const [from, to] = slug.split("-to-");
    if (!from || !to) continue;
    if (text.includes(` ${from} to ${to} `)) {
      add({
        label: `Convert ${formatLabel(from)} to ${formatLabel(to)}`,
        href: `/convert/${slug}`,
      });
    }
  }

  // Compression: detect a format name as a whole word.
  for (const c of compressions) {
    if (links.length >= max) break;
    const re = new RegExp(`\\b${c.slug}\\b`, "i");
    if (re.test(text)) {
      add({ label: `Compress ${c.name}`, href: `/compress/${c.slug}` });
    }
  }

  return links.slice(0, max);
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
