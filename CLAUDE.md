# Picmal Marketing Website

## Overview

Picmal is a macOS image conversion and compression application. This repository contains the marketing website built with Astro 5, featuring dynamic conversion pages, blog content, and an affiliate program.

## Key Features

- **Programmatic SEO**: Dynamic conversion pages for all image format combinations (HEIC, JPG, PNG, WebP, AVIF, etc.)
- **Blog & Changelog**: MDX-based content management
- **Affiliate Program**: Lemon Squeezy integration with 25% commission
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
- `/affiliate` - Affiliate program (Lemon Squeezy integration)
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

### Current Version: 1.1.4

Recent versions are tracked in the update manifests. Old DMG files (versions < 1.1.4) have been removed from the repository to reduce size.

## Affiliate Program

Integrated with Lemon Squeezy:

- **Commission**: 25% per sale
- **Page**: `/affiliate`
- **Signup URL**: `https://affiliates.lemonsqueezy.com/programs/picmal`

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

### Lemon Squeezy Integration

- Implemented affiliate program with 25% commission
- Created dedicated `/affiliate` page with FAQ
- Updated button components to support affiliate links
- Added Lemon Squeezy branding and links

### Repository Cleanup

- Removed old DMG files (versions 1.0.6-15 through 1.1.3) to reduce repository size
- Kept only latest version (1.1.4) for distribution
- Update manifests still reference all versions via CDN

### Content Updates

- Updated page titles for better SEO
- Enhanced HEIC to JPG conversion guide
- Testimonial added to demo section

## Development Notes

### Content Management

- Blog posts use MDX for rich content with components
- All content in `src/content/blog/` with frontmatter metadata
- Changelog maintained as MDX for structured version history

### Styling Approach

- Tailwind CSS 4 with Vite plugin
- Component-scoped styles in `.astro` files
- Typography plugin for prose content
- Custom design system via Tailwind config

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
- Affiliate links point to Lemon Squeezy platform
- Image formats and conversion data are managed in `src/data/conversions.ts`
- Scripts in `scripts/` directory help manage programmatic SEO content
- Don't add hover effects to elements that are not clickable. It doesn't make sense.
