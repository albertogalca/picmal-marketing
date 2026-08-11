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
      "Used as a separate executable for audio and video conversion. Built from unmodified upstream sources in an LGPL configuration (no GPL components; hardware encoding via Apple VideoToolbox). Statically includes libvpx, SVT-AV1, dav1d, libwebp, OpenJPEG, Opus, LAME, Vorbis, Theora, libass, HarfBuzz, FreeType, and FriBidi.",
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
    name: "libheif",
    binaries: ["libheif.1.dylib", "libde265.0.dylib", "libaom.3.dylib"],
    version: "1.21.1",
    upstream: "https://github.com/strukturag/libheif",
    license: "LGPL-3.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/lgpl-3.0.html",
    sourceUrl:
      "https://github.com/strukturag/libheif/releases/download/v1.21.1/libheif-1.21.1.tar.gz",
    notes:
      "HEIC/AVIF decoding for ImageMagick, with libde265 1.0.16 (LGPL-3.0) and libaom 3.13 (BSD-2-Clause). Built without any GPL encoder; HEIC encoding uses Apple's frameworks instead.",
  },
  {
    name: "usvg (resvg project)",
    binaries: ["usvg"],
    version: "0.48.1",
    upstream: "https://github.com/linebender/resvg",
    license: "MPL-2.0",
    licenseUrl: "https://www.mozilla.org/en-US/MPL/2.0/",
    sourceUrl: "https://crates.io/api/v1/crates/usvg/0.48.1/download",
    notes: "Used as a separate executable for SVG optimization (replaced svgcleaner).",
  },
  {
    name: "VTracer",
    binaries: ["vtracer"],
    version: "0.6.5",
    upstream: "https://github.com/visioncortex/vtracer",
    license: "MIT",
    licenseUrl: "https://opensource.org/license/mit",
    sourceUrl:
      "https://github.com/visioncortex/vtracer/archive/refs/tags/0.6.5.tar.gz",
    notes: "Used as a separate executable for the Vectorize tool (bitmap to SVG).",
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
    name: "mozjpeg",
    binaries: ["cjpeg", "djpeg"],
    version: "4.1.5",
    upstream: "https://github.com/mozilla/mozjpeg",
    license: "BSD-3-Clause / IJG",
    licenseUrl: "https://github.com/mozilla/mozjpeg/blob/master/LICENSE.md",
    sourceUrl: "https://github.com/mozilla/mozjpeg/archive/refs/tags/v4.1.5.tar.gz",
    notes: "Used as separate executables for JPEG encoding and decoding.",
  },
  {
    name: "Exiv2",
    binaries: ["exiv2", "libexiv2.28.dylib"],
    version: "0.28.8",
    upstream: "https://exiv2.org/",
    license: "GPL-2.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    sourceUrl:
      "https://github.com/Exiv2/exiv2/releases/download/v0.28.8/exiv2-0.28.8-Source.tar.gz",
    notes:
      "Used as a separate executable for image metadata (EXIF/IPTC/XMP) editing. Direct download build only — the Mac App Store version writes metadata with Apple's ImageIO instead.",
  },
  {
    name: "Gifsicle",
    binaries: ["gifsicle"],
    version: "1.96",
    upstream: "https://www.lcdf.org/gifsicle/",
    license: "GPL-2.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/old-licenses/gpl-2.0.html",
    sourceUrl: "https://www.lcdf.org/gifsicle/gifsicle-1.96.tar.gz",
    notes:
      "Used as a separate executable for GIF optimization. Direct download build only — the Mac App Store version uses ImageMagick for GIFs.",
  },
  {
    name: "pngquant",
    binaries: ["pngquant"],
    version: "3.0.4",
    upstream: "https://pngquant.org/",
    license: "GPL-3.0-or-later",
    licenseUrl: "https://www.gnu.org/licenses/gpl-3.0.html",
    sourceUrl: "https://pngquant.org/pngquant-src.tar.gz",
    notes:
      "Used as a separate executable for lossy PNG quantization. Direct download build only — the Mac App Store version quantizes with ImageMagick + oxipng.",
  },
];
