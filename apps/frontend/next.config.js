// apps/frontend/next.config.js

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mx-core/docs'],

  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // ✅ basePath tetap untuk routing
  basePath: isProd ? '/frontend' : '',

  // ✅ FIX: Gunakan assetPrefix relatif
  assetPrefix: isProd ? '.' : '',

  env: {
    BASE_PATH: isProd ? '/frontend' : '',
  },
};

console.log('[Next Config] NODE_ENV:', process.env.NODE_ENV);
console.log('[Next Config] basePath:', nextConfig.basePath);
console.log('[Next Config] assetPrefix:', nextConfig.assetPrefix);

module.exports = nextConfig;
