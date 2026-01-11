"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { db, auth } from "@/lib/firebase"; // Import auth to link order to user
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart(); // Assuming you might have a clearCart function, if not, it's fine
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Sanitize Data (Prevents Firestore crashes)
      const cleanItems = items.map(item => ({
        id: item.id || "unknown",
        name: item.name || "Unknown Product",
        price: Number(item.price) || 0
      }));

      // 2. Prepare Order Data
      const orderData = {
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
        items: cleanItems,
        total: Number(cartTotal) || 0,
        status: "pending", // Default status
        createdAt: serverTimestamp(),
        // 3. Link to User (Important for Profile Page)
        userId: auth.currentUser ? auth.currentUser.uid : "guest",
      };

      console.log("Sending Order:", orderData); // Debugging

      // 4. Save to Firestore
      await addDoc(collection(db, "orders"), orderData);

      // 5. Success
      setIsSuccess(true);
      // Optional: clearCart(); 
    } catch (error: any) {
      console.error("Checkout Error:", error);
      alert(`Order Failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS SCREEN
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h1 className="text-4xl font-serif font-bold mb-4">Order Placed!</h1>
        <p className="text-gray-500 mb-8 max-w-md">
          Thank you for choosing Moonlight. We will contact you at <strong>{formData.phone}</strong> shortly to confirm delivery.
        </p>
        <Link href="/profile" className="text-black underline mb-4 block">
          View My Order
        </Link>
        <Link href="/shop" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-gray-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <Link href="/cart" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-serif font-bold mb-8 text-center">Secure Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: Shipping Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg mb-6">Shipping Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full border border-gray-200 p-3 rounded text-sm focus:outline-none focus:border-black" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full border border-gray-200 p-3 rounded text-sm focus:outline-none focus:border-black" 
                  placeholder="+91 98765 43210" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Address</label>
                <textarea 
                  required 
                  rows={3} 
                  className="w-full border border-gray-200 p-3 rounded text-sm focus:outline-none focus:border-black" 
                  placeholder="Street, City, State, Pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4">
                 <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-black text-white py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Processing...
                    </>
                  ) : (
                    "Confirm Order (COD)"
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-4">
                  *Payment will be collected upon delivery.
                </p>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold text-lg mb-6">Your Order</h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={item.uniqueId} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-gray-400">x1</span></span>
                  <span className="font-medium">₹{Number(item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}