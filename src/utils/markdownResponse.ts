// One place for the media type acceptmarkdown.com expects, so every generated
// twin agrees with the Worker that serves it.
export const markdown = (body: string) =>
  new Response(body.trimEnd() + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
