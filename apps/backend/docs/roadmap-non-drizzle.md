Baik, saya pegang dulu _state_ aktual yang Anda kirim, lalu saya luruskan arsitektur dan update roadmap-nya.

---

## 1️⃣ Membaca Arsitektur Kode **SAAT INI**

### a. `postgresStore.ts`

```ts
export const postgresStore: DataStore = {
  findAll(model) { SELECT * FROM ${model} },
  findById(model,id) { ... WHERE id=$1 },
  create(model,data) { INSERT ... RETURNING * },
  update(model,id,data) { UPDATE ... RETURNING * },
  delete(model,id) { DELETE ... },
};
```

Ini **sudah** implementasi `DataStore` dengan **SQL raw** via `@vercel/postgres`.

> Artinya: kalau dipakai, route bisa langsung baca/tulis Postgres tanpa in-memory array.

---

### b. `dataSource.ts`

```ts
export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

export const dataSource =
  getDataMode() === 'postgres' ? postgresStore : memoryStore;

export function initData() {
  if (DATA_MODE === 'json') {
    const jsonData = loadJsonData();
    const store = dataSource as any;
    for (const key of Object.keys(jsonData)) {
      store[key] = jsonData[key];
    }
  }
}
```

Masalah BESAR di sini:

- Kalau `DATA_MODE = 'memory'` atau `'json'` → `dataSource = memoryStore` (OK, `memoryStore` adalah objek `{ department: [...], ... }`).
- Kalau `DATA_MODE = 'postgres'` → `dataSource = postgresStore` (sebuah **objek DataStore**, bukan objek `{ model: [] }`).

---

### c. `memoryDataStore.ts`

```ts
const store = dataSource as any;

export const memoryDataStore: DataStore = {
  findAll(model) {
    return store[model] ?? [];
  },
  findById(model,id) { store[model]?.find(...) },
  create(model,data) {
    store[model] = store[model] ?? [];
    store[model].push(item);
  },
  ...
}
```

- Di mode **memory/json**, `store` memang berisi objek `memoryStore` → `store['department']` = array → OK.
- Di mode **postgres**, `store = postgresStore` → `store[model]` = fungsi/undefined → **pasti rusak** kalau DATA_MODE sampai ‘postgres’.

---

### d. `dataStore/index.ts`

```ts
export function getDataStore(): DataStore {
  return memoryDataStore;
}
```

- Router **SELALU** pakai `memoryDataStore`, apa pun nilai `DATA_MODE`.
- `postgresStore` saat ini **tidak pernah dipakai** oleh router.

---

### e. `apiRouter.ts`

```ts
const store = getDataStore();

router.get('/:model', async (req, res) => {
  const data = await store.findAll(model);
});

router.post('/:model', async (req, res) => {
  const item = await store.create(model, req.body);
});
```

> Jadi jalur akses API sekarang:
> **Route → memoryDataStore → (indirect) dataSource → memoryStore**
> bukan ke Postgres.

---

## 2️⃣ Konsekuensi terhadap rencana REPLACE ke **Drizzle**

Dengan kondisi di atas:

1. `postgresStore` **boleh langsung diganti Drizzle** (karena belum benar-benar dipakai oleh router).
2. Kita **harus merapikan layer** supaya:

   - Mode `memory/json` → tetap pakai `memoryDataStore` + `memoryStore`.
   - Mode `postgres` → **TIDAK** melewati `memoryDataStore`, tapi langsung lewat `drizzleStore`.

3. `dataSource.ts` **tidak boleh** lagi mengubah `dataSource` menjadi `postgresStore`, karena itu bercampur konsep.

---

## 3️⃣ Update Roadmap (Versi Revisi, sesuai kode nyata)

### 🎯 Target Akhir

- Untuk `DATA_MODE = 'memory' | 'json'`
  → API lewat `memoryDataStore` (in-memory + optional preload JSON).

- Untuk `DATA_MODE = 'postgres'`
  → API lewat `drizzleStore` (Drizzle ORM), **tanpa** `memoryDataStore`/`dataSource`.

- `postgresStore.ts` dihapus setelah Drizzle stabil.

---

## 🔵 PHASE 1 — Bersihkan Layer MEMORI (tanpa menyentuh Postgres dulu)

