"use client";

import React from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { favorites } from "@/lib/data";

export default function Favorites() {
  return (
    <section id="favorites" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-4">
          House favorites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {favorites.map((dish) => (
            <Card key={dish.id} dish={dish} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button href="/order" variant="primary">
            Create your own
          </Button>
        </div>
      </div>
    </section>
  );
}
