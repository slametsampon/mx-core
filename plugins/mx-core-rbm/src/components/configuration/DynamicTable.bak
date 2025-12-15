// plugins/mx-core-rbm/src/components/configuration/DynamicTable.tsx

'use client';

import React, { useMemo, useState } from 'react';
import { FieldDefinition } from '@/models/asset/asset-type-schema';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';

type Props = {
  data: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  fields: FieldDefinition[];
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (index: number) => void;
};

export default function DynamicTable({
  data,
  setData,
  fields,
  onEdit,
  onDelete,
}: Props) {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (fieldName: string) => {
    if (sortField === fieldName) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(fieldName);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const csv = Papa.unparse(sortedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const importedData = results.data as Record<string, any>[];

        // Validasi kolom
        const validColumns = fields.map((f) => f.name);
        const isValid = importedData.every((item) =>
          validColumns.every((col) => col in item)
        );

        if (!isValid) {
          alert('❌ CSV tidak valid. Pastikan semua kolom sesuai format.');
          return;
        }

        setData((prev) => [...prev, ...importedData]);
        e.target.value = '';
      },
      error: function (err) {
        alert(`❌ Gagal import CSV: ${err.message}`);
      },
    });
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

      if (valA === undefined) return 1;
      if (valB === undefined) return -1;
      if (valA === valB) return 0;
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedData.slice(start, end);
  }, [sortedData, currentPage, rowsPerPage]);

  if (!fields || fields.length === 0) {
    return <p>⚠️ Kolom belum tersedia.</p>;
  }

  return (
    <div className="space-y-4">
      {/* 🔍 Pencarian & Import/Export */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="🔍 Cari data..."
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none md:w-1/3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="flex gap-4 text-sm">
          <label className="cursor-pointer text-blue-600 hover:underline">
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>

          <button
            onClick={handleExportCSV}
            className="text-green-600 hover:underline"
          >
            Export CSV
          </button>
        </div>
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </td>
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
                          onClick={() =>
                            onDelete((currentPage - 1) * rowsPerPage + idx)
                          }
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

      {/* 🔢 Pagination */}
      <div className="flex items-center justify-between py-2 text-sm">
        <div className="text-gray-600">
          Halaman {currentPage} dari {totalPages}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="rounded border px-2 py-1 disabled:opacity-50"
          >
            ← Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="rounded border px-2 py-1 disabled:opacity-50"
          >
            Next →
          </button>

          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num} / halaman
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
