// apps/backend/src/audit/auditStore.ts

import pkg from 'pg';
import { pool } from '../db/pgPool.js';

const { Pool } = pkg;

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

export async function writeAudit(
  model: string,
  operation: string,
  payload: any
) {
  const query = `
    INSERT INTO audit_log (model, operation, payload)
    VALUES ($1, $2, $3)
  `;

  try {
    await pool.query(query, [model, operation, payload]);
  } catch (err) {
    console.error('[AuditLog Error]', err);
  }
}
