"use client";

import Link from "next/link";
import Image from "next/image"; // Added Image component
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { auth } from "@/lib/firebase"; 
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const { cartCount } = useCart(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); 
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section - RESTORED */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200">
                {/* Ensure you have a logo image in your public folder */}
                <Image 
                    src="/icon.jpeg" 
                    alt="Moonlight Logo" 
                    fill
                    className="object-cover"
                />
            </div>
            <span className="text-xl font-bold tracking-widest text-gray-900 uppercase group-hover:text-purple-700 transition">
              Moonlight
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-purple-600 transition font-medium">Home</Link>
            <Link href="/shop" className="text-gray-600 hover:text-purple-600 transition font-medium">Collection</Link>
            <Link href="/about" className="text-gray-600 hover:text-purple-600 transition font-medium">Our Story</Link>
          </div>

          {/* Icons (Cart & User) */}
          <div className="flex items-center space-x-5">
            
            {/* Dynamic User Icon */}
            {user ? (
              <Link href="/profile" className="text-gray-600 hover:text-purple-600 transition" title="My Profile">
                 <User className="h-6 w-6 text-purple-600" /> 
              </Link>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-black transition" title="Login">
                 <User className="h-6 w-6" />
              </Link>
            )}

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="text-gray-600 hover:text-purple-600 transition relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg">
          <Link href="/" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/shop" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Collection</Link>
          <Link href="/about" className="block text-gray-600 font-medium" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
          <div className="pt-4 border-t border-gray-100">
             {user ? (
                <Link href="/profile" className="block text-purple-600 font-bold" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
             ) : (
                <Link href="/login" className="block text-gray-800 font-bold" onClick={() => setIsMenuOpen(false)}>Login / Signup</Link>
             )}
          </div>
        </div>
      )}
    </nav>
  );
}