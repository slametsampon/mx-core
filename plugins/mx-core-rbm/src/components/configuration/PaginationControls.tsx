// plugins/mx-core-rbm/src/components/configuration/PaginationControls.tsx

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/20/solid';

type Props = {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (num: number) => void;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 py-2 text-sm md:flex-row">
      {/* 🧾 Info Halaman */}
      <div className="text-gray-700">
        Halaman <span className="font-medium">{currentPage}</span> dari{' '}
        <span className="font-medium">{totalPages}</span>
      </div>

      {/* 🔢 Kontrol Navigasi */}
      <div className="flex items-center gap-2">
        {/* ⏮ First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>

        {/* ← Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {/* → Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>

        {/* ⏭ Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded border px-2 py-1 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>

        {/* 🧾 Jumlah per Halaman */}
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="rounded border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
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
