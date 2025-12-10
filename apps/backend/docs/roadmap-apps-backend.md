## 1. Analisis Arsitektur Backend yang Ada Sekarang

### 1.1. Pola arsitektur yang Anda pakai

Dari kode yang Anda kirim:

- `apps/backend` adalah **Express API** dengan:

  - `apiRouter` generik: `/:model` → CRUD lewat objek `db`.
  - RBAC sudah disiapkan lewat `@mx-core/core` (`registerDefaultRules`, `requirePermission`).
  - `db.ts` sekarang:

    - Mode `memory` → hanya `Record<string, any[]>` kosong.
    - Mode `json` → load file `.json` dari folder `data` dengan `fs.readdirSync`.

Secara konsep:

- **Kelebihan**:

  - Sangat fleksibel & cepat prototyping.
  - Satu router generik bisa melayani beberapa model (kpi_record, department, dll).
  - Sudah ada hook untuk mode `json` dan environment-based (`DATA_MODE`).

- **Keterbatasan** (utama di Vercel):

  - `fs` + folder `data` tidak cocok untuk runtime **serverless** Vercel:

    - Filesystem **read-only** dan bisa berbeda antara build-time & runtime.
    - Scaling horizontal (banyak instance) → data di memori / JSON tidak konsisten.

  - `db` sekarang **stateful in-memory**, akan hilang di setiap:

    - cold start function,
    - redeploy,
    - scale up/down.

Artinya: desain Anda sudah bagus sebagai “lapisan API generik”, tapi **lapisan penyimpanan (`db`) harus diubah** ke **database eksternal** yang persistent dan serverless-friendly.

---

## 2. Karakteristik Lingkungan Vercel yang Perlu Diingat

Agar desain database tepat, perlu memahami sifat Vercel:

1. **Serverless (kebanyakan kasus)**

   - Setiap request bisa dijalankan pada instance Node.js yang berbeda.
   - Tidak ada jaminan state in-memory akan tetap ada antar request.
   - Tidak cocok untuk:

     - menyimpan data di RAM,
     - menyimpan data di file lokal saat runtime.

2. **File system read-only di runtime**

   - File `.json` bisa dibundel saat build, tapi:

     - Tidak bisa dipakai sebagai storage dinamis (tidak bisa diupdate).
     - Cocok untuk “seed” atau “static config”, bukan “database”.

3. **Koneksi database harus “serverless friendly”**

   - Database harus:

     - mendukung **banyak koneksi pendek** (bukan single long-lived connection).
     - atau menyediakan **HTTP-based driver / data proxy / connection pool**.

Jadi, Anda butuh **database eksternal** (managed) + **client/ORM yang kompatibel dengan serverless**.

---

## 3. Alternatif Database yang Paling Masuk Akal di Vercel

Saya rangkum beberapa opsi realistis untuk monorepo Anda.

### 3.1. Vercel Postgres (PostgreSQL Managed by Vercel)

**Kelebihan:**

- Integrasi native dengan Vercel (environment variable otomatis, dsb).
- Berbasis PostgreSQL → standar industri, bisa dipakai Prisma/Drizzle.
- Dibangun untuk **serverless**: ada optimasi koneksi dan integrasi edge.

**Kapan cocok:**

- mx-core akan berkembang jadi aplikasi serius (RBM, CMMS, dsb).
- Butuh **relational database**: relasi department–unit–kpi_record–user, dsb.
- Ingin deployment yang “satu ekosistem” dengan Vercel.

Menurut saya, untuk jangka panjang mx-core, **ini kandidat paling kuat**.

---

### 3.2. Neon / Supabase / Railway (Postgres as a Service)

Alternatif lain kalau ingin:

- fitur-fitur tambahan:

  - Supabase: auth, storage, real-time.
  - Neon: **serverless Postgres** dengan autoscaling & branches.

- pricing / batasan tertentu lebih cocok.

Dari sisi Express di Vercel:

- pattern-nya mirip dengan Vercel Postgres:

  - gunakan driver dengan connection pooling atau data proxy,
  - pakai Prisma/Drizzle dengan config khusus serverless.

---

### 3.3. PlanetScale (MySQL) atau Database MySQL Lain

Kalau Anda lebih nyaman dengan MySQL:

- PlanetScale → serverless MySQL, cocok untuk serverless platform.
- Tapi untuk ekosistem modern, Postgres sekarang lebih banyak contoh/tutorial.

Kalau belum ada preferensi kuat, **Postgres lebih fleksibel**.

---

### 3.4. Turso / LibSQL (SQLite serverless)

Konsepnya:

- Anda tetap menulis SQL “rasa SQLite”,
- tapi database-nya di-host sebagai **remote service**, bukan file lokal.

Cocok kalau:

- Anda suka yang ringan dan cepat,
- skala awal kecenderungannya kecil–menengah.

