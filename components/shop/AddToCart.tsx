"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCart({ id, name, price, image }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart({ id, name, price, image })}
      className="flex-1 bg-black text-white py-4 px-8 uppercase tracking-widest hover:bg-gray-800 transition flex items-center justify-center gap-2 active:scale-95"
    >
      <ShoppingBag size={20} />
      Add to Cart
    </button>
  );
}