## 🧭 PROLOG: Tujuan Akhir

Kita ingin membangun sistem data konfigurasi yang dapat:

> ✅ Menampilkan, menyimpan, memperbarui, dan menghapus data konfigurasi seperti **Asset Type**, **Asset**, **Asset Category**, dan sebagainya — dari antarmuka frontend `mx-core-rbm` ke database **PostgreSQL** melalui API yang disediakan oleh `apps/backend`.

---

## 🔁 URUTAN ROADMAP

### 📌 Bagian 1: **Desain Database & Seeder**

### 📌 Bagian 3: **Integrasi Frontend (mx-core-rbm)**

### 📌 Bagian 2: **Implementasi Backend (apps/backend)**

---

# 🧱 Bagian 1 — Desain Database & Seeder

> 📂 Menyiapkan fondasi struktur data PostgreSQL yang akan digunakan oleh sistem.

### ✅ 1.1 Tentukan Entitas Utama

| Entitas          | Deskripsi                                        |
| ---------------- | ------------------------------------------------ |
| `asset_type`     | Jenis dari aset (Pump, Valve, etc.)              |
| `asset_category` | Kategori aset yang mengelompokkan beberapa type  |
| `asset`          | Aset individual dengan `tag_number`, lokasi, dsb |
| `asset_detail`   | Data teknis atau operasional dari asset          |

---

### ✅ 1.2 Buat Struktur Tabel & Relasi

Contoh (dalam konsep):

- `asset_category (id, name, description)`
- `asset_type (id, label, description, category_id)` → FK ke `asset_category`
- `asset (id, tag_number, asset_type_id)` → FK ke `asset_type`
- `asset_detail (id, tag_number, parameter, value)`

---

### ✅ 1.3 Buat Skema Database

Pilih alat:

- **Prisma** → mudah dan populer di Next.js monorepo
- Drizzle ORM (alternatif modern)
- Knex (jika perlu fleksibel dan ringan)

> Langkah ini melibatkan file `schema.prisma` atau `migrations/` SQL.

---

### ✅ 1.4 Tambahkan Seeder Data Awal

Seeder akan:

- Mengisi data `asset_category` dan `asset_type` untuk keperluan pengujian awal
- Bisa pakai: script JS/TS, atau fitur bawaan ORM

---

### ✅ 1.5 Uji Seeder & Koneksi

- Jalankan `npx prisma db seed` (atau tool setara)
- Verifikasi isi database dengan tool seperti **pgAdmin**, **DBeaver**, atau CLI

---

# 🧑‍💻 Bagian 3 — Integrasi Frontend (`mx-core-rbm`)

> 🎯 Menjadikan form & tabel di frontend dapat berinteraksi langsung dengan API backend.

---

### ✅ 3.1 Pastikan `config.ts` sudah mendukung switch mock/API

- Sudah dilakukan (`USE_MOCK`, `API_BASE`, `SCHEMA_BASE`)

---

### ✅ 3.2 Buat service API generik

```ts
apiService<T>(model: string)
```

- Untuk `GET`, `POST`, `PUT`, `DELETE` data
- Sudah tersedia dari subproject `mx-core-metric`

---

### ✅ 3.3 Update semua fungsi `handleSave`, `handleEdit`, `handleDelete`

- Gunakan `USE_MOCK ? saveData() : apiService().create()` dst.

---

### ✅ 3.4 Ubah Form menjadi CRUD-aware

- Komponen `DynamicForm`, `TabbedFormSchema`, dll harus mengandalkan `handleSave()`
- Tidak perlu ubah form-nya, karena switch ada di service layer

---

### ✅ 3.5 Pastikan penamaan model sesuai backend

| Nama Model       | Path API                  |
| ---------------- | ------------------------- |
| `asset-type`     | `/api/rbm/asset-type`     |
| `asset-category` | `/api/rbm/asset-category` |
| `asset`          | `/api/rbm/asset`          |

---

### ✅ 3.6 Tambahkan UI Feedback (opsional)

- Loading spinner
- Toast sukses/gagal
- Validasi frontend

---

# 🧩 Bagian 2 — Implementasi Backend (`apps/backend`)

> 🎯 Membuat endpoint REST API untuk terhubung ke DB dan menerima data dari `mx-core-rbm`

---

### ✅ 2.1 Setup Project `apps/backend`

- Gunakan Next.js App Router (API Routes) atau Express (lebih fleksibel)
- Setup koneksi ke PostgreSQL (`DATABASE_URL`)
- Install ORM (Prisma / Drizzle)

---

### ✅ 2.2 Buat Route REST API

Contoh endpoint:

| HTTP   | Path                      | Fungsi      |
| ------ | ------------------------- | ----------- |
| GET    | `/api/rbm/asset-type`     | List semua  |
| POST   | `/api/rbm/asset-type`     | Tambah data |
| PUT    | `/api/rbm/asset-type/:id` | Update      |
| DELETE | `/api/rbm/asset-type/:id` | Hapus       |

- Gunakan controller + service pattern (modular)
- Gunakan validasi (`Zod`, `Yup`, atau manual)

---

### ✅ 2.3 Middleware (opsional)

- CORS: agar bisa diakses dari frontend
- Logger: untuk mencatat aktivitas API
- Auth (opsional nanti)

---

### ✅ 2.4 Uji endpoint pakai Postman / curl

- Pastikan endpoint menerima dan mengembalikan data sesuai frontend

---

### ✅ 2.5 Sinkronisasi dengan frontend

- Tes `mx-core-rbm` dengan `USE_MOCK=false`
- Pastikan form bisa `GET`, `POST`, `PUT`, `DELETE`

---

## 🚦 Roadmap Ringkasan (Rinci)

| Urutan | Langkah                                 | Status |
| ------ | --------------------------------------- | ------ |
| 1.1    | Definisikan entitas                     | 🔜     |
| 1.2    | Buat struktur tabel dan relasi          | 🔜     |
| 1.3    | Buat skema di Prisma / ORM              | 🔜     |
| 1.4    | Tambah seeder data awal                 | 🔜     |
| 1.5    | Uji koneksi DB dan isi tabel            | 🔜     |
| 3.1    | Pastikan config switchable              | ✅     |
| 3.2    | Tambah apiService.ts generik            | ✅     |
| 3.3    | Update semua `handleSave`, `handleEdit` | 🔜     |
| 3.4    | Hubungkan form ke API                   | 🔜     |
| 3.5    | Pastikan nama model sinkron             | 🔜     |
| 3.6    | Tambahkan feedback UI                   | 🔜     |
| 2.1    | Setup backend & koneksi DB              | 🔜     |
| 2.2    | Buat endpoint REST API                  | 🔜     |
| 2.3    | Middleware CORS/logger                  | 🔜     |
| 2.4    | Tes endpoint dengan Postman             | 🔜     |
| 2.5    | Integrasi ke frontend live mode         | 🔜     |

---

Kalau kamu setuju dengan roadmap ini, kita bisa mulai dari:

> 🧱 **Bagian 1.1: Desain Entitas & Relasi**

Beritahu saja apakah ingin mulai dari desain tabel `asset_type` dulu.
