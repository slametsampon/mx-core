// apps/backend/src/routes/session.ts

import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import type { SessionRecord } from '../types/session';

const router = express.Router();

const sessionStore = new Map<string, SessionRecord>();

// POST /api/session → buat session
router.post('/', (req, res) => {
  const { username, avatarUrl, role, scope } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: 'Data user tidak lengkap.' });
  }

  const id = uuidv4();
  const now = Date.now();

  const record: SessionRecord = {
    id,
    user: { username, avatarUrl, role },
    createdAt: now,
    expiresAt: now + 1000 * 60 * 10, // default: 10 menit
    scope: scope?.toString() ?? undefined, // 💡 bisa plugin-name atau basePath
  };

  sessionStore.set(id, record);

  return res.status(201).json({ sessionId: id });
});

// GET /api/session/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const requestedScope = req.query.scope as string | undefined;

  const record = sessionStore.get(id);

  if (!record) {
    return res.status(404).json({ message: 'Session tidak ditemukan.' });
  }

  if (record.expiresAt < Date.now()) {
    sessionStore.delete(id);
    return res.status(410).json({ message: 'Session kedaluwarsa.' });
  }

  if (record.scope && record.scope !== requestedScope) {
    return res.status(403).json({ message: 'Scope tidak cocok.' });
  }

  return res.json({ user: record.user });
});

// DELETE /api/session/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (!sessionStore.has(id)) {
    return res.status(404).json({ message: 'Session tidak ditemukan.' });
  }

  sessionStore.delete(id);
  return res.json({ message: 'Session berhasil dihapus.' });
});
