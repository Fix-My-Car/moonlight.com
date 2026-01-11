"use client";

import Link from "next/link";
import Image from "next/image"; 
import { ShoppingBag, User, Menu, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { auth } from "@/lib/firebase"; 
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO SECTION - Text is now always visible */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-gray-200 shrink-0">
               <Image 
                 src="/logo.jpeg" 
                 alt="Moonlight Logo" 
                 fill
                 className="object-cover"
               />
            </div>
            {/* Removed 'hidden' class so it shows on mobile too */}
            <span className="text-lg md:text-2xl font-serif font-bold tracking-widest text-black">
              MOONLIGHT
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-800 hover:text-black uppercase text-xs tracking-widest">Home</Link>
            <Link href="/shop" className="text-gray-800 hover:text-black uppercase text-xs tracking-widest">Collection</Link>
            <Link href="/about" className="text-gray-800 hover:text-black uppercase text-xs tracking-widest">Our Story</Link>
          </div>

          {/* ICONS SECTION */}
          <div className="flex items-center space-x-4 md:space-x-6">
            
            <Link href="/cart" className="relative text-gray-800 hover:text-black">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile" 
                  className="text-xs uppercase hidden md:block hover:underline font-bold"
                >
                  Hi, {user.displayName || "User"}
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-800 hover:text-red-500" 
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-800 hover:text-black">
                <User size={20} />
              </Link>
            )}
            
            <button className="md:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      
      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col space-y-4 shadow-lg">
          <Link href="/" className="text-sm uppercase tracking-widest">Home</Link>
          <Link href="/shop" className="text-sm uppercase tracking-widest">Collection</Link>
          <Link href="/about" className="text-sm uppercase tracking-widest">Our Story</Link>
          <Link href="/contact" className="text-sm uppercase tracking-widest">Contact</Link>
          {user && (
             <Link href="/profile" className="text-sm uppercase tracking-widest font-bold text-black border-t pt-2 mt-2">My Orders</Link>
          )}
        </div>
      )}
    </nav>
  );
}