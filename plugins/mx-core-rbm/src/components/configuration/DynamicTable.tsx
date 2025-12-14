// plugins/mx-core-rbm/src/components/configuration/DynamicTable.tsx

'use client';

import { FieldDefinition } from '@/models/asset/asset-type-schema';

type Props = {
  data: Record<string, any>[];
  fields: FieldDefinition[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (index: number) => void;
};

export default function DynamicTable({
  data,
  fields,
  onEdit,
  onDelete,
}: Props) {
  console.log('✅ fields:', fields); // log untuk verifikasi
  console.log('✅ data:', data);

  if (!fields || fields.length === 0) {
    return <p>⚠️ Kolom belum tersedia.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
      <table className="table w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">#</th>
            {fields.map((f) => (
              <th key={f.name} className="px-4 py-2">
                {f.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-4 py-2 text-center">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-4 py-2">{idx + 1}</td>
              {fields.map((f) => (
                <td key={f.name} className="px-4 py-2">
                  {item[f.name] ?? '-'}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="space-x-2 px-4 py-2 text-center">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:underline"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(idx)}
                      className="text-red-600 hover:underline"
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
