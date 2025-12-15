// plugins/mx-core-metric/src/components/dynamic-view-table/DynamicViewTable.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { viewDefinitions, ViewKey } from '@/config/viewDefinitions';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableToolbar } from '../TableToolbar';
import { TableBody } from './TableBody';
import { TablePagination } from '../TablePagination';

type Props = {
  view: ViewKey;
  items: any[];
  setItems: React.Dispatch<React.SetStateAction<any[]>>;
};

export function DynamicViewTable({ view, items, setItems }: Props) {
  const def = viewDefinitions[view];
  const fields = def.fields;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(sortedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${view}.csv`);
  };

  const handleImport = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const imported = results.data as any[];
        const valid = imported.every((item) =>
          fields.every((f) => f.key in item)
        );
        if (!valid) return alert('❌ Format kolom tidak sesuai.');

        setItems((prev) => [...prev, ...imported]);
        setCurrentPage(1);
      },
      error: (err) => {
        alert(`❌ Gagal import: ${err.message}`);
      },
    });
  };

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return items;
    return items.filter((item) =>
      fields.some((f) => {
        const val = item[f.key];
        return val
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      })
    );
  }, [items, fields, searchQuery]);

  const sortedData = useMemo(() => {
    if (!sortField) return filtered;
    return [...filtered].sort((a, b) => {
      const A = a[sortField];
      const B = b[sortField];
      if (typeof A === 'string')
        return sortDirection === 'asc'
          ? A.localeCompare(B)
          : B.localeCompare(A);
      return sortDirection === 'asc' ? A - B : B - A;
    });
  }, [filtered, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  return (
    <div className="space-y-4 rounded border bg-white p-4 shadow-sm dark:bg-gray-900">
      <TableToolbar
        title={def.label}
        searchQuery={searchQuery}
        setSearchQuery={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onImport={handleImport}
        onExport={handleExport}
      />

      <TableBody
        fields={fields}
        data={paginated}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        startNumber={(currentPage - 1) * rowsPerPage + 1}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setCurrentPage={setCurrentPage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
}
