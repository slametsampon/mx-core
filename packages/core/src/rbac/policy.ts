// packages/core/src/rbac/policy.ts

import { RBACContext } from '@mx-core/types';
import { getRules } from './rules';

export function canAccess(context: RBACContext): boolean {
  return getRules().some(
    (rule) =>
      rule.role === context.role &&
      rule.resource === context.resource &&
      rule.action === context.action
  );
}
