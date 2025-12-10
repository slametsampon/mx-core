// plugins/mx-core-rbm/src/hooks/useAssetViewData.ts

import { useEffect, useState } from 'react';
import { fetchAssetTypeSchemaById } from '@/services/assetTypeSchemaService';
import { fetchAssetsByType } from '@/services/assetService';
import { fetchAssetDetailData } from '@/services/assetDetailDataService';
import { Asset } from '@/models/asset';
import { AssetDetail } from '@/models/asset-detail';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import { logger } from '@/utils/logger';

interface UseAssetViewDataResult {
  schema: AssetTypeSchema | null;
  asset: Asset[];
  detail: AssetDetail[];
  loading: boolean;
  error?: string;
}

export function useAssetViewData(assetTypeId: string): UseAssetViewDataResult {
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [asset, setAsset] = useState<Asset[]>([]);
  const [detail, setDetail] = useState<AssetDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      logger.info(
        `📥 [useAssetViewData] Loading all data for assetTypeId = ${assetTypeId}`
      );
      setLoading(true);
      try {
        logger.info(`[useAssetViewData] Loading data for: ${assetTypeId}`);
        const [schema, asset, detail] = await Promise.all([
          fetchAssetTypeSchemaById(assetTypeId),
          fetchAssetsByType(assetTypeId),
          fetchAssetDetailData(assetTypeId),
        ]);

        logger.info('✔️ schema:', schema);
        logger.info('✔️ asset:', asset);
        logger.info('✔️ detail:', detail);

        setSchema(schema);
        setAsset(asset);
        setDetail(detail);

        logger.info(
          `✅ [useAssetViewData] Loaded schema + ${asset.length} assets + ${detail.length} details`
        );
      } catch (err: any) {
        logger.error(
          `❌ [useAssetViewData] Failed loading data for ${assetTypeId}:`,
          err.message
        );
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (assetTypeId) load();
  }, [assetTypeId]);

  return { schema, asset, detail, loading, error };
}
