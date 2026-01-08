import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Risottomation - Fast food, but good.",
  description: "Create your own custom risotto bowl. Choose your spritz, appetizer, and compose your perfect risotto with our selection of bases and toppings.",
};

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf0d8]/95 backdrop-blur-sm border-b border-yellow-200">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-[#4d0629] text-2xl font-bold tracking-tight">
          Risottomation
        </Link>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