**Tujuan:** `memoryDataStore` murni untuk memory/json saja.

### Step 1.1 — `dataSource.ts` hanya untuk memory/json

Rencana perubahan (konsep, nanti bisa kita detailkan kode):

- `getDataMode()` **tetap** seperti sekarang (dipakai juga di tempat lain).
- **Ubah** ekspor `dataSource` supaya **tidak pernah** berisi `postgresStore`.

Contoh rencana:

```ts
// dataSource.ts (NEW konsep)
import { memoryStore } from './dataMemory.js';
import { loadJsonData } from './loadJsonData.js';

export function getDataMode() {
  return process.env.DATA_MODE || 'memory';
}

export const dataSource = memoryStore;

export function initData() {
  const mode = getDataMode();
  if (mode === 'json') {
    const jsonData = loadJsonData();
    for (const key of Object.keys(jsonData)) {
      dataSource[key] = jsonData[key];
    }
  }
}
```

> Di sini **sama sekali tidak menyentuh Postgres**.

---

### Step 1.2 — `memoryDataStore.ts` yakin hanya pakai memory

Ini sudah hampir benar:

```ts
const store = dataSource as any;
```

Dengan perubahan Step 1.1, `store` **dijamin** adalah objek `memoryStore`, bukan lagi `postgresStore`.
Jadi mode `postgres` nanti **tidak akan** menggunakan `memoryDataStore` sama sekali (akan diputus di `getDataStore()`).

✅ Setelah Step 1.1–1.2:

- `npm run build -w @mx-core/backend` harus **lulus**.
- `DATA_MODE=memory/json` → API jalan seperti sekarang.

---

## 🔵 PHASE 2 — Siapkan Drizzle (tanpa dipakai dulu)

Ini lebih ke setup file baru, **tidak menyentuh route**.

### Step 2.1 — Tambah file `src/db/schema.ts`

- Translasi dari `schema.sql` Anda menjadi schema Drizzle.
- Tabel: `department`, `unit`, `disturbance_source`, `disturbance_log`, `kpi`, `kpi_*`, `"user"`.

### Step 2.2 — Tambah `src/db/drizzle.ts`

- Koneksi Neon via `postgres()` + `drizzle()`.

### Step 2.3 — Config `drizzle.config.ts` di backend

- Untuk generate & push migration (kalau nanti mau full pakai Drizzle migration).

> Sampai titik ini, **tidak ada perubahan runtime**. Backend tetap pakai memory/json.

---

## 🔵 PHASE 3 — Buat **drizzleStore.ts** menggantikan postgresStore

### Step 3.1 — Tambah file baru

`apps/backend/src/dataStore/drizzleStore.ts`

Isinya implementasi `DataStore` dengan Drizzle, **mengikuti kontrak yang sama** seperti `postgresStore` & `memoryDataStore`:

```ts
export const drizzleStore: DataStore = {
  async findAll(model) { ... },
  async findById(model,id) { ... },
  async create(model,data) { ... },
  async update(model,id,data) { ... },
  async delete(model,id) { ... },
};
```

- Di dalamnya, mapping `model` → tabel Drizzle (`department`, `kpi_record`, dll).
- Ini nanti yang benar-benar menggantikan akses ke Postgres.

### Step 3.2 — `postgresStore.ts` di-_freeze_

Untuk sementara:

- **Jangan dihapus dulu**, tapi dianggap **legacy** (tidak dipakai).
- Nantinya bisa dihapus setelah Drizzle stabil.

---

# ✅ Phase 4 – Lengkapi postgresStore (FULL)

## Target:

- CRUD Full
- Error handling
- Transaction batch
- Helper generic

### File yang terlibat

- `apps/backend/src/db/postgresStore.ts`
- `apps/backend/src/routes/apiRouter.ts`
- `apps/backend/src/utils/sqlHelpers.ts` (baru)

---

### 🔹 Step 4.1 – CRUD lengkap

Tambahkan:

- update
- delete
  (sebagian sudah ada – lakukan hardening di error handling)

---

### 🔹 Step 4.2 – Error handler internal

`postgresStore.ts`

```ts
try {
  …
} catch (err) {
  console.error('[Postgres Error]', err);
  throw new Error('DB_ERROR')
}
```

