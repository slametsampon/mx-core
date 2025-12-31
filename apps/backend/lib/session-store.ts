// apps/backend/lib/session-store.ts

import { SessionRecord } from '../types/session';

const SESSION_TTL_MS = 1000 * 60 * 30; // 30 menit

// Simpan dalam map memory
const sessionStore = new Map<string, SessionRecord>();

export const SessionStore = {
  create(user: SessionRecord['user']): SessionRecord {
    const id = crypto.randomUUID(); // Bisa ganti ke nanoid / uuid
    const now = Date.now();

    const record: SessionRecord = {
      id,
      user,
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
    };

    sessionStore.set(id, record);
    return record;
  },

  get(id: string): SessionRecord | null {
    const record = sessionStore.get(id);
    if (!record) return null;

    if (Date.now() > record.expiresAt) {
      sessionStore.delete(id);
      return null;
    }

    return record;
  },

  delete(id: string): void {
    sessionStore.delete(id);
  },

  clear(): void {
    sessionStore.clear();
  },

  has(id: string): boolean {
    return sessionStore.has(id);
  },
};
