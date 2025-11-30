// packages/types/src/rbac.ts

import { UserRole } from './roles';

export type RBACAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'assign'
  | 'validate'
  | 'manage';

export interface RBACRule {
  role: UserRole;
  resource: string;
  action: RBACAction;
  condition?: Record<string, unknown>; // optional for ABAC in future
}

export interface RBACContext {
  role: UserRole;
  resource: string;
  action: RBACAction;
}
