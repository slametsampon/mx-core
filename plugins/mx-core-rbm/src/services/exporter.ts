// plugins/mx-core-rbm/src/services/exporter.ts

import { AssetType } from '@/models/asset/asset-type';
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

  const headers = includedFields.map((f) => f.name);
  const rawKeys = includedFields.map((f) => f.rawName);

  const csv = [
    headers.join(';'),
    ...rows.map((row) =>
      rawKeys
        .map((key) => {
          const val = row[key];
          if (val == null) return '';
          const str = String(val);
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

/**
 * Export all schemas to JSON and trigger download
 * ✅ Termasuk VALIDASI: suggested name tidak boleh kosong/duplikat, dan category harus ada
 */
export function exportAllSchemasToJSON(allSchemas: AssetType[]) {
  // Validasi field kosong
  for (const item of allSchemas) {
    if (!item.asset_type_id?.trim()) {
      alert(`⚠️ Suggested name kosong pada "${item.label}"`);
      return;
    }
    if (!item.category_id?.trim()) {
      alert(`⚠️ Category kosong pada "${item.label}"`);
      return;
    }
  }

  // Validasi duplikat suggested name
  const seen = new Set<string>();
  for (const item of allSchemas) {
    const name = item.asset_type_id;
    if (seen.has(name)) {
      alert(`⚠️ Duplicate suggested name: "${name}"`);
      return;
    }
    seen.add(name);
  }

  // Jika lolos validasi, export
  const json = JSON.stringify(allSchemas, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'asset-type.json';
  a.click();

  URL.revokeObjectURL(url);
}
