// plugins/mx-core-rbm/src/services/assetDetailDataService.ts

import { AssetDetail } from '@/models/asset-detail';
import { logger } from '@/utils/logger';

export async function fetchAssetDetailData(
  assetTypeId: string
): Promise<AssetDetail[]> {
  const url = `/mocks/asset-detail.json`; // atau `/api/asset-detail?type=...`

  logger.info(`📥 [assetDetailDataService] Fetching detail data from: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      logger.warn(
        `⚠️ [assetDetailDataService] Detail data not found for: ${assetTypeId} (status=${res.status})`
      );
      return [];
    }

    const allData: AssetDetail[] = await res.json();
    const filtered = allData.filter(
      (d) => d.tag_number.startsWith(assetTypeId.slice(0, 3).toUpperCase()) // optional filter
    );

    logger.info(
      `✅ [assetDetailDataService] Loaded ${filtered.length} asset-details for type=${assetTypeId}`
    );

    return filtered;
  } catch (error: any) {
    logger.error(
      `❌ [assetDetailDataService] Failed fetching details for ${assetTypeId}:`,
      error.message
    );
    return [];
  }
}
