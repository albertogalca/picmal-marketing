"use client";

import { useState, useRef } from "react";

export default function VideoPlayer({ src, poster, className = "", isDark = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className={`relative max-w-5xl mx-auto ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B5BFF]/10 to-[#2483FF]/15 rounded-3xl blur-3xl"></div>
      <div
        className={`relative backdrop-blur-xl border rounded-3xl shadow-2xl overflow-hidden ${
          isDark
            ? "bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-white/10"
            : "bg-gradient-to-br from-white/90 to-[#F2F6FF]/90 border-[#CBDEFF]/30"
        }`}
      >
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer" onClick={handleVideoClick}>
          <video
            ref={videoRef}
            className="w-full h-auto"
            poster={poster}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all duration-300">
              <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-[#1B5BFF] ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}