"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SAFETY: If cart is somehow missing, treat it as empty array []
  const safeCart = cart || []; 
  const safeTotal = cartTotal || 0;

  // 1. Loading State (Only show for max 1 second, then force show content)
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-purple-600" size={40} />
      </div>
    );
  }

  // 2. Empty State
  if (safeCart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg w-full">
          <div className="bg-purple-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added any luxury scents yet.</p>
          <Link 
            href="/shop" 
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  // 3. Filled State
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-serif text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {safeCart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex gap-6 items-center border border-gray-100">
                <Link href={`/product/${item.id}`} className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <Image 
                    src={item.image || "/icon.jpeg"} 
                    alt={item.name} 
                    fill 
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.category || "Fragrance"}</p>
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-medium text-gray-900 hover:text-purple-600 transition">{item.name}</h3>
                      </Link>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-full text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-r-full text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-lg text-gray-900">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 text-gray-600 mb-6">
                <div className="flex justify-between"><span>Subtotal</span><span>₹{safeTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span className="text-green-600 font-medium">Free</span></div>
              </div>
              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-purple-600">₹{safeTotal.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/checkout" className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-lg flex justify-center items-center gap-2">
                Proceed to Checkout <ArrowRight size={20} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}