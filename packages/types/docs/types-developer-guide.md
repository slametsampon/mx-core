**📘 `@mx-core/types` Developer Guide**

---

## 🧭 Daftar Isi

- [🧭 Daftar Isi](#-daftar-isi)
- [1. 📦 Pendahuluan](#1--pendahuluan)
- [2. 🗂️ Struktur Proyek](#2-️-struktur-proyek)
- [3. 🎯 Tujuan dan Fungsi](#3--tujuan-dan-fungsi)
- [4. 🔐 Struktur Tipe RBAC](#4--struktur-tipe-rbac)
  - [📌 RBACAction](#-rbacaction)
  - [📌 RBACRule](#-rbacrule)
  - [📌 RBACContext](#-rbaccontext)
- [5. 👥 Struktur Tipe UserRole](#5--struktur-tipe-userrole)
- [6. 🧑‍💻 Panduan Penggunaan](#6--panduan-penggunaan)
  - [🟢 Untuk Plugin Developer](#-untuk-plugin-developer)
  - [🔵 Untuk Backend Developer](#-untuk-backend-developer)
  - [🟣 Untuk Frontend Developer](#-untuk-frontend-developer)
- [7. 📌 Tips Konsistensi dan Ekstensi](#7--tips-konsistensi-dan-ekstensi)
- [🧩 Integrasi dengan Modul Lain](#-integrasi-dengan-modul-lain)
- [🧪 Pengujian Validitas Tipe (Opsional)](#-pengujian-validitas-tipe-opsional)
- [🔚 Penutup](#-penutup)

---

## 1. 📦 Pendahuluan

`@mx-core/types` adalah modul yang menyimpan **seluruh TypeScript type definitions global** dalam ekosistem monorepo MX Core.

Modul ini menjadi acuan utama bagi:

- `@mx-core/core`: RBAC Engine, plugin registry
- `@mx-core/ui`: Komponen akses berbasis role
- Plugin developer: Penulisan `plugin.json`

---

## 2. 🗂️ Struktur Proyek

```
packages/types/
├── src/
│   ├── index.ts      ← Entry point ekspor semua tipe
│   ├── rbac.ts       ← Struktur RBAC
│   └── roles.ts      ← Struktur UserRole
├── tsconfig.json
└── docs/
    └── types-guide.md  ← (file ini)
```

---

## 3. 🎯 Tujuan dan Fungsi

Tujuan utama `@mx-core/types`:

- Memberikan **source of truth** untuk semua tipe RBAC dan peran pengguna
- Menghindari duplikasi tipe antara `core`, `ui`, plugin
- Menyediakan fleksibilitas untuk ekspansi (misalnya ABAC, multi-tenant, IoT)

---

## 4. 🔐 Struktur Tipe RBAC

File: `src/rbac.ts`

### 📌 RBACAction

```ts
export type RBACAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'assign'
  | 'validate'
  | 'manage';
```

- Mewakili aksi yang bisa diatur menggunakan rule RBAC
- Digunakan di plugin, backend, dan UI (`<CanAccess />`)

---

### 📌 RBACRule

```ts
export interface RBACRule {
  role: UserRole;
  resource: string;
  action: RBACAction;
  condition?: Record<string, unknown>; // opsional, untuk ABAC
}
```

- Rule dasar otorisasi
- Digunakan saat plugin mendaftarkan akses melalui `plugin.json`
- Field `condition` memungkinkan ekspansi ke **ABAC** di masa depan

---

### 📌 RBACContext

```ts
export interface RBACContext {
  role: UserRole;
  resource: string;
  action: RBACAction;
}
```

- Struktur konteks saat mengevaluasi akses user
- Dipakai oleh fungsi `canAccess(context)` di `@mx-core/core`

---

## 5. 👥 Struktur Tipe UserRole

File: `src/roles.ts`

```ts
export type UserRole =
  | 'Operator'
  | 'Teknisi'
  | 'Engineer'
  | 'Foreman'
  | 'Supervisor'
  | 'Superintendent'
  | 'Manager'
  | 'Admin';
```

- Daftar peran resmi yang digunakan lintas sistem
- Semua plugin harus merujuk ke peran ini saat mendeklarasikan `rbac[]`

---

## 6. 🧑‍💻 Panduan Penggunaan

### 🟢 Untuk Plugin Developer

- Import tipe jika menulis `plugin.json` programmatically (misal saat validasi schema):

```ts
import { RBACRule, UserRole } from '@mx-core/types';
```

- Pastikan semua `role` dan `action` valid → gunakan `UserRole` dan `RBACAction`

---

### 🔵 Untuk Backend Developer

- Gunakan `RBACContext` saat membuat middleware RBAC:

```ts
import { RBACContext } from '@mx-core/types';

const context: RBACContext = {
  role: req.headers['x-role'],
  resource: 'device',
  action: 'read',
};
```

---

### 🟣 Untuk Frontend Developer

- Tipe ini dipakai dalam props `<CanAccess />`:

```tsx
<CanAccess role="Supervisor" resource="metric" action="validate">
  <ValidateButton />
</CanAccess>
```

---

## 7. 📌 Tips Konsistensi dan Ekstensi

- **Jangan mendefinisikan role/action sendiri** di luar `@mx-core/types`
- Jika butuh role baru (mis. `Viewer`, `Auditor`), **update tipe ini terlebih dahulu**
- Untuk sistem dinamis (multi-tenant, user-defined roles), pertimbangkan:

  - Tambahan enum: `CustomRole`, `TenantRole`
  - Atau ubah `UserRole` jadi union literal + string:

    ```ts
    export type UserRole = 'Admin' | 'Manager' | ... | (string & {});
    ```

---

## 🧩 Integrasi dengan Modul Lain

| Modul            | Mengimpor Tipe                                      |
| ---------------- | --------------------------------------------------- |
| `@mx-core/core`  | `RBACRule`, `RBACContext`, `UserRole`, `RBACAction` |
| `@mx-core/ui`    | `RBACContext`, `UserRole`, `RBACAction`             |
| Plugin eksternal | `RBACRule`, `UserRole`, `RBACAction`                |

---

## 🧪 Pengujian Validitas Tipe (Opsional)

Untuk menjamin tipe tidak rusak di update mendatang, pertimbangkan menggunakan [`tsd`](https://github.com/SamVerschueren/tsd):

```bash
npm install --save-dev tsd
```

Lalu tambahkan file test tipe:

```ts
import { RBACRule } from '@mx-core/types';

const rule: RBACRule = {
  role: 'Manager',
  resource: 'metric',
  action: 'read',
};
```

---

## 🔚 Penutup

Modul `@mx-core/types` menjadi pondasi sistem otorisasi dan peran dalam seluruh ekosistem `mx-core`. Gunakan tipe-tipe ini sebagai acuan tunggal dan jaga konsistensinya saat sistem berkembang.

🧠 Dokumentasi lain yang terkait:

- [`@mx-core/core`](../../core/docs/core-guide.md)
- [`@mx-core/ui`](../../ui/docs/ui-guide.md)

---
