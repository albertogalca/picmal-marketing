---
name: Picmal
description: The local, private, pay-once native Mac app for media conversion and compression.
colors:
  system-blue: "#1b5bff"
  system-blue-deep: "#1450e0"
  system-blue-dark: "#3b82f6"
  cta: "#0d6cf5"
  cta-deep: "#0f5cf1"
  cta-hover: "#0c61dd"
  cta-hover-deep: "#0e53d9"
  paper: "#fbfbfb"
  ink: "#000000d9"
  ink-muted: "#00000099"
  surface-subtle: "#f5f5f5d9"
  hairline: "#edededd9"
  ink-dark: "#ffffffd9"
  ink-muted-dark: "#ffffff99"
  paper-dark: "#242424"
  success: "#065f46"
  success-surface: "#d8f1e9"
  success-dark: "#34d399"
  success-surface-dark: "#213a32"
  warning: "#92400e"
  warning-surface: "#faedd7"
  warning-dark: "#fbbf24"
  warning-surface-dark: "#433620"
  danger: "#991b1b"
  danger-surface: "#f9e0e0"
  danger-dark: "#fca5a5"
  danger-surface-dark: "#422929"
typography:
  display:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.7rem + 2.2vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.28rem + 0.9vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.5vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title-small:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.011em"
  body-big:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.011em"
  label:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.815rem + 0.24vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "-0.006em"
  caption:
    fontFamily: "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0em"
rounded:
  chip: "4px"
  action: "8px"
  panel: "8px"
  full: "9999px"
spacing:
  gutter: "24px"
  section-y: "64px"
  section-y-lg: "80px"
  card-pad: "24px"
  card-pad-lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "#ffffff"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cta-hover}"
    textColor: "#ffffff"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  button-overlay:
    backgroundColor: "#ffffffd9"
    textColor: "#000000"
    rounded: "{rounded.action}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "8px 12px"
---

# Design System: Picmal

## Overview

**Creative North Star: "Quiet Utility, Warm Maker"**

Picmal's site looks and behaves like a well-made native Mac utility, not a marketing funnel. System fonts, the macOS action blue, hairline borders, and generous quiet space do the work; the restraint is itself the argument that the app is carefully built. This is a website that practices what it preaches, calm, precise, and fast, because that is exactly what the product promises.

Underneath the native chrome runs a single person's warmth. The voice is first-person from Alberto, a solo developer: plain, honest, a little dry. The founder letter renders on elevated "paper" with a handwritten signature (Grape Nuts), the one deliberately human note in an otherwise system-native surface. The site never sounds like a company. It leads with the category, then the benefit, and leans on short sentences built from contrast.

The system explicitly rejects the generic SaaS landing template (gradient-mesh heroes, big-number hero-metric cards, endless identical icon-card grids), the sketchy free-converter look it is a reaction against (ad clutter, fake urgency, dark patterns), cold enterprise polish, and loud over-animation. Depth is conveyed through hairline borders and a single lifted action, never decorative glass or shadow.

**Key Characteristics:**
- System-native: Apple system font stack, macOS-style blue, no custom brand typeface (except the signature).
- One accent, used sparingly: blue means action or link, nothing else.
- Flat surfaces, hairline borders; a single 8px corner language across the whole site.
- Automatic dark mode via `light-dark()` tokens; every surface is designed in both themes at once.
- Motion is quiet and physical: press-scale feedback, a one-time staggered hero reveal, `prefers-reduced-motion` honored.

## Colors

A near-monochrome system palette carried by one saturated blue. Neutrals are pure (chroma-free black/white at varying opacity), so the accent is the only hue on the page.

