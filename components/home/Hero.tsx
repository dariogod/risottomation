"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero3.png"
          alt="Three bowls of delicious risotto"
          fill
          className="object-cover object-[30%_center] md:object-center"
          priority
          sizes="100vw"
        />
      </div>
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 z-0" />
      
      <div className="relative z-10 w-full px-4 text-center fade-in-up">
        {/* Title */}
        <h1 className="text-[clamp(2.5rem,12vw,6rem)] font-bold text-white mb-3 leading-tight tracking-tight px-2 drop-shadow-lg">
          Risottomation
        </h1>
        
        {/* Slogan */}
        <p className="relative z-20 text-xl md:text-2xl lg:text-3xl font-medium text-white mb-2 md:mb-4 px-2 drop-shadow-md">
          Automate the boring Risotto.
        </p>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="wave-divider wave-cream">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,118.89,111.31,176.24,92.22,246.72,68.62,269.58,66.39,321.39,56.44Z" fill="#faf0d8" />
        </svg>
      </div>
    </section>
  );
}
