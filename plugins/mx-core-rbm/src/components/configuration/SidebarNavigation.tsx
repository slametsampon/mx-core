// plugins/mx-core-rbm/src/components/configuration/SidebarNavigation.tsx

'use client';

import React from 'react';
import { modelOptions } from '@/config/modelDefinitions';
import { useImportSchema } from '@/contexts/ImportSchemaContext';

type Props = {
  mode: 'manual' | 'import';
  selectedModel: string;
  selectedAssetTypeId?: string;
  onModelSelect: (modelId: string) => void;
  onAssetTypeSelect: (assetTypeId: string) => void;
};

export default function SidebarNavigation({
  mode,
  selectedModel,
  selectedAssetTypeId,
  onModelSelect,
  onAssetTypeSelect,
}: Props) {
  const { worksheetDefs, isLoading, error } = useImportSchema();

  return (
    <aside className="min-w-[220px] max-w-xs space-y-6 border-r bg-gray-50 p-4 dark:bg-gray-900">
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
            {worksheetDefs.map((ws) => (
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
    </aside>
  );
}
