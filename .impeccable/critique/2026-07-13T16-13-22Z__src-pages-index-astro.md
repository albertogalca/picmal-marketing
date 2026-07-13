---
target: src/pages/index.astro
total_score: 31
p0_count: 0
p1_count: 1
timestamp: 2026-07-13T16-13-22Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Live price update, video autoplay, FAQ toggles respond; no active-section indicator while scrolling. |
| 2 | Match System / Real World | 4 | Plain language, Mac-native metaphors, zero jargon. Exemplary. |
| 3 | User Control and Freedom | 3 | Collapsible FAQs, refund promise; no mobile sticky-buy or back-to-top on a very long page. |
| 4 | Consistency and Standards | 2 | Three verbs for one purchase action: "Get Picmal" / "Buy for Mac" / "Purchase for Mac". |
| 5 | Error Prevention | 3 | VAT/refund/Stripe disclosed, stepper bounded. Little to get wrong. |
| 6 | Recognition Rather Than Recall | 3 | Sticky nav, clear labels; price never recalled above the fold. |
| 7 | Flexibility and Efficiency | 3 | Good anchor nav, but the single conversion point sits far down. |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and restrained; dragged by an over-long testimonial wall + ragged whitespace void. |
| 9 | Error Recovery | 3 | Support email surfaced, "no free trial" clarified. Limited error surface. |
| 10 | Help and Documentation | 4 | Two FAQ sets, docs link, founder letter, support email. |
| **Total** | | **31/40** | **Good — ship-ready, needs polish** |

## Anti-Patterns Verdict

**Not AI slop.** The category reflex (gradient-mesh hero, big-number metric cards, boxed icon-card grid, uppercase eyebrows) is avoided across the board. Flat off-white hero, one blue button, plainly-stated value prop, open text-forward feature grid (not boxed cards), hairline surfaces with no resting shadow, one System Blue accent, system font, an honest founder letter with a real handwritten signature. This is the DESIGN.md "Quiet Utility, Warm Maker" north star executed with discipline. Personality is present (dry contrast copy, a mildly critical review left in on purpose).