---

### 🔹 Step 4.3 – SQL helper

`utils/sqlHelpers.ts`

```ts
export function buildInsert(data: any) {
  const keys = Object.keys(data);
  const values = Object.values(data);
  return {
    keys,
    values,
    placeholders: keys.map((_, i) => `$${i + 1}`).join(', '),
  };
}
```

dipakai di `create()` agar rapi dan reusable.

---

### 🔹 Step 4.4 – Transaction batch

Untuk future bulk insert (optional):

```ts
await sql.begin(async (tx) => {
  await tx`INSERT ...`;
});
```

---

# ⚠ Phase 5 – Partial (sanitize & audit log)

## Target partial:

- sanitize input
- audit log

🟡 **tidak termasuk JWT & RBAC sekarang**

---

## Sanitasi input API

File:

- `/src/routes/apiRouter.ts`
- `/src/middleware/sanitize.ts` (baru)

Contoh middleware:

```ts
export function sanitize(req, _res, next) {
  for (const k in req.body) {
    if (typeof req.body[k] === 'string') {
      req.body[k] = req.body[k].trim();
    }
  }
  next();
}
```

Tambahkan di index.ts:

```ts
app.use(sanitize);
```

---

## Audit log minimal

File:

- `/src/middleware/auditLog.ts`

```ts
console.log(`[AUDIT] ${req.method} ${req.originalUrl} user?`);
```

Integrate di route (POST/PUT/DELETE only).

---

# 🔵 Phase 6 – Observability (FULL)

## Target:

- structured logging
- request log
- slow query log

### Tambahkan folder:

`/src/logger/`

---

## Structured console logger

`src/logger/index.ts`

```ts
export function log(level, msg, meta = {}) {
  console.log(JSON.stringify({ level, msg, ...meta }));
}
```

---

## Request Logging

Middleware:
`src/middleware/requestLogger.ts`

```ts
console.log(`[REQ] ${req.method} ${req.originalUrl}`);
next();
```

---

## Slow query detection

di postgresStore:

```ts
const start = Date.now();
const res = await sql.query(...);
const ms = Date.now() - start;
if(ms > 300) console.warn('[SLOW QUERY]', { model, ms });
```

---

# 🔵 Phase 7 – Performance & Caching (FULL)

## Target

- per model cache
- per endpoint cache
- Memory cache dulu (Redis nanti easy upgrade)

---

## 7.1 – In-memory cache

Folder:
`apps/backend/src/cache/cacheMemory.ts`

```ts
const cache = {};

export function getCache(key) {
  return cache[key];
}
export function setCache(key, val) {
  cache[key] = val;
}
```

Dipakai di `findAll`:

```ts
const cached = getCache(model);
if(cached) return cached;
const data = await db…
setCache(model, data)
```

---

## 7.2 – Cache invalidation

di update/delete:

```ts
cache[model] = undefined;
```

---

## 7.3 – Future Redis (optional)

nanti tinggal replace file cache single entry point:

```
getCache
setCache
invalidateCache
```

Tanpa ubah logic lain.

---

# 📌 Folder Output yang Akan Ditambah

```
apps/backend/src/utils/sqlHelpers.ts
apps/backend/src/middleware/sanitize.ts
apps/backend/src/middleware/auditLog.ts
apps/backend/src/middleware/requestLogger.ts
apps/backend/src/logger/index.ts
apps/backend/src/cache/cacheMemory.ts
```

---

# 🔥 Kenapa roadmap ini tepat

✔ sesuai arsitektur saat ini
✔ tidak ada dependency liar
✔ memakai @vercel/postgres native
✔ semua langkah multiplier untuk scalability
✔ minimal perubahan, maksimal manfaat

---

# 📎 Next action saya rekomendasikan

1. Buat folder:

```
middleware/
utils/
logger/
cache/
```

2. Tambahkan middleware dulu
3. Tambahkan cache next

**Step by step — NO redesign**.

---

## Jika butuh template file

silakan bilang:

> “Berikan template file sanitize.ts”
> atau
> “Berikan template utils sqlHelpers.ts”

Saya akan kirim satu per satu, **sesuai Windows environment**, tanpa asumsi dan tanpa library tambahan.
