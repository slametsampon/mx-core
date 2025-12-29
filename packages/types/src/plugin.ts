// packages/types/src/plugin.ts

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
  emoji?: string;
  rbac?: {
    role: string;
    resource: string;
    action: string;
  }[];
  [key: string]: any;
}
