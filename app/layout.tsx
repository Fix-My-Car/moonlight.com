import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Keeping your fonts
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast"; // <--- IMPORT THIS

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Moonlight Perfumes",
  description: "Luxury fragrances for the modern soul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <CartProvider>
            {/* ADD THIS LINE AT THE TOP */}
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </CartProvider>
      </body>
    </html>
  );
}