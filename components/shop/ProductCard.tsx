"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  // CRASH PREVENTION: If product data is missing, don't render anything.
  if (!product) return null; 

  const { addToCart } = useCart();

  // SAFETY CHECK: Ensure we have a valid image. 
  const imageSrc = product.image && product.image.trim() !== "" 
    ? product.image 
    : "/icon.jpeg";

  // SAFETY CHECK: Ensure price exists
  const price = product.price || 0;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      
      {/* Clickable Image Area */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square bg-gray-50 overflow-hidden">
         {/* Badge */}
         {product.isNew && (
            <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10">
              New
            </span>
         )}

         <Image
            src={imageSrc}
            alt={product.name || "Product Image"}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
         />
         
         {/* Quick Add Overlay */}
         <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex justify-center bg-gradient-to-t from-black/10 to-transparent">
            <button 
              onClick={(e) => {
                e.preventDefault(); 
                addToCart(product);
              }}
              className="bg-white text-black font-medium text-sm py-2 px-6 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors flex items-center gap-2"
            >
              <ShoppingBag size={16} />
              Quick Add
            </button>
         </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
          {product.category || "Unisex"}
        </p>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-serif font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
            {product.name || "Unnamed Product"}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-3">
          <p className="text-gray-900 font-medium">
            ₹{price.toLocaleString()}
          </p>
          
          <button 
            onClick={() => addToCart(product)}
            className="md:hidden bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}