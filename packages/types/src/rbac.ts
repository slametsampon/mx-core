// packages/types/src/rbac.ts

import { UserRole } from './roles';

// ✅ SSOT: semua RBAC actions dari sini
export const RBAC_ACTIONS = [
  'operate',
  'create',
  'read',
  'update',
  'delete',
  'approve',
  'assign',
  'validate',
  'manage',
] as const;

export type RBACAction = (typeof RBAC_ACTIONS)[number];

export interface RBACRule {
  role: UserRole;
  resource: string;
  action: RBACAction;
  condition?: Record<string, unknown>;
}

export interface RBACContext {
  role: UserRole;
  resource: string;
  action: RBACAction;
}
