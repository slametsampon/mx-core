// plugins/mx-core-rbm/src/services/assetTypeSchemaService.ts

import { SCHEMA_BASE } from '@/config/config';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import { logger } from '@/utils/logger';

export async function fetchAssetTypeSchemaById(
  assetTypeId: string
): Promise<AssetTypeSchema | null> {
  const url = `${SCHEMA_BASE}/${assetTypeId}.json`;
  logger.info(`📥 [assetTypeSchemaService] Fetching schema from: ${url}`);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      logger.error(
        `❌ [assetTypeSchemaService] Gagal fetch schema: ${res.statusText}`
      );
      return null;
    }

    const json = await res.json();

    if (!json || !Array.isArray(json.fields)) {
      logger.warn(
        `⚠️ [assetTypeSchemaService] Schema tidak valid atau kosong untuk ${assetTypeId}`
      );
      return null;
    }

    logger.info(
      `✅ [assetTypeSchemaService] Loaded ${json.fields.length} fields for type=${assetTypeId}`
    );

    return json as AssetTypeSchema;
  } catch (err: any) {
    logger.error(
      `❌ [assetTypeSchemaService] Error load schema ${assetTypeId}: ${err.message}`
    );
    return null;
  }
}
