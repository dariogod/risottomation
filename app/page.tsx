"use client";

import Hero from "@/components/home/Hero";
import VideoSection from "@/components/home/VideoSection";
import Favorites from "@/components/home/Favorites";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      
      // Check if scrolled to bottom (with a small threshold for better UX)
      const threshold = 100; // pixels from bottom
      const isBottom = scrollTop + windowHeight >= documentHeight - threshold;
      
      setIsAtBottom(isBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <Hero />
      <VideoSection />
      <Favorites />
      
      {/* QR Code Button - Only visible when scrolled to bottom */}
      {isAtBottom && (
        <div className="flex justify-end pb-6 pr-6 bg-[#faf0d8] pt-4">
          <Link
            href="/qr-code"
            className="bg-[#4d0629] hover:bg-[#4d0629]/90 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            aria-label="View QR Code"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z"
              />
            </svg>
          </Link>
        </div>
      )}
    </main>
  );
}
