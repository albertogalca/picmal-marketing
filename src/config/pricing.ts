// Single source of truth for Stripe checkout via the licencio license server.
//
// TODO (fill in after Stripe + licencio are configured — see stripe-migration plan):
//   1. LICENCIO_URL  -> the deployed licencio origin (no trailing slash)
//   2. each priceId  -> the Stripe Price ID whose metadata.seats == devices
// Buttons call `${LICENCIO_URL}/api/checkout` with { product_slug, price_id },
// which returns a Stripe Checkout URL. Until these are set, checkout will fail.

export const LICENCIO_URL = "https://TODO-licencio-host"; // ponytail: set to deployed origin

export interface Tier {
  devices: number;
  price: number; // display price in USD, tax-exclusive ($X + VAT/sales tax)
  priceId: string; // Stripe Price ID (one-time; metadata.seats = devices)
}

// Prices mirror the current Lemon Squeezy tiers (volume discounts preserved).
export const TIERS: Tier[] = [
  { devices: 1, price: 15.99, priceId: "price_TODO_1device" },
  { devices: 2, price: 28.78, priceId: "price_TODO_2device" },
  { devices: 3, price: 40.77, priceId: "price_TODO_3device" },
  { devices: 5, price: 63.95, priceId: "price_TODO_5device" },
];

export const DEFAULT_TIER = TIERS[0];
