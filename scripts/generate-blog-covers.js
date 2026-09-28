// Generates a branded Picmal cover image for every blog post missing a heroImage.
// Matches the hand-made "Wrap Up" covers: the checkerboard brand background in
// scripts/assets/cover-bg.png, Picmal lockup top-left, then a dark title and a
// navy one-line sublead. Reuses sharp (already a dep). No AI API.
//
// Run: node scripts/generate-blog-covers.js
//   --force            also regenerate posts that already have a heroImage
//   --cards            make the card.png images instead (see CARD_LABELS)
//   <slug> [<slug>…]   limit to these posts
// Slugs in CUSTOM_COVERS are always skipped, so --force is safe to run bare.

import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = join(root, "src/content/blog");
const OUT_BASE = join(root, "public/images/blog");
const BG = join(root, "scripts/assets/cover-bg.png");
const FORCE = process.argv.includes("--force");
const CARDS = process.argv.includes("--cards");
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith("--"));

// Hand-made covers. Never touched, not even with --force. Add a slug here when a
// post gets a designed cover instead of a generated one.
const CUSTOM_COVERS = new Set([
  "picmal-april-2026",
  "picmal-may-2026",
  "picmal-june-2026",
  "picmal-july-2026",
  "how-to-enable-picmal-right-click-menu",
  "top-batch-image-converter-mac",
  "publish-your-macos-app-outside-the-app-store",
]);

// The background art is authored at exactly this size and 16:9, which is what the
// blog cards and OG previews expect, so nothing is cropped or letterboxed.
const W = 2400;
const H = 1350;
const BG_FIELD = "#f1f6ff";

const TITLE_SIZE = 104;
const TITLE_LH = 124;
const DESC_SIZE = 54;
const DESC_LH = 70;
const DESC_GAP = 40;
const TITLE_COLOR = "#0b0b12";
const DESC_COLOR = "#252561";
const PAD = 110;
const LOCKUP_TOP = 94;
const SAFE_TOP = LOCKUP_TOP + 116;

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Greedy word-wrap with a rough bold-sans char-width model. Caps at `maxLines`.
function wrap(text, fontSize, maxWidth, maxLines) {
  const charW = fontSize * 0.56;
  const perLine = Math.max(8, Math.floor(maxWidth / charW));
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > perLine && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1}$/, "…");
  }
  return lines;
}

// Minimal frontmatter read: just the first --- block, line by line.
function readFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
  }
  return { block: m[0], body: m[1], fm };
}

// Top edge of the artwork's bottom-left checkerboard: the text block has to stay
// above it. Measured from the art so a redrawn background needs no code change.
async function clusterTop(bgBuffer) {
  const { data, info } = await sharp(bgBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const textColumn = Math.floor(width * 0.62);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < textColumn; x++) {
      const i = (y * width + x) * channels;
      if (data[i] < 120 && data[i + 2] > 200) return y;
    }
  }
  return height;
}

// Descriptions are SEO-length; only the first sentence reads as a sublead.
const sublead = (description) => description.split(/(?<=\.)\s+/)[0] || "";

