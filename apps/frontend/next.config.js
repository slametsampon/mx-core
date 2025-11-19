// apps/frontend/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mx-core/docs'], // ⬅️ agar dapat di-import dari plugin
};

module.exports = nextConfig;
