// plugins/mx-core-docs/index.ts

import path from 'path';

export function registerPlugin() {
  return {
    name: 'mx-core-docs',
    description: 'Dokumentasi statis berbasis markdown & Contentlayer',
    version: '0.1.0',
    ui: {
      path: path.join(__dirname, 'public'),
      basePath: '/docs',
    },
    api: null,
  };
}
