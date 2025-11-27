// apps/frontend/next.config.js

const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Transpile semua modul internal agar build tidak gagal
  transpilePackages: ['@mx-core'],

  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  // ✅ Lebih fleksibel (ENV-based)
  basePath,
  assetPrefix: basePath || '',

  env: {
    BASE_PATH: basePath,
  },
};

console.log('[Next Config] BASE_PATH:', basePath);
module.exports = nextConfig;
