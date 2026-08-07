# Picmal Marketing Plan — Aug 2026 → Jan 2027

Written 6 Aug 2026. Setapp declined, so this plan routes around it.

## Where things actually stand

| Metric | Value | Source |
| --- | --- | --- |
| Revenue run rate | **~$385/month** | Seline charges (29 Jul – 6 Aug) + Notion tracker |
| All-time | $6,082 over 55 weeks | Notion, of which $1,510 was one BundleHunt payout |
| Direct sales, all-time | 320 | ASP $16.95 |
| Real traffic | **~38 visitors/day** | Seline (bot-filtered; PostHog was overcounting ~2.5×) |
| Visitor → paid | **1.9%** | 312 visitors → 6 charges |
| Google impressions | ~11,000/week | GSC |
| Google CTR | **0.9%** | GSC, position 11–15 |
| Brand share of clicks | 26% (query "picmal") | GSC |

Three conclusions the data forces:

1. **Conversion is not the problem.** 1.9% visitor→paid on a cold, no-trial $16 utility is healthy. The landing page works.
2. **Traffic is the problem, and SEO can't fix it.** The pages rank (position 11–15) but CTR is 0.9% against an expected 3–5%. Google is answering the queries with AI Overviews instead of sending clicks. That is not a content problem and more pSEO pages will not move it.
3. **Referral spikes don't convert.** Land-book (368 visitors), Threads (981 visitors), One Page Love — all near-zero sales. These send designers admiring the site, not people with files to convert.

So: you cannot grow this on organic volume. Growth has to come from **price** and **new distribution**.

---

## Pillar 1 — Reprice (ship this week)

Currently $15.99 for **one** Mac. Permute is $14.99 for **three** activations. Picmal is more expensive per device than its closest competitor, with less brand recognition. Worst square on the board.

**New structure:**

| Tier | Price | Per device | Notes |
| --- | --- | --- | --- |
| **1 Mac** | **$19** | $19.00 | Default. The price quoted in all site copy. |
| 2 Macs | $29 | $14.50 | |
| 3 Macs | $39 | $13.00 | Kept by request, it gets asked for |
| 5 Macs | $59 | $11.80 | Commercial use, priority support |

The card opens on 1 Mac at $19. Defaulting the seat stepper to 2 was considered and dropped: it reads as a trick, and it desynced the card from the "$19 one-time" written across every page. The lift here comes from $15.99 → $19 on the entry tier plus a visible ladder, not from a pre-selected upsell.

**Why this is close to free money:** break-even is a **44% drop in unit volume**. At 4–5 sales/week you can't A/B test this (you'd need 6+ months for significance), so don't test — ship it and watch the monthly number. A $16 buyer is deciding "is this worth solving my problem," not comparison-shopping $16 vs $29. Multi-device orders already appear regularly in the sales log with zero merchandising.

**Side effect worth having:** the affiliate program currently pays $4/sale, which motivates nobody. At $29 it's $7.25, and a Studio referral is $15.

**Not doing now:** the PopClip-style paid-update model (€13 for 2 years / €34 lifetime). Right structure long-term, but at 320 lifetime customers an upgrade event nets ~$1,400 once. Revisit at v2, grandfather everyone who already paid.

**Not doing at all:** a free tier with a 7-day trial. That buys volume you don't have the traffic to generate, in exchange for permanent support load and a gated codebase. The bottleneck is discovery, not friction.

---

## Pillar 2 — Mac App Store (the replacement for Setapp)

This is now the main growth bet. It is the only channel that puts Picmal in front of buyers who will never see a Google result.

**Why it works here specifically:**

- MAS has its own search engine with **no AI Overviews**. The 0.9% CTR problem does not exist there.
- Apple handles VAT, refunds, and licensing. This removes tax-shock at checkout, which is currently a suspected leak on direct sales ($15.99 ex-tax becomes ~$19.35 for an EU buyer).
- MAS trust closes the "who is this developer and is this DMG safe" objection that costs you non-technical buyers.
- 15% commission under the Small Business Program (apply for it — you qualify).

**Scope — ship a restricted build, don't fight the sandbox:**

- Keep: drag-and-drop, file picker, batch convert/compress, PDF, video, audio, Shortcuts via App Intents. All work fine with `user-selected.read-write` plus security-scoped bookmarks.
- Drop from the MAS build: folder-watch auto-conversion, Finder Quick Actions (restructurable as an app extension later, not worth blocking launch), Sparkle updates (Apple handles).
- Keep the direct DMG as the **full** version. Two products, two buyers. No cannibalization.

**MAS pricing: $24.99, single price.** Higher than direct single-Mac on purpose — Apple takes 15%, and MAS buyers are paying for trust and convenience. No device tiers on MAS (Family Sharing covers a household), which makes it naturally a multi-Mac license.

**ASO is the entire game.** MAS ranking is driven by metadata and ratings:

