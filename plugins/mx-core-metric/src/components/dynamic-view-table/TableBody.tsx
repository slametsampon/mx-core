// plugins/mx-core-metric/src/components/dynamic-view-table/TableBody.tsx

'use client';

import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type Field = { key: string; label: string };

type Props = {
  fields: Field[];
  data: any[];
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: string) => void;
  startNumber: number;
};

export function TableBody({
  fields,
  data,
  sortField,
  sortDirection,
  onSort,
  startNumber,
}: Props) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 font-semibold">#</th>
            {fields.map((f) => {
              const isSorted = sortField === f.key;
              return (
                <th
                  key={f.key}
                  className="cursor-pointer px-4 py-2 font-semibold hover:underline"
                  onClick={() => onSort(f.key)}
                >
                  <span className="inline-flex items-center">
                    {f.label}
                    {isSorted &&
                      (sortDirection === 'asc' ? (
                        <ChevronUpIcon className="ml-1 h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="ml-1 h-4 w-4 text-gray-500" />
                      ))}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={fields.length + 1} className="p-4 text-center">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            data.map((item, i) => (
              <tr
                key={i}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">{startNumber + i}</td>
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
  );
}
