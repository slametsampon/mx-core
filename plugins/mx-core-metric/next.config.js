// plugins/mx-core-metric/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Opsional: buat URL jadi pakai slash di akhir (SEO friendly)
  trailingSlash: true,

  // Aktifkan source map untuk debugging di Vercel (opsional)
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
