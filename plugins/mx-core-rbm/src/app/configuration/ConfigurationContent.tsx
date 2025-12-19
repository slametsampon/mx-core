// plugins/mx-core-rbm/src/app/configuration/ConfigurationContent.tsx

'use client';

import { useState } from 'react';
import ModelFormRenderer from '@/components/configuration/ModelFormRenderer';
import DynamicTable from '@/components/configuration/DynamicTable';
import SidebarNavigation from '@/components/configuration/SidebarNavigation';

import { zodToFieldDefs } from '@/utils/zodToFieldDefs';
import { assetSchema } from '@/models/asset/asset';
import { modelOptions, ModelName } from '@/config/modelDefinitions';
import { useModelManager } from '@/hooks/useModelManager';

import { useImportSchema } from '@/contexts/ImportSchemaContext';
import AssetTypeEditor from '@/components/configuration/import/AssetTypeEditor'; // ✅ Tambahkan ini

export default function ConfigurationContent() {
  const [mode, setMode] = useState<'manual' | 'import'>('manual');
  const [selectedModel, setSelectedModel] = useState<ModelName>(
    modelOptions[0].id
  );
  const [selectedSchemaName, setSelectedSchemaName] = useState<string | null>(
    null
  );

  const { worksheetDefs } = useImportSchema();

  const selectedWorksheet =
    worksheetDefs.find((d) => d.suggestedSchemaName === selectedSchemaName) ??
    null;

  const {
    data,
    setData,
    schema,
    loading,
    isReady,
    editIndex,
    tableFields,
    setEditIndex,
    setSchema,
    handleSave,
    handleEdit,
    handleDelete,
  } = useModelManager(selectedModel);

  return (
    <div className="flex min-h-screen">
      <SidebarNavigation
        mode={mode}
        selectedModel={selectedModel}
        selectedAssetTypeId={selectedSchemaName ?? ''}
        onModelSelect={(modelId) => {
          setMode('manual');
          setSelectedModel(modelId as ModelName);
          setSelectedSchemaName(null);
          setEditIndex(null);
        }}
        onAssetTypeSelect={(schemaName) => {
          setMode('import');
          setSelectedSchemaName(schemaName);
        }}
      />

      <main className="flex-1 space-y-6 p-6">
        {/* ========= MANUAL MODE ========= */}
        {mode === 'manual' && (
          <>
            <h1 className="text-2xl font-bold text-gray-800">
              ⚙️ Konfigurasi Data: {selectedModel}
            </h1>

            <div className="rounded border bg-white p-4 shadow">
              {loading || !isReady ? (
                <p>⏳ Memuat data dan schema...</p>
              ) : (
                <ModelFormRenderer
                  selectedModel={selectedModel}
                  schema={schema}
                  data={data}
                  editIndex={editIndex}
                  onSave={handleSave}
                  setSchema={setSchema}
                  setData={() => {}}
                  setEditIndex={setEditIndex}
                />
              )}
            </div>

            <div className="rounded border bg-white p-4 shadow">
              {loading || !isReady ? (
                <p>⏳ Memuat data dan schema...</p>
              ) : (
                <DynamicTable
                  data={data}
                  setData={setData}
                  fields={
                    selectedModel === 'asset'
                      ? zodToFieldDefs(assetSchema)
                      : tableFields
                  }
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </div>
          </>
        )}

        {/* ========= IMPORT MODE ========= */}
        {mode === 'import' && selectedWorksheet && (
          <>
            <h1 className="text-2xl font-bold text-gray-800">
              ⚙️ Interpretasi Struktur (Import XLSX)
            </h1>

            {/* ✅ Editor Schema Terintegrasi */}
            <AssetTypeEditor worksheet={selectedWorksheet} />
          </>
        )}
      </main>
    </div>
  );
}
