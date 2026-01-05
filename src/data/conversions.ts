export interface FormatInfo {
  name: string;
  fullName: string;
  description: string;
  useCase: string;
  advantages: string[];
  disadvantages: string[];
  typical_size: string;
  quality: 'lossy' | 'lossless';
  supports_transparency: boolean;
  supports_animation: boolean;
  browser_support: 'universal' | 'modern' | 'limited';
  common_uses: string[];
}

export interface ConversionInfo {
  from: string;
  to: string;
  title: string;
  description: string;
  why_convert: string;
  quality_impact: string;
  size_reduction: string;
  use_cases: string[];
  faqs: Array<{ question: string; answer: string }>;
  special_features?: string[];
}

export const formats: Record<string, FormatInfo> = {
  heic: {
    name: 'HEIC',
    fullName: 'High Efficiency Image Container',
    description: "Apple's default photo format offering superior compression",
    useCase: 'iPhone photos with excellent compression',
    advantages: ['50% smaller than JPG', 'Better quality', 'Supports Live Photos'],
    disadvantages: ['Limited compatibility', 'Not supported on Windows', 'Newer format'],
    typical_size: '2-4MB for photos',
    quality: 'lossy',
    supports_transparency: false,
    supports_animation: true,
    browser_support: 'limited',
    common_uses: ['iPhone photos', 'iOS screenshots', 'Apple ecosystem']
  },
  webp: {
    name: 'WebP',
    fullName: 'Web Picture format',
    description: "Google's modern web image format with superior compression",
    useCase: 'Web images with excellent compression',
    advantages: ['Smaller than JPG/PNG', 'Supports transparency', 'Good web support'],
    disadvantages: ['Limited in older browsers', 'Not universal', 'Editing software support varies'],
    typical_size: '30-70% smaller than JPG',
    quality: 'lossy',
    supports_transparency: true,
    supports_animation: true,
    browser_support: 'modern',
    common_uses: ['Web images', 'Website optimization', 'Modern apps']
  },
  avif: {
    name: 'AVIF',
    fullName: 'AV1 Image File Format',
    description: 'Next-generation image format with cutting-edge compression',
    useCase: 'Future-proof images with maximum compression',
    advantages: ['Superior compression', 'Supports HDR', 'Open standard'],
    disadvantages: ['Very limited support', 'New format', 'Complex encoding'],
    typical_size: '50% smaller than WebP',
    quality: 'lossy',
    supports_transparency: true,
    supports_animation: true,
    browser_support: 'limited',
    common_uses: ['Next-gen web', 'Experimental projects', 'Future applications']
  },
  png: {
    name: 'PNG',
    fullName: 'Portable Network Graphics',
    description: 'Lossless format perfect for graphics with transparency',
    useCase: 'Graphics, logos, and images requiring transparency',
    advantages: ['Lossless quality', 'Supports transparency', 'Universal support'],
    disadvantages: ['Large file sizes', 'No compression for photos', 'Not ideal for photos'],
    typical_size: '5-20MB for photos',
    quality: 'lossless',
    supports_transparency: true,
    supports_animation: false,
    browser_support: 'universal',
    common_uses: ['Screenshots', 'Logos', 'Graphics', 'Images with transparency']
  },
  dng: {
    name: 'DNG',
    fullName: 'Digital Negative',
    description: "Adobe's open standard RAW format for professional photography",
    useCase: 'Professional RAW photography with universal compatibility',
    advantages: ['Open standard', 'Future-proof', 'Metadata preservation', 'Maximum quality'],
    disadvantages: ['Very large files', 'Requires processing', 'Limited viewer support'],
    typical_size: '50-100MB per image',
    quality: 'lossless',
    supports_transparency: false,
    supports_animation: false,
    browser_support: 'limited',
    common_uses: ['Professional photography', 'RAW processing', 'Photo archival']
  },
  tiff: {
    name: 'TIFF',
    fullName: 'Tagged Image File Format',
    description: 'Professional lossless format for high-quality archival',
    useCase: 'Professional archival and print-ready images',
    advantages: ['Lossless quality', 'Professional standard', 'Metadata support'],
    disadvantages: ['Very large files', 'Slow to process', 'Overkill for web'],
    typical_size: '20-100MB for photos',
    quality: 'lossless',
    supports_transparency: true,
    supports_animation: false,
    browser_support: 'limited',
    common_uses: ['Print preparation', 'Professional archival', 'Scanning']
  },
  jpg: {
    name: 'JPG',
    fullName: 'Joint Photographic Experts Group',
    description: 'Universal photo format with excellent compatibility',
    useCase: 'Universal photo sharing and web use',
    advantages: ['Universal compatibility', 'Small file sizes', 'Good photo compression'],
    disadvantages: ['Lossy compression', 'No transparency', 'Quality degrades with editing'],
    typical_size: '2-8MB for photos',
    quality: 'lossy',
    supports_transparency: false,
    supports_animation: false,
    browser_support: 'universal',
    common_uses: ['Web images', 'Email attachments', 'Social media', 'General photography']
  },
  gif: {
    name: 'GIF',
    fullName: 'Graphics Interchange Format',
    description: 'Classic format supporting simple animations',
    useCase: 'Simple animations and graphics with limited colors',
    advantages: ['Animation support', 'Universal compatibility', 'Good for graphics'],
    disadvantages: ['Limited colors (256)', 'Large files for photos', 'Poor photo quality'],
    typical_size: 'Varies widely',
    quality: 'lossless',
    supports_transparency: true,
    supports_animation: true,
    browser_support: 'universal',
    common_uses: ['Animations', 'Simple graphics', 'Memes', 'Web graphics']
  }
};

