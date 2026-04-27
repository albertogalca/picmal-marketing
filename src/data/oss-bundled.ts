export type OssEntry = {
  name: string;
  binaries: string[];
  version: string;
  upstream: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
  notes?: string;
};

export const ossBundled: OssEntry[] = [
  {
    name: "FFmpeg",
    binaries: ["ffmpeg"],
    version: "8.0",
    upstream: "https://ffmpeg.org/",
    license: "LGPL-2.1-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html",
    sourceUrl: "https://ffmpeg.org/releases/ffmpeg-8.0.tar.xz",
    notes:
      "Used as a separate executable for audio and video conversion. Built from unmodified upstream sources.",
  },
  {
    name: "ImageMagick",
    binaries: ["magick_arm64", "magick_rosetta", "libMagickCore", "libMagickWand"],
    version: "7.1.2-12",
    upstream: "https://imagemagick.org/",
    license: "ImageMagick License",
    licenseUrl: "https://imagemagick.org/script/license.php",
    sourceUrl: "https://imagemagick.org/archive/ImageMagick-7.1.2-12.tar.xz",
    notes:
      "Used for image conversion and metadata handling. License is Apache-2.0 compatible.",
  },
  {
    name: "Ghostscript",
    binaries: ["gs"],
    version: "10.05.1",
    upstream: "https://www.ghostscript.com/",
    license: "AGPL-3.0",
    licenseUrl: "https://www.gnu.org/licenses/agpl-3.0.html",
    sourceUrl:
      "https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/tag/gs10051",
    notes: "Used as a separate executable for PDF processing.",
  },
  {
    name: "Gifsicle",
    binaries: ["gifsicle"],
    version: "1.96",
    upstream: "https://www.lcdf.org/gifsicle/",
    license: "GPL-2.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    sourceUrl: "https://www.lcdf.org/gifsicle/gifsicle-1.96.tar.gz",
    notes: "Used as a separate executable for GIF optimization.",
  },
  {
    name: "pngquant",
    binaries: ["pngquant"],
    version: "3.0.4",
    upstream: "https://pngquant.org/",
    license: "GPL-3.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
    sourceUrl: "https://pngquant.org/pngquant-src.tar.gz",
    notes: "Used as a separate executable for PNG quantization.",
  },
  {
    name: "oxipng",
    binaries: ["oxipng"],
    version: "10.0.0",
    upstream: "https://github.com/shssoichiro/oxipng",
    license: "MIT",
    licenseUrl: "https://opensource.org/license/mit",
    sourceUrl: "https://github.com/shssoichiro/oxipng/archive/refs/tags/v10.0.0.tar.gz",
    notes: "Used as a separate executable for PNG lossless optimization.",
  },
  {
    name: "pdf2svg",
    binaries: ["pdf2svg"],
    version: "0.2.3",
    upstream: "https://github.com/dawbarton/pdf2svg",
    license: "GPL-2.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    sourceUrl: "https://github.com/dawbarton/pdf2svg/archive/refs/tags/v0.2.3.tar.gz",
    notes:
      "Used as a separate executable for PDF to SVG conversion. Links Poppler and Cairo at runtime.",
  },
  {
    name: "svgcleaner",
    binaries: ["svgcleaner"],
    version: "0.9.6",
    upstream: "https://github.com/RazrFalcon/svgcleaner",
    license: "GPL-2.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    sourceUrl:
      "https://github.com/RazrFalcon/svgcleaner/archive/refs/tags/v0.9.6.tar.gz",
    notes: "Used as a separate executable for SVG optimization.",
  },
  {
    name: "mozjpeg",
    binaries: ["cjpeg", "djpeg"],
    version: "4.1.5",
    upstream: "https://github.com/mozilla/mozjpeg",
    license: "BSD-3-Clause / IJG",
    licenseUrl: "https://github.com/mozilla/mozjpeg/blob/master/LICENSE.md",
    sourceUrl: "https://github.com/mozilla/mozjpeg/archive/refs/tags/v4.1.5.tar.gz",
    notes: "Used as separate executables for JPEG encoding and decoding.",
  },
];
