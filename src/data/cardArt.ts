/**
 * Card art for blog posts and product pages, drawn live with the design
 * system's ArtCard instead of the pre-rendered card.png files.
 *
 * The labels are the same hand-written ones scripts/generate-blog-covers.js
 * uses (keep both in step). What is new is the texture: the design system ties
 * each texture to a job, so a conversion guide dissolves, a compression guide
 * dithers, audio waves, video scans, comparisons are a mosaic and anything
 * about Picmal itself flows. The ground follows the post's category.
 */
export type Texture = "skyline" | "dither" | "dissolve" | "wave" | "mosaic" | "scan" | "flow";
export type Ground = "brand" | "night" | "paper";
export interface Art { title: string; texture: Texture; ground: Ground; seed: string }

export const CARD_LABELS: Record<string, string> = {
  "batch-convert-images-mac": "Batch",
  "best-image-formats-for-web": "7 formats",
  "best-media-converter-mac-2026": "8 apps",
  "best-video-converter-mac-2026": "7 apps",
  "bulk-resize-images-mac": "Resize",
  "compress-images-for-website-mac": "Web images",
  "compress-jpeg-mac": "JPEG",
  "compress-pdf-mac": "PDF",
  "compress-video-with-handbrake": "HandBrake",
  "convert-arw-to-jpg-mac": "ARW → JPG",
  "convert-audio-mac": "Audio",
  "convert-avi-to-mp4-mac": "AVI → MP4",
  "convert-avif-to-jpg-mac": "AVIF → JPG",
  "convert-flac-to-alac-mac": "FLAC → ALAC",
  "convert-heic-to-pdf-mac": "HEIC → PDF",
  "convert-heic-to-png-mac": "HEIC → PNG",
  "convert-hevc-to-mp4-mac": "HEVC → MP4",
  "convert-images-to-webp-mac": "→ WebP",
  "convert-images-without-uploading-online": "No upload",
  "convert-mkv-to-mp4-mac": "MKV → MP4",
  "convert-mov-to-mp4-mac": "MOV → MP4",
  "convert-raw-to-jpg-mac": "RAW → JPG",
  "convert-svg-to-png-mac": "SVG → PNG",
  "convert-tiff-to-jpg-mac": "TIFF → JPG",
  "convert-video-with-vlc-mac": "VLC",
  "convert-wav-to-mp3-mac": "WAV → MP3",
  "convert-webp-to-jpg-mac": "WebP → JPG",
  "convert-webp-to-png-mac": "WebP → PNG",
  "how-to-compress-video-mac": "Video",
  "how-to-convert-heic-to-jpg-mac": "HEIC → JPG",
  "how-to-extract-audio-from-video-mac": "Video → Audio",
  "how-to-organize-digital-photos": "Photos",
  "imageoptim-alternatives-mac": "ImageOptim",
  "license-managers-mac-app-research": "Licenses",
  "permute-vs-picmal": "vs Permute",
  "picmal-april-2026": "April",
  "picmal-may-2026": "May",
  "picmal-june-2026": "June",
  "picmal-july-2026": "July",
  "picmal-august-2026": "August",
  "how-to-enable-picmal-right-click-menu": "Finder",
  "top-batch-image-converter-mac": "5 apps",
  "publish-your-macos-app-outside-the-app-store": "No App Store",
  "png-to-mac-icon-icns": "PNG → ICNS",
  "quicktime-to-gif-mac": "MOV → GIF",
  "reduce-image-file-size-mac": "Smaller",
  "reduce-photo-library-size-mac": "−46 GB",
  "what-is-image-file-format": "Formats",
};

export const PAGE_CARD_LABELS: Record<string, string> = {
  "compress": "All formats",
  "compress-images-mac": "Compress images",
  "compress-video-mac": "Compress video",
  "compress-audio-mac": "Compress audio",
  "image-converter-mac": "Convert images",
  "video-converter-mac": "Convert video",
  "resize-image-mac": "Resize",
  "extract-audio-from-video-mac": "Video → Audio",
  "alternative/handbrake": "vs HandBrake",
  "tools": "Free tools",
  "tools/exif-viewer": "EXIF",
  "tools/file-format-checker": "Will it open?",
  "tools/image-file-size-calculator": "File size",
};

const AUDIO = /\b(WAV|MP3|FLAC|ALAC|AAC|M4A|OGG|Audio)\b/i;
const VIDEO = /\b(MOV|MP4|MKV|AVI|HEVC|VLC|HandBrake|Video)\b/i;

function textureFor(slug: string, label: string): Texture {
  if (/^picmal-|right-click|outside-the-app-store|license-managers/.test(slug)) return "flow";
  if (/compress|reduce-|smaller|web-images/.test(slug) && !/^alternative\//.test(slug)) return "dither";
  if (/apps$|^vs |ImageOptim|formats?$|^Formats$|^File size$|^EXIF$|^Will it open\?$|^Free tools$|^All formats$/i.test(label)) return "mosaic";
  if (/^alternative\//.test(slug)) return "mosaic";
  if (/→/.test(label)) {
    const from = label.split("→")[0];
    if (/Audio$/.test(label)) return "wave";
    if (AUDIO.test(label) && !VIDEO.test(from)) return "wave";
    if (VIDEO.test(from) || /GIF$/.test(label) && VIDEO.test(from)) return "scan";
    if (/Audio$/.test(label)) return "wave";
    return "dissolve";
  }
  if (AUDIO.test(label)) return "wave";
  if (VIDEO.test(label)) return "scan";
  if (/convert/.test(slug)) return "dissolve";
  return "skyline";
}

const GROUNDS: Record<string, Ground> = { Guide: "paper", Tutorial: "brand", Newsletter: "night" };

/** Art for a blog post, or undefined when the post has no label (hand-made cover). */
export function postArt(slug: string, category?: string): Art | undefined {
  const title = CARD_LABELS[slug];
  if (!title) return undefined;
  return { title, texture: textureFor(slug, title), ground: GROUNDS[category ?? ""] ?? "paper", seed: slug };
}

/** Art for a product or tool page by its href ("/compress-images-mac"). */
export function pageArt(href: string): Art | undefined {
  const slug = href.replace(/^\//, "").replace(/\/$/, "");
  const title = PAGE_CARD_LABELS[slug];
  if (!title) return undefined;
  return { title, texture: textureFor(slug, title), ground: slug.startsWith("tools") ? "night" : "brand", seed: slug };
}
