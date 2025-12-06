// apps/backend/src/db/dataSource.ts

import { loadJsonData } from './loadJsonData.js';
import { memoryStore } from './dataMemory.js';

export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

export const dataSource = memoryStore;

export function initData() {
  const DATA_MODE = getDataMode();

  console.log(`[DataSource] Mode: ${DATA_MODE}`);

  if (DATA_MODE === 'json') {
    const jsonData = loadJsonData();
    for (const key of Object.keys(jsonData)) {
      dataSource[key] = jsonData[key];
    }
    console.log('[DataSource] JSON mock loaded.');
  } else {
    console.log('[DataSource] Memory mode (empty store).');
  }
}