Untuk mx-core yang berpotensi besar, saya lebih condong ke **Postgres**, tapi Turso bisa jadi opsi menarik kalau Anda ingin eksplor.

---

### 3.5. Apa yang _tidak_ cocok di Vercel (untuk backend Anda)

- **SQLite lokal (file .db)**
  → Tidak persistent & tidak cocok di filesystem serverless.

- **MongoDB self-hosted tanpa connection pooling**
  → Bisa pakai Atlas, tapi perlu perhatian soal jumlah koneksi dari serverless.

Untuk mengurangi kompleksitas, saya sarankan tetap di “SQL universe” (Postgres).

---

## 4. Desain Ulang Lapisan `db` di Backend Anda

Kuncinya: jangan biarkan Express router langsung berinteraksi dengan “Record<string, any[]>”.
Buat **lapisan abstraksi** yang bisa di-implementasikan dengan:

- in-memory (dev),
- JSON (dev/offline),
- Postgres (production).

### 4.1. Bentuk abstraksi minimal

Misalnya buat interface generik:

```ts
// apps/backend/src/dataStore/types.ts
export interface DataStore {
  findAll<T = any>(model: string): Promise<T[]>;
  findById<T = any>(model: string, id: string): Promise<T | null>;
  create<T = any>(model: string, data: Partial<T>): Promise<T>;
  update<T = any>(
    model: string,
    id: string,
    data: Partial<T>
  ): Promise<T | null>;
  delete(model: string, id: string): Promise<boolean>;
}
```

Kemudian:

- `memoryDataStore.ts` → implementasi berbasis `Record<string, any[]>` (seperti sekarang).
- `jsonDataStore.ts` → load dari file `.json` hanya sekali (read-only / untuk seed).
- `postgresDataStore.ts` → implementasi dengan query ke Postgres.

### 4.2. Modifikasi `apiRouter` agar tidak hard-coded ke `db`

Sekarang `apiRouter` langsung pakai `db[model]`.
Ubah menjadi menggunakan `DataStore`:

```ts
// apps/backend/src/routes/apiRouter.ts
import express from 'express';
import type { DataStore } from '../dataStore/types';
import { getDataStore } from '../dataStore';

const router = express.Router();
const store: DataStore = getDataStore(); // tergantung DATA_MODE

function logRequest(req: express.Request) {
  console.log(`[API] ${req.method} ${req.originalUrl}`);
}

// GET all
router.get('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);

  const data = await store.findAll(model);
  res.json(data);
});

// GET by ID
router.get('/:model/:id', async (req, res) => {
  const { model, id } = req.params;
  logRequest(req);

  const item = await store.findById(model, id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST
router.post('/:model', async (req, res) => {
  const { model } = req.params;
  logRequest(req);

  const newItem = await store.create(model, req.body);
  res.status(201).json(newItem);
});

// PUT
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
```

Dengan pola ini:

- Perubahan storage (memory → Postgres) hanya di `dataStore` & config,
- Router tetap generik dan kompatibel dengan RBAC yang sudah ada.

---

## 5. Contoh Implementasi DataStore untuk Postgres

Anda punya beberapa model: `kpi_record`, `department`, `unit`, `user`, `kpi_target_annual`.
Untuk awal, bisa:

- pakai **query builder/ORM ringan**: **Drizzle ORM** atau **Prisma**.
- Drizzle + Postgres di serverless itu ergonomis & cukup ringan.

### 5.1. Struktur tabel sederhana (Postgres)

Sebagai gambaran (bukan DDL final):

- `department(id, name, description, created_at)`
- `unit(id, department_id, name, created_at)`
- `kpi_record(id, department_id, unit_id, periode, source_id, duration_minutes, category, description, created_by, created_at)`
- `user(id, name, role, department_id, created_at)`
- `kpi_target_annual(id, department_id, unit_id, year, target_value, created_at)`

Nanti bisa disejajarkan dengan `@mx-core/types`.

### 5.2. Connection pattern “serverless friendly”

Dengan Postgres di Vercel (atau Neon, Supabase), biasanya:

- Gunakan pool khusus serverless / HTTP driver,
- Atau gunakan “data proxy” (Prisma Accelerate, dll).

Contoh sangat sederhana (tanpa ORM, sekadar ilustrasi):

```ts
// apps/backend/src/db/postgres.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // opsi ssl jika perlu
});

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
```

Lalu `postgresDataStore` bisa implementasikan:

