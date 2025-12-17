**📘 `@mx-core/core` Developer Guide**

---

## 🧭 Daftar Isi

- [🧭 Daftar Isi](#-daftar-isi)
- [1. 🧩 Pendahuluan](#1--pendahuluan)
- [2. 🗂️ Struktur Proyek](#2-️-struktur-proyek)
- [3. 🔌 Sistem Plugin](#3--sistem-plugin)
  - [🎯 Tujuan](#-tujuan)
  - [📦 Struktur plugin.json](#-struktur-pluginjson)
  - [📁 Contoh Struktur Folder Plugin](#-contoh-struktur-folder-plugin)
  - [⚙️ Cara Plugin di-load](#️-cara-plugin-di-load)
- [4. 🔐 Sistem RBAC](#4--sistem-rbac)
  - [🎯 Desain dan Arsitektur](#-desain-dan-arsitektur)
  - [📂 Struktur Internal](#-struktur-internal)
  - [📜 Struktur `rbac[]` di plugin.json](#-struktur-rbac-di-pluginjson)
  - [👥 Daftar `UserRole` Valid](#-daftar-userrole-valid)
  - [⚙️ Daftar `RBACAction` Valid](#️-daftar-rbacaction-valid)
- [5. 📘 API Reference](#5--api-reference)
  - [📦 `plugin-registry.ts`](#-plugin-registryts)
  - [📦 `plugin-loader.ts`](#-plugin-loaderts)
  - [🔐 `rbac/rules.ts`](#-rbacrulests)
  - [🔐 `rbac/policy.ts`](#-rbacpolicyts)
  - [🔐 `rbac/init.ts`](#-rbacinitts)
- [6. 💡 Tips \& FAQ](#6--tips--faq)
  - [❓ Bagaimana jika plugin tidak punya `plugin.json`?](#-bagaimana-jika-plugin-tidak-punya-pluginjson)
  - [❓ Bagaimana jika `rbac[]` kosong?](#-bagaimana-jika-rbac-kosong)
  - [❓ Bagaimana menguji RBAC?](#-bagaimana-menguji-rbac)
  - [❓ Bisa tambah `condition` di rule?](#-bisa-tambah-condition-di-rule)
- [7. 🗺️ Roadmap \& Tahapan Implementasi](#7-️-roadmap--tahapan-implementasi)
- [🔚 Penutup](#-penutup)
- [📎 Referensi Terkait](#-referensi-terkait)
- [📬 Hubungi Tim MX Core](#-hubungi-tim-mx-core)

---

## 1. 🧩 Pendahuluan

`@mx-core/core` adalah **modul utama** dalam monorepo `mx-core` yang menyediakan:

- Engine untuk **registrasi dan loading plugin** secara dinamis
- **RBAC Engine** (Role-Based Access Control) yang reusable
- Integrasi antarmuka RBAC ke backend maupun frontend

Modul ini digunakan oleh:

- Plugin developer (untuk mendaftarkan plugin dan rule)
- Backend (middleware otorisasi)
- Frontend (via `@mx-core/ui`)

---

## 2. 🗂️ Struktur Proyek

```
packages/core/
├── src/
│   ├── index.ts
│   ├── types.ts
│   ├── plugin-loader.ts
│   ├── plugin-registry.ts
│   └── rbac/
│       ├── index.ts
│       ├── rules.ts
│       ├── policy.ts
│       └── init.ts
├── tsconfig.json
└── docs/
    └── core-guide.md  ← (file ini)
```

---

## 3. 🔌 Sistem Plugin

### 🎯 Tujuan

- Memungkinkan sistem **plugin modular** untuk menambahkan fitur
- Setiap plugin cukup memiliki file `plugin.json` dan entrypoint `module`
- Plugin dapat mendaftarkan rule RBAC-nya sendiri secara declarative

### 📦 Struktur plugin.json

```json
{
  "name": "mx-core-iot",
  "description": "Monitoring sensor IoT",
  "basePath": "/iot",
  "module": "index.js",
  "ui": true,
  "api": true,
  "active": true,
  "rbac": [
    { "role": "Engineer", "resource": "device", "action": "read" },
    { "role": "Supervisor", "resource": "device", "action": "assign" }
  ]
}
```

### 📁 Contoh Struktur Folder Plugin

```
plugins/
└── mx-core-iot/
    ├── plugin.json
    ├── index.js
    └── ...
```

### ⚙️ Cara Plugin di-load

- Plugin akan dibaca oleh `loadPlugins()`
- Hanya plugin dengan `active: true` yang diproses
- Jika memiliki `rbac[]`, semua rule akan didaftarkan otomatis
- Jika memiliki `ui: true`, metadata plugin masuk ke registry

---

## 4. 🔐 Sistem RBAC

### 🎯 Desain dan Arsitektur

RBAC engine terdiri dari:

- Penyimpanan rule (in-memory)
- Evaluator akses (`canAccess`)
- Init rule default (`Admin`, `Manager`, dst)

### 📂 Struktur Internal

```
rbac/
├── rules.ts    → daftar rule + define/reset
├── policy.ts   → evaluasi context akses
├── init.ts     → register default rules
├── index.ts    → entry point ekspor
```

### 📜 Struktur `rbac[]` di plugin.json

```json
"rbac": [
  { "role": "Operator", "resource": "metric", "action": "read" },
  { "role": "Engineer", "resource": "metric", "action": "approve" }
]
```

Jika tidak ada `rbac[]`, plugin tetap aktif, tapi tidak menambah rule baru.

### 👥 Daftar `UserRole` Valid

Didefinisikan di `@mx-core/types/roles.ts`:

```ts
type UserRole =
  | 'Operator'
  | 'Teknisi'
  | 'Engineer'
  | 'Foreman'
  | 'Supervisor'
  | 'Superintendent'
  | 'Manager'
  | 'Admin';
```

### ⚙️ Daftar `RBACAction` Valid

```ts
type RBACAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'assign'
  | 'validate'
  | 'manage';
```

---

## 5. 📘 API Reference

> Berdasarkan ekspor aktual dari `index.ts`, `plugin-registry.ts`, `plugin-loader.ts`, dan modul RBAC.

### 📦 `plugin-registry.ts`

```ts
function registerPlugin(meta: PluginMeta): void;
```

Mendaftarkan metadata plugin ke registry internal.

```ts
function getPlugins(): PluginMeta[];
```

Mengembalikan daftar plugin yang telah terdaftar.

---

### 📦 `plugin-loader.ts`

```ts
async function loadPlugins(dir?: string): Promise<PluginMeta[]>;
```

Meload seluruh plugin dari folder `dir`, memvalidasi dan mendaftarkan RBAC jika ada, serta mengembalikan plugin UI aktif.

---

### 🔐 `rbac/rules.ts`

```ts
function defineRule(rule: RBACRule): void;
```

Mendaftarkan rule RBAC ke list in-memory.

```ts
function getRules(): RBACRule[];
```

Mengambil semua rule aktif.

```ts
function resetRules(): void;
```

Menghapus semua rule dari memori (berguna untuk testing).

---

### 🔐 `rbac/policy.ts`

```ts
function canAccess(context: RBACContext): boolean;
```

Mengecek apakah context memiliki akses sesuai rule yang terdaftar.

---

### 🔐 `rbac/init.ts`

```ts
function registerDefaultRules(): void;
```

Mendaftarkan rule dasar untuk peran seperti `Admin`, `Manager`, dst.

---

## 6. 💡 Tips & FAQ

### ❓ Bagaimana jika plugin tidak punya `plugin.json`?

⤷ Plugin akan di-skip oleh loader.

### ❓ Bagaimana jika `rbac[]` kosong?

⤷ Tidak ada rule baru yang ditambahkan — aman.

### ❓ Bagaimana menguji RBAC?

⤷ Gunakan `canAccess({ role, resource, action })` di unit test atau middleware.

### ❓ Bisa tambah `condition` di rule?

⤷ Ya, ada field `condition?: Record<string, unknown>`, belum digunakan penuh (untuk ABAC di masa depan).

---

## 7. 🗺️ Roadmap & Tahapan Implementasi

| Tahap | Deskripsi                             | Status        |
| ----- | ------------------------------------- | ------------- |
| 1     | Definisi tipe `RBACRule`, `UserRole`  | ✅            |
| 2     | Core RBAC engine                      | ✅            |
| 3     | Integrasi RBAC di plugin-loader       | ✅            |
| 4     | Middleware RBAC untuk Express backend | ✅            |
| 5     | Komponen `CanAccess` di UI (Next.js)  | ✅            |
| 6     | Unit testing untuk RBAC               | 🔄 (opsional) |
| 7     | Dokumentasi developer                 | ✅            |
| 8     | RBAC Editor UI (opsional)             | 🧩            |
| 9     | Plugin packaging & distribusi         | 🧩            |

---

## 🔚 Penutup

Modul `@mx-core/core` adalah fondasi kuat untuk mengelola plugin modular dan sistem otorisasi di seluruh ekosistem MX Core.

Jika Anda mengembangkan plugin:

- Ikuti struktur `plugin.json`
- Gunakan role/action yang valid dari `@mx-core/types`
- Uji logic akses dengan `canAccess()`

🧠 Untuk frontend, gunakan komponen `<CanAccess />` dari `@mx-core/ui`.

---

## 📎 Referensi Terkait

- [`@mx-core/types`](../../types/docs/overview.md)
- [`@mx-core/ui`](../../ui/docs/overview.md)

---

## 📬 Hubungi Tim MX Core

Temui bug? Ajukan pertanyaan? Hubungi melalui GitHub Issues atau internal Slack channel #mxcore-dev.

---
