// packages/core/src/rbac/perm-to-rbac.ts

import type { Perm } from '@mx-core/types/src/permissions';
import type { UserRole, RBACContext, RBACAction } from '@mx-core/types';
import { RBAC_ACTIONS } from '@mx-core/types';

const PERM_MAP: Record<Perm, { resource: string; action: RBACAction }> = {
  view_dashboard: { resource: 'dashboard', action: 'read' },
  view_history: { resource: 'history', action: 'read' },
  operate_equipment: { resource: 'equipment', action: 'operate' },
  configure: { resource: 'config', action: 'manage' },
  manage_devices: { resource: 'device', action: 'manage' },
};

export function permToContext(
  perm: Perm,
  role: UserRole
): RBACContext | undefined {
  const mapping = PERM_MAP[perm];
  if (!mapping || !RBAC_ACTIONS.includes(mapping.action)) return undefined;

  return {
    role,
    resource: mapping.resource,
    action: mapping.action,
  };
}
