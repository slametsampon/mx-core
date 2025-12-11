// plugins/mx-core-rbm/src/components/configuration/TabbedFormSchema.tsx

'use client';

import { useState } from 'react';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import SchemaPreviewView from './SchemaPreviewView';
import PPCStrategyPanel from './PPCStrategyPanel';
import SparePartsTable from './SparePartsTable';

interface Props {
  schema: AssetTypeSchema;
  onSave?: (formData: Record<string, any>) => void;
}

const TabbedFormSchema = ({ schema }: Props) => {
  const [tab, setTab] = useState<'fields' | 'ppc' | 'spare'>('fields');

  return (
    <div className="rounded border p-4">
      <div className="mb-4 space-x-4 border-b pb-2">
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

export default TabbedFormSchema;
