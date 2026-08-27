export interface AudioFormatInfo {
  name: string;
  extension: string;
  fullName: string;
  description: string;
  note?: string;
  lossless?: boolean;
}

export interface AudioConversionPair {
  from: string;
  to: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  whyConvert: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const audioFormats: Record<string, AudioFormatInfo> = {
  mp3: {
    name: "MP3",
    extension: "mp3",
    fullName: "MPEG-1 Audio Layer III",
    description:
      "The universal audio format — plays on virtually every device, app, and player ever made.",
    lossless: false,
  },
  m4a: {
    name: "M4A",
    extension: "m4a",
    fullName: "MPEG-4 Audio",
    description:
      "Apple's audio container (usually AAC), used by iTunes, Apple Music, and iPhone voice memos.",
    note: "iPhone voice memos and Apple Music downloads come as M4A, which some non-Apple apps and players won't open",
    lossless: false,
  },
  wav: {
    name: "WAV",
    extension: "wav",
    fullName: "Waveform Audio",
    description:
      "Uncompressed, lossless PCM audio — pristine quality but very large files. The studio and editing standard.",
    lossless: true,
  },
  flac: {
    name: "FLAC",
    extension: "flac",
    fullName: "Free Lossless Audio Codec",
    description:
      "Lossless compression — bit-for-bit identical to the source at roughly half the size of WAV. The audiophile archival format.",
    note: "FLAC is lossless and loved by audiophiles, but Apple devices and Apple Music don't support it natively",
    lossless: true,
  },
  aac: {
    name: "AAC",
    extension: "aac",
    fullName: "Advanced Audio Coding",
    description:
      "The successor to MP3 — better quality at the same bitrate, used by YouTube, streaming services, and Apple.",
    lossless: false,
  },
  ogg: {
    name: "OGG",
    extension: "ogg",
    fullName: "Ogg Vorbis",
    description:
      "An open, royalty-free lossy format used by games and some streaming services, but poorly supported on Apple devices.",
    lossless: false,
  },
  wma: {
    name: "WMA",
    extension: "wma",
    fullName: "Windows Media Audio",
    description:
      "Microsoft's legacy audio format — common on old Windows systems, awkward on Mac, iPhone, and modern apps.",
    note: "WMA is a Windows-era format that Macs and iPhones can't play without conversion",
    lossless: false,
  },
  aiff: {
    name: "AIFF",
    extension: "aiff",
    fullName: "Audio Interchange File Format",
    description:
      "Apple's uncompressed lossless format — like WAV, pristine but large, common in Mac audio workflows.",
    lossless: true,
  },
  opus: {
    name: "Opus",
    extension: "opus",
    fullName: "Opus Audio",
    description:
      "A modern, highly efficient codec used for WhatsApp and Telegram voice notes and low-bitrate speech.",
    note: "WhatsApp and Telegram voice notes arrive as Opus files, which most desktop players can't open",
    lossless: false,
  },
  alac: {
    name: "ALAC",
    extension: "m4a",
    fullName: "Apple Lossless Audio Codec",
    description:
      "Apple's lossless format inside an .m4a file — the format Apple Music expects for lossless libraries.",
    lossless: true,
  },
  m4r: {
    name: "M4R",
    extension: "m4r",
    fullName: "iPhone Ringtone",
    description:
      "Apple's ringtone format — an AAC audio file that iOS recognizes as a custom ringtone.",
    lossless: false,
  },
  eac3: {
    name: "EAC3",
    extension: "eac3",
    fullName: "Enhanced AC-3 (Dolby Digital Plus)",
    description:
      "Dolby Digital Plus surround audio used by streaming and Blu-ray — great quality, but many players and editors can't open it directly.",
    note: "EAC3 (Dolby Digital Plus) tracks pulled from streams or discs won't play in most everyday audio apps",
    lossless: false,
  },
  mka: {
    name: "MKA",
    extension: "mka",
    fullName: "Matroska Audio",
    description:
      "The audio-only Matroska container — flexible and open, but unsupported by most mainstream players and phones.",
    note: "MKA files are an open Matroska container that iPhones and most music apps won't recognize",
    lossless: false,
  },
  ape: {
    name: "APE",
    extension: "ape",
    fullName: "Monkey's Audio",
    description:
      "A lossless format with very high compression, popular for archiving CDs — but supported by almost nothing outside niche players.",
    note: "Monkey's Audio (APE) is lossless but barely supported, so libraries usually need converting to FLAC or ALAC",
    lossless: true,
  },
};

const PAIRS: [string, string][] = [
  ["m4a", "mp3"],
  ["wav", "mp3"],
  ["flac", "mp3"],
  ["aac", "mp3"],
  ["ogg", "mp3"],
  ["wma", "mp3"],
  ["aiff", "mp3"],
  ["opus", "mp3"],
  ["mp3", "wav"],
  ["m4a", "wav"],
  ["flac", "wav"],
  ["wav", "flac"],
  ["flac", "alac"],
  ["wav", "alac"],
  ["m4a", "flac"],
  ["mp3", "m4r"],
  ["eac3", "aac"],
  ["eac3", "mp3"],
  ["mka", "mp3"],
  ["ape", "mp3"],
  ["ape", "flac"],
];

function buildWhyConvert(from: AudioFormatInfo, to: AudioFormatInfo): string {
  const src = from.note ? `${from.note}. ` : "";
  if (to.extension === "mp3") {
    return `${src}Converting ${from.name} to MP3 gives you a small, universally compatible audio file that plays on any device, app, or player. Picmal re-encodes locally on your Mac with bitrate control (VBR/ABR/CBR) and batch processing — no upload limits, no subscription.`;
  }
  if (to.name === "WAV") {
    return `Editing in a DAW or an app that needs raw, uncompressed audio? Converting ${from.name} to WAV gives you lossless PCM that imports cleanly into any audio editor. Picmal converts locally with sample-rate and bit-depth control.`;
  }
  if (to.name === "FLAC") {
    return `${src}Converting ${from.name} to FLAC gives you bit-perfect, lossless audio at roughly half the size of WAV — ideal for archiving and audiophile libraries. Picmal converts locally on your Mac with batch processing.`;
  }
  if (to.name === "ALAC") {
    return `${src}Want lossless audio that drops straight into Apple Music? Converting ${from.name} to ALAC produces a bit-perfect .m4a — the lossless format the Music app expects. Picmal converts locally on your Mac, preserving every sample.`;
  }
  if (to.name === "M4R") {
    return `Turn any track into a custom iPhone ringtone. Converting ${from.name} to M4R creates the ringtone file iOS recognizes — sync it to your iPhone and set it under Settings → Sounds. Picmal makes it locally on your Mac.`;
  }
  return `Convert ${from.name} to ${to.name} on your Mac with full control over codec and quality — fast, offline, and private.`;
}

function buildBenefits(from: AudioFormatInfo, to: AudioFormatInfo): string[] {
  const common = [
    "Runs entirely on your Mac — offline, no upload limits, no subscription",
    `Batch convert many ${from.name} files at once`,
  ];
  if (to.extension === "mp3") {
    return [
      `Make ${from.name} audio play on every device, app, and player`,
      "Choose bitrate and VBR/ABR/CBR mode to balance quality and size",
      "Force mono to roughly halve the size of voice recordings",
      ...common,
    ];
  }
  if (to.name === "WAV") {
    return [
      `Get uncompressed, editable ${to.name} audio from your ${from.name} files`,
      "Pick sample rate (up to 96 kHz) and bit depth (16/24/32-bit)",
      "Lossless PCM that imports into any DAW or editor",
      ...common,
    ];
  }
  if (to.name === "FLAC") {
    return [
      `Lossless ${to.name} at roughly half the size of WAV`,
      "Bit-perfect — identical to the source, ideal for archiving",
      "CD-quality preset: 16-bit / 44.1 kHz in one click",
      ...common,
    ];
  }
  if (to.name === "ALAC") {
    return [
      "Lossless .m4a that imports straight into Apple Music",
      "Bit-for-bit identical to the source — no quality loss",
      "The format Apple expects for lossless libraries",
      ...common,
    ];
  }
  if (to.name === "M4R") {
    return [
      "Create a custom iPhone ringtone from any audio",
      "Output is the .m4r format iOS recognizes",
      ...common,
    ];
  }
  return [
    `Convert ${from.name} to ${to.name} with full codec and quality control`,
    ...common,
  ];
}

function buildFaqs(
  from: AudioFormatInfo,
  to: AudioFormatInfo,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [
    {
      question: `How do I convert ${from.name} to ${to.name} on Mac?`,
      answer: `Open Picmal, drag your ${from.name} files into the window, choose ${to.name} as the output format, set your quality, and click Convert. Everything runs locally on your Mac.`,
    },
    {
      question: `Can I batch convert multiple ${from.name} files at once?`,
      answer: `Yes. Drag in as many ${from.name} files (or a whole folder) as you like and Picmal converts them all to ${to.name} in one pass.`,
    },
  ];

  if (to.extension === "mp3" || to.name === "M4R") {
    faqs.push({
      question: `Does converting ${from.name} to ${to.name} lose quality?`,
      answer: from.lossless
        ? `Going from lossless ${from.name} to ${to.name} is a lossy step, so some data is discarded. At 256–320 kbps the difference is inaudible to most listeners — pick a high bitrate in Picmal to keep it near-transparent.`
        : `${to.name} is lossy, and re-encoding from another lossy format can lose a little quality. Choosing a high bitrate (256–320 kbps) keeps it transparent for everyday listening.`,
    });
  } else if (to.lossless) {
    faqs.push({
      question: from.lossless
        ? `Is converting ${from.name} to ${to.name} truly lossless?`
        : `Will converting ${from.name} to ${to.name} improve the quality?`,
      answer: from.lossless
        ? `Yes. Both ${from.name} and ${to.name} are lossless, so the conversion is bit-perfect — no quality is lost.`
        : `No. ${to.name} is lossless, but it can't recover detail that lossy ${from.name} already discarded. You get a pristine, editable file — not better-than-source audio.`,
    });
  }

  if (to.name === "ALAC") {
    faqs.push({
      question: "Will the ALAC file work in Apple Music?",
      answer:
        "Yes. ALAC is Apple's lossless codec in an .m4a file — exactly what the Music app expects. Import it and it slots into your lossless library.",
    });
  }
  if (to.name === "M4R") {
    faqs.push({
      question: "How do I set the M4R file as my iPhone ringtone?",
      answer:
        "Connect your iPhone, drag the .m4r file onto it in Finder (or iTunes on older macOS), then choose it under Settings → Sounds & Haptics → Ringtone. Ringtones are limited to 40 seconds, so trim long tracks first.",
    });
  }

  faqs.push({
    question: `Is converting ${from.name} to ${to.name} free?`,
    answer:
      "Picmal is a one-time purchase of $29 — no subscription, no per-file limits, no watermark. Download to explore the interface; 14-day money-back guarantee.",
  });

  return faqs;
}

function buildMetaDescription(
  from: AudioFormatInfo,
  to: AudioFormatInfo,
): string {
  if (to.name === "ALAC") {
    return `Convert ${from.name} to ALAC on Mac — lossless .m4a for Apple Music. Bit-perfect, batch, fully offline. One-time $29, no subscription.`;
  }
  if (to.name === "M4R") {
    return `Convert ${from.name} to M4R on Mac — make a custom iPhone ringtone. Fast, offline, batch. One-time $29, no subscription.`;
  }
  return `Convert ${from.name} to ${to.name} on Mac — bitrate and quality control, batch processing, fully offline. No upload limits. One-time $29, no subscription.`;
}

function buildMetaTitle(from: AudioFormatInfo, to: AudioFormatInfo): string {
  return `Picmal: Convert ${from.name} to ${to.name} on Mac, fast and offline`;
}

export const audioConversions: AudioConversionPair[] = PAIRS.map(
  ([fromKey, toKey]) => {
    const from = audioFormats[fromKey];
    const to = audioFormats[toKey];
    return {
      from: fromKey,
      to: toKey,
      slug: `${fromKey}-to-${toKey}`,
      metaTitle: buildMetaTitle(from, to),
      metaDescription: buildMetaDescription(from, to),
      whyConvert: buildWhyConvert(from, to),
      benefits: buildBenefits(from, to),
      faqs: buildFaqs(from, to),
    };
  },
);

export const INDEXED_AUDIO_CONVERSIONS = new Set<string>([
  "m4a-to-mp3",
  "wav-to-mp3",
  "flac-to-mp3",
  "aac-to-mp3",
  "ogg-to-mp3",
  "wma-to-mp3",
  "opus-to-mp3",
  "mp3-to-wav",
  "m4a-to-wav",
  "wav-to-flac",
  "mp3-to-m4r",
  "mka-to-mp3",
  "eac3-to-mp3",
  "eac3-to-aac",
  "flac-to-alac",
  "ape-to-mp3",
  "ape-to-flac",
  "m4a-to-flac",
  "wav-to-alac",
  "flac-to-wav",
  "aiff-to-mp3",
]);

export function isAudioConversionIndexed(slug: string): boolean {
  return INDEXED_AUDIO_CONVERSIONS.has(slug);
}

export function getRelatedAudioConversions(
  slug: string,
  limit = 6,
): AudioConversionPair[] {
  return audioConversions
    .filter((c) => c.slug !== slug && isAudioConversionIndexed(c.slug))
    .slice(0, limit);
}
