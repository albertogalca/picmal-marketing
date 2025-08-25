"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 px-6 py-16 border-t border-[#CBDEFF]/30 bg-white dark:border-white/10 dark:bg-transparent">
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
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Cantimplora Studio, LLC. All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:support@picmal.app"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Get in touch
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/picmalapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Follow on X
                </a>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <a
                  href="https://albertogalca.gumroad.com/l/picmal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Download for Mac
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/blog"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-sm transition-colors text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                >
                  Feedback & Roadmap
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
