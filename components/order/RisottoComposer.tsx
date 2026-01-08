"use client";

import React from "react";
import { RisottoBase, Topping } from "@/lib/types";
import { risottoBases, toppings } from "@/lib/data";

interface RisottoComposerProps {
  selectedBase?: RisottoBase;
  selectedToppings: Topping[];
  onBaseSelect: (base: RisottoBase) => void;
  onToppingToggle: (topping: Topping) => void;
}

export default function RisottoComposer({
  selectedBase,
  selectedToppings,
  onBaseSelect,
  onToppingToggle,
}: RisottoComposerProps) {
  const isToppingSelected = (topping: Topping) =>
    selectedToppings.some((t) => t.id === topping.id);

  return (
    <div className="space-y-8">
      {/* Base Selection */}
      <div>
        <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
          Choose your base
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {risottoBases.map((base) => {
            const isSelected = selectedBase?.id === base.id;
            return (
              <button
                key={base.id}
                onClick={() => onBaseSelect(base)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ease-in-out text-left ${
                  isSelected
                    ? "border-[#0066cc] bg-[#f0f7ff] shadow-md"
                    : "border-[#e5e5e5] bg-white hover:border-[#0066cc] hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a]">{base.name}</h4>
                    {base.description && (
                      <p className="text-[#333333] text-sm mt-1">
                        {base.description}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#0066cc] flex items-center justify-center flex-shrink-0 ml-2">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toppings Selection */}
      <div>
        <h3 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
          Choose your toppings (select multiple)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {toppings.map((topping) => {
            const isSelected = isToppingSelected(topping);
            return (
              <button
                key={topping.id}
                onClick={() => onToppingToggle(topping)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ease-in-out text-left ${
                  isSelected
                    ? "border-[#0066cc] bg-[#f0f7ff] shadow-sm"
                    : "border-[#e5e5e5] bg-white hover:border-[#0066cc]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1a1a1a]">
                    {topping.name}
                  </span>
                  {isSelected && (
                    <div className="w-4 h-4 rounded bg-[#0066cc] flex items-center justify-center flex-shrink-0 ml-2">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
