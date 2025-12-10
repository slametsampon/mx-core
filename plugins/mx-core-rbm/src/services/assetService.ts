// plugins/mx-core-rbm/src/services/assetService.ts

import { API_BASE } from '@/config/config';
import { Asset } from '@/models/asset';
import { logger } from '@/utils/logger';

export async function fetchAssetsByType(assetTypeId: string): Promise<Asset[]> {
  const url = `${API_BASE}/assets/${assetTypeId}.json`;
  logger.info(`📥 Fetching asset list from: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      logger.error(
        `❌ Failed to fetch asset list for [${assetTypeId}] status=${res.status}`
      );
      return [];
    }

    const assets = await res.json();
    logger.info(`📦 Loaded ${assets.length} assets for type=${assetTypeId}`);
    return assets;
  } catch (error: any) {
    logger.error(
      `❌ fetchAssetsByType ERROR assetTypeId=${assetTypeId}`,
      error.message
    );
    return [];
  }
}
