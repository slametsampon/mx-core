// plugins/mx-core-rbm/src/utils/snakeCase.ts

import { resolveAlias } from './domainAliasResolver';

const EXCEPTION_MAP: Record<string, string> = {
  'tag no.': 'tag_number', // legacy support (optional)
};

export function toSnakeCase(input: string): string {
  const normalized = input.trim().toLowerCase();

  // ✅ Step 1: Tangani via domain alias resolver
  const alias = resolveAlias(normalized);
  if (alias) return alias;

  // ✅ Step 2: Tangani via EXCEPTION_MAP (jika masih ada)
  if (EXCEPTION_MAP[normalized]) {
    return EXCEPTION_MAP[normalized];
  }

  // ✅ Step 3: Normalisasi biasa (fallback)
  return normalized
    .replace(/\(.*?\)/g, '') // hilangkan unit di dalam tanda kurung
    .replace(/[^a-zA-Z0-9 ]/g, '') // hilangkan karakter non-alfabet/numerik
    .split(/\s+/)
    .filter(Boolean)
    .join('_');
}
