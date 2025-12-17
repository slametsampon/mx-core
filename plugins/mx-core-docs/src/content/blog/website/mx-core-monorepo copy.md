---
title: Mx-Core – Monorepo
authors: ['sam']
date: '2025-11-16'
tags:
  [
    'Maintenance',
    'System',
    'mx-core',
    'monorepo',
    'modular',
    'dinamis-plugin',
    'Scalable',
  ]
draft: false
summary: Mx-Core adalah sebuah platform digital berbasis plugin dinamis yang dirancang untuk kebutuhan pabrik petrokimia, kimia, energi, pupuk, serta lingkungan industri lainnya.
---

- [🧩 **1. Tujuan dan Alasan Memilih Monorepo untuk Mx-Core**](#-1-tujuan-dan-alasan-memilih-monorepo-untuk-mx-core)
- [🧱 **2. Struktur Folder Monorepo Mx-Core (FINAL)**](#-2-struktur-folder-monorepo-mx-core-final)
- [🧩 **3. Root package.json (Workspace Definition)**](#-3-root-packagejson-workspace-definition)
- [🧩 **4. Node_modules Hanya Satu (di Root)**](#-4-node_modules-hanya-satu-di-root)
- [🧩 **5. Plugin Architecture**](#-5-plugin-architecture)
- [🧩 **6. Shared Data Models**](#-6-shared-data-models)
- [🧩 **7. Konfigurasi Import Types (SOLVED)**](#-7-konfigurasi-import-types-solved)
- [🧩 **8. Integrasi Plugin ke Frontend \& Backend**](#-8-integrasi-plugin-ke-frontend--backend)
- [🧩 **9. Integrasi Antar Modul (AI → Docs → CMMS → IoT → RBM)**](#-9-integrasi-antar-modul-ai--docs--cmms--iot--rbm)
- [🧩 **10. FINAL DECISION: Hosting Strategy**](#-10-final-decision-hosting-strategy)
- [⚡ **11. VERCEL = Hosting Utama untuk Mx-Core**](#-11-vercel--hosting-utama-untuk-mx-core)
- [🧩 **12. Arsitektur Deploy (FINAL)**](#-12-arsitektur-deploy-final)
- [🧩 **13. Kesimpulan Akhir (Executive Summary)**](#-13-kesimpulan-akhir-executive-summary)

---

### 🧩 **1. Tujuan dan Alasan Memilih Monorepo untuk Mx-Core**

Mx-Core memiliki:

- `apps/frontend` (Next.js – UI utama)
- `apps/backend` (Express API)
- plugin dinamis (AI, CMMS, IoT, RBM, Dashboard)
- plugin statis (mx-core-docs)
- shared code / domain model
- plugin engine dinamis (SoC, modular, decoupled)

Karena arsitekturnya moduler & multi-package, **Monorepo dengan NPM Workspaces adalah pilihan terbaik**, karena:

- ✔ Semua modul bisa _share_ code & types
- ✔ Plugin dapat dikembangkan independen
- ✔ Build & deploy dapat dipisahkan per modul
- ✔ Tidak ada duplikasi dependency
- ✔ Integration otomatis: frontend, backend, plugin, shared model
- ✔ Mudah berkembang ke ratusan plugin

---

### 🧱 **2. Struktur Folder Monorepo Mx-Core (FINAL)**

```
/mx-core
  package.json                 ← root workspace + scripts
  tsconfig.json                ← base TS config
  node_modules                 ← global, shared

  /apps
    /frontend                  ← Next.js App Router (UI utama)
    /backend                   ← Express API + SQLite

  /packages
    /types                     ← shared data models
    /core                      ← core engine (plugin loader, RBAC, logger)
    /ui                        ← shared UI components
    /utils                     ← helpers/utilities

  /plugins
    /mx-core-ai                 ← AI plugin
    /mx-core-cmms               ← CMMS plugin
    /mx-core-metric             ← KPI setup & monitoring
    /mx-core-rbm                ← RBM plugin
    /mx-core-docs               ← Document plugin (static)
    /mx-core-dashboard          ← analytics/KPI plugin
```

Semua **plugin** adalah modul independen dengan UI dan API opsional.

---

### 🧩 **3. Root package.json (Workspace Definition)**

```json
{
  "name": "mx-core",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "plugins/*"],
  "scripts": {
    "dev": "npm run dev -w apps/frontend",
    "dev:backend": "npm run dev -w apps/backend",
    "build": "npm run build -w apps/frontend && npm run build -w apps/backend",
    "build:types": "npm run build -w packages/types"
  }
}
```

---

### 🧩 **4. Node_modules Hanya Satu (di Root)**

NPM Workspaces otomatis:

- ✔ hanya 1 `node_modules`
- ✔ dependency di-hoist
- ✔ semua package bisa saling impor
- ✔ lebih cepat, stabil, konsisten

---

### 🧩 **5. Plugin Architecture**

Setiap plugin:

```
/plugins/<plugin-name>
  package.json
  plugin.json
  src/
    index.ts
    ui/
    api/
    schema/
```

Contoh plugin.json:

```json
{
  "name": "mx-core-ai",
  "ui": true,
  "api": true,
  "module": "./dist/index.js"
}
```

Plugin dapat:

- menyediakan API (backend)
- menyediakan UI (frontend)
- menyediakan schema/model lokal
- dipasang/dilepas oleh core engine

---

### 🧩 **6. Shared Data Models**

Simpan semua type global di:

```
/packages/types
```

Contoh:

```
packages/types/cmms/equipment.model.ts
packages/types/iot/sensor.model.ts
packages/types/rbm/riskmatrix.model.ts
packages/types/docs/document.model.ts
```

Satu sumber kebenaran untuk seluruh modul.

---

### 🧩 **7. Konfigurasi Import Types (SOLVED)**

- ✔ 7.1 Exports dalam `/packages/types/package.json`

```json
{
  "name": "@mx-core/types",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": { ".": "./dist/index.js" }
}
```

- ✔ 7.2 Build Types (ke `dist`)

```json
"scripts": { "build": "tsc" }
```

- ✔ 7.3 Root TS Config (path alias)

```json
{
  "compilerOptions": {
    "paths": {
      "@mx-core/types": ["packages/types/dist"],
      "@mx-core/core": ["packages/core/dist"],
      "@mx-core/ui": ["packages/ui"],
      "@mx-core/utils": ["packages/utils"]
    }
  }
}
```

- ✔ 7.4 Next.js transpilePackages

```js
module.exports = {
  transpilePackages: ['@mx-core/types', '@mx-core/core', '@mx-core/ui'],
};
```

⚡ Setelah langkah ini: **tidak ada lagi error import modul.**

---

### 🧩 **8. Integrasi Plugin ke Frontend & Backend**

Frontend:

```ts
import { Equipment } from '@mx-core/types/cmms';
```

Backend:

```ts
import { Sensor } from '@mx-core/types/iot';
```

Plugin:

```ts
import { Document } from '@mx-core/types/docs';
```

---

### 🧩 **9. Integrasi Antar Modul (AI → Docs → CMMS → IoT → RBM)**

Semua modul bisa berkomunikasi lewat:

- shared types
- shared utils
- plugin engine
- inter-module API calls

Ini memperkuat integrasi antar domain:

- IoT feed → Equipment → CMMS WO → RBM → AI Docs
- Konsisten karena schema berasal dari satu sumber

---

### 🧩 **10. FINAL DECISION: Hosting Strategy**

- 🔥 **Kenapa GitHub Pages Tidak Cukup?**

Karena:

- ❌ hanya bisa hosting static file
- ❌ tidak bisa SSR
- ❌ tidak bisa API Routes
- ❌ tidak bisa backend
- ❌ tidak bisa dynamic plugin loading runtime

GitHub Pages **hanya cocok untuk plugin statis**, seperti:

- ✔ `mx-core-docs`

→ bisa deploy via `next export` + `gh-pages`

---

### ⚡ **11. VERCEL = Hosting Utama untuk Mx-Core**

Vercel mendukung:

| Fitur          | Status        |
| -------------- | ------------- |
| SSR            | ✅ didukung   |
| CSR / SPA      | ✅ didukung   |
| SSG / ISR      | ✅ didukung   |
| API Routes     | ✅            |
| Edge Functions | ✅            |
| Statis (docs)  | ✅            |
| Domain Custom  | gratis        |
| Bandwidth      | 100GB / bulan |

**Jadi:**

- 🔥 Hosting Final:

* **Frontend (Next.js) → Vercel**
* **Backend (Express) → Vercel Function / Railway / Render**
* **Plugin Dinamis → Vercel**
* **Plugin Static (Docs) → GitHub Pages**

⚡ **Ini adalah “Hybrid Efisien”**, bukan “Hybrid Rumit”.
Dan jauh lebih sederhana dibanding memaksa semuanya di GitHub Pages.

---

### 🧩 **12. Arsitektur Deploy (FINAL)**

```
mx-core/
  frontend → Vercel (SSR/CSR)
  backend  → Vercel Serverless / Railway / Render
  mx-core-docs → GitHub Pages
  plugin-manifest.json → Public, diload oleh Frontend
```

Frontend membaca manifest:

```
/plugin-manifest.json
```

lalu menampilkan plugin dinamis ataupun statis.

---

### 🧩 **13. Kesimpulan Akhir (Executive Summary)**

| Komponen          | Solusi                                 |
| ----------------- | -------------------------------------- |
| Struktur Monorepo | ✔ apps + packages + plugins            |
| Plugin System     | ✔ modular, dynamic, scalable           |
| Shared Types      | ✔ `packages/types`                     |
| Import Issues     | ✔ solved 100%                          |
| Frontend          | ✔ Next.js di Vercel                    |
| Backend           | ✔ Express di Vercel Function / Railway |
| Plugin Statis     | ✔ GitHub Pages                         |
| Plugin Dinamis    | ✔ Vercel (SSR/API)                     |
| Kompleksitas      | ✔ sangat manageable                    |
| Skalabilitas      | ✔ enterprise-ready                     |

➡ **Mx-Core kini memiliki arsitektur final yang solid, modern, scalable, modular, dan siap produksi.**

---
