// Compression data for programmatic SEO pages

export interface CompressionFormat {
  format: string;
  name: string;
  fullName: string;
  slug: string;
  description: string;
  whyCompress: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const compressions: CompressionFormat[] = [
  {
    format: "jpg",
    name: "JPG",
    fullName: "Joint Photographic Experts Group",
    slug: "jpg",
    description:
      "JPG is the most common image format for photos. Compression reduces file size while maintaining acceptable visual quality.",
    whyCompress:
      "Large JPG files slow down websites and eat up storage. Picmal compresses JPG files on your Mac — reducing sizes by up to 80% while keeping images looking sharp.",
    benefits: [
      "Reduce JPG file sizes by up to 80% with adjustable quality",
      "Batch compress hundreds of JPG files at once",
      "All processing happens locally on your Mac — files stay private",
      "Preserve or strip metadata to further reduce size",
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
        question: "Is JPG compression free with Picmal?",
        answer:
          "Picmal requires a one-time purchase of $15.99. No subscription fees. 14-day money-back guarantee.",
      },
    ],
  },
  {
    format: "png",
    name: "PNG",
    fullName: "Portable Network Graphics",
    slug: "png",
    description:
      "PNG files are lossless but can be very large. Compression optimizes the encoding without losing any quality.",
    whyCompress:
      "PNG screenshots and graphics can be surprisingly large. Picmal optimizes PNG compression on your Mac to reduce file sizes without any quality loss.",
    benefits: [
      "Lossless PNG compression — zero quality loss",
      "Reduce PNG file sizes by 20-50% through optimized encoding",
      "Batch compress entire folders of screenshots and graphics",
      "Strip unnecessary metadata to further reduce size",
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
          "Typical PNG compression reduces file sizes by 20-50%. Screenshots with large areas of solid color compress especially well.",
      },
      {
        question: "Can I batch compress PNG files?",
        answer:
          "Yes. Picmal supports batch processing — drag and drop hundreds of PNG files or entire folders and compress them all at once.",
      },
      {
        question: "Should I convert PNG to WebP instead of compressing?",
        answer:
          "If you need the smallest possible file and your use case supports WebP, converting is better. If you need PNG compatibility, compressing is the way to go. Picmal can do both.",
      },
    ],
  },
  {
    format: "gif",
    name: "GIF",
    fullName: "Graphics Interchange Format",
    slug: "gif",
    description:
      "GIF animations can become very large. Compression reduces file size while preserving animation frames.",
    whyCompress:
      "GIF animations are notoriously large files. Picmal compresses GIF files on your Mac by optimizing color palettes and frame data.",
    benefits: [
      "Compress GIF animations without losing frames",
      "Optimize color palettes for smaller file sizes",
      "Batch compress multiple GIF files at once",
      "Reduce GIF sizes for faster web loading",
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
          "WebP animations are much smaller than GIF. If your use case supports WebP, converting will give you better results. Picmal can convert GIF to WebP too.",
      },
      {
        question: "Can I compress multiple GIF files at once?",
        answer:
          "Yes. Picmal supports batch compression — drag and drop all your GIF files and compress them in one go.",
      },
    ],
  },
  {
    format: "webp",
    name: "WebP",
    fullName: "WebP Image Format",
    slug: "webp",
    description:
      "WebP already offers good compression, but further optimization can reduce file sizes even more.",
    whyCompress:
      "Even WebP files can benefit from additional compression. Picmal optimizes WebP encoding on your Mac for the smallest possible file sizes.",
    benefits: [
      "Further reduce already-small WebP file sizes",
      "Adjust quality settings for optimal size-to-quality ratio",
      "Batch compress WebP files from your website or project",
      "All processing happens offline on your Mac",
    ],
    faqs: [
      {
        question: "Can WebP files be compressed further?",
        answer:
          "Yes. WebP files exported from other tools aren't always optimally compressed. Picmal can re-encode them with better compression settings.",
      },
      {
        question: "Does WebP compression lose quality?",
        answer:
          "WebP supports both lossy and lossless compression. You can choose the quality level that balances file size and visual quality.",
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
    ],
  },
  {
    format: "tiff",
    name: "TIFF",
    fullName: "Tagged Image File Format",
    slug: "tiff",
    description:
      "TIFF files are extremely large due to their lossless nature. Compression can significantly reduce storage needs.",
    whyCompress:
      "TIFF files from scanners and cameras can be enormous. Picmal compresses TIFF files on your Mac using optimized lossless encoding.",
    benefits: [
      "Dramatically reduce TIFF file sizes with lossless compression",
      "Batch compress TIFF files from scanners or cameras",
      "Maintain full quality for professional and print workflows",
      "Save disk space without sacrificing image quality",
    ],
    faqs: [
      {
        question: "Does TIFF compression lose quality?",
        answer:
          "TIFF compression in Picmal uses lossless encoding, so the compressed file is identical to the original. No quality is lost.",
      },
      {
        question: "How much can TIFF files be compressed?",
        answer:
          "TIFF compression can reduce file sizes by 30-60% depending on the image content. Images with large areas of similar color compress the most.",
      },
      {
        question: "Is compressed TIFF still suitable for print?",
        answer:
          "Yes. Lossless TIFF compression preserves all image data, so compressed files are just as suitable for print as uncompressed ones.",
      },
      {
        question: "Can I compress an entire folder of TIFF files?",
        answer:
          "Yes. Picmal handles batch compression — drag and drop entire folders of TIFF files and compress them all at once.",
      },
    ],
  },
  {
    format: "avif",
    name: "AVIF",
    fullName: "AV1 Image File Format",
    slug: "avif",
    description:
      "AVIF already offers excellent compression, but Picmal can optimize encoding settings for even smaller files.",
    whyCompress:
      "AVIF provides the best compression ratios available, but files can still be optimized further. Picmal fine-tunes AVIF encoding on your Mac.",
    benefits: [
      "Optimize AVIF encoding for the smallest possible files",
      "Adjust quality settings for your specific needs",
      "Batch compress AVIF files for entire websites",
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
          "Yes, AVIF typically produces 20-30% smaller files than WebP at the same visual quality. However, WebP has broader browser support.",
      },
      {
        question: "Can I batch compress AVIF files?",
        answer:
          "Yes. Picmal supports batch compression for all formats including AVIF. Process hundreds of files at once.",
      },
    ],
  },
  {
    format: "pdf",
    name: "PDF",
    fullName: "Portable Document Format",
    slug: "pdf",
    description:
      "PDF files with embedded images can be very large. Compression reduces the size of embedded images while keeping text sharp.",
    whyCompress:
      "PDF files with photos and scans can be enormous. Picmal compresses PDFs on your Mac by optimizing embedded images while keeping text crisp.",
    benefits: [
      "Compress PDF files by optimizing embedded images",
      "Reduce PDF sizes for email attachments and web uploads",
      "Batch compress multiple PDF files at once",
      "Keep text and vector graphics sharp while reducing image quality",
    ],
    faqs: [
      {
        question: "How does PDF compression work?",
        answer:
          "Picmal compresses the embedded images within PDF files. Text and vector graphics remain untouched, so documents stay crisp and readable.",
      },
      {
        question: "How much can I reduce a PDF file size?",
        answer:
          "PDF compression can reduce file sizes by 30-80% depending on how many images are embedded and their original quality.",
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
    ],
  },
];

export function getCompression(slug: string): CompressionFormat | undefined {
  return compressions.find((c) => c.slug === slug);
}
