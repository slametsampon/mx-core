// plugins/mx-core-rbm/src/hooks/useConfigurationManager.ts

'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/utils/logger';
import { loadMockData, saveMockData } from '@/services/mockDataService';

import { zodToFieldDefs } from '@/utils/zodToFieldDefs';

import { Asset, assetSchema } from '@/models/asset/asset';
import { assetCategorySchema } from '@/models/asset/asset-category';
import { assetTypeSchema } from '@/models/asset/asset-type';
import { AssetTypeSchema } from '@/models/asset/asset-type-schema';
import { fetchAssetTypeSchemaById } from '@/services/assetTypeSchemaService';

export function useConfigurationManager(selectedModel: string) {
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
            setTableFields(fields);
            logger.debug('✅ [asset-category] fields:', fields);

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
            logger.debug('✅ [asset-type] fields:', fields);

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
              logger.warn('⚠️ [asset] Data kosong, gunakan default schema');
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
            break;
          }

          default:
            logger.warn(
              `⚠️ Tidak ada handler schema untuk model: ${selectedModel}`
            );
            setSchema(null);
        }

        setIsReady(true);
        logger.info(`[ConfigurationManager] ✅ Model loaded: ${selectedModel}`);
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
