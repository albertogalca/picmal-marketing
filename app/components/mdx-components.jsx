"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

// Blog layout wrapper
export function BlogLayout({ children, meta }) {
  const [isDark, setIsDark] = React.useState(false);

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

      {/* Back to Blog Link */}
      <div className="relative z-10 px-6 pt-32 pb-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className={`inline-flex items-center text-sm font-medium transition-all duration-300 group cursor-pointer ${
              isDark
                ? "text-gray-400 hover:text-[#2483FF]"
                : "text-gray-500 hover:text-[#1B5BFF]"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1"
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
      <article className={`relative z-10 px-6 pb-20`}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  meta?.category === "Changelog"
                    ? "bg-[#1B5BFF]/10 text-[#1B5BFF]"
                    : meta?.category === "Guide"
                    ? "bg-emerald-500/10 text-emerald-600"
                    : "bg-purple-500/10 text-purple-600"
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
              className={`text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-white via-[#CBDEFF] to-[#2483FF]"
                  : "from-gray-900 via-[#1B5BFF] to-[#2483FF]"
              }`}
            >
              {meta?.title}
            </h1>

            <p
              className={`text-xl leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {meta?.description}
            </p>
          </header>

          {/* Content */}
          <div
            className={`prose prose-lg prose-picmal max-w-none ${
              isDark ? "prose-invert" : ""
            }`}
            role="main"
            aria-labelledby="article-title"
          >
            {children}
          </div>

          {/* Download CTA */}
          <div
            className="mt-16 text-center"
          >
            <div
              className={`border rounded-2xl p-8 ${
                isDark
                  ? "bg-slate-800/30 border-white/10"
                  : "bg-white/80 border-[#CBDEFF]/30"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Ready to start converting images?
              </h3>
              <a
                href="https://albertogalca.gumroad.com/l/picmal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-8 py-3 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-medium text-lg cursor-pointer"
              >
                Download Picmal
              </a>
              <p
                className={`mt-4 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                $8 • One-time purchase • macOS Sonoma or later
              </p>
            </div>
          </div>
        </div>
      </article>

      <Footer isDark={isDark} />
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
