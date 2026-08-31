// Which formats open where, for /tools/file-format-checker.
//
// The question this answers is the one Mac users actually ask: "I'm sending
// this to someone on Windows, will it just open?" So the columns are macOS,
// Windows and browsers, and nothing else. Phones are deliberately left out
// rather than guessed at.
//
// RULES FOR EDITING THIS FILE
//
// 1. Every non-obvious claim carries a `source`. "JPG opens everywhere" needs
//    no citation; "HEIC needs a $0.99 extension on Windows" does. If you cannot
//    source it, leave the format out. A confidently wrong table on a site that
//    gets quoted by AI is worse than a shorter one.
// 2. Version archaeology is out of scope. macOS means current macOS (15+),
//    which is Picmal's floor anyway. Windows means Windows 11 with its stock
//    Media Player and Photos. Browsers means current Chrome, Safari, Firefox
//    and Edge, per caniuse.
// 3. "yes" means it opens with what is already on the machine. "extension"
//    means it works but somebody has to install something first. "no" means it
//    does not open without third-party software.
// 4. `convertTo` is only for formats that actually fail somewhere. BMP, WAV and
//    AIFF are big, but they open everywhere, and putting size advice in the
//    same column as compatibility advice makes the column mean two things.

export type SupportLevel = "yes" | "extension" | "no";

export interface PlatformSupport {
  level: SupportLevel;
  /** Shown under the verdict. Short. Say the caveat out loud. */
  note?: string;
}

export interface FormatSupport {
  /** Lowercase, no dot. Matches what comes off a filename. */
  ext: string;
  /** Display name. */
  name: string;
  kind: "image" | "audio" | "video";
  /** One line: what this thing is. */
  what: string;
  macos: PlatformSupport;
  windows: PlatformSupport;
  browsers: PlatformSupport;
  /** What to turn it into when the answer is bad. Omit when nothing is wrong. */
  convertTo?: string;
  /** Why that target. */
  why?: string;
  /** Citation for whichever claim above is not common knowledge. */
  source?: string;
}

/**
 * Verdict chip text and colour, shared by the table and the client script.
 * Colours come from the status tokens in global.css, which carry the measured
 * contrast and the light/dark pair; nothing here hard-codes a palette value.
 */
export const SUPPORT_LABELS: Record<
  SupportLevel,
  { text: string; class: string }
> = {
  yes: { text: "Opens", class: "bg-success-surface text-success" },
  extension: {
    text: "Needs a plugin",
    class: "bg-warning-surface text-warning",
  },
  no: { text: "Won't open", class: "bg-danger-surface text-danger" },
};

const OK: PlatformSupport = { level: "yes" };

