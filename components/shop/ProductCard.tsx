import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductProps) {
  return (
    <Link href={`/product/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-gray-100 mb-4 h-[300px]">
        {/* Product Image */}
        <Image 
          src={image} 
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* "Add to Cart" Button (Appears on Hover) */}
        <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          VIEW DETAILS
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{category}</p>
        <h3 className="text-lg font-serif font-medium text-black">{name}</h3>
        <p className="text-gray-900 font-semibold mt-1">₹{price.toLocaleString()}</p>
      </div>
    </Link>
  );
}