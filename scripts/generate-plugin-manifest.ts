// scripts/generate-plugin-manifest.ts

import fs from 'fs';
import path from 'path';
import { loadPlugins, PluginMeta } from '../packages/core/src';

async function main() {
  const pluginsDir = 'plugins';
  console.log(`🔍 Scanning plugins from: ${pluginsDir}`);

  const plugins: PluginMeta[] = await loadPlugins(pluginsDir);

  if (plugins.length === 0) {
    console.warn('⚠️  Tidak ada plugin UI yang ditemukan.');
  } else {
    console.log(`✅ Total plugin UI terdeteksi: ${plugins.length}`);
    for (const plugin of plugins) {
      console.log(`   • ${plugin.name} → basePath: ${plugin.basePath}`);
    }
  }

  const outPath = path.resolve('apps/frontend/public/plugin-manifest.json');

  fs.writeFileSync(outPath, JSON.stringify(plugins, null, 2));

  console.log(`📝 Plugin manifest berhasil ditulis ke: ${outPath}`);
}

main().catch((err) => {
  console.error('❌ Gagal generate plugin-manifest:', err.message);
  process.exit(1);
});
