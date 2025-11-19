// apps/frontend/next.config.js

//** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mx-core/docs'],

  // ✅ Static export mode
  output: 'export',

  // ✅ Agar routing tidak error di GitHub Pages
  trailingSlash: true,

  // ✅ Untuk dukung <Image /> saat export
  images: {
    unoptimized: true,
  },

  // ✅ Optional: basePath jika frontend ingin dipisah (mis. /frontend)
  // basePath: isProd ? '/frontend' : '',

  env: {
    BASE_PATH: isProd ? '/frontend' : '',
  },
};

module.exports = nextConfig;
