import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { markdown } from "../../utils/markdownResponse";

// Markdown twins for the docs. Starlight's loader is rooted a level up, so ids
// read "docs/cli"; the index ("docs") is skipped because its twin would be
// /docs.md, and this directory owns that name.
export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getCollection("docs");
  return pages
    .filter((page) => page.id !== "docs")
    .map((page) => ({
      params: { slug: page.id.replace(/^docs\//, "") },
      props: { page },
    }));
};

export const GET: APIRoute = ({ props }) => {
  const { page } = props as {
    page: {
      id: string;
      body?: string;
      data: { title: string; description?: string };
    };
  };
  const lead = page.data.description ? `\n> ${page.data.description}\n` : "";
  return markdown(
    `# ${page.data.title}\n${lead}\nSource: https://picmal.app/${page.id}\n\n${page.body ?? ""}`,
  );
};
