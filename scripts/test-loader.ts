// scripts/test-loader.ts

import { loadPlugins } from '../packages/core/src/plugin-loader';
import path from 'path';

(async () => {
  const pluginsDir = path.resolve('plugins'); // resolve absolute path
  const result = await loadPlugins(pluginsDir); // FINAL → hanya 1 argumen
  console.log('📦 Plugins loaded:', result);
})();
