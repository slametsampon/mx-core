// plugins/mx-core-metric/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Opsional: buat URL jadi pakai slash di akhir (SEO friendly)
  trailingSlash: true,

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
