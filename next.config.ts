import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'recharts', 'date-fns'],
  },

  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure module transpilation if needed
  transpilePackages: [],
};

export default nextConfig;
