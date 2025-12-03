// plugins/mx-core-metric/src/services/mockService.ts

const MOCK_BASE = '/mocks';

function isClient() {
  return typeof window !== 'undefined';
}

export function mockService<T>(model: string) {
  const file = `${MOCK_BASE}/${model}.json`;

  return {
    async getAll(): Promise<T[]> {
      // 🔍 1. Ambil dari localStorage kalau ada
      if (isClient()) {
        const local = localStorage.getItem(model);

        if (local) {
          try {
            const parsed = JSON.parse(local);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.info(
                `[mockService] 📦 Data untuk "${model}" diambil dari localStorage`
              );
              return parsed;
            } else {
              console.warn(
                `[mockService] ⚠️ LocalStorage "${model}" kosong, fallback ke file.`
              );
            }
          } catch (err) {
            console.warn(
              `[mockService] ❌ Gagal parse localStorage "${model}", fallback ke file.`
            );
          }
        }
      }
      // 🔁 2. Kalau tidak ada, ambil dari file (hanya sekali saja)
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Mock fetch failed for ${model}`);
      const data = await res.json();

      // 💾 Simpan ke localStorage agar next time bisa pakai
      if (isClient()) {
        localStorage.setItem(model, JSON.stringify(data));
        console.info(
          `[mockService] 🔄 Data awal untuk "${model}" disimpan ke localStorage`
        );
      }

      return data;
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

      console.warn(`[mockService] Simulated create for "${model}"`, item);

      // 💾 Simpan ke localStorage jika di browser
      if (isClient()) {
        const list = JSON.parse(localStorage.getItem(model) || '[]');
        list.push(item);
        localStorage.setItem(model, JSON.stringify(list));
      }

      return item;
    },

    async update(id: string, updated: T): Promise<T> {
      const item = { ...updated, id };
      console.warn(`[mockService] Simulated update for "${model}"`, item);

      if (isClient()) {
        const list = JSON.parse(localStorage.getItem(model) || '[]');
        const idx = list.findIndex((x: any) => x.id === id);
        if (idx !== -1) {
          list[idx] = item;
          localStorage.setItem(model, JSON.stringify(list));
        }
      }

      return item;
    },

    async delete(id: string): Promise<boolean> {
      console.warn(`[mockService] Simulated delete for "${model}"`);

      if (isClient()) {
        let list = JSON.parse(localStorage.getItem(model) || '[]');
        list = list.filter((x: any) => x.id !== id);
        localStorage.setItem(model, JSON.stringify(list));
      }

      return true;
    },
  };
}
