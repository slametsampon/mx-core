// scripts/generate-plugin-manifest.ts

import fs from 'fs';
import path from 'path';
import { loadPlugins, PluginMeta } from '@mx-core/core';

async function main() {
  const plugins: PluginMeta[] = await loadPlugins('plugins');
  const outPath = path.resolve('apps/frontend/public/plugin-manifest.json');

  fs.writeFileSync(outPath, JSON.stringify(plugins, null, 2));
  console.log(`📝 Plugin manifest generated: ${outPath}`);
}

main();
