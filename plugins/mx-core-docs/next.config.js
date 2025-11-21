// plugins/mx-core-docs/next.config.js

const { withContentlayer } = require('next-contentlayer');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

// 🔧 Set basePath & assetPrefix berdasarkan mode
const pluginBasePath = isGithubPages
  ? '/mx-core/frontend/docs'
  : isProd
  ? '/frontend/docs'
  : '';

const assetPrefix = pluginBasePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  output: 'export',

  basePath: pluginBasePath,
  assetPrefix: assetPrefix,

  images: {
    unoptimized: true,
  },

  env: {
    BASE_PATH: pluginBasePath,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias['contentlayer/generated'] = path.resolve(
      __dirname,
      'contentlayer/generated'
    );

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
