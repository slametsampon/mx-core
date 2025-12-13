// plugins/mx-core-rbm/src/services/assetDetailDataService.ts

// plugins/mx-core-rbm/src/services/assetDetailDataService.ts

import { API_BASE, USE_MOCK } from '@/config/config';
import { AssetDetail } from '@/models/asset-detail';
import { logger } from '@/utils/logger';

export async function fetchAssetDetailData(
  assetTypeId: string
): Promise<AssetDetail[]> {
  const url = USE_MOCK
    ? `${API_BASE}/asset-detail.json` // 📁 mock file
    : `${API_BASE}/api/rbm/asset-details?type=${assetTypeId}`; // 🌐 live API endpoint

  logger.info(
    `[${USE_MOCK ? 'MOCK' : 'LIVE'}] Fetching detail data from: ${url}`
  );

  try {
    const res = await fetch(url);
    if (!res.ok) {
      logger.warn(
        `⚠️ assetDetailData not found for: ${assetTypeId} (status=${res.status})`
      );
      return [];
    }

    const allData: AssetDetail[] = await res.json();

    // Jika LIVE, backend bisa sudah filter berdasarkan type
    const filtered = USE_MOCK
      ? allData.filter((d) =>
          d.tag_number.startsWith(assetTypeId.slice(0, 3).toUpperCase())
        )
      : allData;

    logger.info(
      `✅ Loaded ${filtered.length} asset-details for type=${assetTypeId}`
    );
    return filtered;
  } catch (error: any) {
    logger.error(
      `❌ fetchAssetDetailData failed for ${assetTypeId}:`,
      error.message
    );
    return [];
  }
}
