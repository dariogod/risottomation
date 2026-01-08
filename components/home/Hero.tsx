"use client";

import React from "react";
import Button from "@/components/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-white fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] mb-6 leading-tight">
          Risottomation
        </h1>
        <p className="text-xl md:text-2xl text-[#333333] mb-12 font-light">
          Fast food, but good.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href="/order" variant="primary">
            Create your own
          </Button>
          <Button href="#favorites" variant="secondary">
            Check our menu
          </Button>
        </div>
      </div>
    </section>
  );
}
