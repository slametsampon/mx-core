// plugins/mx-core-rbm/src/components/DynamicTable.tsx

'use client';

import { AssetTypeSchema } from '@/models/asset-type-schema';

type Props = {
  schema?: AssetTypeSchema;
  data: Record<string, any>[];
};

export function DynamicTable({ schema, data }: Props) {
  if (!schema || !schema.fields) {
    return (
      <div className="text-sm italic text-gray-500">
        ⏳ Skema belum tersedia, sedang memuat...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
      <table className="table w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">#</th>
            {schema.fields.map((f) => (
              <th key={f.name} className="px-4 py-2">
                {f.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? (
            data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2">{idx + 1}</td>
                {schema.fields.map((f) => (
                  <td key={f.name} className="px-4 py-2">
                    {item[f.name] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={schema.fields.length + 1}
                className="py-4 text-center italic text-gray-500"
              >
                Data tidak tersedia
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
