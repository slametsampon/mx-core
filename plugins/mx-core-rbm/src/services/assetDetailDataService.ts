// plugins/mx-core-rbm/src/services/assetDetailDataService.ts

import { API_BASE } from '@/config/config';
import { AssetDetail } from '@/models/asset-detail';
import { logger } from '@/utils/logger';

export async function fetchAssetDetailData(
  assetTypeId: string
): Promise<AssetDetail[]> {
  const url = `${API_BASE}/asset-detail.json`;

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
    const filtered = allData.filter((d) =>
      d.tag_number.startsWith(assetTypeId.slice(0, 3).toUpperCase())
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
