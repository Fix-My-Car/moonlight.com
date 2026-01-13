"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast"; // <--- Import Toast

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation (Optional but good)
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        createdAt: serverTimestamp(),
      });

      // SUCCESS TOAST
      toast.success("Account created! Redirecting...");
      
      // Delay slightly so they can see the message
      setTimeout(() => {
        router.push(redirectPath);
      }, 1500);

    } catch (error: any) {
      console.error("Signup Error:", error);
      
      // Clean up Firebase error messages
      let message = "Something went wrong.";
      if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered. Please login.";
      } else if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }
      
      // ERROR TOAST
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-2 font-serif text-gray-900">Join Moonlight</h1>
        <p className="text-center text-gray-500 mb-8">Create an account to track your orders.</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" name="name" placeholder="Full Name" required 
            onChange={handleChange} 
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          <input 
            type="email" name="email" placeholder="Email Address" required 
            onChange={handleChange} 
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          <input 
            type="password" name="password" placeholder="Password" required 
            onChange={handleChange} 
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          
          <input 
            type="tel" name="phone" placeholder="Phone Number" required 
            onChange={handleChange} 
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          <input 
            type="text" name="address" placeholder="Address (House No, Street)" required 
            onChange={handleChange} 
            className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
          />
          <div className="grid grid-cols-2 gap-4">
             <input 
                type="text" name="city" placeholder="City" required 
                onChange={handleChange} 
                className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
              <input 
                type="text" name="pincode" placeholder="Pincode" required 
                onChange={handleChange} 
                className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
              />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-3.5 rounded-lg font-bold hover:bg-gray-900 transition flex justify-center shadow-lg mt-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link href="/login" className="text-purple-600 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}