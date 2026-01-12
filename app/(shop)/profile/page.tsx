"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { Package, LogOut, User, Clock, CheckCircle, Truck } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Check if User is Logged In
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Fetch User's Orders from Firebase
  const fetchOrders = async (userId: string) => {
    try {
      // Query: Give me orders where 'userId' matches the logged-in user
      const q = query(
        collection(db, "orders"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      setOrders(userOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Logout Function
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-4 rounded-full">
              <User size={32} className="text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Orders Section */}
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Package className="text-purple-600" /> Order History
        </h2>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Order ID</p>
                    <p className="font-mono text-sm font-bold text-gray-700">#{order.id.slice(0, 8)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-medium">
                      {order.createdAt?.seconds 
                        ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() 
                        : "Just now"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total</p>
                    <p className="text-sm font-bold text-gray-900">₹{order.total}</p>
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1
                    ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    
                    {order.status === 'delivered' && <CheckCircle size={12} />}
                    {order.status === 'shipped' && <Truck size={12} />}
                    {order.status === 'processing' && <Clock size={12} />}
                    {order.status || "Processing"}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  {order.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-0 border-gray-50">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden relative">
                            {/* Assuming item.image is saved in order, if not show generic */}
                            <img src={item.image || "/icon.jpeg"} alt="Product" className="object-cover w-full h-full" />
                         </div>
                         <span className="text-gray-700 font-medium">{item.name}</span>
                      </div>
                      <span className="text-gray-500 text-sm">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
            <Link href="/shop" className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}