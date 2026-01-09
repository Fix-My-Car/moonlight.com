import Link from "next/link";
import { products } from "@/lib/products"; // Import our data
import ProductCard from "@/components/shop/ProductCard"; // Import our component

export default function Home() {
  return (
    <div className="w-full">
      
      {/* HERO SECTION (Keep what you have) */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gray-100 overflow-hidden">
        {/* ... (Keep your existing hero code here) ... */}
         {/* If you deleted it, let me know and I'll paste it again */}
         <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 opacity-50"></div>
         <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-6">MOONLIGHT</h1>
            <Link href="/shop" className="inline-block bg-black text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition">Shop Collection</Link>
         </div>
      </section>

      {/* NEW ARRIVALS GRID */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-black">New Arrivals</h2>
          <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          ))}
        </div>
      </section>

    </div>
  );
}