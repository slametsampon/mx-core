// packages/types/src/roles.ts

export type UserRole =
  | 'Guest'
  | 'Operator'
  | 'Teknisi'
  | 'Engineer'
  | 'Foreman'
  | 'Supervisor'
  | 'Superintendent'
  | 'Manager'
  | 'Admin';

// Urutan hierarki role (dari terendah ke tertinggi)
export const ROLE_ORDER: UserRole[] = [
  'Guest',
  'Operator',
  'Teknisi',
  'Engineer',
  'Foreman',
  'Supervisor',
  'Superintendent',
  'Manager',
  'Admin',
];

// Fungsi bandingkan level role
export function roleGte(a: UserRole, b: UserRole): boolean {
  return ROLE_ORDER.indexOf(a) >= ROLE_ORDER.indexOf(b);
}

// Fungsi normalisasi dari string bebas ke UserRole valid
export function normalizeRole(input: string): UserRole | undefined {
  const lower = input.toLowerCase();
  return ROLE_ORDER.find((role) => role.toLowerCase() === lower);
}
