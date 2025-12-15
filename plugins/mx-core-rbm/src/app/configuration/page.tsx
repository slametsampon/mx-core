// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useState } from 'react';
import ModelFormRenderer from '@/components/configuration/ModelFormRenderer';
import DynamicTable from '@/components/configuration/DynamicTable';
import { zodToFieldDefs } from '@/utils/zodToFieldDefs';
import { assetSchema } from '@/models/asset/asset';
import { modelOptions, ModelName } from '@/config/modelDefinitions';
import { useModelManager } from '@/hooks/useModelManager';

export default function ConfigurationRootPage() {
  const [selectedModel, setSelectedModel] = useState<ModelName>(
    modelOptions[0].id
  );
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
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        ⚙️ Konfigurasi Data: {selectedModel}
      </h1>

      <div className="w-full max-w-md">
        <label
          htmlFor="modelSelect"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Pilih Data Model
        </label>
        <select
          id="modelSelect"
          value={selectedModel}
          onChange={(e) => {
            setSelectedModel(e.target.value as ModelName);
            setEditIndex(null);
          }}
          className="w-full rounded border px-3 py-2 shadow-sm"
        >
          {modelOptions.map((model) => (
            <option key={model.id} value={model.id}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

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
            setData={(d) => {}}
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
    </div>
  );
}
