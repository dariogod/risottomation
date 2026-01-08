import React from "react";

interface StepContentProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function StepContent({
  children,
  title,
  description,
}: StepContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-[#333333] text-lg">{description}</p>
        )}
      </div>
      <div className="fade-in">{children}</div>
    </div>
  );
}
