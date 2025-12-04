// apps/backend/src/index.ts

import cors from 'cors';
import express from 'express';
import { requirePermission } from './middleware/requirePermission';
import { registerDefaultRules } from '@mx-core/core/rbac/init';
import apiRouter from './routes/apiRouter';
import { initData } from './db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Register RBAC default rules (Admin, Manager, etc.)
registerDefaultRules();

// ✅ Endpoint uji coba RBAC
app.get(
  '/secure-data',
  requirePermission('secure-data', 'read'),
  (req, res) => {
    res.json({ message: 'Berhasil mengakses secure data!' });
  }
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Pasang router API
app.use('/api', apiRouter);

// ⬇️ Tambahkan ini sebelum `app.listen(...)`
initData();
// ✅ Log status saat server ready
app.listen(PORT, () => {
  console.info(
    '\x1b[32m[BACKEND]\x1b[0m Server berjalan di http://localhost:' + PORT
  );
  console.info('\x1b[36m[BACKEND]\x1b[0m Mode API: In-Memory + JSON preload');
  console.info('\x1b[35m[BACKEND]\x1b[0m Endpoint tersedia:');
  console.info(`   ➤ GET    /api/{model}`);
  console.info(`   ➤ POST   /api/{model}`);
  console.info(`   ➤ PUT    /api/{model}/:id`);
  console.info(`   ➤ DELETE /api/{model}/:id`);
});
