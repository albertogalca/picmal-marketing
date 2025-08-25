export const blogPosts = [
  {
    id: "changelog-v1-0-5",
    title: "Picmal v1.0.5 - Enhanced file naming and metadata display",
    excerpt:
      "New features for better file organization and metadata visibility in your image conversion workflow.",
    date: "July 22, 2025",
    category: "Changelog",
    readTime: "2 min read",
    slug: "changelog-v1-0-5",
  },
  {
    id: "changelog-v1-0-4",
    title: "Picmal v1.0.4 - Metadata control and stability improvements",
    excerpt:
      "Advanced metadata management options and important bug fixes for AVIF image processing.",
    date: "July 17, 2025",
    category: "Changelog",
    readTime: "2 min read",
    slug: "changelog-v1-0-4",
  },
  {
    id: "changelog-v1-0-3",
    title: "Picmal v1.0.3 - Expanded format support",
    excerpt:
      "Better SVG handling and support for professional design formats including EPS, AI, and ICO.",
    date: "July 14, 2025",
    category: "Changelog",
    readTime: "2 min read",
    slug: "changelog-v1-0-3",
  },
  {
    id: "best-image-formats-2025",
    title: "Best image formats for 2025",
    excerpt:
      "Complete guide to choosing the right image format for your projects, from WEBP to AVIF and beyond.",
    date: "July 15, 2025",
    category: "Guide",
    readTime: "8 min read",
    slug: "best-image-formats-2025",
  },
  {
    id: "batch-convert-images-mac",
    title: "How to batch convert images on Mac",
    excerpt:
      "Learn efficient methods for converting multiple images at once on macOS, including native tools and third-party solutions.",
    date: "July 10, 2025",
    category: "Tutorial",
    readTime: "6 min read",
    slug: "batch-convert-images-mac",
  },
];

export function getLatestChangelogPost() {
  return blogPosts.find((post) => post.category === "Changelog");
}
