// apps/backend/src/db.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FOLDER = path.join(__dirname, '../data');

// Mode dari .env (default = memory)
const DATA_MODE = process.env.DATA_MODE || 'memory';

export const db: Record<string, any[]> = {
  kpi_record: [],
  department: [],
  unit: [],
  user: [],
  kpi_target_annual: [],
};

export function initData() {
  if (DATA_MODE === 'json') {
    console.info('[DB] 📂 Mode: JSON FILE — loading from /data');
    loadFromJson();
  } else {
    console.info('[DB] 💾 Mode: IN-MEMORY — empty at start');
  }
}

function loadFromJson() {
  const files = fs.readdirSync(DATA_FOLDER);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const modelName = path.basename(file, '.json');
    const fullPath = path.join(DATA_FOLDER, file);

    try {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const data = JSON.parse(raw);

      if (Array.isArray(data)) {
        db[modelName] = data;
        console.info(`[DB] 🔁 Loaded ${modelName}: ${data.length} records`);
      }
    } catch (err) {
      console.warn(`[DB] ❌ Gagal load ${file}:`, err);
    }
  }
}
