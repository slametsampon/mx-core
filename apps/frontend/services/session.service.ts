// apps/frontend/services/session.service.ts

/**
 * Service: Session Management
 *
 * Bertanggung jawab membuat session user untuk plugin melalui endpoint backend `/api/session`.
 * Digunakan oleh `AuthService` (khususnya saat membuka plugin iframe) untuk membuat sesi scoped.
 *
 * 🔄 Relasi:
 * - Digunakan dalam `HomePageClient.tsx` saat membuka plugin.
 * - Terintegrasi dengan `AuthService.logout()` untuk menghapus session di backend.
 */

import type { UserBase } from '@mx-core/types';

/**
 * Membuat session user untuk keperluan plugin dengan scope tertentu.
 *
 * Session ini akan:
 * - Disimpan di backend memory store
 * - Diakses plugin melalui parameter `?session=` atau fallback localStorage
 *
 * @param user - Informasi user (tanpa token)
 * @param scope - Scope plugin, biasanya `plugin.basePath` (misalnya: "/mx-core-metric")
 * @returns Promise yang menghasilkan `sessionId` string
 * @throws Error jika gagal membuat sesi
 */
export async function createSession(
  user: UserBase,
  scope?: string
): Promise<string> {
  const res = await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...user,
      scope,
    }),
  });

  if (!res.ok) {
    throw new Error('Gagal membuat sesi.');
  }

  const { sessionId } = await res.json();
  return sessionId;
}
