// plugins/mx-core-metric/src/services/mockService.ts

const MOCK_BASE = '/mocks';

function isClient() {
  return typeof window !== 'undefined';
}

export function mockService<T>(model: string) {
  const file = `${MOCK_BASE}/${model}.json`;

  return {
    async getAll(): Promise<T[]> {
      // 🔍 1. Ambil dari localStorage kalau ada dan valid
      if (isClient()) {
        const raw = localStorage.getItem(model);
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.info(
                `[mockService] 📦 Data untuk "${model}" diambil dari localStorage`
              );
              return parsed;
            } else {
              console.warn(
                `[mockService] ⚠️ LocalStorage "${model}" kosong atau tidak valid, fallback ke file.`
              );
            }
          } catch (err) {
            console.warn(
              `[mockService] ❌ Gagal parse localStorage "${model}", fallback ke file.`,
              err
            );
          }
        }
      }

      // 🔁 2. Kalau tidak ada atau gagal, ambil dari file
      try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Mock fetch failed for ${model}`);
        const data = await res.json();

        // 💾 Simpan ke localStorage untuk penggunaan berikutnya
        if (isClient()) {
          localStorage.setItem(model, JSON.stringify(data));
          console.info(
            `[mockService] 🔄 Data awal untuk "${model}" disimpan ke localStorage`
          );
        }

        return data;
      } catch (err) {
        console.error(
          `[mockService] ❌ Gagal fetch dari file untuk "${model}"`,
          err
        );
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
