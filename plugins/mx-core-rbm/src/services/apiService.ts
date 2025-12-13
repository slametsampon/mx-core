// plugins/mx-core-rbm/src/services/apiService.ts

import { API_BASE } from '@/config/config';

export function apiService<T>(model: string) {
  const base = `${API_BASE}/api/${model}`;

  return {
    async getAll(): Promise<T[]> {
      const res = await fetch(base);
      if (!res.ok) throw new Error(`[apiService] Failed to fetch ${base}`);
      return await res.json();
    },

    async getById(id: string): Promise<T> {
      const res = await fetch(`${base}/${id}`);
      if (!res.ok) throw new Error(`[apiService] Failed to fetch by ID ${id}`);
      return await res.json();
    },

    async create(newItem: T): Promise<T> {
      const res = await fetch(base, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error(`[apiService] Failed to create`);
      return await res.json();
    },

    async update(id: string, updated: T): Promise<T> {
      const res = await fetch(`${base}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error(`[apiService] Failed to update`);
      return await res.json();
    },

    async delete(id: string): Promise<boolean> {
      const res = await fetch(`${base}/${id}`, { method: 'DELETE' });
      return res.ok;
    },
  };
}
