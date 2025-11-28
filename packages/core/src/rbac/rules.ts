// packages/core/src/rbac/rules.ts

import { RBACRule } from '@mx-core/types';

const rules: RBACRule[] = [];

export function defineRule(rule: RBACRule) {
  rules.push(rule);
}

export function getRules(): RBACRule[] {
  return rules;
}

export function resetRules() {
  rules.length = 0;
}
