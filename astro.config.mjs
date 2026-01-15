// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
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
        replacesTitle: true,
      },
      defaultLocale: "root",
      locales: {
        root: {
          label: "English",
          lang: "en",
        },
      },
      social: [
        {
          icon: "github",
          label: "Github",
          href: "https://github.com/albertogalca/picmal-releases",
        },
        {
          icon: "twitter",
          label: "Twitter",
          href: "https://x.com/picmalapp",
        },
      ],
      sidebar: [
        {
          label: "Quick start",
          items: [
            { label: "Introduction", link: "/docs/" },
            {
              label: "Installation",
              link: "/docs/getting-started/installation/",
            },
            {
              label: "Quick Start",
              link: "/docs/getting-started/quick-start/",
            },
          ],
        },
      ],
      components: {
        Head: "./src/components/starlight/Head.astro",
        ThemeProvider: "./src/components/starlight/ThemeProvider.astro",
      },
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
});
