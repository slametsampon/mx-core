// plugins/mx-core-metric/src/components/dynamic-table/TableToolbar.tsx

'use client';

import React from 'react';

type Props = {
  title: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onImport: (file: File) => void;
  onExport: () => void;
};

export function TableToolbar({
  title,
  searchQuery,
  setSearchQuery,
  onImport,
  onExport,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:gap-4">
        <input
          type="text"
          placeholder="🔍 Cari..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded border px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />

        <label className="cursor-pointer text-blue-600 hover:underline">
          Import CSV
          <input
            type="file"
            accept=".csv"
            onChange={(e) => {
              if (e.target.files?.[0]) onImport(e.target.files[0]);
              e.target.value = '';
            }}
            className="hidden"
          />
        </label>

        <button onClick={onExport} className="text-green-600 hover:underline">
          Export CSV
        </button>
      </div>
    </div>
  );
}
