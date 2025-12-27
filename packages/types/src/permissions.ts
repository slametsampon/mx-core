// packages/types/src/permissions.ts

import type { UserRole } from './roles';

// Daftar permission granular
export const PERMS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_HISTORY: 'view_history',
  OPERATE_EQUIPMENT: 'operate_equipment',
  CONFIGURE: 'configure',
  MANAGE_DEVICES: 'manage_devices',
} as const;

// Tipe union dari semua permission
export type Perm = (typeof PERMS)[keyof typeof PERMS];

// Mapping role → daftar permission
export const ROLE_PERMS: Record<UserRole, Perm[]> = {
  Guest: [PERMS.VIEW_DASHBOARD],
  Operator: [PERMS.VIEW_DASHBOARD, PERMS.VIEW_HISTORY, PERMS.OPERATE_EQUIPMENT],
  Teknisi: [PERMS.VIEW_DASHBOARD, PERMS.VIEW_HISTORY, PERMS.OPERATE_EQUIPMENT],
  Engineer: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  Foreman: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  Supervisor: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  Superintendent: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  Manager: [
    PERMS.VIEW_DASHBOARD,
    PERMS.VIEW_HISTORY,
    PERMS.OPERATE_EQUIPMENT,
    PERMS.CONFIGURE,
    PERMS.MANAGE_DEVICES,
  ],
  Admin: Object.values(PERMS),
};
