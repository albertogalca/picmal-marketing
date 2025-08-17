"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };


  const categories = ["All", "Changelog", "Guide", "Tutorial"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen overflow-hidden transition-colors duration-300 bg-[#F2F6FF] text-gray-900 dark:bg-black dark:text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 transition-all duration-300 bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/30 dark:from-[#1B5BFF]/10 dark:via-black dark:to-[#2483FF]/15"></div>

      <Header toggleTheme={toggleTheme} currentPage="blog" />

      {/* Blog Header */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span
              className="bg-gradient-to-r bg-clip-text text-transparent from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400"
            >
              Picmal Blog
            </span>
          </h1>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-400"
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
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-[#1B5BFF] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white"
                    : "bg-white/80 text-gray-600 hover:bg-white border border-[#CBDEFF]/30 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20 dark:border-transparent"
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
                  className="group backdrop-blur border rounded-2xl p-8 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-[#1B5BFF] focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-black bg-white/80 border-[#CBDEFF]/30 hover:bg-white hover:shadow-lg dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:shadow-none"
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
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {post.date} • {post.readTime}
                    </div>
                  </div>

                  <h2
                    id={`post-title-${index}`}
                    className="text-2xl font-bold mb-3 group-hover:text-[#1B5BFF] transition-colors text-gray-900 dark:text-white"
                  >
                    {post.title}
                  </h2>

                  <p
                    className="text-gray-600 dark:text-gray-400 leading-relaxed"
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

      <Footer />
    </div>
  );
}