```ts
// apps/backend/src/dataStore/postgresDataStore.ts
import type { DataStore } from './types';
import { query } from '../db/postgres';
import crypto from 'crypto';

export const postgresDataStore: DataStore = {
  async findAll(model) {
    const rows = await query(`SELECT * FROM ${model}`);
    return rows;
  },

  async findById(model, id) {
    const rows = await query(`SELECT * FROM ${model} WHERE id = $1`, [id]);
    return rows[0] ?? null;
  },

  async create(model, data) {
    const id = crypto.randomUUID();
    const payload = { id, ...data };

    // Untuk produksi, sebaiknya pakai query builder, ini hanya ilustrasi.
    // Misal dengan Drizzle/Prisma akan jauh lebih aman dari SQL injection.
    // Di sini kita asumsikan setiap model punya schema sendiri.

    // Pseudo: generate insert query berdasarkan kolom
    return payload;
  },

  async update(model, id, data) {
    // Pseudo: generate UPDATE ... WHERE id = $1
    return { id, ...data }; // placeholder
  },

  async delete(model, id) {
    await query(`DELETE FROM ${model} WHERE id = $1`, [id]);
    return true;
  },
};
```

Dalam implementasi nyata, **lebih baik pakai ORM** untuk:

- mapping kolom → properti TypeScript,
- menghindari raw SQL injection,
- migration management.

---

## 6. Integrasi mode (memory/json/postgres) via ENV

Anda sudah punya `DATA_MODE`. Manfaatkan untuk switching:

```ts
// apps/backend/src/dataStore/index.ts
import { DataStore } from './types';
import { memoryDataStore } from './memoryDataStore';
import { jsonDataStore } from './jsonDataStore';
import { postgresDataStore } from './postgresDataStore';

const mode = process.env.DATA_MODE ?? 'memory';

export function getDataStore(): DataStore {
  switch (mode) {
    case 'json':
      return jsonDataStore;
    case 'postgres':
      return postgresDataStore;
    case 'memory':
    default:
      return memoryDataStore;
  }
}
```

Kelebihan:

- **Dev lokal**:

  - bisa pakai `memory` atau `json` (tanpa perlu setup database).

- **Staging/production di Vercel**:

  - set `DATA_MODE=postgres` dan siapkan `DATABASE_URL`.

---

## 7. Rekomendasi Praktis: Mana yang “Paling Baik” untuk mx-core di Vercel?

Kalau di-ranking dengan mempertimbangkan:

- skala jangka panjang mx-core (RBM, CMMS, IoT, dsb.),
- integrasi dengan Vercel,
- kematangan ekosistem dan contoh di internet,

saya rekomendasikan urutan:

1. **Vercel Postgres + Drizzle ORM / Prisma**

   - Natively didukung Vercel, SQL kuat, pattern serverless sudah mapan.
   - Drizzle/Prisma akan memudahkan definisi schema & migration.

2. **Neon / Supabase (Postgres) + Drizzle/Prisma**

   - Kalau Anda butuh fitur lain (auth, storage, real-time) atau pricing tertentu.

3. **Turso (LibSQL)**

   - Kalau ingin arsitektur ringan dan Anda nyaman dengan “SQLite-like”.

Yang jelas: **hindari JSON file/SQLite lokal untuk data dinamis** di Vercel.

---

## 8. Dampak ke Frontend & Plugin mx-core

Dengan backend terhubung ke database:

- `apps/frontend` dan `plugins/mx-core-metric` cukup memanggil:

  - `GET /api/kpi_record`
  - `GET /api/department`
  - `POST /api/kpi_record`
  - dst.

- RBAC tetap bekerja di middleware:

  - ekspansi ke `requirePermission('kpi_record', 'create')`, dsb.

- Di masa depan:

  - Anda bisa tambahkan Webhook / Event untuk integrasi IoT, CMMS, dsb.
  - Bisa logging ke tabel `audit_log` untuk kebutuhan SHE / compliance.

---

## 9. Saran Tahapan Implementasi (Step-by-step)

Supaya tidak “destructive” terhadap monorepo yang sudah rapi, saya sarankan:

1. **Refactor ke DataStore Abstraction**

   - Seperti di bagian 4: ubah `apiRouter` agar tidak langsung pakai `db`.
   - Implementasikan `memoryDataStore` yang 100% kompatibel dengan `db` sekarang → memastikan tidak ada breaking change.

2. **Siapkan Database Postgres**

   - Pilih Vercel Postgres / Neon / Supabase.
   - Definisikan schema awal untuk:

     - department, unit, kpi_record, user, kpi_target_annual.

3. **Pilih ORM & Setup**

   - Misalnya: Drizzle + Postgres.
   - Buat definisi tabel + migration.
   - Implementasi `postgresDataStore` berdasarkan schema ini.

4. **Tambah Mode `DATA_MODE=postgres`**

   - Tambahkan implementasi `postgresDataStore`.
   - Test lokal (bisa tetap pakai `npm run dev -w apps/backend`).

5. **Konfigurasi di Vercel**

   - Set `DATA_MODE=postgres` di Environment Variables.
   - Set `DATABASE_URL` sesuai koneksi DB.
   - Deploy dan uji dengan Postman/Thunder Client.

6. **Hardening & Observability**

   - Tambahkan:

     - logging yang lebih terstruktur,
     - error handler global Express,
     - rate limiting bila perlu,
     - audit log untuk operasi sensitif.

---
