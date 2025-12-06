// apps/backend/src/db/dataSource.ts

import { loadJsonData } from './loadJsonData.js';
import { memoryStore } from './dataMemory.js';
import { postgresStore } from './postgresStore.js';

export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

export const dataSource =
  getDataMode() === 'postgres' ? postgresStore : memoryStore;

export function initData() {
  const DATA_MODE = getDataMode();

  console.log(`[DataSource] Mode: ${DATA_MODE}`);

  if (DATA_MODE === 'json') {
    const jsonData = loadJsonData();
    const store = dataSource as any;

    for (const key of Object.keys(jsonData)) {
      store[key] = jsonData[key];
    }
    console.log('[DataSource] JSON mock loaded.');
  } else {
    console.log('[DataSource] Memory mode (empty store).');
  }
}
