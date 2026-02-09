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
            { label: "Getting started", link: "/docs/getting-started" },
          ],
        },
        {
          label: "Features",
          items: [
            { label: "Converting files", link: "/docs/converting-files" },
            { label: "Compressing files", link: "/docs/compressing-files" },
            { label: "Watched folders", link: "/docs/watched-folders" },
            { label: "Integrations", link: "/docs/integrations" },
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
      credits: false,
      plugins: [
        starlightThemeBlack({
          footerText: "",
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
