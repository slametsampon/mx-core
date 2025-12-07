// apps/backend/scripts/dbseed.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import crypto from 'node:crypto';
import { sql } from '@vercel/postgres';

// ---------------------------------------------------------
// Setup __dirname (karena ESM) dan env
// ---------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env backend
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Default folder JSON seed
const DEFAULT_SEED_DIR = path.resolve(__dirname, '../data');

// ---------------------------------------------------------
// Helper: load JSON
// ---------------------------------------------------------
function loadJson(seedDir, baseName) {
  const filePath = path.join(seedDir, `${baseName}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  Skip ${baseName}: file not found (${baseName}.json)`);
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8').trim();
  if (!raw) {
    console.warn(`⚠️  Skip ${baseName}: file empty (${baseName}.json)`);
    return null;
  }

  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(
        `⚠️  Skip ${baseName}: JSON empty / not array (${baseName}.json)`
      );
      return null;
    }
    return data;
  } catch (err) {
    console.error(`❌ JSON parse error: ${baseName}.json`);
    console.error(err);
    return null;
  }
}

// ---------------------------------------------------------
// Seeder untuk masing-masing tabel, user DIHAPUS
// ---------------------------------------------------------

async function seedDepartment(rows) {
  console.log(`📌 Seeding department (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO department (
        id, name, description, created_at
      )
      VALUES (
        ${row.id},
        ${row.name},
        ${row.description ?? null},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedUnit(rows) {
  console.log(`📌 Seeding unit (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO unit (
        id,
        department_id,
        name,
        location,
        description,
        is_active,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.department_id},
        ${row.name},
        ${row.location ?? null},
        ${row.description ?? null},
        ${row.is_active ?? true},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedDisturbanceSource(rows) {
  console.log(`📌 Seeding disturbance_source (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO disturbance_source (
        id,
        name,
        type,
        description,
        is_active,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.name},
        ${row.type},
        ${row.description ?? null},
        ${row.is_active ?? true},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedKpi(rows) {
  console.log(`📌 Seeding kpi (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO kpi (
        id,
        name,
        description,
        unit,
        type,
        is_active,
        created_at,
        value
      )
      VALUES (
        ${row.id},
        ${row.name},
        ${row.description ?? null},
        ${row.unit ?? null},
        ${row.type},
        ${row.is_active ?? true},
        ${row.created_at ?? null},
        ${
          row.value !== undefined && row.value !== null
            ? String(row.value)
            : null
        }
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedKpiRecord(rows) {
  console.log(`📌 Seeding kpi_record (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO kpi_record (
        id,
        kpi_id,
        department_id,
        unit_id,
        periode,
        value,
        note,
        source,
        created_by,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.kpi_id},
        ${row.department_id},
        ${row.unit_id ?? null},
        ${row.periode},
        ${row.value},
        ${row.note ?? null},
        ${row.source},
        ${row.created_by ?? null},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedKpiAnnualTarget(rows) {
  console.log(`📌 Seeding kpi_annual_target (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO kpi_annual_target (
        id,
        kpi_id,
        department_id,
        unit_id,
        year,
        annual_value,
        note,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.kpi_id},
        ${row.department_id},
        ${row.unit_id ?? null},
        ${row.year},
        ${row.annual_value},
        ${row.note ?? null},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedKpiPeriodicTarget(rows) {
  console.log(`📌 Seeding kpi_periodic_target (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO kpi_periodic_target (
        id,
        annual_target_id,
        kpi_id,
        department_id,
        unit_id,
        periode,
        granularity,
        target_value,
        actual_value,
        actual_note,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.annual_target_id},
        ${row.kpi_id},
        ${row.department_id},
        ${row.unit_id ?? null},
        ${row.periode},
        ${row.granularity},
        ${row.target_value},
        ${row.actual_value ?? null},
        ${row.actual_note ?? null},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

async function seedKpiForecast(rows) {
  console.log(`📌 Seeding kpi_forecast (${rows.length} rows)...`);
  for (const row of rows) {
    await sql`
      INSERT INTO kpi_forecast (
        id,
        kpi_id,
        department_id,
        unit_id,
        periode,
        value,
        method,
        annual_target_id,
        created_at
      )
      VALUES (
        ${row.id},
        ${row.kpi_id},
        ${row.department_id},
        ${row.unit_id ?? null},
        ${row.periode},
        ${row.value},
        ${row.method},
        ${row.annual_target_id ?? null},
        ${row.created_at ?? null}
      )
      ON CONFLICT (id) DO NOTHING
    `;
  }
}

// ---------------------------------------------------------
// Wrapper generic (tanpa user)
// ---------------------------------------------------------
async function seedTable(tableName, jsonBaseName, seederFn, seedDir) {
  const rows = loadJson(seedDir, jsonBaseName);
  if (!rows) {
    console.warn(
      `⚠️  Skip table ${tableName} — no usable data from ${jsonBaseName}.json`
    );
    return;
  }

  await seederFn(rows);
  console.log(
    `✅ Done seeding ${tableName} (${rows.length} rows from ${jsonBaseName}.json)\n`
  );
}

// ---------------------------------------------------------
// Main (user DIHAPUS)
// ---------------------------------------------------------
async function main() {
  console.log('');
  console.log('=====================================');
  console.log('🚀  START DB SEED (PostgreSQL)');
  console.log('=====================================');
  console.log('');

  try {
    const seedDir = process.env.SEED_PATH || DEFAULT_SEED_DIR;
    console.log(`📂 Seed-path : ${seedDir}`);
    console.log('');

    await seedTable('department', 'department', seedDepartment, seedDir);
    await seedTable('unit', 'unit', seedUnit, seedDir);
    await seedTable(
      'disturbance_source',
      'disturbance_source',
      seedDisturbanceSource,
      seedDir
    );

    await seedTable('kpi', 'kpi', seedKpi, seedDir);
    await seedTable(
      'kpi_annual_target',
      'kpi_annual_target',
      seedKpiAnnualTarget,
      seedDir
    );
    await seedTable(
      'kpi_periodic_target',
      'kpi_periodic_target',
      seedKpiPeriodicTarget,
      seedDir
    );
    await seedTable('kpi_forecast', 'kpi_forecast', seedKpiForecast, seedDir);

    await seedTable('kpi_record', 'kpi_record', seedKpiRecord, seedDir);

    console.log('-------------------------------------');
    console.log('✨ DB SEED DONE (All possible tables)');
    console.log('-------------------------------------');
    console.log('');
  } catch (err) {
    console.error('❌ DB SEED ERROR');
    console.error(err);
    process.exit(1);
  }
}

main();
