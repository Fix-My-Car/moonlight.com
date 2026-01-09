import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold tracking-widest mb-4">MOONLIGHT</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Premium fragrances designed for the modern soul. Experience the essence of elegance with every spritz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/shop" className="hover:text-white transition">All Perfumes</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link href="/shop" className="hover:text-white transition">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 text-center text-gray-600 text-xs">
          <p>&copy; {new Date().getFullYear()} Moonlight Perfumes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}