// next.config.js

const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Penting untuk static export
  output: 'export',

  // ✅ Wajib untuk mendukung routing /about/ dll
  trailingSlash: true,

  // ✅ Wajib agar image Next.js tidak error saat export
  images: {
    unoptimized: true,
  },

  // ✅ Penting untuk GitHub Pages: menyesuaikan basePath
  basePath: isProd ? '/mx-core' : '',

  // (Opsional) Jika ingin mengatur assetPrefix juga:
  assetPrefix: isProd ? '/mx-core/' : '',
};

module.exports = withContentlayer(nextConfig);
