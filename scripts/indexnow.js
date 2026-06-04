// IndexNow submission — ping Bing/Yandex (and IndexNow-participating engines)
// when content changes so they recrawl fast.
//
// The ownership key file already exists at:
//   public/59c9300ee77946cfbe1babd877ef01b3.txt
//
// Usage:
//   node scripts/indexnow.js                       # submits the homepage
//   node scripts/indexnow.js /convert/heic-to-jpg /blog/some-post
//   npm run indexnow -- /convert/heic-to-jpg
//
// Wire it into your Cloudflare Pages deploy (post-build hook / CI step) and pass
// the URLs that changed in the release. Submitting unchanged URLs repeatedly is
// discouraged by the protocol.

const HOST = "picmal.app";
const KEY = "59c9300ee77946cfbe1babd877ef01b3";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const paths = args.length > 0 ? args : ["/"];
const urlList = paths.map((p) =>
  p.startsWith("http") ? p : `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`,
);

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
