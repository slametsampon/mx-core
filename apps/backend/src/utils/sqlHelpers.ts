// apps/backend/src/utils/sqlHelpers.ts

export function buildInsert(data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  return { keys, values, placeholders };
}

export function buildUpdate(data: Record<string, any>) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const assignments = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  return { assignments, values };
}
