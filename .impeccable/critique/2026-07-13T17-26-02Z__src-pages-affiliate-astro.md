---
target: src/pages/affiliate.astro
total_score: 30
p0_count: 0
p1_count: 2
timestamp: 2026-07-13T17-26-02Z
slug: src-pages-affiliate-astro
---
# Critique: `src/pages/affiliate.astro`

Method: dual-agent (A: design review · B: detector + evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Static page; Button gives press/focus feedback, nothing notable |
| 2 | Match System / Real World | 4 | Copy speaks the audience's exact language (cookie, payout, personas) |
| 3 | User Control and Freedom | 3 | "Already an affiliate? Sign in" escape present; all links force `_blank` |
| 4 | Consistency and Standards | 2 | Centered vs reference hero's left-align; mixed alignment; `font-bold` overrides H1 token; `min-h-screen` vs site `min-h-dvh` |
| 5 | Error Prevention | 3 | Little to get wrong; external signup owns validation |
| 6 | Recognition Rather Than Recall | 3 | Terms defined in cards + FAQ; bare "60" card needs its label to mean anything |
| 7 | Flexibility and Efficiency | 3 | One fast path; press-kit assets buried in FAQ prose |
| 8 | Aesthetic and Minimalist Design | 3 | Quiet and clean, but generic two-grid composition; ends abruptly |
| 9 | Error Recovery | 2 | No visible "questions? email me" path; only recovery is an email buried in a FAQ answer |
| 10 | Help and Documentation | 4 | FAQ is genuinely strong (7 Qs: why/who/assets/earnings/payout/signup) |
| **Total** | | **30/40** | **Good** — ships confidently, not yet distinctive |

## Anti-Patterns Verdict

**LLM assessment:** Split. The **copy passes the human test decisively** — the FAQ answers ("Honestly? Because HEIC files... There's not much affiliate competition in this niche") are reference-quality Picmal voice, first-person, dry, specific. No AI default writes that. The **layout does not**: it's a textbook centered-stack SaaS template (centered hero → centered CTA → three trophy stat cards → three icon-steps → FAQ). Two 3-up grids of near-identical tiles stacked back to back is the most generic composition in landing-page design, and it abandons the reference hero's confident left-aligned, asymmetric, video-led identity.

On the flagged tension (the `25% / 60 / $10` cards vs DESIGN.md's ban on big-number hero-metric cards): **the content is justified, the execution is the violation.** These aren't vanity metrics — they're the literal terms of the deal a publisher must evaluate, so they earn a place. But rendering them as three centered `text-h1 font-bold text-accent` trophy cards is exactly the banned aesthetic, and here it's worse than usual because the giant accent numbers visually out-shout the CTA sitting above them.

**Deterministic scan:** `detect.mjs` returned `[]`, exit 0 — **0 findings**. The design-system classes (`text-h1`, `text-body-big`, `bg-background-subtle`, `text-accent`) tripped no rules, the expected outcome for this token-based page. The detector and the LLM agree there are no mechanical slop tells (no gradient text, no side-stripe borders, no eyebrow scaffolding); the weakness is compositional, which a regex scan can't see. No false positives to adjudicate.

**Visual overlays:** Dev server was live on `:4321` but browser visualization was skipped — with 0 detector findings there was nothing to overlay. No user-visible overlay was produced.

## Overall Impression

A clean, system-disciplined page whose copy is genuinely excellent and whose composition is the most templated thing on the site. It works, and it will convert some affiliates on the strength of the writing alone. The single biggest opportunity: it's a **conversion page with its only CTA at the very top**, before any persuasion, and it retreats to a generic centered template instead of inheriting the reference hero's identity. Fix the arrangement and the ending and this jumps from "good and safe" to "distinctly Picmal."

## What's Working

1. **The copy/voice is the best asset on the page.** FAQ answers are specific, warm, first-person, no em dashes, audience-tuned. Reference-quality Picmal voice, and load-bearing for trust.
2. **Disciplined system reuse.** `Section`, `Card`, `SectionHeading`, `FAQ`, `Button`, `Paragraph`, `tabular-nums` on stats, accent-only palette, automatic dark mode. Nothing hand-rolled; coherent with the site. Confirmed clean by the detector.
3. **Honest, audience-first IA.** Names the exact personas (Mac bloggers, photo/video YouTubers, newsletter writers) and preempts real objections (low affiliate competition, one-time purchase = faster yes, full commission upfront).

## Priority Issues

**[P1] No closing CTA; peak-end broken.** The only CTA (line 124) precedes all persuasion; the page ends FAQ → footer. A skeptical publisher gets convinced by the FAQ at the bottom, then has nowhere to act and must scroll back up — worst on mobile where the top CTA is far out of reach. *Fix:* add a CTA block after the FAQ ("Ready? Become an affiliate" + sign-in link), ideally preceded by one reassurance element. *Command:* /impeccable onboard (or /impeccable layout)

**[P1] Centered hero + trophy stat cards read as the banned SaaS template and bury the CTA.** Contradicts the reference hero's left-aligned identity and the DESIGN.md hierarchy intent — the accent numbers out-shout the primary action. *Fix:* left-align the hero to match `index.astro`; demote the three terms from centered trophy cards to a quiet horizontal spec row / inline definition list (or shrink the numbers below CTA weight) so the button wins the hierarchy. Keep the facts, drop the trophy treatment. *Command:* /impeccable layout

**[P2] Zero imagery or product/dashboard proof.** A publisher is asked to promote something they never see and trust a tracking dashboard they're never shown. *Fix:* add one product shot or the affiliate-dashboard preview (press-kit assets already exist per FAQ #3) — doubles as "here's what you'd promote" and "here's how tracking looks." *Command:* /impeccable bolder

**[P2] No evidence the program converts or pays.** The central affiliate fear is de-risking payout; the page relies entirely on assertion. *Fix:* surface one concrete trust signal — payout method, a "tracked live" dashboard image, or a short line on existing affiliates / founder accountability (the solo-dev name is a trust asset used elsewhere on the site but absent here). *Command:* /impeccable onboard

**[P3] Token / spacing / alignment drift.** `text-h1 font-bold` (line 144) overrides the deliberate 600 heading weight with 700 (louder than the quiet brand wants); `pt-32 sm:pt-32` (line 109) is redundant; `-mt-4` (line 123) fights `SectionHeading`'s baked margins; centered hero vs left-aligned "How it works" is an internal inconsistency. *Fix:* drop `font-bold`, clean the padding, remove the negative-margin hack, commit to one alignment axis. *Command:* /impeccable polish

## Persona Red Flags

**Publisher / creator (primary):** Evaluating "is this worth my audience's trust" with no visuals of the product or the affiliate dashboard. No proof it converts or pays — must take the copy on faith. Assets/press kit are mentioned only inside FAQ answer #3 as plain text, not a clickable link — creators want to see assets before committing. Gets sold by the FAQ, then has no CTA at the bottom to act.

**First-timer (new to affiliate programs):** The "60 / Cookie Days / Attribution window" card leans on jargon ("cookie", "attribution window") the card itself doesn't explain; bare "60" is the weakest tile. Otherwise well served — steps are clear and plainly worded.

**Mobile:** Three stacked `text-h1` (up to 56px) accent numbers make a long thumb-scroll of giant near-identical cards before "How it works." No sticky/repeat CTA — once past the hero there's no CTA within reach until scrolling back up; the P1 end-CTA gap hurts hardest here.

## Minor Observations

- Steps (lines 168–176) aren't numbered despite the "Three steps" framing — 1/2/3 would reinforce the sequence at no cost.
- `min-h-screen` (line 103) vs the site's `min-h-dvh` — trivial, but real on mobile viewports.
- No `hero-reveal` entrance motion (the reference hero has a staggered one) — a small personality gap on an otherwise static page.
- FAQ "picmal.app/press" and "support@picmal.app" are plain strings, not `.link`s.
- Confirm the `text-accent`-on-`bg-background-subtle/50` big-number contrast in dark mode.

## Questions to Consider

1. If the three numbers *are* the offer, why is the CTA placed above them at half their visual weight — who is supposed to win that hierarchy fight, and did anyone check who actually does?
2. A publisher's real question is "will this convert for *my* audience and actually pay me?" Nothing on the page proves either. What single artifact — one dashboard screenshot, one payout line, one affiliate quote — would de-risk the decision, and why isn't it here?
3. The reference hero is confidently left-aligned with a product video; this page retreats to centered symmetry with no imagery. Deliberate register shift for a B2B audience, or the generic template winning because no one pushed back?
