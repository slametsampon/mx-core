// apps/frontend/services/session.service.ts
import type { UserBase } from '@mx-core/types';

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
