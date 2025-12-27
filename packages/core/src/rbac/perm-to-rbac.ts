// packages/core/src/rbac/perm-to-rbac.ts

import type { Perm } from '@mx-core/types/src/permissions';
import type { UserRole, RBACContext } from '@mx-core/types';

// Mapping static perm → resource + action
const PERM_MAP: Record<Perm, { resource: string; action: string }> = {
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
  if (!mapping) return undefined;

  return {
    role,
    resource: mapping.resource,
    action: mapping.action as any, // Sesuaikan jika mapping belum full typed
  };
}
