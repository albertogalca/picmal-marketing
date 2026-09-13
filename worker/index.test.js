import assert from "node:assert/strict";
import { test } from "node:test";
import worker, { quality } from "./index.js";

// Stands in for the Cloudflare assets binding: "/" and "/blog/post" are pages,
// "/blog/post.md" and "/index.md" their markdown twins, "/logo.webp" an asset.
const ASSETS = {
  "/": ["<html>home", "text/html"],
  "/index.md": ["# Picmal", "text/markdown"],
  "/blog/post": ["<html>post", "text/html"],
  "/blog/post.md": ["# Post", "text/markdown"],
  "/logo.webp": ["binary", "image/webp"],
};

const env = {
  ASSETS: {
    fetch: (request) => {
      const hit = ASSETS[new URL(request.url).pathname];
      return hit
        ? new Response(hit[0], { headers: { "content-type": hit[1] } })
        : new Response("<html>404", {
            status: 404,
            headers: { "content-type": "text/html" },
          });
    },
  },
};

const get = (path, accept) =>
  worker.fetch(
    new Request(`https://picmal.app${path}`, accept ? { headers: { accept } } : {}),
    env,
  );

test("JSON clients get a structured 404", async () => {
  const res = await get("/nope", "application/json");
  assert.equal(res.status, 404);
  assert.equal(res.headers.get("content-type"), "application/json");
  assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
  const { error } = await res.json();
  assert.equal(error.code, "not_found");
  assert.match(error.message, /\/nope/);
  assert.ok(error.hints.length > 0);
});

test("markdown clients get a markdown 404 pointing at the site map", async () => {
  const res = await get("/nope", "text/markdown");
  assert.equal(res.status, 404);
  assert.equal(res.headers.get("content-type"), "text/markdown; charset=utf-8");
  assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
  const body = await res.text();
  assert.match(body, /\/nope/);
  assert.match(body, /sitemap-index\.xml/);
  assert.match(body, /llms\.txt/);
});

test("browsers and curl still get the HTML 404 page", async () => {
  for (const accept of [undefined, "*/*", "text/html,application/xhtml+xml"]) {
    const res = await get("/nope", accept);
    assert.equal(res.status, 404);
    assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
    assert.match(await res.text(), /<html>/);
  }
});

test("Accept: text/markdown serves the markdown twin", async () => {
  for (const [path, expected] of [
    ["/", "# Picmal"],
    ["/blog/post", "# Post"],
  ]) {
    const res = await get(path, "text/markdown");
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "text/markdown; charset=utf-8");
    assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
    assert.equal(await res.text(), expected);
  }
});

test("q-values decide which representation wins", async () => {
  const cases = [
    ["text/html;q=0.8, text/markdown", "# Picmal"],
    ["text/markdown;q=0.9, text/html", "<html>home"],
    ["text/markdown;q=0.4, text/html;q=0.3", "# Picmal"],
    ["*/*", "<html>home"],
    ["text/*", "<html>home"],
  ];
  for (const [accept, expected] of cases) {
    assert.equal(await (await get("/", accept)).text(), expected, accept);
  }
});

test("HTML pages always carry Vary: Accept", async () => {
  const res = await get("/", "text/html");
  assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
});

test("a page with no markdown twin falls back to HTML, not 406", async () => {
  ASSETS["/plain"] = ["<html>plain", "text/html"];
  const res = await get("/plain", "text/markdown, text/html;q=0.5");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "<html>plain");
  delete ASSETS["/plain"];
});

test("a client that refuses HTML gets a JSON 406", async () => {
  const res = await get("/", "application/pdf");
  assert.equal(res.status, 406);
  assert.equal(res.headers.get("content-type"), "application/json");
  assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
  const { error } = await res.json();
  assert.equal(error.code, "not_acceptable");
});

test("non-HTML assets are never negotiated or 406'd", async () => {
  const res = await get("/logo.webp", "image/webp");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("content-type"), "image/webp");
});

test("quality reads q-values, wildcards and unasked-for types", () => {
  assert.equal(quality("text/markdown", "text/markdown"), 1);
  assert.equal(quality("text/markdown;q=0.3", "text/markdown"), 0.3);
  assert.equal(quality("*/*", "text/markdown"), 1);
  assert.equal(quality("text/*;q=0.5", "text/html"), 0.5);
  assert.equal(quality("application/json", "text/html"), 0);
  // A json substring in another type is not a JSON ask.
  assert.equal(quality("application/ld+json", "application/json"), 0);
});

// Stands in for the R2 binding, holding one 10-byte release. Enough to prove
// the range and conditional branches, which are the ones that corrupt a
// resumed download when they get it wrong.
const BODY = "0123456789";
const ETAG = '"abc123"';

const DOWNLOADS = {
  head: async (key) => (key === "Picmal-1.9.0.dmg" ? object() : null),
  get: async (key, options = {}) => {
    if (key !== "Picmal-1.9.0.dmg") return null;
    const ifNoneMatch = options.onlyIf?.get?.("if-none-match");
    if (ifNoneMatch === ETAG) return object(); // bodyless: precondition failed
    const range = options.range?.get?.("range");
    if (!range) return { ...object(), body: BODY };
    const [start, end] = range.replace("bytes=", "").split("-").map(Number);
    return {
      ...object(),
      body: BODY.slice(start, end + 1),
      range: { offset: start, length: end - start + 1 },
    };
  },
};

function object() {
  return {
    size: BODY.length,
    httpEtag: ETAG,
    writeHttpMetadata: (headers) =>
      headers.set("content-type", "application/x-apple-diskimage"),
  };
}

const download = (path, headers = {}, method = "GET") =>
  worker.fetch(new Request(`https://picmal.app${path}`, { method, headers }), {
    ...env,
    DOWNLOADS,
  });

test("a release downloads whole, as a disk image", async () => {
  const res = await download("/downloads/Picmal-1.9.0.dmg");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), BODY);
  assert.equal(
    res.headers.get("content-type"),
    "application/x-apple-diskimage",
  );
  assert.equal(res.headers.get("accept-ranges"), "bytes");
  assert.match(res.headers.get("content-disposition"), /Picmal-1\.9\.0\.dmg/);
});

test("a resumed download gets its range, not the whole file again", async () => {
  const res = await download("/downloads/Picmal-1.9.0.dmg", {
    range: "bytes=4-6",
  });
  assert.equal(res.status, 206);
  assert.equal(await res.text(), "456");
  assert.equal(res.headers.get("content-range"), "bytes 4-6/10");
});

test("an unchanged release answers 304 with no body", async () => {
  const res = await download("/downloads/Picmal-1.9.0.dmg", {
    "if-none-match": ETAG,
  });
  assert.equal(res.status, 304);
  assert.equal(await res.text(), "");
});

test("HEAD reports the release without reading it", async () => {
  const res = await download("/downloads/Picmal-1.9.0.dmg", {}, "HEAD");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "");
  assert.equal(res.headers.get("etag"), ETAG);
});

test("a release that does not exist is a 404", async () => {
  for (const path of [
    "/downloads/Picmal-9.9.9.dmg",
    "/downloads/",
    "/downloads/nested/key.dmg",
  ]) {
    assert.equal((await download(path)).status, 404, path);
  }
});
