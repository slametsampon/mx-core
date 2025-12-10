// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { ConfigurationView } from '@/components/ConfigurationView';
import { fetchAssetTypes } from '@/services/assetTypeService';
import { logger } from '@/utils/logger';

interface AssetType {
  asset_type_id: string;
  label: string;
  category_id: string;
}

export default function ConfigurationPage() {
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string>('');

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

  const handleChangeAssetType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    logger.info(`🌀 [ConfigurationPage] Switched asset-type to: ${newType}`);
    setSelectedAssetTypeId(newType);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        ⚙️ Konfigurasi Aset: {selectedAssetTypeId || '(tidak ada)'}
      </h1>

      <div className="w-full max-w-md">
        <label
          htmlFor="assetTypeSelect"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Pilih Jenis Aset
        </label>{' '}
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

      {selectedAssetTypeId && (
        <ConfigurationView assetTypeId={selectedAssetTypeId} />
      )}
    </div>
  );
}
