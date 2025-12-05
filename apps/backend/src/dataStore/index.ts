// apps/backend/src/dataStore/index.ts

import { memoryDataStore } from './memoryDataStore';
import type { DataStore } from './types';

// saat ini API hanya pakai memory/json, postgres menyusul
export function getDataStore(): DataStore {
  return memoryDataStore;
}
