// packages/types/src/user.ts
import type { UserRole } from './roles';

export interface UserBase {
  username: string;
  avatarUrl?: string;
  role: UserRole;
}