### Primary
- **System Blue** (light `#1b5bff` / dark `#3b82f6`): The directional accent on the page ground. Reserved for inline `.link` accent links, active nav items, and focus rings. Its macOS-native hue signals "real Mac app" by association. In dark mode it lightens to hold contrast on the near-black surface.
- **System Blue Deep** (light `#1450e0` / dark `#2563eb`): The link hover end of the accent.
- **CTA Blue** (`#0d6cf5` into `#0f5cf1`): The primary button's filled face, a vertical gradient. It is a *separate token family from System Blue on purpose*: the accent is a text and stroke color sitting on paper, this is a filled surface carrying white text, and the two have different contrast jobs. One face serves both themes; only the shadow beneath it changes.
- **CTA Blue Hover** (`#0c61dd` into `#0e53d9`): The hover gradient. Deeper, same geometry.

### Neutral
- **Paper** (light `#fbfbfb` / dark `#242424`): The page background. A true off-white at zero chroma, never a warm cream or tinted paper.
- **Ink** (black/white at 85% opacity): Primary body and heading text. Set at 85% so it reads as near-ink without the harshness of full black.
- **Ink Muted** (black/white at 60% opacity): Secondary text, metadata, idle nav links. The light value was 0.5 and was raised to 0.6 so ordinary secondary copy clears WCAG AA on paper; it measures 5.68:1 light and 6.48:1 dark, and is still visibly secondary against 0.85 ink. Do not lower it.
- **Surface Subtle** (light `#f5f5f5` / dark `#2a2a2a`, both at 85%): Card and panel fills, the subtle section band. Applied at ~50% alpha over paper for a barely-there lift.
- **Hairline** (light `#ededed` at 85% / dark `#303030`): Every border and divider. One near-invisible line does the structural work shadows would otherwise do.

### Status
Added for the `/tools` verdict chips, the first thing on the site that needed to say "this is fine" and "this is not" at a glance. Three states, each an ink plus its own flat surface.

- **Success** (`#065f46` on `#d8f1e9` light / `#34d399` on `#213a32` dark): the affirmative verdict.
- **Warning** (`#92400e` on `#faedd7` light / `#fbbf24` on `#433620` dark): works, but conditionally.
- **Danger** (`#991b1b` on `#f9e0e0` light / `#fca5a5` on `#422929` dark): the negative verdict.

The surfaces are opaque rather than an alpha tint on purpose. As `bg-amber-500/15` the same chip measured differently on the page ground than inside a `Card`, so contrast was a property of wherever it happened to sit. Flattened, it belongs to the token. Every pair is measured and clears AA with room (6.1–6.6:1 light, 6.3–7.0:1 dark) and the three are kept close so they read as one system.

### Named Rules
**The Status-Is-Not-Accent Rule.** These are the only hues on the site besides the blues, and they are strictly semantic: they report a state the user is reading about, never an action they can take. Blue stays the only interactive colour. Never use a status colour for emphasis, decoration, or a category tag, and never introduce a fourth state; if something needs a colour and is not success, warning, or danger, it does not need a colour.

**The One Voice Rule.** Blue is the only hue on the page and appears on a small fraction of any screen: the primary CTA, links, active nav, focus. Its rarity is what makes it read as "action." Never tint neutrals toward blue, and never introduce a second accent hue. One sanctioned exception: the testimonial key-phrase highlight uses System Blue at ~15% alpha as a text mark, a deliberate brand touch that stays the same single hue at low intensity. It is the only non-action use of blue; don't extend blue emphasis anywhere else.

**The Pure Neutral Rule.** Neutrals are chroma-zero black and white at varying opacity. No warm cream, no cool slate, no tinted "paper." Warmth in this brand comes from the copy and the founder letter, never from the background.

**The Measured Pair Rule.** Every colour pair that carries text is measured against its own surface before it ships, and the ratio is written down next to the token. Raw palette utilities (`text-amber-700`) carry no light/dark pair and no verified contrast; one of them shipped at 4.34:1. The CTA gradient is measured across its whole run, because the label sits vertically centred and the minimum is always the top stop.

## Typography

**Display / Body Font:** Apple system stack (`-apple-system, BlinkMacSystemFont, SF Pro Display/Text, system-ui, sans-serif`). One family across the whole site; hierarchy comes from weight and size, not from a second face.
**Mono Font:** `ui-monospace, SF Mono, JetBrains Mono, Menlo` for code and technical snippets.
**Signature Font:** "Grape Nuts" (self-hosted), used only for the founder's handwritten signature.

