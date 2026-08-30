import type { APIRoute, GetStaticPaths } from "astro";
import { getPublishedPosts } from "../../utils/posts";
import { markdown } from "../../utils/markdownResponse";

// The markdown twin the Worker serves for `Accept: text/markdown` on a post.
// Post bodies are already plain markdown (no MDX imports or JSX), so the source
// ships as-is. ponytail: if a post ever needs a component, render it out here.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
};

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getPublishedPosts>>[number] };
  return markdown(
    `# ${post.data.title}\n\n> ${post.data.description}\n\nSource: https://picmal.app/blog/${post.id}\n\n${post.body}`,
  );
};
