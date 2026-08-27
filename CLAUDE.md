# Picmal Marketing Website

Marketing website for Picmal (a macOS image/video/audio/PDF conversion &
compression app), built with Astro 5. Programmatic SEO conversion pages, MDX
blog/changelog, Stripe affiliate program. Structure, deps, and commands are
derivable from the repo (`package.json`, `astro.config.mjs`, `src/`).

## Design System

The landing page (`src/pages/index.astro`) is the reference implementation. Reuse
these tokens, primitives, and rules on every new page instead of hand-rolling
markup. **Review changes on the dev server (`npm run dev`) — do not run `build`/
`astro check` to verify.**

### Tokens — single source of truth: `src/styles/global.css` `@theme`

- **Colors** (all `light-dark()`, so dark mode is automatic): `--color-accent`,
  `--color-accent-dark`, `--color-background`, `--color-text`,
  `--color-text-secondary`, `--color-background-subtle`, `--color-border`.
  Utilities: `text-text`, `text-text-secondary`, `text-accent`, `bg-background`,
  `bg-background-subtle`, `border-border`. Never hard-code hex for UI surfaces.
- **Type scale** (semantic, carries size/line-height/tracking/weight): `text-h1`,
  `text-h2`, `text-h3`, `text-h4`, `text-body-big`, `text-body`, `text-small`.
  Use these, **not** raw `text-lg`/`text-xl`. Headings currently: h1 30→44px,
  h2 24→32px (fluid `clamp`). Tune sizes only in `@theme`.
- **Radius**: `--radius-lg/xl/2xl` are **all collapsed to 8px** on purpose —
  `rounded-lg`/`rounded-xl`/`rounded-2xl` render identically (8px). `rounded-full`
  and explicit `rounded-[…]` (e.g. app-icon squircles) escape this.
- **Fonts**: `--font-sans` (system), `--font-mono`, `--font-signature`
  ("Grape Nuts", loaded via `<link>` only where used).
- `.link` — the class for inline accent links in body copy.
- `cn()` (`src/utils/cn.ts`) — `tailwind-merge` extended to know the custom
  `text-h1…text-small` names, so `<H3 class="text-h4">` overrides correctly. Use
  `cn()` when composing class strings in components.

### Layout primitives (use for every section)

- **`Section.astro`** — `id?`, `width?` (`wide`=7xl · `medium`=6xl · `default`=5xl
  · `narrow`=3xl), `bg?` (`default` | `subtle`), `class?`. Renders
  `relative z-10 px-6` (+`xl:px-0` on `wide`) `py-16 sm:py-20` + centered max-width
  container. `bg="subtle"` adds `bg-background-subtle/50 border-y border-border`.
- **`Card.astro`** — the panel surface `bg-background-subtle/50 border border-border
rounded-2xl`; `padding?` (default `p-6 md:p-8`). Wrap FAQ/panels in this.
- **`SectionHeading.astro`** — the one heading-block primitive. `level?` (`1` hero /
  `2` section, default 2), `align?` (`center` default / `left`), `sublead?` string
  **or** a named `sublead` slot for rich content (links), + `class`/`headingClass`/
  `subleadClass` overrides. Baked-in margins: block `mb-12`, heading `mb-4`.

### Typography components

- **`H1`–`H4`** — render the matching `text-h*` token + `text-text text-balance`.
  Override size while keeping semantics: `<H3 class="text-h4">` = `<h3>` at h4 size.
- **`Paragraph`** — `size?` (`base` | `small` | `lead`), `color?` (`secondary` |
  `primary`); always `text-pretty`. Prefer this over the older `Lead` (which just
  equals `Paragraph size="lead"`).

### Section conventions