**Character:** Native, neutral, and legible, the system typeface a Mac user sees all day, so the site feels like part of the OS rather than a branded microsite. The semantic scale (`--text-h1 … --text-small`) is the single source of truth; components consume named roles, never raw sizes. `body` feature settings enable `kern, liga, calt, ss01` for crisp Apple-style rendering.

### Hierarchy
- **Display / H1** (600, `clamp(36px → 56px)`, lh 1.12, tracking -0.025em): Hero headline. `text-balance` for even lines.
- **Headline / H2** (600, `clamp(24px → 32px)`, lh 1.15, tracking -0.02em): Section headings.
- **Title / H3** (600, `clamp(19.2px → 20px)`, lh 1.2, tracking -0.015em): Sub-section and card headings.
- **Title Small / H4** (600, `clamp(18px → 20px)`, lh 1.3, tracking -0.01em): Lands at almost the same size as H3; the two are separated by line-height and semantics, not scale, so pick by document structure rather than by how big you want it.
- **Body** (400, 16px, lh 1.6, tracking -0.011em): Default paragraph. Long-form text is capped at 68ch for a comfortable measure; `text-pretty` reduces orphans. Body-big (18→20px) for hero subheads.
- **Label / Small** (400, `clamp(14px → 15px)`, lh 1.55, tracking -0.006em): Metadata, secondary UI, verdict chips. Prices, counts, and stats add `tabular-nums`.
- **Caption** (400, 12px, lh 1.3, tracking 0): The step below small, for labels sitting on media where 14px wraps (the hero demo dock). Never body copy.

### Named Rules
**The Semantic Scale Rule.** Always use the `text-h1 … text-small` tokens (or the `H1`–`H4` / `Paragraph` components), never raw `text-lg`/`text-xl`. Tune sizes only in the `@theme` block. Uppercase and color live on the consuming component, never on the type token.

**The One Family Rule.** The system sans is the only UI typeface. The signature script appears exactly once (the founder letter). Never pair a second display or body sans.

## Layout

One centred column at four widths, with a single vertical rhythm. There is no sidebar and no asymmetric grid anywhere on the site; hierarchy comes from width and space, not from position.

**Containers.** Every band is a `Section`, which picks one of four max-widths: `wide` (80rem, for full-bleed grids), `medium` (72rem), `default` (64rem, the common case), `narrow` (48rem, for reading and forms). The horizontal gutter is a constant 24px (`px-6`); only `wide` drops it at the `xl` breakpoint so its grid can reach the container edge.

**Vertical rhythm.** Sections are 64px top and bottom, opening to 80px from the `sm` breakpoint up. Components never set their own section padding, so the rhythm cannot drift page to page. Self-contained section components (the feature grid, testimonials, the pricing band, the founder letter) render their *own* `Section`; wrapping one in another doubles the padding.

**Heading blocks.** A `SectionHeading` carries baked-in margins: 48px below the whole block, 16px between the heading and its sublead. Override the block margin only when nothing follows the heading inside that section, where the baked-in value stacks on the section padding and opens a hole.

**Density.** Cards are padded 24px, opening to 32px at `md`. Grids use a 24px gutter. Three-column grids collapse at `md`, two-column at `sm`. Four items sit as a 2×2 block rather than three columns plus an orphan.

**Alternation.** Bands alternate between paper and the subtle surface (`bg-background-subtle/50` with a hairline `border-y`). Two subtle bands never sit next to each other; the alternation is what separates sections, since nothing casts a shadow.

### Named Rules
**The One Column Rule.** Content is centred in a single measure at one of the four sanctioned widths. If a layout wants a sidebar, a sticky rail, or an off-centre hero, it is arguing against the calm the rest of the site is built on.

## Elevation & Depth

