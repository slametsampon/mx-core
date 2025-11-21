// packages/core/src/plugin-loader.ts

import path from 'path';
import fs from 'fs';

export interface PluginMeta {
  name: string;
  ui: boolean;
  api?: boolean;
  module: string;
  [key: string]: any;
}

/**
 * Meload semua plugin dari folder `plugins/`
 * Hanya mendukung plugin dengan flag `ui: true`
 */
export async function loadPlugins(
  pluginsDir = 'plugins'
): Promise<PluginMeta[]> {
  const pluginList: PluginMeta[] = [];

  const plugins = fs
    .readdirSync(pluginsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  for (const plugin of plugins) {
    const pluginPath = path.join(pluginsDir, plugin.name);
    const configPath = path.join(pluginPath, 'plugin.json');

    if (!fs.existsSync(configPath)) {
      console.warn(
        `[Plugin Loader] Skipped: ${plugin.name} (plugin.json not found)`
      );
      continue;
    }

    const pluginConfig: PluginMeta = JSON.parse(
      fs.readFileSync(configPath, 'utf-8')
    );

    const entryPath = path.join(pluginPath, pluginConfig.module);

    if (!fs.existsSync(entryPath)) {
      console.warn(
        `[Plugin Loader] Skipped: ${plugin.name} (module not found at ${entryPath})`
      );
      continue;
    }

    // Validasi flag UI dan catat ke daftar plugin aktif
    if (pluginConfig.ui) {
      pluginList.push({
        ...pluginConfig,
        name: plugin.name,
      });

      console.log(`[Plugin Loader] UI Registered: ${plugin.name}`);
    }
  }

  return pluginList;
}