// Transparent text layer composited over the background. Left column only, so
// the checkerboard clusters on the right stay visible, and the block is kept
// inside SAFE_TOP…SAFE_BOTTOM so it clears the bottom-left cluster.
function overlaySvg({ title, description, iconB64, safeBottom }) {
  const titleLines = wrap(title, TITLE_SIZE, 1250, 3);
  const descLines = wrap(sublead(description), DESC_SIZE, 1200, 2);

  const blockH =
    titleLines.length * TITLE_LH +
    (descLines.length ? DESC_GAP + descLines.length * DESC_LH : 0);
  let y =
    SAFE_TOP +
    Math.max(0, Math.round((safeBottom - SAFE_TOP - blockH) / 2)) +
    TITLE_SIZE;

  const text = [];
  for (const line of titleLines) {
    text.push(
      `<text x="${PAD}" y="${y}" font-size="${TITLE_SIZE}" font-weight="700" fill="${TITLE_COLOR}">${esc(line)}</text>`,
    );
    y += TITLE_LH;
  }
  if (descLines.length) {
    y += DESC_GAP - TITLE_LH + DESC_LH;
    for (const line of descLines) {
      text.push(
        `<text x="${PAD}" y="${y}" font-size="${DESC_SIZE}" font-weight="400" fill="${DESC_COLOR}">${esc(line)}</text>`,
      );
      y += DESC_LH;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
  ${text.join("\n  ")}
  <image x="${PAD}" y="${LOCKUP_TOP}" width="74" height="74" href="data:image/png;base64,${iconB64}"/>
  <text x="${PAD + 96}" y="${LOCKUP_TOP + 53}" font-size="48" font-weight="700" fill="${TITLE_COLOR}">Picmal</text>
</svg>`;
}

// Card art for the blog grid. Hand-made covers get a card too: CUSTOM_COVERS
// only protects cover.png, and card.png is a separate file. The cover already prints the title, and the card
// prints it again underneath, so the grid read every title twice and every
// cover looked the same. A card carries one big label instead: the formats, the
// tool, or the number that tells this post apart at a glance. Hand-written on
// purpose, a regex on titles gets a third of them wrong.
const CARD_LABELS = {
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

const CARD_W = 1600;
const CARD_H = 900;
// Brand colours only, one base per category so the grid reads by kind at a
// glance, each in a light and a dark version for the site's two themes.
// Pixels are at least 4.2:1 on their field and labels at least 4.7:1.
//   Guide       pale field, accent pixels       (the old cover art, reversed)
//   Tutorial    accent-dark field, pale pixels
//   Newsletter  ink field, blue or pale pixels  (the reference look)
// Dark fields sit on the site's dark ground (#242424) without a glare box.
const INK = "#0b0b12";
const PALE = BG_FIELD;
const CARD_PALETTES = {
  Guide: {
    light: { field: PALE, pixel: "#1b5bff", ink: INK },
    dark: { field: "#242424", pixel: "#3b82f6", ink: PALE },
  },
  Tutorial: {
    light: { field: "#1450e0", pixel: PALE, ink: PALE },
    dark: { field: "#2563eb", pixel: PALE, ink: PALE },
  },
  Newsletter: {
    light: { field: INK, pixel: "#3b82f6", ink: PALE },
    dark: { field: INK, pixel: PALE, ink: PALE },
  },
};
const CELL = 16; // 100 × 56 cells; about 4px each on a card in the grid

// Same slug, same picture, on every run. FNV-1a into mulberry32.
function seeded(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// A dune of pixels rising from the bottom edge: solid at the base, breaking up
// into loose single pixels at the crest. Two or three hills summed, a little
// jitter per column so the ridge has vertical grain, and a few strays above it.
// One pattern, a different landscape for every post.
function pixelField(slug) {
  const rand = seeded(slug);
  const cols = CARD_W / CELL;
  const rows = CARD_H / CELL;
  // The crest has to stay clear of the label: the loosest pixels reach 1.35×
  // the hill height, and that must end below the label's lower edge.
  const maxH = rows * 0.4;
  // Nothing, not even a stray, above this row: the label owns the top.
  const clearTo = Math.ceil(rows * 0.44);

  const hills = Array.from({ length: 3 + Math.floor(rand() * 2) }, () => ({
    at: 0.08 + rand() * 0.84,
    width: 0.12 + rand() * 0.2,
    height: 0.35 + rand() * 0.65,
  }));
  // A low shelf under the hills so the dune runs the full width and thins out
  // toward the edges instead of stopping.
  const shelf = 0.12 + rand() * 0.08;
  const profile = (x) => {
    let v = shelf * Math.sin(Math.PI * x) ** 0.5;
    for (const h of hills) v += h.height * Math.exp(-(((x - h.at) / h.width) ** 2));
    return Math.min(1, v);
  };

  const cells = [];
  for (let c = 0; c < cols; c++) {
    // Grain: each column gets its own height and its own density, which is
    // what draws the vertical streaks through the body of the dune.
    const reach = 0.75 + rand() * 0.5;
    const density = 0.65 + rand() * 0.35;
    const h = Math.max(1, profile((c + 0.5) / cols) * maxH * reach);
    for (let r = 0; r < rows; r++) {
      const t = (r + 0.5) / h; // 0 at the bottom edge, 1 at this column's crest
      let p;
      if (t < 0.12) p = 0.96;
      else if (t < 1) p = density * (1 - t) ** 0.65;
      else p = t < 1.35 ? 0.035 : 0; // strays above the crest
      const y = rows - 1 - r;
      if (y >= clearTo && rand() < p) cells.push([c, y]);
    }
  }
  return cells
    .map(
      ([c, r]) =>
        `<rect x="${c * CELL}" y="${r * CELL}" width="${CELL}" height="${CELL}"/>`,
    )
    .join("");
}

// The label sits centred in the calm upper half, above the dune. The arrow
// takes the accent so a conversion reads as a direction, not a word.
function cardSvg(slug, label, { field, pixel, ink }) {
  const size = Math.min(160, Math.floor(1100 / (label.length * 0.56)));
  const parts = label.split("→");
  const text = parts
    .map((part, i) =>
      i === 0 ? esc(part) : `<tspan fill="${pixel}">→</tspan>${esc(part)}`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}">
  <rect width="100%" height="100%" fill="${field}"/>
  <g fill="${pixel}" shape-rendering="crispEdges">${pixelField(slug)}</g>
  <text x="${CARD_W / 2}" y="${CARD_H * 0.3}" text-anchor="middle" dominant-baseline="central" font-family="SF Pro Display, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="600" letter-spacing="${-size * 0.01}" fill="${ink}">${text}</text>
</svg>`;
}

async function makeCards() {
  let made = 0;
  for (const [slug, label] of Object.entries(CARD_LABELS)) {
    if (ONLY.length && !ONLY.includes(slug)) continue;
    const file = ["mdx", "md"]
      .map((ext) => join(BLOG_DIR, `${slug}.${ext}`))
      .find(existsSync);
    const category = file && readFrontmatter(readFileSync(file, "utf8"))?.fm.category;
    const palette = CARD_PALETTES[category] ?? CARD_PALETTES.Guide;
    if (!CARD_PALETTES[category]) console.warn(`! ${slug}: category "${category}" has no palette, using Guide`);

    const outDir = join(OUT_BASE, slug);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    for (const [mode, name] of [["light", "card.png"], ["dark", "card-dark.png"]]) {
      await sharp(Buffer.from(cardSvg(slug, label, palette[mode])))
        .png({ compressionLevel: 9, palette: true })
        .toFile(join(outDir, name));
    }
    made++;
    console.log(`✓ ${slug}  ${category}  ${label}`);
  }
  // A post the map does not know gets no card and keeps its cover, which is
  // correct for the hand-made ones and a reminder for a new post.
  const known = new Set([...Object.keys(CARD_LABELS), ...CUSTOM_COVERS]);
  for (const f of readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f))) {
    const slug = f.replace(/\.mdx?$/, "");
    if (!known.has(slug)) console.warn(`! no card label: ${slug}`);
  }
  console.log(`\nGenerated ${made} card(s).`);
}

