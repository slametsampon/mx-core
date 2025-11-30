// apps/backend/src/routes/user.ts

import express from 'express';
import { requirePermission } from '../middleware/requirePermission';

const router = express.Router();

router.get(
  '/users',
  requirePermission('user', 'read'), // ✅ Cek role & izin akses
  (req, res) => {
    res.json({ message: 'List of users' });
  }
);

export default router;
