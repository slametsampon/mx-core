// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';
import { loadMockData, saveMockData } from '@/services/mockDataService';

import DynamicForm from '@/components/configuration/DynamicForm';
import DynamicTable from '@/components/configuration/DynamicTable';
import TabbedFormAsset from '@/components/configuration/TabbedFormAsset';

import { Asset, assetSchema } from '@/models/asset/asset';
import { assetCategorySchema } from '@/models/asset/asset-category';
import { assetTypeSchema } from '@/models/asset/asset-type';
import { AssetTypeSchema } from '@/models/asset/asset-type-schema';
import { zodToFieldDefs } from '@/utils/zodToFieldDefs';
import TabbedFormSchema from '@/components/configuration/TabbedFormSchema';

const modelOptions = [
  { id: 'asset-category', label: 'Asset Category' },
  { id: 'asset-type', label: 'Asset Type' },
  { id: 'asset', label: 'Asset' },
];

export default function ConfigurationRootPage() {
  const [selectedModel, setSelectedModel] = useState(modelOptions[0].id);
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tableFields, setTableFields] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setIsReady(false);
      logger.info(`[useEffect] 🔁 Load model: ${selectedModel}`);

      try {
        const res = await loadMockData<any>(selectedModel);

        if (!Array.isArray(res?.data)) {
          logger.warn(`[useEffect] ⚠️ Data tidak valid atau schema kosong`);
          setData([]);
          setSchema(null);
          setIsReady(false);
          return;
        }

        const dataArray = res.data;
        setData(dataArray);
        logger.info(`✅ [loadMockData] Dapat ${dataArray.length} item`);

        switch (selectedModel) {
          case 'asset-category': {
            const fields = zodToFieldDefs(assetCategorySchema);
            setTableFields(fields); // ✅ INI DITAMBAHKAN
            logger.debug('✅ [asset-category] fields:', fields);

            setSchema({
              asset_type_id: 'asset-category',
              label: 'Asset Category', // ✅ tambahkan ini
              category_id: 'default', // ✅ atau sesuaikan
              fields,
              ppc_strategy: {
                preventive: [],
                predictive: [],
                corrective: [],
              },
              spare_parts: [],
            });
            break;
          }

          case 'asset-type': {
            const fields = zodToFieldDefs(assetTypeSchema);
            logger.debug('✅ [asset-type] fields:', fields);

            setTableFields(fields); // ✅ Tambah ini
            setSchema({
              asset_type_id: 'asset-type',
              label: 'Asset Type', // ✅ tambahkan ini
              category_id: 'default', // ✅ atau sesuaikan
              fields,
              ppc_strategy: {
                preventive: [],
                predictive: [],
                corrective: [],
              },
              spare_parts: [],
            });
            break;
          }

          case 'asset': {
            if (dataArray.length > 0) {
              const first = dataArray[0] as Asset;
              try {
                const schemaRes = await fetch(
                  `/schemas/asset-types/${first.asset_type_id}.json`
                );
                const schemaJson = await schemaRes.json();
                setSchema(schemaJson as AssetTypeSchema);
                logger.info(
                  `✅ [asset] Dynamic schema loaded for ${first.asset_type_id}`
                );
              } catch (error) {
                logger.warn(
                  `⚠️ [asset] Gagal fetch schema JSON, fallback ke default`
                );
                const fields = zodToFieldDefs(assetSchema);
                setTableFields(fields); // ✅ INI DITAMBAHKAN
                setSchema({
                  asset_type_id: 'asset',
                  label: 'Asset', // ✅ tambahkan ini
                  category_id: 'default', // ✅ atau sesuaikan
                  fields: zodToFieldDefs(assetSchema),
                  ppc_strategy: {
                    preventive: [],
                    predictive: [],
                    corrective: [],
                  },
                  spare_parts: [],
                });
              }
            } else {
              logger.warn('⚠️ [asset] Data kosong, gunakan default schema');
              setSchema({
                asset_type_id: 'asset',
                label: 'Asset', // ✅ tambahkan
                category_id: 'default', // ✅ tambahkan
                fields: zodToFieldDefs(assetSchema),
                ppc_strategy: {
                  preventive: [],
                  predictive: [],
                  corrective: [],
                },
                spare_parts: [],
              });
            }
            break;
          }

          default:
            logger.warn(
              `⚠️ Tidak ada handler schema untuk model: ${selectedModel}`
            );
            setSchema(null);
        }

        setIsReady(true);
        logger.info(`[ConfigurationPage] ✅ Model loaded: ${selectedModel}`);
      } catch (err: any) {
        logger.error(`❌ Gagal load ${selectedModel}:`, err.message);
        setData([]);
        setSchema(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedModel]);

  const handleSave = async (formData: Record<string, any>) => {
    logger.info(`💾 Menyimpan data: ${selectedModel}`);
    logger.debug(`💾 Data disimpan:`, formData);

    try {
      const updated = [...data];
      if (editIndex !== null) {
        updated[editIndex] = formData;
        setEditIndex(null);
      } else {
        updated.push(formData);
      }

      setData(updated);
      await saveMockData(selectedModel, updated);
      logger.info(`✅ Data ${selectedModel} berhasil disimpan`);
    } catch (err: any) {
      logger.error(`❌ Gagal simpan ${selectedModel}:`, err.message);
    }
  };

  const handleEdit = async (item: Record<string, any>) => {
    setLoading(true);
    const index = data.findIndex((row) => row === item);
    setEditIndex(index);
    logger.info(`✏️ Edit data index ${index}`, item);

    if (selectedModel === 'asset-type') {
      try {
        const res = await fetch(
          `/schemas/asset-types/${item.asset_type_id}.json`
        );
        const json = await res.json();

        const fullSchema: AssetTypeSchema = {
          ...json,
          asset_type_id: item.asset_type_id,
          label: item.label,
          category_id: item.category_id,
        };

        setSchema(fullSchema); // ✅ hanya update schema
        // ❌ jangan ubah data[]
      } catch (err: any) {
        logger.warn(
          `[Edit] ⚠️ Gagal load schema file untuk ${item.asset_type_id}`
        );
        setSchema({
          asset_type_id: item.asset_type_id,
          label: item.label ?? '',
          category_id: item.category_id ?? '',
          fields: [],
          ppc_strategy: {
            preventive: [],
            predictive: [],
            corrective: [],
          },
          spare_parts: [],
        });
      }
    }

    setLoading(false);
  };

  const handleDelete = async (index: number) => {
    logger.warn(`🗑️ Hapus item index ${index}`);
    try {
      const updated = [...data];
      updated.splice(index, 1);
      setData(updated);
      await saveMockData(selectedModel, updated);
      logger.info(`✅ Item dihapus dari model ${selectedModel}`);
    } catch (err: any) {
      logger.error(`❌ Gagal hapus item:`, err.message);
    }
  };

  const renderForm = () => {
    if (!schema) return <p>⚠️ Schema belum tersedia.</p>;
    if (!Array.isArray(data) || data.length === 0)
      return <p>⚠️ Data belum tersedia.</p>;

    if (selectedModel === 'asset') {
      const asset =
        editIndex !== null ? (data[editIndex] as Asset) : (data[0] as Asset);

      if (!asset) return <p>⚠️ Data asset tidak valid.</p>;

      return (
        <TabbedFormAsset
          key={asset.tag_number ?? editIndex} // 🔑 inilah pemicu re-render
          asset={asset}
          onSave={handleSave}
        />
      );
    }

    const initialSchema = schema;
    if (selectedModel === 'asset-type') {
      return (
        <TabbedFormSchema
          schema={initialSchema}
          onSave={(updated) => {
            const updatedData = [...data];
            if (editIndex !== null) {
              updatedData[editIndex] = updated;
              setData(updatedData);
              setEditIndex(null);
            } else {
              updatedData.push(updated);
              setData(updatedData);
            }

            setSchema(updated);
            saveMockData('asset-type', updatedData);
            logger.info('✅ [page] Schema asset-type diperbarui dan disimpan');
          }}
        />
      );
    }

    if (selectedModel === 'asset-category') {
      const initialData = editIndex !== null ? data[editIndex] : undefined;

      return (
        <DynamicForm
          fields={schema.fields}
          onSubmit={handleSave}
          initialData={initialData}
        />
      );
    }

    return <p>⚠️ Tidak ada form yang cocok untuk model ini.</p>;
  };

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
            setSelectedModel(e.target.value);
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
          renderForm()
        )}
      </div>

      <div className="rounded border bg-white p-4 shadow">
        {loading || !isReady ? (
          <p>⏳ Memuat data dan schema...</p>
        ) : (
          <DynamicTable
            data={data}
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
