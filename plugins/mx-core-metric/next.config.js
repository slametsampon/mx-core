// plugins/mx-core-metric/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Opsional: buat URL jadi pakai slash di akhir (SEO friendly)
  trailingSlash: true,

  // Aktifkan source map untuk debugging di Vercel (opsional)
  productionBrowserSourceMaps: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    // Tambahkan ini:
    config.module.rules.push({
      test: /\.json$/,
      type: 'json',
    });

    return config;
  },
};

module.exports = nextConfig;
