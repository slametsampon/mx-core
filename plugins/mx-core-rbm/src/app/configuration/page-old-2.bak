// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { ConfigurationView } from '@/components/ConfigurationView';
import { fetchAssetTypes } from '@/services/assetTypeService';
import { logger } from '@/utils/logger';
import DynamicForm from '@/components/configuration/DynamicForm';

interface AssetType {
  asset_type_id: string;
  label: string;
  category_id: string;
}

const modelOptions = [
  { label: 'Asset Category', key: 'asset-category' },
  { label: 'Asset Type', key: 'asset-type' },
  { label: 'Asset Type Schema', key: 'asset-type-schema' },
  { label: 'Asset Detail', key: 'asset-detail' },
  { label: 'Asset', key: 'asset' },
  { label: 'RBM Model', key: 'rbm-model' },
];

export default function ConfigurationPage() {
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('asset-type');

  const [modelData, setModelData] = useState<any[]>([]);

  useEffect(() => {
    async function loadAssetTypes() {
      try {
        const data = await fetchAssetTypes();
        setAssetTypes(data);

        if (data.length > 0) {
          setSelectedAssetTypeId(data[0].asset_type_id);
          logger.info(`✅ Loaded ${data.length} asset types`);
        } else {
          logger.warn('⚠️ No asset types found');
        }
      } catch (err: any) {
        logger.error('❌ Failed to fetch asset types:', err.message);
      }
    }

    loadAssetTypes();
  }, []);

  // Load model data dynamically from /mocks
  useEffect(() => {
    async function loadModelData() {
      try {
        const res = await fetch(`/mocks/${selectedModel}.json`);
        const json = await res.json();
        setModelData(Array.isArray(json) ? json : []);
        logger.info(`✅ Loaded model data for ${selectedModel}`);
      } catch (err: any) {
        logger.error(`❌ Failed to load model ${selectedModel}:`, err.message);
      }
    }

    loadModelData();
  }, [selectedModel]);

  const handleChangeAssetType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    logger.info(`🌀 [ConfigurationPage] Switched asset-type to: ${newType}`);
    setSelectedAssetTypeId(newType);
  };

  const handleChangeModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    logger.info(`🧩 Switched model to: ${selected}`);
    setSelectedModel(selected);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        ⚙️ Konfigurasi Aset: {selectedAssetTypeId || '(tidak ada)'}
      </h1>

      {/* Dropdown Asset Type */}
      <div className="w-full max-w-md">
        <label
          htmlFor="typeSelect"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Pilih Jenis Aset
        </label>
        <select
          value={selectedAssetTypeId}
          onChange={handleChangeAssetType}
          className="w-full rounded border px-3 py-2 shadow-sm"
        >
          {assetTypes.map((type) => (
            <option key={type.asset_type_id} value={type.asset_type_id}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dropdown Model */}
      <div className="w-full max-w-md">
        <label
          htmlFor="modelSelect"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Pilih Data Model
        </label>
        <select
          value={selectedModel}
          onChange={handleChangeModel}
          className="w-full rounded border px-3 py-2 shadow-sm"
        >
          {modelOptions.map((model) => (
            <option key={model.key} value={model.key}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render Form jika tersedia */}
      {modelData.length > 0 ? (
        <div className="mt-6">
          <DynamicForm
            schema={{
              fields: Object.keys(modelData[0] || {}).map((key) => ({
                name: key,
                label: key,
                type: 'string', // default assumption
              })),
            }}
            onSubmit={(data) => console.log('📝 Submit model:', data)}
          />
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada data model ditemukan.</p>
      )}

      {/* View Form khusus AssetType (seperti semula) */}
      {selectedAssetTypeId && (
        <ConfigurationView assetTypeId={selectedAssetTypeId} />
      )}
    </div>
  );
}
