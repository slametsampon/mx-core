// apps/backend/src/db/dataSource.ts

import { loadJsonData } from './loadJsonData.js';
import { memoryStore } from './dataMemory.js';
import { postgresStore } from './postgresStore.js';

export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

export const dataSource =
  getDataMode() === 'postgres' ? postgresStore : memoryStore;

/**
 * Init data hanya berlaku untuk mode JSON
 * (untuk preload JSON ke memory)
 */
export function initData() {
  const DATA_MODE = getDataMode();
  console.log(`[DataSource] Mode: ${DATA_MODE}`);

  if (DATA_MODE === 'json') {
    const jsonData = loadJsonData();
    for (const key of Object.keys(jsonData)) {
      dataSource[key] = jsonData[key];
    }
    console.log('[DataSource] JSON preload done.');
  } else if (DATA_MODE === 'memory') {
    console.log('[DataSource] Empty memory mode (no preload).');
  } else if (DATA_MODE === 'postgres') {
    console.log('[DataSource] Using Postgres. No preload needed.');
  } else {
    console.log(
      `[DataSource] WARNING: DATA_MODE="${DATA_MODE}" is unrecognized.`
    );
  }
}
