// plugins/mx-core-rbm/src/services/mockDataService.ts

import { logger } from '@/utils/logger';

export interface MockDataResponse<T> {
  data: T[];
  schema?: any;
}

export async function loadMockData<T>(
  model: string
): Promise<MockDataResponse<T>> {
  try {
    const url = `/mocks/${model}.json`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Gagal memuat data ${model}`);

    const raw = await res.json();

    if (raw && typeof raw === 'object' && 'data' in raw) {
      logger.info(
        `✅ [loadMockData] Loaded ${raw.data.length} items with schema from ${url}`
      );
      return raw as MockDataResponse<T>;
    }

    if (Array.isArray(raw)) {
      logger.info(`✅ [loadMockData] Loaded ${raw.length} items from ${url}`);
      return { data: raw };
    }

    throw new Error('Format data tidak dikenali');
  } catch (err: any) {
    logger.error(`❌ [loadMockData] Failed loading ${model}:`, err.message);
    return { data: [] };
  }
}

export function saveMockData<T>(model: string, data: T[]): void {
  try {
    localStorage.setItem(`mock:${model}`, JSON.stringify(data));
    logger.info(
      `💾 [saveMockData] Saved ${data.length} items to mock:${model}`
    );
  } catch (err: any) {
    logger.error(`❌ [saveMockData] Failed saving ${model}:`, err.message);
  }
}
