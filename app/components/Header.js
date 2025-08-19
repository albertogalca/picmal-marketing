"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header({ toggleTheme, currentPage = "home" }) {
  return (
    <nav className="relative z-50 px-6 py-6 backdrop-blur-md transition-colors duration-300 bg-white/30 border-b border-[#CBDEFF]/20 dark:bg-black/50 dark:border-white/10">
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
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              Picmal
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`transition-colors ${
              currentPage === "home"
                ? "text-[#1B5BFF] dark:text-white"
                : "text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            {currentPage === "home" ? "Features" : "Home"}
          </Link>
          <a
            href="#pricing"
            className="transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white"
          >
            Pricing
          </a>
          <Link
            href="/blog"
            className={`transition-colors ${
              currentPage === "blog"
                ? "text-[#1B5BFF] dark:text-white"
                : "text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-full w-8 h-8 transition-colors mr-4 hover:bg-gray-200 text-gray-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
          >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
          </button>
          <a
            href="https://albertogalca.gumroad.com/l/picmal"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-6 py-2.5 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-medium"
          >
            Download for Mac
          </a>
        </div>
      </div>
    </nav>
  );
}
