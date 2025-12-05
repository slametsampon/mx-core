Terima kasih. ✅ Semua file yang Anda kirim sudah **cukup lengkap untuk analisis menyeluruh**. Kita akan lanjut dengan:

---

# 🧠 ANALISA MENYELURUH — **INTEGRASI API BACKEND DI MONOREPO**

---

## 🗂️ STRUKTUR DAN KONDISI SAAT INI

| Aspek                   | Status                                                             |
| ----------------------- | ------------------------------------------------------------------ |
| 🔌 Express Backend      | ✅ Ada, tapi **belum punya route model** seperti `/api/kpi_record` |
| 🔄 Frontend Service     | ✅ `getService()` & `apiService()` siap                            |
| 🔧 Routing API Otomatis | ❌ Belum diimplementasikan                                         |
| 🔄 Switch mock/api      | ✅ Sudah dengan `USE_MOCK`                                         |
| 🔍 `modelDefinitions`   | ✅ Dinamis, mengontrol semua model                                 |
| 🌐 CORS & error         | ❌ Tidak disiapkan (`express.json`, `cors`, error handler)         |
| 🌍 API_BASE             | ✅ Sudah sesuai `.env.local`                                       |

---

## 🚨 MASALAH UTAMA

### 1. **API 404 & CORS error**

> `GET https://mx-core-backend.vercel.app/api/kpi_record net::ERR_FAILED 404 (Not Found)`

**Penyebab:**

- Express backend **tidak memiliki route `/api/kpi_record`** maupun model dinamis.
- CORS tidak diaktifkan → permintaan dari `localhost:3000` ditolak browser.

---

## ✅ YANG SUDAH SIAP

- ✅ Anda sudah punya `getService()` dan `apiService()` yang dinamis.
- ✅ `modelDefinitions` sudah menyimpan nama model (`kpi_record`, dll).
- ✅ Environment `.env.local` sudah menyetel `USE_MOCK=false` untuk Live API.

---

## 🔧 YANG PERLU DIBUAT

### 🎯 Tujuan: Menciptakan _Dynamic API Routing_ seperti:

```
GET     /api/kpi_record       → ambil semua data
GET     /api/kpi_record/:id   → ambil 1 data
POST    /api/kpi_record       → tambah data
PUT     /api/kpi_record/:id   → update data
DELETE  /api/kpi_record/:id   → hapus data
```

---

## ✅ SOLUSI: **Langkah Implementasi + Verifikasi**

---

### 🧩 **Langkah 1 — Siapkan Middleware Penting**

Tambahkan di `apps/backend/src/index.ts`:

```ts
import cors from 'cors';
import express from 'express';

app.use(cors()); // 🟢 Perbaiki masalah CORS
app.use(express.json()); // 🟢 Parse JSON body
app.use(express.urlencoded({ extended: true }));
```

> 📌 Tanpa `express.json()` → POST akan gagal parsing body
> 📌 Tanpa `cors()` → permintaan dari frontend akan diblokir browser

---

### 📁 **Langkah 2 — Tambahkan Dynamic Router**

**Buat file baru:**

📄 `apps/backend/src/routes/apiRouter.ts`

```ts
import express from 'express';

const router = express.Router();

// Simulasi penyimpanan data di memori
const db: Record<string, any[]> = {
  kpi_record: [],
  user: [],
  department: [],
};

router.get('/:model', (req, res) => {
  const { model } = req.params;
  const data = db[model] ?? [];
  res.json(data);
});

router.get('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  const data = db[model]?.find((item) => item.id === id);
  if (!data) return res.status(404).json({ error: 'Not found' });
  res.json(data);
});

router.post('/:model', (req, res) => {
  const { model } = req.params;
  const newItem = { id: crypto.randomUUID(), ...req.body };
  db[model] = db[model] ?? [];
  db[model].push(newItem);
  res.status(201).json(newItem);
});

router.put('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  const items = db[model];
  if (!items) return res.status(404).json({ error: 'Not found' });

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

router.delete('/:model/:id', (req, res) => {
  const { model, id } = req.params;
  const items = db[model];
  if (!items) return res.status(404).json({ error: 'Not found' });

  db[model] = items.filter((item) => item.id !== id);
  res.json({ success: true });
});

export default router;
```

---

### 🧩 **Langkah 3 — Pasang Router di Server**

Edit `apps/backend/src/index.ts`:

```ts
import apiRouter from './routes/apiRouter';

// Tambahkan ini
app.use('/api', apiRouter);
```

---

### 🧪 **Langkah 4 — Jalankan Backend Secara Lokal**

```bash
cd apps/backend
npm install
npm run dev
```

Buka:

- [http://localhost:3000/api/kpi_record](http://localhost:3000/api/kpi_record)

---

## ✅ VERIFIKASI INTEGRASI (Checklist)

| Test               | Cara                                        |
| ------------------ | ------------------------------------------- |
| ✅ GET semua data  | `curl http://localhost:3000/api/kpi_record` |
| ✅ POST data baru  | Buat form, klik submit                      |
| ✅ PUT update data | Edit form, simpan                           |
| ✅ DELETE data     | Klik ikon delete                            |
| ✅ CORS aman       | Tidak ada error CORS di console             |
| ✅ Fetch berhasil  | Data muncul di `DynamicTable`               |

---

## 🚀 **(Opsional) Langkah Produksi**

Jika ingin deploy ke **Vercel**:

- Set `vercel.json` untuk proxy request `/api/*` ke backend Express jika host beda
- Atau gabungkan Express ke Next.js via `server.js` (custom server)

---

## 📌 PENUTUP

Anda sudah **80% siap**. Setelah langkah di atas:

### 📍 Next Step:

> Buat real data loader (dari file atau DB) menggantikan `db[model]` sementara.

---

Jika Anda ingin lanjut ke **penyimpanan ke file JSON**, **MongoDB**, atau integrasi dengan plugin lain, beri instruksi selanjutnya.

---

Apakah Anda ingin langsung lanjut ke langkah berikutnya (penyimpanan data nyata), atau mau saya bantu **refactor apiRouter.ts ke versi yang scalable**?
