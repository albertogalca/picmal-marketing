// IndexNow submission — ping Bing/Yandex (and IndexNow-participating engines)
// when content changes so they recrawl fast.
//
// The ownership key file already exists at:
//   public/59c9300ee77946cfbe1babd877ef01b3.txt
//
// Usage:
//   node scripts/indexnow.js                       # every URL in dist/sitemap-0.xml
//   node scripts/indexnow.js /convert/heic-to-jpg /blog/some-post
//   npm run indexnow -- /convert/heic-to-jpg
//
// Wire it into your Cloudflare Pages deploy (post-build hook / CI step). Prefer
// passing the URLs that changed in the release — submitting unchanged URLs
// repeatedly is discouraged by the protocol — but a full sitemap sweep after a
// build is fine and is what the no-args form does.

import { readFileSync } from "node:fs";

const HOST = "picmal.app";
const KEY = "59c9300ee77946cfbe1babd877ef01b3";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const urlList =
  args.length > 0
    ? args.map((p) =>
        p.startsWith("http")
          ? p
          : `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`,
      )
    : // ponytail: regex over the sitemap instead of an XML parser. It's generated
      // by @astrojs/sitemap, so <loc> is always plain text.
      [
        ...readFileSync("dist/sitemap-0.xml", "utf8").matchAll(
          /<loc>(.*?)<\/loc>/g,
        ),
      ].map((m) => m[1]);

if (urlList.length === 0) {
  console.error("No <loc> entries in dist/sitemap-0.xml — did the build run?");
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

// IndexNow returns 200 or 202 on success; 4xx indicates a key/host problem.
if (res.ok) {
  console.log(`IndexNow accepted ${urlList.length} URL(s) [${res.status}]:`);
  urlList.forEach((u) => console.log(`  ${u}`));
} else {
  console.error(`IndexNow rejected submission [${res.status}]`);
  console.error(await res.text());
  process.exit(1);
}