export const conversions: ConversionInfo[] = [
  {
    from: 'heic',
    to: 'jpg',
    title: 'Convert HEIC to JPG on Mac (Offline, Fast, and Private)',
    description: 'Convert HEIC files from iPhone to JPG instantly on your Mac. 100% offline processing, no uploads required. Batch convert photos with one click.',
    why_convert: 'JPG is universally compatible with all devices, websites, and software. Converting HEIC to JPG ensures your photos can be viewed and shared anywhere without compatibility issues.',
    quality_impact: 'Minimal quality loss with high settings (90-100%). HEIC\'s efficiency means JPG conversion maintains excellent visual quality.',
    size_reduction: 'File sizes may increase 10-30% but gain universal compatibility',
    use_cases: [
      'Sharing iPhone photos with Windows users',
      'Uploading to websites that don\'t support HEIC',
      'Email attachments with size limits',
      'Social media posting',
      'Professional portfolios'
    ],
    faqs: [
      {
        question: "What is HEIC format?",
        answer: "HEIC (High Efficiency Image Container) is Apple's default photo format for iPhone and iPad. It offers better compression than JPG while maintaining quality, but isn't universally supported."
      },
      {
        question: "Why convert HEIC to JPG?",
        answer: "JPG is universally compatible with all devices, websites, and software. Converting HEIC to JPG ensures your photos can be viewed and shared anywhere without compatibility issues."
      },
      {
        question: "Will I lose quality converting HEIC to JPG?",
        answer: "Picmal uses advanced algorithms to maintain maximum quality during conversion. You can also adjust quality settings to balance between file size and image quality."
      },
      {
        question: "Can I batch convert HEIC files?",
        answer: "Absolutely! Drag and drop multiple HEIC files or entire folders into Picmal to convert them all to JPG at once. Perfect for converting your entire iPhone photo library."
      }
    ],
    special_features: ['iPhone photo optimization', 'Live Photo handling', 'Metadata preservation']
  },
  {
    from: 'webp',
    to: 'jpg',
    title: 'Convert WebP to JPG on Mac (Offline, Fast, and Private)',
    description: 'Convert WebP images to JPG instantly on your Mac. 100% offline processing, batch conversion, no quality loss. Perfect for web downloads and compatibility.',
    why_convert: 'JPG is universally compatible with all image viewers, editing software, and devices. Converting WebP to JPG ensures your images can be opened, edited, and shared anywhere.',
    quality_impact: 'Minimal quality loss with proper settings. WebP\'s efficiency translates well to JPG format.',
    size_reduction: 'File sizes may increase 20-40% but gain universal compatibility',
    use_cases: [
      'Downloaded web images for editing',
      'Sharing images from modern websites',
      'Preparing images for older software',
      'Email and messaging compatibility',
      'Cross-platform file sharing'
    ],
    faqs: [
      {
        question: "What is WebP format?",
        answer: "WebP is a modern image format developed by Google that provides superior compression for web images. While efficient, it's not universally supported by all software and devices."
      },
      {
        question: "Why convert WebP to JPG?",
        answer: "JPG is universally compatible with all image viewers, editing software, and devices. Converting WebP to JPG ensures your images can be opened, edited, and shared anywhere."
      },
      {
        question: "Can I batch convert WebP files?",
        answer: "Yes! Picmal lets you drag and drop multiple WebP files or entire folders to convert them all to JPG at once. Perfect for converting downloaded web images in bulk."
      },
      {
        question: "Is the conversion quality good?",
        answer: "Picmal maintains excellent quality during conversion. You can adjust quality settings to find the perfect balance between file size and image quality for your needs."
      }
    ]
  }
  // Add more conversions as needed
];

