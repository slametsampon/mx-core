// packages/core/src/plugin-registry.ts

import { PluginMeta } from './types';

const registry = new Map<string, PluginMeta>();

export function registerPlugin(meta: PluginMeta) {
  registry.set(meta.name, meta);
}

export function getPlugins(): PluginMeta[] {
  return Array.from(registry.values());
}
