'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Blog layout wrapper
export function BlogLayout({ children, meta }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-black text-white' 
        : 'bg-[#F2F6FF] text-gray-900'
    }`}>
      {/* Background gradient */}
      <div className={`fixed inset-0 transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-[#1B5BFF]/10 via-black to-[#2483FF]/15'
          : 'bg-gradient-to-br from-[#F2F6FF] via-white to-[#CBDEFF]/30'
      }`}></div>
      
      {/* Navigation */}
      <nav className={`relative z-50 px-6 py-6 backdrop-blur-md transition-colors duration-300 ${
        isDark 
          ? 'bg-black/50 border-b border-white/10'
          : 'bg-white/80 border-b border-[#CBDEFF]/30'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Picmal</div>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/blog" className={`transition-colors ${
              isDark 
                ? 'text-gray-300 hover:text-white' 
                : 'text-gray-600 hover:text-[#1B5BFF]'
            }`}>← Back to Blog</Link>
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                isDark 
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                meta?.category === 'Changelog'
                  ? 'bg-[#1B5BFF]/20 text-[#1B5BFF]'
                  : meta?.category === 'Guide'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {meta?.category || 'Article'}
              </span>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {meta?.date} • {meta?.readTime}
              </span>
            </div>
            
            <h1 id="article-title" className={`text-4xl md:text-5xl font-bold mb-6 leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {meta?.title}
            </h1>
            
            <p className={`text-xl leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {meta?.description}
            </p>
          </header>

          {/* Content */}
          <div className={`prose prose-lg prose-picmal max-w-none ${
            isDark ? 'prose-invert' : ''
          }`} role="main" aria-labelledby="article-title">
            {children}
          </div>

          {/* Download CTA */}
          <div className="mt-12 text-center">
            <button className="bg-gradient-to-r from-[#1B5BFF] to-[#2483FF] text-white px-8 py-4 rounded-full hover:from-[#2483FF] hover:to-[#1B5BFF] transition-all duration-300 font-semibold text-lg shadow-2xl">
              Download Picmal
            </button>
            <p className={`mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              $8 • One-time purchase • macOS Sonoma or later
            </p>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className={`relative z-10 px-6 py-12 border-t ${
        isDark 
          ? 'border-white/10'
          : 'border-[#CBDEFF]/30 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Picmal</div>
          </div>
          <p className={`mb-6 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>Privacy-first image conversion for Mac</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <a href="mailto:support@picmal.app" className="hover:text-[#1B5BFF] transition-colors">Support</a>
            <span>•</span>
            <span>Version 1.0.5</span>
            <span>•</span>
            <span>Made with ❤️ for Mac</span>
          </div>
        </div>
      </footer>
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
      <h2 className="text-2xl font-semibold mb-4 text-[#1B5BFF] mt-8" {...props}>
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
      <a className="text-[#1B5BFF] hover:text-[#2483FF] font-medium hover:underline transition-colors" {...props}>
        {children}
      </a>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-[#1B5BFF] bg-[#F2F6FF] dark:bg-[#1B5BFF]/10 p-4 my-6 rounded-r-lg" {...props}>
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto my-6 text-sm" {...props}>
        {children}
      </pre>
    ),
    // Custom components
    ProTip: ({ children }) => (
      <div className="bg-[#1B5BFF]/10 border border-[#1B5BFF]/20 rounded-xl p-6 my-6">
        <h3 className="text-lg font-semibold mb-2 text-[#1B5BFF]">💡 Pro Tip</h3>
        <div className="text-gray-700 dark:text-gray-300">{children}</div>
      </div>
    ),
    FeatureCard: ({ title, children, icon }) => (
      <div className="bg-white/5 backdrop-blur border border-white/10 dark:border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="w-6 h-6 bg-gradient-to-br from-[#1B5BFF] to-[#2483FF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-xs font-bold">{icon || '✓'}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white dark:text-gray-900">{title}</h3>
            <div className="text-gray-300 dark:text-gray-700">{children}</div>
          </div>
        </div>
      </div>
    ),
    ...components,
  };
}