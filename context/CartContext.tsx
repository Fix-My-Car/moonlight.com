"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  uniqueId: string; // We need this to remove specific items if duplicates exist
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "uniqueId">) => void;
  removeFromCart: (uniqueId: string) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Omit<CartItem, "uniqueId">) => {
    // Create a random ID so we can remove just ONE item if they add the same perfume twice
    const newItem = { ...product, uniqueId: Math.random().toString(36).substr(2, 9) };
    setItems((prev) => [...prev, newItem]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (uniqueId: string) => {
    setItems((prev) => prev.filter((item) => item.uniqueId !== uniqueId));
  };

  // Calculate total price automatically
  const cartTotal = items.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addToCart, 
        removeFromCart, 
        cartCount: items.length,
        cartTotal 
      }}
    >
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