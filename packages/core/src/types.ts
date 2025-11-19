// packages/core/types.ts

export interface PluginMeta {
  name: string;
  version: string;
  displayName: string;
  components?: string[];
  [key: string]: unknown;
}
