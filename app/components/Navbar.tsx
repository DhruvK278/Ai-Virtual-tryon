"use client";

import { Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-black text-white px-8 py-4 border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-black/80">
      <div className="flex items-center gap-4">
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setIsMobile(!isMobile)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="text-3xl font-bourbon tracking-wider">BrandLogo</div>
      </div>

      <div className={`absolute left-1/2 -translate-x-1/2 hidden md:flex gap-12 ${isMobile ? "!flex flex-col absolute top-full left-0 w-full bg-black border-b border-white/10 p-8 translate-x-0 items-center justify-center gap-8 z-40" : ""
        }`}>
        <Link
          href="/"
          className="text-white/80 hover:text-white no-underline uppercase tracking-[0.2em] font-italian text-sm transition-all duration-300 hover:scale-105"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-white/80 hover:text-white no-underline uppercase tracking-[0.2em] font-italian text-sm transition-all duration-300 hover:scale-105"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="text-white/80 hover:text-white no-underline uppercase tracking-[0.2em] font-italian text-sm transition-all duration-300 hover:scale-105"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white/80 hover:text-white transition-colors">
          <ShoppingBag className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}