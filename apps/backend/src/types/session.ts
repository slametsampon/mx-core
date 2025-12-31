// apps/backend/src/types/session.ts

import type { UserBase } from '@mx-core/types';

export type SessionRecord = {
  id: string;
  user: UserBase;
  createdAt: number;
  expiresAt: number;
  scope?: string; // ✅ plugin yang boleh pakai
};
