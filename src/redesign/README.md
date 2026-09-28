# Redesign preview

The new design system (minimal ground, two-tone headings, pixel textures) running on the site's real data, at `/next` on the dev server only.

Nothing here touches a live page. The route `src/pages/next/[...path].astro` returns no paths in a production build, so `/next` is never deployed, indexed or put in the sitemap. The preview layout skips `BaseHead`, so it loads no Seline and cannot move the conversion measurement. Delete that file and this folder to remove it all.

## Routes

| Preview | Template for | Data |
| --- | --- | --- |
| `/next` | the homepage | live copy from `index.astro`, `FeatureGrid`, `FAQSchema`, `config/pricing.ts`, `testimonials.json` |
| `/next/convert/<slug>` | every `/convert/*` page | `data/conversions.ts` |
| `/next/blog`, `/next/blog/<slug>` | blog index and posts | the `blog` collection and its generated covers |
| `/next/changelog` | `/changelog` | the `changelog` collection |
| `/next/alternative/tinypng` | the `/alternative/*` pages | TinyPNG as the worked example |
| `/next/tools/exif-viewer` | the `/tools/*` pages | layout only, the exifr logic plugs in unchanged |

## What is where

- `lib/pixels.ts`: the textures. `skyline` is the dune from `scripts/generate-blog-covers.js`, so live art matches the card.png covers.
- `styles.css`: `--pm-*` tokens and the component styles, scoped to the preview.
- `components/`: the parts. `Footer` keeps every link the live footer has, plus `NewsletterSignup` and `FeaturedOn` as they are.
- `views/`: one file per template.

## Rollout, in order

1. After the homepage freeze reading (from 12 October, see CLAUDE.md): move the tokens into `global.css` `@theme`, swap `index.astro` to the new sections in one deploy, and start a fresh measurement window.
2. Header and Footer site-wide in the same deploy (they sit on every page but change no page copy).
3. After the SEO hold (26 October): the convert template on the noindexed conversions first, then the indexed ones. No page twice inside 4 weeks.
4. Alternatives, blog layout, tools, changelog. Docs stay on Starlight and only get the tokens through `customCss`.

## Known gaps

- The demo clips have the lake wallpaper baked in, so `VideoShowcase` crops the window out of each frame. Record window-only clips and drop the crop.
- The alternative and tool views are one worked example each, not wired to all pages.
- Mobile is handled with a few breakpoints; it needs a pass on a real phone.
