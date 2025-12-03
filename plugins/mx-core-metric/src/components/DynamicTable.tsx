// plugins/mx-core-metric/src/components/DynamicTable.tsx

'use client';

import { modelDefinitions, ModelKey } from '@/config/modelDefinitions';

type Props = {
  model: ModelKey;
  items: any[];
  onEdit?: (data: any) => void;
  onDelete?: (data: any) => void;
};

export function DynamicTable({ model, items, onEdit, onDelete }: Props) {
  const fields = modelDefinitions[model].fields;

  return (
    <div className="overflow-auto rounded-lg border bg-white shadow-sm dark:bg-gray-900">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {fields.map((f) => (
              <th key={f.key} className="px-4 py-2 font-semibold">
                {f.label}
              </th>
            ))}
            <th className="px-4 py-2 font-semibold">⚙️ Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={fields.length + 1} className="p-4 text-center">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id} className="border-t">
                {fields.map((f) => (
                  <td key={f.key} className="px-4 py-2">
                    {String(item[f.key] ?? '')}
                  </td>
                ))}
                <td className="space-x-2 px-4 py-2">
                  <button
                    onClick={() => onEdit?.(item)}
                    title="Edit"
                    className="text-blue-600 hover:underline"
                  >
                    📝
                  </button>
                  <button
                    onClick={() => onDelete?.(item)}
                    title="Delete"
                    className="text-red-600 hover:underline"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
