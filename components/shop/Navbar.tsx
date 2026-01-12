"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { auth } from "@/lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const { cartCount } = useCart(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); 
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      unsubscribe(); 
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled 
          ? "bg-white/50 backdrop-blur-xl shadow-sm" // More transparent on scroll (50%)
          : "bg-white/10 backdrop-blur-md" // Very transparent at top (10%)
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> 
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-white/40 shadow-sm">
                <Image 
                    src="/icon.jpeg" 
                    alt="Moonlight Logo" 
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-xl font-bold tracking-widest text-gray-900 uppercase group-hover:text-purple-700 transition font-serif">
              Moonlight
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-900 hover:text-purple-600 transition font-medium tracking-wide text-sm uppercase">Home</Link>
            <Link href="/shop" className="text-gray-900 hover:text-purple-600 transition font-medium tracking-wide text-sm uppercase">Collection</Link>
            <Link href="/about" className="text-gray-900 hover:text-purple-600 transition font-medium tracking-wide text-sm uppercase">Our Story</Link>
          </div>

          {/* Icons (Cart & User) */}
          <div className="flex items-center space-x-6">
            
            {/* Dynamic User Icon */}
            {user ? (
              <Link href="/profile" className="text-gray-900 hover:text-purple-600 transition" title="My Profile">
                 <User className="h-6 w-6" /> 
              </Link>
            ) : (
              <Link href="/login" className="text-gray-900 hover:text-black transition" title="Login">
                 <User className="h-6 w-6" />
              </Link>
            )}

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="text-gray-900 hover:text-purple-600 transition relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) - High blur for readability */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 space-y-6 shadow-xl h-screen">
          <Link href="/" className="block text-xl font-serif text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/shop" className="block text-xl font-serif text-gray-900" onClick={() => setIsMenuOpen(false)}>Collection</Link>
          <Link href="/about" className="block text-xl font-serif text-gray-900" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <div className="pt-6 border-t border-gray-200">
             {user ? (
                <Link href="/profile" className="flex items-center gap-2 text-purple-600 font-bold text-lg" onClick={() => setIsMenuOpen(false)}>
                  <User size={20} /> My Profile
                </Link>
             ) : (
                <Link href="/login" className="flex items-center gap-2 text-gray-900 font-bold text-lg" onClick={() => setIsMenuOpen(false)}>
                  <User size={20} /> Login / Signup
                </Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}