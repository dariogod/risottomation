"use client";

import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-32 bg-gradient-to-br from-[#FFEB3B] via-[#FFC107] to-[#FFB300] overflow-hidden summer-dot-pattern">
      {/* Summer gradient overlay */}
      <div className="absolute inset-0 summer-gradient-overlay" />
      
      {/* Background decoration - bright summer circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF9800]/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full px-4 text-center fade-in-up">
        {/* Title */}
        <h1 className="text-[clamp(2.5rem,12vw,6rem)] font-bold text-[#4d0629] mb-3 leading-tight tracking-tight px-2">
          Risottomation
        </h1>
        
        {/* Slogan */}
        <p className="text-xl md:text-2xl lg:text-3xl font-medium text-[#4d0629] mb-8 md:mb-12 px-2">
          Fast food, but good.
        </p>
        
        {/* Risotto bowl image */}
        <div className="relative w-full float -mx-4 md:mx-auto md:w-auto">
          <div className="relative w-full aspect-square md:w-96 md:h-96 md:mx-auto">
            <Image
              src="/risotto-bowl-2.png"
              alt="Delicious risotto bowl with pumpkin, mushrooms, chorizo, and seeds"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="100vw"
            />
          </div>
          
          {/* Decorative elements around bowl */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/40 rounded-full blur-sm hidden md:block" />
          <div className="absolute -bottom-2 -left-6 w-20 h-20 bg-white/30 rounded-full blur-sm hidden md:block" />
        </div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="wave-divider wave-cream">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,118.89,111.31,176.24,92.22,246.72,68.62,269.58,66.39,321.39,56.44Z" fill="#faf0d8" />
        </svg>
      </div>
    </section>
  );
}
