"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const categories = ["All", "Changelog", "Guide", "Tutorial"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div
      className={`min-h-screen overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-slate-900 text-white" : "bg-[#F2F6FF] text-gray-900"
      }`}
    >
      {/* Enhanced Background gradient */}
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-800"
            : "bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/20"
        }`}
      >
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2483FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B5BFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#CBDEFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <Header isDark={isDark} toggleTheme={toggleTheme} currentPage="blog" />

      {/* Blog Header */}
      <section className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-white via-[#CBDEFF] to-[#2483FF]"
                  : "from-gray-900 via-[#1B5BFF] to-[#2483FF]"
              }`}
            >
              Picmal Blog
            </span>
          </h1>
          <p
            className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-700"
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
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B5BFF] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white shadow-lg shadow-[#1B5BFF]/25"
                    : isDark
                    ? "bg-white/5 backdrop-blur border border-white/10 text-gray-300 hover:bg-white/10 hover:border-[#1B5BFF]/30"
                    : "bg-gradient-to-r from-white to-[#F2F6FF] backdrop-blur border border-[#CBDEFF]/30 text-gray-600 hover:border-[#1B5BFF]/40 hover:shadow-md hover:shadow-[#1B5BFF]/10"
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
                  className={`group backdrop-blur border rounded-2xl p-8 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#1B5BFF] focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-black ${
                    isDark
                      ? "bg-gradient-to-br from-gray-900/50 to-black/50 border-white/10 hover:border-[#1B5BFF]/30 hover:bg-white/10"
                      : "bg-gradient-to-br from-white to-[#F2F6FF]/50 border-[#CBDEFF]/30 hover:border-[#1B5BFF]/40 hover:shadow-[#1B5BFF]/10"
                  }`}
                  aria-labelledby={`post-title-${index}`}
                  role="article"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium backdrop-blur transition-all duration-300 group-hover:scale-105 ${
                        post.category === "Changelog"
                          ? isDark
                            ? "bg-[#1B5BFF]/20 text-[#2483FF] border border-[#1B5BFF]/30"
                            : "bg-gradient-to-r from-[#1B5BFF]/20 to-[#2483FF]/20 text-[#1B5BFF] border border-[#1B5BFF]/30"
                          : post.category === "Guide"
                          ? isDark
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 text-emerald-600 border border-emerald-500/30"
                          : isDark
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-gradient-to-r from-purple-500/20 to-purple-400/20 text-purple-600 border border-purple-500/30"
                      }`}
                    >
                      {post.category}
                    </span>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {post.date} • {post.readTime}
                    </div>
                  </div>

                  <h2
                    id={`post-title-${index}`}
                    className={`text-2xl font-bold mb-3 transition-all duration-300 ${
                      isDark
                        ? "text-white group-hover:text-[#2483FF]"
                        : "text-gray-900 group-hover:text-[#1B5BFF]"
                    }`}
                  >
                    {post.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div
                    className={`flex items-center mt-4 font-medium transition-colors ${
                      isDark ? "text-[#2483FF]" : "text-[#1B5BFF]"
                    }`}
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300"
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

      <Footer isDark={isDark} />
    </div>
  );
}
