// plugins/mx-core-metric/src/components/dynamic-view-table/TablePagination.tsx

'use client';

import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // ✅ Perbaikan di sini
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>; // ✅ Sekalian di sini juga
};

export function TablePagination({
  currentPage,
  totalPages,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
}: Props) {
  return (
    <div className="flex items-center justify-between py-2 text-sm">
      <div className="text-gray-600">
        Halaman {currentPage} dari {totalPages}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          ⏮ First
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          ← Prev
        </button>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          Next →
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded border px-2 py-1 disabled:opacity-50"
        >
          Last ⏭
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
  );
}
