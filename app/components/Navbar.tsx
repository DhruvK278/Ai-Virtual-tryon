"use client";

import { Menu, ShoppingBag, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { clothingItems } from "@/lib/data";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const recommendations = searchQuery.trim()
    ? clothingItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const matchedItem = clothingItems.find(
      (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
    );

    if (matchedItem) {
      router.push(`/product/${matchedItem.id}`);
      setSearchQuery("");
      setShowDropdown(false);
    } else {
      
      if (recommendations.length > 0) {
        router.push(`/product/${recommendations[0].id}`);
        setSearchQuery("");
        setShowDropdown(false);
      } else {
        alert("Product not found");
      }
    }
  };

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
        <div className="relative hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="bg-transparent border border-white/20 rounded-full py-1 px-4 text-sm text-white focus:outline-none focus:border-white/60 transition-colors w-40 focus:w-60 duration-300"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {showDropdown && recommendations.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-black border border-white/20 rounded-lg mt-2 py-2 shadow-xl z-50 max-h-60 overflow-y-auto">
              {recommendations.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-white/10 cursor-pointer text-sm text-white/80 transition-colors flex items-center gap-3"
                  onClick={() => {
                    router.push(`/product/${item.id}`);
                    setSearchQuery("");
                    setShowDropdown(false);
                  }}
                >
                  <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>


        <button className="text-white/80 hover:text-white transition-colors relative">
          <ShoppingBag className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}