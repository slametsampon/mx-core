// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';
import { loadMockData, saveMockData } from '@/services/mockDataService';

import DynamicForm from '@/components/configuration/DynamicForm';
import DynamicTable from '@/components/configuration/DynamicTable';
import TabbedFormSchema from '@/components/configuration/TabbedFormSchema';
import TabbedFormAsset from '@/components/configuration/TabbedFormAsset';

import { Asset } from '@/models/asset';
import { AssetTypeSchema, FieldDefinition } from '@/models/asset-type-schema';

const modelOptions = [
  { id: 'asset-category', label: 'Asset Category' },
  { id: 'asset-type', label: 'Asset Type' },
  { id: 'asset', label: 'Asset' },
  // ❌ asset-detail tidak perlu tampil di dropdown
];

export default function ConfigurationRootPage() {
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await loadMockData(selectedModel);
        const loadedData = res as unknown as Record<string, any>[];
        setData(loadedData);

        // Jika asset, ambil schema dari asset_type_id (1st item)
        if (selectedModel === 'asset' && loadedData.length > 0) {
          const firstAsset = loadedData[0] as Asset;
          const assetTypeId = firstAsset.asset_type_id;

          const schemaRes = await fetch(
            `/schemas/asset-types/${assetTypeId}.json`
          );
          const schemaJson = await schemaRes.json();
          setSchema(schemaJson as AssetTypeSchema);

          logger.info(`✅ Loaded asset-type schema: ${assetTypeId}`);
        } else if (selectedModel !== 'asset') {
          // Untuk model lain, gunakan schema langsung dari file mock
          const res = await loadMockData<{
            data: any[];
            schema?: AssetTypeSchema;
          }>(selectedModel);
          const dataOnly = res as any;
          setData(dataOnly.data || []);
          setSchema(dataOnly.schema || null);
        }

        logger.info(`[ConfigurationPage] Loaded model: ${selectedModel}`);
      } catch (err: any) {
        logger.error(`❌ Failed to load ${selectedModel}:`, err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedModel]);

  const handleSave = async (formData: Record<string, any>) => {
    logger.info(`[SAVE] Saving ${selectedModel}`, formData);
    try {
      const updated = [...data, formData];
      setData(updated);
      await saveMockData(selectedModel, updated);
      logger.info(`[SAVE] Success saving ${selectedModel}`);
    } catch (err: any) {
      logger.error(`[SAVE] Failed saving ${selectedModel}:`, err.message);
    }
  };

  const renderForm = () => {
    if (selectedModel === 'asset-type-schema' && schema) {
      return <TabbedFormSchema schema={schema} onSave={handleSave} />;
    }

    if (selectedModel === 'asset') {
      const asset = data?.[0] as Asset;
      const schemaObj = schema as AssetTypeSchema;
      if (!asset || !schemaObj) return <p>Data asset kosong.</p>;

      return (
        <TabbedFormAsset asset={asset} schema={schemaObj} onSave={handleSave} />
      );
    }

    if (schema && schema.fields) {
      return <DynamicForm fields={schema.fields} onSubmit={handleSave} />;
    }

    return <p>Schema tidak tersedia.</p>;
  };

  const assetFieldsOnly: FieldDefinition[] = [
    { name: 'tag_number', label: 'Tag Number', type: 'string', required: true },
    {
      name: 'description',
      label: 'Description',
      type: 'string',
      required: true,
    },
    {
      name: 'asset_type_id',
      label: 'Asset Type ID',
      type: 'string',
      required: true,
    },
    { name: 'unit', label: 'Unit', type: 'string', required: true },
    { name: 'area', label: 'Area', type: 'string', required: true },
    { name: 'status', label: 'Status', type: 'string', required: true },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        ⚙️ Konfigurasi Data: {selectedModel}
      </h1>

      {/* Dropdown pilih model */}
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
          onChange={(e) => setSelectedModel(e.target.value)}
          className="w-full rounded border px-3 py-2 shadow-sm"
        >
          {modelOptions.map((model) => (
            <option key={model.id} value={model.id}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Form */}
      <div className="rounded border bg-white p-4 shadow">
        {loading ? <p>Memuat data...</p> : renderForm()}
      </div>

      {/* Dynamic Table */}
      <div className="rounded border bg-white p-4 shadow">
        {loading ? (
          <p>Memuat data...</p>
        ) : selectedModel === 'asset' ? (
          <DynamicTable data={data} fields={assetFieldsOnly} />
        ) : schema?.fields ? (
          <DynamicTable data={data} fields={schema.fields} />
        ) : (
          <p>Schema tidak ditemukan</p>
        )}
      </div>
    </div>
  );
}
