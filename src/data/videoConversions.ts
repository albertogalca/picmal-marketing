export interface VideoFormatInfo {
  name: string;
  extension: string;
  fullName: string;
  description: string;
  /**
   * A common name people search instead of the extension, shown in the title
   * and H1. Only set where the alias is what real queries use: "mp4 to
   * quicktime" pulls impressions at position 70 because the word appeared
   * nowhere but the body copy. Most formats don't need this — nobody searches
   * "mp4 to matroska video".
   */
  searchAlias?: string;
}

export interface VideoConversionPair {
  from: string;
  to: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  whyConvert: string;
  benefits: string[];
  faqs: { question: string; answer: string }[];
}

export const videoFormats: Record<string, VideoFormatInfo> = {
  mp4: {
    name: "MP4",
    extension: "mp4",
    fullName: "MPEG-4 Part 14",
    description:
      "The most universally compatible video container, playing on virtually every device, browser, editor, and platform. Typically holds H.264 or H.265 video.",
  },
  mov: {
    name: "MOV",
    extension: "mov",
    fullName: "QuickTime Movie",
    searchAlias: "QuickTime",
    description:
      "Apple's QuickTime container, the native format for footage from iPhones, Macs, and Final Cut Pro. High quality but less portable outside the Apple ecosystem.",
  },
  mkv: {
    name: "MKV",
    extension: "mkv",
    fullName: "Matroska Video",
    description:
      "A flexible open container that can hold multiple video, audio, and subtitle tracks. Popular for high-quality video but unsupported by many players and editors.",
  },
  avi: {
    name: "AVI",
    extension: "avi",
    fullName: "Audio Video Interleave",
    description:
      "Microsoft's legacy video container. Widely recognized but inefficient by modern standards, producing large files with limited codec flexibility.",
  },
  webm: {
    name: "WebM",
    extension: "webm",
    fullName: "WebM",
    description:
      "Google's open, royalty-free format built for the web, using VP9 or AV1. Small and efficient for browsers but poorly supported by desktop editors and devices.",
  },
  wmv: {
    name: "WMV",
    extension: "wmv",
    fullName: "Windows Media Video",
    description:
      "Microsoft's legacy streaming format. Plays well on Windows but is awkward on Mac, mobile, and modern web.",
  },
  flv: {
    name: "FLV",
    extension: "flv",
    fullName: "Flash Video",
    description:
      "The container behind old Adobe Flash video. Effectively obsolete since Flash was discontinued, so converting is the only way to keep these files usable.",
  },
  m4v: {
    name: "M4V",
    extension: "m4v",
    fullName: "iTunes Video",
    description:
      "Apple's MP4 variant used by iTunes and the Apple TV app. Nearly identical to MP4 but can carry DRM and isn't always recognized by other players.",
  },
  ts: {
    name: "TS",
    extension: "ts",
    fullName: "MPEG Transport Stream",
    description:
      "A broadcast and streaming container used for live TV recordings and HLS streams. Robust for transmission but clumsy for editing and everyday playback.",
  },
  m2ts: {
    name: "M2TS",
    extension: "m2ts",
    fullName: "Blu-ray BDAV MPEG-2 Transport Stream",
    description:
      "The AVCHD format used by camcorders and Blu-ray discs. High quality but rarely supported by editors and players without conversion.",
  },
  "3gp": {
    name: "3GP",
    extension: "3gp",
    fullName: "3GPP Multimedia",
    description:
      "A compact format created for older mobile phones. Small files at low quality — usually converted to play on modern devices.",
  },
  vob: {
    name: "VOB",
    extension: "vob",
    fullName: "DVD Video Object",
    description:
      "The container used on DVD-Video discs. Converting VOB files lets you play ripped DVD footage on modern devices and editors.",
  },
  mpg: {
    name: "MPG",
    extension: "mpg",
    fullName: "MPEG-1/2 Video",
    description:
      "A legacy MPEG container from the DVD and early-digital era. Widely readable but inefficient compared with modern H.264/H.265 MP4.",
  },
  hevc: {
    name: "HEVC",
    extension: "hevc",
    fullName: "High Efficiency Video Coding (H.265)",
    description:
      "Highly efficient H.265 video — about 50% smaller than H.264 at the same quality — but not playable everywhere. Re-wrapping to MP4/H.264 maximizes compatibility.",
  },
  "3g2": {
    name: "3G2",
    extension: "3g2",
    fullName: "3GPP2 Multimedia",
    description:
      "The CDMA-era mobile video container (a sibling of 3GP) used by older phones. Re-wrapping to MP4 makes it play on any modern device.",
  },
  rm: {
    name: "RM",
    extension: "rm",
    fullName: "RealMedia",
    description:
      "RealNetworks' legacy streaming format from the early internet. Almost nothing plays RM today, so converting to MP4 is usually the only way to watch these old files.",
  },
  rmvb: {
    name: "RMVB",
    extension: "rmvb",
    fullName: "RealMedia Variable Bitrate",
    description:
      "A variable-bitrate RealMedia variant once popular for downloaded movies and anime. Modern players can't open it — convert to MP4 to play it anywhere.",
  },
  bik: {
    name: "BIK",
    extension: "bik",
    fullName: "Bink Video",
    description:
      "A game-engine video format used for cutscenes and intros. Extracting it to MP4 lets you play or edit the footage outside the game.",
  },
  gif: {
    name: "GIF",
    extension: "gif",
    fullName: "Graphics Interchange Format",
    description:
      "The universal animated-image format. Plays inline everywhere — chat, email, forums, docs — making it the go-to for short, silent, looping clips.",
  },
  mp3: {
    name: "MP3",
    extension: "mp3",
    fullName: "MPEG-1 Audio Layer III",
    description:
      "The universal audio format. Extracting an MP3 from a video gives you a small, shareable audio-only file that plays on any device or app.",
  },
};

