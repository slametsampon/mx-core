// apps/backend/src/dataStore/index.ts

import { memoryDataStore } from './memoryDataStore.js';
import type { DataStore } from './types.js';

// saat ini API hanya pakai memory/json, postgres menyusul
export function getDataStore(): DataStore {
  return memoryDataStore;
}
