import React from "react";
import { Dish } from "@/lib/types";

interface CardProps {
  dish: Dish;
  onClick?: () => void;
  className?: string;
}

export default function Card({ dish, onClick, className = "" }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-[#e5e5e5] p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 ease-in-out cursor-pointer ${className}`}
    >
      {dish.image && (
        <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Image placeholder</span>
        </div>
      )}
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">
        {dish.name}
      </h3>
      <p className="text-[#333333] text-sm mb-4 line-clamp-2">
        {dish.description}
      </p>
      {dish.allergens && dish.allergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {dish.allergens.map((allergen, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#0066cc] rounded-full"
            >
              {allergen}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
