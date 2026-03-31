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

// Manual overrides for priority conversion pages with enriched, unique content
const manualOverrides: Record<string, Partial<ConversionPair>> = {
  "heic-to-jpg": {
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