Flat surfaces, lifted actions. Panels, cards, and sections are flat fills separated by a single hairline border, no ambient card shadows anywhere. Depth is reserved for two things: the primary button (which carries a layered colored glow so the one action on the page visibly lifts) and media frames (screenshots and video get a ring plus a soft shadow so they read as objects on the page). Nav and overlays use translucency and `backdrop-blur` instead of shadow to float above content. Because drop shadows barely register on the dark surface, dark mode lifts elements with translucent-white overlays and an inset top highlight instead.

### Shadow Vocabulary
- **Primary lift, rest** (`0 1px 2px rgba(0,0,0,0.12), 0 5px 14px -3px rgba(10,114,255,0.35), inset 0 1px 0 rgba(255,255,255,0.22)`): The primary button at rest. A contact shadow, a colored glow tinted to the button's own blue, and an inset top highlight.
- **Primary lift, hover** (`0 2px 5px rgba(0,0,0,0.14), 0 10px 22px -4px rgba(10,114,255,0.45), inset 0 1px 0 rgba(255,255,255,0.28)`): Same three layers, further and stronger. Active flattens toward `shadow-sm` and scales to 0.96.
- **Primary lift, dark rest** (`0 1px 2px rgba(0,0,0,0.45), 0 5px 16px -3px rgba(59,130,246,0.5), inset 0 1px 0 rgba(255,255,255,0.18)`): On the dark ground the contact shadow deepens and the glow shifts to the dark accent, because the light-mode glow disappears against near-black.
- **Primary lift, dark hover** (`0 2px 6px rgba(0,0,0,0.55), 0 12px 26px -4px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.26)`).
- **Media frame** (`ring-1 ring-black/[0.08] dark:ring-white/10` plus a layered soft shadow): Screenshots, the hero demo video, filled images. Shadows sit over borders.
- **Inset highlight** (`inset 0 1px 0 rgba(255,255,255,…)`): The dark-mode top edge that fakes a light source on translucent surfaces (secondary button, founder letter).

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. A shadow is a response, not decoration: it belongs to the single primary action and to media objects, nowhere else. If a card has a resting drop shadow, it is wrong, use the hairline border.

**The Image Outline Rule.** Filled images get a `ring-1 ring-black/10 dark:ring-white/10` in pure black/white, never tinted. Transparent cutouts (logos, the founder badge) use `filter: drop-shadow(...)` instead, a ring would box the cutout's bounding rect.

**The Tinted Glow Rule.** The primary button's glow is tinted to the button's own blue, never neutral black, and it always carries an offset and a blur. A zero-offset halo is decoration; this is a light source.

## Shapes

One corner radius, applied almost everywhere. The site is built on 8px, anchored to the button, and the larger radius steps are deliberately collapsed onto the same value so nothing reads as a different corner language.

- **8px (`--radius-lg/xl/2xl`, all 0.5rem):** Buttons, cards, panels, modals, media frames, inputs. `rounded-lg`, `rounded-xl` and `rounded-2xl` all render identically. This is intentional, not an oversight.
- **4px (`--radius-sm`):** Inline chips only, where the element is far smaller than a button and 8px would read as a pill.
- **`rounded-full`:** Avatars, the release badge, pills. Escapes the collapse on purpose.
- **Explicit arbitrary values** (`rounded-[…]`): Only the app-icon squircles, which follow Apple's own curve.

Borders are the structural device rather than the decorative one: one hairline at 1px, never a colored or thickened edge. There are no clip paths, no angled cuts, no organic blobs anywhere in the system.

### Named Rules
**The One Corner Rule.** Tune roundness from the radius block in `@theme` and nowhere else. If a new element needs a corner that is not 8px, 4px, or fully round, the element is wrong before the radius is.

## Components

Calm and native: components feel like macOS itself, hairline borders, system type, subtle translucency, and one confident blue action. Every interactive element presses (`active:scale-[0.96]`, large cards and pills 0.97–0.98, never below 0.95) and carries a `focus-visible` accent outline.