export const formatSupport: FormatSupport[] = [
  // ---------------------------------------------------------------- images
  {
    ext: "jpg",
    name: "JPG",
    kind: "image",
    what: "The universal photo format. Nothing does not open a JPG.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "png",
    name: "PNG",
    kind: "image",
    what: "Lossless, with transparency. The safe choice for graphics and screenshots.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "gif",
    name: "GIF",
    kind: "image",
    what: "Ancient, limited to 256 colours, still everywhere because of animation.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "bmp",
    name: "BMP",
    kind: "image",
    what: "Uncompressed Windows bitmap. Opens fine, just enormous.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "tiff",
    name: "TIFF",
    kind: "image",
    what: "The print and scanning format. High quality, very large files.",
    macos: OK,
    windows: OK,
    browsers: {
      level: "no",
      note: "Safari shows TIFF. Chrome, Firefox and Edge do not.",
    },
    convertTo: "JPG",
    why: "If it needs to go on a website or into a browser, TIFF will not display.",
  },
  {
    ext: "webp",
    name: "WebP",
    kind: "image",
    what: "Google's web format. Smaller than JPG at the same quality.",
    macos: OK,
    windows: {
      level: "yes",
      note: "Photos has handled WebP since 2023. Older Windows 10 machines may want the WebP Image Extension for File Explorer thumbnails.",
    },
    browsers: { level: "yes", note: "Safari joined at 16, everything else long before." },
    source: "https://caniuse.com/webp",
  },
  {
    ext: "avif",
    name: "AVIF",
    kind: "image",
    what: "The newest mainstream web format. Roughly half the size of JPG.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the AV1 Video Extension from the Microsoft Store before Photos will open it.",
    },
    browsers: {
      level: "yes",
      note: "Chrome 85, Firefox 93, Safari 16.4, Edge 121. About 95% of people.",
    },
    convertTo: "JPG",
    why: "Only if you are sending it to a Windows machine that has not installed the extension.",
    source: "https://caniuse.com/avif",
  },
  {
    ext: "heic",
    name: "HEIC",
    kind: "image",
    what: "What your iPhone shoots by default. Half the size of JPG, and the single most common reason a photo will not open for somebody.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Two installs, not one: HEIF Image Extensions (free) AND HEVC Video Extensions ($0.99). The free HEIF one alone will not show the photo. Some prebuilt PCs have a free OEM version of the HEVC one.",
    },
    browsers: {
      level: "no",
      note: "Safari only. Chrome, Firefox and Edge will not render a HEIC.",
    },
    convertTo: "JPG",
    why: "This is the format to convert before sending anything to anyone. Assume it will not open.",
    source:
      "https://www.thewindowsclub.com/view-heic-hevc-files-windows-photos-app",
  },
  {
    ext: "heif",
    name: "HEIF",
    kind: "image",
    what: "The container HEIC sits in. Same story, same problems.",
    macos: OK,
    windows: {
      level: "extension",
      note: "HEIF Image Extensions plus HEVC Video Extensions, same as HEIC.",
    },
    browsers: { level: "no", note: "Safari only." },
    convertTo: "JPG",
    why: "Same reason as HEIC. Convert before sending.",
    source:
      "https://www.thewindowsclub.com/view-heic-hevc-files-windows-photos-app",
  },
  {
    ext: "jxl",
    name: "JPEG XL",
    kind: "image",
    what: "Technically excellent, politically stuck. Better compression than everything, supported by almost nothing.",
    macos: OK,
    windows: { level: "no", note: "No stock support and no Store extension." },
    browsers: {
      level: "no",
      note: "Safari 17 has partial support. Chrome and Firefox keep it switched off. Around 15% of people can see it.",
    },
    convertTo: "JPG",
    why: "Wonderful format, nobody can open it. Do not send one to anybody yet.",
    source: "https://caniuse.com/jpegxl",
  },
  {
    ext: "svg",
    name: "SVG",
    kind: "image",
    what: "Vector graphics. Scales to any size without going fuzzy.",
    macos: OK,
    windows: {
      level: "yes",
      note: "Opens in Edge and any browser. The Photos app is not the app for it.",
    },
    browsers: OK,
  },
  {
    ext: "ico",
    name: "ICO",
    kind: "image",
    what: "The Windows icon format. Also what a browser favicon is.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "icns",
    name: "ICNS",
    kind: "image",
    what: "The macOS icon format. Apple only, by design.",
    macos: OK,
    windows: { level: "no", note: "Nothing on Windows reads it." },
    browsers: { level: "no" },
    convertTo: "PNG",
    why: "For anything that is not a Mac app bundle, you want a PNG.",
  },
  {
    ext: "psd",
    name: "PSD",
    kind: "image",
    what: "A Photoshop document. Layers, masks, the lot.",
    macos: { level: "yes", note: "Preview opens it flattened. Editing needs Photoshop." },
    windows: { level: "no", note: "Needs Photoshop or something that reads PSD." },
    browsers: { level: "no" },
    convertTo: "PNG",
    why: "If the person just needs to look at it, send a flat PNG instead.",
  },
  {
    ext: "dng",
    name: "DNG",
    kind: "image",
    what: "Adobe's open camera RAW format. Full sensor data, big files.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the Raw Image Extension from the Microsoft Store.",
    },
    browsers: { level: "no" },
    convertTo: "JPG",
    why: "RAW is for editing, not for sending. Export a JPG for anyone who just wants the picture.",
  },
  {
    ext: "cr2",
    name: "CR2",
    kind: "image",
    what: "Canon camera RAW, the older of the two.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the Raw Image Extension from the Microsoft Store.",
    },
    browsers: { level: "no" },
    convertTo: "JPG",
    why: "Nobody can open your RAW files. Send a JPG.",
  },
  {
    ext: "cr3",
    name: "CR3",
    kind: "image",
    what: "Canon camera RAW, the current one.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the Raw Image Extension from the Microsoft Store.",
    },
    browsers: { level: "no" },
    convertTo: "JPG",
    why: "Nobody can open your RAW files. Send a JPG.",
  },
  {
    ext: "nef",
    name: "NEF",
    kind: "image",
    what: "Nikon camera RAW.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the Raw Image Extension from the Microsoft Store.",
    },
    browsers: { level: "no" },
    convertTo: "JPG",
    why: "Nobody can open your RAW files. Send a JPG.",
  },
  {
    ext: "arw",
    name: "ARW",
    kind: "image",
    what: "Sony camera RAW.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs the Raw Image Extension from the Microsoft Store.",
    },
    browsers: { level: "no" },
    convertTo: "JPG",
    why: "Nobody can open your RAW files. Send a JPG.",
  },

  // ----------------------------------------------------------------- audio
  {
    ext: "mp3",
    name: "MP3",
    kind: "audio",
    what: "The universal audio format. Everything plays an MP3.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "aac",
    name: "AAC",
    kind: "audio",
    what: "MP3's successor. Better quality at the same size, nearly as universal.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "m4a",
    name: "M4A",
    kind: "audio",
    what: "An MP4 container with audio only, usually AAC inside.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "wav",
    name: "WAV",
    kind: "audio",
    what: "Uncompressed audio. Perfect quality, enormous files.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "flac",
    name: "FLAC",
    kind: "audio",
    what: "Lossless compression. CD quality at about half the size of WAV.",
    macos: OK,
    windows: { level: "yes", note: "Media Player handles FLAC." },
    browsers: OK,
    source:
      "https://learn.microsoft.com/en-us/previous-versions/windows/desktop/wmp/supported-protocols-and-file-types",
  },
  {
    ext: "alac",
    name: "ALAC",
    kind: "audio",
    what: "Apple's lossless format. Same idea as FLAC, Apple's version of it.",
    macos: OK,
    windows: { level: "no", note: "Media Player does not play ALAC." },
    browsers: { level: "no", note: "Safari plays it. Others do not." },
    convertTo: "FLAC",
    why: "Identical quality, and FLAC plays on Windows and in browsers.",
  },
  {
    ext: "ogg",
    name: "OGG",
    kind: "audio",
    what: "An open container, usually Vorbis audio inside.",
    macos: {
      level: "no",
      note: "Music and QuickTime do not play it. VLC does.",
    },
    windows: { level: "yes", note: "Media Player handles OGG." },
    browsers: OK,
    convertTo: "MP3",
    why: "If a Mac is anywhere in the chain, MP3 saves an argument.",
  },
  {
    ext: "opus",
    name: "Opus",
    kind: "audio",
    what: "The best-sounding codec at low bitrates. What most voice chat runs on.",
    macos: {
      level: "no",
      note: "Not in Music or QuickTime. VLC plays it.",
    },
    windows: { level: "yes" },
    browsers: OK,
    convertTo: "MP3",
    why: "Opus is better. MP3 is the one that plays everywhere.",
  },
  {
    ext: "aiff",
    name: "AIFF",
    kind: "audio",
    what: "Apple's uncompressed format. WAV with a different label on it.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "wma",
    name: "WMA",
    kind: "audio",
    what: "Microsoft's old audio format. Mostly a relic now.",
    macos: { level: "no", note: "Nothing Apple ships plays it. VLC does." },
    windows: OK,
    browsers: { level: "no" },
    convertTo: "MP3",
    why: "WMA only ever worked properly on Windows. MP3 works everywhere.",
  },

  // ----------------------------------------------------------------- video
  {
    ext: "mp4",
    name: "MP4",
    kind: "video",
    what: "The universal video format, when H.264 is the codec inside. This is the one to send.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "mov",
    name: "MOV",
    kind: "video",
    what: "Apple's video container. What your iPhone and your Mac record.",
    macos: OK,
    windows: {
      level: "no",
      note: "Media Player will not play a MOV. VLC will.",
    },
    browsers: { level: "extension", note: "Safari yes. The rest, only sometimes." },
    convertTo: "MP4",
    why: "The contents are usually already H.264. Rewrapping to MP4 is quick and fixes it for everyone.",
    source: "https://fileinfo.com/software/microsoft/media_player",
  },
  {
    ext: "mkv",
    name: "MKV",
    kind: "video",
    what: "The flexible open container. Multiple audio tracks, subtitles, anything.",
    macos: {
      level: "no",
      note: "QuickTime does not open MKV. VLC does, and always has.",
    },
    windows: { level: "yes", note: "Windows 11's Media Player handles MKV." },
    browsers: { level: "no" },
    convertTo: "MP4",
    why: "Backwards from what most people expect: this one is the Mac's problem, not Windows'.",
    source:
      "https://www.appgeeker.com/topics/what-type-of-files-does-quicktime-play.html",
  },
  {
    ext: "webm",
    name: "WebM",
    kind: "video",
    what: "Google's web video format. Built for browsers, awkward everywhere else.",
    macos: { level: "no", note: "QuickTime does not open it. VLC does." },
    windows: { level: "yes" },
    browsers: OK,
    convertTo: "MP4",
    why: "Great in a web page, annoying as a file somebody has to double-click.",
    source:
      "https://www.appgeeker.com/topics/what-type-of-files-does-quicktime-play.html",
  },
  {
    ext: "avi",
    name: "AVI",
    kind: "video",
    what: "A very old Windows container. What is inside it varies wildly.",
    macos: {
      level: "extension",
      note: "Depends entirely on the codec inside. QuickTime opens some, VLC opens the rest.",
    },
    windows: OK,
    browsers: { level: "no" },
    convertTo: "MP4",
    why: "AVI files are a lottery. MP4 is not.",
  },
  {
    ext: "wmv",
    name: "WMV",
    kind: "video",
    what: "Microsoft's old video format. Windows and not much else.",
    macos: { level: "no", note: "Needs VLC." },
    windows: OK,
    browsers: { level: "no" },
    convertTo: "MP4",
    why: "The same reason as WMA. It only ever worked on one platform.",
  },
  {
    ext: "hevc",
    name: "HEVC / H.265",
    kind: "video",
    what: "The codec, not the container. Half the size of H.264, and patented, which is the whole problem.",
    macos: OK,
    windows: {
      level: "extension",
      note: "Needs HEVC Video Extensions from the Store, which Microsoft charges $0.99 for because it licenses the patents.",
    },
    browsers: { level: "extension", note: "Safari yes. Chrome needs hardware support. Firefox is patchy." },
    convertTo: "H.264 MP4",
    why: "Bigger file, but it plays on anything without anyone buying a codec.",
    source:
      "https://www.thewindowsclub.com/view-heic-hevc-files-windows-photos-app",
  },
  {
    ext: "m4v",
    name: "M4V",
    kind: "video",
    what: "Apple's MP4 variant. Identical to MP4 unless it carries DRM.",
    macos: OK,
    windows: OK,
    browsers: OK,
  },
  {
    ext: "flv",
    name: "FLV",
    kind: "video",
    what: "Flash video. Flash has been dead since 2020 and this went with it.",
    macos: { level: "no", note: "VLC only." },
    windows: { level: "no", note: "VLC only." },
    browsers: { level: "no", note: "No browser has played Flash video since 2020." },
    convertTo: "MP4",
    why: "If you have FLV files, convert them now while tools still read them.",
  },
  {
    ext: "mpg",
    name: "MPG / MPEG",
    kind: "video",
    what: "MPEG-1 and MPEG-2. DVD-era video.",
    macos: OK,
    windows: OK,
    browsers: { level: "no" },
    convertTo: "MP4",
    why: "Much smaller at the same quality, and it works in a browser.",
  },
  {
    ext: "3gp",
    name: "3GP",
    kind: "video",
    what: "What old phones recorded before smartphones. Small and low quality.",
    macos: OK,
    windows: { level: "extension", note: "Depends on the codec inside." },
    browsers: { level: "no" },
    convertTo: "MP4",
    why: "Same footage, a container that anything opens.",
  },
];

/** Lookup by extension, dots and case tolerated. */
export function findFormat(input: string): FormatSupport | undefined {
  const needle = input.trim().toLowerCase().replace(/^.*\./, "");
  const aliases: Record<string, string> = {
    jpeg: "jpg",
    tif: "tiff",
    mpeg: "mpg",
    m4b: "m4a",
    oga: "ogg",
    h265: "hevc",
    x265: "hevc",
    "3g2": "3gp",
  };
  const ext = aliases[needle] ?? needle;
  return formatSupport.find((f) => f.ext === ext);
}

