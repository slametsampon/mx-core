// apps/backend/src/routes/apiRouter.ts

import express from 'express';
import { db } from '../db'; // ⬅️ Impor dari file terpisah

const router = express.Router();

// 👇 Log setiap request
function logRequest(req: express.Request) {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
}

// GET all
router.get('/:model', (req, res) => {
  const { model } = req.params;
  logRequest(req);

  const data = db[model] ?? [];
  console.log(`[API] ↳ Total data: ${data.length}`);
  res.json(data);
});

// GET by ID
router.get('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  const item = db[model]?.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST new item
router.post('/:model', (req, res) => {
  const { model } = req.params;
  logRequest(req);

  const newItem = { id: crypto.randomUUID(), ...req.body };
  db[model] = db[model] ?? [];
  db[model].push(newItem);
  console.log(`[API] ↳ Data ditambahkan:`, newItem);
  res.status(201).json(newItem);
});

// PUT (update)
router.put('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  const items = db[model];
  if (!items) return res.status(404).json({ error: 'Not found' });

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// DELETE
router.delete('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  const items = db[model];
  if (!items) return res.status(404).json({ error: 'Not found' });

  db[model] = items.filter((item) => item.id !== id);
  res.json({ success: true });
});

export default router;
