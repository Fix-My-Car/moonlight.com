export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">Our Story</h1>
      
      <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
        <p>
          At <strong>Moonlight</strong>, we believe that fragrance is more than just a scent—it is a memory, an emotion, and a signature. 
          Founded in 2024, our mission has been simple: to craft premium perfumes that embody elegance and confidence.
        </p>
        
        <p>
          Each bottle is a masterpiece, blended with the finest ingredients sourced from around the world. 
          From the deep woods of the East to the blooming gardens of the West, we bring the world's most 
          exquisite aromas to your doorstep.
        </p>

        <p>
          We are not just selling perfumes; we are curating experiences. Whether you are stepping into a boardroom 
          or a ballroom, Moonlight ensures you leave a lasting impression.
        </p>
      </div>

      <div className="mt-12 p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-serif font-bold mb-4">Our Promise</h2>
        <p className="text-gray-500">
          100% Original Ingredients • Cruelty-Free • Long-Lasting Wear
        </p>
      </div>
    </div>
  );
}