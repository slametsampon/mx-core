// plugins/mx-core-rbm/src/services/assetTypeService.ts

import { API_BASE } from '@/config/config';
import { logger } from '@/utils/logger';

export async function fetchAssetTypes() {
  try {
    const url = `${API_BASE}/asset-type.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Gagal mengambil daftar asset type');

    const data = await res.json();
    logger.info(`✅ Loaded ${data.length} asset types`);
    return data;
  } catch (err: any) {
    logger.error(`❌ Error loading asset types:`, err.message);
    throw err;
  }
}
