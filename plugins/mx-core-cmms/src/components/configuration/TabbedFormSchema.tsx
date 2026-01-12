// plugins/mx-core-rbm/src/components/configuration/TabbedFormSchema.tsx

'use client';

import { useState, useEffect } from 'react';
import {
  AssetTypeSchema,
  FieldDefinition,
} from '@/models/asset/asset-type-schema';
import SchemaPreviewView from './SchemaPreviewView';
import PPCStrategyPanel from './PPCStrategyPanel';
import SparePartsTable from './SparePartsTable';
import FieldEditor from './FieldEditor';
import AssetTypeForm from './AssetTypeForm';
import { logger } from '@/utils/logger';

interface Props {
  schema: AssetTypeSchema;
  onSave?: (updated: AssetTypeSchema) => void;
}

const TabbedFormSchema = ({ schema, onSave }: Props) => {
  const [tab, setTab] = useState<
    'info' | 'fields' | 'editor' | 'ppc' | 'spare'
  >('fields');
  const [editableSchema, setEditableSchema] = useState<AssetTypeSchema>(schema);
  const [editableFields, setEditableFields] = useState<FieldDefinition[]>(
    schema.fields
  );

  useEffect(() => {
    logger.info('[TabbedFormSchema] 🔄 Sinkronisasi schema dari props');
    setEditableSchema(schema);
    setEditableFields(schema.fields ?? []);
  }, [schema]);

  const handleSave = () => {
    const updatedSchema: AssetTypeSchema = {
      ...editableSchema,
      fields: editableFields,
    };

    logger.info('[TabbedFormSchema] 💾 Simpan seluruh schema perubahan');
    logger.debug('[TabbedFormSchema] Final Schema:', updatedSchema);

    onSave?.(updatedSchema);
  };

  return (
    <div className="rounded border p-4">
      {/* Tabs */}
      <div className="mb-4 space-x-4 border-b pb-2">
        <button
          className={tab === 'info' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('info')}
        >
          🧾 Asset Type
        </button>
        <button
          className={tab === 'fields' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('fields')}
        >
          🧩 Field Definition
        </button>
        <button
          className={tab === 'editor' ? 'font-bold text-blue-600' : ''}
          onClick={() => setTab('editor')}
        >
          ✏️ Field Editor
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

      {/* Tab Contents */}
      {tab === 'info' && (
        <AssetTypeForm value={editableSchema} onChange={setEditableSchema} />
      )}

      {tab === 'fields' && <SchemaPreviewView fields={schema.fields} />}

      {tab === 'editor' && (
        <FieldEditor value={editableFields} onChange={setEditableFields} />
      )}

      {tab === 'ppc' && (
        <PPCStrategyPanel
          value={editableSchema.ppc_strategy}
          onChange={(v) =>
            setEditableSchema((prev) => ({ ...prev, ppc_strategy: v }))
          }
        />
      )}

      {tab === 'spare' && (
        <SparePartsTable
          value={editableSchema.spare_parts}
          onChange={(v) =>
            setEditableSchema((prev) => ({ ...prev, spare_parts: v }))
          }
        />
      )}

      {/* Save Button */}
      <div className="mt-6">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleSave}
        >
          💾 Simpan Semua Perubahan
        </button>
      </div>
    </div>
  );
};

export default TabbedFormSchema;
