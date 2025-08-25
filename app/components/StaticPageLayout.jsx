"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";

// Static page layout wrapper for legal pages and other static content
export function StaticPageLayout({ children, meta }) {
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
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-900 text-white" : "bg-[#F2F6FF] text-gray-900"
      }`}
    >
      {/* Background gradient */}
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-800"
            : "bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/20"
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2483FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1B5BFF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1
              className={`text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-white via-[#CBDEFF] to-[#2483FF]"
                  : "from-gray-900 via-[#1B5BFF] to-[#2483FF]"
              }`}
            >
              {meta?.title}
            </h1>
            {meta?.date && (
              <p
                className={`text-lg leading-relaxed ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {meta.date}
              </p>
            )}
          </header>

          {/* Content */}
          <div
            className={`prose prose-lg prose-picmal max-w-none ${
              isDark ? "prose-invert" : ""
            }`}
            role="main"
            aria-labelledby="page-title"
          >
            {children}
          </div>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}