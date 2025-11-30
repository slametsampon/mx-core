// packages/core/src/plugin-loader.ts

import path from 'path';
import fs from 'fs';
import { defineRule } from './rbac/rules.js';

export interface PluginMeta {
  name: string;
  type?: string;
  ui: boolean;
  api?: boolean;
  module: string;
  version?: string;
  description?: string;
  basePath?: string;
  active?: boolean;
  rbac?: any[];
  [key: string]: any;
}

function isValidRule(rule: any): boolean {
  return (
    rule &&
    typeof rule.role === 'string' &&
    typeof rule.resource === 'string' &&
    typeof rule.action === 'string'
  );
}

export async function loadPlugins(
  pluginsDir = 'plugins'
): Promise<PluginMeta[]> {
  console.log('[DEBUG] loadPlugins called with:', pluginsDir);

  const resolvedPluginsDir = path.resolve(pluginsDir);
  console.log('[DEBUG] Resolved plugin directory:', resolvedPluginsDir);

  if (!fs.existsSync(resolvedPluginsDir)) {
    throw new Error(`❌ Plugin directory not found: ${resolvedPluginsDir}`);
  }

  const pluginList: PluginMeta[] = [];

  const plugins = fs
    .readdirSync(resolvedPluginsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());

  for (const plugin of plugins) {
    const pluginPath = path.join(resolvedPluginsDir, plugin.name);
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

    if (!pluginConfig.active) {
      console.log(`[Plugin Loader] Skipped: ${plugin.name} (inactive)`);
      continue;
    }

    // 💡 Proses deklarasi RBAC rules
    if (Array.isArray(pluginConfig.rbac)) {
      for (const rule of pluginConfig.rbac) {
        try {
          if (isValidRule(rule)) {
            defineRule(rule);
            console.log(`[RBAC] Rule registered from ${plugin.name}:`, rule);
          } else {
            console.warn(`[RBAC] Invalid rule format in ${plugin.name}:`, rule);
          }
        } catch (err) {
          console.warn(`[RBAC] Invalid rule in ${plugin.name}:`, rule, err);
        }
      }
    }

    // 💡 Register plugin (yang UI-nya aktif)
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
