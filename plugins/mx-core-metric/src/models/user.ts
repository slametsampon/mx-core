// plugins/mx-core-metric/src/models/user.ts

import { z } from 'zod';

export const UserRoleEnum = z.enum(['admin', 'engineer', 'operator', 'guest']);

export type UserRole = z.infer<typeof UserRoleEnum>;

export interface User {
  id: string;
  username: string;
  password_hash: string;
  role: UserRole;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

// Untuk validasi API input (jika nanti ada register)
export const userInputSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6).optional(),
  role: UserRoleEnum,
  avatarUrl: z.string().url().nullable().optional(),
});

// Representasi record yang ter-save di DB
export const userRecordSchema = z.object({
  id: z.string(),
  username: z.string(),
  password_hash: z.string(),
  role: UserRoleEnum,
  avatar_url: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Untuk login
export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;
