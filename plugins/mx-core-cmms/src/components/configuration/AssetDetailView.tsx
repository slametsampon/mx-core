// plugins/mx-core-rbm/src/components/configuration/AssetDetailView.tsx

'use client';

import { FieldDefinition } from '@/models/asset/asset-type-schema';

type Props = {
  data: Record<string, any>;
  fields: FieldDefinition[];
};

export default function AssetDetailView({ data, fields }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {fields.map((field) => {
        const value = data[field.name];

        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-600">
              {field.label}
              {field.unit ? ` (${field.unit})` : ''}
            </label>
            <div className="mt-1 rounded border bg-gray-50 p-2 text-sm text-gray-800">
              {renderValue(field, value)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderValue(field: FieldDefinition, value: any): string {
  if (value === undefined || value === null) return '-';

  switch (field.type) {
    case 'boolean':
      return value ? 'Ya' : 'Tidak';
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'enum':
      return value;
    case 'number':
      return value.toString();
    case 'string':
    default:
      return value;
  }
}
