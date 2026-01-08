"use client";

import React from "react";
import Button from "@/components/Button";

export default function OrderCTA() {
  return (
    <section className="relative py-24 px-4 bg-[#0a1628] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#3366ff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#ff6b4a]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to automate your hunger?
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          Create your perfect risotto bowl in just a few clicks.
        </p>
        <Button href="/order" variant="coral" className="text-lg px-10 py-4">
          Order online
        </Button>
      </div>
    </section>
  );
}

