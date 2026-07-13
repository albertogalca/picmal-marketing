---
target: src/pages/index.astro
total_score: 35
p0_count: 0
p1_count: 0
timestamp: 2026-07-13T16-29-19Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser evidence). Re-run after the first critique's fixes.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Header + hero "Buy for Mac" scroll to #pricing with no signal they aren't checkout. |
| 2 | Match System / Real World | 4 | Plain Mac-native language; category then benefit. |
| 3 | User Control and Freedom | 3 | Modals dismissible, anchor nav; nothing traps. |
| 4 | Consistency and Standards | 4 | Purchase verb unified; 8px system, one accent, one type family hold. (was 2) |
| 5 | Error Prevention | 3 | Device selector + refund note clear; low surface. |
| 6 | Recognition Rather Than Recall | 4 | Everything needed visible; formats behind a labelled modal. (was 3) |
| 7 | Flexibility and Efficiency | 3 | Anchor nav + CLI mention; no power-user friction. |
| 8 | Aesthetic and Minimalist Design | 4 | Restrained, on-brand; masonry void resolved. (was 3) |
| 9 | Error Recovery | 3 | Low surface; support now a real mailto link. |
| 10 | Help and Documentation | 4 | FAQ, docs, two formats modals, mailto support. |
| **Total** | | **35/40** | **Strong — ship-ready with light polish** (was 31) |

## Anti-Patterns Verdict — Not AI slop (holds)

Both altitudes pass. Native-Mac-utility feel, no gradient-mesh hero / metric cards / boxed icon grid, real demo video, human voice, monochrome palette carried by a single System Blue, consistent 8px corners. The "Quiet Utility, Warm Maker" north star is intact after the changes.

**Deterministic scan:** homepage source CLEAN (detect.mjs exit 0). The only findings are 3 advisory hits in `SegmentedControl.astro` (blog-only component, not the homepage). The horizontal-overflow signal is again the intentionally `sr-only` FeaturedOn footer block — false positive (body has `overflow-x:hidden`, `scrollX` stays 0). Console clean (only a Chrome-extension messaging error, not page-originated).

## Regression Check — all 6 fixes landed, nothing broke

1. **Contrast (P1 → resolved):** secondary text now `rgba(0,0,0,0.6)` = **5.68:1** light across hero sublead, privacy line, feature copy, nav, footer, fine print, placeholder; dark `rgba(255,255,255,0.6)` = **~6.5:1**. Passes AA normal (4.5:1) in both themes. (Was ~3.8:1 fail.)
2. **Purchase verb:** rendered DOM shows "Buy for Mac" ×3, "Get Picmal" ×0, "Purchase for Mac" ×0. Unified.
3. **Hero privacy line:** lock + "100% on your Mac. No uploads, no account, works offline." present under the CTAs, muted secondary (no second hue), in the hero-reveal stagger, `mt-5` gap so it doesn't crowd the buttons.
4. **Testimonials capped:** exactly 12 rendered; **section gap testimonials→features measured 0px** — the whitespace void is gone. Schema `reviewCount` still spans the full set (SEO unchanged).
5. **Feature icons 48px, gray:** 8 icons at 48×48 in `text-text`, blue not introduced (One Voice Rule held); no icon/title baseline misalignment across grid rows; workflow app icons match at 48px.
6. **FAQ email:** now a `mailto:` link.

No fix broke another; dark mode, spacing, alignment, vertical rhythm intact.

## What's Working

1. **The contrast fix is real and universal** — every secondary surface clears AA in both themes, and the fix didn't wash out the secondary/primary hierarchy (0.6 muted vs 0.85 ink still reads as clearly secondary).
2. **One Voice Rule held under pressure** — enlarging the icons didn't tempt a color introduction; blue stays reserved for actions/links/active/focus.
3. **Privacy proof placement** — the belief PRODUCT.md says a visitor should remember after 10 seconds is now stated above the fold, calmly, without shouting. Best-served persona is now the privacy-conscious searcher.

## Priority Issues

**[P2] "Buy" that doesn't buy, now in two places.**
Header and hero "Buy for Mac" both `href="/#pricing"` (scroll); only the pricing-card button is the real Stripe checkout. Unifying the verb was correct but sharpens a label/behavior mismatch — a purchase label that twice delivers a scroll. Defensible (checkout needs the device-count selection first), and the consistent verb is a net win, so this is a judgment call, not a blocker.
- Fix options: (a) leave as-is — acceptable; (b) reserve "Buy for Mac" for the terminal pricing button and make the header/hero read as "See pricing"; (c) deep-link the hero button straight to checkout at the default tier.
- Command: clarify.

**[P3] Testimonial masonry ragged bottom (~150px within-section).**
The big void is gone (0px between sections), but with 12 cards the CSS `columns` fill leaves the middle/right columns ending ~150px above the left — a soft ragged bottom inside the section. Cosmetic.
- Fix: try 11 or 13 cards and eyeball the balance, or trim the single tallest quote; or move to a balanced 12-item grid if the ragged bottom bothers you.
- Command: polish (or layout).

**[P3] Testimonial accent-highlight stretches the One Voice Rule.**
Testimonial key phrases use accent-blue at ~0.15 alpha as prose emphasis. It's still the one blue, but DESIGN.md reserves blue for action/link/active/focus, so using it for prose emphasis is a slight semantic stretch. Pre-existing, low stakes.
- Fix: confirm it's brand-sanctioned emphasis; if strict, switch the highlight to a `surface-subtle` background instead of a blue tint.
- Command: normalize.

## Persona Red Flags

- **Jordan (first-timer):** well served — hero states plainly what it is, privacy line answers "is this safe." Only snag: clicking hero "Buy for Mac" scrolls, may momentarily wonder if the click registered.
- **Riley (stress tester):** will notice header + hero + pricing all say "Buy" but only one checks out; toggles dark mode — holds (6.5:1).
- **Casey (mobile):** could not be verified live (browser window clamped ~1440–1710px on the display, would not shrink). From source: CTAs stack full-width below `sm`, privacy line wraps with the `shrink-0` lock centered, grid/masonry collapse to 1 column — sound but should be spot-checked on a real narrow viewport before ship.
- **Privacy-conscious Mac user (mid-task):** best-served now — the above-fold "no uploads, works offline" + "instead of trusting sketchy websites" resolves the exact anxiety fast.

## Minor Observations

- Demo video autoplays muted/looped, honors reduced-motion.
- `MasonryTestimonials` slices the full array (incl. the 1 press entry, MacStories) for display while the schema counts press-filtered reviews; MacStories renders correctly as a press-style card, so no visible bug — just keep press entries out of the first 12 if you want 12 user reviews shown.
- Lock icon 16px against 14px text is proportionate; `shrink-0` prevents squish on wrap.

## Questions to Consider

1. If "Buy for Mac" scrolls in two of three places, is the header CTA earning its slot, or would "See pricing" there (reserving "Buy" for the terminal action) reduce the tension while keeping the funnel?
2. The privacy line is the single most persuasive sentence for the target persona — should it be slightly more prominent (`text-body` weight, still secondary color) rather than the smallest text on screen at 14px?
3. With the wall capped at 12, is masonry still the right primitive, or would a balanced 12-item grid remove the ragged bottom entirely?
