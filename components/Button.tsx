import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "coral" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[#FFC107] text-[#1a1a1a] hover:bg-[#FFB300] hover:shadow-lg active:scale-95 focus:ring-[#FFC107] shadow-md",
    secondary:
      "bg-white text-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#f5f5f5] hover:shadow-lg active:scale-95 focus:ring-[#1a1a1a]",
    coral:
      "bg-[#FFC107] text-[#1a1a1a] hover:bg-[#FFB300] hover:shadow-lg active:scale-95 focus:ring-[#FFC107] shadow-md",
    outline:
      "bg-transparent text-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white active:scale-95 focus:ring-[#1a1a1a]",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}
