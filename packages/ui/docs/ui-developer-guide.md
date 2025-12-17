**🎨 Panduan lengkap penggunaan dan integrasi antarmuka UI berbasis RBAC di monorepo `mx-core`**

---

## 🧭 Daftar Isi

- [🧭 Daftar Isi](#-daftar-isi)
- [1. 📦 Pendahuluan](#1--pendahuluan)
- [2. 🗂️ Struktur Proyek](#2-️-struktur-proyek)
- [3. 🎯 Fungsi dan Tujuan](#3--fungsi-dan-tujuan)
- [4. 🔐 Komponen `CanAccess`](#4--komponen-canaccess)
  - [📁 Lokasi](#-lokasi)
  - [📜 Kode Sumber](#-kode-sumber)
  - [⚙️ API Props](#️-api-props)
  - [🧪 Contoh Penggunaan](#-contoh-penggunaan)
  - [🛠️ Cara Kerja Internal](#️-cara-kerja-internal)
- [5. 🔄 Integrasi RBAC End-to-End](#5--integrasi-rbac-end-to-end)
- [6. 💡 Tips dan Ekstensi](#6--tips-dan-ekstensi)
  - [✅ Dukungan untuk Multiple Roles](#-dukungan-untuk-multiple-roles)
  - [⚙️ Menggunakan Role dari Context / Auth](#️-menggunakan-role-dari-context--auth)
  - [🧱 Gunakan untuk:](#-gunakan-untuk)
- [7. 🧪 Catatan Teknis](#7--catatan-teknis)
- [🧠 Penutup](#-penutup)
- [📎 Referensi Terkait](#-referensi-terkait)

---

## 1. 📦 Pendahuluan

Modul `@mx-core/ui` menyediakan komponen React **yang sadar terhadap sistem RBAC** (`Role-Based Access Control`) untuk mempermudah pengelolaan hak akses di sisi frontend.

---

## 2. 🗂️ Struktur Proyek

```
packages/ui/
├── src/
│   └── components/
│       └── CanAccess.tsx
├── tsconfig.json
└── docs/
    └── ui-guide.md ← (file ini)
```

---

## 3. 🎯 Fungsi dan Tujuan

- Menyediakan komponen UI yang **tidak menampilkan elemen jika user tidak punya akses**
- Terintegrasi langsung dengan RBAC engine dari `@mx-core/core`
- Menghindari hardcoded pengecekan role di seluruh komponen
- Meningkatkan keamanan dan UX aplikasi berbasis Next.js

---

## 4. 🔐 Komponen `CanAccess`

### 📁 Lokasi

```
src/components/CanAccess.tsx
```

### 📜 Kode Sumber

```tsx
import { ReactNode } from 'react';
import { canAccess } from '@mx-core/core/rbac';
import type { UserRole, RBACAction } from '@mx-core/types';

interface Props {
  role: UserRole;
  resource: string;
  action: RBACAction;
  children: ReactNode;
}

export const CanAccess = ({ role, resource, action, children }: Props) => {
  const context = { role, resource, action };
  return canAccess(context) ? <>{children}</> : null;
};
```

---

### ⚙️ API Props

| Prop       | Tipe         | Deskripsi                                              |
| ---------- | ------------ | ------------------------------------------------------ |
| `role`     | `UserRole`   | Role user saat ini                                     |
| `resource` | `string`     | Nama resource (misalnya: `metric`, `device`)           |
| `action`   | `RBACAction` | Aksi yang diminta (misalnya: `read`, `assign`)         |
| `children` | `ReactNode`  | Komponen yang hanya akan dirender jika akses diizinkan |

---

### 🧪 Contoh Penggunaan

```tsx
<CanAccess role="Supervisor" resource="kpi" action="validate">
  <ValidateButton />
</CanAccess>
```

Jika kombinasi `role`, `resource`, dan `action` **tidak sesuai** dengan rule yang aktif di sistem, maka `<ValidateButton />` **tidak akan dirender**.

---

### 🛠️ Cara Kerja Internal

1. Props dibentuk menjadi `RBACContext`
2. Dikirim ke fungsi `canAccess(context)` dari `@mx-core/core/rbac`
3. Jika hasilnya `true`, `children` akan dirender
4. Jika `false`, hasilnya `null` → komponen tidak muncul

---

## 5. 🔄 Integrasi RBAC End-to-End

| Lapisan  | Modul           | Tanggung Jawab                                      |
| -------- | --------------- | --------------------------------------------------- |
| Plugin   | `plugin.json`   | Mendaftarkan `rbac[]` rules                         |
| Backend  | `@mx-core/core` | Meload rules dan evaluasi akses                     |
| Frontend | `@mx-core/ui`   | Merender komponen hanya jika `canAccess()` = `true` |

---

## 6. 💡 Tips dan Ekstensi

### ✅ Dukungan untuk Multiple Roles

Untuk mendukung multiple role (misalnya user dengan lebih dari satu role), kamu bisa refactor:

```tsx
interface Props {
  roles: UserRole[];
  resource: string;
  action: RBACAction;
  children: ReactNode;
}

export const CanAccessMulti = ({
  roles,
  resource,
  action,
  children,
}: Props) => {
  const allowed = roles.some((role) => canAccess({ role, resource, action }));
  return allowed ? <>{children}</> : null;
};
```

---

### ⚙️ Menggunakan Role dari Context / Auth

Integrasikan dengan auth context:

```tsx
const { role } = useSession();
<CanAccess role={role} resource="kpi" action="read">
  <KpiChart />
</CanAccess>;
```

---

### 🧱 Gunakan untuk:

- Tab navigasi
- Tombol aksi
- Form tertentu
- Kolom dalam tabel
- Komponen halaman spesifik

---

## 7. 🧪 Catatan Teknis

| Hal                    | Status                                                |
| ---------------------- | ----------------------------------------------------- |
| SSR Compatibility      | ✅ (stateless functional component)                   |
| Server Component Ready | ⚠️ Belum, karena bergantung pada RBAC context runtime |
| Testing                | Disarankan gunakan React Testing Library              |
| Ekstensi               | Bisa diubah jadi HOC `withAccess(Component)`          |

---

## 🧠 Penutup

Komponen `CanAccess` memungkinkan frontend MX Core menjadi:

- Sadar akan role pengguna
- Lebih aman dan kontekstual
- Mudah dipelihara (menghindari pengecekan manual)

🔗 Gunakan bersama:

- `@mx-core/types` untuk `UserRole` dan `RBACAction`
- `@mx-core/core` untuk `canAccess()`

---

## 📎 Referensi Terkait

- [`@mx-core/core`](../../core/docs/core-guide.md)
- [`@mx-core/types`](../../types/docs/types-guide.md)

---
