import type { CollectionEntry } from "astro:content";

type ChangelogEntry = CollectionEntry<"changelog">;

/** Turn a title into a URL-safe, hyphenated slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[''"".]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Stable anchor id for a release on the consolidated /changelog page.
 * Custom slug override, descriptive title slug, or version fallback.
 */
export function getEntrySlug(entry: ChangelogEntry): string {
  if (entry.data.slug) return entry.data.slug;
  if (entry.data.title) return slugify(entry.data.title);
  // Bare version numbers make poor, non-descriptive anchors — prefix them.
  return `picmal-${entry.data.version}`;
}

/** Sort releases newest-first by version (semver-aware numeric compare). */
export function sortEntries(entries: ChangelogEntry[]): ChangelogEntry[] {
  return [...entries].sort((a, b) =>
    b.data.version.localeCompare(a.data.version, undefined, { numeric: true }),
  );
}
