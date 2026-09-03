// Generates a branded Picmal cover image for every blog post missing a heroImage.
// Matches the hand-made "Wrap Up" covers: the checkerboard brand background in
// scripts/assets/cover-bg.png, Picmal lockup top-left, then a dark title and a
// navy one-line sublead. Reuses sharp (already a dep). No AI API.
//
// Run: node scripts/generate-blog-covers.js
//   --force            also regenerate posts that already have a heroImage
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

main().catch((e) => {
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
