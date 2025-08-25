"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ toggleTheme, currentPage = "home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 backdrop-blur-md transition-colors duration-300 bg-white/10 border-b border-[#CBDEFF]/20 dark:bg-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
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
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white transition-colors cursor-pointer"
          >
            <svg
              className={
                "h-6 w-6 transition-transform duration-300 ease-in-out " +
                (isMenuOpen ? "rotate-90" : "rotate-0")
              }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {currentPage === "home" ? (
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Features
            </a>
          ) : (
            <Link
              href="/#features"
              className="transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Features
            </Link>
          )}
{currentPage === "home" ? (
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              Pricing
            </a>
          ) : (
            <Link
              href="/#pricing"
              className="transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Pricing
            </Link>
          )}
          {currentPage === "home" ? (
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("testimonials")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              Testimonials
            </a>
          ) : (
            <Link
              href="/#testimonials"
              className="transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Testimonials
            </Link>
          )}
          {currentPage === "home" ? (
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("faq")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              FAQ
            </a>
          ) : (
            <Link
              href="/#faq"
              className="transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              FAQ
            </Link>
          )}
          <Link
            href="/blog"
            className={`transition-colors cursor-pointer ${
              currentPage === "blog"
                ? "text-[#1B5BFF] dark:text-white"
                : "text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            }`}
          >
            Blog
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-full w-8 h-8 transition-colors mr-4 hover:bg-gray-200 text-gray-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white cursor-pointer"
          >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:inline">☀️</span>
          </button>
          <a
            href="https://albertogalca.gumroad.com/l/picmal"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-6 py-2.5 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-medium cursor-pointer"
          >
            Download for Mac
          </a>
        </div>
      </div>
      <div
        className={
          "md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-[#CBDEFF]/20 dark:border-white/10 transition-all duration-300 ease-in-out overflow-hidden " +
          (isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <div className="px-6 py-4 space-y-4">
          {currentPage === "home" ? (
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById("features")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="block transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Features
            </a>
          ) : (
            <Link
              href="/#features"
              onClick={() => setIsMenuOpen(false)}
              className="block transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Features
            </Link>
          )}
{currentPage === "home" ? (
            <a
              href="#pricing"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById("pricing")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="block transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              Pricing
            </a>
          ) : (
            <Link
              href="/#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="block transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Pricing
            </Link>
          )}
          {currentPage === "home" ? (
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById("testimonials")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="block transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              Testimonials
            </a>
          ) : (
            <Link
              href="/#testimonials"
              onClick={() => setIsMenuOpen(false)}
              className="block transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              Testimonials
            </Link>
          )}
          {currentPage === "home" ? (
            <a
              href="#faq"
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(false);
                document.getElementById("faq")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="block transition-colors text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white cursor-pointer font-medium"
            >
              FAQ
            </a>
          ) : (
            <Link
              href="/#faq"
              onClick={() => setIsMenuOpen(false)}
              className="block transition-colors cursor-pointer text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white font-medium"
            >
              FAQ
            </Link>
          )}
          <Link
            href="/blog"
            onClick={() => setIsMenuOpen(false)}
            className={`block transition-colors cursor-pointer font-medium ${
              currentPage === "blog"
                ? "text-[#1B5BFF] dark:text-white"
                : "text-gray-600 hover:text-[#1B5BFF] dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 transition-colors hover:bg-gray-200 text-gray-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white cursor-pointer"
            >
              <span className="dark:hidden">🌙</span>
              <span className="hidden dark:inline">☀️</span>
            </button>
            <a
              href="https://albertogalca.gumroad.com/l/picmal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-4 py-2 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-medium text-sm cursor-pointer"
            >
              Download for Mac
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
