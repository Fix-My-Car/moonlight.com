"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore"; // Added getDoc
import { onAuthStateChanged } from "firebase/auth";
import { ShieldCheck, Truck, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true); // To wait for auth check
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    phone: ""
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        // GUEST DETECTED: Redirect to Signup with a "return ticket"
        router.push("/signup?redirect=/checkout");
      } else {
        // USER LOGGED IN: Fetch their saved details
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // AUTO-FILL FORM
            setFormData({
              name: userData.name || "",
              email: currentUser.email || "",
              phone: userData.phone || "",
              address: userData.address || "",
              city: userData.city || "",
              pincode: userData.pincode || ""
            });
          } else {
            // Fallback if no firestore data exists yet
            setFormData(prev => ({ ...prev, email: currentUser.email || "" }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (cart.length === 0) {
        alert("Your cart is empty!");
        router.push("/shop");
        return;
    }

    try {
      const user = auth.currentUser;
      const orderData = {
        userId: user ? user.uid : "guest",
        userEmail: formData.email,
        items: cart,
        total: cartTotal,
        status: "processing",
        shippingDetails: formData,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      
      // Redirect to Order Success / Profile
      router.push("/profile"); 

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initializing) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Secure Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Shipping Form (Auto-Filled) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm h-fit">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="text-purple-600" /> Shipping Details
            </h2>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <input 
                  type="text" name="name" required placeholder="Full Name"
                  value={formData.name} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input 
                  type="email" name="email" required placeholder="Email Address"
                  value={formData.email} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input 
                  type="tel" name="phone" required placeholder="Phone Number"
                  value={formData.phone} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <input 
                  type="text" name="address" required placeholder="Address"
                  value={formData.address} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                    type="text" name="city" required placeholder="City"
                    value={formData.city} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <input 
                    type="text" name="pincode" required placeholder="Pincode"
                    value={formData.pincode} onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <button 
                  type="submit" disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-lg mt-6"
              >
                  {loading ? "Processing..." : `Confirm Order - ₹${cartTotal.toLocaleString()}`}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                 <ShieldCheck size={14} /> Secure Payment (COD / UPI)
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Your Order</h2>
              <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/icon.jpeg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900 pt-6 border-t mt-4">
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