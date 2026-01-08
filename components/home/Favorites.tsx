"use client";

import React, { useRef, useState } from "react";
import Button from "@/components/Button";
import { favorites } from "@/lib/data";

function AllergenIcon({ className = "" }: { className?: string }) {
  return (
    <button
      className={`w-8 h-8 rounded-full bg-[#0a1628] text-white flex items-center justify-center text-sm font-bold hover:bg-[#152238] transition-colors ${className}`}
      aria-label="Allergen information"
    >
      i
    </button>
  );
}

function DishCard({ dish, index }: { dish: typeof favorites[0]; index: number }) {
  const [showAllergens, setShowAllergens] = useState(false);
  
  return (
    <div 
      className="favorite-card relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Allergen info button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowAllergens(!showAllergens)}
          className="w-8 h-8 rounded-full bg-[#FFC107] text-[#1a1a1a] flex items-center justify-center text-sm font-bold hover:bg-[#FFB300] transition-colors shadow-md"
          aria-label="Allergen information"
        >
          i
        </button>
      </div>
      
      {/* Allergen popup */}
      {showAllergens && (
        <div className="absolute top-14 right-4 bg-white rounded-lg shadow-xl p-3 z-20 min-w-[160px] border-2 border-[#FFC107]">
          <p className="text-xs font-semibold text-[#1a1a1a] mb-1">Allergens</p>
          <p className="text-xs text-[#1a1a1a]/70">
            {dish.allergens?.join(", ") || "None"}
          </p>
        </div>
      )}
      
      {/* Image placeholder */}
      <div className="image-circle mx-auto mb-6">
        <div className="text-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            className="w-20 h-20 mx-auto text-[#FFC107]/40"
            fill="currentColor"
          >
            <ellipse cx="50" cy="55" rx="40" ry="25" />
            <ellipse cx="50" cy="50" rx="40" ry="25" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="35" cy="48" r="4" />
            <circle cx="50" cy="45" r="5" />
            <circle cx="65" cy="48" r="4" />
          </svg>
        </div>
      </div>
      
      {/* Dish name */}
      <h3 className="text-2xl font-bold text-[#1a1a1a] text-center mb-4">
        {dish.name}
      </h3>
      
      {/* Description */}
      <p className="text-[#1a1a1a]/70 text-sm text-center mb-6 leading-relaxed">
        {dish.description}
      </p>
      
      {/* Order button */}
      <div className="flex justify-center">
        <Button href="/order" variant="coral" className="text-sm bg-[#FFC107] text-[#1a1a1a] hover:bg-[#FFB300] border-0">
          Order online
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default function Favorites() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="favorites" className="py-20 px-4 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">
          House favorites
        </h2>
        <p className="text-[#1a1a1a]/60 text-center mb-12 max-w-md mx-auto">
          Our most popular creations, crafted with love and a bit of startup magic
        </p>
        
        {/* Cards carousel */}
        <div className="relative">
          {/* Scroll buttons for desktop */}
          <button
            onClick={() => scroll("left")}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-[#FFC107] text-[#1a1a1a] items-center justify-center shadow-lg hover:bg-[#FFB300] transition-all ${
              !canScrollLeft ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => scroll("right")}
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#FFC107] text-[#1a1a1a] items-center justify-center shadow-lg hover:bg-[#FFB300] transition-all ${
              !canScrollRight ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="horizontal-scroll px-4 md:px-8 -mx-4 md:-mx-8"
          >
            {favorites.map((dish, index) => (
              <DishCard key={dish.id} dish={dish} index={index} />
            ))}
          </div>
        </div>
        
        {/* Order online button */}
        <div className="flex justify-center mt-12">
          <Button href="/order" variant="coral" className="text-lg px-8 py-4 bg-[#FFC107] text-[#1a1a1a] hover:bg-[#FFB300] border-0 shadow-lg">
            Order online
          </Button>
        </div>
      </div>
    </section>
  );
}
