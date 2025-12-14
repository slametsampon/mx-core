// plugins/mx-core-rbm/src/services/mockDataService.ts

import { logger } from '@/utils/logger';

export interface MockDataResponse<T> {
  data: T[];
  schema?: any;
}

// Memory store per model
const memoryStore = new Map<string, MockDataResponse<any>>();

// Helper: cek apakah data sudah dimuat
function isLoaded(model: string): boolean {
  return memoryStore.has(model);
}

// Helper: load dari file JSON ke memory sekali
async function loadToMemory<T>(model: string): Promise<MockDataResponse<T>> {
  const url = `/mocks/${model}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Gagal memuat data ${model}`);

    const raw = await res.json();
    let mockData: MockDataResponse<T>;

    if (raw && typeof raw === 'object' && 'data' in raw) {
      mockData = {
        data: raw.data,
        schema: raw.schema,
      };
      logger.info(
        `✅ [loadMockData] Loaded ${raw.data.length} items with schema from ${url}`
      );
    } else if (Array.isArray(raw)) {
      mockData = { data: raw };
      logger.info(`✅ [loadMockData] Loaded ${raw.length} items from ${url}`);
    } else {
      throw new Error('Format data tidak dikenali');
    }

    memoryStore.set(model, mockData);
    return mockData;
  } catch (err: any) {
    logger.error(`❌ [loadMockData] Failed loading ${model}:`, err.message);
    const fallback: MockDataResponse<T> = { data: [] };
    memoryStore.set(model, fallback);
    return fallback;
  }
}

// ✅ Tetap diekspor → tidak breaking
export async function loadMockData<T>(
  model: string
): Promise<MockDataResponse<T>> {
  if (isLoaded(model)) {
    return memoryStore.get(model)!;
  }
  return await loadToMemory<T>(model);
}

// ✅ Tetap diekspor → tidak breaking
export function saveData<T>(model: string, data: T[], schema?: any): void {
  try {
    memoryStore.set(model, { data, schema });
    logger.info(
      `💾 [saveData] Saved ${data.length} items to memory for "${model}"`
    );
  } catch (err: any) {
    logger.error(`❌ [saveData] Failed saving model "${model}":`, err.message);
  }
}

// ✅ CRUD service berbasis memory
export function mockDataService<T>(model: string) {
  return {
    async getAll(): Promise<T[]> {
      if (!isLoaded(model)) await loadToMemory<T>(model);
      return memoryStore.get(model)!.data;
    },

    async getById(id: string): Promise<T | null> {
      const all = await this.getAll();
      return all.find((item: any) => item.id === id) ?? null;
    },

    async create(newItem: T): Promise<T> {
      const all = await this.getAll();
      const item = {
        ...newItem,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      all.push(item);
      memoryStore.set(model, { ...memoryStore.get(model)!, data: all });
      logger.info(`➕ [mockDataService] Created item in "${model}"`, item);
      return item;
    },

    async update(id: string, updated: T): Promise<T | null> {
      const all = await this.getAll();
      const idx = all.findIndex((item: any) => item.id === id);
      if (idx === -1) return null;

      const item = { ...updated, id };
      all[idx] = item;
      memoryStore.set(model, { ...memoryStore.get(model)!, data: all });
      logger.info(
        `📝 [mockDataService] Updated item ${id} in "${model}"`,
        item
      );
      return item;
    },

    async delete(id: string): Promise<boolean> {
      const all = await this.getAll();
      const filtered = all.filter((item: any) => item.id !== id);
      memoryStore.set(model, { ...memoryStore.get(model)!, data: filtered });
      logger.info(`❌ [mockDataService] Deleted item ${id} from "${model}"`);
      return true;
    },

    getSchema(): any | undefined {
      return memoryStore.get(model)?.schema;
    },
  };
}
