// apps/backend/src/index.ts

import express from 'express';
import { requirePermission } from './middleware/requirePermission';
import { registerDefaultRules } from '@mx-core/core/rbac/init'; // ✅ pastikan rule init dipanggil

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Register RBAC default rules (Admin, Manager, etc.)
registerDefaultRules();

// ✅ Endpoint uji coba dengan RBAC middleware
app.get(
  '/secure-data',
  requirePermission('secure-data', 'read'),
  (req, res) => {
    res.json({ message: 'Berhasil mengakses secure data!' });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
