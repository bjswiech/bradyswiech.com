/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Skip API routes in static export
  experimental: {
    appDir: true, // ✅ enable App Router
  },
};

module.exports = nextConfig;
