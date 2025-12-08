// plugins/mx-core-metric/src/components/DynamicViewTable.tsx

'use client';

import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';

type Props = {
  view: ViewKey;
  items: any[];
};

export function DynamicViewTable({ view, items }: Props) {
  const def = viewDefinitions[view];
  const fields = def.fields;

  return (
    <div className="rounded border bg-white p-4 shadow-sm dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold">{def.label}</h2>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {fields.map((f) => (
                <th key={f.key} className="px-4 py-2 font-semibold">
                  {f.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={fields.length} className="p-4 text-center">
                  Tidak ada data.
                </td>
              </tr>
            ) : (
              items.map((item, i) => (
                <tr
                  key={i}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {fields.map((f) => (
                    <td key={f.key} className="px-4 py-2">
                      {String(item[f.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
