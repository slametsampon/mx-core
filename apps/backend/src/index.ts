// apps/backend/src/middleware/index.ts

import express from 'express';
import { requirePermission } from './middleware/requirePermission';

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint uji coba
app.get('/secure-data', requirePermission('dashboard', 'read'), (req, res) => {
  res.json({ message: 'Berhasil mengakses dashboard!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
