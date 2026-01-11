"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs, doc, updateDoc } from "firebase/firestore";
import { Package, Truck, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    if (!confirm(`Mark order as ${newStatus}?`)) return;
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      fetchOrders(); // Refresh list
    } catch (error) {
      alert("Error updating status");
    }
  };

  if (loading) return <div className="p-10">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-bold text-sm">Order ID</th>
                <th className="p-4 font-bold text-sm">Customer</th>
                <th className="p-4 font-bold text-sm">Items</th>
                <th className="p-4 font-bold text-sm">Total</th>
                <th className="p-4 font-bold text-sm">Status</th>
                <th className="p-4 font-bold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <div className="font-bold">{order.customer?.name}</div>
                    <div className="text-xs text-gray-500">{order.customer?.phone}</div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {order.items?.map((item: any) => item.name).join(", ")}
                  </td>
                  <td className="p-4 font-bold">₹{order.total}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button onClick={() => updateStatus(order.id, "shipped")} title="Mark Shipped" className="p-2 hover:bg-gray-200 rounded">
                      <Truck size={16} />
                    </button>
                    <button onClick={() => updateStatus(order.id, "delivered")} title="Mark Delivered" className="p-2 hover:bg-gray-200 rounded text-green-600">
                      <CheckCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}