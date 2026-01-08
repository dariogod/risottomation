"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Only show header on order pages, not on home page
  const isOrderPage = pathname?.startsWith("/order");

  useEffect(() => {
    if (!isOrderPage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOrderPage]);

  if (!isOrderPage) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#FFC107] backdrop-blur-sm transition-all ${
        isScrolled ? "border-b border-yellow-200" : "border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-[#4d0629] text-2xl font-bold tracking-tight">
          Risottomation
        </Link>
      </div>
    </header>
  );
}
