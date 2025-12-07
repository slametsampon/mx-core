// apps/backend/src/dataStore/index.ts

import type { DataStore } from './types.js';
import { memoryDataStore } from './memoryDataStore.js';
import { postgresStore } from '../db/postgresStore.js';
import { getDataMode } from '../db/dataSource.js';

export function getDataStore(): DataStore {
  const mode = getDataMode();

  if (mode === 'postgres') {
    console.log('[DataStore] Using Postgres store');
    return postgresStore;
  }

  console.log('[DataStore] Using memory/json store');
  return memoryDataStore;
}
