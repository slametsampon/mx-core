// apps/backend/src/db.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Perbaikan: Dapatkan __dirname secara aman di ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ⬇️ Lokasi folder data
const DATA_FOLDER = path.join(__dirname, '../data');

// 🔁 Simpan data ke memori
export const db: Record<string, any[]> = {
  kpi_record: [],
  department: [],
  unit: [],
  user: [],
  kpi_target_annual: [],
};

// ⬇️ Load JSON file ke db saat startup
export function loadMockData() {
  const files = fs.readdirSync(DATA_FOLDER);

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    const modelName = path.basename(file, '.json'); // e.g. "department"
    const fullPath = path.join(DATA_FOLDER, file);

    try {
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const data = JSON.parse(raw);

      if (Array.isArray(data)) {
        db[modelName] = data;
        console.info(`[DB] 🔁 Loaded mock: ${modelName} (${data.length})`);
      }
    } catch (err) {
      console.warn(`[DB] ❌ Gagal load file ${file}:`, err);
    }
  }
}