export function getConversion(from: string, to: string): ConversionInfo | undefined {
  return conversions.find(conv => conv.from === from && conv.to === to);
}

export function getAllConversions(): Array<{from: string, to: string}> {
  // Generate all possible conversions to JPG
  const fromFormats = ['heic', 'webp', 'avif', 'png', 'dng', 'tiff', 'gif'];
  const toFormats = ['jpg', 'png', 'webp', 'avif', 'gif', 'tiff'];

  const allConversions: Array<{from: string, to: string}> = [];

  for (const from of fromFormats) {
    for (const to of toFormats) {
      if (from !== to) {
        allConversions.push({ from, to });
      }
    }
  }

  return allConversions;
}

export function generateConversionData(from: string, to: string): ConversionInfo {
  const existing = getConversion(from, to);
  if (existing) return existing;

  const fromFormat = formats[from];
  const toFormat = formats[to];

  if (!fromFormat || !toFormat) {
    throw new Error(`Unknown format: ${from} or ${to}`);
  }

  // Generate dynamic content based on format characteristics
  const isToJpg = to === 'jpg';
  const isFromLossless = fromFormat.quality === 'lossless';
  const isToLossless = toFormat.quality === 'lossless';

  let sizeReduction = 'Varies based on content and quality settings';
  if (isFromLossless && !isToLossless) {
    sizeReduction = 'Significant size reduction (60-90% smaller)';
  } else if (!isFromLossless && isToLossless) {
    sizeReduction = 'File sizes will increase but quality is preserved';
  }

  return {
    from,
    to,
    title: `Convert ${fromFormat.name} to ${toFormat.name} on Mac (Offline, Fast, and Private)`,
    description: `Convert ${fromFormat.name} images to ${toFormat.name} instantly on your Mac. 100% offline processing, batch conversion, perfect for ${isToJpg ? 'universal compatibility' : toFormat.useCase}.`,
    why_convert: `${toFormat.name} ${isToJpg ? 'is universally compatible with all devices, websites, and software' : toFormat.description}. Converting ensures ${isToJpg ? 'maximum compatibility' : 'optimal format for your needs'}.`,
    quality_impact: isFromLossless && !isToLossless
      ? 'Some quality loss due to compression, but usually imperceptible with high quality settings'
      : 'Minimal to no quality loss during conversion',
    size_reduction: sizeReduction,
    use_cases: [
      isToJpg ? 'Universal compatibility' : `Optimized for ${toFormat.useCase}`,
      'Batch processing workflows',
      'Cross-platform sharing',
      'Web optimization',
      'Storage management'
    ],
    faqs: [
      {
        question: `What is ${fromFormat.name} format?`,
        answer: `${fromFormat.name} (${fromFormat.fullName}) is ${fromFormat.description}. ${fromFormat.advantages.join(', ')}.`
      },
      {
        question: `Why convert ${fromFormat.name} to ${toFormat.name}?`,
        answer: `${toFormat.name} ${isToJpg ? 'offers universal compatibility across all platforms and devices' : toFormat.description}. Converting ensures ${isToJpg ? 'your images work everywhere' : 'optimal format for your specific needs'}.`
      },
      {
        question: `Will I lose quality converting ${fromFormat.name} to ${toFormat.name}?`,
        answer: isFromLossless && !isToLossless
          ? `Some quality loss is inevitable when converting from lossless ${fromFormat.name} to compressed ${toFormat.name}, but with high quality settings (90-100%), the difference is usually imperceptible.`
          : `Picmal maintains excellent quality during conversion with optimized algorithms for ${fromFormat.name} to ${toFormat.name} conversion.`
      },
      {
        question: `Can I batch convert ${fromFormat.name} files?`,
        answer: `Yes! Picmal excels at batch processing. Drag and drop multiple ${fromFormat.name} files or entire folders to convert them all to ${toFormat.name} simultaneously.`
      }
    ]
  };
}

