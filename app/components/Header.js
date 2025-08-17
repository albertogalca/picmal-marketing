"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({ isDark, toggleTheme, currentPage = "home" }) {
  return (
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
              currentPage === "home"
                ? isDark
                  ? "text-white"
                  : "text-[#1B5BFF]"
                : isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-[#1B5BFF]"
            }`}
          >
            {currentPage === "home" ? "Features" : "Home"}
          </Link>
          <a
            href="#pricing"
            className={`transition-colors ${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-[#1B5BFF]"
            }`}
          >
            Pricing
          </a>
          <Link
            href="/blog"
            className={`transition-colors ${
              currentPage === "blog"
                ? isDark
                  ? "text-white"
                  : "text-[#1B5BFF]"
                : isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-[#1B5BFF]"
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
  );
}