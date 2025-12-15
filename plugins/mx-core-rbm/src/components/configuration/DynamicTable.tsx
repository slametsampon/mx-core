// plugins/mx-core-rbm/src/components/configuration/DynamicTable.tsx

'use client';

import React, { useMemo, useState } from 'react';
import { FieldDefinition } from '@/models/asset/asset-type-schema';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import PaginationControls from './PaginationControls';
import ImportExportControls from './ImportExportControls';

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

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    return data.filter((item) =>
      fields.some((f) => {
        const val = item[f.name];
        return (
          val !== undefined &&
          String(val).toLowerCase().includes(searchQuery.toLowerCase())
        );
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
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredData, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  return (
    <div className="space-y-4">
      {/* Search + ImportExport */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="🔍 Cari data..."
          className="w-full rounded border px-3 py-2 text-sm shadow-sm md:w-1/3"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        <ImportExportControls
          fields={fields}
          sortedData={sortedData}
          setData={setData}
        />
      </div>

      <div className="overflow-x-auto rounded-md border bg-white shadow-sm">
        <table className="table w-full text-sm">
          <TableHeader
            fields={fields}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={setSortField}
            hasActionColumn={!!onEdit || !!onDelete}
          />
          <TableBody
            data={paginatedData}
            fields={fields}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </div>
  );
}
