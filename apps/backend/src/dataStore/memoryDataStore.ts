// apps/backend/src/dataStore/memoryDataStore.ts

import type { DataStore } from './types';
import { dataSource } from '../db/dataSource.js';
import crypto from 'node:crypto';

const store = dataSource as any; // ⬅️ FIX di sini

export const memoryDataStore: DataStore = {
  async findAll(model) {
    return store[model] ?? [];
  },

  async findById(model, id) {
    return store[model]?.find((item: any) => item.id === id) ?? null;
  },

  async create(model, data) {
    const item = { id: crypto.randomUUID(), ...data };
    store[model] = store[model] ?? [];
    store[model].push(item);
    return item;
  },

  async update(model, id, data) {
    const items = store[model];
    if (!items) return null;

    const index = items.findIndex((i: any) => i.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...data };
    return items[index];
  },

  async delete(model, id) {
    const items = store[model];
    if (!items) return false;

    const before = items.length;
    store[model] = items.filter((i: any) => i.id !== id);
    return store[model].length < before;
  },
};