const PAIRS: [string, string][] = [
  ["mov", "mp4"],
  ["mkv", "mp4"],
  ["avi", "mp4"],
  ["webm", "mp4"],
  ["wmv", "mp4"],
  ["flv", "mp4"],
  ["m4v", "mp4"],
  ["ts", "mp4"],
  ["m2ts", "mp4"],
  ["3gp", "mp4"],
  ["vob", "mp4"],
  ["mpg", "mp4"],
  ["hevc", "mp4"],
  ["mp4", "mov"],
  ["mp4", "webm"],
  ["mp4", "3g2"],
  ["rm", "mp4"],
  ["rmvb", "mp4"],
  ["bik", "mp4"],
  ["mp4", "gif"],
  ["mov", "gif"],
  ["mp4", "mp3"],
];

function buildWhyConvert(from: VideoFormatInfo, to: VideoFormatInfo): string {
  if (to.extension === "gif") {
    return `Need a clip that plays inline everywhere — Slack, Discord, email, docs — with no player and no sound? Converting your ${from.name} video to GIF turns a moment into a looping animation that just works anywhere. Picmal does it locally on your Mac, with control over frame rate and size so the file stays light.`;
  }
  if (to.extension === "mp3") {
    return `Sometimes you only need the audio — a podcast, an interview, a lecture, the music from a clip. Converting ${from.name} to MP3 extracts the sound into a small, universally compatible file you can play anywhere or drop into any app. Picmal pulls the audio out on your Mac, with bitrate control and batch processing.`;
  }
  if (to.extension === "mp4") {
    return `${from.name} files don't play everywhere — ${from.description.split(".")[1]?.trim().toLowerCase() || "compatibility is limited"}. Converting ${from.name} to MP4 (H.264) gives you a video that plays on every device, browser, editor, and platform. Picmal re-encodes locally on your Mac with quality control (CRF) and batch processing — no upload limits, no watermark, no subscription.`;
  }
  return `Convert ${from.name} to ${to.name} on your Mac for the right balance of compatibility, quality, and file size. Picmal re-encodes locally with full control over codec and quality — fast, offline, and private.`;
}

function buildBenefits(from: VideoFormatInfo, to: VideoFormatInfo): string[] {
  const common = [
    "Runs entirely on your Mac — no uploads, no watermark, no file-size limit",
    `Batch convert many ${from.name} files at once`,
    "One-time $29 — no monthly subscription",
  ];
  if (to.extension === "gif") {
    return [
      `Turn ${from.name} clips into looping GIFs that play inline anywhere`,
      "Control frame rate and dimensions to keep the file small",
      ...common,
    ];
  }
  if (to.extension === "mp3") {
    return [
      `Extract clean MP3 audio from ${from.name} video`,
      "Choose bitrate (VBR/ABR/CBR) to balance quality and size",
      ...common,
    ];
  }
  if (to.extension === "mp4") {
    return [
      `Make ${from.name} footage play on every device, browser, and editor`,
      "Re-encode with H.264 or H.265, with CRF quality control",
      "Shrink file size with codec and frame-rate options, or keep it visually lossless",
      ...common,
    ];
  }
  return [
    `Convert ${from.name} to ${to.name} with full codec and quality control`,
    ...common,
  ];
}

