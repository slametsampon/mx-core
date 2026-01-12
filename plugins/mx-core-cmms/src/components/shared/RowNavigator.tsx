// plugins/mx-core-rbm/src/components/shared/RowNavigator.tsx

'use client';

import React from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';

type Props = {
  currentIndex: number;
  totalRows: number;
  onNavigate: (index: number) => void;
};

export default function RowNavigator({
  currentIndex,
  totalRows,
  onNavigate,
}: Props) {
  const handleNavigate = (index: number) => {
    const clamped = Math.max(0, Math.min(index, totalRows - 1));
    onNavigate(clamped);
  };

  return (
    <div className="flex flex-col items-start justify-end space-y-2">
      <div className="flex items-center justify-center gap-2">
        {/* Tombol: Awal */}
        <button
          type="button"
          onClick={() => handleNavigate(0)}
          disabled={currentIndex === 0}
          className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
          title="Awal"
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Tombol: Sebelumnya */}
        <button
          type="button"
          onClick={() => handleNavigate(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
          title="Sebelumnya"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Info: Row x of y */}
        <span className="min-w-[100px] text-center text-sm font-medium text-gray-700 dark:text-gray-300">
          Row {Math.min(currentIndex + 1, totalRows)} of {totalRows}
        </span>

        {/* Tombol: Berikutnya */}
        <button
          type="button"
          onClick={() => handleNavigate(currentIndex + 1)}
          disabled={currentIndex >= totalRows - 1}
          className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
          title="Berikutnya"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Tombol: Akhir */}
        <button
          type="button"
          onClick={() => handleNavigate(totalRows - 1)}
          disabled={currentIndex >= totalRows - 1}
          className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
          title="Akhir"
        >
          <ChevronDoubleRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
