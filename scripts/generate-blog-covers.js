// Generates a branded Picmal cover image for every blog post missing a heroImage.
// Reuses sharp (already a dep) to rasterize an SVG template -> PNG. No AI API.
// Run: node scripts/generate-blog-covers.js   (add --force to regenerate existing covers)

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = join(root, "src/content/blog");
const OUT_BASE = join(root, "public/images/blog");
const FORCE = process.argv.includes("--force");

// On-brand gradient pairs (all in the Picmal blue family). Picked per-slug so
// covers stay cohesive but each post looks distinct.
const PALETTES = [
  ["#1b5bff", "#0b3bb0"],
  ["#3b82f6", "#1b5bff"],
  ["#2563eb", "#4f46e5"],
  ["#0ea5e9", "#1b5bff"],
  ["#6366f1", "#1b5bff"],
  ["#1450e0", "#0a2f8f"],
];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

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

// Pull a "FROM → TO" format pair from the title, else a single format token.
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

function svg({ title, palette, iconB64 }) {
  const [c1, c2] = palette;
  const titleLines = wrap(title, 76, 1040, 4);
  const lh = 92;
  const startY = 370 - ((titleLines.length - 1) * lh) / 2;
  const titleSvg = titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${startY + i * lh}" font-size="76" font-weight="700" fill="#ffffff">${esc(l)}</text>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1350" viewBox="0 0 1200 675" font-family="Helvetica Neue, Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <g>
    <image x="80" y="76" width="56" height="56" href="data:image/png;base64,${iconB64}"/>
    <text x="150" y="116" font-size="38" font-weight="700" fill="#ffffff">Picmal</text>
  </g>
  ${titleSvg}
</svg>`;
}

async function main() {
  const iconB64 = (
    await sharp(join(root, "public/Icon-macOS-Default-1024x1024@1x.png"))
      .resize(160, 160)
      .png()
      .toBuffer()
  ).toString("base64");

  const files = readdirSync(BLOG_DIR).filter((f) => /\.mdx?$/.test(f));
  let made = 0;
  for (const file of files) {
    const path = join(BLOG_DIR, file);
    const raw = readFileSync(path, "utf8");
    const parsed = readFrontmatter(raw);
    if (!parsed) {
      console.warn(`! no frontmatter: ${file}`);
      continue;
    }
    const { fm } = parsed;
    if (fm.heroImage && !FORCE) continue;

    const slug = file.replace(/\.mdx?$/, "");
    const title = fm.title || slug;
    const palette = PALETTES[hash(slug) % PALETTES.length];

    const outDir = join(OUT_BASE, slug);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    const outPng = join(outDir, "cover.png");
    await sharp(Buffer.from(svg({ title, palette, iconB64 })))
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
    console.log(`✓ ${slug}  [${palette[0]}]`);
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