- Vertical rhythm: `py-16 sm:py-20` (comes from `Section` — don't set your own).
- Horizontal gutter: `px-6`; `wide` adds `xl:px-0`.
- Under-heading margins: block `mb-12`, heading→sublead `mb-4`.
- Self-contained section components (`FeatureGrid`, `MasonryTestimonials`,
  `PricingSection`, `FounderLetter`) render their **own** `Section` — don't wrap
  them in another `Section` (double padding).

### Content components (reuse, don't rebuild)

| Component                             | What it is                                                                                                                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                              | `variant` primary/secondary/overlay, `size` small/normal, `icon` (SVG path `d`) + `iconType`. Dark-mode-aware primary/secondary; weight `font-[590]`; `active:scale-[0.96]`. |
| `SectionHeading` / `Section` / `Card` | Layout primitives (above).                                                                                                                                                   |
| `FAQ`                                 | `<details>` accordion; `faqs` prop; wrap in a `Card`.                                                                                                                        |
| `ReleaseBadge`                        | "What's new in vX" pill → latest changelog entry (auto from the `changelog` collection). Simple hero badge.                                                                  |
| `FounderLetter`                       | Founder note as an elevated "paper" card.                                                                                                                                    |
| `MasonryTestimonials`                 | `heading`, `showTrustBar`, `trustSuffix`. Renders its own `Section`.                                                                                                         |
| `FeatureGrid`                         | 3-col feature grid (Phosphor duotone icons). Self-contained.                                                                                                                 |
| `PricingSection` / `PricingPlans`     | Pricing band + the two-column plan grid (Picmal / Pro) and the upgrade, student and regional-pricing notes.                                                    |
| `TrustBar`                            | Avatar stack + "trusted by N" count.                                                                                                                                         |
| `SegmentedControl`                    | Tabs/links pill group. Weight matched to buttons (`590`).                                                                                                                    |
| `ComparisonHero`                      | The standard hero for SEO/feature pages (release badge + TrustBar). `index.astro` uses its own bespoke hero.                                                                 |
| `SupportedFormatsModal`               | Formats modal (opened by `#open-formats-modal*` buttons).                                                                                                                    |

### Interaction / "feel" rules (apply to new UI)

- **Scale on press**: `active:scale-[0.96]` on buttons (`0.97–0.98` on large cards /
  small pills); never below `0.95`. Pair with an explicit `transition-[…,scale]`
  and `motion-reduce:transition-none`.
- **Never `transition-all`** — list exact properties (`transition-[color,scale]`).
- **Image outlines**: photos / filled images get `ring-1 ring-black/10
dark:ring-white/10` (pure black/white, never tinted). **Transparent cutouts**
  (logos, the founder badge) use `filter: drop-shadow(...)` instead — a ring boxes
  the cutout's bounding rect.
- **Media frames**: `ring-1 ring-black/[0.08] dark:ring-white/10` + a layered
  `shadow-[...]` (shadows over borders).
- **Tabular numbers**: `tabular-nums` on any dynamic number (prices, counts).
- **Text wrapping**: headings `text-balance` (built into `H*`), body `text-pretty`
  (built into `Paragraph`).
- **Reduced motion**: gate entrance animations behind
  `@media (prefers-reduced-motion: no-preference)`; the hero uses a staggered
  `.hero-reveal` keyframe (opacity + `translateY`, GPU-only).
- **Hit area** ≥ 40–44px; extend small pills with a transparent `before:`
  pseudo-element rather than bloating the visual size.
- **Dark mode** is class-based (`.dark` on `html`) _and_ `light-dark()` tokens.
  Since drop shadows don't show on dark, lift surfaces with translucent white
  overlays + inset top highlight (see `Button` secondary, `FounderLetter`).

## Voice & Tone

How Picmal copy should read. The landing page (`index.astro`), founder letter,
and press kit are the reference.

- **First person, from Alberto** — a solo developer, not a company. Warm, honest,
  a little dry. "I built the thing I wanted to use." Never corporate "we deliver
  solutions" voice.
- **Say plainly what it is** — lead with the category, then the benefit. The hero
  sublead states it flat: "Convert, compress, and edit images, video, audio, and
  PDFs on your Mac." Don't make the reader guess.
- **Short, punchy sentences.** Contrast is the workhorse: "Online: upload, wait,
  download, wait. Picmal: drag, click, done."
- **The throughline is local + private** — files never leave your Mac, no uploads,
  no account, no servers. Every page can lean on this.
- **Also true, reuse as needed:** pay once ($19, updates included, no
  subscription), batch hundreds at once, a real native Mac app (not a web wrapper),
  lives in Finder / Shortcuts / Quick Actions.
- **A little edge is fine** ("instead of trusting sketchy websites with them"),
  but stay friendly — no fear-mongering, no name-calling the reader.
- **No em dashes.** Use commas, periods, or "and". (Author preference.)
- No jargon dumps (bitrate, codec) unless the reader opted into advanced territory.

## Conventions

- Don't add hover effects to elements that are not clickable. It doesn't make sense.
