"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getLatestChangelogPost } from "./data/blogPosts";

function FAQAccordion({ isDark }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is Picmal available for Windows or Linux?",
      answer:
        "Picmal is a native Mac app, so it's only available for Mac. For now and forever.",
    },
    {
      question: "Is my privacy protected?",
      answer:
        "Absolutely. All image processing happens locally on your Mac, and no photos are ever uploaded to any servers.",
    },
    {
      question: "What image formats does Picmal support?",
      answer:
        "Picmal supports 20+ formats including JPEG, PNG, WEBP, AVIF, HEIC, RAW (CR2, NEF, ARW), TIFF, PSD, GIF, BMP, SVG, EPS, AI, ICO, and more.",
    },
    {
      question: "Can I convert multiple images at once?",
      answer:
        "Yes! Picmal excels at batch processing. Simply drag and drop multiple images, or even entire folders, and convert them all at once.",
    },
    {
      question: "What macOS versions are supported?",
      answer:
        "Picmal requires macOS Sonoma (14.0) or later. It's optimized for Apple Silicon Macs but also works great on Intel Macs.",
    },
    {
      question: "Do I need an internet connection to use Picmal?",
      answer:
        "No internet connection is required after installation. Picmal works completely offline, ensuring your images never leave your device.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFAQ(index);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = (index + 1) % faqs.length;
      document.getElementById(`faq-button-${nextIndex}`)?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const prevIndex = index === 0 ? faqs.length - 1 : index - 1;
      document.getElementById(`faq-button-${prevIndex}`)?.focus();
    }
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`backdrop-blur border rounded-2xl transition-all duration-300 ${
            isDark
              ? "bg-white/5 border-white/10 hover:bg-white/10"
              : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white"
          }`}
        >
          <button
            id={`faq-button-${index}`}
            className="w-full p-6 flex items-center justify-between text-left focus:outline-none rounded-2xl"
            onClick={() => toggleFAQ(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
          >
            <h3
              className={`text-lg font-semibold pr-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {faq.question}
            </h3>
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                isDark ? "bg-white/10" : "bg-[#1B5BFF]/10"
              } ${openIndex === index ? "rotate-180" : ""}`}
              aria-hidden="true"
            >
              <svg
                className={`w-4 h-4 ${
                  isDark ? "text-white" : "text-[#1B5BFF]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </button>

          <div
            id={`faq-content-${index}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={openIndex !== index}
          >
            <div className="px-6 pb-6">
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } leading-relaxed`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const latestChangelog = getLatestChangelogPost();

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
        isDark ? "bg-black text-white" : "bg-[#F2F6FF] text-gray-900"
      }`}
    >
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1B5BFF] text-white px-4 py-2 rounded-md z-[100] focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>

      {/* Background gradient */}
      <div
        className={`fixed inset-0 transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-br from-[#1B5BFF]/10 via-black to-[#2483FF]/15"
            : "bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/30"
        }`}
      ></div>

      <Header isDark={isDark} toggleTheme={toggleTheme} currentPage="home" />

      {/* Hero Section */}
      <main id="main-content" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center space-x-2 backdrop-blur border rounded-full px-4 py-2 mb-8 ${
              isDark
                ? "bg-white/5 border-white/10"
                : "bg-white/80 border-[#CBDEFF]/50"
            }`}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] rounded-full"></div>
            <a
              href={`/blog/${latestChangelog.slug}`}
              className={`text-sm transition-colors hover:text-[#1B5BFF] ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {latestChangelog.title.replace(/^Picmal\s+/, "")}
            </a>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight prose-headings">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark
                  ? "from-white via-gray-200 to-gray-400"
                  : "from-gray-900 via-gray-700 to-gray-600"
              }`}
            >
              Fast image conversion
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#1B5BFF] via-[#2483FF] to-[#CBDEFF] bg-clip-text text-transparent">
              built for Mac
            </span>
          </h1>

          <p
            className={`text-xl mb-12 max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Picmal is a lightweight, privacy-first image converter built
            exclusively for macOS. Designed to feel right at home on your Mac,
            Picmal makes converting images fast, simple, and secure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="group bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-8 py-4 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-semibold text-lg shadow-2xl">
              <span className="flex items-center space-x-2">
                <span>Download Picmal</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div className="text-sm text-gray-500">
              $8 • macOS Sonoma or later
            </div>
          </div>

          {/* App Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B5BFF]/15 to-[#2483FF]/20 rounded-3xl blur-3xl"></div>
            <div
              className={`relative backdrop-blur-xl border rounded-3xl p-12 shadow-2xl ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-white/10"
                  : "bg-gradient-to-br from-white/95 to-[#F2F6FF]/95 border-[#CBDEFF]/30"
              }`}
            >
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/picmal-main.webp"
                  alt="Picmal App Interface"
                  width={1200}
                  height={800}
                  className="w-full h-auto shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className={`relative z-10 px-6 py-20 ${isDark ? "" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? "from-white to-gray-300"
                    : "from-gray-900 to-gray-600"
                }`}
              >
                Why choose Picmal?
              </span>
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Designed specifically for macOS with the features you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className={`group backdrop-blur border rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white"
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Native macOS Experience
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Crafted specifically for macOS with a clean, responsive UI that
                feels seamless and intuitive.
              </p>
            </div>

            <div
              className={`group backdrop-blur border rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white"
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2483FF] to-[#CBDEFF] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 3v6h8l-1 13H4L3 9h8V3h2z" />
                </svg>
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Batch Processing
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Convert dozens—or hundreds—of images at once. Drag. Drop. Done.
              </p>
            </div>

            <div
              className={`group backdrop-blur border rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white"
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-[#1B5BFF] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 1v6h5l-2 14H8L6 7h5V1h2z" />
                </svg>
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Fast & Local
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No uploads. No waiting. All conversions happen instantly on your
                device.
              </p>
            </div>

            <div
              className={`group backdrop-blur border rounded-2xl p-6 transition-all duration-300 ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/80 border-[#CBDEFF]/30 hover:bg-white"
              }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#CBDEFF] to-[#1B5BFF] rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              </div>
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                100% Private
              </h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your images never leave your Mac. No cloud. No tracking. No
                compromise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-white to-gray-300" : "from-gray-900 to-gray-600"
              }`}
            >
              See Picmal in action
            </span>
          </h2>
          <p
            className={`text-xl mb-16 max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Watch how easy it is to convert images with just a few clicks
          </p>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B5BFF]/10 to-[#2483FF]/15 rounded-3xl blur-3xl"></div>
            <div
              className={`relative backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
                isDark
                  ? "bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-white/10"
                  : "bg-gradient-to-br from-white/90 to-[#F2F6FF]/90 border-[#CBDEFF]/30"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden">
                <video
                  controls
                  className="w-full h-auto"
                  poster="/picmal-main.webp"
                >
                  <source src="/picmal-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span
                className={`bg-gradient-to-r bg-clip-text text-transparent ${
                  isDark
                    ? "from-white to-gray-300"
                    : "from-gray-900 to-gray-600"
                }`}
              >
                💬 Frequently Asked Questions
              </span>
            </h2>
          </div>

          <FAQAccordion isDark={isDark} />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">
            <span
              className={`bg-gradient-to-r bg-clip-text text-transparent ${
                isDark ? "from-white to-gray-300" : "from-gray-900 to-gray-600"
              }`}
            >
              Simple, one-time purchase
            </span>
          </h2>

          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B5BFF]/20 to-[#2483FF]/25 rounded-3xl blur-2xl"></div>
            <div
              className={`relative backdrop-blur border rounded-3xl p-8 ${
                isDark
                  ? "bg-white/5 border-white/10"
                  : "bg-white/90 border-[#CBDEFF]/30"
              }`}
            >
              <div className="text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] bg-clip-text text-transparent">
                  $8
                </span>
              </div>
              <div
                className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                One-time purchase
              </div>

              <ul className="text-left space-y-4 mb-8">
                {[
                  "20+ supported formats",
                  "Batch conversion",
                  "100% local processing",
                  "Native macOS design",
                  "Metadata management",
                  "Free updates",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="https://albertogalca.gumroad.com/l/picmal"
                rel="noopener noreferrer"
                target="_blank"
                className="w-full bg-gradient-to-r block from-[#1B5BFF] to-[#2483FF] text-white py-4 rounded-2xl hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-semibold text-lg"
              >
                Download Picmal
              </a>
              <div className="text-sm text-gray-500 mt-4">
                macOS Sonoma or later required
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer isDark={isDark} />
    </div>
  );
}
