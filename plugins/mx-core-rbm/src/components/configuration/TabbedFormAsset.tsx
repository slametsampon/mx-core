// plugins/mx-core-rbm/src/components/configuration/TabbedFormAsset.tsx

'use client';

import { useState } from 'react';
import { Asset } from '@/models/asset';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import AssetForm from './AssetForm';
import SchemaPreviewView from './SchemaPreviewView';
import PPCStrategyPanel from './PPCStrategyPanel';
import SparePartsTable from './SparePartsTable';

interface Props {
  asset: Asset;
  schema: AssetTypeSchema;
  onSave?: (formData: Record<string, any>) => void;
}

const TabbedFormAsset = ({ asset, schema }: Props) => {
  const [tab, setTab] = useState<'general' | 'fields' | 'ppc' | 'spare'>(
    'general'
  );

  return (
    <div className="rounded border p-4">
      <div className="mb-4 space-x-4 border-b pb-2">
        <button
          className={tab === 'general' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('general')}
        >
          🧾 Asset Info
        </button>
        <button
          className={tab === 'fields' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('fields')}
        >
          🧩 Field Definition
        </button>
        <button
          className={tab === 'ppc' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('ppc')}
        >
          🛠️ PPC Strategy
        </button>
        <button
          className={tab === 'spare' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('spare')}
        >
          🧰 Spare Parts
        </button>
      </div>

      {tab === 'general' && <AssetForm asset={asset} />}
      {tab === 'fields' && <SchemaPreviewView fields={schema.fields} />}
      {tab === 'ppc' && (
        <PPCStrategyPanel value={schema.ppc_strategy} readOnly />
      )}
      {tab === 'spare' && (
        <SparePartsTable value={schema.spare_parts} readOnly />
      )}
    </div>
  );
};

export default TabbedFormAsset;
