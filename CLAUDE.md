# Picmal Marketing Website

## Overview

Picmal is a macOS image conversion and compression application. This repository contains the marketing website built with Astro 5, featuring dynamic conversion pages, blog content, and an affiliate program.

## Key Features

- **Programmatic SEO**: Dynamic conversion pages for all image format combinations (HEIC, JPG, PNG, WebP, AVIF, etc.)
- **Blog & Changelog**: MDX-based content management
- **Affiliate Program**: Stripe integration with 25% commission
- **Image Optimization**: Sharp integration for responsive images
- **Auto-updates**: App update distribution via appcast.xml

## Project Structure

```
picmal-marketing/
├── public/
│   └── apps/picmal/updates/     # App binaries and update manifests
│       ├── update.xml            # Sparkle update feed
│       └── [version]/            # Version-specific DMG files
├── src/
│   ├── components/               # Reusable Astro components
│   │   ├── FileSizeComparison.astro
│   │   ├── ProcessSteps.astro
│   │   ├── TrustBar.astro
│   │   ├── Testimonials.astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── FAQ.astro
│   ├── content/
│   │   └── blog/                 # MDX blog posts
│   │       ├── changelog.mdx
│   │       └── how-to-convert-heic-to-jpg-mac.mdx
│   ├── data/
│   │   └── conversions.ts        # Programmatic SEO data
│   ├── layouts/                  # Page layouts
│   ├── pages/                    # Route-based pages
│   │   ├── index.astro          # Landing page
│   │   ├── affiliate.astro      # Affiliate program page
│   │   ├── changelog/           # Version history
│   │   ├── compress/[format].astro
│   │   ├── convert/
│   │   │   ├── [from]-to-[to].astro  # Dynamic conversion pages
│   │   │   └── index.astro
│   │   ├── blog/
│   │   └── tools/
│   └── schema/                   # Structured data components
├── scripts/
│   ├── generate-conversions.js  # SEO page management CLI
│   └── list-conversions.js
├── astro.config.mjs
└── package.json
```

## Setup & Installation

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Dependencies

**Core:**

- `astro` - Static site framework
- `@astrojs/mdx` - Markdown with components
- `@astrojs/sitemap` - XML sitemap generation
- `@astrojs/vercel` - Vercel deployment adapter
- `sharp` - Image optimization

**Styling:**

- `@tailwindcss/vite` - Tailwind CSS 4 Vite plugin
- `@tailwindcss/typography` - Prose styling
- `tailwind-merge` - Utility class merging

**Development:**

- `tsx` - TypeScript execution for scripts

### Managing Conversion Pages

The site uses programmatic SEO to generate conversion pages for all image format combinations:

```bash
# List all generated conversions
npm run list-conversions

# Show conversion statistics
npm run generate-conversions -- --stats

# Preview specific conversion data
npm run generate-conversions -- --preview heic jpg

# List all supported formats
npm run generate-conversions -- --formats

# Validate all conversion data
npm run generate-conversions -- --validate
```

Output is generated in `./dist/` directory

## Pages & Routes

### Main Routes

- `/` - Landing page with hero, features, testimonials
- `/affiliate` - Affiliate program (Stripe integration)
- `/changelog` - App version history
- `/blog` - Blog posts index
- `/blog/[slug]` - Individual blog posts
- `/convert` - Conversion tools index
- `/convert/[from]-to-[to]` - Dynamic conversion pages (e.g., `/convert/heic-to-jpg`)
- `/compress/[format]` - Format-specific compression pages
- `/tools` - Tools index
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Dynamic Conversion Pages

The site generates conversion pages for all format combinations using the pattern:

```
/convert/[from]-to-[to]
```

Each page includes:

- SEO-optimized title and description
- Conversion benefits and use cases
- File format comparison
- FAQ section
- Download CTA

Supported formats: HEIC, HEIF, JPG, JPEG, PNG, WebP, AVIF, TIFF, BMP, GIF, SVG

## App Updates System

The site serves app updates for Picmal using Sparkle framework:

- **Update manifest**: `public/apps/picmal/updates/update.xml`
- **Appcast**: `public/picmal/appcast.xml`
- **Binaries**: Stored in `public/apps/picmal/updates/[version]/Picmal.dmg`

### Current Version: 1.4.7

Recent versions are tracked in the update manifests. Old DMG files (versions < 1.1.4) have been removed from the repository to reduce size.

