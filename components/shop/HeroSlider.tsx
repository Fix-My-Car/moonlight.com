"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1920&auto=format&fit=crop",
    title: "Elegance in Every Drop",
    subtitle: "Discover the new signature collection.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1557827983-012eb6ea8dc1?q=80&w=1920&auto=format&fit=crop", // Dark moody vibe
    title: "Scent of Mystery",
    subtitle: "Bold fragrances for the night.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1596438361734-e3678b663044?q=80&w=1920&auto=format&fit=crop", // Bright floral vibe
    title: "Bloom & Blossom",
    subtitle: "Floral notes that last forever.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }} // Start slightly zoomed in & invisible
          animate={{ opacity: 1, scale: 1 }}   // Fade in & zoom to normal
          exit={{ opacity: 0 }}                // Fade out
          transition={{ duration: 1.5 }}       // Slow, luxurious transition
          className="absolute inset-0 w-full h-full"
        >
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <Image
            src={slides[current].image}
            alt="Hero Slide"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Text Content (Stays on top) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          key={slides[current].id + "-text"} // Re-trigger animation on slide change
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-white/80 uppercase tracking-[0.2em] text-sm mb-4">
            {slides[current].subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-8 drop-shadow-lg">
            {slides[current].title}
          </h1>
          <Link 
            href="/shop"
            className="inline-block border border-white text-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition duration-300"
          >
            Shop Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
} hwllo