/**
 * Get related conversions based on format properties
 * Returns conversions that are contextually relevant to the current conversion
 */
export function getRelatedConversions(from: string, to: string, limit: number = 6): Array<{from: string, to: string, label: string}> {
  const fromFormat = formats[from];
  const toFormat = formats[to];
  const related: Array<{from: string, to: string, label: string, priority: number}> = [];

  // Helper to add related conversion with priority
  const addRelated = (fromKey: string, toKey: string, label: string, priority: number) => {
    if ((fromKey !== from || toKey !== to) && formats[fromKey] && formats[toKey]) {
      related.push({ from: fromKey, to: toKey, label, priority });
    }
  };

  // 1. Same source format, different targets (e.g., HEIC to JPG → HEIC to PNG)
  Object.keys(formats).forEach(targetKey => {
    if (targetKey !== to && targetKey !== from) {
      const targetFormat = formats[targetKey];
      // Prioritize popular formats
      const isPriority = ['jpg', 'png', 'webp'].includes(targetKey);
      addRelated(from, targetKey, `${fromFormat.name} to ${targetFormat.name}`, isPriority ? 10 : 5);
    }
  });

  // 2. Similar source formats to same target (e.g., HEIC to JPG → HEIF to JPG)
  Object.keys(formats).forEach(sourceKey => {
    if (sourceKey !== from && sourceKey !== to) {
      const sourceFormat = formats[sourceKey];
      // Same quality type or similar use case
      if (sourceFormat.quality === fromFormat.quality ||
          sourceFormat.browser_support === fromFormat.browser_support) {
        addRelated(sourceKey, to, `${sourceFormat.name} to ${toFormat.name}`, 8);
      }
    }
  });

  // 3. Reverse conversion (e.g., HEIC to JPG → JPG to HEIC)
  if (formats[to] && formats[from]) {
    addRelated(to, from, `${toFormat.name} to ${fromFormat.name}`, 12);
  }

  // 4. Popular alternative targets (e.g., if converting to JPG, also suggest PNG/WebP)
  if (to === 'jpg') {
    addRelated(from, 'png', `${fromFormat.name} to PNG`, 9);
    addRelated(from, 'webp', `${fromFormat.name} to WebP`, 7);
  } else if (to === 'png') {
    addRelated(from, 'jpg', `${fromFormat.name} to JPG`, 9);
    addRelated(from, 'webp', `${fromFormat.name} to WebP`, 7);
  } else if (to === 'webp') {
    addRelated(from, 'jpg', `${fromFormat.name} to JPG`, 9);
    addRelated(from, 'png', `${fromFormat.name} to PNG`, 7);
  }

  // Sort by priority and return top results
  return related
    .sort((a, b) => b.priority - a.priority)
    .slice(0, limit)
    .map(({ from, to, label }) => ({ from, to, label }));
}