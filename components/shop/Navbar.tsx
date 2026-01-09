"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext"; // Import the hook

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart(); // Get the real count

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-widest text-black">
            MOONLIGHT
          </Link>

          {/* 2. Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-black transition uppercase text-xs tracking-widest">
              Home
            </Link>
            <Link href="/shop" className="text-gray-800 hover:text-black transition uppercase text-xs tracking-widest">
              Collection
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-black transition uppercase text-xs tracking-widest">
              Our Story
            </Link>
          </div>

          {/* 3. Icons (Cart & Profile) */}
          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative text-gray-800 hover:text-black transition">
              <ShoppingBag size={20} />
              
              {/* Dynamic Cart Badge */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link href="/login" className="text-gray-800 hover:text-black transition">
              <User size={20} />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-800 uppercase text-xs tracking-widest">Home</Link>
            <Link href="/shop" className="block px-3 py-2 text-gray-800 uppercase text-xs tracking-widest">Collection</Link>
          </div>
        </div>
      )}
    </nav>
  );
}