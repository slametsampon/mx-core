// plugins/mx-core-rbm/src/components/configuration/SchemaPreview.tsx

'use client';

import React from 'react';
import {
  AssetTypeSchema,
  FieldDefinition,
} from '@/models/asset/asset-type-schema';

type Props = {
  schema: AssetTypeSchema;
};

export default function SchemaPreview({ schema }: Props) {
  if (!schema?.fields?.length) {
    return <p className="text-sm text-gray-500">Schema belum tersedia.</p>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Field Teknis</h3>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Nama</th>
              <th className="border px-3 py-2">Label</th>
              <th className="border px-3 py-2">Tipe</th>
              <th className="border px-3 py-2">Required</th>
              <th className="border px-3 py-2">Unit</th>
              <th className="border px-3 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {schema.fields.map((field: FieldDefinition) => (
              <tr key={field.name} className="even:bg-gray-50">
                <td className="border px-3 py-2 font-mono">{field.name}</td>
                <td className="border px-3 py-2">{field.label}</td>
                <td className="border px-3 py-2">{field.type}</td>
                <td className="border px-3 py-2 text-center">
                  {field.required ? '✅' : ''}
                </td>
                <td className="border px-3 py-2">{field.unit || '-'}</td>
                <td className="border px-3 py-2">
                  {field.options?.join(', ') || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
