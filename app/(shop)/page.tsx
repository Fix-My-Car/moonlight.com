import HeroSlider from "@/components/shop/HeroSlider";
import ProductCard from "@/components/shop/ProductCard"; // <--- Import new card
import { products } from "@/lib/products";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <HeroSlider />

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center mb-12">New Arrivals</h2>
        
        {/* Using the new ProductCard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-10">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              {...product} // Passes id, name, price, etc. automatically
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/shop" className="inline-block bg-black text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition">
            View All Products
          </Link>
        </div>
      </div>
    </main>
  );
}