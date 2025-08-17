"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const blogPosts = [
    {
      id: "changelog-v1-0-5",
      title: "Picmal v1.0.5 - Enhanced File Naming and Metadata Display",
      excerpt:
        "New features for better file organization and metadata visibility in your image conversion workflow.",
      date: "July 22, 2025",
      category: "Changelog",
      readTime: "2 min read",
      slug: "changelog-v1-0-5",
    },
    {
      id: "changelog-v1-0-4",
      title: "Picmal v1.0.4 - Metadata Control and Stability Improvements",
      excerpt:
        "Advanced metadata management options and important bug fixes for AVIF image processing.",
      date: "July 17, 2025",
      category: "Changelog",
      readTime: "2 min read",
      slug: "changelog-v1-0-4",
    },
    {
      id: "changelog-v1-0-3",
      title: "Picmal v1.0.3 - Expanded Format Support",
      excerpt:
        "Better SVG handling and support for professional design formats including EPS, AI, and ICO.",
      date: "July 14, 2025",
      category: "Changelog",
      readTime: "2 min read",
      slug: "changelog-v1-0-3",
    },
    {
      id: "best-image-formats-2025",
      title: "Best Image Formats for Web and Print in 2025",
      excerpt:
        "Complete guide to choosing the right image format for your projects, from WEBP to AVIF and beyond.",
      date: "July 15, 2025",
      category: "Guide",
      readTime: "8 min read",
      slug: "best-image-formats-2025",
    },
    {
      id: "batch-convert-images-mac",
      title: "How to Batch Convert Images on Mac: Complete Guide",
      excerpt:
        "Learn efficient methods for converting multiple images at once on macOS, including native tools and third-party solutions.",
      date: "July 10, 2025",
      category: "Tutorial",
      readTime: "6 min read",
      slug: "batch-convert-images-mac",
    },
  ];

  const categories = ["All", "Changelog", "Guide", "Tutorial"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-black text-white" : "bg-[#F2F6FF] text-gray-900"
      }`}
    >
      {/* Background gradient */}
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-[#1B5BFF]/10 via-black to-[#2483FF]/15"
            : "bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/30"
        }`}
      ></div>

      {/* Navigation */}
      <nav
        className={`relative z-50 px-6 py-6 backdrop-blur-md transition-colors duration-300 ${
          isDark
            ? "bg-black/50 border-b border-white/10"
            : "bg-white/80 border-b border-[#CBDEFF]/30"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.webp"
                alt="Picmal Logo"
                width={64}
                height={64}
                className="rounded-lg w-10 h-10 object-cover"
              />
              <div
                className={`text-xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Picmal
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`transition-colors ${
                isDark
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-[#1B5BFF]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`transition-colors ${
                isDark ? "text-white" : "text-[#1B5BFF]"
              }`}
            >
              Blog
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors mr-4 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
            <button className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-6 py-2.5 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-medium">
              Download for Mac
            </button>
          </div>
        </div>
      </nav>

      {/* Blog Header */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-white via-gray-200 to-gray-400"
                  : "from-gray-900 via-gray-700 to-gray-600"
              }`}
            >
              Picmal Blog
            </span>
          </h1>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Updates, guides, and insights about image conversion, file formats,
            and productivity tips for Mac users.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section
        className="relative z-10 px-6 pb-12"
        aria-label="Filter blog posts by category"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="flex flex-wrap gap-3 justify-center"
            role="tablist"
            aria-label="Blog post categories"
          >
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-controls={`posts-${category.toLowerCase()}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#1B5BFF] focus:ring-offset-2 ${
                  isDark ? "focus:ring-offset-black" : "focus:ring-offset-white"
                } ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white"
                    : isDark
                    ? "bg-white/10 text-gray-300 hover:bg-white/20"
                    : "bg-white/80 text-gray-600 hover:bg-white border border-[#CBDEFF]/30"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="relative z-10 px-6 pb-20" aria-label="Blog posts">
        <div className="max-w-4xl mx-auto">
          <div
            className="grid gap-8"
            role="tabpanel"
            id={`posts-${selectedCategory.toLowerCase()}`}
            aria-label={`${selectedCategory} blog posts`}
          >
            {filteredPosts.map((post, index) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article
                  className={`group backdrop-blur border rounded-2xl p-8 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-[#1B5BFF] focus-within:ring-offset-2 ${
                    isDark
                      ? "focus-within:ring-offset-black"
                      : "focus-within:ring-offset-white"
                  } ${
                    isDark
                      ? "bg-white/5 border-white/10 hover:bg-white/10"
                      : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white hover:shadow-lg"
                  }`}
                  aria-labelledby={`post-title-${index}`}
                  role="article"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        post.category === "Changelog"
                          ? "bg-[#1B5BFF]/20 text-[#1B5BFF]"
                          : post.category === "Guide"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {post.category}
                    </span>
                    <div
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {post.date} • {post.readTime}
                    </div>
                  </div>

                  <h2
                    id={`post-title-${index}`}
                    className={`text-2xl font-bold mb-3 group-hover:text-[#1B5BFF] transition-colors ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {post.title}
                  </h2>

                  <p
                    className={`${
                      isDark ? "text-gray-400" : "text-gray-600"
                    } leading-relaxed`}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center mt-4 text-[#1B5BFF] font-medium">
                    Read more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 px-6 py-12 border-t ${
          isDark ? "border-white/10" : "border-[#CBDEFF]/30 bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Image
              src="/logo.webp"
              alt="Picmal Logo"
              width={64}
              height={64}
              className="rounded-lg w-8 h-8 object-cover"
            />
            <div
              className={`text-xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Picmal
            </div>
          </div>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Privacy-first image conversion for Mac
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <a
              href="mailto:support@picmal.app"
              className="hover:text-[#1B5BFF] transition-colors"
            >
              Support
            </a>
            <span>•</span>
            <span>Version 1.0.5</span>
            <span>•</span>
            <span>Made with ❤️ for Mac</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
