// apps/backend/src/middleware/requirePermission.ts

import { Request, Response, NextFunction } from 'express';
import { canAccess } from '@mx-core/core/rbac';
import type { UserRole, RBACAction } from '@mx-core/types';

export function requirePermission(resource: string, action: RBACAction) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.headers['x-role'] as UserRole;

    const context = { role, resource, action };
    if (!canAccess(context)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
