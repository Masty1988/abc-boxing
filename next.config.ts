import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    qualities: [75, 85, 90], 
  },

  // ISR global: revalider toutes les heures pour toutes les pages
  experimental: {
    staleTimes: {
      dynamic: 3600, // 1 heure en secondes
      static: 3600,
    },
  },
};

export default nextConfig;