**Deterministic scan:** Homepage source is CLEAN (detect.mjs exit 0, zero findings). The only detector hits are 3 advisory findings in `SegmentedControl.astro` (10px radius, hardcoded #007AFF focus color, 13px font) — that component is imported only by the blog index, NOT the homepage, so none render on this page.

**Browser evidence:** Console clean (no errors/warnings/CSP/404). Focus-visible states authored across interactive elements. The one horizontal-overflow signal (scrollWidth 1519 > 1440) traces to the intentionally `sr-only` FeaturedOn backlink block in the footer — non-visual, false positive.

## What's Working

1. **Brand fidelity IS the anti-slop.** Flat hairline surfaces, System Blue on a tiny fraction of each screen, pure-neutral backgrounds, one system typeface, depth reserved for the primary button + media frames. The page practices what the product preaches (calm, precise, native) — spec made real, not a template.
2. **The pricing card is craft.** A live device stepper recomputing price with `tabular-nums` ($15.99 → $28.78 for 2), in a hairline-flat card (no drop shadow, per Flat-By-Default), with a dense reassurance cluster (refund, offline/privacy, VAT/Stripe). Does more for the "real Mac app + fair one-time price" beliefs than any copy.
3. **Voice and honesty.** First-person contrast copy, and a testimonial wall that leaves in a mildly critical review ("still needs some work regarding both the UI and the UX"). A generated page would never keep that.

## Priority Issues

**[P1] Secondary body text fails WCAG AA contrast (measured, both agents).**
- Why it matters: all muted copy uses `rgba(0,0,0,0.5)` — measured 3.84–3.95:1 (B: 3.95, A: 3.84 on live backgrounds), below the 4.5:1 AA floor for normal text. This isn't decorative: the hero sublead IS the value proposition and feature descriptions ARE the product explanation. DESIGN.md's own note says ink-muted "sits near the AA floor; reserve for large/non-essential text" — the implementation violates its own rule. Fails the PRODUCT.md WCAG 2.1 AA target. (Passes the 3:1 large-text bar, so the large sublead is technically OK; nav links, FAQ answers, footer, fine print, and the email placeholder fail.)
- Fix: darken `--color-text-secondary` from ~0.5 to ~0.62–0.65 black (`rgba(0,0,0,0.62)` ≈ 4.6:1) and verify the dark-mode counterpart; or promote essential copy (hero sublead, feature descriptions) to full ink and reserve muted for true metadata.
- Command: harden.

**[P2] One purchase, three names — and the hero button doesn't buy.**
- Why it matters: header "Get Picmal" → hero "Buy for Mac" → pricing "Purchase for Mac" all trigger the same path; the hero "Buy for Mac" actually just scrolls to `#pricing`. A label that promises a purchase and delivers a scroll is a credibility ding at the conversion moment (heuristic #4, cognitive load #5).
- Fix: pick one purchase verb site-wide. If the hero button only scrolls, relabel it honestly ("See pricing") or deep-link it to checkout.
- Command: clarify.

**[P2] Conversion path is buried; testimonial wall over-proves.**
- Why it matters: the full testimonial masonry (40+ quotes) + the full 9-item feature grid both sit between hero and pricing, so the single conversion surface is a long scroll away for the stated impatient mid-task user. The masonry's uneven columns leave a large ragged whitespace void before Features that reads as a layout bug (cognitive load #3/#6).
- Fix: distill the wall to ~9–12 strongest quotes (+ press-logo strip / "read more"); cap/balance masonry column heights to kill the void; add a compact repeat CTA or mobile sticky "Buy" so the action is always one tap away.
- Command: distill (+ layout for masonry balance / sticky CTA).

**[P3] Feature-grid icons are the most template-like block.**
- Why it matters: the 9 Phosphor icons render as uniform single-weight gray line glyphs at identical size — the closest thing to "AI grid" on the page, and it flattens the one section meant to showcase range.
- Fix: confirm the duotone variant is actually rendering (they read flat); vary emphasis, or let the accent tint the primary duotone layer sparingly; or size icons larger/lighter so title+copy lead.
- Command: polish (or colorize if the duotone accent layer is intended).

**[P3] Above-the-fold privacy proof is thin; support email isn't a link.**
- Why it matters: the felt privacy proof ("Works offline, no data leaves your Mac"; FAQ "On your Mac. Nothing gets uploaded.") lives deep in pricing/FAQ. The mid-task, privacy-conscious searcher decides trust on the first screen, where the strongest proof is out of sight — and "files never leave your Mac" is the line PRODUCT.md says they should remember after 10 seconds. Minor: `support@picmal.app` is plain text, not a `mailto:`.
- Fix: surface a small "100% on-device · nothing uploaded" chip near the hero CTAs; make the support email a `mailto:` link.
- Command: clarify.

## Persona Red Flags

- **Jordan (first-timer):** hero "Buy for Mac" scrolls instead of buying; with no trial, must pass the whole testimonial wall to learn the price ($15.99 is never shown above the fold).
- **Riley (stress tester):** focus rings + press-scale are solid; will notice the two duplicate FAQ blocks (license FAQ in pricing + main FAQ), the three purchase verbs, and the failing secondary-text contrast.
- **Casey (mobile):** stacked full-width CTAs are correct, but on a ~390px screen the testimonial wall is an enormous single-column scroll before pricing with no sticky buy; the whitespace void is more pronounced single-column.
- **Privacy-conscious Mac user, mid-task from search:** the homepage answers a generic "toolkit" intent, not their specific job; the concrete on-device guarantee is buried in pricing/FAQ rather than reinforced at the hero where trust is first weighed.

## Minor Observations

- Nav = 6 links + CTA, no active-section highlight while scrolling.
- Page ends on a large sitemap footer + newsletter, not a closing CTA — a missed peak-end reinforcement.
- Dark mode is executed well (near-black paper, blue lightens to hold contrast, cards stay flat). Toggle uses explicit `light`/`dark` classes + `color-scheme`; a bare `.dark` add won't flip it.
- Testimonial highlight-phrase mark (light blue) stays within the One Voice rule (no second accent hue).
- Demo video autoplays muted/looping and respects reduced-motion — correct.
- True 390px mobile screenshot unreachable (Chrome floored window at ~500px); stacking verified at 500px, sub-500px not directly observed.

## Questions to Consider

1. Is the homepage the right battleground? PRODUCT.md says most users land on focused conversion pages mid-task — should the homepage's job be trust + purchase (shorter, price-forward) rather than exhaustive proof?
2. If "files never leave your Mac" is the 10-second takeaway, why is it only provable below the fold? What would it cost to make on-device processing THE hero visual?
3. Does 40+ quotes read as confidence or as trying too hard? Would ~10 curated quotes + press logos convert better and feel more like the restrained maker the brand claims?
4. Three purchase verbs = three mental models. What is the one thing you want the visitor to believe they're doing — buying, downloading, or getting? Name it once.
