// The spec is what an agent turns into function-calling tools, so the things
// that break that (a missing operationId, an untyped parameter, a dangling
// $ref) are worth failing a test over. Runs on the file that actually ships.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const spec = JSON.parse(readFileSync(new URL("../public/openapi.json", import.meta.url)));

const operations = Object.entries(spec.paths).flatMap(([path, item]) =>
  Object.entries(item).map(([method, op]) => ({ path, method, op })),
);

test("every operation is self-describing", () => {
  for (const { path, method, op } of operations) {
    const where = `${method.toUpperCase()} ${path}`;
    assert.ok(op.operationId, `${where} has no operationId`);
    assert.ok(op.summary, `${where} has no summary`);
    assert.ok(op.description?.length > 40, `${where} has no real description`);
    assert.ok(Object.keys(op.responses || {}).length, `${where} has no responses`);
    for (const [status, response] of Object.entries(op.responses)) {
      if (response.$ref) continue;
      assert.ok(response.description, `${where} ${status} has no description`);
    }
  }
});

test("operationIds are unique", () => {
  const ids = operations.map(({ op }) => op.operationId);
  assert.equal(new Set(ids).size, ids.length, `duplicate operationId in ${ids}`);
});

test("every parameter is typed and described", () => {
  for (const { path, op } of operations) {
    for (const param of op.parameters || []) {
      assert.ok(param.description, `${path} param ${param.name} has no description`);
      assert.ok(param.schema?.type, `${path} param ${param.name} has no type`);
      if (param.in === "path") assert.equal(param.required, true, `${path} param ${param.name} must be required`);
    }
  }
});

test("every $ref resolves", () => {
  const refs = [];
  (function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    for (const [key, value] of Object.entries(node)) {
      if (key === "$ref") refs.push(value);
      else walk(value);
    }
  })(spec);

  assert.ok(refs.length, "expected the spec to share components");
  for (const ref of refs) {
    const target = ref
      .replace(/^#\//, "")
      .split("/")
      .reduce((node, key) => node?.[key], spec);
    assert.ok(target, `dangling $ref: ${ref}`);
  }
});

// The Worker is the only thing that emits errors; if it grows a code the spec
// doesn't list, an agent can't branch on it.
test("documented error codes match the ones the Worker emits", async () => {
  const worker = readFileSync(new URL("../worker/index.js", import.meta.url), "utf8");
  const emitted = [...worker.matchAll(/code:\s*"([a-z_]+)"/g)].map((m) => m[1]);
  const documented = spec.components.schemas.Error.properties.error.properties.code.enum;
  assert.deepEqual([...new Set(emitted)].sort(), [...documented].sort());
});
