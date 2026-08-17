// Estimated encoded size per format, for the /tools/image-file-size-calculator.
//
// ponytail: bits-per-pixel lookup, not a real encoder. Every format's size
// depends on the actual picture content, so a table keyed on "photo" vs
// "graphic" is as far as arithmetic can honestly go. The numbers below are
// median bpp measured on ordinary content at the quality people ship at
// (roughly JPEG q85 and equivalents). Upgrade path if this is ever not
// enough: encode the file for real in a Worker with WASM codecs, which is a
// different and much larger tool.

export type Content = "photo" | "graphic";

export interface FormatEstimate {
  /** Format key, lowercase. */
  format: string;
  /** Display name. */
  name: string;
  /** Estimated bytes. */
  bytes: number;
  /** True when the format keeps every pixel exactly. */
  lossless: boolean;
  /** One-line note on when to pick it. */
  note: string;
}

interface FormatSpec {
  format: string;
  name: string;
  lossless: boolean;
  note: string;
  /** Bits per pixel: [photo, graphic]. */
  bpp: [number, number];
}

// Ordered smallest-first for photos, which is the common case.
const SPECS: FormatSpec[] = [
  {
    format: "avif",
    name: "AVIF",
    lossless: false,
    note: "Smallest files. Supported in every current browser.",
    bpp: [0.65, 0.4],
  },
  {
    format: "heic",
    name: "HEIC",
    lossless: false,
    note: "What an iPhone shoots. Great on size, awkward off Apple devices.",
    bpp: [0.75, 0.5],
  },
  {
    format: "webp",
    name: "WebP",
    lossless: false,
    note: "The safe modern pick for the web. Well supported everywhere.",
    bpp: [1.0, 0.5],
  },
  {
    format: "jpg",
    name: "JPG",
    lossless: false,
    note: "Opens anywhere. Still the default for photos.",
    bpp: [1.5, 1.0],
  },
  {
    format: "png",
    name: "PNG",
    lossless: true,
    note: "Every pixel kept, plus transparency. Made for flat graphics.",
    bpp: [11, 1.2],
  },
  {
    format: "tiff",
    name: "TIFF",
    lossless: true,
    note: "Lossless archive format for print and scanning.",
    bpp: [13, 2.0],
  },
  {
    format: "bmp",
    name: "BMP (uncompressed)",
    lossless: true,
    note: "No compression at all. Here as the baseline to compare against.",
    bpp: [24, 24],
  },
];

/**
 * Estimate the encoded size of an image in each format.
 *
 * @param width  Pixel width, must be a positive finite number.
 * @param height Pixel height, must be a positive finite number.
 * @param content "photo" for camera images, "graphic" for screenshots, logos
 *                and anything with large flat areas.
 * @throws RangeError on non-finite or non-positive dimensions.
 */
export function estimateSizes(
  width: number,
  height: number,
  content: Content = "photo",
): FormatEstimate[] {
  // Trust boundary: these come straight off a number input, where a user can
  // type "1e999", clear the field, or paste anything at all.
  for (const [label, value] of [
    ["width", width],
    ["height", height],
  ] as const) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${label} must be a positive number, got ${value}`);
    }
  }

  const pixels = width * height;
  const column = content === "graphic" ? 1 : 0;

  return SPECS.map((spec) => ({
    format: spec.format,
    name: spec.name,
    lossless: spec.lossless,
    note: spec.note,
    bytes: Math.round((pixels * spec.bpp[column]) / 8),
  }));
}

/** Format a byte count the way a Finder window would. */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  // Sub-10 values read better with a decimal; above that it's noise.
  const digits = value < 10 ? 1 : 0;
  return `${value.toFixed(digits)} ${units[unit]}`;
}
