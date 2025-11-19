// scripts/test-loader.ts

import { loadPlugins } from '../packages/core/src/plugin-loader';
import path from 'path';

// Simulasi loader tanpa Express
(async () => {
  const pluginsDir = path.resolve('plugins');
  const result = await loadPlugins(null as any, pluginsDir); // abaikan Express sementara
  console.log('📦 Plugins loaded:', result);
})();
