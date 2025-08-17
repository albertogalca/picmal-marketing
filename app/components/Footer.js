"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer({ isDark }) {
  return (
    <footer
      className={`relative z-10 px-6 py-16 border-t ${
        isDark ? "border-white/10" : "border-[#CBDEFF]/30 bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and Copyright */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.webp"
                alt="Picmal Logo"
                width={64}
                height={64}
                className="rounded-lg w-8 h-8 object-cover"
              />
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © 2025 Cantimplora Studio, LLC. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@picmal.app"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Get in touch
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/picmalapp"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Follow on X
                </a>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#download"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Download for Mac
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Changelog
                </Link>
              </li>
              <li>
                <a
                  href="https://apps.apple.com/app/picmal/id6739063162"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Picmal on App Store
                </a>
              </li>
            </ul>
          </div>

          {/* Compare with */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Compare with
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/compare/imageoptim"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  ImageOptim
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/squash"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Squash
                </Link>
              </li>
              <li>
                <Link
                  href="/compare/preview"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              className={`font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Feedback & Roadmap
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className={`text-sm transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Manage your license
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
