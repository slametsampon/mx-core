// apps/backend/src/db/dataSource.ts

import { loadJsonData } from './loadJsonData.js';
import { memoryStore } from './dataMemory.js';

export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

// ❗️ Data-source sekarang HANYA memory store
export const dataSource = memoryStore;

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
  } else {
    console.log(
      `[DataSource] WARNING: DATA_MODE="${DATA_MODE}" is ignored here (Phase-1).`
    );
  }
}
