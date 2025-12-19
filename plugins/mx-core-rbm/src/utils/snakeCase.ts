// plugins/mx-core-rbm/src/utils/snakeCase.ts

/**
 * Mengubah string label menjadi snake_case
 * Contoh:
 *   "TAG NO."     → "tag_number"
 *   "Flow Max"    → "flow_max"
 *   "Flow (Nm3/h)" → "flow"
 */
const EXCEPTION_MAP: Record<string, string> = {
  'tag no.': 'tag_number',
};

export function toSnakeCase(input: string): string {
  const normalized = input.trim().toLowerCase();

  // ✅ Tangani exception
  if (EXCEPTION_MAP[normalized]) {
    return EXCEPTION_MAP[normalized];
  }

  return normalized
    .replace(/\(.*?\)/g, '') // hilangkan unit di dalam tanda kurung
    .replace(/[^a-zA-Z0-9 ]/g, '') // hilangkan karakter non-alfabet/numerik
    .split(/\s+/)
    .filter(Boolean)
    .join('_');
}
