// plugins/mx-core-rbm/src/components/configuration/TabbedFormAsset.tsx

'use client';

import { useEffect, useState } from 'react';
import { Asset } from '@/models/asset/asset';
import {
  AssetTypeSchema,
  PpcStrategyDefinition,
  SparePartTemplate,
} from '@/models/asset/asset-type-schema';
import AssetForm from './AssetForm';
import SchemaPreviewView from './SchemaPreviewView';
import PPCStrategyPanel from './PPCStrategyPanel';
import SparePartsTable from './SparePartsTable';
import { logger } from '@/utils/logger';

interface Props {
  asset: Asset;
  onSave: (formData: Record<string, any>) => void;
}

const TabbedFormAsset = ({ asset, onSave }: Props) => {
  const [tab, setTab] = useState<'general' | 'fields' | 'ppc' | 'spare'>(
    'general'
  );
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [updatedAsset, setUpdatedAsset] = useState<Asset>(asset);
  const [updatedPPC, setUpdatedPPC] = useState<PpcStrategyDefinition | null>(
    null
  );
  const [updatedSpare, setUpdatedSpare] = useState<SparePartTemplate[] | null>(
    null
  );

  // 🔍 Load schema JSON berdasarkan asset_type_id
  useEffect(() => {
    const fetchSchema = async () => {
      if (!asset.asset_type_id) {
        logger.warn(
          '[TabbedFormAsset] ⚠️ asset_type_id undefined — skip fetch schema'
        );
        setSchema(null);
        return;
      }

      try {
        const res = await fetch(
          `/schemas/asset-types/${asset.asset_type_id}.json`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        }

        const json = await res.json();
        logger.info(
          `[TabbedFormAsset] ✅ Schema loaded for ${asset.asset_type_id}`
        );
        setSchema(json);
        setUpdatedPPC(json.ppc_strategy);
        setUpdatedSpare(json.spare_parts);
      } catch (err: any) {
        logger.warn('[TabbedFormAsset] ⚠️ Gagal fetch schema:', err.message);
        setSchema(null);
      }
    };

    fetchSchema();
  }, [asset.asset_type_id]);

  const handleSave = () => {
    logger.info('[TabbedFormAsset] 💾 Simpan semua data perubahan');
    logger.debug('➡️ Asset:', updatedAsset);
    logger.debug('➡️ PPC:', updatedPPC);
    logger.debug('➡️ Spare Parts:', updatedSpare);

    const final: Record<string, any> = {
      ...updatedAsset,
      schema: {
        ...(schema ?? {}),
        ppc_strategy: updatedPPC ?? schema?.ppc_strategy ?? {},
        spare_parts: updatedSpare ?? schema?.spare_parts ?? [],
      },
    };

    onSave(final);
  };

  if (!schema) return <p>⚠️ Schema belum tersedia.</p>;

  return (
    <div className="rounded border p-4">
      <div className="mb-4 space-x-4 border-b pb-2">
        {(['general', 'fields', 'ppc', 'spare'] as const).map((t) => (
          <button
            key={t}
            className={tab === t ? 'font-bold text-blue-600' : ''}
            onClick={() => setTab(t)}
          >
            {t === 'general' && '🧾 Asset Info'}
            {t === 'fields' && '🧩 Field Definition'}
            {t === 'ppc' && '🛠️ PPC Strategy'}
            {t === 'spare' && '🧰 Spare Parts'}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <AssetForm asset={updatedAsset} onChange={setUpdatedAsset} />
      )}
      {tab === 'fields' && <SchemaPreviewView fields={schema.fields} />}
      {tab === 'ppc' && (
        <PPCStrategyPanel
          value={updatedPPC ?? schema.ppc_strategy}
          onChange={setUpdatedPPC}
          readOnly={false}
        />
      )}
      {tab === 'spare' && (
        <SparePartsTable
          value={updatedSpare ?? schema.spare_parts}
          onChange={setUpdatedSpare}
          readOnly={false}
        />
      )}

      {tab !== 'fields' && (
        <div className="mt-6">
          <button
            onClick={handleSave}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  );
};

export default TabbedFormAsset;
