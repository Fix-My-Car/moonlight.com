import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
// DO NOT WRAP WITH <CartProvider> HERE. It is already in RootLayout.