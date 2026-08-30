import type { APIRoute } from "astro";
import { markdown } from "../utils/markdownResponse";

// The markdown twin of the home page, served by the Worker on
// `Accept: text/markdown`. Hand-written on purpose: index.astro is a visual
// page, and a tag-stripped version of it reads worse than a short summary.
// ponytail: keep it short, so it drifts slowly. Depth lives in /llms.txt.
const body = `# Picmal: your Mac's media toolkit

> Convert, compress, and edit images, video, audio, and PDFs on your Mac,
> instead of trusting sketchy websites with them.

Picmal is a native macOS app. Every file is processed on the Mac it is sitting
on: no uploads, no account, no servers. Online converters mean upload, wait,
download, wait. Picmal means drag, click, done.

## What it does

- Batch convert images between 30+ formats (HEIC, JPG, PNG, WebP, AVIF, TIFF, JXL, SVG, ICNS, ICO, DNG/RAW in)
- Convert and compress video and audio (MP4, MOV, MKV, HEVC, MP3, WAV, M4A, FLAC), with hardware H.264/HEVC encoding
- Compress images, video, audio, and PDFs, with a target file size if you need one
- PDF tools: compress while keeping text selectable, merge, split by page range, images to PDF
- Resize, strip or stamp metadata, change color space and DPI
- One-off jobs: remove a background, vectorize a logo to real SVG paths, build .icns / .ico / iOS icon sets
- Runs from Finder Quick Actions, Shortcuts, Raycast, watched folders, and the \`picmal-cli\` command line

## Pricing

One-time purchase, lifetime license, free updates, no subscription. Priced by
how many Macs it activates on: $29 for 1, $39 for 2, $89 for 5, $149 for 10.
40% student discount, purchasing-power pricing by country, 14-day money-back
guarantee. There is no free trial: the download is the full app and needs a
license to process files.

Machine-readable pricing: https://picmal.app/pricing.md

## Where to go next

- [When to use Picmal, for agents](https://picmal.app/AGENTS.md)
- [Full site summary](https://picmal.app/llms.txt)
- [Documentation](https://picmal.app/docs) and the [command line reference](https://picmal.app/docs/cli)
- [Download](https://picmal.app/download)
- [Blog](https://picmal.app/blog), [changelog](https://picmal.app/changelog)
- [About](https://picmal.app/about), [contact](https://picmal.app/contact), [privacy](https://picmal.app/privacy)
`;

export const GET: APIRoute = () => markdown(body);
