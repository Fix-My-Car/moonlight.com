"use client";

import { useState, use } from "react";
import Image from "next/image";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Star, Truck, ShieldCheck, ShoppingBag, Minus, Plus } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { notFound } from "next/navigation";

// Define the params type
type Props = {
  params: Promise<{ id: string }>;
};

export default function ProductPage({ params }: Props) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  
  // State for gallery and quantity
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(1);

  // If product not found, show 404
  if (!product) return notFound();

  // Get Related Products (exclude current one, take first 4)
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Ensure we have an array of images for the gallery
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  const handleAddToCart = () => {
    // Add the item multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION: Gallery & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          
          {/* LEFT: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
              <Image
                src={mainImage || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                    mainImage === img ? "border-purple-600 ring-2 ring-purple-100" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                 {product.category || "Unisex"}
               </span>
               {product.isNew && (
                 <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">New Arrival</span>
               )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 font-serif mb-2">{product.name}</h1>
            
            {/* Fake Reviews */}
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-sm text-gray-500 ml-2">(12 Reviews)</span>
            </div>

            <p className="text-2xl font-medium text-gray-900 mb-6">₹{product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description || "Experience luxury with this handcrafted fragrance. Made with rare ingredients to ensure a long-lasting and unique scent profile."}
            </p>

            {/* Size Selector */}
            <div className="mb-8">
              <span className="text-sm font-medium text-gray-900 block mb-3">Select Size</span>
              <div className="flex gap-3">
                {["50ml", "100ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border rounded-full text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-10">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-gray-100 rounded-l-full"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-gray-100 rounded-r-full"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
              >
                <ShoppingBag size={20} />
                Add to Cart - ₹{(product.price * quantity).toLocaleString()}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-500">On all orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-purple-600" size={24} />
                <div>
                  <p className="text-sm font-bold text-gray-900">Authentic</p>
                  <p className="text-xs text-gray-500">100% Original Products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Related Products */}
        <div className="border-t border-gray-100 pt-16">
          <h2 className="text-2xl font-bold font-serif mb-8 text-gray-900">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}