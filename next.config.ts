import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Recommended for development
  images: {
    // If you plan to use external image URLs, configure them here
    // domains: ['example.com'],
  },
  // You might want to enable this if you see font loading issues, though Next.js handles fonts well by default.
  // experimental: {
  //   fontLoaders: [
  //     { loader: '@next/font/google', options: { subsets: ['latin'] } },
  //   ],
  // },
};

export default nextConfig;
