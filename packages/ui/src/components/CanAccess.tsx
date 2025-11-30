// packages/ui/src/components/CanAccess.tsx

import { ReactNode } from 'react';
import { canAccess } from '@mx-core/core/rbac';
import type { UserRole, RBACAction } from '@mx-core/types';

interface Props {
  role: UserRole;
  resource: string;
  action: RBACAction;
  children: ReactNode;
}

export const CanAccess = ({ role, resource, action, children }: Props) => {
  const context = { role, resource, action };
  return canAccess(context) ? <>{children}</> : null;
};
