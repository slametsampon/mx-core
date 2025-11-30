// scripts/debug-load-plugins.ts

import { loadPlugins } from '@mx-core/core';
import { getRules } from '@mx-core/core/rbac/rules';

(async () => {
  await loadPlugins('plugins');
  console.log('✅ Loaded Rules:', getRules());
})();
