// plugins/mx-core-rbm/src/hooks/useConfigurationData.ts

'use client';

import { useEffect, useState } from 'react';
import { AssetType } from '@/models/asset-type';
import { Asset } from '@/models/asset';
import { AssetDetail } from '@/models/asset-detail';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import { fetchAssetTypes } from '@/services/assetTypeService';
import { fetchAssetTypeSchemaById } from '@/services/assetTypeSchemaService';
import { fetchAssetsByType } from '@/services/assetService';
import { fetchAssetDetailData } from '@/services/assetDetailDataService';
import { logger } from '@/utils/logger';

export function useConfigurationData() {
  const [assetTypes, setAssetTypes] = useState<AssetType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedAssetTypeId, setSelectedAssetTypeId] = useState<string>('');
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetDetails, setAssetDetails] = useState<AssetDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const types = await fetchAssetTypes();
        setAssetTypes(types);

        const defaultCategory = types[0]?.category_id || '';
        setSelectedCategory(defaultCategory);

        const defaultAssetTypeId = types[0]?.asset_type_id || '';
        setSelectedAssetTypeId(defaultAssetTypeId);

        logger.info('✅ Asset types loaded:', types.length);
      } catch (err: any) {
        logger.error('❌ Failed loading asset types:', err.message);
      }
    };
    loadTypes();
  }, []);

  useEffect(() => {
    const loadDetails = async () => {
      if (!selectedAssetTypeId) return;

      setLoading(true);

      try {
        const [schema, assets, details] = await Promise.all([
          fetchAssetTypeSchemaById(selectedAssetTypeId),
          fetchAssetsByType(selectedAssetTypeId),
          fetchAssetDetailData(selectedAssetTypeId),
        ]);

        setSchema(schema);
        setAssets(assets);
        setAssetDetails(details);

        logger.info('✅ Schema + assets + details loaded');
      } catch (err: any) {
        logger.error('❌ Failed loading data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [selectedAssetTypeId]);

  const filteredAssetTypes = assetTypes.filter(
    (t) => t.category_id === selectedCategory
  );

  const categories = Array.from(new Set(assetTypes.map((t) => t.category_id)));

  return {
    categories,
    assetTypes,
    filteredAssetTypes,
    selectedCategory,
    selectedAssetTypeId,
    schema,
    assets,
    assetDetails,
    setSelectedCategory,
    setSelectedAssetTypeId,
    loading,
  };
}
