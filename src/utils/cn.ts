import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge configured to recognize our custom semantic type-scale
 * utilities (defined as `--text-*` tokens in src/styles/global.css) as members
 * of the font-size conflict group. Without this, a caller override like
 * `<H2 class="text-h3">` would not win over the component's default `text-h2`,
 * because tailwind-merge doesn't know these custom names are font sizes.
 */
export const cn = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "body-lg",
            "body",
            "body-sm",
            "eyebrow",
            "caption",
          ],
        },
      ],
    },
  },
});
