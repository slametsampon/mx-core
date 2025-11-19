// plugins/mx-core-docs/next.config.js

const { withContentlayer } = require('next-contentlayer');
const path = require('path');

/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

// ⚙️ Ganti sesuai nama plugin Anda (folder di GitHub Pages)
const pluginBasePath = isProd ? '/mx-core-docs' : '';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Penting untuk mendukung static export
  output: 'export',

  // ✅ Penting untuk URL konsisten: /docs/ → /docs/index.html
  trailingSlash: true,

  // ✅ Agar <Image /> tidak error di static mode
  images: {
    unoptimized: true,
  },

  // ✅ Digunakan oleh router & komponen frontend
  basePath: pluginBasePath,

  // ✅ Bisa diakses via process.env.BASE_PATH (client & server)
  env: {
    BASE_PATH: pluginBasePath,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // ✅ Alias untuk konten contentlayer
    config.resolve.alias['contentlayer/generated'] = path.resolve(
      __dirname,
      'contentlayer/generated'
    );

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
