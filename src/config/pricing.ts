// Single source of truth for checkout. Buy buttons are plain links to licencio's
// GET checkout endpoint, which 302s straight to a Stripe Checkout Session (seats,
// metadata, and success/cancel URLs are set server-side per Product). Fulfillment
// happens in licencio via the checkout.session.completed webhook.
//
// Prices live on Stripe product prod_Upt9NufoSBShSV (acct_1TqD3o4RpfcAQYty),
// metadata.seats == devices. Price IDs below drive the checkout URL per tier.

// licencio prod host + product slug. checkoutUrl(priceId) is the buy link;
// Seline.astro appends &client_reference_id=<distinct_id> at click time.
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

// Repriced Aug 2026. Same 1/2/3/5 seat ladder as before, but anchored on $19
// instead of $15.99 — the old entry price put Picmal above Permute ($14.99 for
// 3 activations) on a per-device basis. Per-device cost still falls as seats go
// up ($19.00 / $14.50 / $13.00 / $11.80). See MARKETING-PLAN.md.
const PLACEHOLDER = "REPLACE_WITH_STRIPE_PRICE_ID";

const RAW: Omit<Tier, "checkoutUrl">[] = [
  { devices: 1, price: 19, priceId: "price_1U1mKw4RpfcAQYtyhReLLXWB" },
  { devices: 2, price: 29, priceId: "price_1U1mLl4RpfcAQYtyLFKL7XNM" },
  { devices: 3, price: 39, priceId: "price_1U1mM84RpfcAQYtym1F67zWs" },
  { devices: 5, price: 59, priceId: "price_1U1mMS4RpfcAQYtycjQOPp7c" },
];

// The tier the pricing card opens on, and what every bare <Button> charges. Keep
// it matching the price written on those buttons ("Get Picmal for $19").
export const DEFAULT_TIER_INDEX = 0; // 1 Mac @ $19

// ponytail: a money path, so fail the production build rather than ship buttons
// that charge the old $15.99 price behind new labels. Dev only warns, so the
// copy is still reviewable before the Stripe Prices exist. Paste the live Price
// IDs above and this goes quiet.
const missing = RAW.filter((t) => t.priceId === PLACEHOLDER);
if (missing.length > 0) {
  const msg =
    `pricing.ts: ${missing.length} tier(s) still on ${PLACEHOLDER} ` +
    `(${missing.map((t) => `${t.devices}-device/$${t.price}`).join(", ")}). ` +
    `Create the Stripe Prices on prod_Upt9NufoSBShSV and paste their IDs.`;
  if (import.meta.env.PROD) throw new Error(msg);
  console.warn(`[pricing] ${msg}`);
}

export const TIERS: Tier[] = RAW.map((t) => ({
  ...t,
  checkoutUrl: checkoutUrl(t.priceId),
}));

export const DEFAULT_TIER = TIERS[DEFAULT_TIER_INDEX];
