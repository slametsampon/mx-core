// plugins/mx-core-rbm/src/services/assetTypeSchemaService.tsx

import { logger } from '@/utils/logger';

export async function fetchAssetTypeSchema(assetTypeId: string) {
  try {
    const res = await fetch(`/schemas/asset-types/${assetTypeId}.json`);

    if (!res.ok) {
      logger.error(
        `Failed to fetch schema for [${assetTypeId}]:`,
        res.statusText
      );
      throw new Error('Schema not found');
    }

    const schema = await res.json();
    logger.info(`✅ Loaded schema for [${assetTypeId}]`);
    return schema;
  } catch (err: any) {
    logger.error(`❌ Error loading schema [${assetTypeId}]:`, err.message);
    throw err;
  }
}
