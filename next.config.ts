import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Tell Vercel to IGNORE TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // 2. Tell Vercel to IGNORE ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 3. Allow images from Unsplash and Firebase
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      }
    ],
  },
};

export default nextConfig;