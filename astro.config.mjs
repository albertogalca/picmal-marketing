// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import starlightThemeBlack from "starlight-theme-black";

export default defineConfig({
  site: "https://picmal.app",
  trailingSlash: "never",
  integrations: [
    starlight({
      title: "Picmal Docs",
      description:
        "Complete guide to using Picmal, the powerful Mac image and video converter.",
      logo: {
        src: "./public/logo.webp",
        alt: "Picmal",
      },
      sidebar: [
        {
          label: "Quick start",
          items: [
            { label: "Introduction", link: "/docs" },
            { label: "Getting Started", link: "/docs/getting-started" },
          ],
        },
        {
          label: "Features",
          items: [
            { label: "Converting Files", link: "/docs/converting-files" },
            { label: "Compressing Files", link: "/docs/compressing-files" },
            { label: "Watched Folders", link: "/docs/watched-folders" },
            { label: "Integrations", link: "/docs/integrations" },
          ],
        },
        {
          label: "Settings & Formats",
          items: [
            { label: "Supported Formats", link: "/docs/supported-formats" },
            { label: "Image Compression", link: "/docs/image-compression" },
            { label: "Audio & Video", link: "/docs/audio-and-video" },
            { label: "Resize & Color Space", link: "/docs/resize-and-color-space" },
            { label: "Output & Naming", link: "/docs/output-and-naming" },
          ],
        },
        {
          label: "Help",
          items: [
            { label: "License", link: "/docs/license" },
            { label: "FAQ & Troubleshooting", link: "/docs/faq" },
          ],
        },
      ],
      plugins: [
        starlightThemeBlack({
          navLinks: [
            {
              label: "Docs",
              link: "/getting-started",
            },

          ],
        }),
      ],
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
});
