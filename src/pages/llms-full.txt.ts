import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

// The companion llms.txt convention: llms.txt is the index, llms-full.txt is the
// documentation itself in one fetch, so an agent answering "how do I batch
// convert with picmal-cli" gets the answer without walking 24 URLs.
//
// Docs only, deliberately. The blog is 46 guides that mostly teach the free
// macOS way of doing something; they are already listed in llms.txt and
// individually addressable as .md twins, and folding them in here would triple
// the file to teach an agent about Preview and sips rather than about Picmal.
//
// Order is Introduction, Getting started, then alphabetical. Not the Starlight
// sidebar order: that lives in astro.config.mjs, and importing the config here
// would drag the integrations into the build for a nicety. A new doc lands in
// the alphabetical tail on its own rather than going missing, which is the
// property that actually matters.
const LEAD_DOCS = ["docs", "docs/getting-started"];

const HEADER = `# Picmal, full documentation

> Picmal is a native macOS application for batch converting and compressing
> images, videos, audio files, and PDFs. It processes files entirely offline,
> supports drag-and-drop workflows, and integrates with Finder, Shortcuts and
> Raycast.

This file is the complete Picmal documentation as a single document.

For the site index, pricing, the supported format lists and the other
machine-readable endpoints, read https://picmal.app/llms.txt first. Pricing on
its own is at https://picmal.app/pricing.md, and the agent guide is at
https://picmal.app/AGENTS.md.

Every section below is also addressable on its own by appending \`.md\` to its
page URL, e.g. https://picmal.app/docs/cli.md.`;

export const GET: APIRoute = async ({ site }) => {
  const pages = await getCollection("docs");

  const rank = (id: string) => {
    const lead = LEAD_DOCS.indexOf(id);
    return lead === -1 ? LEAD_DOCS.length : lead;
  };

  const ordered = [...pages].sort(
    (a, b) => rank(a.id) - rank(b.id) || a.id.localeCompare(b.id),
  );

  const sections = ordered.map((page) => {
    const title = page.data.title;
    const lead = page.data.description ? `\n> ${page.data.description}\n` : "";
    const source = new URL(`/${page.id}`, site ?? "https://picmal.app/").href;
    // Headings inside a doc body start at h2/h3, so promoting the page title to
    // h1 keeps one clean outline across the whole concatenation.
    return `# ${title}\n${lead}\nSource: ${source}\n\n${page.body ?? ""}`.trimEnd();
  });

  const body = [HEADER, ...sections].join("\n\n---\n\n");

  return new Response(body.trimEnd() + "\n", {
    // text/plain, matching how llms.txt itself is served. Agents fetching these
    // read the bytes; a markdown media type here would disagree with its index.
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
