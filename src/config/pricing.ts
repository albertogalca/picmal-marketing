// Single source of truth for Stripe checkout via the licencio license server.
//
// Price IDs are the LIVE Stripe prices on product prod_Upt9NufoSBShSV
// (acct_1TqD3o4RpfcAQYty), each with metadata.seats matching `devices`.
// TODO: set LICENCIO_URL to the deployed licencio origin (no trailing slash).
// Buttons call `${LICENCIO_URL}/api/checkout` with { product_slug, price_id },
// which returns a Stripe Checkout URL. Until LICENCIO_URL is set, checkout fails.

export const LICENCIO_URL = "https://TODO-licencio-host"; // ponytail: set to deployed origin

export interface Tier {
  devices: number;
  price: number; // display price in USD, tax-exclusive ($X + VAT/sales tax)
  priceId: string; // Stripe Price ID (one-time; metadata.seats = devices)
}

// Prices mirror the current Lemon Squeezy tiers (volume discounts preserved).
export const TIERS: Tier[] = [
  { devices: 1, price: 15.99, priceId: "price_1TqpcE4RpfcAQYtyX4BGl8H9" },
  { devices: 2, price: 28.78, priceId: "price_1TqpcD4RpfcAQYtyQ5Y77fSI" },
  { devices: 3, price: 40.77, priceId: "price_1TqpcD4RpfcAQYtyhW7a0BK0" },
  { devices: 5, price: 63.95, priceId: "price_1TqpcD4RpfcAQYtyL6KKMeII" },
];

export const DEFAULT_TIER = TIERS[0];
