// plugins/mx-core-metric/src/services/mockService.ts

const MOCK_BASE = '/mocks';

const memoryStore = new Map<string, any[]>();

function isClient() {
  return typeof window !== 'undefined';
}

export function mockService<T>(model: string) {
  const file = `${MOCK_BASE}/${model}.json`;

  return {
    async getAll(): Promise<T[]> {
      // ✅ 1. Jika data sudah di-load sebelumnya, ambil dari memory
      if (memoryStore.has(model)) {
        console.info(`[mockService] 🧠 Data "${model}" diambil dari memory`);
        return memoryStore.get(model)!;
      }

      // 🔁 2. Kalau belum, ambil dari file mock
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Mock fetch failed for ${model}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          memoryStore.set(model, data);
          console.info(
            `[mockService] 📥 File mock "${model}" dimuat ke memory`
          );
          return data;
        } else {
          console.warn(
            `[mockService] ⚠️ Format file "${model}.json" tidak valid`
          );
          return [];
        }
      } catch (err) {
        console.error(`[mockService] ❌ Gagal fetch file "${model}"`, err);
        return [];
      }
    },

    async getById(id: string): Promise<T | null> {
      const all = await this.getAll();
      return all.find((item: any) => item.id === id) ?? null;
    },

    async create(newItem: T): Promise<T> {
      const item = {
        ...newItem,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };

      console.warn(`[mockService] ➕ Create "${model}"`, item);

      const data = await this.getAll();
      data.push(item);
      memoryStore.set(model, data);
      return item;
    },

    async update(id: string, updated: T): Promise<T> {
      const item = { ...updated, id };
      console.warn(`[mockService] 📝 Update "${model}"`, item);

      const data = await this.getAll();
      const idx = data.findIndex((x: any) => x.id === id);
      if (idx !== -1) {
        data[idx] = item;
        memoryStore.set(model, data);
      }

      return item;
    },

    async delete(id: string): Promise<boolean> {
      console.warn(`[mockService] ❌ Delete "${model}" → ${id}`);

      const data = await this.getAll();
      const filtered = data.filter((x: any) => x.id !== id);
      memoryStore.set(model, filtered);

      return true;
    },
  };
}
