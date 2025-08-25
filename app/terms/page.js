"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Terms() {
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
              Terms of Use
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
              <h2>Agreement to Terms</h2>
              <p>
                By downloading, installing, or using Picmal ("the Software"), you agree to be bound by these Terms of Use ("Terms"). If you do not agree to these Terms, do not download, install, or use the Software.
              </p>
            </section>

            <section className="mb-8">
              <h2>Description of Service</h2>
              <p>
                Picmal is a native macOS application for image format conversion and processing. The Software operates entirely locally on your device and does not require an internet connection for core functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2>License Grant</h2>
              <p>
                Subject to these Terms, Cantimplora Studio, LLC grants you a limited, non-exclusive, non-transferable license to:
              </p>
              <ul>
                <li>Install and use the Software on devices you own or control</li>
                <li>Use the Software for personal or commercial purposes</li>
                <li>Convert and process your own images using the Software</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Restrictions</h2>
              <p>You may not:</p>
              <ul>
                <li>Reverse engineer, decompile, or disassemble the Software</li>
                <li>Distribute, rent, lease, or sublicense the Software</li>
                <li>Remove or modify any copyright notices or proprietary markings</li>
                <li>Use the Software for illegal purposes or in violation of any laws</li>
                <li>Attempt to circumvent any licensing or usage restrictions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2>Privacy and Data Processing</h2>
              <p>
                Picmal processes images entirely locally on your device. No images, personal data, or usage information is transmitted to our servers or third parties. For complete privacy details, please review our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2>Updates and Support</h2>
              <p>
                We may provide updates to the Software from time to time. Updates may include new features, bug fixes, or security improvements. Support is provided on a best-effort basis through our official channels.
              </p>
            </section>

            <section className="mb-8">
              <h2>Disclaimer of Warranties</h2>
              <p>
                THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-8">
              <h2>Limitation of Liability</h2>
              <p>
                IN NO EVENT SHALL CANTIMPLORA STUDIO, LLC BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE USE OF THE SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section className="mb-8">
              <h2>Termination</h2>
              <p>
                This license is effective until terminated. You may terminate it at any time by uninstalling the Software. We may terminate this license if you breach these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the jurisdiction where Cantimplora Studio, LLC is registered, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2>Contact Information</h2>
              <p>
                If you have questions about these Terms, please contact us at:{" "}
                <a
                  href="mailto:support@picmal.app"
                  className="text-[#1B5BFF] hover:text-[#2483FF] cursor-pointer"
                >
                  support@picmal.app
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Software after changes constitutes acceptance of the modified Terms.
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}