"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, Zap } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); // Stop clicking the link to the product page
    addToCart({ id, name, price, image });
    router.push("/checkout"); // Go straight to checkout
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
  };

  return (
    <Link href={`/product/${id}`} className="group block">
      {/* Image Section */}
      <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        
        {/* DESKTOP HOVER BUTTONS (Hidden on mobile, visible on hover for desktop) */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-300 hidden md:flex gap-2 bg-gradient-to-t from-black/50 to-transparent">
           <button 
            onClick={handleAddToCart}
            className="flex-1 bg-white text-black py-2 text-xs uppercase font-bold tracking-wider hover:bg-gray-100 transition flex items-center justify-center gap-2 rounded"
          >
            <ShoppingBag size={14} /> Add
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-black text-white py-2 text-xs uppercase font-bold tracking-wider hover:bg-gray-800 transition flex items-center justify-center gap-2 rounded"
          >
            <Zap size={14} /> Buy
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-serif font-medium group-hover:text-gray-600 transition">{name}</h3>
        <p className="text-gray-900 mt-1 mb-3">₹{price.toLocaleString()}</p>

        {/* MOBILE BUTTONS (Visible ONLY on mobile) */}
        <div className="md:hidden flex gap-2 mt-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 border border-black text-black py-2 text-[10px] uppercase font-bold tracking-wider rounded"
          >
            Add
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 bg-black text-white py-2 text-[10px] uppercase font-bold tracking-wider rounded"
          >
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}