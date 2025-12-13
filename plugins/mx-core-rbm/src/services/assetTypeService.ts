// plugins/mx-core-rbm/src/services/assetTypeService.ts

import { API_BASE, USE_MOCK } from '@/config/config';
import { logger } from '@/utils/logger';
import { AssetType } from '@/models/asset-type'; // pastikan tipe ini tersedia

export async function fetchAssetTypes(): Promise<AssetType[]> {
  try {
    const url = USE_MOCK
      ? `${API_BASE}/asset-type.json` // 👉 mock file di public/mocks
      : `${API_BASE}/api/rbm/asset-types`; // 👉 live API endpoint

    logger.info(`[fetchAssetTypes] GET ${url}`);

    const res = await fetch(url);
    if (!res.ok)
      throw new Error(
        `[fetchAssetTypes] Gagal fetch: ${res.status} ${res.statusText}`
      );

    const data = await res.json();
    logger.info(
      `✅ [${USE_MOCK ? 'MOCK' : 'LIVE'}] Loaded ${data.length} asset types`
    );
    return data;
  } catch (err: any) {
    logger.error(`❌ [fetchAssetTypes] Error:`, err.message);
    throw err;
  }
}
