// plugins/mx-core-rbm/src/services/assetDetailService.ts

import { AssetDetail } from '@/models/asset-detail';
import { logger } from '@/utils/logger';

export async function fetchAssetDetails(
  assetTypeId: string
): Promise<AssetDetail[]> {
  try {
    const url = `/schemas/asset-types/${assetTypeId}.json`;

    logger.info(`📥 [assetDetailService] Fetching detail data from: ${url}`);

    const res = await fetch(url);
    if (!res.ok) {
      logger.warn(
        `⚠️ [assetDetailService] Detail data not found for: ${assetTypeId} (status=${res.status})`
      );
      return [];
    }

    const data: AssetDetail[] = await res.json();

    logger.info(
      `✅ [assetDetailService] Loaded ${data.length} asset-details for type=${assetTypeId}`
    );

    return data;
  } catch (error: any) {
    logger.error(
      `❌ [assetDetailService] Failed fetching details for ${assetTypeId}:`,
      error.message
    );
    return [];
  }
}
