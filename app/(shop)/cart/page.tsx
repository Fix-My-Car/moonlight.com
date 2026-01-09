"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't found your signature scent yet.</p>
        <Link href="/shop" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-gray-800 transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl font-serif font-bold mb-12 text-center">Your Shopping Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT: Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.uniqueId} className="flex items-center gap-6 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition">
              
              {/* Image */}
              <div className="relative w-24 h-24 bg-gray-100 flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover rounded-md" />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="font-serif font-medium text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">Eau de Parfum</p>
              </div>

              {/* Price & Remove */}
              <div className="text-right">
                <p className="font-medium mb-2">₹{item.price.toLocaleString()}</p>
                <button 
                  onClick={() => removeFromCart(item.uniqueId)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary */}
        <div className="bg-gray-50 p-8 rounded-lg h-fit">
          <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <Link href="/checkout" className="w-full block"> {/* <--- Add this wrapper */}
            <button className="w-full bg-black text-white py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}