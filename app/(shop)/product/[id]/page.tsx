import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddToCart from "@/components/shop/AddToCart"; // Import the button

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition">
          <ArrowLeft size={20} className="mr-2" />
          Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Product Image */}
          <div className="relative h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RIGHT: Product Details */}
          <div>
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">{product.name}</h1>
            <p className="text-2xl text-gray-900 font-medium mb-6">₹{product.price.toLocaleString()}</p>
            
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {product.description} 
              <br /><br />
              Experience the essence of luxury with {product.name}. Long-lasting, premium notes designed to leave a lasting impression.
            </p>

            {/* Action Buttons (Using the Client Component) */}
            <div className="flex gap-4">
              <AddToCart 
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>

            {/* Extra Info */}
            <div className="mt-8 border-t pt-6 space-y-2 text-sm text-gray-500">
              <p>✔ Free Shipping on all orders</p>
              <p>✔ 100% Original Fragrance</p>
              <p>✔ 7-Day Return Policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}