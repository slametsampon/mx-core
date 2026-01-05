// apps/frontend/services/user.service.ts

/**
 * Service: User Mock
 *
 * Layanan utilitas untuk mengambil atau membuat user hanya jika mode mock aktif.
 * Berguna saat pengembangan lokal tanpa backend otentikasi aktif.
 *
 * 🔄 Relasi:
 * - Dipakai di `AuthService.login()` jika `isMockMode()` aktif.
 * - Membaca file `public/mocks/users.json`.
 */

import { isMockMode } from './mode';

/**
 * Mengambil data user berdasarkan username dari file `/mocks/users.json`.
 *
 * File ini tersedia di `public/mocks/users.json` dan hanya digunakan saat `isMockMode()` bernilai `true`.
 *
 * @example
 * ```json
 * {
 *   "users": [
 *     { "username": "admin", "passwordHash": "admin123", "role": "Admin" },
 *     { "username": "operator", "passwordHash": "operator123", "role": "Operator" }
 *   ]
 * }
 * ```
 *
 * @param username - Username yang ingin dicari
 * @returns User object jika ditemukan, `undefined` jika tidak
 */
export async function fetchUserByUsername(username: string) {
  if (!isMockMode()) return undefined;

  try {
    const baseUrl =
      typeof window !== 'undefined'
        ? window.location.origin // ✅ client-side
        : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // ✅ SSR fallback

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

/**
 * Simulasi pembuatan user baru dalam mode mock.
 *
 * Saat ini hanya mengembalikan `true` sebagai indikasi sukses tanpa melakukan apa-apa.
 * Dapat dikembangkan ke localStorage atau IndexedDB jika dibutuhkan.
 *
 * @param user - Objek user yang akan dibuat
 * @returns Promise<boolean> yang selalu mengembalikan `true`
 */
export async function createUser(user: any): Promise<boolean> {
  return true;
}
