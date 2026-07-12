// Single source of truth for checkout. Buy buttons are plain links to licencio's
// GET checkout endpoint, which 302s straight to a Stripe Checkout Session (seats,
// metadata, and success/cancel URLs are set server-side per Product). Fulfillment
// happens in licencio via the checkout.session.completed webhook.
//
// Prices live on Stripe product prod_Upt9NufoSBShSV (acct_1TqD3o4RpfcAQYty),
// metadata.seats == devices. Price IDs below drive the checkout URL per tier.

// licencio prod host + product slug. checkoutUrl(priceId) is the buy link;
// Posthog.astro appends &client_reference_id=<distinct_id> at click time.
const LICENCIO_CHECKOUT = "https://licenses.albertogalca.com/api/checkout";
const PRODUCT_SLUG = "picmal";
const checkoutUrl = (priceId: string): string =>
  `${LICENCIO_CHECKOUT}?product_slug=${PRODUCT_SLUG}&price_id=${encodeURIComponent(priceId)}`;

export interface Tier {
  devices: number;
  price: number; // display price in USD, tax-exclusive (tax handled at Stripe Checkout)
  priceId: string; // Stripe Price ID
  checkoutUrl: string; // licencio buy link → 302 to Stripe Checkout
}

// Volume discounts preserved (mirror the current Stripe tiers).
const RAW: Omit<Tier, "checkoutUrl">[] = [
  { devices: 1, price: 15.99, priceId: "price_1TqpcE4RpfcAQYtyX4BGl8H9" },
  { devices: 2, price: 28.78, priceId: "price_1TqpcD4RpfcAQYtyQ5Y77fSI" },
  { devices: 3, price: 40.77, priceId: "price_1TqpcD4RpfcAQYtyhW7a0BK0" },
  { devices: 5, price: 63.95, priceId: "price_1TqpcD4RpfcAQYtyL6KKMeII" },
];

export const TIERS: Tier[] = RAW.map((t) => ({
  ...t,
  checkoutUrl: checkoutUrl(t.priceId),
}));

export const DEFAULT_TIER = TIERS[0];
