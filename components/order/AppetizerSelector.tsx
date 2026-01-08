"use client";

import React from "react";
import { AppetizerOption } from "@/lib/types";
import { appetizers } from "@/lib/data";

interface AppetizerSelectorProps {
  selectedAppetizer?: AppetizerOption;
  onSelect: (appetizer: AppetizerOption) => void;
}

export default function AppetizerSelector({
  selectedAppetizer,
  onSelect,
}: AppetizerSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {appetizers.map((appetizer) => {
        const isSelected = selectedAppetizer?.id === appetizer.id;
        return (
          <button
            key={appetizer.id}
            onClick={() => onSelect(appetizer)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ease-in-out text-left ${
              isSelected
                ? "border-[#0066cc] bg-[#f0f7ff] shadow-md"
                : "border-[#e5e5e5] bg-white hover:border-[#0066cc] hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-[#1a1a1a]">
                {appetizer.name}
              </h3>
              {isSelected && (
                <div className="w-6 h-6 rounded-full bg-[#0066cc] flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
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
            {appetizer.description && (
              <p className="text-[#333333] text-sm">{appetizer.description}</p>
            )}
          </button>
        );
      })}
    </div>
  );
}
