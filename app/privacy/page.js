"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p
              className={`text-xl leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Last updated: January 25, 2025
            </p>
          </header>

          <article
            className={`prose prose-lg max-w-none ${
              isDark ? "prose-invert" : ""
            }`}
          >
            <section className="mb-8">
              <h2>Our Commitment to Privacy</h2>
              <p>
                At Cantimplora Studio, LLC, we are committed to protecting your privacy. Picmal is designed with privacy as a fundamental principle. This Privacy Policy explains how we handle information when you use Picmal.
              </p>
              <div className="bg-[#1B5BFF]/10 border-l-4 border-[#1B5BFF] p-4 rounded-r-lg my-6">
                <p className="font-semibold text-[#1B5BFF] mb-2">Privacy-First Design</p>
                <p className="mb-0">
                  Picmal processes all images locally on your device. No images, personal data, or usage information is ever transmitted to our servers or any third parties.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2>Information We Don't Collect</h2>
              <p>Picmal does NOT collect, store, or transmit:</p>
              <ul>
                <li>Your images or any image data</li>
                <li>Personal information or identifiers</li>
                <li>Usage statistics or analytics</li>
                <li>Device information or system details</li>
                <li>Location data</li>
                <li>Contact information</li>
                <li>Any other personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>How Picmal Works</h2>
              <p>
                Picmal operates entirely offline on your macOS device. When you convert images:
              </p>
              <ul>
                <li>All processing happens locally on your Mac</li>
                <li>No internet connection is required for core functionality</li>
                <li>Images never leave your device</li>
                <li>No data is transmitted to external servers</li>
                <li>All converted files remain on your local storage</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Website Analytics</h2>
              <p>
                Our marketing website (picmal.app) may use standard web analytics to understand general usage patterns. This is separate from the Picmal application and does not track individual users or collect personal information.
              </p>
            </section>

            <section className="mb-8">
              <h2>Updates and Communication</h2>
              <p>
                Picmal may check for software updates periodically. This process:
              </p>
              <ul>
                <li>Only communicates with our update servers</li>
                <li>Does not transmit any personal data or images</li>
                <li>Only exchanges version information to check for updates</li>
                <li>Can be disabled in the application settings</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Third-Party Services</h2>
              <p>
                Picmal does not integrate with or transmit data to any third-party services, analytics platforms, or advertising networks. The application operates independently on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2>Data Security</h2>
              <p>
                Since Picmal processes everything locally and doesn't transmit data, your images and information remain under your complete control. We recommend:
              </p>
              <ul>
                <li>Keeping your macOS system updated for security</li>
                <li>Using appropriate file system permissions</li>
                <li>Following standard device security practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Children's Privacy</h2>
              <p>
                Picmal does not collect any personal information from users of any age. The application is safe for use by children as it operates entirely locally without any data transmission.
              </p>
            </section>

            <section className="mb-8">
              <h2>International Users</h2>
              <p>
                Since Picmal processes everything locally on your device, there are no international data transfer concerns. Your data remains within your jurisdiction and under your control.
              </p>
            </section>

            <section className="mb-8">
              <h2>Your Rights</h2>
              <p>
                Since we don't collect personal data, traditional data protection rights (access, deletion, portability) don't apply. However, you have complete control over:
              </p>
              <ul>
                <li>All images processed by Picmal</li>
                <li>Application settings and preferences</li>
                <li>Installation and removal of the software</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or Picmal's privacy practices, please contact us at:{" "}
                <a
                  href="mailto:support@picmal.app"
                  className="text-[#1B5BFF] hover:text-[#2483FF] cursor-pointer"
                >
                  support@picmal.app
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally to reflect changes in our practices or for legal reasons. Since Picmal's core privacy principles remain unchanged (local processing only), any updates will be posted here with a revised date.
              </p>
            </section>

            <section className="mb-8">
              <div className="bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded-r-lg">
                <p className="font-semibold text-emerald-600 mb-2">Summary</p>
                <p className="mb-0">
                  Picmal is designed to be completely private. Your images stay on your device, no personal data is collected, and no information is transmitted to external servers.
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}