// apps/backend/src/routes/apiRouter.ts

import express from 'express';
import { getDataStore } from '../dataStore';

const router = express.Router();
const store = getDataStore();

function logRequest(req: express.Request) {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
}

// GET ALL
router.get('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);
  const data = await store.findAll(model);
  res.json(data);
});

// GET BY ID
router.get('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);
  const item = await store.findById(model, id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// CREATE
router.post('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);
  const item = await store.create(model, req.body);
  res.status(201).json(item);
});

// UPDATE
router.put('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);
  const updated = await store.update(model, id, req.body);
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

// DELETE
router.delete('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);
  const ok = await store.delete(model, id);
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
});

export default router;
