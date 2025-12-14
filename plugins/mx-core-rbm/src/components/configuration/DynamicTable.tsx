// plugins/mx-core-rbm/src/components/configuration/DynamicTable.tsx

'use client';

import { useMemo, useState } from 'react';
import { FieldDefinition } from '@/models/asset/asset-type-schema';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

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
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (fieldName: string) => {
    if (sortField === fieldName) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(fieldName);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;

    return data.filter((item) =>
      fields.some((f) => {
        const val = item[f.name];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, fields, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;

    return [...filteredData].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      // fallback untuk angka atau undefined
      if (valA === undefined) return 1;
      if (valB === undefined) return -1;
      if (valA === valB) return 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredData, sortField, sortDirection]);

  if (!fields || fields.length === 0) {
    return <p>⚠️ Kolom belum tersedia.</p>;
  }

  return (
    <div className="space-y-4">
      {/* 🔍 Input Pencarian */}
      <div className="w-full">
        <input
          type="text"
          placeholder="🔍 Cari data..."
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 📋 Tabel */}
      <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
        <table className="table w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">#</th>
              {fields.map((f) => {
                const isSorted = sortField === f.name;
                const SortIcon = () => {
                  if (!isSorted) return null;
                  return sortDirection === 'asc' ? (
                    <ChevronUpIcon className="ml-1 inline h-4 w-4 text-gray-600" />
                  ) : (
                    <ChevronDownIcon className="ml-1 inline h-4 w-4 text-gray-600" />
                  );
                };
                return (
                  <th
                    key={f.name}
                    className="cursor-pointer select-none px-4 py-2 hover:underline"
                    onClick={() => handleSort(f.name)}
                  >
                    <span className="inline-flex items-center">
                      {f.label}
                      {isSorted && <SortIcon />}
                    </span>
                  </th>
                );
              })}
              {(onEdit || onDelete) && (
                <th className="px-4 py-2 text-center">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((item, idx) => (
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
              ))
            ) : (
              <tr>
                <td
                  colSpan={fields.length + 2}
                  className="px-4 py-4 text-center text-gray-500"
                >
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