- App name (30 chars): "Picmal" alone wastes the field. Use something like `Picmal: Convert & Compress`.
- Subtitle (30 chars): keyword-dense, human-readable.
- Keywords field (100 chars, hidden from users): `heic,webp,avif,converter,compress,batch,pdf,mp4,resize,raw,video,audio`.
- Screenshots and the preview video do the converting. Ratings drive the ranking — prompt for them in-app after a successful batch.
- Run the `aso-audit` skill before submitting.

**Honest expectation:** MAS is a lottery and most utilities get little. But the floor is decent and the ceiling is high. At 0.3 sales/day it's ~$190/mo (+50% on today). At 2 sales/day it's ~$1,260/mo (3× everything you have now). Two to four weeks of work for that distribution of outcomes is clearly worth taking.

---

## Pillar 3 — Bundles and deal channels (proven, undervalued)

BundleHunt sold **604 licenses for $1,510 in eight weeks**. That single campaign out-earned direct sales for the same period. The $2.50 ARPU felt bad, but it was the best channel of the year and cost nothing but a code list. It also seeds reviews, word of mouth, and directory presence.

Q4 line-up:

- **BundleHunt** — pitch again for a Q4 slot.
- **Black Friday roundups** — Michael Tsai's annual post is the priority; he publishes ~21–25 Nov, so pitch mid-November. Use the standard outreach email verbatim.
- **StackSocial / DealMirror** — lower quality, but incremental.
- **Own Black Friday sale** — 30% off the new $29 tier for one week.

---

## Pillar 4 — Community and content (maintenance, not growth)

One platform, done consistently. Everything else is noise.

- **Reddit r/macapps, monthly.** REDDITORS codes show up across your entire sales history, in almost every good week. This is your community and the only social channel with evidence behind it. The monthly update post already exists as a repo skill.
- **Newsletter, monthly.** Owned audience, no algorithm, and the changelog writes it for you.
- **Stop** chasing design-gallery features (Land-book, One Page Love) and Threads. Vanity traffic.
- **Stop** building new pSEO conversion pages. Maintain what exists; the asset ranks, Google just won't send clicks.

**Content, three levels:**

- **Educate** — "What I learned selling 320 copies of a $16 Mac app" · "Why your Photos library is 400GB and what actually shrinks it" · "SVG to PNG on a Mac without opening a browser" (your #2 page, repackaged) · "What sandboxing cost me when I shipped to the App Store"
- **Inspire** — Publish the real numbers: $6,082 in 13 months, 0.9% CTR, what BundleHunt actually paid, what Setapp said. Indie devs share and cite honest revenue posts and ignore polished ones. This is also your best shot at the backlinks and brand awareness that are the actual constraint.
- **Entertain** — The gap between "all-time record traffic week" and "3 sales" is genuinely funny and should be written that way.

**Worth a look:** `clien.net` (Korean Mac community) appeared in referrers, as did `macapp.supply` and `indieappsales.com`. Korea and Japan are strong markets for paid Mac utilities and have far less AI-Overview interference. Low-cost experiment once MAS is live.

---

## Timeline

| Month | Work |
| --- | --- |
| **August** | Ship the new pricing. Start the MAS build target. Apply to the Small Business Program. Header/hero event fix is already in (see below). |
| **September** | MAS submission + ASO pass. Pitch BundleHunt for Q4. |
| **October** | MAS live. Measure two weeks, then iterate keywords and screenshots. Line up deal channels. |
| **November** | Black Friday: Michael Tsai pitch mid-month, own sale, bundle. Biggest revenue month of the year if executed. |
| **December** | Review checkout-abandonment data (now measurable). Fix the leak if there is one. |
| **January** | Decide on the v2 paid-upgrade model based on 5 months of the new pricing. |

## Targets

| | Now | Jan 2027 base | Jan 2027 upside |
| --- | --- | --- | --- |
| Direct | $385/mo | $550/mo | $700/mo |
| Mac App Store | — | $200/mo | $1,000/mo |
| Bundles (Q4, one-off) | — | $1,500 | $2,500 |

Base case roughly doubles the business. Upside case is ~4×. Neither requires more SEO traffic, which is the point.

## Instrumentation note

`buy_clicked` was firing on two different actions — the real checkout link in `DynamicPricing.astro` **and** scroll-to-pricing buttons in `Header.astro` and `ComparisonHero.astro`. That made checkout abandonment unmeasurable. Fixed 6 Aug: nav clicks now emit `pricing_nav_clicked` / `pricing_nav_*`, and `buy_clicked` means checkout only. Give it two weeks, then read the funnel — if abandonment is high, that is the cheapest revenue in the whole plan.

## What this plan deliberately does not do

- No paid ads. You don't know your customer profile precisely enough, and you can't pay more than ~$29 to acquire a $29 customer.
- No new pSEO pages.
- No free tier.
- No Setapp (declined).
