// plugins/mx-core-metric/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Opsional: buat URL jadi pakai slash di akhir (SEO friendly)
  trailingSlash: true,

  // ⚠️ Tambahkan jika kamu ingin deploy plugin ini di subfolder
  // basePath: '/plugins/metric', // contoh jika plugin ini dipasang di frontend/docs

  // Aktifkan source map untuk debugging di Vercel (opsional)
  productionBrowserSourceMaps: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
