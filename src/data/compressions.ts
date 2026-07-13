// Compression data for programmatic SEO pages

export interface CompressionFileSizeExample {
  label: string;
  originalSize: string;
  compressedSize: string;
  savings: string;
}

export interface CompressionUseCase {
  title: string;
  description: string;
}

export interface CompressionFormat {
  format: string;
  name: string;
  fullName: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  whyCompress: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
  fileSizeExamples: CompressionFileSizeExample[];
  compressionSpeed: string;
  useCases: CompressionUseCase[];
}

export const compressions: CompressionFormat[] = [
  {
    format: "jpg",
    name: "JPG",
    fullName: "Joint Photographic Experts Group",
    slug: "jpg",
    metaTitle: "Picmal: Compress JPG (JPEG) on Mac, reduce photo size up to 80%",
    metaDescription:
      "Compress JPG/JPEG files on Mac with adjustable quality. Reduce photo sizes by up to 80% while keeping images sharp. Batch processing, offline, one-time purchase.",
    description:
      "JPG (also called JPEG) is the most common image format for photos. Compression reduces file size while maintaining acceptable visual quality.",
    whyCompress:
      "Large JPG files slow down websites and eat up storage. Picmal compresses JPG (JPEG) files on your Mac — reducing sizes by up to 80% while keeping images looking sharp. Adjust the quality slider to find the exact balance between file size and visual quality for your use case.",
    benefits: [
      "Reduce JPG file sizes by up to 80% with adjustable quality",
      "Batch compress hundreds of JPG files at once",
      "All processing happens locally on your Mac — files stay private",
      "Preserve or strip EXIF metadata to further reduce size",
      "Preview quality before compressing to find the right balance",
      "Drag and drop files or entire folders from Finder",
    ],
    faqs: [
      {
        question: "How much can I compress a JPG file?",
        answer:
          "Picmal can reduce JPG file sizes by 50-80% depending on the quality setting. A typical 5MB photo can be compressed to under 1MB with minimal visible quality loss.",
      },
      {
        question: "Does compressing JPG reduce image quality?",
        answer:
          "JPG compression is lossy, so there is some quality reduction. Picmal lets you adjust the quality slider to find the right balance. At 80% quality, most images look identical to the original.",
      },
      {
        question: "Can I batch compress multiple JPG files?",
        answer:
          "Yes. Drag and drop hundreds of JPG files or entire folders into Picmal and compress them all at once with the same quality settings.",
      },
      {
        question: "Will compressed JPG files still look good on my website?",
        answer:
          "Yes. At 75-85% quality, compressed JPG images are indistinguishable from originals on screen. Most websites use 80% quality as the sweet spot between size and sharpness.",
      },
      {
        question: "Does Picmal preserve photo metadata when compressing?",
        answer:
          "By default, yes — EXIF data like date, location, and camera settings is preserved. You can also choose to strip metadata for additional size savings.",
      },
      {
        question: "Is JPG compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "iPhone photo (12MP)",
        originalSize: "4.8 MB",
        compressedSize: "1.2 MB",
        savings: "75% smaller",
      },
      {
        label: "DSLR photo (24MP)",
        originalSize: "12 MB",
        compressedSize: "2.4 MB",
        savings: "80% smaller",
      },
      {
        label: "Website hero image (1920×1080)",
        originalSize: "850 KB",
        compressedSize: "280 KB",
        savings: "67% smaller",
      },
      {
        label: "Product photo (2000×2000)",
        originalSize: "3.2 MB",
        compressedSize: "680 KB",
        savings: "79% smaller",
      },
    ],
    compressionSpeed: "500 JPG photos in ~1 minute on Apple Silicon",
    useCases: [
      {
        title: "Optimizing website images for faster load times",
        description:
          "Compress JPG images before uploading to your CMS. Smaller images mean faster page loads, better Core Web Vitals, and improved SEO rankings.",
      },
      {
        title: "Reducing email attachment sizes",
        description:
          "Compress photos before emailing to stay under attachment limits. A batch of 20 vacation photos can go from 80MB to under 20MB.",
      },
      {
        title: "Saving storage on Mac, NAS, or cloud drives",
        description:
          "A photo library of 10,000 JPG files at 5MB each takes 50GB. Compressing to 80% quality reduces that to ~15GB with no visible difference.",
      },
      {
        title: "Preparing images for social media",
        description:
          "Social platforms re-compress uploads anyway. Pre-compressing with Picmal gives you control over quality and avoids double compression artifacts.",
      },
    ],
  },
  {
    format: "png",
    name: "PNG",
    fullName: "Portable Network Graphics",
    slug: "png",
    metaTitle: "Picmal: Compress PNG on Mac, lossless, zero quality loss",
    metaDescription:
      "Compress PNG files on Mac with lossless optimization. Reduce screenshots and graphics by 20-50% with zero quality loss. Batch processing, offline.",
    description:
      "PNG files are lossless but can be very large. Compression optimizes the encoding without losing any quality.",
    whyCompress:
      "PNG screenshots and graphics can be surprisingly large — a single Retina screenshot can be 5-10MB. Picmal optimizes PNG compression on your Mac to reduce file sizes by 20-50% without losing a single pixel of quality.",
    benefits: [
      "Lossless PNG compression — zero quality loss, pixel-identical output",
      "Reduce PNG file sizes by 20-50% through optimized encoding",
      "Batch compress entire folders of screenshots and graphics",
      "Strip unnecessary metadata to further reduce size",
      "Transparency and alpha channels fully preserved",
      "All processing happens locally on your Mac",
    ],
    faqs: [
      {
        question: "Does compressing PNG lose quality?",
        answer:
          "No. PNG compression in Picmal is lossless — the compressed file is pixel-identical to the original, just with a smaller file size through optimized encoding.",
      },
      {
        question: "How much can I compress a PNG file?",
        answer:
          "Typical PNG compression reduces file sizes by 20-50%. Screenshots with large areas of solid color compress especially well — some reduce by 60%+.",
      },
      {
        question: "Can I batch compress PNG files?",
        answer:
          "Yes. Picmal supports batch processing — drag and drop hundreds of PNG files or entire folders and compress them all at once.",
      },
      {
        question: "Should I convert PNG to WebP instead of compressing?",
        answer:
          "If you need the smallest possible file and your use case supports WebP, converting is better (25-35% smaller). If you need PNG compatibility, compressing is the way to go. Picmal can do both.",
      },
      {
        question: "Is transparency preserved after compression?",
        answer:
          "Yes. PNG compression in Picmal preserves all transparency and alpha channel data. Your logos and graphics with transparent backgrounds stay exactly the same.",
      },
      {
        question: "Is PNG compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Retina screenshot (2560×1440)",
        originalSize: "5.8 MB",
        compressedSize: "3.2 MB",
        savings: "45% smaller",
      },
      {
        label: "Logo with transparency (800×200)",
        originalSize: "480 KB",
        compressedSize: "240 KB",
        savings: "50% smaller",
      },
      {
        label: "UI design export (1920×1080)",
        originalSize: "2.8 MB",
        compressedSize: "1.6 MB",
        savings: "43% smaller",
      },
      {
        label: "Icon set (256×256 each)",
        originalSize: "95 KB",
        compressedSize: "52 KB",
        savings: "45% smaller",
      },
    ],
    compressionSpeed: "500 PNG files in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Compressing screenshots for documentation",
        description:
          "Technical docs and help guides include many screenshots. Lossless PNG compression reduces storage and bandwidth without affecting the crisp text rendering you need.",
      },
      {
        title: "Optimizing logos and brand assets",
        description:
          "Logo files with transparency are often unoptimized. Compressing them saves bandwidth on every page load since logos appear site-wide.",
      },
      {
        title: "Reducing design export file sizes",
        description:
          "Exports from Figma, Sketch, and Photoshop are rarely optimally compressed. Batch compress your design exports before uploading to your project.",
      },
      {
        title: "Archiving screenshots with smaller footprint",
        description:
          "If you take many screenshots for QA, bug reports, or reference, lossless compression reduces storage needs without any quality trade-off.",
      },
    ],
  },
  {
    format: "gif",
    name: "GIF",
    fullName: "Graphics Interchange Format",
    slug: "gif",
    metaTitle: "Picmal: Compress GIF on Mac, smaller animations, all frames",
    metaDescription:
      "Compress GIF files on Mac without losing animation frames. Reduce animated GIF sizes by 10-40% through optimized encoding. Batch processing, offline.",
    description:
      "GIF animations can become very large. Compression reduces file size while preserving animation frames.",
    whyCompress:
      "GIF animations are notoriously large — a 5-second screen recording GIF can easily hit 10MB. Picmal compresses GIF files on your Mac by optimizing color palettes and frame encoding, reducing sizes by 10-40% while keeping every frame intact.",
    benefits: [
      "Compress GIF animations without losing any frames",
      "Optimize color palettes for smaller file sizes",
      "Batch compress multiple GIF files at once",
      "Reduce GIF sizes for faster web loading and email delivery",
      "Preserve animation timing and loop settings",
      "All processing happens locally on your Mac",
    ],
    faqs: [
      {
        question: "Does compressing GIF remove animation frames?",
        answer:
          "No. Picmal compresses GIF files by optimizing encoding and color palettes, not by removing frames. Your animations stay intact.",
      },
      {
        question: "How much smaller can a compressed GIF be?",
        answer:
          "GIF compression typically reduces file sizes by 10-40% depending on the content. Simple animations with fewer colors compress more.",
      },
      {
        question: "Should I convert GIF to WebP instead?",
        answer:
          "WebP animations are 50-70% smaller than GIF with better color depth. If your use case supports WebP, converting will give much better results. Picmal can convert GIF to WebP too.",
      },
      {
        question: "Can I compress multiple GIF files at once?",
        answer:
          "Yes. Picmal supports batch compression — drag and drop all your GIF files and compress them in one go.",
      },
      {
        question: "Will compressed GIFs work everywhere?",
        answer:
          "Yes. Compressed GIF files maintain full compatibility — they work in every browser, email client, messaging app, and social media platform.",
      },
      {
        question: "Is GIF compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Short animation loop (2s)",
        originalSize: "2.8 MB",
        compressedSize: "1.9 MB",
        savings: "32% smaller",
      },
      {
        label: "Screen recording (5s)",
        originalSize: "8.5 MB",
        compressedSize: "5.8 MB",
        savings: "32% smaller",
      },
      {
        label: "Simple icon animation",
        originalSize: "320 KB",
        compressedSize: "210 KB",
        savings: "34% smaller",
      },
      {
        label: "Product demo GIF (10s)",
        originalSize: "15 MB",
        compressedSize: "10.5 MB",
        savings: "30% smaller",
      },
    ],
    compressionSpeed: "50 animated GIFs in ~1 minute on Apple Silicon",
    useCases: [
      {
        title: "Optimizing animated content on websites and blogs",
        description:
          "GIF animations are often the heaviest elements on a page. Compressing them reduces page weight and improves load times without converting to a different format.",
      },
      {
        title: "Reducing GIF size for email newsletters",
        description:
          "Many email clients support GIF but not WebP. Compress your animated GIFs to fit within email size limits while keeping animations intact.",
      },
      {
        title: "Faster uploads to social media and messaging",
        description:
          "Compressed GIFs upload faster to Slack, Discord, and social platforms. Smaller files mean quicker sharing without switching formats.",
      },
      {
        title: "Preparing screen recordings for documentation",
        description:
          "Screen recording GIFs for product docs and tutorials are often oversized. Compress them to keep your help center fast-loading.",
      },
    ],
  },
  {
    format: "webp",
    name: "WebP",
    fullName: "WebP Image Format",
    slug: "webp",
    metaTitle: "Picmal: Compress WebP on Mac, optimize further",
    metaDescription:
      "Further compress WebP files on Mac by re-encoding with optimized settings. Reduce file sizes by 10-40%. Batch processing, offline, adjustable quality.",
    description:
      "WebP already offers good compression, but further optimization can reduce file sizes even more.",
    whyCompress:
      "Even WebP files can benefit from additional compression. Files exported from different tools use different encoding settings — Picmal re-encodes them with optimized settings to squeeze out every unnecessary byte.",
    benefits: [
      "Further reduce already-small WebP file sizes by 10-40%",
      "Re-encode with optimized settings from any source tool",
      "Adjust quality settings for the optimal size-to-quality ratio",
      "Batch compress WebP files from your website or project",
      "Choose between lossy and lossless compression modes",
      "All processing happens offline on your Mac",
    ],
    faqs: [
      {
        question: "Can WebP files be compressed further?",
        answer:
          "Yes. WebP files exported from Photoshop, Figma, or other tools aren't always optimally compressed. Picmal can re-encode them with better compression settings.",
      },
      {
        question: "Does WebP compression lose quality?",
        answer:
          "WebP supports both lossy and lossless compression. In lossy mode, there's some quality trade-off for smaller files. In lossless mode, the output is pixel-identical.",
      },
      {
        question: "How much can I reduce WebP file sizes?",
        answer:
          "Depending on the original encoding quality, you can typically reduce WebP files by 10-40% with adjusted quality settings.",
      },
      {
        question: "Can I batch compress WebP files?",
        answer:
          "Yes. Picmal supports batch processing for all formats including WebP. Drag and drop files or folders to compress them all at once.",
      },
      {
        question: "When should I compress WebP vs convert from JPG/PNG?",
        answer:
          "If you already have WebP files and want them smaller, compress. If you have JPG or PNG originals, convert to WebP — you'll get better results starting from the higher-quality source.",
      },
      {
        question: "Is WebP compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Blog image (1920×1080)",
        originalSize: "580 KB",
        compressedSize: "380 KB",
        savings: "34% smaller",
      },
      {
        label: "Product photo (2000×2000)",
        originalSize: "920 KB",
        compressedSize: "620 KB",
        savings: "33% smaller",
      },
      {
        label: "Thumbnail (400×300)",
        originalSize: "62 KB",
        compressedSize: "42 KB",
        savings: "32% smaller",
      },
      {
        label: "Icon with transparency",
        originalSize: "45 KB",
        compressedSize: "28 KB",
        savings: "38% smaller",
      },
    ],
    compressionSpeed: "1,000 WebP images in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Optimizing an existing WebP image library",
        description:
          "If your site already uses WebP but the files were exported with conservative settings, batch re-compression can reduce total image weight by 20-30%.",
      },
      {
        title: "Standardizing quality across different sources",
        description:
          "When images come from multiple tools or team members, quality settings vary. Batch compress to a consistent quality level for uniform file sizes.",
      },
      {
        title: "Reducing CDN bandwidth costs further",
        description:
          "Even a 10-20% reduction on thousands of WebP images adds up to significant bandwidth savings on high-traffic sites.",
      },
      {
        title: "Preparing assets for mobile-first delivery",
        description:
          "Mobile users on slower connections benefit the most from aggressively compressed WebP. Lower quality settings for mobile variants can reduce sizes another 20-30%.",
      },
    ],
  },
  {
    format: "tiff",
    name: "TIFF",
    fullName: "Tagged Image File Format",
    slug: "tiff",
    metaTitle: "Picmal: Compress TIFF on Mac, lossless, print-ready",
    metaDescription:
      "Compress TIFF files on Mac with lossless encoding. Reduce scan and camera files by 30-60% while maintaining print-ready quality. Batch processing.",
    description:
      "TIFF files are extremely large due to their lossless nature. Compression can significantly reduce storage needs.",
    whyCompress:
      "TIFF files from scanners and cameras can be 20-100MB each. Picmal compresses TIFF files on your Mac using optimized lossless encoding — reducing sizes by 30-60% while keeping every pixel identical to the original.",
    benefits: [
      "Dramatically reduce TIFF file sizes with lossless compression",
      "Batch compress TIFF files from scanners or cameras",
      "Maintain full quality for professional and print workflows",
      "Save disk space without sacrificing image quality",
      "Compressed TIFF is still print-ready — no quality trade-off",
      "Process files of any size locally on your Mac",
    ],
    faqs: [
      {
        question: "Does TIFF compression lose quality?",
        answer:
          "No. TIFF compression in Picmal uses lossless encoding, so the compressed file is identical to the original. No quality is lost.",
      },
      {
        question: "How much can TIFF files be compressed?",
        answer:
          "TIFF compression can reduce file sizes by 30-60% depending on the image content. Images with large areas of similar color compress the most.",
      },
      {
        question: "Is compressed TIFF still suitable for print?",
        answer:
          "Yes. Lossless TIFF compression preserves all image data, color profiles, and bit depth. Compressed files are just as suitable for print as uncompressed ones.",
      },
      {
        question: "Can I compress an entire folder of TIFF files?",
        answer:
          "Yes. Picmal handles batch compression — drag and drop entire folders of TIFF files and compress them all at once.",
      },
      {
        question: "Will prepress software accept compressed TIFF?",
        answer:
          "Yes. Compressed TIFF uses standard lossless algorithms (LZW, ZIP) that are universally supported by Adobe InDesign, Illustrator, and all major prepress tools.",
      },
      {
        question: "Is TIFF compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Scanned document (300 DPI, A4)",
        originalSize: "25 MB",
        compressedSize: "12 MB",
        savings: "52% smaller",
      },
      {
        label: "DSLR photo export (24MP)",
        originalSize: "48 MB",
        compressedSize: "22 MB",
        savings: "54% smaller",
      },
      {
        label: "High-res scan (600 DPI)",
        originalSize: "95 MB",
        compressedSize: "45 MB",
        savings: "53% smaller",
      },
      {
        label: "Film scan (4000 DPI frame)",
        originalSize: "72 MB",
        compressedSize: "38 MB",
        savings: "47% smaller",
      },
    ],
    compressionSpeed: "100 TIFF files in ~3 minutes on Apple Silicon",
    useCases: [
      {
        title: "Reducing storage for scan archives",
        description:
          "Document scanning workflows generate enormous TIFF archives. Lossless compression can halve your storage needs without any quality compromise.",
      },
      {
        title: "Speeding up file transfers in print workflows",
        description:
          "Sending uncompressed TIFF files to a print service takes forever. Compressed TIFF files transfer twice as fast with identical print output.",
      },
      {
        title: "Managing camera raw exports",
        description:
          "Professional photographers exporting to TIFF for editing benefit from compression to manage growing libraries on their Mac.",
      },
      {
        title: "Archiving high-resolution artwork",
        description:
          "Museums, galleries, and design studios archiving artwork as TIFF can save significant storage with lossless compression.",
      },
    ],
  },
  {
    format: "avif",
    name: "AVIF",
    fullName: "AV1 Image File Format",
    slug: "avif",
    metaTitle: "Picmal: Compress AVIF on Mac, squeeze more from AV1",
    metaDescription:
      "Further compress AVIF files on Mac by re-encoding with optimized AV1 settings. Reduce file sizes 10-40%. Batch processing, adjustable quality.",
    description:
      "AVIF already offers excellent compression, but Picmal can optimize encoding settings for even smaller files.",
    whyCompress:
      "AVIF provides the best compression ratios available, but files from different tools use varying encoding parameters. Picmal re-encodes AVIF with optimized AV1 settings to squeeze out the best possible compression on your Mac.",
    benefits: [
      "Optimize AVIF encoding for the smallest possible files",
      "Re-encode from any source tool with better AV1 parameters",
      "Adjust quality settings for your specific needs",
      "Batch compress AVIF files for entire websites",
      "Choose between lossy and lossless compression modes",
      "Offline processing keeps your images private",
    ],
    faqs: [
      {
        question: "Can AVIF files be compressed more?",
        answer:
          "Yes. AVIF files from different tools use different encoding settings. Picmal can re-encode with optimized settings for smaller file sizes.",
      },
      {
        question: "Does AVIF compression affect quality?",
        answer:
          "AVIF compression is adjustable. Lower quality settings produce smaller files with some visual differences. Higher settings maintain near-perfect quality.",
      },
      {
        question: "Is AVIF better than WebP for compression?",
        answer:
          "Yes, AVIF typically produces 20-30% smaller files than WebP at the same visual quality. However, WebP has slightly broader browser support as of 2026.",
      },
      {
        question: "Can I batch compress AVIF files?",
        answer:
          "Yes. Picmal supports batch compression for all formats including AVIF. Process hundreds of files at once.",
      },
      {
        question: "Why is AVIF compression slower than other formats?",
        answer:
          "AVIF uses the AV1 video codec which is more computationally intensive than WebP or JPG encoding. On Apple Silicon Macs, encoding is still fast — just not as instant as JPG.",
      },
      {
        question: "Is AVIF compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Blog image (1920×1080)",
        originalSize: "380 KB",
        compressedSize: "250 KB",
        savings: "34% smaller",
      },
      {
        label: "Product photo (2000×2000)",
        originalSize: "620 KB",
        compressedSize: "420 KB",
        savings: "32% smaller",
      },
      {
        label: "Thumbnail (400×300)",
        originalSize: "42 KB",
        compressedSize: "28 KB",
        savings: "33% smaller",
      },
      {
        label: "HDR photo (3000×2000)",
        originalSize: "1.3 MB",
        compressedSize: "850 KB",
        savings: "35% smaller",
      },
    ],
    compressionSpeed: "500 AVIF images in ~5 minutes on Apple Silicon",
    useCases: [
      {
        title: "Optimizing AVIF images from other tools",
        description:
          "AVIF files from Squoosh, Sharp, or ImageMagick may not use optimal encoding parameters. Re-compress with Picmal for the best possible file sizes.",
      },
      {
        title: "Reducing bandwidth for AVIF-heavy websites",
        description:
          "Sites serving AVIF to modern browsers can reduce bandwidth further by ensuring each file uses optimal encoding settings.",
      },
      {
        title: "Preparing multiple quality variants",
        description:
          "Create different quality levels of AVIF images for responsive delivery — high quality for desktop, lower quality for mobile.",
      },
      {
        title: "Batch standardizing AVIF encoding",
        description:
          "When AVIF files come from multiple pipelines or team members, batch re-compression ensures consistent quality and optimal file sizes.",
      },
    ],
  },
  {
    format: "pdf",
    name: "PDF",
    fullName: "Portable Document Format",
    slug: "pdf",
    metaTitle: "Picmal: Compress PDF on Mac, reduce size, keep text sharp",
    metaDescription:
      "How to compress a PDF on Mac: drop it into Picmal and shrink it 30-80% while keeping text and vectors crisp. Never bigger than the original. Batch, offline, no upload.",
    description:
      "PDF files with embedded images can be very large. Compression reduces the size of embedded images while keeping text sharp.",
    whyCompress:
      "PDF files with photos and scans can be enormous — a 10-page report with photos might be 50MB. Picmal compresses PDFs on your Mac by optimizing embedded images while keeping text, fonts, and vector graphics perfectly crisp.",
    benefits: [
      "Compress PDF files by optimizing embedded images",
      "Reduce PDF sizes by 30-80% depending on image content",
      "Text, fonts, and vector graphics stay perfectly sharp",
      "Batch compress multiple PDF files at once",
      "Meet email attachment size limits without splitting files",
      "Never bigger than the original: if a PDF can't shrink, Picmal keeps your file untouched",
      "All processing happens locally on your Mac, documents stay private",
    ],
    faqs: [
      {
        question: "How do I compress a PDF on my Mac?",
        answer:
          "Open Picmal, drag your PDF in (or a whole folder of them), pick a quality level, and click Compress. Picmal optimizes the embedded images and saves a smaller PDF, all on your Mac with nothing uploaded.",
      },
      {
        question: "Could compression make my PDF bigger?",
        answer:
          "No. Picmal guarantees the result is never larger than the original. If a PDF is already as small as it can get, Picmal keeps your existing file instead of writing a bigger one.",
      },
      {
        question: "How does PDF compression work?",
        answer:
          "Picmal compresses the embedded images within PDF files. Text and vector graphics remain untouched, so documents stay crisp and readable.",
      },
      {
        question: "How much can I reduce a PDF file size?",
        answer:
          "PDF compression can reduce file sizes by 30-80% depending on how many images are embedded and their original quality. Image-heavy PDFs see the biggest reductions.",
      },
      {
        question: "Does PDF compression affect text quality?",
        answer:
          "No. Picmal only compresses the embedded images within PDFs. Text, fonts, and vector graphics remain at full quality.",
      },
      {
        question: "Can I compress multiple PDFs at once?",
        answer:
          "Yes. Picmal supports batch processing — drag and drop all your PDF files and compress them in one go.",
      },
      {
        question: "Will compressed PDFs still be printable?",
        answer:
          "Yes. Compressed PDFs maintain their layout, fonts, and text quality. Only the embedded images are optimized, so print output looks great.",
      },
      {
        question: "Is PDF compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
    fileSizeExamples: [
      {
        label: "Report with photos (10 pages)",
        originalSize: "48 MB",
        compressedSize: "12 MB",
        savings: "75% smaller",
      },
      {
        label: "Scanned document (5 pages)",
        originalSize: "22 MB",
        compressedSize: "5.5 MB",
        savings: "75% smaller",
      },
      {
        label: "Presentation export (20 slides)",
        originalSize: "35 MB",
        compressedSize: "8 MB",
        savings: "77% smaller",
      },
      {
        label: "Product catalog (50 pages)",
        originalSize: "120 MB",
        compressedSize: "28 MB",
        savings: "77% smaller",
      },
    ],
    compressionSpeed: "50 PDF files in ~2 minutes on Apple Silicon",
    useCases: [
      {
        title: "Sending documents via email",
        description:
          "Most email services limit attachments to 25MB. Compress your PDF reports and proposals to fit within limits without splitting into multiple emails.",
      },
      {
        title: "Uploading to document management systems",
        description:
          "Many CMS platforms and cloud storage services have file size limits. Compressed PDFs upload faster and stay within size caps.",
      },
      {
        title: "Reducing scanned document storage",
        description:
          "Scanned PDFs are notoriously large. Compressing the embedded scan images can reduce archive sizes by 70-80% with acceptable quality.",
      },
      {
        title: "Faster PDF downloads on your website",
        description:
          "If you host downloadable PDFs (guides, whitepapers, catalogs), compressing them improves download speed and user experience.",
      },
    ],
  },
];

export function getCompression(slug: string): CompressionFormat | undefined {
  return compressions.find((c) => c.slug === slug);
}
