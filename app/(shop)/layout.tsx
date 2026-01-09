import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer"; // <--- Import
import { CartProvider } from "@/context/CartContext";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <div className="bg-white min-h-screen text-black flex flex-col"> {/* Added flex flex-col */}
        <Navbar />
        <main className="pt-16 flex-grow"> {/* Added flex-grow */}
          {children}
        </main>
        <Footer /> {/* <--- Added Footer */}
      </div>
    </CartProvider>
  );
}