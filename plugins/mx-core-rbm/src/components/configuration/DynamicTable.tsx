// plugins/mx-core-rbm/src/components/configuration/DynamicTable.tsx

'use client';

import React from 'react';
import { FieldDefinition } from '@/models/asset-type-schema';

type Props = {
  fields: FieldDefinition[];
  data: Record<string, any>[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (index: number) => void;
};

export default function DynamicTable({
  fields,
  data,
  onEdit,
  onDelete,
}: Props) {
  if (!data || data.length === 0) {
    return <p className="text-sm text-gray-500">Belum ada data.</p>;
  }

  return (
    <div className="overflow-auto rounded border border-gray-200">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            {fields.map((field) => (
              <th key={field.name} className="border-b px-4 py-2 font-medium">
                {field.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="border-b px-4 py-2 font-medium">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="even:bg-gray-50">
              {fields.map((field) => (
                <td key={field.name} className="border-b px-4 py-2">
                  {String(row[field.name] ?? '')}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="space-x-2 border-b px-4 py-2">
                  {onEdit && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => onEdit(row)}
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => onDelete(i)}
                    >
                      🗑️
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
