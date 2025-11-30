// packages/core/src/rbac/init.ts

import { defineRule } from './rules';
import type { RBACRule } from '@mx-core/types';

/**
 * Daftarkan RBAC default rules yang akan selalu aktif
 * — misalnya role internal seperti Admin, Supervisor, dll.
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
    // Anda bisa tambahkan default rule lainnya di sini
  ];

  rules.forEach(defineRule);
}
