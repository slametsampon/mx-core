// apps/backend/src/routes/viewRouter.ts

import express from 'express';
import { pool } from '../db/pgPool.js';

const router = express.Router();

// Validasi daftar view agar tidak bisa akses sembarangan
const ALLOWED_VIEWS = [
  'v_kpi_record_detail',
  'v_department_kpi_target',
  'v_kpi_periodic_target',
  'v_kpi_forecast',
  'v_disturbance_log_detail',
];

// GET view with optional filters
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  const { limit = '100', ...filters } = req.query;

  console.log(`[API] GET /api/view/${name} filters:`, filters);

  if (!ALLOWED_VIEWS.includes(name)) {
    return res.status(403).json({ error: 'View not allowed' });
  }

  try {
    // Naive filtering (sanitize manually or use pg-format in the future)
    const where = Object.entries(filters)
      .map(([key, val]) => `${key} = '${val}'`)
      .join(' AND ');

    const clause = where ? `WHERE ${where}` : '';
    const sql = `SELECT * FROM ${name} ${clause} LIMIT ${Number(limit)}`;

    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error('[API Error] View GET', err);
    res.status(500).json({ error: 'Failed to load view' });
  }
});

export default router;
