// Single source of truth for checkout. Buy buttons are plain links to licencio's
// GET checkout endpoint, which 302s straight to a Stripe Checkout Session (seats,
// metadata, and success/cancel URLs are set server-side per Product). Fulfillment
// happens in licencio via the checkout.session.completed webhook.
//
// Prices live on Stripe product prod_Upt9NufoSBShSV (acct_1TqD3o4RpfcAQYty),
// metadata.seats == macs. Price IDs below drive the checkout URL per tier.

// licencio prod host + product slug. checkoutUrl(priceId) is the buy link;
// Seline.astro appends &client_reference_id=<seline_vid cookie> at click time.
const LICENCIO = "https://licenses.albertogalca.com";
const PRODUCT_SLUG = "picmal";
const checkoutUrl = (priceId: string): string =>
  `${LICENCIO}/api/checkout?product_slug=${PRODUCT_SLUG}&price_id=${encodeURIComponent(priceId)}`;

/** Where every "talk to a human" link on a pricing surface points. */
export const SUPPORT_EMAIL = "support@picmal.app";

/** A plain bullet. */
export type Feature = string;

export interface Tier {
  macs: number;
  price: number; // display price in USD, tax-exclusive (tax handled at Stripe Checkout)
  priceId: string; // Stripe Price ID
  checkoutUrl: string; // licencio buy link → 302 to Stripe Checkout
}

// Back to a seat ladder, Aug 2026. The two named plans replaced it for three
// weeks and converted worse: "Picmal" vs "Picmal Pro" made people hunt for the
// feature they were losing by paying less, when the only difference was a
// number. A ladder says the number out loud.
//
// $39 for 2 Macs is the anchor and did not move, so every "$39" already written
// across the site is still true for the tier it always described.
const RAW: Omit<Tier, "checkoutUrl">[] = [
  { macs: 1, price: 29, priceId: "price_1U8z2i4RpfcAQYtyooQlXFGq" },
  { macs: 2, price: 39, priceId: "price_1U8z2v4RpfcAQYtyiYqXZPaP" },
  { macs: 5, price: 89, priceId: "price_1U8z384RpfcAQYtyHgZLc0GV" },
  { macs: 10, price: 149, priceId: "price_1U8z3L4RpfcAQYtykDvUzs21" },
];

export const TIERS: Tier[] = RAW.map((t) => ({
  ...t,
  checkoutUrl: checkoutUrl(t.priceId),
}));

// What every bare <Button> charges, and the tier the seat picker opens on.
// 1 Mac: it is the cheapest true price, the one the rest of the site quotes,
// and the picker climbs from it. Opening on a higher tier quotes a price the
// buyer did not ask for.
export const DEFAULT_TIER = TIERS[0];

// One list for every tier: the app is identical, only the seat count changes.
// `{macs}` is swapped at render time (PricingPlans) for the tier's seat count
// and its noun, "1 Mac" or "5 Macs".
//
// Rewritten Aug 2026, when Picmal came off the Mac App Store. Two bullets only
// ever meant anything as contrasts with that build: "Every feature" answered a
// restricted sandboxed version, and "Updates land the day I ship them" answered
// the review queue. With direct as the only channel they argue against nothing,
// so the line they were spending goes to what the app actually does and to the
// local-and-private throughline the card never stated.
export const FEATURES: Feature[] = [
  "Convert, compress and edit images, video, audio and PDFs",
  "Everything runs on your Mac, nothing gets uploaded",
  "Use it on {macs}",
  "Command line tool, Raycast extension and watched folders",
  "Free updates forever, no subscription",
];

/**
 * What a tier saves against buying that many 1-Mac licenses. This is the whole
 * argument for climbing the ladder, so the card says it out loud. 0 on the
 * 1-Mac tier itself, where there is nothing to compare against.
 */
export const savings = (tier: Tier): number =>
  TIERS[0].price * tier.macs - tier.price;

/** Pay-the-difference, derived so it can never drift from TIERS. */
export const upgradePrice = (from: number, to: number): number =>
  TIERS.find((t) => t.macs === to)!.price -
  TIERS.find((t) => t.macs === from)!.price;

// Self-serve since Aug 2026: licencio's upgrade page takes the license key,
// picks the pay-the-difference SKU for that key's seat count server-side
// (Stripe prices carrying `upgrade_from_seats` + `seats`) and the webhook bumps
// max_activations on the SAME key. Every tier can reach every larger tier, and
// legacy 3-Mac keys have their own two SKUs.
export const UPGRADE = {
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
  contact: SUPPORT_EMAIL,
};

// Purchasing-power pricing is decided at checkout from the buyer's country, by
// two mechanisms that compose. 62 currencies carry a hand-set PPP amount in the
// price's currency_options (India 0.35×, Brazil 0.45×, Japan 0.80×); everywhere
// else Stripe's Adaptive Pricing just FX-converts the USD price. Euro countries
// can only be in the second group: currency_options keys on currency, not
// country, so discounting Portugal would discount Germany too.
//
// The four ladder prices were minted by scaling the $39 tier's table, so every
// tier carries the same per-country ratio the site has always charged.
//
// Deliberately not listed band by band here: a stale table on the site would be
// a broken promise. The amounts are frozen at the rates of the day they were
// set, so repricing a tier means minting a new price and changing its priceId
// above.

/** One licensing FAQ, rendered by both PricingSection and /pricing. */
export interface LicenseFaq {
  question: string;
  answer: string;
}

/**
 * The licensing questions, in one place so the homepage band and the pricing
 * page can never drift apart on what an upgrade costs. Answers carry inline
 * HTML; both call sites render them through FAQ.astro, which expects that.
 * Kept next to `upgradePrice` on purpose: the numbers in the second answer are
 * derived, so changing TIERS rewrites the copy for free.
 */
export const licenseFaqs: LicenseFaq[] = [
  {
    question: "How does the license work?",
    answer:
      "You pay once and keep it. No renewals, no subscriptions. Your license activates on the number of Macs you bought it for, and you can move it to another Mac whenever you want.",
  },
  {
    question: "I bought Picmal and now I need more Macs. Can I upgrade?",
    answer:
      `Yes, and you only pay the difference. Going from 1 Mac to 2 is $${upgradePrice(1, 2)}, 2 to 5 is $${upgradePrice(2, 5)}, 5 to 10 is $${upgradePrice(5, 10)}, and every other jump works the same way. <a class="link" href="${UPGRADE.url}">Enter your license key here</a> and the same key covers more Macs. The offer never expires, so starting small is never the wrong call.`,
  },
  {
    question: "What happens if I get a new Mac?",
    answer:
      "Open Picmal on your old Mac, go to Picmal → Register license to deactivate, then activate on the new one. Takes about ten seconds.",
  },
  {
    question: "Do you offer student or country discounts?",
    answer:
      `Yes. I want Picmal to be affordable wherever you are. Students and educators get ${STUDENT_DISCOUNT.percentOff}% off: verify your school email on the <a class="link" href="/education">education page</a> and the code lands in your inbox. If the price is steep for your country, checkout already adjusts it for you. If it still doesn't work, email <a class="link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a> and tell me where you are, and I'll send a code.`,
  },
];
