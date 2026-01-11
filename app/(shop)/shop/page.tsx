import { products } from "@/lib/products";
import ProductCard from "@/components/shop/ProductCard"; // <--- Import

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Collection</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Explore our full range of premium fragrances.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}