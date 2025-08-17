"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

// Blog layout wrapper
export function BlogLayout({ children, meta }) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden transition-colors duration-300 bg-[#F2F6FF] text-gray-900 dark:bg-black dark:text-white">
      {/* Background gradient */}
      <div className="fixed inset-0 transition-all duration-300 bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/30 dark:from-[#1B5BFF]/10 dark:via-black dark:to-[#2483FF]/15"></div>

      <Header toggleTheme={toggleTheme} currentPage="blog" />

      {/* Back to Blog Link */}
      <div className="relative z-10 px-6 pt-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  meta?.category === "Changelog"
                    ? "bg-[#1B5BFF]/20 text-[#1B5BFF]"
                    : meta?.category === "Guide"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-purple-500/20 text-purple-400"
                }`}
              >
                {meta?.category || "Article"}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {meta?.date} • {meta?.readTime}
              </span>
            </div>

            <h1
              id="article-title"
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white"
            >
              {meta?.title}
            </h1>

            <p className="text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              {meta?.description}
            </p>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg prose-picmal max-w-none dark:prose-invert"
            role="main"
            aria-labelledby="article-title"
          >
            {children}
          </div>

          {/* Download CTA */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-8 py-4 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-semibold text-lg shadow-2xl">
              Download Picmal
            </button>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              $8 • One-time purchase • macOS Sonoma or later
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}

// Custom MDX components
export function useMDXComponents(components) {
  return {
    // Override default HTML elements
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold mb-6 text-[#1B5BFF]" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-2xl font-semibold mb-4 text-[#1B5BFF] mt-8"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold mb-3 text-[#1B5BFF] mt-6" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 space-y-2 list-disc list-inside" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 space-y-2 list-decimal list-inside" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1" {...props}>
        {children}
      </li>
    ),
    a: ({ children, ...props }) => (
      <a
        className="text-[#1B5BFF] hover:text-[#2483FF] font-medium hover:underline transition-colors"
        {...props}
      >
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-[#1B5BFF] bg-[#F2F6FF] dark:bg-[#1B5BFF]/10 p-4 my-6 rounded-r-lg"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto my-6 text-sm"
        {...props}
      >
        {children}
      </pre>
    ),
    // Custom components
    ProTip: ({ children }) => (
      <div className="bg-[#1B5BFF]/10 border border-[#1B5BFF]/20 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold mb-2 text-[#1B5BFF]">
          💡 Pro Tip
        </h3>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    ),
    FeatureCard: ({ title, children, icon }) => (
      <div className="bg-white/5 backdrop-blur border border-white/10 dark:border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-6 h-6 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">{icon || "✓"}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white dark:text-gray-900">
              {title}
            </h3>
            <div className="text-gray-300 dark:text-gray-700">{children}</div>
          </div>
        </div>
      </div>
    ),
    ...components,
  };
}