async function main() {
  const iconB64 = (
    await sharp(join(root, "scripts/assets/app-icon.png"))
      .resize(222, 222)
      .png()
      .toBuffer()
  ).toString("base64");

  // A no-op for art already at W×H; keeps a differently-sized export working.
  const bg = await sharp(BG)
    .resize(W, H, { fit: "contain", background: BG_FIELD })
    .toBuffer();

  const safeBottom = (await clusterTop(bg)) - 31;

  const files = readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
  let made = 0;
  for (const file of files) {
    const slug = file.replace(/\.mdx?$/, "");
    if (ONLY.length && !ONLY.includes(slug)) continue;
    if (CUSTOM_COVERS.has(slug)) continue;

    const path = join(BLOG_DIR, file);
    const raw = readFileSync(path, "utf8");
    const parsed = readFrontmatter(raw);
    if (!parsed) {
      console.warn(`! no frontmatter: ${file}`);
      continue;
    }
    const { fm } = parsed;
    if (fm.heroImage && !FORCE) continue;

    const outDir = join(OUT_BASE, slug);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    const outPng = join(outDir, "cover.png");
    await sharp(bg)
      .composite([
        {
          input: Buffer.from(
            overlaySvg({
              title: fm.title || slug,
              description: fm.description || "",
              iconB64,
              safeBottom,
            }),
          ),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toFile(outPng);

    // Wire up frontmatter if not already present.
    if (!fm.heroImage) {
      const rel = `../../../public/images/blog/${slug}/cover.png`;
      const updated = raw.replace(
        /^(title:.*\r?\n)/m,
        `$1heroImage: "${rel}"\n`,
      );
      writeFileSync(path, updated);
    }
    made++;
    console.log(`✓ ${slug}`);
  }
  console.log(`\nGenerated ${made} cover(s).`);
}

(CARDS ? makeCards() : main()).catch((e) => {
  console.error(e);
  process.exit(1);
});

// ponytail: self-check — run with `node scripts/generate-blog-covers.js --selftest`
if (process.argv.includes("--selftest")) {
  const w = wrap("How to Convert HEIC to JPG on Mac the Fast Way", 60, 900, 4);
  console.assert(w.length <= 4, "wrap exceeds maxLines");
  console.assert(w.length >= 2, "wrap did not split a long title");
  console.log("selftest ok");
}
