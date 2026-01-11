"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of a Cart Item
type CartItem = {
  uniqueId: string; // A random ID for every item added (allows duplicates)
  id: string;       // The Product ID
  name: string;
  price: number;
  image: string;
};

// Define what the Context provides
type CartContextType = {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (uniqueId: string) => void;
  clearCart: () => void; // <--- This was missing!
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from LocalStorage on start
  useEffect(() => {
    const savedCart = localStorage.getItem("moonlight-cart");
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("moonlight-cart", JSON.stringify(items));
  }, [items]);

  // Add Item
  const addToCart = (product: any) => {
    const newItem: CartItem = {
      uniqueId: crypto.randomUUID(), // Generates a unique ID
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Remove Item
  const removeFromCart = (uniqueId: string) => {
    setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // Clear Cart (The new function!)
  const clearCart = () => {
    setItems([]);
  };

  // Calculate Totals
  const cartCount = items.length;
  const cartTotal = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}