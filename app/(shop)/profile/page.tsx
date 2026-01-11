"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2, Package, User } from "lucide-react";

export default function ProfilePage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 1. Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect if not logged in
        return;
      }
      setUser(currentUser);

      // 2. Fetch User's Orders
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
          // Note: 'orderBy' might require a Firestore Index, we can add it later if needed
        );
        
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12 border-b pb-8">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <User size={32} className="text-gray-500" />
        </div>
        <div>
          <h1 className="text-2xl font-serif font-bold">{user?.displayName || "Valued Customer"}</h1>
          <p className="text-gray-500 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Orders List */}
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Package size={20} /> Order History
      </h2>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
          <a href="/shop" className="text-black underline text-sm uppercase tracking-widest">Start Shopping</a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-100 rounded-lg p-6 hover:shadow-sm transition bg-white">
              <div className="flex flex-col md:flex-row justify-between mb-4 pb-4 border-b border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                  <p className="font-mono text-xs text-gray-600">#{order.id.slice(0, 8)}</p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span>₹{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 font-medium">
                <span>Total Amount</span>
                <span>₹{order.total?.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}