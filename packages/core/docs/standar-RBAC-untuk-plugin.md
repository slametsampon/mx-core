# 🔐 Panduan RBAC untuk Plugin MX Core

---

Menyediakan _pedoman resmi_ untuk developer plugin eksternal agar:

- Deklarasi RBAC **konsisten** dan **tidak ambigu**
- Mengetahui nilai-nilai valid untuk `role`, `resource`, dan `action`
- Mengetahui **struktur `plugin.json`**
- Bisa melihat **contoh konkret**

---

## 📁 **Lokasi:**

```
/plugins/mx-core-docs/content/rbac.mdx
```

> Jika belum ada, buat folder dan file tersebut sekarang.

---

## 📝 Contoh Isi Awal `rbac.mdx`

````mdx
Plugin dapat mendaftarkan _permissions_ agar UI dan backend hanya memperbolehkan akses pengguna dengan role yang sesuai.

---

## 📦 Struktur `plugin.json`

File `plugin.json` harus berada di dalam root direktori plugin:

```json
{
  "name": "mx-core-iot",
  "basePath": "/iot",
  "description": "Monitoring sensor IoT",
  "rbac": [
    { "role": "Engineer", "resource": "device", "action": "read" },
    { "role": "Supervisor", "resource": "device", "action": "assign" }
  ]
}
```
````

---

## 👥 Daftar `UserRole` yang Valid

Tipe ini didefinisikan dalam `@mx-core/types`:

```ts
export type UserRole =
  | 'Admin'
  | 'Manager'
  | 'Supervisor'
  | 'Operator'
  | 'Foreman'
  | 'Engineer'
  | 'Viewer';
```

---

## ⚙️ Daftar `RBACAction` yang Valid

```ts
export type RBACAction =
  | 'read'
  | 'write'
  | 'assign'
  | 'validate'
  | 'approve'
  | 'delete'
  | 'analyze';
```

---

## 📘 Contoh dari `mx-core-cmms`

```json
"rbac": [
  { "role": "Operator", "resource": "asset", "action": "read" },
  { "role": "Foreman", "resource": "maintenance", "action": "assign" },
  { "role": "Manager", "resource": "maintenance", "action": "approve" }
]
```

---

## 🧩 Tips Penggunaan

- Gunakan `canAccess(context)` dari `@mx-core/core/rbac` untuk memverifikasi permission
- Gunakan komponen `<CanAccess />` dari `@mx-core/ui` di level UI

```tsx
<CanAccess role="Supervisor" resource="kpi" action="validate">
  <ValidateButton />
</CanAccess>
```

---

## ❓ FAQ

### Bagaimana jika `plugin.json` tidak memiliki properti `rbac`?

RBAC dianggap kosong. Tidak ada rule baru yang ditambahkan oleh plugin tersebut.

---

---

## 🧪 Verifikasi

- Jalankan `npm run dev` pada `apps/frontend`
- Akses `http://localhost:3000/docs/rbac` (atau sesuai routing Contentlayer Anda)
- Pastikan format tampil, dan bisa dibaca dengan baik

---

## 📌 Langkah Lanjut (Opsional)

- Tambahkan TOC (table of contents)
- Validasi schema `plugin.json` otomatis saat load
- Tambahkan gambar atau diagram (jika pakai MDX + remark plugins)

---

Baik, berikut adalah **rencana implementasi rinci dan detail** untuk **mewujudkan SSOT RBAC** di monorepo `mx-core`, sesuai struktur dan determinasi yang telah Anda tetapkan:

---

## ✅ **TUJUAN UTAMA**

Menciptakan dan memberlakukan **Single Source of Truth (SSOT)** untuk seluruh sistem **Role**, **Permission**, dan **Access Control (RBAC)** di dalam monorepo `mx-core`, dengan menempatkan:

- **Definisi** di: `@mx-core/types`
- **Logika evaluasi akses** di: `@mx-core/core`
- **Sub-project lain (UI/frontend/backend)** hanya boleh **mengakses** dari dua titik ini.

---

## 🧩 STRUKTUR AKHIR YANG DITUJU

```txt
packages/
│
├── types/
│   └── src/
│       ├── roles.ts          # Definisi Role & Hierarki
│       ├── permissions.ts    # Definisi Permission & Mapping Role → Permission
│       ├── rbac.ts           # Tipe RBAC (Rule, Action, Context)
│       └── index.ts          # Entry point ekspor tipe
│
├── core/
│   └── src/rbac/
│       ├── rules.ts          # Manajemen daftar aturan RBAC
│       ├── policy.ts         # Logika evaluasi RBAC
│       ├── init.ts           # Pendaftaran default rules
│       └── index.ts          # Re-ekspor modul RBAC
```

> Semua komponen UI, layanan frontend, plugin, backend, hanya boleh membaca dari struktur ini.

---

## 🚀 LANGKAH-LANGKAH IMPLEMENTASI

### ### ⚙️ Fase 1: **Konsolidasi Definisi ke `@mx-core/types`**

#### 🔹 1.1. Konsolidasi `UserRole` dan `ROLE_ORDER`

- Pastikan semua `Role` dan urutannya **hanya tersedia** di `roles.ts`.
- Buat enum-like structure dan `roleGte()` untuk pembanding hierarki.

