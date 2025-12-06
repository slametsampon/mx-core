// apps/backend/scripts/dbInit.js

import { initSchema } from '../dist/db/initSchema.js';
import { createClient } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.local' });

async function main() {
  console.log('\n=====================================');
  console.log('🔧  START DB INIT (PostgreSQL)');
  console.log('=====================================\n');

  try {
    await initSchema();

    const client = createClient();
    await client.connect();

    const tables = [
      'department',
      'unit',
      'disturbance_source',
      'disturbance_log',
      'kpi',
      'kpi_annual_target',
      'kpi_forecast',
      'kpi_periodic_target',
      'kpi_record',
      '"user"',
    ];

    for (const table of tables) {
      const res = await client.query(`SELECT COUNT(*) FROM ${table}`);
      const count = res.rows?.[0]?.count ?? 0;

      console.log(`🧩 Table: ${table} → Rows: ${count}`);
    }

    await client.end();

    console.log('\n-------------------------------------');
    console.log('✨ DB INIT DONE (Schema OK)');
    console.log('-------------------------------------\n');
  } catch (err) {
    console.error('\n❌ DB INIT ERROR');
    console.error(err);
    process.exit(1);
  }
}

main();