function buildFaqs(
  from: VideoFormatInfo,
  to: VideoFormatInfo,
): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [
    {
      question: `How do I convert ${from.name} to ${to.name} on Mac?`,
      answer: `Open Picmal, drag your ${from.name} files into the window, choose ${to.name} as the output${to.extension === "mp4" ? " and set your codec and quality" : ""}, and click Convert. Everything is processed locally on your Mac.`,
    },
    {
      question: `Can I batch convert multiple ${from.name} files at once?`,
      answer: `Yes. Drag in as many ${from.name} files (or a whole folder) as you like and Picmal converts them all to ${to.name} in one pass, each with its own progress.`,
    },
  ];

  if (to.extension === "mp4") {
    faqs.push(
      {
        question: `Does converting ${from.name} to MP4 reduce quality?`,
        answer:
          "Only as much as you choose. Picmal exposes a CRF quality slider — at CRF 18–20 the result is visually lossless. You can also trade quality for a smaller file when you need it.",
      },
      {
        question: "Will the MP4 play on my iPhone, Windows PC, and the web?",
        answer:
          "Yes. Picmal defaults to H.264 inside an MP4 container — the most universally compatible combination, playable on virtually every device, browser, and editor.",
      },
    );
  } else if (to.extension === "gif") {
    faqs.push(
      {
        question: `Will the ${from.name} audio be kept in the GIF?`,
        answer:
          "No — GIF is a silent image format, so the soundtrack is dropped. For a clip that keeps audio, convert to MP4 instead.",
      },
      {
        question: "How do I keep the GIF file size down?",
        answer:
          "Lower the frame rate and dimensions in Picmal before converting. Short clips at 10–15 fps and a modest width make for small, shareable GIFs.",
      },
    );
  } else if (to.extension === "mp3") {
    faqs.push(
      {
        question: `Does Picmal keep the video when converting ${from.name} to MP3?`,
        answer:
          "No — MP3 is audio-only, so the video track is discarded and you get just the sound. Your original file stays untouched.",
      },
      {
        question: "Can I control the MP3 quality?",
        answer:
          "Yes. Pick a bitrate and VBR/ABR/CBR mode to balance audio quality against file size, or force mono to roughly halve the size of voice recordings.",
      },
    );
  } else {
    faqs.push({
      question: `Why convert ${from.name} to ${to.name}?`,
      answer: `${to.description}`,
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
  from: VideoFormatInfo,
  to: VideoFormatInfo,
): string {
  if (to.extension === "gif") {
    return `Convert ${from.name} to GIF on Mac — turn video clips into looping animations with frame-rate and size control. Batch, offline, no watermark. One-time $29.`;
  }
  if (to.extension === "mp3") {
    return `Convert ${from.name} to MP3 on Mac — extract audio from video with bitrate control. Batch process offline, no upload limits. One-time $29, no subscription.`;
  }
  return `Convert ${from.name} to ${to.name} on Mac — H.264/H.265 with quality control, batch processing, fully offline. No watermark, no file-size limit. One-time $29.`;
}

/** "MOV" or "MOV (QuickTime)" — see VideoFormatInfo.searchAlias. */
export function labelFor(format: VideoFormatInfo): string {
  return format.searchAlias
    ? `${format.name} (${format.searchAlias})`
    : format.name;
}

function buildMetaTitle(from: VideoFormatInfo, to: VideoFormatInfo): string {
  return `Picmal: Convert ${labelFor(from)} to ${labelFor(to)} on Mac, fast and offline`;
}

export const videoConversions: VideoConversionPair[] = PAIRS.map(
  ([fromKey, toKey]) => {
    const from = videoFormats[fromKey];
    const to = videoFormats[toKey];
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

export const INDEXED_VIDEO_CONVERSIONS = new Set<string>([
  "mov-to-mp4",
  "mkv-to-mp4",
  "avi-to-mp4",
  "webm-to-mp4",
  "wmv-to-mp4",
  "flv-to-mp4",
  "m4v-to-mp4",
  "hevc-to-mp4",
  "mp4-to-mov",
  "mp4-to-webm",
  "mp4-to-gif",
  "mov-to-gif",
  "mp4-to-mp3",
  "bik-to-mp4",
  "m2ts-to-mp4",
  "vob-to-mp4",
  "rm-to-mp4",
  "mp4-to-3g2", // 1 click, 63 impr, pos 6.7
  "mpg-to-mp4", // 1 click, 50 impr, pos 13.9
  "3gp-to-mp4", // 30 impr, pos 18.0
  "rmvb-to-mp4", // 17 impr, pos 26.3
  "ts-to-mp4", // 7 impr, pos 16.9
]);

export function isVideoConversionIndexed(slug: string): boolean {
  return INDEXED_VIDEO_CONVERSIONS.has(slug);
}

export function getRelatedVideoConversions(
  slug: string,
  limit = 6,
): VideoConversionPair[] {
  return videoConversions
    .filter((c) => c.slug !== slug && isVideoConversionIndexed(c.slug))
    .slice(0, limit);
}
