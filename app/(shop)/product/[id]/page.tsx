"use client";

import { products } from "@/lib/products";
import AddToCart from "@/components/shop/AddToCart";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  // Initialize state with the first image (or main image if array is empty)
  const [activeImage, setActiveImage] = useState(
    product?.images ? product.images[0] : product?.image
  );

  if (!product) {
    notFound();
  }

  // Fallback if 'images' array is missing in data
  const gallery = product.images || [product.image];

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back */}
        <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition text-sm uppercase tracking-widest">
          <ArrowLeft size={16} className="mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Large Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <Image
                src={activeImage || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Thumbnails (Only show if there is more than 1 image) */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition ${
                      activeImage === img ? "border-black" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              {product.name}
            </h1>
            
            {/* Fake Reviews */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-yellow-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-sm text-gray-400">(42 Reviews)</span>
            </div>

            <p className="text-2xl text-gray-900 mb-8 font-medium">
              ₹{product.price.toLocaleString()}
            </p>

            <div className="prose prose-sm text-gray-600 mb-10 leading-relaxed">
              <p>{product.description}</p>
              <p>
                Experience the art of fine perfumery. Long-lasting, evocative, and purely unforgettable. 
                Perfect for gift-giving or a personal treat.
              </p>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <AddToCart 
              id={product.id} 
              name={product.name} 
              price={product.price} 
              image={product.image} 
            />

            {/* Additional Info Toggles (Static for now) */}
            <div className="mt-12 space-y-4 border-t pt-8">
              <div className="flex justify-between text-sm uppercase tracking-widest cursor-pointer hover:text-gray-600">
                <span>Fragrance Notes</span>
                <span>+</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-widest cursor-pointer hover:text-gray-600">
                <span>Shipping & Returns</span>
                <span>+</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}