import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast"; // <--- 1. Import this

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="bg-white min-h-screen text-black flex flex-col">
        <Navbar />
        <main className="pt-16 flex-grow">
          {children}
        </main>
        <Footer />
        {/* 2. Add the Toaster here */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              border: '1px solid #333',
              padding: '16px',
              fontFamily: 'serif',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}