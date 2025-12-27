// packages/core/src/rbac/init.ts

import { defineRule, resetRules } from './rules';
import type { RBACRule } from '@mx-core/types';

/**
 * Daftarkan RBAC default rules yang akan selalu aktif
 */
export function registerDefaultRules() {
  const rules: RBACRule[] = [
    {
      role: 'Admin',
      resource: 'secure-data',
      action: 'read',
    },
    {
      role: 'Manager',
      resource: 'secure-data',
      action: 'read',
    },
    {
      role: 'Foreman',
      resource: 'metric',
      action: 'assign',
    },
    {
      role: 'Supervisor',
      resource: 'device',
      action: 'manage',
    },
    {
      role: 'Engineer',
      resource: 'equipment',
      action: 'operate',
    },
  ];

  rules.forEach(defineRule);
}

/**
 * Initialize ulang sistem RBAC
 * Bisa digunakan di SSR, test, dynamic reload
 */
export function initializeRBAC(opts?: { includeDefault?: boolean }) {
  resetRules();
  if (opts?.includeDefault ?? true) {
    registerDefaultRules();
  }
}
