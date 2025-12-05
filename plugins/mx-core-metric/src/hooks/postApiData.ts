// plugins/mx-core-metric/src/hooks/postApiData.ts

import { getService } from '@/services/getService';
import type { ModelName } from '@/config/modelDefinitions';

export async function postApiData(
  model: ModelName,
  payload: any,
  mode: 'create' | 'update',
  id?: string
) {
  const service = getService(model);

  try {
    if (mode === 'update' && id) {
      return await service.update(id, payload);
    } else {
      return await service.create(payload);
    }
  } catch (err) {
    console.error('[postApiData] Gagal simpan data:', err);
    throw err;
  }
}
