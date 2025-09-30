export interface CompressionFormatInfo {
  name: string;
  fullName: string;
  description: string;
  useCase: string;
  typical_compression: string;
  quality_retention: string;
  supports_lossless: boolean;
  best_for: string[];
}

export interface CompressionInfo {
  format: string;
  title: string;
  description: string;
  why_compress: string;
  compression_range: string;
  quality_impact: string;
  use_cases: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const compressionFormats: Record<string, CompressionFormatInfo> = {
  jpg: {
    name: 'JPG',
    fullName: 'JPEG Compression',
    description: 'Most popular photo compression format with excellent size reduction',
    useCase: 'Photos and images with natural colors',
    typical_compression: '60-90% smaller than original',
    quality_retention: 'Adjustable quality, minimal visible loss at 85-95%',
    supports_lossless: false,
    best_for: ['Photos', 'Web images', 'Social media', 'Email attachments']
  },
  webp: {
    name: 'WebP',
    fullName: 'WebP Compression',
    description: 'Modern format with superior compression and quality balance',
    useCase: 'Web optimization and modern applications',
    typical_compression: '25-35% smaller than JPG at same quality',
    quality_retention: 'Excellent quality retention with better compression',
    supports_lossless: true,
    best_for: ['Website images', 'Web apps', 'Online galleries', 'E-commerce']
  },
  png: {
    name: 'PNG',
    fullName: 'PNG Compression',
    description: 'Lossless compression for graphics and images with transparency',
    useCase: 'Graphics, logos, and images requiring transparency',
    typical_compression: '10-30% smaller with lossless optimization',
    quality_retention: 'Perfect quality retention (lossless)',
    supports_lossless: true,
    best_for: ['Screenshots', 'Logos', 'Graphics', 'Images with transparency']
  },
  gif: {
    name: 'GIF',
    fullName: 'GIF Compression',
    description: 'Compression for animations and simple graphics',
    useCase: 'Animations and limited-color graphics',
    typical_compression: 'Varies based on color count and animation',
    quality_retention: 'Limited to 256 colors',
    supports_lossless: true,
    best_for: ['Animations', 'Simple graphics', 'Memes', 'Icons']
  },
  tiff: {
    name: 'TIFF',
    fullName: 'TIFF Compression',
    description: 'Professional format with lossless compression options',
    useCase: 'Professional photography and archival',
    typical_compression: '30-50% with LZW compression',
    quality_retention: 'Perfect quality (lossless options)',
    supports_lossless: true,
    best_for: ['Professional photos', 'Print preparation', 'Archival', 'Scanning']
  },
  avif: {
    name: 'AVIF',
    fullName: 'AVIF Compression',
    description: 'Next-generation format with cutting-edge compression',
    useCase: 'Future-proof web images with maximum compression',
    typical_compression: '50% smaller than WebP at same quality',
    quality_retention: 'Excellent quality with aggressive compression',
    supports_lossless: true,
    best_for: ['Next-gen web', 'High-quality web images', 'Modern browsers', 'Progressive apps']
  },
  pdf: {
    name: 'PDF',
    fullName: 'PDF Image Compression',
    description: 'Compress images within PDF documents',
    useCase: 'Document optimization and file size reduction',
    typical_compression: '40-70% file size reduction',
    quality_retention: 'Adjustable based on use case',
    supports_lossless: true,
    best_for: ['Documents', 'Reports', 'Presentations', 'Archival']
  }
};

export const compressionData: CompressionInfo[] = [
  {
    format: 'jpg',
    title: 'Compress JPG Images on Mac (Offline, Fast, and Private)',
    description: 'Reduce JPG file size by up to 90% while maintaining visual quality. 100% offline processing, batch compression, perfect for photos and web images.',
    why_compress: 'JPG compression significantly reduces file sizes for faster uploads, email attachments, and website loading. Smaller files save storage space while maintaining visual quality.',
    compression_range: 'Typically 60-90% file size reduction depending on quality settings',
    quality_impact: 'Minimal visible quality loss at 85-95% quality settings. Perfect for most use cases.',
    use_cases: [
      'Website optimization',
      'Email attachments under size limits',
      'Social media uploads',
      'Storage space management',
      'Faster cloud backups'
    ],
    faqs: [
      {
        question: "How much can I compress a JPG without losing quality?",
        answer: "With Picmal, you can typically reduce JPG file sizes by 60-70% while maintaining excellent visual quality at 85-90% quality settings. The difference is usually imperceptible to the human eye."
      },
      {
        question: "Can I batch compress JPG files?",
        answer: "Yes! Picmal excels at batch processing. Simply drag and drop multiple JPG files or entire folders to compress them all at once with your chosen settings."
      },
      {
        question: "Will compressing JPG files affect print quality?",
        answer: "For print, use higher quality settings (90-95%). At these settings, compressed JPG files maintain excellent quality suitable for most print applications."
      },
      {
        question: "Is JPG compression reversible?",
        answer: "JPG compression is lossy, meaning it cannot be reversed. Always keep original files if you need them. Picmal processes files locally, so your originals are safe on your Mac."
      }
    ]
  },
  {
    format: 'webp',
    title: 'Compress WebP Images on Mac (Offline, Fast, and Private)',
    description: 'Optimize WebP files for even smaller sizes with superior quality. 100% offline processing, batch compression, perfect for modern web applications.',
    why_compress: 'WebP already offers great compression, but further optimization can reduce file sizes by an additional 25-35% while maintaining excellent quality for web delivery.',
    compression_range: '25-35% additional reduction beyond standard WebP compression',
    quality_impact: 'Excellent quality retention even with aggressive compression',
    use_cases: [
      'Website performance optimization',
      'Progressive web apps',
      'E-commerce product images',
      'Modern web applications',
      'Fast-loading galleries'
    ],
    faqs: [
      {
        question: "Why compress WebP if it's already compressed?",
        answer: "While WebP is efficient, Picmal can further optimize file sizes by 25-35% through advanced compression techniques, perfect for ultra-fast websites."
      },
      {
        question: "Does WebP support lossless compression?",
        answer: "Yes! WebP supports both lossy and lossless compression. Picmal lets you choose the best option for your needs."
      },
      {
        question: "Can I batch compress WebP files?",
        answer: "Absolutely! Drag and drop multiple WebP files or folders to compress them all simultaneously with consistent settings."
      },
      {
        question: "Is WebP better than JPG for web images?",
        answer: "Yes, WebP typically produces 25-35% smaller files than JPG at similar quality levels, making it excellent for web performance."
      }
    ]
  }
];

export function getCompressionInfo(format: string): CompressionInfo | undefined {
  return compressionData.find(data => data.format === format);
}

export function getAllCompressionFormats(): string[] {
  return Object.keys(compressionFormats);
}

export function generateCompressionData(format: string): CompressionInfo {
  const existing = getCompressionInfo(format);
  if (existing) return existing;

  const formatInfo = compressionFormats[format];

  if (!formatInfo) {
    throw new Error(`Unknown compression format: ${format}`);
  }

  return {
    format,
    title: `Compress ${formatInfo.name} Images on Mac (Offline, Fast, and Private)`,
    description: `Reduce ${formatInfo.name} file sizes while maintaining quality. 100% offline processing, batch compression, perfect for ${formatInfo.useCase}.`,
    why_compress: `${formatInfo.name} compression reduces file sizes for ${formatInfo.useCase}. ${formatInfo.typical_compression}.`,
    compression_range: formatInfo.typical_compression,
    quality_impact: formatInfo.quality_retention,
    use_cases: formatInfo.best_for,
    faqs: [
      {
        question: `How much can I compress ${formatInfo.name} files?`,
        answer: `With Picmal, you can typically achieve ${formatInfo.typical_compression}. ${formatInfo.quality_retention}.`
      },
      {
        question: `Can I batch compress ${formatInfo.name} files?`,
        answer: `Yes! Picmal makes it easy to compress multiple ${formatInfo.name} files at once. Just drag and drop entire folders to process them all simultaneously.`
      },
      {
        question: `Is ${formatInfo.name} compression lossless?`,
        answer: formatInfo.supports_lossless
          ? `${formatInfo.name} supports both lossless and lossy compression. Picmal lets you choose the best option for your needs.`
          : `${formatInfo.name} uses lossy compression, which means some data is discarded to achieve smaller file sizes. However, at high quality settings, the difference is usually imperceptible.`
      },
      {
        question: `What is ${formatInfo.name} best used for?`,
        answer: `${formatInfo.name} is ideal for ${formatInfo.best_for.slice(0, 3).join(', ')}, and more. It's particularly good for ${formatInfo.useCase}.`
      }
    ]
  };
}