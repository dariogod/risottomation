"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import { favorites } from "@/lib/data";

function DishCard({ dish, index }: { dish: typeof favorites[0]; index: number }) {
  return (
    <div 
      className="favorite-card relative scroll-snap-align-center"
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

  useEffect(() => {
    // Scroll to middle card on mount (mobile only)
    if (scrollRef.current && window.innerWidth < 768) {
      // Wait for layout to be ready
      setTimeout(() => {
        if (scrollRef.current) {
          const container = scrollRef.current;
          const middleIndex = Math.floor(favorites.length / 2);
          const firstCard = container.children[0] as HTMLElement;
          const cardWidth = firstCard.offsetWidth;
          const gap = 16; // 1rem gap
          const scrollPosition = middleIndex * (cardWidth + gap) - (container.clientWidth / 2) + (cardWidth / 2);
          container.scrollLeft = Math.max(0, scrollPosition);
        }
      }, 100);
    }
  }, []);

  return (
    <section id="favorites" className="py-20 px-4 bg-[#faf0d8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#4d0629] text-center mb-4">
          House favorites
        </h2>
        
        {/* Cards carousel */}
        <div className="relative">
          {/* Scrollable container - allows mobile swiping */}
          <div 
            ref={scrollRef}
            className="horizontal-scroll px-4 md:px-8 -mx-4 md:-mx-8 md:justify-center"
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
