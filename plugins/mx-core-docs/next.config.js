// plugins/mx-core-docs/next.config.js

const { withContentlayer } = require('next-contentlayer');
const path = require('path');

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const pluginBasePath = isGithubPages ? '/mx-core' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  // output: 'export',

  // basePath: pluginBasePath,
  // assetPrefix: pluginBasePath,

  images: {
    unoptimized: false,
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
      'contentlayer/generated',
    );

    return config;
  },
};

module.exports = withContentlayer(nextConfig);
