// plugins/mx-core-rbm/src/components/configuration/SidebarNavigation.tsx

'use client';

import React from 'react';
import { modelOptions } from '@/config/modelDefinitions';
import { useImportSchema } from '@/contexts/ImportSchemaContext';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type Props = {
  mode: 'manual' | 'import' | 'import-list';
  selectedModel: string;
  selectedAssetTypeId?: string;
  onModelSelect: (modelId: string) => void;
  onAssetTypeSelect: (assetTypeId: string) => void;
  onImportListClick: () => void; // ✅ Tambahan
  collapsed: boolean;
  onToggleCollapse: () => void;
};

export default function SidebarNavigation({
  mode,
  selectedModel,
  selectedAssetTypeId,
  onModelSelect,
  onAssetTypeSelect,
  collapsed,
  onImportListClick,
  onToggleCollapse,
}: Props) {
  const { worksheetDefs, isLoading, error } = useImportSchema();

  return (
    <aside
      className={`transition-all duration-300 ${
        collapsed ? 'w-[48px]' : 'min-w-[220px] max-w-xs'
      } border-r bg-gray-50 p-2 dark:bg-gray-900 sm:p-4`}
    >
      {/* 🔘 Tombol collapse / expand */}
      <div className="mb-4 flex justify-end">
        <button
          onClick={onToggleCollapse}
          className="rounded bg-gray-300 p-1 text-xs hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <ChevronLeftIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Jika collapsed, sembunyikan isi */}
      {!collapsed && (
        <div className="space-y-6">
          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-500">
              🔽 Model Bawaan
            </h2>
            <select
              className="w-full rounded border px-3 py-2 shadow-sm"
              value={selectedModel}
              onChange={(e) => onModelSelect(e.target.value)}
            >
              {modelOptions.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onImportListClick}
            className="mb-2 w-full rounded border bg-white px-3 py-2 text-left text-sm font-medium text-blue-600 hover:bg-gray-100"
          >
            🗂 Lihat Semua Asset-Type
          </button>

          <div>
            <h2 className="mb-1 text-sm font-semibold text-gray-500">
              🔽 Asset-Type dari XLSX
            </h2>
            {isLoading ? (
              <p className="text-sm text-gray-400">⏳ Memuat file XLSX...</p>
            ) : error ? (
              <p className="text-sm text-red-500">⚠️ Gagal memuat XLSX</p>
            ) : worksheetDefs.length === 0 ? (
              <p className="text-sm text-gray-400">Tidak ada asset-type</p>
            ) : (
              <select
                className="w-full rounded border px-3 py-2 shadow-sm"
                value={selectedAssetTypeId ?? ''}
                onChange={(e) => onAssetTypeSelect(e.target.value)}
              >
                <option value="">-- Pilih Asset-Type --</option>
                {[...worksheetDefs]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((ws) => (
                    <option
                      key={ws.suggestedSchemaName}
                      value={ws.suggestedSchemaName}
                    >
                      {ws.label}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
