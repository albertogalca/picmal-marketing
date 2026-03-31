// Conversion data for programmatic SEO pages
// Each entry generates a /convert/[from]-to-[to] page

export interface FormatInfo {
  name: string;
  extension: string;
  fullName: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string;
}

export interface ConversionPair {
  from: string;
  to: string;
  slug: string;
  whyConvert: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const formats: Record<string, FormatInfo> = {
  heic: {
    name: "HEIC",
    extension: "heic",
    fullName: "High Efficiency Image Container",
    description:
      "Apple's default photo format since iOS 11. Offers excellent compression with high image quality.",
    pros: [
      "50% smaller than JPG at same quality",
      "Supports 16-bit color depth",
      "Stores multiple images (Live Photos)",
    ],
    cons: [
      "Limited compatibility outside Apple ecosystem",
      "Not supported by most websites",
      "Older software can't open HEIC files",
    ],
    bestFor: "iPhone photos and Apple ecosystem storage",
  },
  jpg: {
    name: "JPG",
    extension: "jpg",
    fullName: "Joint Photographic Experts Group",
    description:
      "The most widely supported image format. Compatible with virtually every device and application.",
    pros: [
      "Universal compatibility",
      "Good compression for photos",
      "Supported by all browsers and devices",
    ],
    cons: [
      "Lossy compression reduces quality",
      "No transparency support",
      "Larger files than modern formats",
    ],
    bestFor: "Sharing photos, web uploads, and email attachments",
  },
  png: {
    name: "PNG",
    extension: "png",
    fullName: "Portable Network Graphics",
    description:
      "Lossless image format with transparency support. Ideal for graphics, screenshots, and images needing sharp edges.",
    pros: [
      "Lossless compression preserves quality",
      "Supports transparency (alpha channel)",
      "Sharp edges for text and graphics",
    ],
    cons: [
      "Larger file sizes than JPG for photos",
      "Not ideal for photographs",
      "No animation support",
    ],
    bestFor: "Screenshots, logos, graphics with transparency",
  },
  webp: {
    name: "WebP",
    extension: "webp",
    fullName: "WebP Image Format",
    description:
      "Google's modern image format offering superior compression for both lossy and lossless images.",
    pros: [
      "25-35% smaller than JPG at same quality",
      "Supports transparency and animation",
      "Excellent browser support",
    ],
    cons: [
      "Not supported by all image editors",
      "Some older browsers lack support",
      "Less common in print workflows",
    ],
    bestFor: "Web images, blogs, and online stores",
  },
  avif: {
    name: "AVIF",
    extension: "avif",
    fullName: "AV1 Image File Format",
    description:
      "Next-generation image format based on AV1 video codec. Offers the best compression available today.",
    pros: [
      "50% smaller than JPG at same quality",
      "Supports HDR and wide color gamut",
      "Supports transparency and animation",
    ],
    cons: [
      "Slower encoding than other formats",
      "Not yet universally supported",
      "Limited software support",
    ],
    bestFor: "Web performance optimization and modern websites",
  },
  tiff: {
    name: "TIFF",
    extension: "tiff",
    fullName: "Tagged Image File Format",
    description:
      "Professional image format used in publishing and photography. Supports lossless compression and high color depth.",
    pros: [
      "Lossless quality preservation",
      "Supports multiple layers and pages",
      "Industry standard for print",
    ],
    cons: [
      "Very large file sizes",
      "Not suitable for web use",
      "Slow to process",
    ],
    bestFor: "Print publishing, professional photography, archival",
  },
  gif: {
    name: "GIF",
    extension: "gif",
    fullName: "Graphics Interchange Format",
    description:
      "Classic format supporting animation and simple graphics with a limited 256-color palette.",
    pros: [
      "Supports animation",
      "Universal compatibility",
      "Small file size for simple graphics",
    ],
    cons: [
      "Limited to 256 colors",
      "Poor quality for photographs",
      "Large file sizes for animations",
    ],
    bestFor: "Simple animations, icons, and low-color graphics",
  },
  dng: {
    name: "DNG",
    extension: "dng",
    fullName: "Digital Negative",
    description:
      "Adobe's open raw image format. Preserves all sensor data for maximum editing flexibility.",
    pros: [
      "Preserves raw sensor data",
      "Open standard (no vendor lock-in)",
      "Maximum editing flexibility",
    ],
    cons: [
      "Very large file sizes",
      "Requires specialized software to view",
      "Not suitable for sharing or web",
    ],
    bestFor: "Raw photo archival and professional editing",
  },
};

function generateFAQs(
  from: FormatInfo,
  to: FormatInfo,
): { question: string; answer: string }[] {
  return [
    {
      question: `How do I convert ${from.name} to ${to.name} on Mac?`,
      answer: `Open Picmal, drag and drop your ${from.name} files, select ${to.name} as the output format, and click Convert. Picmal processes everything locally on your Mac — no uploads needed.`,
    },
    {
      question: `Does converting ${from.name} to ${to.name} lose quality?`,
      answer:
        to.extension === "png" || to.extension === "tiff" || to.extension === "dng"
          ? `No. ${to.name} uses lossless compression, so your converted files retain full quality.`
          : `${to.name} uses lossy compression, so there may be a slight quality reduction. Picmal lets you adjust the quality slider to find the right balance between file size and quality.`,
    },
    {
      question: `Can I batch convert multiple ${from.name} files to ${to.name}?`,
      answer: `Yes. Picmal supports batch conversion — drag and drop hundreds of ${from.name} files or entire folders and convert them all to ${to.name} at once.`,
    },
    {
      question: `Is it free to convert ${from.name} to ${to.name} with Picmal?`,
      answer:
        "Picmal requires a one-time purchase of $15.99 — no subscription. You can download the app to try the interface, but a license is needed to convert files. 14-day money-back guarantee.",
    },
  ];
}

function generateWhyConvert(from: FormatInfo, to: FormatInfo): string {
  const reasons: Record<string, Record<string, string>> = {
    heic: {
      jpg: "HEIC files from your iPhone aren't supported everywhere. Converting to JPG ensures your photos work on any device, website, or app.",
      png: "Need transparency or lossless quality from your iPhone photos? Converting HEIC to PNG preserves sharp detail for graphics and screenshots.",
      webp: "WebP offers similar compression to HEIC with much better web compatibility. Convert your iPhone photos for faster-loading websites.",
      avif: "AVIF offers even better compression than HEIC with broader web support. Ideal for optimizing iPhone photos for the web.",
      tiff: "Need print-quality images from iPhone photos? TIFF preserves full quality for professional publishing and archival.",
      gif: "Convert HEIC photos to GIF for simple sharing or creating animated sequences from Live Photos.",
      dng: "Preserve maximum editing flexibility by converting HEIC to DNG raw format for professional photo editing workflows.",
    },
    jpg: {
      png: "JPG doesn't support transparency. Convert to PNG when you need transparent backgrounds or lossless quality for graphics.",
      webp: "WebP files are 25-35% smaller than JPG at the same quality. Convert to save bandwidth and speed up your website.",
      avif: "AVIF can be up to 50% smaller than JPG. Convert for the best possible web performance on modern browsers.",
      tiff: "Need print-ready files? Convert JPG to TIFF for lossless quality that meets professional publishing standards.",
      heic: "Convert JPG to HEIC to save storage space on your Mac. HEIC offers 50% smaller files at the same quality.",
      gif: "Convert JPG images to GIF format for simple web graphics or to create image sequences.",
      dng: "Convert JPG to DNG for a raw-like editing experience in Adobe Lightroom and other professional editors.",
    },
    png: {
      jpg: "PNG files are often too large for web use or sharing. Convert to JPG for smaller files that are compatible everywhere.",
      webp: "WebP supports transparency like PNG but with much smaller file sizes. Convert PNG to WebP for faster websites.",
      avif: "AVIF offers transparency support with even better compression than WebP. Convert PNG for maximum web performance.",
      tiff: "Convert PNG to TIFF when you need a professional print format with lossless quality preservation.",
      heic: "Convert PNG to HEIC to dramatically reduce file sizes while maintaining excellent quality on Apple devices.",
      gif: "Convert PNG images to GIF for simple animated sequences or lower-color web graphics.",
      dng: "Convert PNG to DNG for archival purposes or to work with raw-compatible editing tools.",
    },
    webp: {
      jpg: "Not all software supports WebP yet. Convert to JPG for universal compatibility when sharing or uploading images.",
      png: "Need lossless quality or transparency in a more compatible format? Convert WebP to PNG for editing and print.",
      avif: "AVIF offers even better compression than WebP. Convert for cutting-edge web performance optimization.",
      tiff: "Convert WebP to TIFF when you need a lossless, print-ready format for professional workflows.",
      heic: "Convert WebP to HEIC for efficient storage on Apple devices with excellent quality preservation.",
      gif: "Convert WebP images or animations to GIF for broader compatibility in messaging apps and older systems.",
      dng: "Convert WebP to DNG raw format for maximum flexibility in professional photo editing software.",
    },
    gif: {
      jpg: "GIF's 256-color limit makes photos look poor. Convert to JPG for full-color images that look great everywhere.",
      png: "Convert GIF to PNG for higher quality static images with transparency support and millions of colors.",
      webp: "WebP supports animation like GIF but with better compression and full color. Convert for smaller animated images.",
      avif: "AVIF supports animation with far better compression than GIF. Convert for high-quality animations at tiny file sizes.",
      tiff: "Convert GIF to TIFF for print-quality output from your graphics and illustrations.",
      heic: "Convert GIF to HEIC for efficient storage on your Mac with Apple's native image format.",
      dng: "Convert GIF to DNG for archival or to work within raw photo editing workflows.",
    },
    tiff: {
      jpg: "TIFF files are too large for web or sharing. Convert to JPG for dramatically smaller files that work everywhere.",
      png: "Convert TIFF to PNG for lossless quality in a more web-friendly format with transparency support.",
      webp: "Convert large TIFF files to WebP for web use — get much smaller files while maintaining excellent quality.",
      avif: "Convert TIFF to AVIF for the smallest possible web files while preserving excellent visual quality.",
      heic: "Convert TIFF to HEIC for efficient storage on Apple devices without significant quality loss.",
      gif: "Convert TIFF graphics to GIF for simple web use and animation support.",
      dng: "Convert TIFF to DNG for raw editing workflows or to standardize your photo archive format.",
    },
    dng: {
      jpg: "DNG raw files aren't viewable everywhere. Convert to JPG for easy sharing, uploading, and universal compatibility.",
      png: "Convert DNG to PNG for lossless output with transparency support — ideal for graphics extracted from raw photos.",
      webp: "Convert DNG to WebP for web-optimized images with excellent quality at small file sizes.",
      avif: "Convert DNG to AVIF for the best possible web compression from your raw photos.",
      tiff: "Convert DNG to TIFF for print-ready output that preserves the quality of your raw photos.",
      heic: "Convert DNG to HEIC for efficient storage of your photos on Apple devices.",
      gif: "Convert DNG photos to GIF for simple web graphics or creating image sequences.",
    },
    avif: {
      jpg: "Not all devices support AVIF yet. Convert to JPG for universal compatibility when sharing photos.",
      png: "Convert AVIF to PNG for lossless quality with broad software compatibility and transparency support.",
      webp: "Convert AVIF to WebP for wider browser support while still maintaining good compression.",
      tiff: "Convert AVIF to TIFF for print-ready output and professional publishing workflows.",
      heic: "Convert AVIF to HEIC for native Apple device compatibility and efficient storage.",
      gif: "Convert AVIF images to GIF for broader compatibility in messaging and legacy systems.",
    },
  };

  return (
    reasons[from.extension]?.[to.extension] ||
    `Convert your ${from.name} files to ${to.name} format on your Mac for better compatibility and optimized file sizes.`
  );
}

function generateBenefits(from: FormatInfo, to: FormatInfo): string[] {
  const benefits = [
    `Convert ${from.name} to ${to.name} in seconds with batch processing`,
    "All processing happens locally on your Mac — files never leave your device",
    "Drag and drop files or entire folders for instant conversion",
  ];

  if (
    to.extension === "webp" ||
    to.extension === "avif" ||
    to.extension === "heic"
  ) {
    benefits.push("Reduce file sizes significantly with modern compression");
  } else if (to.extension === "jpg") {
    benefits.push("Universal compatibility — works on every device and website");
  } else if (to.extension === "png") {
    benefits.push(
      "Lossless quality with transparency support for graphics and screenshots",
    );
  } else if (to.extension === "tiff") {
    benefits.push("Print-ready output for professional publishing workflows");
  }

  return benefits;
}

// Generate all conversion pairs
const formatKeys = Object.keys(formats);
export const conversions: ConversionPair[] = [];

for (const fromKey of formatKeys) {
  for (const toKey of formatKeys) {
    if (fromKey === toKey) continue;
    const from = formats[fromKey];
    const to = formats[toKey];
    conversions.push({
      from: fromKey,
      to: toKey,
      slug: `${fromKey}-to-${toKey}`,
      whyConvert: generateWhyConvert(from, to),
      benefits: generateBenefits(from, to),
      faqs: generateFAQs(from, to),
    });
  }
}

// Get related conversions for internal linking
export function getRelatedConversions(
  from: string,
  to: string,
  limit = 6,
): ConversionPair[] {
  return conversions
    .filter(
      (c) =>
        c.from !== from || c.to !== to, // exclude current
    )
    .filter(
      (c) => c.from === from || c.to === to, // same source or same target
    )
    .slice(0, limit);
}
