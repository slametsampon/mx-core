// packages/core/src/rbac/rules.ts

import { RBACRule, USER_ROLES, RBAC_ACTIONS } from '@mx-core/types';

const rules: RBACRule[] = [];

export function defineRule(rule: RBACRule) {
  if (!USER_ROLES.includes(rule.role)) {
    throw new Error(`defineRule(): Invalid role "${rule.role}"`);
  }

  if (!RBAC_ACTIONS.includes(rule.action)) {
    throw new Error(`defineRule(): Invalid action "${rule.action}"`);
  }

  rules.push(rule);
}

export function getRules(): RBACRule[] {
  return rules;
}

export function resetRules() {
  rules.length = 0;
}
