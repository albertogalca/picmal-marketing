// The free browser tools under /tools. Read by the index, by MoreTools at the
// foot of each tool, and by the footer.
//
// Only tools that exist. An earlier version padded the index out with "coming
// soon" cards; they were speculative and are gone. Add an entry when the page
// ships, not when it is planned.

export interface Tool {
  title: string;
  description: string;
  href: string;
}

export const TOOLS: Tool[] = [
  {
    title: "EXIF viewer",
    description:
      "Drop a photo and read everything hidden inside it: camera, lens, settings, timestamps, and the GPS coordinates most phones write into every shot.",
    href: "/tools/exif-viewer",
  },
  {
    title: "Will this file open?",
    description:
      "Check whether a format opens on macOS, Windows or in a browser before you send it, and what to convert it to when the answer is no.",
    href: "/tools/file-format-checker",
  },
  {
    title: "Image file size calculator",
    description:
      "Type in pixel dimensions and see how big the file lands in JPG, PNG, WebP, AVIF, HEIC, TIFF and uncompressed.",
    href: "/tools/image-file-size-calculator",
  },
];
