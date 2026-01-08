"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { favorites } from "@/lib/data";

function DishCard({ dish, index }: { dish: typeof favorites[0]; index: number }) {
  return (
    <div 
      className="favorite-card relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Dish image */}
      {dish.image && (
        <div className="image-circle mx-auto mb-6 overflow-hidden">
          <Image
            src={dish.image}
            alt={dish.name}
            width={180}
            height={180}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* Dish name */}
      <h3 className="text-2xl font-bold text-[#4d0629] text-center mb-4">
        {dish.name}
      </h3>
      
      {/* Description */}
      <p className="text-[#4d0629]/70 text-sm text-center leading-relaxed">
        {dish.description}
      </p>
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
    <section id="favorites" className="py-20 px-4 bg-[#faf0d8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#4d0629] text-center mb-4">
          House favorites
        </h2>
        
        {/* Cards carousel */}
        <div className="relative">
          {/* Scroll buttons for desktop */}
          <button
            onClick={() => scroll("left")}
            className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white text-[#4d0629] items-center justify-center shadow-lg hover:bg-[#f5f5f5] transition-all ${
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
            className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-white text-[#4d0629] items-center justify-center shadow-lg hover:bg-[#f5f5f5] transition-all ${
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
          <Button href="/order" variant="coral" className="text-lg px-8 py-4 bg-white text-[#4d0629] hover:bg-[#f5f5f5] border-0 shadow-lg">
            Order online
          </Button>
        </div>
      </div>
    </section>
  );
}
