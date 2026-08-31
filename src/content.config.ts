import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      category: z.enum(["Guide", "Tutorial", "Newsletter"]).optional(),
      tags: z.array(z.string()).optional(),
      faqs: z
        .array(
          z.object({
            question: z.string(),
            answer: z.string(),
          }),
        )
        .optional(),
      // Round-up posts only ("best X for Mac"). Emits ItemList so the article
      // is eligible for Google's comparison carousels. Keep the order the same
      // as the article's own order.
      itemList: z
        .array(
          z.object({
            name: z.string(),
            description: z.string().optional(),
            url: z.string().optional(),
            price: z.string().optional(),
            operatingSystem: z.string().optional(),
          }),
        )
        .optional(),
    }),
});

const changelog = defineCollection({
  loader: glob({ base: "./src/content/changelog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    version: z.string(),
    title: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    standalone: z.boolean().optional(),
  }),
});

const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema(),
});

export const collections = { blog, changelog, docs };
