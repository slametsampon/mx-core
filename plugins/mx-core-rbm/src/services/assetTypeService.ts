// plugins/mx-core-rbm/src/services/assetTypeService.ts

import { logger } from '@/utils/logger';

export async function fetchAssetTypes() {
  try {
    const res = await fetch('/mocks/asset-type.json');
    if (!res.ok) throw new Error('Gagal mengambil daftar asset type');
    const data = await res.json();
    logger.info(`✅ Loaded ${data.length} asset types`);
    return data;
  } catch (err: any) {
    logger.error(`❌ Error loading asset types:`, err.message);
    throw err;
  }
}
