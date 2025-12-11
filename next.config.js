/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    qualities: [60, 70, 75], // Configurado para soportar todos los quality values usados
  },
}

module.exports = nextConfig
