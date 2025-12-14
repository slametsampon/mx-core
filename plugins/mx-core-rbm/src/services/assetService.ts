// plugins/mx-core-rbm/src/services/assetService.ts

import { API_BASE, USE_MOCK } from '@/config/config';
import { Asset } from '@/models/asset/asset';
import { logger } from '@/utils/logger';

export async function fetchAssetsByType(assetTypeId: string): Promise<Asset[]> {
  const url = USE_MOCK
    ? `${API_BASE}/assets/${assetTypeId}.json` // 📁 mock file per asset type
    : `${API_BASE}/api/rbm/assets/by-type/${assetTypeId}`; // 🌐 live API endpoint

  logger.info(
    `📥 [${USE_MOCK ? 'MOCK' : 'LIVE'}] Fetching assets from: ${url}`
  );

  try {
    const res = await fetch(url);
    if (!res.ok) {
      logger.error(
        `❌ fetchAssetsByType [${assetTypeId}] status=${res.status}`
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