### Buttons
- **Shape:** Gently rounded, 8px (`rounded-lg`). Sizes: normal (`py-3 px-6`, 16px text), small (`py-2 px-4`, 14px text). Icon-only buttons are square at a 40–48px touch target. Small variants extend to a 44px hit area with a transparent `before:` pseudo-element rather than growing visually.
- **Primary:** White text on a vertical CTA Blue gradient (`#0d6cf5` at 14% to `#0f5cf1` at 81.56%), with the "Primary lift" glow. The single loud element on any screen. Hover deepens to the hover gradient and pushes the shadow further; active scales to 0.96 and flattens. The gradient is one face in both themes; only the shadow swaps.
- **Secondary:** Ink text on paper with a hairline border and `shadow-xs`. Hover shifts to surface-subtle. In dark mode: a translucent-white fill (`white/6`) with an inset top highlight instead of a shadow.
- **Overlay:** Black text on `white/85` with `backdrop-blur-md` and a faint ring, for buttons sitting on top of imagery or video.
- **Transitions:** Explicit properties only (`transition-[scale,box-shadow,background-color,border-color] duration-200 ease-out`), `motion-reduce:transition-none`. Never `transition-all`.

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** Surface-subtle at 50% alpha (`bg-background-subtle/50`) over paper.
- **Border:** One hairline (`border border-border`). No shadow (see Flat-By-Default).
- **Internal Padding:** `p-6 md:p-8` (24 → 32px) by default. Never nest a card inside a card.

### Inputs / Fields
- **Style:** Paper background, hairline border, 8px radius, `px-3 py-2`. Placeholder uses secondary ink (still legible, not a faint gray).
- **Focus:** `focus-visible:outline-2 outline-offset-2 outline-accent`, the same blue focus ring used site-wide. No glow, no border-color hack.

### Navigation
- **Style:** Fixed top bar, `bg-background/80` with `backdrop-blur-lg` and a bottom hairline. Links use body size; idle links are muted ink, hover and focus go to full ink, and the current page goes System Blue. Mobile links get a surface-subtle hover fill and press-scale. Focus rings throughout.
- **Buy button:** The bar carries the primary action, and it defaults to the entry tier. A page written for one audience passes its own tier, so the loudest button on screen is not arguing against the page beneath it.

### Layout components

These cover every grid, card and shell on the site. Nothing hand-rolls these
shapes. If a new section needs one, it is one of these or it is a mistake.

- **`BlockGrid`** — flat content blocks. No panel, no border, no fill. Each block
  leads with an optional marker in a fixed 40px slot: a Phosphor duotone `icon`,
  or the step number when `ordered` is set. `ordered` also switches the markup to
  `<ol>`/`<li>`, because a sequence of steps is an ordered list and a set of
  features is not. That is the only thing it changes: same surface, same
  `gap-x-8 gap-y-10`, same type. Give it a `heading` and it owns its Section;
  omit the heading and it renders bare inside the page's own.
- **`PostCard`** — anything clickable that leads somewhere else. Cover, category
  and date render only when the destination has them, so a blog guide and a
  product page share one card. It sits on `LinkCard`, which owns the hover, the
  press and the focus ring for every whole-card link.
- **`RelatedGrid`** — the "related guides and tools" block. A `/blog/` href fills
  its own title, description, cover, category and date from the collection. A
  `label` always overrides that: internal anchor text is tuned per page, and
  moving it moves rankings, so the page wins over the collection.
- **`MediaFrame`** — the hairline ring plus layered shadow around a video or a
  screenshot, with the 16:9 well inside it.

Everything else is a page shell or a small shared piece:

- **`MarketingLayout`** — `<html>`, `<head>`, the one body class, `Header`,
  `<main id="main-content">` and `Footer`. Slots: `head` for schema, default for
  the page, `after` for modals and scripts. No page hand-rolls a shell.
- **`FAQSection`** — the questions block. `FAQSchema` carries the matching
  JSON-LD and strips markup out of the answer text.
- **`AlternativeVerdict`** and **`ComparisonTable`** — the two blocks that make up
  a `/alternative` page.
