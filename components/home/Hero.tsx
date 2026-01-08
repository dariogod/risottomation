"use client";

import React from "react";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-32 bg-[#0a1628] overflow-hidden">
      {/* Background decoration - subtle gradient circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3366ff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3366ff]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-lg mx-auto text-center fade-in-up">
        {/* Title */}
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-2 leading-tight tracking-tight">
          Risottomation
        </h1>
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-white/90 mb-6">
          Risotto Bowl
        </h2>
        
        {/* Slogan */}
        <p className="text-lg md:text-xl text-white/70 mb-10 italic">
          Fast food, but good.
        </p>
        
        {/* Risotto bowl image placeholder */}
        <div className="relative mx-auto mb-12 float">
          <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full bg-gradient-to-br from-[#f5f3ef] to-[#ebe8e2] shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/20">
            <div className="text-center p-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 text-[#0a1628]/30"
                fill="currentColor"
              >
                <ellipse cx="50" cy="55" rx="40" ry="25" />
                <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M20 45 Q50 35 80 45" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="35" cy="48" r="4" />
                <circle cx="50" cy="45" r="5" />
                <circle cx="65" cy="48" r="4" />
                <circle cx="42" cy="55" r="3" />
                <circle cx="58" cy="55" r="3" />
              </svg>
              <span className="text-sm text-[#0a1628]/50 font-medium">
                Risotto Bowl
              </span>
            </div>
          </div>
          
          {/* Decorative elements around bowl */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#ff6b4a]/20 rounded-full blur-sm" />
          <div className="absolute -bottom-2 -left-6 w-16 h-16 bg-[#3366ff]/20 rounded-full blur-sm" />
        </div>
        
        {/* CTA Button */}
        <Button href="/order" variant="coral" className="text-lg px-8 py-4">
          Order online
        </Button>
        
        {/* Secondary link */}
        <div className="mt-6">
          <a 
            href="#favorites" 
            className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
          >
            Or check our menu
          </a>
        </div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="wave-divider wave-cream">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,118.89,111.31,176.24,92.22,246.72,68.62,269.58,66.39,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
