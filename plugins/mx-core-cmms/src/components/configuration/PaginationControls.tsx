// plugins/mx-core-rbm/src/components/configuration/PaginationControls.tsx

'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number; // ✅ Tetap dipertahankan untuk kompatibilitas
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (num: number) => void; // ✅ Tetap dipertahankan
};

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-sm">
      {/* ⏮ First Page */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
        title="Halaman Pertama"
      >
        <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* ← Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
        title="Sebelumnya"
      >
        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* 📄 Label: Page x of y */}
      <span className="min-w-[100px] text-center font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      {/* → Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
        title="Berikutnya"
      >
        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
      </button>

      {/* ⏭ Last Page */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="rounded bg-gray-100 p-1.5 hover:bg-gray-200 disabled:opacity-40"
        title="Halaman Terakhir"
      >
        <ChevronDoubleRightIcon className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
}