- **`FileSizeTable`**, **`GuideCrossLink`**, **`PillLink`**, **`FormatPill`**,
  **`ToolHero`**, **`SectionLink`** — the small shapes, one definition each.
- **`.field`** in `global.css` — the one text input, alongside `.link`.

`FeatureGrid` is the data for the home page's feature list. It renders through
`BlockGrid` like everything else.

### Signature Components
- **Founder Letter:** An elevated "paper" card carrying a first-person note and the Grape Nuts handwritten signature, the one warm, human surface. In dark mode it lifts with a translucent overlay and inset highlight rather than a shadow.
- **Release Badge:** A small "What's new in vX" pill in the hero, auto-linked to the latest changelog entry.
- **Masonry Testimonials / Trust Bar:** Social proof primitives, an avatar stack with a "trusted by N" count (tabular-nums) and a masonry wall of real quotes.
- **Verdict Chips:** The `/tools` state chips, the only place the status palette appears.

## Do's and Don'ts

### Do:
- **Do** use the semantic type tokens (`text-h1 … text-small`) and the `H1`–`H4` / `Paragraph` / `Section` / `Card` / `SectionHeading` primitives. `index.astro` is the reference implementation, reuse it, don't hand-roll markup.
- **Do** keep neutrals pure black/white at opacity, and let blue be the only hue, on a small fraction of any screen.
- **Do** keep every corner at 8px (`rounded-lg/xl/2xl` all render 8px); only `rounded-full` and explicit app-icon squircles escape.
- **Do** design light and dark at once via `light-dark()` tokens; verify body text hits 4.5:1 in both themes.
- **Do** use the CTA token family for the primary button's fill and the accent tokens for text and strokes. They are different jobs with different contrast requirements.
- **Do** use the status tokens (`text-success` / `bg-warning-surface` / …) for state, and measure any new pair against its own surface before adding it. Raw palette utilities like `text-amber-700` carry no light/dark pair and no verified contrast; one of them shipped at 4.34:1.
- **Do** give press feedback (`active:scale-[0.96]`) and a `focus-visible` accent ring to every interactive element, and gate entrance motion behind `prefers-reduced-motion: no-preference`.
- **Do** outline filled images with `ring-1 ring-black/10 dark:ring-white/10`; use `drop-shadow` for transparent cutouts.
- **Do** let `Section` own the vertical rhythm, and alternate paper and subtle bands rather than reaching for a divider.
- **Do** reach for `BlockGrid`, `PostCard`, `RelatedGrid` or `MediaFrame` before writing a grid. A fifth shape needs a reason, not a preference.
- **Do** give every post card a picture. `postCover()` in `src/utils/posts.ts` falls back to the shared default, so a post with no `heroImage` never leaves a hole in a grid.

### Don't:
- **Don't** build the generic SaaS landing template: no gradient-mesh hero, no big-number hero-metric cards, no endless identical icon-card grids.
- **Don't** drift toward the sketchy free-converter look, ad clutter, fake urgency, dark patterns. Picmal is the reaction against it.
- **Don't** go cold-corporate (faceless "we deliver solutions" polish, stock photography) or loud/over-animated (neon, scroll-jacking, constant motion).
- **Don't** put a resting drop shadow on a card; use the hairline border. Depth belongs to the primary button and media frames only.
- **Don't** wrap a block of text in a panel. The surface marks a card you can click, never a paragraph you can read. Steps, features and principles are flat, and two treatments on one page is the drift these components were merged to stop.
- **Don't** use `{colors.system-blue}` as the primary button's fill. That was the old face and its top stop measured 3.29:1 against white. The button's minimum is always the gradient's top stop; keep it at or above 4.5:1.
- **Don't** use gradient text (`background-clip: text`), decorative glassmorphism, side-stripe accent borders >1px, or a tiny uppercase tracked eyebrow above every section.
- **Don't** tint neutrals toward warm cream or any hue, introduce a second accent color, add a second UI typeface, or use `transition-all` or em dashes.
- **Don't** set section padding on a component that already renders its own `Section`; the rhythm doubles.
