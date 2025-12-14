// plugins/mx-core-rbm/src/hooks/useModelManager.ts

'use client';

import { useEffect, useState } from 'react';
import { logger } from '@/utils/logger';
import { getService } from '@/services/getService';
import { zodToFieldDefs } from '@/utils/zodToFieldDefs';

import { Asset, assetSchema } from '@/models/asset/asset';
import { assetCategorySchema } from '@/models/asset/asset-category';
import { assetTypeSchema } from '@/models/asset/asset-type';
import { AssetTypeSchema } from '@/models/asset/asset-type-schema';
import { fetchAssetTypeSchemaById } from '@/services/assetTypeSchemaService';
import { ModelName } from '@/config/modelDefinitions';

export function useModelManager(selectedModel: ModelName) {
  const [data, setData] = useState<Record<string, any>[]>([]);
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [tableFields, setTableFields] = useState<any[]>([]);

  const service = getService(selectedModel);

  // 🔁 Load data & schema saat model berubah
  useEffect(() => {
    loadModel();
  }, [selectedModel]);

  const loadModel = async () => {
    setLoading(true);
    setIsReady(false);
    logger.info(`[useModelManager] 🔁 Load model: ${selectedModel}`);

    try {
      const res = await service.getAll();

      if (!Array.isArray(res)) {
        logger.warn(`[useModelManager] ⚠️ Data tidak valid`);
        setData([]);
        setSchema(null);
        return;
      }

      setData(res);
      logger.info(`✅ [useModelManager] Dapat ${res.length} item`);

      // ⚙️ Handle dynamic schema per model
      switch (selectedModel) {
        case 'asset-category': {
          const fields = zodToFieldDefs(assetCategorySchema);
          setTableFields(fields);
          setSchema({
            asset_type_id: 'asset-category',
            label: 'Asset Category',
            category_id: 'default',
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
          setTableFields(fields);
          setSchema({
            asset_type_id: 'asset-type',
            label: 'Asset Type',
            category_id: 'default',
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
          if (res.length > 0) {
            const first = res[0] as Asset;
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
              logger.warn(`⚠️ [asset] Gagal fetch schema, fallback ke default`);
              const fields = zodToFieldDefs(assetSchema);
              setTableFields(fields);
              setSchema({
                asset_type_id: 'asset',
                label: 'Asset',
                category_id: 'default',
                fields,
                ppc_strategy: {
                  preventive: [],
                  predictive: [],
                  corrective: [],
                },
                spare_parts: [],
              });
            }
          } else {
            const fields = zodToFieldDefs(assetSchema);
            setTableFields(fields);
            setSchema({
              asset_type_id: 'asset',
              label: 'Asset',
              category_id: 'default',
              fields,
              ppc_strategy: {
                preventive: [],
                predictive: [],
                corrective: [],
              },
              spare_parts: [],
            });
            logger.warn('⚠️ [asset] Data kosong, gunakan default schema');
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
      logger.info(`[useModelManager] ✅ Model loaded: ${selectedModel}`);
    } catch (err: any) {
      logger.error(`❌ Gagal load ${selectedModel}:`, err.message);
      setData([]);
      setSchema(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (formData: Record<string, any>) => {
    logger.info(`💾 Menyimpan data: ${selectedModel}`);
    logger.debug(`💾 Data disimpan:`, formData);

    try {
      let updated: any[];

      if (editIndex !== null) {
        const cloned = [...data];
        const existing = cloned[editIndex];
        const merged = { ...existing, ...formData };
        cloned[editIndex] = merged;
        updated = cloned;
        setEditIndex(null);
        await service.update(merged.id, merged);
      } else {
        const created = await service.create(formData);
        updated = [...data, created];
      }

      setData(updated);
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
        const fullSchema = await fetchAssetTypeSchemaById(item.asset_type_id);

        if (fullSchema) {
          setSchema({
            ...fullSchema,
            asset_type_id: item.asset_type_id,
            label: item.label,
            category_id: item.category_id,
          });
        } else {
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
    const confirmDelete = window.confirm(
      `Yakin ingin menghapus data baris ke: ${index + 1}?`
    );
    if (!confirmDelete) return;

    try {
      const item = data[index];
      await service.delete(item.id);

      const updated = [...data];
      updated.splice(index, 1);
      setData(updated);
      logger.info(`✅ Item dihapus dari model ${selectedModel}`);
    } catch (err: any) {
      logger.error(`❌ Gagal hapus item:`, err.message);
    }
  };

  return {
    data,
    schema,
    loading,
    isReady,
    editIndex,
    tableFields,
    setSchema,
    setEditIndex,
    setData,
    handleSave,
    handleEdit,
    handleDelete,
  };
}
