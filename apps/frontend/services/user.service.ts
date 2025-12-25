// apps/frontend/services/user.service.ts

import { isMockMode } from './mode';

/**
 * Ambil user berdasarkan username (mock-mode).
 * Membaca dari public/mocks/users.json via fetch.
 */
export async function fetchUserByUsername(username: string) {
  if (!isMockMode()) return undefined;

  try {
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin // ✅ client-side
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // ✅ server-side fallback

    const res = await fetch(`${baseUrl}/mocks/users.json`);
    if (!res.ok) throw new Error('Gagal membaca users.json');

    const data = await res.json();
    const user = data.users.find((u: any) => u.username === username);
    return user;
  } catch (error) {
    console.error('❌ fetchUserByUsername error:', error);
    return undefined;
  }
}
export async function createUser(user: any) {
  return true; // simulasi sukses
}