#### 🔹 1.2. Konsolidasi `Perm` dan `ROLE_PERMS`

- Tambahkan file `permissions.ts` di `types`, menyimpan:

  - Daftar permission granular (`Perm`)
  - Pemetaan role → permission (`ROLE_PERMS`)

#### 🔹 1.3. Normalisasi

- Definisikan fungsi `normalizeRole(role: string): UserRole | undefined`

  - Untuk mengonversi input string (misal dari frontend/user) ke nilai `UserRole` valid

#### 🔹 1.4. Update `index.ts`

- Pastikan semua definisi diekspor dari entry point

---

### ### ⚙️ Fase 2: **Stabilkan RBAC Engine di `@mx-core/core`**

#### 🔹 2.1. Evaluasi & Lengkapi `rules.ts`, `policy.ts`

- Pastikan struktur RBAC:

  - `rules.ts`: Menyimpan daftar aturan
  - `policy.ts`: Menyediakan fungsi `canAccess(context: RBACContext)`

#### 🔹 2.2. Tambahkan Integrasi Permission (Opsional)

- Jika ingin mendukung `Perm` sebagai abstraksi action, bisa tambahkan lapisan konversi dari `Perm → RBACAction/resource`.

#### 🔹 2.3. Tambahkan `registerDefaultRules()` di `init.ts`

- Default rule disimpan dan didaftarkan melalui fungsi ini.

#### 🔹 2.4. Buat validasi konsistensi saat build/test

- Jika memungkinkan, buat test/assert bahwa semua role di `rules` ada di `ROLE_ORDER`, dan semua `action` valid.

---

### ### ⚙️ Fase 3: **Migrasi Konsumen (Frontend, UI, Backend)**

#### 🔹 3.1. Migrasi `apps/frontend`

- **Hapus definisi lokal Role & Perm di**:

  - `apps/frontend/components/roles.ts`

- Ganti semua `Role`, `Perm`, `roleGte`, `ROLE_PERMS` → impor dari `@mx-core/types`

#### 🔹 3.2. Refactor `AuthService`

- Ganti `can(perm: Perm)` menjadi:

  - Menggunakan `canAccess()` dari `@mx-core/core`
  - Konversi `Perm → resource/action` dilakukan di frontend **jika perlu**

#### 🔹 3.3. Evaluasi `CanAccess` Component (di `@mx-core/ui`)

- Pastikan komponen ini menggunakan `canAccess()`
- Tidak boleh hardcoded permission di dalamnya

#### 🔹 3.4. Cek konsumsi lainnya

- Plugin UI? Backend API? Middleware?
- Jika ada pengecekan role manual, ubah agar gunakan `@mx-core/core` dan `@mx-core/types`

---

### ### ⚙️ Fase 4: **Penguatan Validasi & Dokumentasi**

#### 🔹 4.1. Testing

- Tambahkan test kombinasi untuk:

  - Semua `role + resource + action` → hasil `canAccess()` sesuai ekspektasi

- Test `normalizeRole()`, `roleGte()`, dsb.

#### 🔹 4.2. Dokumentasi

- Tambahkan file `README.md` dalam `@mx-core/types` dan `@mx-core/core` menjelaskan:

  - Definisi Role
  - Cara kerja RBAC
  - Cara mendaftarkan rule
  - Cara mengakses dan menggunakan dari luar

#### 🔹 4.3. CI Check (Opsional)

- Tambahkan lint rule atau script validasi SSOT:

  - Semua file baru di luar `@mx-core/types` & `@mx-core/core` tidak boleh mendefinisikan Role atau Permission baru

---

## 🗃️ FILE YANG DIPERIKSA / DIMODIFIKASI

Berikut file-file utama yang akan **ditambahkan atau dimodifikasi** dalam proses ini:

| Tipe      | File                                     | Status                          |
| --------- | ---------------------------------------- | ------------------------------- |
| ✅ Tambah | `packages/types/src/permissions.ts`      | Untuk `Perm` dan `ROLE_PERMS`   |
| ✅ Tambah | `normalizeRole()` di `roles.ts`          | Konversi lowercase → PascalCase |
| ✅ Ubah   | `apps/frontend/components/roles.ts`      | **Akan dihapus**                |
| ✅ Ubah   | `apps/frontend/services/auth-service.ts` | Refactor `can()`                |
| ✅ Ubah   | `@mx-core/ui/components/CanAccess.tsx`   | Pakai `canAccess()`             |
| ✅ Cek    | Plugin lain (jika ada role hardcoded)    | Hapus local logic               |

---

## 🧑‍🏫 KONFIRMASI YANG DIPERLUKAN

Sebelum saya melanjutkan ke tahapan teknis, saya perlu **konfirmasi dari Anda** untuk hal-hal berikut:

1. **Apakah Anda menyetujui rencana struktur & tahapan di atas sebagai acuan?**
2. **Apakah saya boleh mulai merinci isi file baru `permissions.ts` dan revisi `roles.ts`?**
3. **Apakah perlu saya cek `@mx-core/ui/components/CanAccess.tsx` jika belum ada? Mohon upload jika perlu.**

---

Saya menunggu persetujuan Anda **sebelum lanjut ke tahap pembuatan atau modifikasi file**.
