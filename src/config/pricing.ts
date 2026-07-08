// Single source of truth for checkout. Buy buttons link to Stripe Payment Links
// (managed in the Stripe Dashboard, Managed Payments enabled per link). Fulfillment
// happens in licencio via the checkout.session.completed webhook — each Payment Link
// must carry metadata: licencio_product_id=<picmal product uuid>, quantity=<devices>.
//
// TODO: paste the 4 live Payment Link URLs (buy.stripe.com/...) below.
// Prices are on Stripe product prod_Upt9NufoSBShSV (acct_1TqD3o4RpfcAQYty),
// metadata.seats == devices. price IDs kept here only as a build reference.

export interface Tier {
  devices: number;
  price: number; // display price in USD, tax-exclusive ($X + tax handled by Stripe MoR)
  priceId: string; // Stripe Price ID (reference; the link is built from it in the Dashboard)
  paymentLink: string; // Stripe Payment Link URL
}

// Volume discounts preserved (mirror the current Lemon Squeezy tiers).
export const TIERS: Tier[] = [
  { devices: 1, price: 15.99, priceId: "price_1TqpcE4RpfcAQYtyX4BGl8H9", paymentLink: "https://buy.stripe.com/TODO_1device" },
  { devices: 2, price: 28.78, priceId: "price_1TqpcD4RpfcAQYtyQ5Y77fSI", paymentLink: "https://buy.stripe.com/TODO_2device" },
  { devices: 3, price: 40.77, priceId: "price_1TqpcD4RpfcAQYtyhW7a0BK0", paymentLink: "https://buy.stripe.com/TODO_3device" },
  { devices: 5, price: 63.95, priceId: "price_1TqpcD4RpfcAQYtyL6KKMeII", paymentLink: "https://buy.stripe.com/TODO_5device" },
];

export const DEFAULT_TIER = TIERS[0];
