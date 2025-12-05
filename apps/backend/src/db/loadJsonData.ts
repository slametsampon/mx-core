// apps/backend/src/db/loadJsonData.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FOLDER = path.join(__dirname, '../../data');

export function loadJsonData(): Record<string, any[]> {
  const result: Record<string, any[]> = {};
  const files = fs.readdirSync(DATA_FOLDER);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const modelName = file.replace('.json', '');
    const fullPath = path.join(DATA_FOLDER, file);

    try {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        result[modelName] = parsed;
        console.log(`[Mock JSON] Loaded ${modelName}: ${parsed.length}`);
      }
    } catch (err) {
      console.warn(`[Mock JSON] Failed to load ${file}:`, err);
    }
  }

  return result;
}
