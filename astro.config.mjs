// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { conversions, isConversionIndexed } from "./src/data/conversions.ts";

// Convert pages that are noindexed should also be kept out of the sitemap.
const noindexConvertUrls = new Set(
  conversions
    .filter((c) => !isConversionIndexed(c.slug))
    .map((c) => `https://picmal.app/convert/${c.slug}`),
);

// Noindexed standalone pages (see meta.noindex in each); keep them out of the sitemap too.
const noindexLegalUrls = new Set([
  "https://picmal.app/terms",
  "https://picmal.app/privacy",
  "https://picmal.app/legal/open-source",
  "https://picmal.app/download",
]);

export default defineConfig({
  site: "https://picmal.app",
  trailingSlash: "never",
  build: { format: "directory" },
  integrations: [
    starlight({
      title: "Picmal Docs",
      description:
        "These are the docs for Picmal, a macOS app for converting, compressing, and creating images, audio, video, and PDF files.",
      logo: {
        src: "./public/logo.webp",
        alt: "Picmal",
      },
      sidebar: [
        {
          label: "Quick start",
          items: [
            { label: "Introduction", link: "/docs" },
            { label: "Getting started", link: "/docs/getting-started" },
          ],
        },
        {
          label: "Features",
          items: [
            { label: "Converting files", link: "/docs/converting-files" },
            { label: "Compressing files", link: "/docs/compressing-files" },
            { label: "Audio tools", link: "/docs/audio-tools" },
            { label: "Video tools", link: "/docs/video-tools" },
            { label: "PDF tools", link: "/docs/pdf-tools" },
            { label: "App Icons", link: "/docs/app-icons" },
            { label: "Managing the queue", link: "/docs/managing-the-queue" },
            { label: "Watched folders", link: "/docs/watched-folders" },
            {
              label: "Clipboard optimization",
              link: "/docs/clipboard-optimization",
            },
            { label: "Integrations", link: "/docs/integrations" },
            { label: "Command line (CLI)", link: "/docs/cli" },
          ],
        },
        {
          label: "Settings and formats",
          items: [
            { label: "Supported formats", link: "/docs/supported-formats" },
            { label: "Image compression", link: "/docs/image-compression" },
            { label: "Audio and video", link: "/docs/audio-and-video" },
            {
              label: "Resize and color space",
              link: "/docs/resize-and-color-space",
            },
            { label: "Metadata", link: "/docs/metadata" },
            { label: "Watermarks", link: "/docs/watermarks" },
            { label: "Output and naming", link: "/docs/output-and-naming" },
          ],
        },
        {
          label: "Help",
          items: [
            { label: "License", link: "/docs/license" },
            { label: "FAQ and troubleshooting", link: "/docs/faq" },
          ],
        },
      ],
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://picmal.app/og.png",
          },
        },
      ],
      components: {
        Head: "./src/components/StarlightHead.astro",
      },
      customCss: ["./src/styles/docs-layers.css", "./src/styles/docs.css"],
      disable404Route: true,
      credits: false,
      expressiveCode: {
        defaultProps: { frame: "none" },
      },
    }),
    mdx(),
    sitemap({
      filter: (page) =>
        !noindexConvertUrls.has(page) && !noindexLegalUrls.has(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
});
