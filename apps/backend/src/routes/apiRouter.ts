// apps/backend/src/routes/apiRouter.ts

import express from 'express';
import { getDataStore } from '../dataStore/index.js';
import { pool } from '../db/pgPool.js';

const router = express.Router();
const store = getDataStore();

// --- ALLOWED FIELDS per model (minimal sanitasi) ---
const ALLOWED_FIELDS: Record<string, string[]> = {
  department: ['id', 'name', 'description', 'created_at'],
  unit: [
    'id',
    'department_id',
    'name',
    'location',
    'description',
    'is_active',
    'created_at',
  ],
  disturbance_source: [
    'id',
    'name',
    'type',
    'description',
    'is_active',
    'created_at',
  ],
  disturbance_log: [
    'id',
    'department_id',
    'unit_id',
    'periode',
    'source_id',
    'duration_minutes',
    'category',
    'description',
    'created_by',
    'created_at',
  ],
  kpi: [
    'id',
    'name',
    'description',
    'unit',
    'type',
    'is_active',
    'created_at',
    'value',
  ],
  kpi_annual_target: [
    'id',
    'kpi_id',
    'department_id',
    'unit_id',
    'year',
    'annual_value',
    'note',
    'created_at',
  ],
  kpi_periodic_target: [
    'id',
    'annual_target_id',
    'kpi_id',
    'department_id',
    'unit_id',
    'periode',
    'granularity',
    'target_value',
    'actual_value',
    'actual_note',
    'created_at',
  ],
  kpi_forecast: [
    'id',
    'kpi_id',
    'department_id',
    'unit_id',
    'periode',
    'value',
    'method',
    'annual_target_id',
    'created_at',
  ],
  kpi_record: [
    'id',
    'kpi_id',
    'department_id',
    'unit_id',
    'periode',
    'value',
    'note',
    'source',
    'created_by',
    'created_at',
  ],
  user: [
    'id',
    'username',
    'password_hash',
    'role',
    'avatar_url',
    'created_at',
    'updated_at',
  ],
};

function logRequest(req: express.Request) {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
}

// GET ALL
router.get('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);

  try {
    const data = await store.findAll(model);
    res.json(data);
  } catch (err) {
    console.error('[API Error] GET /:model', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function sanitize(model: string, payload: any) {
  const allowed = ALLOWED_FIELDS[model];
  if (!allowed) return payload; // fallback aman

  const result: any = {};
  for (const key of allowed) {
    if (payload[key] !== undefined) {
      result[key] = payload[key];
    }
  }
  return result;
}

function apiError(res: express.Response, err: unknown) {
  console.error('[API Error] Details:', err);
  return res.status(500).json({ error: 'INTERNAL_ERROR' });
}

router.get('/audit/all', async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 100`
    );
    res.json(rows);
  } catch (err) {
    console.error('[Audit Error]', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET BY ID
router.get('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  try {
    const item = await store.findById(model, id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error('[API Error] GET /:model/:id', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// CREATE
router.post('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);

  try {
    const data = sanitize(model, req.body);
    const item = await store.create(model, data);
    res.status(201).json(item);
  } catch (err) {
    console.error('[API Error] POST /:model', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE
router.put('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  try {
    const data = sanitize(model, req.body);
    const item = await store.update(model, id, data);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error('[API Error] PUT /:model/:id', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE
router.delete('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  try {
    const ok = await store.delete(model, id);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).send();
  } catch (err) {
    console.error('[API Error] DELETE /:model/:id', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
