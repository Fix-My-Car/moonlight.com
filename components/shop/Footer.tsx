"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-6">Moonlight<span className="text-purple-400">.</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Handcrafted perfumes designed to define your signature scent. Experience elegance in every drop.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-purple-400 transition">Our Collection</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition">Our Story</Link></li>
              <li><Link href="/shop" className="hover:text-purple-400 transition">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-purple-400 transition">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Care (Pointing to valid pages or safe placeholders) */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-purple-400 transition">Contact Us</Link></li>
              <li><Link href="/profile" className="hover:text-purple-400 transition">My Account</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-purple-400 transition">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get special offers and 10% off your first order.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm w-full focus:ring-1 focus:ring-purple-500"
              />
              <button type="submit" className="bg-purple-600 p-2 rounded-lg hover:bg-purple-700 transition">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2026 Moonlight Perfumes. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
             <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}