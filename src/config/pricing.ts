// Single source of truth for checkout. Buy buttons are plain links to licencio's
// GET checkout endpoint, which 302s straight to a Stripe Checkout Session (seats,
// metadata, and success/cancel URLs are set server-side per Product). Fulfillment
// happens in licencio via the checkout.session.completed webhook.
//
// Prices live on Stripe product prod_Upt9NufoSBShSV (acct_1TqD3o4RpfcAQYty),
// metadata.seats == devices. Price IDs below drive the checkout URL per tier.

// licencio prod host + product slug. checkoutUrl(priceId) is the buy link;
// Seline.astro appends &client_reference_id=<seline_vid cookie> at click time.
const LICENCIO = "https://licenses.albertogalca.com";
const PRODUCT_SLUG = "picmal";
const checkoutUrl = (priceId: string): string =>
  `${LICENCIO}/api/checkout?product_slug=${PRODUCT_SLUG}&price_id=${encodeURIComponent(priceId)}`;

/** A plain bullet, or one with a link on `linkText` (a substring of `text`). */
export type Feature = string | { text: string; linkText: string; href: string };

export interface Plan {
  id: "standard" | "pro";
  name: string;
  price: number; // display price in USD, tax-exclusive (tax handled at Stripe Checkout)
  devices: number;
  priceId: string; // Stripe Price ID
  checkoutUrl: string; // licencio buy link → 302 to Stripe Checkout
  features: Feature[];
}

// Repriced Aug 2026. The 1/2/3/5 seat ladder collapsed into two named plans:
// the seat stepper made buyers do arithmetic before they knew what the app was.
// Pro is the same app with 5 seats instead of 2, so nobody has to guess which
// features they lose by paying less. Support is not a tier.
const RAW: Omit<Plan, "checkoutUrl">[] = [
  {
    id: "standard",
    // Named "Picmal", not "Picmal Standard": the buy button, the licence FAQ and
    // the terms page all call the cheap plan "Picmal", so a card heading that
    // says "Standard" makes the Pro bullet "Everything in Picmal" ambiguous.
    name: "Picmal",
    price: 39,
    devices: 2,
    priceId: "price_1U3rbv4RpfcAQYtyDdjCARJC",
    // `{mac}` is swapped for a laptop glyph at render time (PricingPlans).
    features: [
      "Every feature, no add-ons",
      "Free updates forever",
      "Use on 2 {mac}",
      "Command line tool, Raycast extension and watched folders",
      // Was "Instant updates via Sparkle". Sparkle means nothing to a buyer;
      // what they actually get is the update without Apple's review queue.
      "Updates land the day I ship them, with no App Store review wait",
    ],
  },
  {
    id: "pro",
    name: "Picmal Pro",
    price: 69,
    devices: 5,
    priceId: "price_1U3rby4RpfcAQYty3Tzatrg0",
    // No support tier here on purpose: everyone gets the same answer from the
    // same person, so promising "priority" would be a lie.
    features: [
      "Everything in Picmal",
      "Use on 5 {mac}",
      "One license for a studio, a family, or a desk and a laptop",
    ],
  },
];

export const PLANS: Plan[] = RAW.map((p) => ({
  ...p,
  checkoutUrl: checkoutUrl(p.priceId),
}));

// What every bare <Button> charges. Keep it matching the price written on those
// buttons ("Get Picmal for $39").
export const DEFAULT_PLAN = PLANS[0];

// Third buying channel, not a third tier. Same price as the direct license, but
// Apple's sandbox costs it the CLI, Raycast, watched folders and camera EXIF on
// RAW. The link only resolves once the app clears review (App Store Connect id
// 6800392871), so this site does not go out before it does.
export const MAC_APP_STORE = {
  price: 39,
  url: "https://apps.apple.com/app/id6800392871",
  features: [
    "All conversion and compression features, same engines, same quality",
    "Free updates forever",
    "Purchases, updates and refunds handled by Apple",
    "Family Sharing, no license key",
    // Was "Some things work differently on the App Store", which left the buyer
    // guessing what they give up at the exact moment they pick a channel. Name
    // the three missing tools, and keep the link for the long version.
    {
      text: "No command line tool, Raycast extension or watched folders. Compare the two builds",
      linkText: "Compare the two builds",
      href: "/docs/mac-app-store",
    },
  ],
};

// Self-serve since Aug 2026: licencio's upgrade page takes the license key,
// picks the pay-the-difference SKU for that key's seat count server-side
// (Stripe prices with `upgrade_from_seats` metadata: 1→2 $15, 1→5 $40,
// 2→5 $30, 3→5 $15) and the webhook bumps max_activations on the SAME key.
export const UPGRADE = {
  price: 30, // the 2→5 path, the one the pricing FAQ quotes
  // ?product brands the page (name, logo, accent, key placeholder) before a key is typed.
  url: `${LICENCIO}/portal/upgrades/new?product=${PRODUCT_SLUG}`,
};

// The code is never in this bundle. The form posts the address to licencio,
// which re-runs the same domain check server-side and mails the Stripe
// promotion code to it — so having the school inbox is what buys the discount,
// not reading this file. See app/controllers/api/students_controller.rb.
export const STUDENT_DISCOUNT = {
  percentOff: 40,
  endpoint: `${LICENCIO}/api/students/discount`,
  productSlug: PRODUCT_SLUG,
  contact: "support@picmal.app",
};

// Purchasing-power pricing is decided at checkout from the buyer's country, by
// two mechanisms that compose. 62 currencies carry a hand-set PPP amount in the
// price's currency_options (India 0.35×, Brazil 0.45×, Japan 0.80× — see
// picmal/scripts/stripe-ppp-pricing.py); everywhere else Stripe's Adaptive
// Pricing just FX-converts the USD price. Euro countries can only be in the
// second group: currency_options keys on currency, not country, so discounting
// Portugal would discount Germany too.
//
// Deliberately not listed band by band here: a stale table on the site would be
// a broken promise. The amounts are frozen at the rates of the day they were
// set — currency_options entries are write-once, so re-running that script
// mints new prices and the two priceIds above have to change with them.
