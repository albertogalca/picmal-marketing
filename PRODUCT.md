# Product

Inherits ~/Projects/cantimplora/studio/ (values, voice, taste, standard, brand). Only what is
specific to Picmal lives here.

## Register

brand

## Platform

web

## Users

Mac users who need to convert, compress, or edit images, video, audio, and PDFs and don't want to hand their files to a random website to do it. They arrive mostly from search, often mid-task with a specific job in mind ("convert HEIC to JPG on Mac", "compress a video", "extract audio", "merge PDFs"), so many land on a focused conversion or comparison page rather than the homepage. They range from everyday Mac owners to privacy-conscious professionals and creators. Their context is practical and impatient: they have a file, they have a deadline, and the current option (sketchy online converters or bloated apps) annoys them. Success is the visitor understanding within seconds that Picmal does the job locally, then downloading or buying.

## Product Purpose

Picmal is a native macOS app that converts, compresses, and edits images, video, audio, and PDFs entirely on the user's Mac. It exists so people can do everyday media work without uploading files to servers, creating accounts, or paying a subscription. It batches hundreds of files at once and lives in Finder, Shortcuts, Raycast, and Quick Actions like a real Mac app rather than a web wrapper. Success looks like a visitor going from a specific search intent to a download or a $29 purchase, confident their files never left their machine.

## Positioning

The local, private, pay-once Mac app for media conversion and compression: everything happens on your Mac, no uploads, no account, no subscription, in a real native app instead of a sketchy website.

## Conversion & proof

- Primary CTA: Download (the full DMG) and Buy for $29 (Stripe). There is no free trial; "Download" is the complete app, "$29" is the one-time purchase for one Mac, and there is a 14-day refund for anyone it does not suit.
- Pricing is a seat ladder, not one price: $29 / $39 / $89 / $149 for 1, 2, 5 and 10 Macs. The site quotes $29 everywhere because it is the entry price and the picker climbs from it. Moving up a tier costs the difference on the same license key. Students get 40% off with a verified school email, and checkout adjusts for purchasing power by country.
- Secondary CTA, for visitors not ready to commit: watch the inline demo video and browse the supported-formats list, so they can see it work before downloading.
- The line a visitor remembers after 10 seconds: files never leave your Mac, and you pay once.
- Belief ladder: (1) this app does exactly the job I searched for; (2) it runs entirely on my Mac, so my files stay private; (3) it's a real, well-crafted native app, not a web wrapper or a sketchy converter; (4) it's a fair, one-time $29, not a subscription; (5) other Mac users trust it, so I can too.
- Proof on hand: testimonials rendered via MasonryTestimonials / TestimonialCard, a TrustBar with a "trusted by N" count, a FeaturedReview, and directory backlink badges (FeaturedOn) held in the footer.

## Brand Personality

First person, from Alberto, a solo developer, not a company. Warm, honest, and a little dry, with a bit of edge but never fear-mongering. Copy says plainly what the thing is, leads with the category then the benefit, and leans on short punchy sentences built on contrast ("Online: upload, wait, download, wait. Picmal: drag, click, done."). The throughline is local and private. No corporate "we deliver solutions" voice, no jargon dumps, no em dashes. The site should make a visitor feel three things: confidence in the craft (a real, well-made native Mac app), a little human warmth and delight from a solo maker, and trust and safety that their files stay on their own machine.

## Anti-references

Not a generic SaaS landing template (gradient-mesh hero, big-number hero-metric cards, endless identical icon-card grids). Not a sketchy free online converter (ad clutter, upload-your-files-to-us, fake urgency, dark patterns), which is the exact thing Picmal is a reaction against. Not cold enterprise/corporate (faceless "we deliver solutions" voice, stock-photo polish). Not loud or over-animated (neon, scroll-jacking, constant motion, maximalism that distracts from the plain message).

## Design Principles

- Say plainly what it is. Lead with the category, then the benefit; never make the reader guess.
- Local and private is the throughline. Every page can lean on files-never-leave-your-Mac; make the safety felt, not just stated.
- Solo-maker warmth over corporate polish. The voice is one honest person, a little dry, never faceless.
- Craft is the proof. A calm, precise, native-feeling site is itself the argument that the app is well made; restraint over spectacle.
- Meet the searcher where they landed. Focused conversion and comparison pages should resolve the specific intent fast, then earn the download.

## Accessibility & Inclusion

Target WCAG 2.1 AA: body text at 4.5:1 contrast (large text 3:1), keyboard-navigable interactive elements, semantic markup, and honored `prefers-reduced-motion` (the hero entrance and other motion already gate on it). Dark mode is first-class via `light-dark()` tokens, so contrast must hold in both themes.
