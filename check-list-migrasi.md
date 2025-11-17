Dalam konteks pengembangan berbasis **monorepo modular**, terutama dengan plugin seperti `mx-core-docs` yang melibatkan **Next.js, Contentlayer, dan GitHub Pages**, **menunda testing sampai akhir (langkah 9)** memang sangat **berisiko dan tidak disarankan**, terlebih jika:

---

- [🗂️ Struktur Folder Monorepo `mx-core`](#️-struktur-folder-monorepo-mx-core)
- [📦 Rincian Isi Folder `plugins/mx-core-docs`](#-rincian-isi-folder-pluginsmx-core-docs)
- [🔁 **Tahap 1 — Inisialisasi Plugin Lokal (100% Isolasi)**](#-tahap-1--inisialisasi-plugin-lokal-100-isolasi)
  - [🎯 Tujuan Utama](#-tujuan-utama)
  - [📁 Struktur Folder Akhir Diharapkan](#-struktur-folder-akhir-diharapkan)
  - [🧭 Langkah-Langkah Teknis](#-langkah-langkah-teknis)
    - [1. **Salin Proyek Lama**](#1-salin-proyek-lama)
    - [2. **Buat `package.json` Minimal untuk Plugin**](#2-buat-packagejson-minimal-untuk-plugin)
    - [3. **Buat `tsconfig.json` Plugin**](#3-buat-tsconfigjson-plugin)
    - [4. **Buat File `.gitignore` Lokal Plugin**](#4-buat-file-gitignore-lokal-plugin)
    - [5. **(Opsional) Buat `next.config.js` Default**](#5-opsional-buat-nextconfigjs-default)
    - [6. **(Opsional) Update Root `package.json` untuk Workspaces**](#6-opsional-update-root-packagejson-untuk-workspaces)
    - [7. **Jalankan Plugin Mandiri**](#7-jalankan-plugin-mandiri)
  - [✅ Checkpoint Verifikasi Tahap 1](#-checkpoint-verifikasi-tahap-1)
  - [🚦 Troubleshooting Umum](#-troubleshooting-umum)
  - [🔒 Backup Aman (Saran)](#-backup-aman-saran)
- [🔁 **Tahap 2 — Validasi Contentlayer dalam Isolasi**](#-tahap-2--validasi-contentlayer-dalam-isolasi)
- [🔁 **Tahap 3 — Simpan di GitHub Cabang Sendiri (Sementara)**](#-tahap-3--simpan-di-github-cabang-sendiri-sementara)
- [🔁 **Tahap 4 — Integrasi Bertahap ke Monorepo**](#-tahap-4--integrasi-bertahap-ke-monorepo)
- [🔁 **Tahap 5 — Buat Workflow Deploy Preview Plugin**](#-tahap-5--buat-workflow-deploy-preview-plugin)
- [🔁 **Tahap 6 — Uji Plugin Loader (Opsional)**](#-tahap-6--uji-plugin-loader-opsional)
- [🔁 **Tahap 7 — Finalisasi \& Merge ke Main**](#-tahap-7--finalisasi--merge-ke-main)
- [🔐 Manfaat Pendekatan Ini](#-manfaat-pendekatan-ini)
  - [📦 Apakah Ingin Saya Buatkan?](#-apakah-ingin-saya-buatkan)

---

# 🗂️ Struktur Folder Monorepo `mx-core`

```plaintext
/mx-core
├── apps/                          # Aplikasi utama (Next.js frontend, Express backend)
│   ├── frontend/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── ...
│   └── backend/
│       ├── package.json
│       └── ...
│
├── packages/                      # Kode bersama (shared logic, model, UI, utils)
│   ├── core/                      # Plugin engine, auth, kernel
│   ├── models/                    # Shared data-model (types/interfaces)
│   ├── ui/                        # Komponen UI bersama (TSX + Tailwind)
│   └── utils/                     # Utility/helper function
│
├── plugins/                       # Plugin modular
│   └── mx-core-docs/              # Plugin dokumentasi berbasis static + Contentlayer
│       ├── src/                   # Seluruh isi proyek dokumentasi Anda (dipindah ke sini)
│       │   ├── app/               # App Router (Next.js 13+)
│       │   ├── content/           # Konten .mdx (dokumen)
│       │   ├── components/        # Komponen lokal plugin
│       │   └── styles/            # Global styles khusus plugin
│       ├── contentlayer.config.ts
│       ├── next.config.js
│       ├── plugin.json            # Metadata plugin untuk loader
│       ├── index.ts               # Entry point plugin (export registerPlugin)
│       ├── package.json
│       ├── tsconfig.json
│       └── .gitignore
│
├── node_modules/                 # Hoisted dependencies
├── package.json                  # Root config (workspaces, script global)
├── tsconfig.base.json            # Base config TS untuk semua project
├── .github/
│   └── workflows/
│       ├── deploy.yml            # Workflow deploy frontend utama
│       └── deploy-preview.yml   # Workflow deploy plugin preview
└── README.md
```

---

# 📦 Rincian Isi Folder `plugins/mx-core-docs`

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

# 🔁 **Tahap 1 — Inisialisasi Plugin Lokal (100% Isolasi)**

---

Berikut adalah **langkah-langkah detail dan rinci untuk Tahap 1 — Inisialisasi dan Isolasi Plugin `mx-core-docs`**, yang menjadi dasar sebelum integrasi ke monorepo secara penuh. Tahap ini bertujuan memastikan plugin dapat:

- Berdiri sendiri dan dijalankan secara mandiri (`npm run dev`)
- Diuji tanpa gangguan dari workspace lain
- Dijadikan fondasi validasi lanjutan seperti Contentlayer dan export static
- Dibackup dengan aman antar mesin atau via Git

---

## 🎯 Tujuan Utama

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

### 1. **Salin Proyek Lama**

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

### 2. **Buat `package.json` Minimal untuk Plugin**

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

📌 Tambahkan dependensi lain seperti `contentlayer`, `tailwind`, dll di tahap berikutnya.

---

### 3. **Buat `tsconfig.json` Plugin**

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

Pastikan `tsconfig.base.json` ada di root `mx-core`.

---

### 4. **Buat File `.gitignore` Lokal Plugin**

> Lokasi: `plugins/mx-core-docs/.gitignore`

```gitignore
.next/
out/
node_modules/
dist/
.contentlayer/
```

---

### 5. **(Opsional) Buat `next.config.js` Default**

> Lokasi: `plugins/mx-core-docs/next.config.js`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
```

> Akan ditambahkan konfigurasi Contentlayer dan basePath di Tahap 2

---

### 6. **(Opsional) Update Root `package.json` untuk Workspaces**

Tambahkan `plugins/*` jika belum:

```json
"workspaces": [
  "apps/*",
  "packages/*",
  "plugins/*"
]
```

Kemudian install ulang workspace:

```bash
npm install
```

---

### 7. **Jalankan Plugin Mandiri**

```bash
npm run dev -w mx-core-docs
```

> Output berhasil: Plugin berjalan di `localhost:3000` dan menampilkan halaman awal dokumentasi Anda.

---

## ✅ Checkpoint Verifikasi Tahap 1

| Komponen                             | Status Target |
| ------------------------------------ | ------------- |
| Plugin folder `mx-core-docs/` dibuat | ✅            |
| Isi proyek lama berada di `src/`     | ✅            |
| `package.json` lengkap & valid       | ✅            |
| Bisa `npm run dev -w mx-core-docs`   | ✅            |
| Halaman `/` muncul tanpa error       | ✅            |

---

## 🚦 Troubleshooting Umum

| Gejala                               | Penyebab Kemungkinan                     | Solusi                         |
| ------------------------------------ | ---------------------------------------- | ------------------------------ |
| `Cannot find module 'next'`          | Belum jalankan `npm install` di monorepo | Jalankan `npm install` di root |
| `pages/` tidak ditemukan             | Salah letak: seharusnya di `src/`        | Pindahkan ke `src/`            |
| Error React `use client` / hydration | Versi Next.js terlalu baru/tua           | Pastikan sesuai versi 13/14    |
| Plugin tidak tampil di frontend      | Belum diintegrasikan ke `apps/frontend`  | Masuk Tahap 4 nanti            |

---

## 🔒 Backup Aman (Saran)

- Buat branch baru `feat/plugin-docs-isolasi`
- Commit hasil Tahap 1
- Push ke GitHub sebagai baseline antar laptop/dev

```bash
git checkout -b feat/plugin-docs-isolasi
git add plugins/mx-core-docs
git commit -m "init plugin mx-core-docs (isolated stage)"
git push origin feat/plugin-docs-isolasi
```

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

| Langkah                                                                   | Tujuan                       |
| ------------------------------------------------------------------------- | ---------------------------- |
| Tambahkan `mx-core-docs` ke `workspaces`                                  | Bisa di-manage npm root      |
| Tambahkan alias di `tsconfig.base.json`                                   | Resolusi `mx-core-docs/*`    |
| Tambahkan `transpilePackages` di `apps/frontend/next.config.js`           | Dapat diakses dari frontend  |
| Import 1 komponen ringan → uji di halaman frontend (bukan seluruh plugin) | Validasi kompatibilitas awal |

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
