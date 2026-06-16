#!/usr/bin/env node
// Downloads Gravatar images for testimonials that have an email but no local image.
// Saves to public/avatars/ and updates testimonials.json with the local path.

import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const testimonialsPath = path.join(root, "src/data/testimonials.json");
const avatarsDir = path.join(root, "public/avatars");

fs.mkdirSync(avatarsDir, { recursive: true });

const testimonials = JSON.parse(fs.readFileSync(testimonialsPath, "utf-8"));

function gravatarUrl(email, size = 160) {
  const hash = crypto.createHash("md5").update(email.toLowerCase().trim()).digest("hex");
  return `https://gravatar.com/avatar/${hash}?s=${size}&d=404&r=g`;
}

async function downloadImage(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destPath, buffer);
  return true;
}

let updated = 0;

for (const t of testimonials) {
  // Skip press items, items already with a local image, and items with no email
  if (t.type === "press") continue;
  if (t.image && !t.image.startsWith("http")) continue; // already local
  if (!t.email) continue;

  const slug = t.email.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const destFile = path.join(avatarsDir, `${slug}.jpg`);
  const localPath = `/avatars/${slug}.jpg`;

  // Skip if already downloaded
  if (fs.existsSync(destFile)) {
    console.log(`✓ already exists: ${t.name}`);
    if (!t.image) {
      t.image = localPath;
      updated++;
    }
    continue;
  }

  process.stdout.write(`  downloading: ${t.name} (${t.email}) … `);
  const ok = await downloadImage(gravatarUrl(t.email), destFile);
  if (ok) {
    console.log("✓");
    t.image = localPath;
    updated++;
  } else {
    console.log("no Gravatar");
  }
}

if (updated > 0) {
  fs.writeFileSync(testimonialsPath, JSON.stringify(testimonials, null, 2) + "\n");
  console.log(`\nUpdated ${updated} testimonial(s) with local avatar paths.`);
} else {
  console.log("\nNo changes needed.");
}
