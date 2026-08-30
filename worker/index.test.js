import assert from "node:assert/strict";
import { test } from "node:test";
import worker, { wantsJson } from "./index.js";

const env = {
  ASSETS: {
    fetch: (request) =>
      new Response(new URL(request.url).pathname === "/" ? "ok" : "<html>404", {
        status: new URL(request.url).pathname === "/" ? 200 : 404,
      }),
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

test("browsers and curl still get the HTML page", async () => {
  for (const accept of [undefined, "*/*", "text/html,application/xhtml+xml"]) {
    const res = await get("/nope", accept);
    assert.equal(res.status, 404);
    assert.equal(res.headers.get("vary"), "Accept, Accept-Encoding");
    assert.match(await res.text(), /<html>/);
  }
});

test("found pages are untouched", async () => {
  const res = await get("/", "application/json");
  assert.equal(res.status, 200);
  assert.equal(await res.text(), "ok");
});

test("wantsJson ignores a json substring in another type", () => {
  assert.equal(wantsJson(new Request("https://x/", { headers: { accept: "application/ld+json" } })), false);
});
