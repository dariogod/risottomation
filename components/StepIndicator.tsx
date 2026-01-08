import React from "react";
import { OrderStep } from "@/lib/types";

interface StepIndicatorProps {
  steps: OrderStep[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[#e5e5e5] z-0" />
        <div
          className="absolute top-6 left-0 h-0.5 bg-[#0066cc] z-0 transition-all duration-300 ease-in-out"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Step circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ease-in-out ${
                  isActive
                    ? "bg-[#0066cc] border-[#0066cc] text-white"
                    : isCompleted
                      ? "bg-[#0066cc] border-[#0066cc] text-white"
                      : "bg-white border-[#e5e5e5] text-[#999999]"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6"
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
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </div>

              {/* Step title */}
              <div className="mt-3 text-center max-w-[120px]">
                <p
                  className={`text-sm font-medium ${
                    isActive || isCompleted
                      ? "text-[#0066cc]"
                      : "text-[#999999]"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