## Affiliate Program

Integrated with Stripe:

- **Commission**: 25% per sale
- **Page**: `/affiliate`
- **Signup URL**: `https://cantimplorastudio.lemonsqueezy.com/affiliates`

## SEO & Performance

- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **RSS Feed**: Available for blog posts
- **Structured Data**: Organization schema in footer
- **Image Optimization**: Sharp with responsive sizes (320, 640, 1280px)
- **Static Generation**: All pages pre-rendered at build time

## Configuration

### Astro Config (astro.config.mjs)

```javascript
{
  site: "https://picmal.app",
  trailingSlash: "never",
  integrations: [mdx(), sitemap()],
  output: "static",
  adapter: vercel({
    imagesConfig: {
      sizes: [320, 640, 1280],
    },
  })
}
```

### Vercel Deployment

- **Output**: Static
- **Adapter**: `@astrojs/vercel`
- **Image Optimization**: Configured for 3 responsive breakpoints

## Recent Updates (Updated: 2025-10-20)

### Version 1.1.4 Release

- App binary updated to version 1.1.4
- Update manifests synchronized (update.xml, appcast.xml)
- Changelog updated with release notes

### Landing Page UX Improvements

- Added `FileSizeComparison` component for visual file size benefits
- Added `ProcessSteps` component to show conversion workflow
- Added `TrustBar` component for social proof
- Reorganized header navigation and structure
- Updated testimonials display
- Enhanced footer layout

### Stripe Integration

- Implemented affiliate program with 25% commission
- Created dedicated `/affiliate` page with FAQ
- Updated button components to support affiliate links
- Added Stripe branding and links

### Repository Cleanup

- Removed old DMG files (versions 1.0.6-15 through 1.1.3) to reduce repository size
- Kept only latest version (1.1.4) for distribution
- Update manifests still reference all versions via CDN

### Content Updates

- Updated page titles for better SEO
- Enhanced HEIC to JPG conversion guide
- Testimonial added to demo section

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
| `PricingSection` / `DynamicPricing`   | Pricing band + interactive device/price card.                                                                                                                                |
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
- **Also true, reuse as needed:** pay once ($15.99, updates included, no
  subscription), batch hundreds at once, a real native Mac app (not a web wrapper),
  lives in Finder / Shortcuts / Quick Actions.
- **A little edge is fine** ("instead of trusting sketchy websites with them"),
  but stay friendly — no fear-mongering, no name-calling the reader.
- **No em dashes.** Use commas, periods, or "and". (Author preference.)
- No jargon dumps (bitrate, codec) unless the reader opted into advanced territory.

## Development Notes

### Content Management

- Blog posts use MDX for rich content with components
- All content in `src/content/blog/` with frontmatter metadata
- Changelog maintained as MDX for structured version history

### Styling Approach

- Tailwind CSS 4 with Vite plugin (no `tailwind.config.*` — configured via the
  `@theme` block in `src/styles/global.css`)
- Component-scoped styles in `.astro` files
- Typography plugin for prose content
- See the **Design System** section for tokens, primitives, and reuse rules

### Performance Optimization

- Static site generation for all routes
- Optimized images with Sharp
- Minimal JavaScript (Astro Islands architecture)
- CDN delivery via Vercel

## Common Tasks

### Update App Version

1. Add new DMG to `public/apps/picmal/updates/[version]/`
2. Update `public/apps/picmal/updates/update.xml`
3. Update `public/picmal/appcast.xml`
4. Update `src/content/blog/changelog.mdx`
5. Update landing page if needed

### Add New Blog Post

1. Create `.mdx` file in `src/content/blog/`
2. Add frontmatter (title, description, pubDate, category, heroImage)
3. Write content using MDX (supports components)
4. Build to generate static page

### Modify Conversion Pages

1. Edit `src/data/conversions.ts` for data changes
2. Modify `src/pages/convert/[from]-to-[to].astro` for template changes
3. Run `npm run generate-conversions -- --validate` to check data
4. Build to regenerate all conversion pages

## Important Notes

- The site is fully static - no server-side rendering at runtime
- All conversion pages are pre-generated at build time
- App updates are served as static files from `public/` directory
- Affiliate links point to Stripe platform
- Image formats and conversion data are managed in `src/data/conversions.ts`
- Scripts in `scripts/` directory help manage programmatic SEO content
- Don't add hover effects to elements that are not clickable. It doesn't make sense.
