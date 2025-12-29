// packages/types/src/roles.ts

// ✅ SSOT: Daftar role tunggal & tidak boleh berubah sembarangan
export const USER_ROLES = [
  'Guest',
  'Operator',
  'Teknisi',
  'Engineer',
  'Foreman',
  'Supervisor',
  'Superintendent',
  'Manager',
  'Admin',
] as const;

export type UserRole = (typeof USER_ROLES)[number];

// Urutan hierarki role (dari terendah ke tertinggi)
export const ROLE_ORDER: UserRole[] = [...USER_ROLES];

// Bandingkan level role
export function roleGte(a: UserRole, b: UserRole): boolean {
  return ROLE_ORDER.indexOf(a) >= ROLE_ORDER.indexOf(b);
}

// Normalisasi dari string bebas ke UserRole (case-insensitive)
export function normalizeRole(input: string): UserRole | undefined {
  const lower = input.toLowerCase();
  return USER_ROLES.find((r) => r.toLowerCase() === lower);
}
