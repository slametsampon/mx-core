// packages/core/src/plugin-loader.ts

import path from 'path';
import fs from 'fs';
import { defineRule } from './rbac/rules';
import {
  USER_ROLES,
  RBAC_ACTIONS,
  type PluginMeta,
  type RBACRule,
  type UserRole,
  type RBACAction,
} from '@mx-core/types';

/**
 * Validasi aturan RBAC dari plugin.json
 */
function isValidRule(rule: any): boolean {
  if (
    typeof rule !== 'object' ||
    typeof rule.role !== 'string' ||
    typeof rule.resource !== 'string' ||
    typeof rule.action !== 'string'
  ) {
    return false;
  }

  const roleValid = USER_ROLES.includes(rule.role as UserRole);
  const actionValid = RBAC_ACTIONS.includes(rule.action as RBACAction);
  const resourceValid = rule.resource.trim().length > 0;

  return roleValid && actionValid && resourceValid;
}

export async function loadPlugins(
  pluginsDir = 'plugins',
  options?: { skipModuleCheck?: boolean }
): Promise<PluginMeta[]> {
  const resolvedPluginsDir = path.resolve(pluginsDir);

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
        `[Plugin Loader] ⚠️ Skipped: ${plugin.name} (plugin.json not found)`
      );
      continue;
    }

    const pluginConfig: PluginMeta = JSON.parse(
      fs.readFileSync(configPath, 'utf-8')
    );

    const entryPath = path.join(pluginPath, pluginConfig.module);

    if (!options?.skipModuleCheck && !fs.existsSync(entryPath)) {
      console.warn(
        `[Plugin Loader] ⚠️ Skipped: ${plugin.name} (module not found: ${entryPath})`
      );
      continue;
    }

    if (!pluginConfig.active) {
      console.log(`[Plugin Loader] ⏸️  Skipped (inactive): ${plugin.name}`);
      continue;
    }

    // 🧩 RBAC CONFIG → REGISTER
    if (Array.isArray(pluginConfig.rbac)) {
      for (const raw of pluginConfig.rbac) {
        if (!isValidRule(raw)) {
          console.warn(`[RBAC] ⚠️ Invalid rule in ${plugin.name}:`, raw);
          continue;
        }

        // 🧽 NORMALISASI tipe – agar cocok RBACRule (TS strict)
        const normRule: RBACRule = {
          role: raw.role as UserRole,
          resource: raw.resource,
          action: raw.action as RBACAction,
        };

        try {
          defineRule(normRule);
          console.log(
            `[RBAC] ✅ Rule registered from plugin "${plugin.name}":`,
            normRule
          );
        } catch (err) {
          console.error(
            `[RBAC] ❌ Error registering rule in plugin "${plugin.name}":`,
            normRule,
            err
          );
        }
      }
    }

    // 🧩 UI Plugin registry
    if (pluginConfig.ui) {
      pluginList.push({ ...pluginConfig, name: plugin.name });
      console.log(`[Plugin Loader] ✅ UI plugin registered: ${plugin.name}`);
    }
  }

  return pluginList;
}
