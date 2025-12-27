// packages/core/src/rbac/rules.ts

import { RBACRule, RBACAction, ROLE_ORDER } from '@mx-core/types';

const rules: RBACRule[] = [];

export function defineRule(rule: RBACRule) {
  // 🔒 Validasi role
  if (!ROLE_ORDER.includes(rule.role)) {
    throw new Error(`defineRule(): Invalid role "${rule.role}"`);
  }

  // 🔒 Validasi action
  const validActions: RBACAction[] = [
    'create',
    'read',
    'update',
    'delete',
    'approve',
    'assign',
    'validate',
    'manage',
  ];

  if (!validActions.includes(rule.action)) {
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
