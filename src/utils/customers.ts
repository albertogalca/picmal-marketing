// "Trusted by N" social-proof count, fetched at build time from licencio (our
// own license server) — replaces the old Stripe orders API.
//
// Build-time memoization: Astro's static build runs in a single Node process, so
// caching the promise means the fetch runs once per build and is reused across
// every page that renders TrustBar (instead of once per page).
const STATS_URL = "https://licenses.albertogalca.com/api/products/picmal/stats";

let cachedCountPromise: Promise<number> | null = null;

/** Total distinct customers for Picmal, rounded down to the nearest 10 for a
 *  cleaner "N+" number. Safe to call from any page's frontmatter. */
export function getCustomerCount(): Promise<number> {
  if (!cachedCountPromise) {
    cachedCountPromise = fetchCustomerCount();
  }
  return cachedCountPromise;
}

async function fetchCustomerCount(): Promise<number> {
  // Skip the network call during local dev — use a placeholder.
  if (import.meta.env.DEV) {
    return 150;
  }

  try {
    const response = await fetch(STATS_URL);
    if (!response.ok) {
      throw new Error(`licencio stats error: ${response.status}`);
    }
    const { customers } = (await response.json()) as { customers: number };
    // Round down to nearest 10 for privacy/cleanliness (e.g. 672 -> 670).
    return Math.floor(customers / 10) * 10;
  } catch (error) {
    // Fail the build rather than ship a wrong number. This used to log and
    // return 150, which is the dev placeholder: a single failed fetch would
    // quietly print "150+ Mac users" across the whole site while the real
    // figure was several times that, and nothing but a console line said so.
    // A red build is cheap; understating the strongest proof number on every
    // page for a week is not.
    throw new Error(
      `Failed to fetch customer count from licencio (${STATS_URL}). ` +
        `Refusing to build with the placeholder count. Cause: ${error}`,
    );
  }
}
