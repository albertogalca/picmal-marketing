// npm test
import assert from "node:assert/strict";
import { test } from "node:test";
import { estimateSizes, formatBytes } from "./fileSizeEstimate.ts";

test("scales with pixel count", () => {
  const small = estimateSizes(1000, 1000);
  const big = estimateSizes(2000, 2000);
  for (const [i, s] of small.entries()) {
    // 4x the pixels is 4x the bytes.
    assert.equal(big[i].bytes, s.bytes * 4, s.format);
  }
});

test("BMP baseline is exactly 3 bytes per pixel", () => {
  const bmp = estimateSizes(100, 100).find((f) => f.format === "bmp");
  assert.equal(bmp?.bytes, 30_000);
});

test("lossy formats beat lossless ones on photos", () => {
  const byFormat = new Map(
    estimateSizes(4000, 3000, "photo").map((f) => [f.format, f.bytes]),
  );
  assert.ok(byFormat.get("avif")! < byFormat.get("jpg")!);
  assert.ok(byFormat.get("jpg")! < byFormat.get("png")!);
  assert.ok(byFormat.get("png")! < byFormat.get("bmp")!);
});

test("content type is what makes PNG viable", () => {
  const photo = estimateSizes(1920, 1080, "photo");
  const graphic = estimateSizes(1920, 1080, "graphic");
  const png = (list: typeof photo) =>
    list.find((f) => f.format === "png")!.bytes;
  const jpg = (list: typeof photo) =>
    list.find((f) => f.format === "jpg")!.bytes;

  // On a photo PNG is hopeless: many times the size of the JPG.
  assert.ok(png(photo) > jpg(photo) * 5, "PNG is the wrong pick for a photo");
  // On flat colour it collapses to roughly JPG territory, which is the whole
  // reason screenshots ship as PNG. The page copy must not promise more.
  assert.ok(png(graphic) < png(photo) / 5, "PNG should collapse on flat colour");
  assert.ok(png(graphic) < jpg(photo), "and beat a photo-grade JPG");
});

test("rejects junk dimensions instead of returning NaN", () => {
  for (const bad of [0, -1, NaN, Infinity]) {
    assert.throws(() => estimateSizes(bad, 100), RangeError, `width ${bad}`);
    assert.throws(() => estimateSizes(100, bad), RangeError, `height ${bad}`);
  }
});

test("formatBytes picks a sensible unit", () => {
  assert.equal(formatBytes(512), "512 B");
  assert.equal(formatBytes(1024), "1.0 KB");
  assert.equal(formatBytes(1024 * 1536), "1.5 MB");
  assert.equal(formatBytes(1024 * 1024 * 20), "20 MB");
  assert.equal(formatBytes(1024 ** 3), "1.0 GB");
});
