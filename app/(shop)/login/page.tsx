"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/shop"); // Redirect to shop
    } catch (err: any) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-serif font-bold text-center mb-6">Welcome Back</h1>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs uppercase text-gray-500">Email</label>
            <input type="email" required className="w-full border p-3 rounded" 
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="text-xs uppercase text-gray-500">Password</label>
            <input type="password" required className="w-full border p-3 rounded" 
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 uppercase tracking-widest text-xs hover:bg-gray-800">
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          New here? <Link href="/signup" className="text-black underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}