// apps/backend/src/db/postgresStore.ts

import type { DataStore } from '../dataStore/types.js';
import pkg from 'pg';

const { Pool } = pkg;

// Pool global (backend Anda jalan di Node biasa, bukan Serverless Vercel Function)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Mapping nama model → nama table (aman, tidak dari user langsung)
const TABLE_MAP: Record<string, string> = {
  department: 'department',
  unit: 'unit',
  disturbance_source: 'disturbance_source',
  disturbance_log: 'disturbance_log',
  kpi: 'kpi',
  kpi_annual_target: 'kpi_annual_target',
  kpi_periodic_target: 'kpi_periodic_target',
  kpi_forecast: 'kpi_forecast',
  kpi_record: 'kpi_record',
  user: '"user"', // BUTUH QUOTING
};

function getTableName(model: string): string {
  const table = TABLE_MAP[model];
  if (!table) {
    throw new Error(`[postgresStore] Unknown model: ${model}`);
  }
  return table;
}

export const postgresStore: DataStore = {
  async findAll(model) {
    const table = getTableName(model);
    const query = `SELECT * FROM ${table}`;
    console.log(`[postgresStore] findAll → ${query}`);
    const { rows } = await pool.query(query);
    return rows;
  },

  async findById(model, id) {
    const table = getTableName(model);
    const query = `SELECT * FROM ${table} WHERE id = $1 LIMIT 1`;
    console.log(`[postgresStore] findById → ${query} [id=${id}]`);
    const { rows } = await pool.query(query, [id]);
    return rows[0] ?? null;
  },

  async create(model, data) {
    const table = getTableName(model);
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error('[postgresStore] create() empty payload');
    }

    const cols = keys.map((k) => `"${k}"`).join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `
      INSERT INTO ${table} (${cols})
      VALUES (${placeholders})
      RETURNING *
    `;
    console.log(`[postgresStore] create → ${query}`);
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(model, id, data) {
    const table = getTableName(model);
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error('[postgresStore] update() empty payload');
    }

    const assignments = keys.map((k, i) => `"${k}" = $${i + 1}`).join(', ');

    const query = `
      UPDATE ${table}
      SET ${assignments}
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;
    console.log(`[postgresStore] update → ${query} [id=${id}]`);

    const params = [...values, id];
    const { rows } = await pool.query(query, params);
    return rows[0] ?? null;
  },

  async delete(model, id) {
    const table = getTableName(model);
    const query = `DELETE FROM ${table} WHERE id = $1`;
    console.log(`[postgresStore] delete → ${query} [id=${id}]`);
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  },
};
