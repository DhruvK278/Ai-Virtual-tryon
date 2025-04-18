"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4 border-b border-white">
      <div className="text-2xl font-bold">BrandLogo</div>

      <button 
        className="md:hidden"
        onClick={() => setIsMobile(!isMobile)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className={`absolute left-1/2 -translate-x-1/2 flex gap-6 ${
        isMobile ? "mobile" : ""
      }`}>
        <Link 
          href="/"
          className="block text-white no-underline uppercase tracking-[5px] font-mono font-semibold text-xl text-center px-8 py-3.5 transition-all duration-300 hover:text-[#4A4860] hover:bg-white hover:shadow-[0_4px_0_0_#ccc9cb]"
        >
          Home
        </Link>
        <Link 
          href="/about"
          className="block text-white no-underline uppercase tracking-[5px] font-mono font-semibold text-xl text-center px-8 py-3.5 transition-all duration-300 hover:text-[#4A4860] hover:bg-white hover:shadow-[0_4px_0_0_#ccc9cb]"
        >
          About
        </Link>
        <Link 
          href="/contact"
          className="block text-white no-underline uppercase tracking-[5px] font-mono font-semibold text-xl text-center px-8 py-3.5 transition-all duration-300 hover:text-[#4A4860] hover:bg-white hover:shadow-[0_4px_0_0_#ccc9cb]"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}