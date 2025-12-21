// plugins/mx-core-rbm/src/services/exporter.ts

import { FieldDefinition } from '@/types/AssetTypeSchema';

/**
 * Build JSON schema content (string)
 */
export function buildSchemaJSON(
  assetTypeId: string,
  label: string,
  categoryId: string,
  fields: FieldDefinition[]
): string {
  const cleanedFields = fields
    .filter((f) => f.include)
    .map(({ name, label, type, required, unit, options }) => ({
      name,
      label,
      type,
      required,
      ...(unit ? { unit } : {}),
      ...(type === 'enum' && options ? { options } : {}),
    }));

  const schema = {
    asset_type_id: assetTypeId,
    label,
    category_id: categoryId || 'uncategorized',
    fields: cleanedFields,
    ppc_strategy: {
      preventive: [],
      predictive: [],
      corrective: [],
    },
    spare_parts: [],
  };

  return JSON.stringify(schema, null, 2);
}

/**
 * Convert rows to CSV content (string)
 * delimiter = ';'
 */
export function convertRowsToCSV(
  fields: FieldDefinition[],
  rows: Record<string, any>[]
): string {
  const includedFields = fields.filter((f) => f.include);

  // Header pakai name (snake_case)
  const headers = includedFields.map((f) => f.name);

  // Data diambil dari rawName
  const rawKeys = includedFields.map((f) => f.rawName);

  const csv = [
    headers.join(';'),
    ...rows.map((row) =>
      rawKeys
        .map((key) => {
          const val = row[key];
          if (val == null) return '';
          const str = String(val);
          // escape CSV jika perlu
          return /[;\n"]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
        })
        .join(';')
    ),
  ];

  return csv.join('\n');
}

/**
 * Trigger browser download
 */
export function triggerDownload(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
