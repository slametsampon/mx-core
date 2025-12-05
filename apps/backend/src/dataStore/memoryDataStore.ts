// apps/backend/src/dataStore/memoryDataStore.ts

import type { DataStore } from './types';
import { dataSource } from '../db/dataSource';
import crypto from 'node:crypto';

export const memoryDataStore: DataStore = {
  async findAll(model) {
    return dataSource[model] ?? [];
  },

  async findById(model, id) {
    return dataSource[model]?.find((item: any) => item.id === id) ?? null;
  },

  async create(model, data) {
    const item = { id: crypto.randomUUID(), ...data };
    dataSource[model] = dataSource[model] ?? [];
    dataSource[model].push(item);
    return item;
  },

  async update(model, id, data) {
    const items = dataSource[model];
    if (!items) return null;

    const index = items.findIndex((i: any) => i.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...data };
    return items[index];
  },

  async delete(model, id) {
    const items = dataSource[model];
    if (!items) return false;

    const before = items.length;
    dataSource[model] = items.filter((i: any) => i.id !== id);
    return dataSource[model].length < before;
  },
};
