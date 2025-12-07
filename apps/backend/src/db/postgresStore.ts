// apps/backend/src/db/postgresStore.ts

import type { DataStore } from '../dataStore/types.js';
import { writeAudit } from '../audit/auditStore.js';

//const { Pool } = pkg;
import { pool } from './pgPool.js';

// Pool global (backend jalan di Node biasa, bukan serverless Vercel Function)
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

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

// 🔹 helper untuk logging error DB
function logDbError(op: string, model: string, err: unknown) {
  console.error(
    `\n[Postgres Error] op=${op}, model=${model}\n`,
    err,
    '\n----------------------------------------\n'
  );
}

export const postgresStore: DataStore = {
  async findAll(model) {
    const table = getTableName(model);
    const query = `SELECT * FROM ${table}`;
    console.log(`[postgresStore] findAll → ${query}`);

    try {
      const { rows } = await pool.query(query);
      return rows;
    } catch (err) {
      logDbError('findAll', model, err);
      throw err;
    }
  },

  async findById(model, id) {
    const table = getTableName(model);
    const query = `SELECT * FROM ${table} WHERE id = $1 LIMIT 1`;
    console.log(`[postgresStore] findById → ${query} [id=${id}]`);

    try {
      const { rows } = await pool.query(query, [id]);
      return rows[0] ?? null;
    } catch (err) {
      logDbError('findById', model, err);
      throw err;
    }
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

    try {
      const { rows } = await pool.query(query, values);
      await writeAudit(model, 'create', rows[0]);
      return rows[0];
    } catch (err) {
      logDbError('create', model, err);
      throw err;
    }
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

    try {
      const { rows } = await pool.query(query, params);
      await writeAudit(model, 'update', rows[0]);
      return rows[0] ?? null;
    } catch (err) {
      logDbError('update', model, err);
      throw err;
    }
  },

  async delete(model, id) {
    const table = getTableName(model);
    const query = `DELETE FROM ${table} WHERE id = $1`;
    console.log(`[postgresStore] delete → ${query} [id=${id}]`);

    try {
      const result = await pool.query(query, [id]);
      if ((result.rowCount ?? 0) > 0) {
        await writeAudit(model, 'delete', { id });
        return true;
      }
      return false;
    } catch (err) {
      logDbError('delete', model, err);
      throw err;
    }
  },
};
