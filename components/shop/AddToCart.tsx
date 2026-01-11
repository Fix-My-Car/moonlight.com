"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCart({ id, name, price, image }: ProductProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart({ id, name, price, image });
    router.push("/checkout");
  };

  return (
    <div className="flex gap-4 w-full">
      <button 
        onClick={() => addToCart({ id, name, price, image })}
        className="flex-1 bg-white border border-black text-black py-4 px-8 uppercase tracking-widest hover:bg-gray-50 transition flex items-center justify-center gap-2 active:scale-95"
      >
        <ShoppingBag size={20} />
        Add to Cart
      </button>

      <button 
        onClick={handleBuyNow}
        className="flex-1 bg-black text-white py-4 px-8 uppercase tracking-widest hover:bg-gray-800 transition flex items-center justify-center gap-2 active:scale-95"
      >
        <Zap size={20} />
        Buy Now
      </button>
    </div>
  );
}