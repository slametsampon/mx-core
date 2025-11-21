// plugins/mx-core-docs/next.config.js

const { withContentlayer } = require('next-contentlayer');
const path = require('path');

const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const pluginBasePath = isGithubPages ? '/mx-core/frontend/docs' : '';
const assetPrefix = pluginBasePath;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  basePath: pluginBasePath,
  assetPrefix: assetPrefix,

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
