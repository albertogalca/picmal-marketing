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
  standardBody?: string;
  sourceUrl?: string;
}

export interface FileSizeExample {
  label: string;
  fromSize: string;
  toSize: string;
  savings: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface ConversionPair {
  from: string;
  to: string;
  slug: string;
  metaTitle?: string;
  metaDescription: string;
  whyConvert: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  fileSizeExamples?: FileSizeExample[];
  conversionSpeed?: string;
  useCases?: UseCase[];
}

export const formats: Record<string, FormatInfo> = {
  heic: {
    name: "HEIC",
    extension: "heic",
    fullName: "High Efficiency Image Container",
    description:
      "Apple's default photo format since iOS 11. Based on the HEVC (H.265) codec standardized by ISO/IEC 23008-12, HEIC offers up to 50% better compression than JPEG at equivalent visual quality.",
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
    standardBody: "ISO/IEC 23008-12 (MPEG-H Part 12)",
    sourceUrl: "https://developer.apple.com/documentation/imageio",
  },
  jpg: {
    name: "JPG",
    extension: "jpg",
    fullName: "Joint Photographic Experts Group",
    description:
      "The most widely supported image format, standardized as ITU-T T.81 in 1992. JPG (also called JPEG) is compatible with virtually every device and application, and remains the universal default for photographic content.",
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
    standardBody: "ITU-T T.81 / ISO/IEC 10918-1",
    sourceUrl: "https://jpeg.org/jpeg/",
  },
  png: {
    name: "PNG",
    extension: "png",
    fullName: "Portable Network Graphics",
    description:
      "Lossless image format standardized as ISO/IEC 15948 and maintained as a W3C Recommendation. PNG supports full alpha transparency and is the preferred format for graphics, screenshots, and images requiring sharp edges.",
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
    standardBody: "ISO/IEC 15948 / W3C Recommendation",
    sourceUrl: "https://www.w3.org/TR/png/",
  },
  webp: {
    name: "WebP",
    extension: "webp",
    fullName: "WebP Image Format",
    description:
      "Developed by Google and based on the VP8 video codec, WebP delivers 25–35% smaller files than JPEG at equivalent SSIM quality according to Google's comparative study. Supported by all major browsers since 2020.",
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
    standardBody: "RIFF container / VP8 codec (Google)",
    sourceUrl: "https://developers.google.com/speed/webp",
  },
  avif: {
    name: "AVIF",
    extension: "avif",
    fullName: "AV1 Image File Format",
    description:
      "Next-generation image format based on the royalty-free AV1 video codec developed by the Alliance for Open Media (AOMedia). Netflix's 2020 research showed AVIF achieves 50% better compression than JPEG at equivalent perceptual quality.",
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
    standardBody: "ISO/IEC 23000-22 (Alliance for Open Media)",
    sourceUrl: "https://aomediacodec.github.io/av1-avif/",
  },
  tiff: {
    name: "TIFF",
    extension: "tiff",
    fullName: "Tagged Image File Format",
    description:
      "Professional image format originally developed by Aldus and now maintained by Adobe. TIFF supports lossless compression, 16-bit and 32-bit color depth, and is the de facto standard for prepress and archival imaging workflows.",
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
    standardBody: "Adobe TIFF Specification Revision 6.0",
    sourceUrl: "https://www.itu.int/itudoc/itu-t/com16/tiff-fx/docs/tiff6.pdf",
  },
  gif: {
    name: "GIF",
    extension: "gif",
    fullName: "Graphics Interchange Format",
    description:
      "Introduced by CompuServe in 1987 and standardized as GIF89a, this classic format supports frame-based animation and simple graphics with a palette of up to 256 colors per frame. It remains ubiquitous for short animations across the web.",
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
    standardBody: "CompuServe GIF89a Specification",
    sourceUrl: "https://www.w3.org/Graphics/GIF/spec-gif89a.txt",
  },
  dng: {
    name: "DNG",
    extension: "dng",
    fullName: "Digital Negative",
    description:
      "Adobe's publicly documented raw image format, first released in 2004 as an open standard for camera raw data. DNG preserves all sensor data and is supported by over 50 camera manufacturers and editing tools including Lightroom, Photoshop, and Capture One.",
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
    standardBody: "Adobe DNG Specification 1.7",
    sourceUrl: "https://helpx.adobe.com/camera-raw/digital-negative.html",
  },
};

function generateFAQs(
  from: FormatInfo,
  to: FormatInfo,
): { question: string; answer: string }[] {
  const faqs = [
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

  // Add JPEG alias FAQ when JPG is involved
  if (from.extension === "jpg" || to.extension === "jpg") {
    const jpgSide = from.extension === "jpg" ? "from" : "to";
    const otherFormat = jpgSide === "from" ? to : from;
    faqs.push({
      question: "Is JPG the same as JPEG?",
      answer: `Yes — JPG and JPEG are the same format. The only difference is the file extension (.jpg vs .jpeg). Picmal handles both extensions identically when converting ${jpgSide === "from" ? "from" : "to"} ${otherFormat.name}.`,
    });
  }

  return faqs;
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

function generateMetaDescription(from: FormatInfo, to: FormatInfo): string {
  const descriptions: Record<string, Record<string, string>> = {
    heic: {
      jpg: "Convert HEIC to JPG (JPEG) on Mac — preserve EXIF metadata, batch process 500+ iPhone photos in minutes. Offline, private, one-time purchase.",
      png: "Convert HEIC to PNG on Mac for lossless quality. Pixel-perfect output for design, screenshots, and archival. Batch processing included.",
      webp: "Convert HEIC to WebP on Mac — save 30-50% file size vs JPG. Ideal for optimizing iPhone photos for websites. Batch & offline.",
      avif: "Convert HEIC to AVIF on Mac for the smallest web images. Up to 50% smaller than JPG with excellent quality. Batch processing.",
      tiff: "Convert HEIC to TIFF on Mac for print-ready output. Lossless quality from iPhone photos for professional publishing workflows.",
      gif: "Convert HEIC photos to GIF on Mac. Create simple animations or web-friendly graphics from iPhone images. Batch processing.",
      dng: "Convert HEIC to DNG raw format on Mac. Preserve maximum editing flexibility for professional photo workflows.",
    },
    jpg: {
      png: "Convert JPG/JPEG to PNG on Mac — add transparency support and lossless quality. Ideal for logos, graphics, and screenshots. Batch ready.",
      webp: "Convert JPG/JPEG to WebP on Mac — reduce file sizes 25-35% with no visible quality loss. Speed up websites and cut bandwidth costs.",
      avif: "Convert JPG/JPEG to AVIF on Mac — up to 50% smaller files at the same quality. The best format for web performance in 2026.",
      tiff: "Convert JPG/JPEG to TIFF on Mac for print-ready quality. Professional publishing format with lossless preservation. Batch processing.",
      heic: "Convert JPG/JPEG to HEIC on Mac — save 50% storage with Apple's efficient format. Batch process entire photo libraries offline.",
      gif: "Convert JPG images to GIF on Mac for simple web graphics and animations. Batch conversion with drag and drop.",
      dng: "Convert JPG to DNG on Mac for raw-like editing in Lightroom and professional editors. Batch processing included.",
    },
    png: {
      jpg: "Convert PNG to JPG (JPEG) on Mac — dramatically smaller files for web sharing and email. Batch convert hundreds of screenshots at once.",
      webp: "Convert PNG to WebP on Mac — 25-35% smaller with transparency preserved. Faster websites, lower bandwidth. Batch processing.",
      avif: "Convert PNG to AVIF on Mac — the smallest files with transparency support. Up to 70% smaller than PNG. Batch ready.",
      tiff: "Convert PNG to TIFF on Mac for professional print output. Lossless quality preservation for publishing workflows.",
      heic: "Convert PNG to HEIC on Mac — dramatically reduce file sizes on Apple devices. Batch process entire image folders offline.",
      gif: "Convert PNG to GIF on Mac for simple animated sequences and web graphics. Batch processing with drag and drop.",
      dng: "Convert PNG to DNG on Mac for raw editing workflows. Archive images in Adobe's universal raw format.",
    },
    webp: {
      jpg: "Convert WebP to JPG (JPEG) on Mac for universal compatibility. Share images anywhere — every device and app supports JPG. Batch ready.",
      png: "Convert WebP to PNG on Mac for lossless quality and broad software compatibility. Transparency preserved. Batch processing.",
      avif: "Convert WebP to AVIF on Mac for even better compression. 20-30% smaller files than WebP at the same quality.",
      tiff: "Convert WebP to TIFF on Mac for print-ready output. Professional quality for publishing workflows. Batch processing.",
      heic: "Convert WebP to HEIC on Mac for efficient Apple device storage. Excellent quality at smaller file sizes.",
      gif: "Convert WebP to GIF on Mac — animations preserved for universal sharing on Slack, Discord, and email. Batch ready.",
      dng: "Convert WebP to DNG on Mac for raw editing flexibility in professional photo software.",
    },
    gif: {
      jpg: "Convert GIF to JPG (JPEG) on Mac for full-color photos. Escape the 256-color limit with universal JPG compatibility. Batch processing.",
      png: "Convert GIF to PNG on Mac for higher quality with millions of colors and transparency. Batch convert entire folders.",
      webp: "Convert GIF to WebP on Mac — smaller animations with full color support. Modern format for faster web loading.",
      avif: "Convert GIF to AVIF on Mac for the smallest animations with excellent quality. Far better compression than GIF.",
      tiff: "Convert GIF to TIFF on Mac for print-quality graphics and illustrations. Lossless output for professional use.",
      heic: "Convert GIF to HEIC on Mac for efficient storage on Apple devices. Batch processing included.",
      dng: "Convert GIF to DNG on Mac for archival or raw photo editing workflows.",
    },
    tiff: {
      jpg: "Convert TIFF to JPG (JPEG) on Mac — shrink massive print files for web sharing and email. Batch process entire scan folders.",
      png: "Convert TIFF to PNG on Mac for web-friendly lossless images with transparency. Smaller than TIFF, broader compatibility.",
      webp: "Convert TIFF to WebP on Mac — dramatically reduce large scan and print files for web use. Batch processing.",
      avif: "Convert TIFF to AVIF on Mac for the smallest web files from professional images. Excellent quality at tiny sizes.",
      heic: "Convert TIFF to HEIC on Mac for efficient storage without significant quality loss. Batch process entire archives.",
      gif: "Convert TIFF graphics to GIF on Mac for simple web use and animation support. Batch conversion.",
      dng: "Convert TIFF to DNG on Mac for standardized raw editing workflows. Adobe's universal raw format.",
    },
    dng: {
      jpg: "Convert DNG to JPG (JPEG) on Mac for easy sharing and universal compatibility. Batch process entire raw photo libraries.",
      png: "Convert DNG to PNG on Mac for lossless output with transparency. Ideal for extracting graphics from raw photos.",
      webp: "Convert DNG to WebP on Mac for web-optimized images from raw photos. Small files, excellent quality.",
      avif: "Convert DNG to AVIF on Mac for the best web compression from raw photos. Batch processing included.",
      tiff: "Convert DNG to TIFF on Mac for print-ready output preserving raw photo quality. Professional publishing format.",
      heic: "Convert DNG to HEIC on Mac for efficient storage of raw photos on Apple devices.",
      gif: "Convert DNG photos to GIF on Mac for simple web graphics. Batch conversion with drag and drop.",
    },
    avif: {
      jpg: "Convert AVIF to JPG (JPEG) on Mac for universal device compatibility. Share anywhere — every app supports JPG. Batch ready.",
      png: "Convert AVIF to PNG on Mac for lossless quality with broad software support. Transparency preserved. Batch processing.",
      webp: "Convert AVIF to WebP on Mac for wider browser support with good compression. Batch convert entire image sets.",
      tiff: "Convert AVIF to TIFF on Mac for print-ready professional output. Lossless quality for publishing workflows.",
      heic: "Convert AVIF to HEIC on Mac for native Apple device compatibility and efficient storage. Batch processing.",
      gif: "Convert AVIF to GIF on Mac for universal animation sharing on messaging apps and legacy systems.",
    },
  };

  return (
    descriptions[from.extension]?.[to.extension] ||
    `Convert ${from.name} to ${to.name} on Mac — fast batch conversion, offline processing, no quality loss. One-time purchase, no subscription.`
  );
}

// Manual overrides for priority conversion pages with enriched, unique content
const manualOverrides: Record<string, Partial<ConversionPair>> = {
  "heic-to-jpg": {
    metaTitle: "Convert HEIC to JPG on Mac — Fast Batch Converter",
    whyConvert:
      "Every iPhone photo since iOS 11 is saved as HEIC — a format that most Windows PCs, websites, and apps still can't open. Converting to JPG gives you universal compatibility without visible quality loss. Whether you're uploading vacation photos to a website, emailing images to a client, or printing from a non-Apple device, JPG is the format that just works everywhere.",
    benefits: [
      "Instantly share iPhone photos on any device, website, or social platform",
      "Batch convert hundreds of HEIC photos to JPG in seconds — entire folders at once",
      "Preserve EXIF metadata including GPS location, camera settings, and timestamps",
      "Adjust JPG quality from 60% to 100% to balance file size and sharpness",
      "All conversion happens locally on your Mac — your photos never leave your device",
      "Drag and drop from Finder, Photos app, or any folder on your Mac",
    ],
    faqs: [
      {
        question: "How do I convert HEIC to JPG on Mac?",
        answer:
          "Open Picmal, drag your HEIC files or folders into the window, select JPG as the output format, adjust quality if needed, and click Convert. All processing happens locally on your Mac.",
      },
      {
        question: "Does converting HEIC to JPG lose quality?",
        answer:
          "At 90-100% quality, the difference is virtually invisible to the human eye. A typical 12MP iPhone photo converts from ~2.5MB HEIC to ~3.5MB JPG at 95% quality with no visible artifacts. You can preview the quality before converting.",
      },
      {
        question: "Can I batch convert hundreds of HEIC photos at once?",
        answer:
          "Yes. Picmal handles batch conversion natively — drag entire folders with thousands of HEIC files and convert them all to JPG in one go. A batch of 500 iPhone photos typically converts in under 2 minutes on an M1 Mac.",
      },
      {
        question: "Why can't I open HEIC files on Windows or in some apps?",
        answer:
          "HEIC is Apple's proprietary image format based on the HEVC codec. While macOS and iOS support it natively, Windows requires a paid codec extension, and many web platforms, email clients, and image editors still don't support HEIC. JPG is universally supported.",
      },
      {
        question: "Does Picmal preserve photo metadata during conversion?",
        answer:
          "Yes. Picmal preserves all EXIF metadata including date taken, GPS coordinates, camera model, and exposure settings when converting HEIC to JPG. Your organized photo library stays intact.",
      },
      {
        question: "Is Picmal free to convert HEIC to JPG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription, no hidden fees. You can download the app to explore the interface, but a license is needed to convert files. 14-day money-back guarantee included.",
      },
      {
        question: "How does Picmal compare to using Preview or Automator?",
        answer:
          "Preview converts one file at a time and doesn't preserve all metadata. Automator workflows are fragile and slow for large batches. Picmal converts hundreds of files with full metadata preservation, quality control, and drag-and-drop simplicity.",
      },
      {
        question: "Can I convert HEIC to JPG without uploading my photos online?",
        answer:
          "Yes — Picmal processes everything locally on your Mac. Unlike web-based converters, your photos never leave your device. No upload limits, no file size restrictions, no privacy concerns.",
      },
    ],
    fileSizeExamples: [
      {
        label: "iPhone 15 Pro photo (48MP)",
        fromSize: "5.2 MB",
        toSize: "8.1 MB",
        savings: "Larger but universal",
      },
      {
        label: "iPhone 14 photo (12MP)",
        fromSize: "2.4 MB",
        toSize: "3.5 MB",
        savings: "95% quality",
      },
      {
        label: "iPhone screenshot",
        fromSize: "0.8 MB",
        toSize: "1.2 MB",
        savings: "90% quality",
      },
      {
        label: "Live Photo (still frame)",
        fromSize: "3.1 MB",
        toSize: "4.2 MB",
        savings: "95% quality",
      },
    ],
    conversionSpeed: "500 iPhone photos in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Sharing iPhone photos with Windows users",
        description:
          "Your family or colleagues on Windows can't open the HEIC files you send. Convert to JPG so everyone can view your photos without installing special software.",
      },
      {
        title: "Uploading to websites and social media",
        description:
          "Many platforms — including WordPress, Shopify, and some social media sites — still don't accept HEIC uploads. JPG is accepted everywhere.",
      },
      {
        title: "Printing photos at a lab or kiosk",
        description:
          "Most photo printing services require JPG format. Convert your iPhone photos before sending them to a print lab or using a retail photo kiosk.",
      },
      {
        title: "Migrating from Apple Photos to another platform",
        description:
          "Moving to Google Photos, Amazon Photos, or a NAS? Batch convert your HEIC library to JPG to ensure compatibility with any photo management system.",
      },
    ],
  },
  "webp-to-gif": {
    metaTitle: "Convert WebP to GIF on Mac — Preserve Animations",
    whyConvert:
      "WebP animations look great on modern browsers but can't be shared in many messaging apps, forums, or legacy systems that only support GIF. Converting WebP to GIF ensures your animations work everywhere — from Slack and Discord to email signatures and older websites.",
    benefits: [
      "Convert animated WebP files to universally supported GIF format",
      "Preserve animation frames, timing, and loop settings during conversion",
      "Batch convert multiple WebP animations to GIF at once",
      "Works completely offline — no uploading to sketchy online converters",
      "Process files of any size with no upload limits or watermarks",
      "Drag and drop conversion with zero configuration needed",
    ],
    faqs: [
      {
        question: "How do I convert WebP to GIF on Mac?",
        answer:
          "Open Picmal, drag your WebP files into the window, select GIF as the output format, and click Convert. Picmal handles both static and animated WebP files.",
      },
      {
        question: "Will the animation be preserved when converting WebP to GIF?",
        answer:
          "Yes. Picmal preserves all animation frames, timing between frames, and loop settings when converting animated WebP to GIF. The animation plays back identically.",
      },
      {
        question: "Why are my WebP files not working in some apps?",
        answer:
          "While modern browsers support WebP, many desktop apps, email clients, messaging platforms, and content management systems still don't recognize the format. GIF has been universally supported since the 1990s.",
      },
      {
        question: "Does converting WebP to GIF reduce quality?",
        answer:
          "GIF is limited to 256 colors per frame, so photo-quality WebP images will lose some color detail. For graphics, icons, and typical web animations, the quality difference is minimal.",
      },
      {
        question: "Can I convert WebP to GIF without an internet connection?",
        answer:
          "Yes. Picmal runs entirely on your Mac with no internet required. Unlike online converters, there are no upload limits, processing queues, or privacy concerns.",
      },
      {
        question: "Is Picmal free to convert WebP to GIF?",
        answer:
          "Picmal requires a one-time purchase of $15.99 — no subscription. You can download the app to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Animated WebP (short loop)",
        fromSize: "0.3 MB",
        toSize: "1.2 MB",
        savings: "GIF is larger but universal",
      },
      {
        label: "Static WebP graphic",
        fromSize: "0.1 MB",
        toSize: "0.2 MB",
        savings: "Minimal difference",
      },
      {
        label: "Long animated WebP (5s)",
        fromSize: "1.5 MB",
        toSize: "4.8 MB",
        savings: "GIF is larger due to 256-color limit",
      },
    ],
    conversionSpeed: "Instant for static images, ~10 seconds for long animations",
    useCases: [
      {
        title: "Sharing animations on Slack, Discord, or messaging apps",
        description:
          "Many messaging platforms auto-play GIFs but don't support WebP animations. Convert so your animations display correctly everywhere.",
      },
      {
        title: "Using animations in email newsletters",
        description:
          "Most email clients support GIF animations but not WebP. Convert your animated WebP content for email marketing campaigns.",
      },
      {
        title: "Posting on forums and legacy websites",
        description:
          "Older forums, CMS platforms, and social media sites may not support WebP. GIF ensures your animated content works everywhere.",
      },
    ],
  },
  "png-to-webp": {
    metaTitle: "Convert PNG to WebP on Mac — Save 25-35% File Size",
    whyConvert:
      "PNG files are lossless but often far too large for web use. WebP delivers 25-35% smaller files than PNG while supporting transparency — making it the ideal format for website images, e-commerce product shots, and any graphics that need to load fast without sacrificing quality.",
    benefits: [
      "Reduce image file sizes by 25-35% compared to PNG with no visible quality loss",
      "Preserve transparency (alpha channel) — perfect for logos and product images",
      "Speed up your website's load time and improve Core Web Vitals scores",
      "Batch convert entire image directories for a full site migration",
      "Choose between lossless and lossy WebP compression modes",
      "All processing happens locally — no uploading images to third-party services",
    ],
    faqs: [
      {
        question: "How do I convert PNG to WebP on Mac?",
        answer:
          "Open Picmal, drag your PNG files or folders into the window, select WebP as the output format, adjust quality settings, and click Convert. Picmal processes everything locally.",
      },
      {
        question: "Does WebP support transparency like PNG?",
        answer:
          "Yes. WebP fully supports alpha channel transparency, just like PNG. Your logos, product images, and graphics with transparent backgrounds will look identical in WebP format — at a fraction of the file size.",
      },
      {
        question: "How much smaller are WebP files compared to PNG?",
        answer:
          "For typical web graphics, WebP files are 25-35% smaller than PNG. A 500KB PNG logo might become 150KB in WebP. For photographs with transparency, savings can be even greater — up to 50%.",
      },
      {
        question: "Will converting PNG to WebP hurt my image quality?",
        answer:
          "Picmal supports both lossy and lossless WebP compression. In lossless mode, the conversion is mathematically identical to PNG — zero quality loss. In lossy mode at 90%+ quality, differences are invisible to the human eye.",
      },
      {
        question: "Do all browsers support WebP?",
        answer:
          "As of 2025, WebP is supported by 97%+ of browsers including Chrome, Firefox, Safari, and Edge. The only notable exception is very old browser versions. For maximum compatibility, keep PNG originals as fallback.",
      },
      {
        question: "Can I batch convert my entire website's images from PNG to WebP?",
        answer:
          "Yes. Drag your entire images directory into Picmal and convert all PNG files to WebP at once. This is the fastest way to optimize your website's images and improve page load speed.",
      },
      {
        question: "Is Picmal free to convert PNG to WebP?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface, and get a 14-day money-back guarantee with your purchase.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Website logo with transparency",
        fromSize: "480 KB",
        toSize: "145 KB",
        savings: "70% smaller",
      },
      {
        label: "E-commerce product image",
        fromSize: "1.2 MB",
        toSize: "380 KB",
        savings: "68% smaller",
      },
      {
        label: "UI screenshot (1920×1080)",
        fromSize: "2.8 MB",
        toSize: "850 KB",
        savings: "70% smaller",
      },
      {
        label: "Icon set (transparent BG)",
        fromSize: "95 KB",
        toSize: "32 KB",
        savings: "66% smaller",
      },
    ],
    conversionSpeed: "1,000 PNG images in ~3 minutes on Apple Silicon",
    useCases: [
      {
        title: "Optimizing website images for faster load times",
        description:
          "Replace PNG images with WebP across your site to reduce page weight by 25-35%. Faster pages improve SEO rankings and user experience.",
      },
      {
        title: "E-commerce product photography",
        description:
          "Product images with transparent backgrounds are often PNG. Convert to WebP to keep transparency while dramatically reducing file size for faster product page loads.",
      },
      {
        title: "Improving Core Web Vitals scores",
        description:
          "Google's Largest Contentful Paint (LCP) metric directly measures image load speed. Switching from PNG to WebP can significantly improve your LCP score.",
      },
      {
        title: "Reducing CDN bandwidth costs",
        description:
          "If you serve thousands of images monthly, the 25-35% file size reduction from PNG to WebP translates directly to lower CDN bills and faster global delivery.",
      },
    ],
  },
  "heic-to-png": {
    metaTitle: "Convert HEIC to PNG on Mac — Lossless Quality",
    whyConvert:
      "Need lossless quality or transparency from your iPhone photos? Converting HEIC to PNG preserves every pixel with zero compression artifacts. This is ideal when you need pixel-perfect images for graphic design, screenshots for documentation, or when you plan to edit the image further without quality degradation.",
    benefits: [
      "Lossless conversion — zero quality loss from your original iPhone photos",
      "PNG supports transparency, useful when extracting subjects from photos",
      "Ideal for screenshots, UI mockups, and images requiring sharp text",
      "Batch convert hundreds of HEIC files to PNG in one go",
      "Preserved EXIF metadata including location and camera data",
      "All processing stays local on your Mac — nothing uploaded online",
    ],
    faqs: [
      {
        question: "How do I convert HEIC to PNG on Mac?",
        answer:
          "Open Picmal, drag your HEIC files into the window, select PNG as the output format, and click Convert. The conversion is lossless — every detail from the original HEIC is preserved in the PNG.",
      },
      {
        question: "Does converting HEIC to PNG lose any quality?",
        answer:
          "No. PNG uses lossless compression, so your converted files retain 100% of the original quality. This makes HEIC to PNG ideal when you need pixel-perfect images for editing or archival.",
      },
      {
        question: "Why choose PNG over JPG when converting from HEIC?",
        answer:
          "Choose PNG when you need lossless quality (no compression artifacts), transparency support, or sharp edges for text and graphics. Choose JPG when you want smaller files for sharing and web uploads where slight quality loss is acceptable.",
      },
      {
        question: "Will PNG files be larger than the original HEIC?",
        answer:
          "Yes — significantly. HEIC uses advanced compression while PNG is lossless, so a 2.5MB HEIC photo may become 8-15MB as PNG. The tradeoff is perfect quality preservation and universal compatibility.",
      },
      {
        question: "Can I batch convert HEIC to PNG?",
        answer:
          "Yes. Drag entire folders into Picmal and convert all HEIC files to PNG at once. Picmal handles hundreds of files in a single batch without slowing down.",
      },
      {
        question: "When should I use HEIC to PNG vs HEIC to JPG?",
        answer:
          "Use HEIC to PNG for graphic design work, documentation screenshots, images with text overlays, or when you'll edit the image further. Use HEIC to JPG for general photo sharing, email, and web uploads where file size matters more than perfect quality.",
      },
      {
        question: "Is Picmal free to convert HEIC to PNG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "iPhone 15 Pro photo (48MP)",
        fromSize: "5.2 MB",
        toSize: "18.5 MB",
        savings: "Larger — lossless quality",
      },
      {
        label: "iPhone 14 photo (12MP)",
        fromSize: "2.4 MB",
        toSize: "9.8 MB",
        savings: "Larger — lossless quality",
      },
      {
        label: "iPhone screenshot",
        fromSize: "0.8 MB",
        toSize: "2.1 MB",
        savings: "Larger — pixel-perfect",
      },
    ],
    conversionSpeed: "200 iPhone photos in ~3 minutes on Apple Silicon",
    useCases: [
      {
        title: "Graphic design and photo editing workflows",
        description:
          "When you need to bring iPhone photos into Photoshop, Figma, or Sketch, PNG ensures no quality loss during the editing process. Every pixel stays intact.",
      },
      {
        title: "Documentation and technical screenshots",
        description:
          "iPhone screenshots in HEIC need to be converted to PNG for technical documentation, bug reports, and UI reviews where sharp text rendering is critical.",
      },
      {
        title: "Archiving photos at maximum quality",
        description:
          "For long-term archival, PNG's lossless compression ensures your photos remain at full quality. No generation loss from repeated edits or conversions.",
      },
      {
        title: "Extracting subjects with transparency",
        description:
          "When using portrait mode photos or extracting subjects in editing software, PNG supports transparency so you can place subjects on any background.",
      },
    ],
  },
  "jpg-to-png": {
    metaTitle: "Convert JPG to PNG on Mac — Add Transparency Support",
    whyConvert:
      "JPG doesn't support transparency — a dealbreaker for logos, product images on white backgrounds, and any graphic that needs to be layered in design tools. Converting JPG to PNG also eliminates compression artifacts, giving you a clean, crisp image for editing, documentation, or any workflow where quality matters more than file size.",
    benefits: [
      "Add transparency support — essential for logos, product images, and design overlays",
      "Eliminate JPG compression artifacts for cleaner, sharper images",
      "Lossless output preserves every detail for further editing in Photoshop or Figma",
      "Batch convert hundreds of JPG files to PNG in one go",
      "All processing happens locally on your Mac — no cloud uploads",
      "Drag and drop from Finder or any folder on your Mac",
    ],
    faqs: [
      {
        question: "How do I convert JPG to PNG on Mac?",
        answer:
          "Open Picmal, drag your JPG files into the window, select PNG as the output format, and click Convert. Picmal preserves all details from the original JPG in a lossless PNG file.",
      },
      {
        question: "Does converting JPG to PNG improve image quality?",
        answer:
          "Converting JPG to PNG won't recover quality already lost to JPG compression, but it prevents further degradation. The PNG output is lossless, so no additional quality is lost during conversion or future edits.",
      },
      {
        question: "Will PNG files be larger than the original JPG?",
        answer:
          "Yes. PNG uses lossless compression, so files are typically 3-5x larger than JPG. A 500KB JPG photo might become 1.5-2.5MB as PNG. The tradeoff is zero compression artifacts and transparency support.",
      },
      {
        question: "Can I add a transparent background after converting to PNG?",
        answer:
          "The conversion itself won't add transparency, but once in PNG format you can remove backgrounds in Photoshop, Figma, or any editor that supports alpha channels. JPG doesn't support this at all.",
      },
      {
        question: "When should I use JPG to PNG vs keep JPG?",
        answer:
          "Convert to PNG when you need transparency, will edit the image further, or need pixel-perfect quality for screenshots and graphics. Keep JPG for photos you're just sharing or uploading to the web.",
      },
      {
        question: "Is Picmal free to convert JPG to PNG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Product photo (12MP)",
        fromSize: "1.8 MB",
        toSize: "6.2 MB",
        savings: "Larger — lossless quality",
      },
      {
        label: "Website banner (1920×600)",
        fromSize: "320 KB",
        toSize: "1.1 MB",
        savings: "Larger — no artifacts",
      },
      {
        label: "Social media image (1080×1080)",
        fromSize: "450 KB",
        toSize: "1.8 MB",
        savings: "Larger — transparency ready",
      },
    ],
    conversionSpeed: "300 photos in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Creating product images with transparent backgrounds",
        description:
          "E-commerce product photos need transparent backgrounds for marketplace listings and website product cards. Convert JPG to PNG first, then remove the background in your editor.",
      },
      {
        title: "Preserving quality for graphic design workflows",
        description:
          "Importing JPG into Photoshop or Figma and re-saving repeatedly causes generation loss. Convert to PNG once to stop the quality degradation cycle.",
      },
      {
        title: "Screenshots and documentation images",
        description:
          "Technical documentation and UI screenshots need crisp text rendering. PNG preserves sharp edges that JPG compression blurs.",
      },
      {
        title: "Logo and brand asset archival",
        description:
          "If you only have JPG versions of logos or brand assets, convert to PNG for a lossless archival format that supports transparency for future use.",
      },
    ],
  },
  "jpg-to-webp": {
    metaTitle: "Convert JPG to WebP on Mac — Smaller Files, Same Quality",
    whyConvert:
      "WebP files are 25-35% smaller than JPG at the same visual quality — and every modern browser supports them. If you run a website, blog, or online store, converting your JPG images to WebP is one of the easiest ways to improve page speed, Core Web Vitals scores, and SEO rankings.",
    benefits: [
      "Reduce image file sizes by 25-35% compared to JPG with no visible quality loss",
      "Improve website load speed and Core Web Vitals scores for better SEO",
      "Supported by 97%+ of browsers including Chrome, Safari, Firefox, and Edge",
      "Batch convert entire image directories for a full website migration",
      "Adjust quality settings to find the perfect size-to-quality balance",
      "All processing happens locally — no uploading to third-party services",
    ],
    faqs: [
      {
        question: "How do I convert JPG to WebP on Mac?",
        answer:
          "Open Picmal, drag your JPG files or folders into the window, select WebP as the output format, adjust quality if needed, and click Convert. Picmal processes everything locally on your Mac.",
      },
      {
        question: "How much smaller are WebP files compared to JPG?",
        answer:
          "WebP files are typically 25-35% smaller than JPG at the same visual quality. A 1MB JPG photo often becomes 650-750KB as WebP. For website images, this adds up to significant bandwidth savings.",
      },
      {
        question: "Do all browsers support WebP?",
        answer:
          "As of 2026, WebP is supported by 97%+ of browsers worldwide including Chrome, Safari, Firefox, and Edge. Only very old browser versions lack support.",
      },
      {
        question: "Does converting JPG to WebP lose quality?",
        answer:
          "At the same quality setting, WebP and JPG look virtually identical — but the WebP file is 25-35% smaller. Picmal lets you set quality from 0-100 and preview before converting.",
      },
      {
        question: "Can I batch convert my entire website's images to WebP?",
        answer:
          "Yes. Drag your entire images directory into Picmal and convert all JPG files to WebP at once. Process thousands of images in minutes on Apple Silicon.",
      },
      {
        question: "Should I keep the original JPG files?",
        answer:
          "Yes — keep originals as backup. Some older tools and systems still don't support WebP, and you may need JPG versions for email newsletters or print materials.",
      },
      {
        question: "Is Picmal free to convert JPG to WebP?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Blog hero image (1920×1080)",
        fromSize: "850 KB",
        toSize: "580 KB",
        savings: "32% smaller",
      },
      {
        label: "Product photo (2000×2000)",
        fromSize: "1.4 MB",
        toSize: "920 KB",
        savings: "34% smaller",
      },
      {
        label: "Thumbnail (400×300)",
        fromSize: "95 KB",
        toSize: "62 KB",
        savings: "35% smaller",
      },
      {
        label: "Portfolio image (3000×2000)",
        fromSize: "2.8 MB",
        toSize: "1.9 MB",
        savings: "32% smaller",
      },
    ],
    conversionSpeed: "1,000 JPG images in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Speeding up website page load times",
        description:
          "Switching all JPG images on your site to WebP reduces total page weight by 25-35%. This directly improves Largest Contentful Paint (LCP) and overall Core Web Vitals scores.",
      },
      {
        title: "Reducing CDN and hosting bandwidth costs",
        description:
          "If you serve thousands of images monthly, the file size reduction from JPG to WebP translates directly to lower bandwidth bills on Cloudflare, Vercel, or AWS.",
      },
      {
        title: "E-commerce product image optimization",
        description:
          "Online stores with hundreds of product photos benefit massively from WebP. Faster product page loads mean better conversion rates and lower bounce rates.",
      },
      {
        title: "Blog and content site optimization",
        description:
          "Content-heavy sites with many inline images see significant performance gains from WebP conversion. Faster pages rank better in Google search results.",
      },
    ],
  },
  "png-to-jpg": {
    metaTitle: "Convert PNG to JPG on Mac — Reduce File Size 80%",
    whyConvert:
      "PNG files are great for graphics and transparency, but they're far too large for sharing photos by email, uploading to social media, or using on the web. Converting PNG to JPG can reduce file sizes by 60-80% while keeping photos looking great — making them easier to share, upload, and store.",
    benefits: [
      "Reduce file sizes by 60-80% — a 5MB PNG screenshot becomes under 1MB as JPG",
      "Universal compatibility — JPG works on every device, app, and website",
      "Faster email attachments and social media uploads",
      "Batch convert hundreds of PNG screenshots to JPG in one go",
      "Adjustable quality slider to balance size and sharpness",
      "All conversion happens locally on your Mac — nothing uploaded online",
    ],
    faqs: [
      {
        question: "How do I convert PNG to JPG on Mac?",
        answer:
          "Open Picmal, drag your PNG files or folders into the window, select JPG as the output format, adjust quality if needed, and click Convert. Picmal handles everything locally.",
      },
      {
        question: "Does converting PNG to JPG lose quality?",
        answer:
          "JPG uses lossy compression, so there is some quality reduction. At 90-95% quality, the difference is invisible for photos. For graphics with sharp text, you may notice slight softening of edges.",
      },
      {
        question: "How much smaller will my files be?",
        answer:
          "PNG to JPG typically reduces file sizes by 60-80%. A 5MB PNG screenshot becomes 800KB-1.2MB as JPG at 90% quality. Photos compress even better than screenshots.",
      },
      {
        question: "Will I lose transparency when converting to JPG?",
        answer:
          "Yes — JPG doesn't support transparency. Transparent areas become white (or the background color). If you need transparency, convert to WebP instead, which supports both transparency and small file sizes.",
      },
      {
        question: "Can I batch convert PNG to JPG?",
        answer:
          "Yes. Drag entire folders of PNG files into Picmal and convert them all to JPG at once with the same quality settings.",
      },
      {
        question: "Is Picmal free to convert PNG to JPG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Mac screenshot (2560×1440)",
        fromSize: "4.8 MB",
        toSize: "680 KB",
        savings: "86% smaller",
      },
      {
        label: "Photo exported as PNG",
        fromSize: "8.2 MB",
        toSize: "1.1 MB",
        savings: "87% smaller",
      },
      {
        label: "UI design export (1920×1080)",
        fromSize: "2.8 MB",
        toSize: "520 KB",
        savings: "81% smaller",
      },
      {
        label: "Chart/diagram (1200×800)",
        fromSize: "1.5 MB",
        toSize: "280 KB",
        savings: "81% smaller",
      },
    ],
    conversionSpeed: "500 PNG files in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Sharing screenshots by email or Slack",
        description:
          "Mac screenshots are saved as PNG and can be 3-8MB each. Convert to JPG before sharing to keep file sizes under 1MB — faster uploads and no attachment limits.",
      },
      {
        title: "Uploading photos to social media",
        description:
          "Some photo editors export as PNG by default. Social platforms re-compress uploads anyway, so converting to JPG first gives you control over quality and faster uploads.",
      },
      {
        title: "Reducing storage on NAS or cloud drives",
        description:
          "A folder of PNG photos can take 5-10x more space than JPG. Batch convert to JPG to reclaim storage on your Mac, NAS, or Google Drive.",
      },
      {
        title: "Web image preparation",
        description:
          "If your CMS or platform doesn't support WebP yet, JPG is the best alternative for photos. Convert design exports from PNG to JPG for faster-loading pages.",
      },
    ],
  },
  "webp-to-jpg": {
    metaTitle: "Convert WebP to JPG on Mac — Universal Compatibility",
    whyConvert:
      "WebP is great for the web, but it still isn't supported everywhere — many desktop apps, email clients, print services, and older systems can't open WebP files. Converting to JPG gives you a universally compatible format that works on every device and in every application, from Photoshop to your local print shop.",
    benefits: [
      "Universal compatibility — JPG opens in every app, device, and operating system",
      "Required for email attachments, print services, and many CMS platforms",
      "Preserve image quality with adjustable compression settings",
      "Batch convert hundreds of WebP files to JPG at once",
      "No internet required — all processing happens locally on your Mac",
      "Drag and drop conversion with zero configuration needed",
    ],
    faqs: [
      {
        question: "How do I convert WebP to JPG on Mac?",
        answer:
          "Open Picmal, drag your WebP files into the window, select JPG as the output format, adjust quality if needed, and click Convert. Picmal processes everything locally.",
      },
      {
        question: "Does converting WebP to JPG lose quality?",
        answer:
          "There is some quality reduction since JPG uses lossy compression. At 90-95% quality, the difference is invisible to the eye. Files will be slightly larger than the original WebP.",
      },
      {
        question: "Why can't I open WebP files in some apps?",
        answer:
          "Despite wide browser support, many desktop applications (older Photoshop versions, Office suite, some email clients) don't support WebP. JPG is the safe choice when you need the image to open everywhere.",
      },
      {
        question: "Will the file size increase when converting WebP to JPG?",
        answer:
          "Usually yes — JPG files are typically 25-35% larger than WebP at the same quality. A 500KB WebP image might become 700-800KB as JPG. The tradeoff is universal compatibility.",
      },
      {
        question: "Can I batch convert WebP to JPG?",
        answer:
          "Yes. Drag entire folders of WebP files into Picmal and convert them all to JPG at once. Process hundreds of files in seconds.",
      },
      {
        question: "Is Picmal free to convert WebP to JPG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Web photo (1920×1080)",
        fromSize: "420 KB",
        toSize: "620 KB",
        savings: "Larger but universal",
      },
      {
        label: "Product image (2000×2000)",
        fromSize: "680 KB",
        toSize: "980 KB",
        savings: "95% quality",
      },
      {
        label: "Blog thumbnail (800×600)",
        fromSize: "85 KB",
        toSize: "120 KB",
        savings: "90% quality",
      },
    ],
    conversionSpeed: "500 WebP images in ~1 minute on Apple Silicon",
    useCases: [
      {
        title: "Sending images via email",
        description:
          "Many email clients display WebP as attachments rather than inline images. Convert to JPG to ensure recipients see your images properly regardless of their email app.",
      },
      {
        title: "Printing photos from web downloads",
        description:
          "Downloaded a WebP image you want to print? Most print services and photo kiosks require JPG. Convert before uploading to your print service.",
      },
      {
        title: "Opening web images in older software",
        description:
          "Older versions of Photoshop, Illustrator, and Office apps can't open WebP. Convert to JPG to work with these images in any software.",
      },
      {
        title: "Archiving web content",
        description:
          "If you're saving web images for reference or archival, JPG is the safest long-term format. Every system for decades to come will support it.",
      },
    ],
  },
  "avif-to-jpg": {
    metaTitle: "Convert AVIF to JPG on Mac — Open AVIF Anywhere",
    whyConvert:
      "AVIF is the newest image format with excellent compression, but device and software support is still catching up. Many apps, email clients, and older systems can't open AVIF files. Converting to JPG ensures your images are viewable on any device and in any application — with no compatibility worries.",
    benefits: [
      "Universal compatibility — JPG works everywhere AVIF doesn't",
      "Open converted images in any app, email client, or operating system",
      "Batch convert hundreds of AVIF files to JPG at once",
      "Adjustable quality to balance file size and visual quality",
      "All processing happens locally on your Mac — files stay private",
      "Preserve EXIF metadata during conversion",
    ],
    faqs: [
      {
        question: "How do I convert AVIF to JPG on Mac?",
        answer:
          "Open Picmal, drag your AVIF files into the window, select JPG as the output format, and click Convert. Picmal handles everything locally with no internet required.",
      },
      {
        question: "Why can't I open AVIF files on my computer?",
        answer:
          "AVIF is a relatively new format (based on AV1 video codec). While modern browsers support it, many desktop apps — including older Photoshop versions, Office, and most email clients — don't yet. JPG is universally supported.",
      },
      {
        question: "Does converting AVIF to JPG lose quality?",
        answer:
          "JPG is lossy, so there's some quality reduction. At 90-95% quality, the difference is invisible. Since AVIF is also typically lossy, the conversion at high quality settings produces excellent results.",
      },
      {
        question: "How much larger will JPG files be compared to AVIF?",
        answer:
          "JPG files are typically 40-60% larger than AVIF at the same visual quality. A 300KB AVIF image might become 500-700KB as JPG. The tradeoff is universal compatibility.",
      },
      {
        question: "Can I batch convert AVIF to JPG?",
        answer:
          "Yes. Drag entire folders of AVIF files into Picmal and convert them all to JPG at once. Batch processing handles hundreds of files efficiently.",
      },
      {
        question: "Is Picmal free to convert AVIF to JPG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Web photo (1920×1080)",
        fromSize: "280 KB",
        toSize: "620 KB",
        savings: "Larger but universal",
      },
      {
        label: "Product image (2000×2000)",
        fromSize: "450 KB",
        toSize: "980 KB",
        savings: "95% quality",
      },
      {
        label: "Thumbnail (400×300)",
        fromSize: "35 KB",
        toSize: "85 KB",
        savings: "90% quality",
      },
    ],
    conversionSpeed: "500 AVIF images in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Sharing images from modern web apps",
        description:
          "Some web platforms now serve images as AVIF. When you save these images and need to share them, converting to JPG ensures everyone can open them.",
      },
      {
        title: "Using AVIF images in presentations and documents",
        description:
          "PowerPoint, Keynote, and Google Slides don't support AVIF. Convert to JPG to embed images in your presentations and documents.",
      },
      {
        title: "Printing downloaded images",
        description:
          "Print services and photo labs require JPG or TIFF. Convert AVIF downloads to JPG before sending to any print service.",
      },
      {
        title: "Cross-platform image sharing",
        description:
          "When sharing with colleagues or clients on Windows, Linux, or mobile, JPG is the safest format. No one needs special software to view JPG files.",
      },
    ],
  },
  "heic-to-webp": {
    metaTitle: "Convert HEIC to WebP on Mac — iPhone to Web Direct",
    whyConvert:
      "Your iPhone saves photos as HEIC, but your website needs them in a web-optimized format. WebP files are 30-50% smaller than JPG with the same visual quality, and they support transparency. Converting HEIC directly to WebP skips the JPG middleman and gives you the best format for web performance.",
    benefits: [
      "Skip the JPG step — go straight from iPhone to web-optimized format",
      "30-50% smaller files than converting HEIC to JPG for web use",
      "Supported by 97%+ of browsers including Chrome, Safari, Firefox, and Edge",
      "Batch convert hundreds of iPhone photos for your website or blog",
      "Adjust quality settings to find the optimal size-to-quality ratio",
      "All processing happens locally — your photos never leave your Mac",
    ],
    faqs: [
      {
        question: "How do I convert HEIC to WebP on Mac?",
        answer:
          "Open Picmal, drag your HEIC files or folders into the window, select WebP as the output format, adjust quality if needed, and click Convert. Picmal handles everything locally.",
      },
      {
        question: "Why convert HEIC to WebP instead of JPG?",
        answer:
          "WebP files are 25-35% smaller than JPG at the same quality, and WebP supports transparency. If your images are destined for the web, WebP gives you better performance than JPG. Only use JPG if you need compatibility with very old systems.",
      },
      {
        question: "Does converting HEIC to WebP lose quality?",
        answer:
          "WebP uses lossy compression by default, so there's some quality trade-off for smaller files. At 85-95% quality, the difference from the original HEIC is invisible. Picmal also supports lossless WebP if you need zero quality loss.",
      },
      {
        question: "How much smaller are WebP files compared to HEIC?",
        answer:
          "WebP and HEIC have similar compression efficiency, so file sizes are comparable. The advantage of WebP is browser compatibility — HEIC isn't supported by any web browser, while WebP works everywhere.",
      },
      {
        question: "Can I batch convert my entire iPhone photo library to WebP?",
        answer:
          "Yes. Export your HEIC photos from Apple Photos, drag the folder into Picmal, and convert them all to WebP at once. Process thousands of photos in minutes.",
      },
      {
        question: "Is Picmal free to convert HEIC to WebP?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "iPhone 15 Pro photo (48MP)",
        fromSize: "5.2 MB",
        toSize: "4.8 MB",
        savings: "8% smaller",
      },
      {
        label: "iPhone 14 photo (12MP)",
        fromSize: "2.4 MB",
        toSize: "2.1 MB",
        savings: "12% smaller",
      },
      {
        label: "iPhone screenshot",
        fromSize: "0.8 MB",
        toSize: "0.3 MB",
        savings: "62% smaller",
      },
      {
        label: "Landscape photo (12MP)",
        fromSize: "3.1 MB",
        toSize: "2.6 MB",
        savings: "16% smaller",
      },
    ],
    conversionSpeed: "500 iPhone photos in ~3 minutes on Apple Silicon",
    useCases: [
      {
        title: "Publishing iPhone photos on your website or blog",
        description:
          "Skip the HEIC → JPG → WebP chain. Convert directly from HEIC to WebP for the fastest possible website images with excellent quality.",
      },
      {
        title: "Optimizing product photos for e-commerce",
        description:
          "iPhone product shots in HEIC can go straight to WebP for your Shopify, WooCommerce, or custom store. Smaller images mean faster product pages.",
      },
      {
        title: "Building image galleries for portfolios",
        description:
          "Photographers and creators can batch convert iPhone galleries to WebP for online portfolios that load fast and look sharp.",
      },
      {
        title: "Social media and content creation",
        description:
          "Content creators who shoot on iPhone can convert HEIC to WebP for web-based content management systems and headless CMS platforms.",
      },
    ],
  },
  "tiff-to-jpg": {
    metaTitle: "Convert TIFF to JPG on Mac — Shrink Files 90%+",
    whyConvert:
      "TIFF files from scanners, cameras, and professional software can be 20-100MB each — far too large for email, web, or everyday sharing. Converting TIFF to JPG reduces file sizes by 90-95% while keeping photos looking great. It's the easiest way to make professional images accessible everywhere.",
    benefits: [
      "Reduce file sizes by 90-95% — a 50MB TIFF scan becomes 2-3MB as JPG",
      "Universal compatibility — JPG opens on every device and in every app",
      "Batch convert entire folders of scanned documents and professional photos",
      "Adjustable quality from 60-100% for the right size-to-quality balance",
      "Preserved EXIF metadata including camera settings and color profiles",
      "All processing happens locally on your Mac — no upload limits",
    ],
    faqs: [
      {
        question: "How do I convert TIFF to JPG on Mac?",
        answer:
          "Open Picmal, drag your TIFF files or folders into the window, select JPG as the output format, adjust quality, and click Convert. Picmal handles files of any size locally on your Mac.",
      },
      {
        question: "How much smaller will JPG files be compared to TIFF?",
        answer:
          "JPG files are typically 90-95% smaller than TIFF. A 50MB TIFF scan becomes 2-3MB as JPG at 90% quality. Even at 95% quality, you'll see 85%+ reduction.",
      },
      {
        question: "Does converting TIFF to JPG lose quality?",
        answer:
          "Yes — JPG uses lossy compression. At 90-95% quality, the difference from the original TIFF is invisible for photographs. For images with fine text, use 95%+ quality to keep text sharp.",
      },
      {
        question: "Can I convert multi-page TIFF files?",
        answer:
          "Picmal extracts each page from multi-page TIFF files and converts them individually to JPG, so you get one JPG per page.",
      },
      {
        question: "Will converting TIFF to JPG affect my print-ready files?",
        answer:
          "JPG is not ideal for professional printing due to lossy compression. Keep your original TIFF files for print workflows and use the JPG versions for sharing, web, and everyday use.",
      },
      {
        question: "Is Picmal free to convert TIFF to JPG?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Scanned document (300 DPI, A4)",
        fromSize: "25 MB",
        toSize: "1.8 MB",
        savings: "93% smaller",
      },
      {
        label: "Professional photo (24MP RAW export)",
        fromSize: "48 MB",
        toSize: "3.2 MB",
        savings: "93% smaller",
      },
      {
        label: "High-res scan (600 DPI)",
        fromSize: "95 MB",
        toSize: "5.5 MB",
        savings: "94% smaller",
      },
      {
        label: "Film scan (4000 DPI frame)",
        fromSize: "72 MB",
        toSize: "4.1 MB",
        savings: "94% smaller",
      },
    ],
    conversionSpeed: "100 TIFF files in ~3 minutes on Apple Silicon",
    useCases: [
      {
        title: "Sharing scanned documents by email",
        description:
          "Scanned TIFF documents at 300 DPI are 20-30MB each — too large for most email services. Convert to JPG for files under 2MB that send instantly.",
      },
      {
        title: "Archiving professional photos for everyday access",
        description:
          "Keep TIFF originals for print, but create JPG versions for your photo library, sharing, and quick browsing. A 1TB TIFF archive becomes ~50GB in JPG.",
      },
      {
        title: "Uploading scans to document management systems",
        description:
          "Most document management systems and cloud storage have file size limits. TIFF to JPG conversion lets you upload scans without hitting size caps.",
      },
      {
        title: "Creating web versions of print materials",
        description:
          "Have TIFF files from your print designer? Convert to JPG for web versions of brochures, flyers, and marketing materials.",
      },
    ],
  },
  "jpg-to-avif": {
    metaTitle: "Convert JPG to AVIF on Mac — 50% Smaller Images",
    whyConvert:
      "AVIF delivers up to 50% smaller files than JPG at the same visual quality — it's the most efficient image format available today. If you're optimizing a website for maximum performance, AVIF is the format to target. Supported by Chrome, Firefox, Safari, and Edge, it's ready for production use.",
    benefits: [
      "Up to 50% smaller files than JPG at the same visual quality",
      "The best available format for web image performance in 2026",
      "Supported by Chrome, Firefox, Safari 16+, and Edge",
      "Supports HDR, wide color gamut, and 10-bit color depth",
      "Batch convert entire image directories for a full website migration",
      "All processing happens locally on your Mac — no cloud uploads",
    ],
    faqs: [
      {
        question: "How do I convert JPG to AVIF on Mac?",
        answer:
          "Open Picmal, drag your JPG files into the window, select AVIF as the output format, adjust quality if needed, and click Convert. Picmal handles encoding locally on your Mac.",
      },
      {
        question: "How much smaller are AVIF files compared to JPG?",
        answer:
          "AVIF files are typically 40-50% smaller than JPG at the same visual quality. A 1MB JPG often becomes 500-600KB as AVIF with no visible difference.",
      },
      {
        question: "Do all browsers support AVIF?",
        answer:
          "As of 2026, AVIF is supported by Chrome, Firefox, Safari 16+, and Edge — covering 92%+ of global browser usage. For the remaining percentage, serve JPG or WebP as fallback.",
      },
      {
        question: "Is AVIF better than WebP?",
        answer:
          "AVIF produces 20-30% smaller files than WebP at the same quality and supports HDR and wider color gamuts. WebP has slightly broader browser support. For maximum performance, use AVIF with WebP/JPG fallback.",
      },
      {
        question: "Why is AVIF encoding slower than JPG or WebP?",
        answer:
          "AVIF uses the AV1 video codec for compression, which is more computationally intensive. On Apple Silicon Macs, Picmal encodes AVIF efficiently, but expect slower conversion than JPG or WebP.",
      },
      {
        question: "Is Picmal free to convert JPG to AVIF?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Blog hero image (1920×1080)",
        fromSize: "850 KB",
        toSize: "380 KB",
        savings: "55% smaller",
      },
      {
        label: "Product photo (2000×2000)",
        fromSize: "1.4 MB",
        toSize: "620 KB",
        savings: "56% smaller",
      },
      {
        label: "Thumbnail (400×300)",
        fromSize: "95 KB",
        toSize: "42 KB",
        savings: "56% smaller",
      },
      {
        label: "Portfolio image (3000×2000)",
        fromSize: "2.8 MB",
        toSize: "1.3 MB",
        savings: "54% smaller",
      },
    ],
    conversionSpeed: "500 JPG images in ~5 minutes on Apple Silicon",
    useCases: [
      {
        title: "Maximum website performance optimization",
        description:
          "For sites where every kilobyte matters — landing pages, e-commerce, mobile-first sites — AVIF offers the best possible image compression available today.",
      },
      {
        title: "High-traffic sites with bandwidth costs",
        description:
          "Sites serving millions of images monthly save significantly on CDN costs with AVIF. The 50% reduction vs JPG can cut image bandwidth bills in half.",
      },
      {
        title: "Progressive enhancement image strategy",
        description:
          "Use AVIF as your primary format with WebP and JPG fallbacks. Serve the smallest possible files to modern browsers while maintaining compatibility.",
      },
      {
        title: "HDR and wide color gamut photography",
        description:
          "AVIF supports 10-bit color and HDR, making it the only widely-supported web format that can display the full richness of modern camera output.",
      },
    ],
  },
  "png-to-avif": {
    metaTitle: "Convert PNG to AVIF on Mac — Transparency at 80% Less",
    whyConvert:
      "PNG files with transparency can be enormous — logos, product images, and UI assets often weigh 500KB-5MB each. AVIF supports transparency just like PNG but at a fraction of the file size, often 60-80% smaller. For websites that need transparent images at maximum performance, PNG to AVIF is the ultimate optimization.",
    benefits: [
      "60-80% smaller files than PNG while preserving transparency",
      "The most efficient transparent image format for the web",
      "Supported by Chrome, Firefox, Safari 16+, and Edge",
      "Both lossy and lossless compression modes available",
      "Batch convert entire asset directories at once",
      "All processing happens locally on your Mac — no cloud uploads",
    ],
    faqs: [
      {
        question: "How do I convert PNG to AVIF on Mac?",
        answer:
          "Open Picmal, drag your PNG files into the window, select AVIF as the output format, adjust quality settings, and click Convert. Picmal processes everything locally.",
      },
      {
        question: "Does AVIF support transparency like PNG?",
        answer:
          "Yes. AVIF fully supports alpha channel transparency, just like PNG. Your logos, product cutouts, and UI elements with transparent backgrounds convert perfectly.",
      },
      {
        question: "How much smaller are AVIF files compared to PNG?",
        answer:
          "AVIF files are typically 60-80% smaller than PNG. A 1MB PNG logo might become 150-250KB as AVIF. For product images with transparency, savings are even more dramatic.",
      },
      {
        question: "Should I use AVIF or WebP for transparent images?",
        answer:
          "AVIF produces 20-30% smaller files than WebP at the same quality. Use AVIF for maximum compression and serve WebP as a fallback for browsers that don't support AVIF yet.",
      },
      {
        question: "Can I use lossless AVIF compression?",
        answer:
          "Yes. Picmal supports lossless AVIF encoding for pixel-perfect output. Lossless AVIF files are typically 30-50% smaller than lossless PNG.",
      },
      {
        question: "Is Picmal free to convert PNG to AVIF?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Logo with transparency (800×200)",
        fromSize: "480 KB",
        toSize: "65 KB",
        savings: "86% smaller",
      },
      {
        label: "Product cutout (2000×2000)",
        fromSize: "3.2 MB",
        toSize: "420 KB",
        savings: "87% smaller",
      },
      {
        label: "UI icon set (transparent)",
        fromSize: "95 KB",
        toSize: "18 KB",
        savings: "81% smaller",
      },
      {
        label: "Illustration with alpha (1920×1080)",
        fromSize: "1.8 MB",
        toSize: "280 KB",
        savings: "84% smaller",
      },
    ],
    conversionSpeed: "500 PNG images in ~6 minutes on Apple Silicon",
    useCases: [
      {
        title: "E-commerce product images with transparent backgrounds",
        description:
          "Product cutout images in PNG can be 2-5MB each. Converting to AVIF reduces them to 200-500KB while keeping perfect transparency — dramatically faster product pages.",
      },
      {
        title: "Logo and brand asset optimization",
        description:
          "Logos with transparency are typically PNG. Converting to AVIF produces the smallest possible logo files for websites, reducing page weight for every page that shows your logo.",
      },
      {
        title: "UI component and icon optimization",
        description:
          "Web apps and SaaS products with many UI assets in PNG benefit from bulk AVIF conversion. Smaller assets mean faster initial load times and better perceived performance.",
      },
      {
        title: "Illustration and infographic delivery",
        description:
          "Illustrations and infographics with transparent or semi-transparent elements compress dramatically in AVIF while maintaining smooth gradients and clean edges.",
      },
    ],
  },
  "gif-to-webp": {
    metaTitle: "Convert GIF to WebP on Mac — 70% Smaller Animations",
    whyConvert:
      "GIF animations are huge — a 5-second GIF can easily be 5-10MB. WebP supports animation with full color (not just 256 colors) at a fraction of the file size. Converting GIF to WebP typically reduces file sizes by 50-70% while improving visual quality with millions of colors instead of 256.",
    benefits: [
      "50-70% smaller animated files compared to GIF",
      "Full color support (16.7 million colors vs GIF's 256)",
      "Better visual quality — smooth gradients instead of dithering",
      "Supported by 97%+ of browsers including Chrome, Safari, Firefox, and Edge",
      "Batch convert animated GIF collections at once",
      "All processing happens locally on your Mac — no upload limits",
    ],
    faqs: [
      {
        question: "How do I convert GIF to WebP on Mac?",
        answer:
          "Open Picmal, drag your GIF files into the window, select WebP as the output format, and click Convert. Picmal preserves all animation frames, timing, and loop settings.",
      },
      {
        question: "Are animations preserved when converting GIF to WebP?",
        answer:
          "Yes. All animation frames, timing between frames, and loop settings are preserved in the WebP output. The animation plays identically — just with better quality and smaller file size.",
      },
      {
        question: "How much smaller are WebP animations compared to GIF?",
        answer:
          "WebP animations are typically 50-70% smaller than GIF. A 5MB GIF animation often becomes 1.5-2.5MB as WebP with better visual quality thanks to full color support.",
      },
      {
        question: "Will WebP animations work on all browsers?",
        answer:
          "As of 2026, animated WebP is supported by 97%+ of browsers including Chrome, Safari, Firefox, and Edge. Only very old browser versions lack support.",
      },
      {
        question: "Why does WebP look better than GIF?",
        answer:
          "GIF is limited to 256 colors per frame, which causes visible dithering and banding in photos and gradients. WebP supports 16.7 million colors, producing smooth, artifact-free animations.",
      },
      {
        question: "Is Picmal free to convert GIF to WebP?",
        answer:
          "Picmal is a one-time purchase of $15.99 — no subscription. Download to explore the interface. 14-day money-back guarantee included.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Short animation loop (2s)",
        fromSize: "2.8 MB",
        toSize: "850 KB",
        savings: "70% smaller",
      },
      {
        label: "Screen recording GIF (5s)",
        fromSize: "8.5 MB",
        toSize: "2.8 MB",
        savings: "67% smaller",
      },
      {
        label: "Simple icon animation",
        fromSize: "320 KB",
        toSize: "110 KB",
        savings: "66% smaller",
      },
      {
        label: "Product demo GIF (10s)",
        fromSize: "15 MB",
        toSize: "5.2 MB",
        savings: "65% smaller",
      },
    ],
    conversionSpeed: "50 animated GIFs in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Optimizing animated content on websites",
        description:
          "GIF animations on blog posts and landing pages are often the heaviest page elements. Converting to WebP can reduce page weight by megabytes per animation.",
      },
      {
        title: "Product demo and tutorial animations",
        description:
          "Screen recording GIFs for product demos are typically 5-15MB. WebP versions load 50-70% faster and look better with full color support.",
      },
      {
        title: "Email-safe animated content",
        description:
          "While some email clients still need GIF, many modern email platforms support WebP. Use WebP for web content and keep GIF versions for email fallback.",
      },
      {
        title: "Social media and messaging content",
        description:
          "Create smaller, higher-quality animated content for platforms that support WebP. Faster uploads and better visual quality than GIF.",
      },
    ],
  },
};

// Generate all conversion pairs
const formatKeys = Object.keys(formats);
export const conversions: ConversionPair[] = [];

for (const fromKey of formatKeys) {
  for (const toKey of formatKeys) {
    if (fromKey === toKey) continue;
    const from = formats[fromKey];
    const to = formats[toKey];
    const slug = `${fromKey}-to-${toKey}`;
    const override = manualOverrides[slug];
    conversions.push({
      from: fromKey,
      to: toKey,
      slug,
      ...(override?.metaTitle && { metaTitle: override.metaTitle }),
      metaDescription: generateMetaDescription(from, to),
      whyConvert: override?.whyConvert || generateWhyConvert(from, to),
      benefits: override?.benefits || generateBenefits(from, to),
      faqs: override?.faqs || generateFAQs(from, to),
      ...(override?.fileSizeExamples && {
        fileSizeExamples: override.fileSizeExamples,
      }),
      ...(override?.conversionSpeed && {
        conversionSpeed: override.conversionSpeed,
      }),
      ...(override?.useCases && { useCases: override.useCases }),
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
