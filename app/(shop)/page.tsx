"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard"; 
import HeroSlider from "@/components/shop/HeroSlider"; // <--- Importing the Slider back
import { products } from "@/lib/products"; 

export default function Home() {
  // Grab the first 4 products for the "Featured" section
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      
      {/* RESTORED HERO SLIDER */}
      <HeroSlider />

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Trending Now</h2>
            <p className="text-gray-500 mt-2">Our most loved fragrances this season</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        {/* Product Grid (With the crash protection we added earlier) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
          <Link href="/shop" className="text-purple-600 font-medium hover:text-purple-700 inline-flex items-center gap-2">
            View All Products <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}