import Link from "next/link";
import Image from "next/image"; // Import Image
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND SECTION (Logo + Text) */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-gray-800">
                <Image 
                   src="/logo.jpeg" 
                   alt="Moonlight Logo" 
                   fill
                   className="object-cover"
                 />
              </div>
              <span className="text-2xl font-serif font-bold tracking-widest">
                MOONLIGHT
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left leading-relaxed">
              Premium fragrances designed for the modern soul. Experience the essence of elegance with every spritz.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-6 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* SHOP LINKS */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 tracking-wider">SHOP</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition">All Perfumes</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Gift Sets</Link></li>
            </ul>
          </div>

          {/* COMPANY LINKS */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 tracking-wider">COMPANY</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Store Locator</Link></li>
            </ul>
          </div>

          {/* LEGAL LINKS */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-6 tracking-wider">LEGAL</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition">Returns & Exchange</Link></li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 Moonlight Perfumes. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-500 text-xs">Designed by Aabhas</span>
          </div>
        </div>
      </div>
    </footer>
  );
}