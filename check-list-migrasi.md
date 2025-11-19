Dalam konteks pengembangan berbasis **monorepo modular**, terutama dengan plugin seperti `mx-core-docs` yang melibatkan **Next.js, Contentlayer, dan GitHub Pages**, **menunda testing sampai akhir (langkah 9)** memang sangat **berisiko dan tidak disarankan**, terlebih jika:

---

- [🗂️ Struktur Folder Monorepo `mx-core` (dengan Keterangan Lengkap)](#️-struktur-folder-monorepo-mx-core-dengan-keterangan-lengkap)
  - [📝 Catatan Tambahan](#-catatan-tambahan)
    - [🔹 `apps/` ≠ Tempat Fitur](#-apps--tempat-fitur)
    - [🔹 `plugins/` = Sumber Fitur Sebenarnya](#-plugins--sumber-fitur-sebenarnya)
    - [🔹 `packages/` = Library Internal](#-packages--library-internal)
    - [🔹 Plugin Loader (di `packages/core`)](#-plugin-loader-di-packagescore)
    - [🔹 Tentang `deploy-preview.yml`](#-tentang-deploy-previewyml)
    - [🔹 Workflow CI/CD Lanjutan](#-workflow-cicd-lanjutan)
- [🔁 **Tahap 1 — Inisialisasi Plugin Lokal (100% Isolasi)**](#-tahap-1--inisialisasi-plugin-lokal-100-isolasi)
  - [📦 Rincian Isi Folder `plugins/mx-core-docs`](#-rincian-isi-folder-pluginsmx-core-docs)
  - [🎯 Tujuan Utama](#-tujuan-utama)
  - [📁 Struktur Folder Akhir Diharapkan](#-struktur-folder-akhir-diharapkan)
  - [🧭 Langkah-Langkah Teknis](#-langkah-langkah-teknis)
    - [🔹 1. **Buat Branch Baru untuk Migrasi**](#-1-buat-branch-baru-untuk-migrasi)
    - [🔹 2. **Salin Proyek Lama ke Plugin Folder**](#-2-salin-proyek-lama-ke-plugin-folder)
    - [🔹 3. **Buat `package.json` Minimal untuk Plugin**](#-3-buat-packagejson-minimal-untuk-plugin)
    - [🔹 4. **Buat `tsconfig.json` Plugin**](#-4-buat-tsconfigjson-plugin)
    - [🔹 5. **Buat `.gitignore` Lokal Plugin**](#-5-buat-gitignore-lokal-plugin)
    - [🔹 6. **(Opsional) Buat `next.config.js` Default**](#-6-opsional-buat-nextconfigjs-default)
    - [🔹 7. **(Opsional) Tambahkan Plugin ke Workspace Root**](#-7-opsional-tambahkan-plugin-ke-workspace-root)
    - [🔹 8. **Jalankan Plugin Secara Mandiri**](#-8-jalankan-plugin-secara-mandiri)
  - [✅ Checkpoint Verifikasi Tahap 1](#-checkpoint-verifikasi-tahap-1)
  - [🚦 Troubleshooting Umum](#-troubleshooting-umum)
  - [🔒 Push ke GitHub untuk Backup](#-push-ke-github-untuk-backup)
- [🔁 **Tahap 2 — Validasi Contentlayer dalam Isolasi**](#-tahap-2--validasi-contentlayer-dalam-isolasi)
- [🔁 **Tahap 3 — Simpan di GitHub Cabang Sendiri (Sementara)**](#-tahap-3--simpan-di-github-cabang-sendiri-sementara)
- [🔁 **Tahap 4 — Integrasi Bertahap ke Monorepo**](#-tahap-4--integrasi-bertahap-ke-monorepo)
  - [🧱 **Struktur Awal Target**](#-struktur-awal-target)
  - [� **Langkah 1 — Buat Folder \& Inisialisasi Frontend App**](#-langkah-1--buat-folder--inisialisasi-frontend-app)
  - [🔹 **Langkah 2 — Tambahkan Alias di `tsconfig.base.json`**](#-langkah-2--tambahkan-alias-di-tsconfigbasejson)
  - [🔹 **Langkah 3 — Update `apps/frontend/tsconfig.json`**](#-langkah-3--update-appsfrontendtsconfigjson)
  - [🔹 **Langkah 4 — Buat Next App Minimal**](#-langkah-4--buat-next-app-minimal)
  - [🔹 **Langkah 5 — Konfigurasi Tailwind di `frontend`**](#-langkah-5--konfigurasi-tailwind-di-frontend)
  - [🔹 **Langkah 6 — Tambahkan `transpilePackages` (optional)**](#-langkah-6--tambahkan-transpilepackages-optional)
  - [🔹 **Langkah 7 — Jalankan Dev**](#-langkah-7--jalankan-dev)
  - [✅ Checkpoint: Setelah Langkah 7](#-checkpoint-setelah-langkah-7)
  - [✅ Checklist Tahap 4](#-checklist-tahap-4)
  - [📌 Catatan Tambahan](#-catatan-tambahan-1)
- [🔁 **Tahap 5 — Buat Workflow Deploy Preview Plugin**](#-tahap-5--buat-workflow-deploy-preview-plugin)
- [🔁 **Tahap 6 — Uji Plugin Loader (Opsional)**](#-tahap-6--uji-plugin-loader-opsional)
- [🔁 **Tahap 7 — Finalisasi \& Merge ke Main**](#-tahap-7--finalisasi--merge-ke-main)
- [🔐 Manfaat Pendekatan Ini](#-manfaat-pendekatan-ini)
  - [📦 Apakah Ingin Saya Buatkan?](#-apakah-ingin-saya-buatkan)

---

# 🗂️ Struktur Folder Monorepo `mx-core` (dengan Keterangan Lengkap)

```plaintext
/mx-core
├── apps/                          # Aplikasi utama (entry-point) — tidak untuk fitur
│   ├── frontend/                  # Next.js App utama (portal pengguna, UI shell)
│   │   ├── package.json           # Konfigurasi lokal frontend (scripts, deps)
│   │   ├── next.config.js         # Config Next.js, termasuk transpilePackages plugin
│   │   └── ...                    # Routing, layout, app/page untuk host plugin UI
│   └── backend/                   # Express/Node API utama (gateway semua plugin API)
│       ├── package.json           # Config backend, termasuk Fastify/Express, loader plugin
│       └── ...                    # Plugin registry, handler router, middleware
│
├── packages/                      # Shared code untuk seluruh modul/plugin
│   ├── core/                      # Engine inti: plugin loader, auth, RBAC, logger
│   ├── models/                    # Shared data-model (TS interface: CMMS, IoT, RBM, dll)
│   ├── ui/                        # Komponen UI bersama (reusable: Button, Modal, dsb)
│   └── utils/                     # Helper dan fungsi umum (format date, validator, dll)
│
├── plugins/                       # Plugin modular yang bisa diaktifkan/dinonaktifkan
│   └── mx-core-docs/              # Plugin dokumentasi (Next.js static, pakai Contentlayer)
│       ├── src/                   # Seluruh isi proyek dokumentasi (struktur Next.js)
│       │   ├── app/               # App router (Next.js 13+), entry UI lokal plugin
│       │   ├── content/           # File konten dokumentasi (.mdx, .md)
│       │   ├── components/        # Komponen UI lokal plugin (tidak global)
│       │   └── styles/            # File CSS/Tailwind lokal plugin
│       ├── contentlayer.config.ts # Config Contentlayer untuk parsing .mdx → JSON
│       ├── next.config.js         # Konfigurasi khusus Next.js untuk plugin ini
│       ├── plugin.json            # Metadata plugin (name, api/ui status, path)
│       ├── index.ts               # Entry point plugin (export `registerPlugin()` ke core)
│       ├── package.json           # Config plugin: dep, script, nama, workspace
│       ├── tsconfig.json          # Konfigurasi TypeScript plugin
│       └── .gitignore             # Ignore build file (.next, dist, dsb)
│
├── node_modules/                  # Hoisted dependencies (semua workspace share ini)
├── package.json                   # Root config (workspaces, script global: dev/build/lint)
├── tsconfig.base.json             # Base TypeScript config (di-extend semua modul)
├── .github/                       # Konfigurasi GitHub Actions (CI/CD pipeline)
│   └── workflows/
│       ├── deploy.yml             # Workflow deploy frontend utama ke GitHub Pages
│       └── deploy-preview.yml    # Workflow deploy khusus plugin secara independen
└── README.md                      # Dokumentasi proyek mx-core secara keseluruhan
```

---

## 📝 Catatan Tambahan

### 🔹 `apps/` ≠ Tempat Fitur

Folder `apps/frontend` dan `apps/backend` adalah tempat integrasi, bukan implementasi fitur. Semua fitur dikembangkan dalam bentuk **plugin modular**, agar:

- Scalable (mudah ditambah plugin baru)
- Maintainable (plugin bisa dikelola, diuji, di-deploy terpisah)
- Konsisten (data model, UI, API terpusat dan reusable)

---

### 🔹 `plugins/` = Sumber Fitur Sebenarnya

Setiap fitur besar seperti:

- `mx-core-docs` (Document Management)
- `mx-core-cmms` (Maintenance)
- `mx-core-iot` (Sensor, MQTT)
- `mx-core-ai` (AI Assistant, NLP)

...semua dikembangkan sebagai plugin dengan konfigurasi `plugin.json` dan **diload secara dinamis** ke `apps/backend` dan `apps/frontend`.

---

### 🔹 `packages/` = Library Internal

Digunakan sebagai shared dependency internal:

- Tidak tergantung ke plugin mana pun
- Tidak punya logika bisnis sendiri
- Tidak punya UI sendiri (kecuali komponen umum di `ui/`)

---

### 🔹 Plugin Loader (di `packages/core`)

Modul `@mx-core/core` bertanggung jawab untuk:

- Membaca dan men-**load plugin** secara dinamis (berdasarkan `plugin.json`)
- Register route API ke Express
- Register page/komponen ke UI shell
- Menyediakan registry dan lifecycle hook untuk plugin (`onLoad()`, `onRegister()`, dsb)

---

### 🔹 Tentang `deploy-preview.yml`

> Perlu disiapkan untuk plugin yang memiliki halaman statis seperti `mx-core-docs`, agar dapat di-deploy terpisah sebagai preview (misalnya di `https://user.github.io/mx-core-docs-preview`).

---

### 🔹 Workflow CI/CD Lanjutan

Untuk tim besar atau multi-developer:

- Tambahkan lint + test di CI
- Tambahkan validasi `plugin.json`
- Tambahkan preview Contentlayer (untuk plugin .mdx)
- Setup cache NPM + build artifact agar cepat

---

# 🔁 **Tahap 1 — Inisialisasi Plugin Lokal (100% Isolasi)**

---

Berikut adalah **langkah-langkah detail dan rinci untuk Tahap 1 — Inisialisasi dan Isolasi Plugin `mx-core-docs`**, yang menjadi dasar sebelum integrasi ke monorepo secara penuh. Tahap ini bertujuan memastikan plugin dapat:

- Berdiri sendiri dan dijalankan secara mandiri (`npm run dev`)
- Diuji tanpa gangguan dari workspace lain
- Dijadikan fondasi validasi lanjutan seperti Contentlayer dan export static
- Dibackup dengan aman antar mesin atau via Git

---

## 📦 Rincian Isi Folder `plugins/mx-core-docs`

| File/Folder              | Fungsi                                                           |
| ------------------------ | ---------------------------------------------------------------- |
| `src/`                   | Source code plugin (Next.js App Router, komponen, konten)        |
| `src/app/`               | Entry point halaman plugin (App Router `page.tsx`, dll)          |
| `src/content/`           | MDX/markdown konten dokumentasi                                  |
| `src/components/`        | Komponen khusus plugin, jika ada                                 |
| `contentlayer.config.ts` | Konfigurasi Contentlayer                                         |
| `next.config.js`         | Konfigurasi Next.js + Contentlayer + basePath (`/docs-preview`)  |
| `plugin.json`            | Metadata plugin (untuk plugin loader `@mx-core/core`)            |
| `index.ts`               | Entry point plugin (minimal: `export function registerPlugin()`) |
| `package.json`           | Konfigurasi npm untuk plugin ini                                 |
| `tsconfig.json`          | Konfigurasi TypeScript khusus plugin                             |
| `.gitignore`             | Abaikan `.next/`, `.contentlayer/`, `out/`, dll                  |

---

## 🎯 Tujuan Utama

- Membuat branch khusus untuk migrasi plugin `mx-core-docs`
- Menyalin proyek lama ke dalam struktur plugin monorepo `mx-core`
- Menyusun ulang struktur agar sesuai standar plugin
- Menambahkan konfigurasi minimal (TS, npm) agar plugin bisa berjalan secara mandiri
- Verifikasi awal: plugin bisa `npm run dev` dan tampil halaman awal tanpa error

---

## 📁 Struktur Folder Akhir Diharapkan

```
/mx-core
  └── plugins/
      └── mx-core-docs/
          ├── src/
          │   ├── app/
          │   ├── content/
          │   ├── components/
          │   └── ...
          ├── package.json
          ├── tsconfig.json
          ├── next.config.js
          ├── .gitignore
```

---

## 🧭 Langkah-Langkah Teknis

### 🔹 1. **Buat Branch Baru untuk Migrasi**

> Pastikan Anda berada di branch `main` terlebih dahulu:

```bash
git checkout main
git pull origin main
```

> Lalu buat dan pindah ke branch baru:

```bash
git checkout -b feat/plugin-docs-isolasi
```

✅ Sekarang Anda bekerja dalam branch terisolasi khusus migrasi plugin. Semua perubahan akan aman dan tidak mengganggu `main`.

---

### 🔹 2. **Salin Proyek Lama ke Plugin Folder**

> Pindahkan seluruh isi proyek Next.js dokumentasi Anda ke dalam `src/`:

```bash
mkdir -p plugins/mx-core-docs/src
cp -r <folder_proyek_lama>/* plugins/mx-core-docs/src
```

Atau jika ingin salin selektif:

```bash
cp -r pages components public styles content plugins/mx-core-docs/src
```

---

### 🔹 3. **Buat `package.json` Minimal untuk Plugin**

> Lokasi: `plugins/mx-core-docs/package.json`

```json
{
  "name": "mx-core-docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

📌 Tambahkan dependensi lain seperti `contentlayer`, `tailwind`, dll di Tahap 2.

---

### 🔹 4. **Buat `tsconfig.json` Plugin**

> Lokasi: `plugins/mx-core-docs/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "baseUrl": "src"
  },
  "include": ["src"]
}
```

> Pastikan `tsconfig.base.json` sudah ada di root `mx-core`.

---

### 🔹 5. **Buat `.gitignore` Lokal Plugin**

> Lokasi: `plugins/mx-core-docs/.gitignore`

```gitignore
.next/
out/
node_modules/
dist/
.contentlayer/
```

---

### 🔹 6. **(Opsional) Buat `next.config.js` Default**

> Lokasi: `plugins/mx-core-docs/next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

> Akan ditambahkan konfigurasi Contentlayer dan `basePath` di Tahap 2.

---

### 🔹 7. **(Opsional) Tambahkan Plugin ke Workspace Root**

> Lokasi: root `package.json`:

```json
"workspaces": [
  "apps/*",
  "packages/*",
  "plugins/*"
]
```

Lalu install ulang:

```bash
npm install
```

---

### 🔹 8. **Jalankan Plugin Secara Mandiri**

```bash
npm run dev -w mx-core-docs
```

> Jika berhasil, plugin akan berjalan di `http://localhost:3000` dan menampilkan halaman dokumentasi Anda.

---

## ✅ Checkpoint Verifikasi Tahap 1

| Komponen                                | Status Target |
| --------------------------------------- | ------------- |
| Branch `feat/plugin-docs-isolasi` aktif | ✅            |
| Folder `mx-core-docs/` dibuat           | ✅            |
| Isi proyek lama berada di `src/`        | ✅            |
| `package.json` lengkap & valid          | ✅            |
| Bisa `npm run dev -w mx-core-docs`      | ✅            |
| Halaman `/` muncul tanpa error          | ✅            |

---

## 🚦 Troubleshooting Umum

| Gejala                               | Penyebab Kemungkinan                     | Solusi                         |
| ------------------------------------ | ---------------------------------------- | ------------------------------ |
| `Cannot find module 'next'`          | Belum jalankan `npm install` di monorepo | Jalankan `npm install` di root |
| `pages/` tidak ditemukan             | Salah letak: seharusnya di `src/`        | Pindahkan ke `src/`            |
| Error React `use client` / hydration | Versi Next.js terlalu baru/tua           | Pastikan sesuai versi 13/14    |
| Plugin tidak tampil di frontend      | Belum diintegrasikan ke `apps/frontend`  | Masuk Tahap 4 nanti            |

---

## 🔒 Push ke GitHub untuk Backup

> Setelah plugin berhasil dijalankan, simpan hasil Tahap 1 ke GitHub:

```bash
git add plugins/mx-core-docs
git commit -m "init plugin mx-core-docs (isolated stage)"
git push origin feat/plugin-docs-isolasi
```

> Anda dapat membuat Pull Request dari branch ini jika ingin review atau kolaborasi dengan developer lain/laptop lain.

---

# 🔁 **Tahap 2 — Validasi Contentlayer dalam Isolasi**

| Langkah                                                   | Tujuan                        |
| --------------------------------------------------------- | ----------------------------- |
| Buat `contentlayer.config.ts` di root plugin              | Parsing konten                |
| Tambahkan `withContentlayer()` di `next.config.js` plugin | Integrasi Next.js             |
| Jalankan `npm run build -w mx-core-docs`                  | Validasi schema & data        |
| Jalankan `npm run export -w mx-core-docs`                 | Pastikan folder `out/` dibuat |

🟩 **Checkpoint: Plugin bisa build dan export sendiri**

---

# 🔁 **Tahap 3 — Simpan di GitHub Cabang Sendiri (Sementara)**

| Langkah                                   | Tujuan                            |
| ----------------------------------------- | --------------------------------- |
| Buat branch `feat/plugin-docs-migration`  | Pekerjaan tidak mengganggu `main` |
| Commit hasil tahap 1–2 ke cabang tersebut | Backup progres                    |
| Push sebagai referensi antar laptop       | Kolaborasi antar dev stabil       |

🟩 **Checkpoint: Cabang aman, backup migrasi stabil**

---

# 🔁 **Tahap 4 — Integrasi Bertahap ke Monorepo**

Berikut ini adalah panduan **rinci dan sistematis** untuk melaksanakan **🔁 Tahap 4 — Integrasi Plugin `mx-core-docs` ke Monorepo**, termasuk pembuatan dan konfigurasi awal `apps/frontend`, serta penyesuaian lintas konfigurasi di `tsconfig`, alias module, dan setup build agar `apps/frontend` bisa mengakses plugin.

---

## 🧱 **Struktur Awal Target**

```
mx-core/
├── apps/
│   └── frontend/             ✅ ← dibuat sekarang
├── plugins/
│   └── mx-core-docs/         ✅ ← sudah ada
├── packages/
│   └── ...                   ✅ opsional / sudah ada
├── tsconfig.base.json        ✅ ← perlu update alias
├── package.json              ✅ ← sudah ada workspaces
└── ...
```

---

## 🔹 **Langkah 1 — Buat Folder & Inisialisasi Frontend App**

**Tujuan:** Menyiapkan struktur `apps/frontend` sebagai aplikasi utama monorepo.

**Langkah:**

```bash
mkdir -p apps/frontend
cd apps/frontend
npm init -y
```

> Atau buat manual di VSCode:
> `apps/frontend/` dengan subfolder: `src/`, `public/`, dan file `package.json`, `next.config.js`, dll.

Lalu isi `package.json` frontend sesuai dependensi root & plugin:

📄 `apps/frontend/package.json`

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint --fix . --ext .ts,.tsx,.js,.jsx",
    "format": "prettier --write ."
  },
  "dependencies": {
    "next": "13.4.1",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "typescript": "5.0.4",
    "tailwindcss": "3.3.2",
    "postcss": "8.4.23",
    "autoprefixer": "10.4.14",
    "eslint": "^8.45.0",
    "eslint-config-next": "13.5.6",
    "eslint-config-prettier": "^8.8.0",
    "prettier": "2.8.8",
    "prettier-plugin-tailwindcss": "^0.4.1"
  }
}
```

---

## 🔹 **Langkah 2 — Tambahkan Alias di `tsconfig.base.json`**

**Tujuan:** Memungkinkan frontend mengakses `@mx-core/docs` dari plugin.

📄 `tsconfig.base.json` (di root)

Tambahkan:

```jsonc
{
  "compilerOptions": {
    // ...
    "paths": {
      "@mx-core/docs/*": ["plugins/mx-core-docs/src/*"]
    }
  }
}
```

---

## 🔹 **Langkah 3 — Update `apps/frontend/tsconfig.json`**

**Isi:**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

> Tambahkan `next-env.d.ts` di `apps/frontend/` agar typing Next.js aktif.

---

## 🔹 **Langkah 4 — Buat Next App Minimal**

📁 Struktur awal:

```
apps/frontend/
├── public/
├── src/
│   └── pages/
│       └── index.tsx
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.ts
```

📄 `src/pages/index.tsx` (contoh uji plugin):

```tsx
import { SampleComponent } from '@mx-core/docs/components/SampleComponent'; // ⬅️ Komponen ringan

export default function Home() {
  return (
    <div className="p-4">
      <h1>Frontend</h1>
      <SampleComponent />
    </div>
  );
}
```

> Ganti `SampleComponent` dengan komponen nyata dari plugin Anda.

---

## 🔹 **Langkah 5 — Konfigurasi Tailwind di `frontend`**

Salin dari plugin:

📄 `apps/frontend/tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    '../../plugins/mx-core-docs/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;
```

📄 `postcss.config.js`

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 🔹 **Langkah 6 — Tambahkan `transpilePackages` (optional)**

📄 `apps/frontend/next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mx-core/docs'], // ⬅️ agar dapat di-import dari plugin
};

module.exports = nextConfig;
```

---

## 🔹 **Langkah 7 — Jalankan Dev**

```bash
npm run dev -w frontend
```

---

## ✅ Checkpoint: Setelah Langkah 7

| Target                                  | Status |
| --------------------------------------- | ------ |
| Struktur `apps/frontend/` lengkap       | ✅     |
| `package.json` konsisten dengan root    | ✅     |
| Alias `@mx-core/docs` bisa digunakan    | ✅     |
| Komponen dari plugin berhasil di-import | ✅     |
| Tailwind dan Next.js berjalan normal    | ✅     |

---

## ✅ Checklist Tahap 4

| Komponen                                   | Status |
| ------------------------------------------ | ------ |
| `apps/frontend/` dibuat                    | ✅     |
| `tsconfig.base.json` ditambahkan alias     | ✅     |
| `frontend/tsconfig.json` extend base       | ✅     |
| `next.config.js` pakai `transpilePackages` | ✅     |
| Bisa import komponen plugin                | ✅     |
| `npm run dev -w frontend` berhasil         | ✅     |

---

## 📌 Catatan Tambahan

- Plugin `mx-core-docs` tetap bekerja secara **terisolasi**, namun kini dapat digunakan sebagian oleh `apps/frontend`.
- Ini sangat berguna untuk _progressive adoption_ (adopsi bertahap) dan _modular development_.

🟩 **Checkpoint: Komponen plugin dapat diakses oleh frontend**

---

# 🔁 **Tahap 5 — Buat Workflow Deploy Preview Plugin**

| Langkah                                                  | Tujuan                   |
| -------------------------------------------------------- | ------------------------ |
| Buat `deploy-preview.yml` hanya untuk plugin             | Isolasi build & deploy   |
| Tambahkan `contentlayer build` + `next export`           | Siapkan statik konten    |
| Set `destination_dir: docs-preview` di `peaceiris`       | Tidak menimpa site utama |
| Uji hasil di `https://user.github.io/repo/docs-preview/` | Preview plugin sukses    |

🟩 **Checkpoint: Plugin berhasil dideploy ke Pages secara terpisah**

---

# 🔁 **Tahap 6 — Uji Plugin Loader (Opsional)**

Jika plugin ingin dimuat via sistem `@mx-core/core`:

| Langkah                                        | Tujuan                   |
| ---------------------------------------------- | ------------------------ |
| Tambahkan `plugin.json` + `index.ts` di plugin | Registrasi plugin        |
| Jalankan `npm run build -w mx-core-docs`       | Siapkan `dist/index.js`  |
| Validasi loader memuat plugin                  | Uji log & console loader |

🟩 **Checkpoint: Plugin dikenali oleh sistem plugin loader**

---

# 🔁 **Tahap 7 — Finalisasi & Merge ke Main**

| Langkah                                    | Tujuan                        |
| ------------------------------------------ | ----------------------------- |
| Merge cabang migrasi ke `main`             | Final integrasi               |
| Hapus file lama jika sudah tidak dipakai   | Cleanup                       |
| Update dokumentasi developer (`README.md`) | Informasikan cara menjalankan |

🟩 **Checkpoint: Migrasi selesai, plugin aktif, CI/CD stabil**

---

# 🔐 Manfaat Pendekatan Ini

| Keunggulan                                     | Dampak Langsung                      |
| ---------------------------------------------- | ------------------------------------ |
| Setiap tahap diuji mandiri                     | Menghindari error telat diketahui    |
| Aman saat kerja di 2 laptop                    | Tidak perlu copy manual berkali-kali |
| Bisa rollback kapan pun                        | Progres migrasi bisa dipantau jelas  |
| Komunikasi antar tim lebih jelas               | Kolaborasi stabil via GitHub branch  |
| Mengurangi frustrasi dan debugging tidak perlu | Fokus ke logika, bukan recovery      |

---

## 📦 Apakah Ingin Saya Buatkan?

✅ **Checklist Markdown versi iteratif ini** (siap commit ke `/docs/`)
✅ **Template `.sh` / CLI script** untuk validasi tiap langkah (`validate-plugin`)
✅ **GitHub Action untuk auto-verify plugin build** saat push ke branch migrasi

Silakan beri instruksi lanjut. Saya siap bantu.
