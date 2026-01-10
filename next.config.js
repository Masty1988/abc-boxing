/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Configuration ISR globale
  experimental: {
    staleTimes: {
      dynamic: 300, // 5 minutes de cache pour les pages dynamiques
      static: 300,  // 5 minutes de cache pour les pages statiques
    },
  },
};

module.exports = nextConfig;
