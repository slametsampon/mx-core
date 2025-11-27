Terima kasih atas screenshot struktur foldernya — **ini sangat membantu menghilangkan asumsi**.
Sekarang saya berikan **roadmap migrasi ke Vercel secara rinci dan akurat**, **berdasarkan struktur real project `MX-CORE` kamu**, tanpa spekulasi.

---

# 🚀 ROADMAP MIGRASI MX-CORE KE VERCEL (REAL STRUCTURE BASED)

> ✅ Fokus utama:
> Migrasi **`apps/frontend`** ke Vercel (Next.js App utama)
>
> - Integrasi plugin seperti **`plugins/mx-core-docs`** (dokumentasi statis)

---

## 📁 STRUKTUR AKTUAL KAMU

```txt
apps/
  frontend/             → Next.js utama
    public/
    app/
    out/                → hasil export
    next.config.js
    package.json
    tsconfig.json
    ...
packages/
  core/                 → logic plugin, loader, RBAC, dsb
    dist/
    src/
    package.json

plugins/
  mx-core-docs/         → plugin dokumentasi statis (Next.js + Contentlayer)
    public/
    src/
    out/                → hasil export
    next.config.js
    package.json
```

---

# 🧭 TUJUAN AKHIR

| Komponen               | Target Host                                   | Metode                           |
| ---------------------- | --------------------------------------------- | -------------------------------- |
| `apps/frontend`        | ✅ Vercel                                     | Next.js (SSR/SPA)                |
| `plugins/mx-core-docs` | ✅ GitHub Pages (optional) / atau Vercel juga | Static Export (`next export`)    |
| `packages/*`           | ⛔ tidak perlu di-host                        | Untuk import di frontend/backend |
| API/plugin dinamis     | ✅ Vercel (jika ada API routes)               | API Routes / Middleware          |
| Plugin manifest        | ✅ di-serve dari `public/` frontend           | akses oleh Next.js               |

---

# 🪜 LANGKAH MIGRASI TERSTRUKTUR (VERSI AKHIR)

---

## ✅ 1. **Persiapan Repo**

### a. Pastikan project sudah di-push ke GitHub

→ Struktur monorepo tetap seperti sekarang
→ Jangan ubah struktur besar (workspace tetap)

### b. Tambahkan file berikut di root:

#### `vercel.json`

```json
{
  "projects": [
    {
      "name": "mxcore-frontend",
      "rootDirectory": "apps/frontend"
    }
  ]
}
```

#### `.vercelignore` _(optional)_

```txt
node_modules
plugins/*
packages/*
apps/backend/*
```

---

## ✅ 2. **Konfigurasi Workspace Frontend**

### a. `apps/frontend/next.config.js`

Tambahkan `transpilePackages` jika kamu mengimpor module dari `packages/`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@mx-core/core'], // jika diperlukan
};

module.exports = nextConfig;
```

### b. `apps/frontend/tsconfig.json`

Pastikan kamu punya path alias jika perlu:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@mx-core/core": ["../../packages/core/src"]
    }
  }
}
```

---

## ✅ 3. **Siapkan Project di Vercel**

### a. Login ke Vercel → [https://vercel.com/import/git](https://vercel.com/import/git)

### b. Pilih repo kamu

### c. Setting deploy:

| Field            | Nilai                         |
| ---------------- | ----------------------------- |
| Framework preset | `Next.js`                     |
| Root Directory   | `apps/frontend`               |
| Build command    | `npm run build`               |
| Output Directory | (kosongkan, Next.js otomatis) |
| Install command  | (default)                     |

> Vercel akan membaca workspace dan hanya install dependensi untuk `apps/frontend`.

---

## ✅ 4. **Integrasi Plugin Static: mx-core-docs**

Kamu punya 2 opsi:

---

### 🔹 Opsi A — Deploy `mx-core-docs` via GitHub Pages (sudah kamu lakukan)

- Jalankan `next export`

- Hasil `out/` di-_push_ ke branch `gh-pages`

- Bisa diakses via:

  ```
  https://<username>.github.io/mx-core-docs
  ```

- Di `apps/frontend`, kamu bisa fetch manifest:

  ```ts
  fetch('https://<username>.github.io/mx-core-docs/plugin-manifest.json');
  ```

---

### 🔹 Opsi B — Deploy `mx-core-docs` juga ke Vercel (lebih mudah & seamless)

- Buka [https://vercel.com/import/git](https://vercel.com/import/git)
- Pilih repo → deploy ulang tapi arahkan ke:

| Field            | Nilai                       |
| ---------------- | --------------------------- |
| Project name     | `mxcore-docs`               |
| Root directory   | `plugins/mx-core-docs`      |
| Build command    | `next build && next export` |
| Output directory | `out`                       |

- Akses via:

  ```
  https://mxcore-docs.vercel.app
  ```

---

## ✅ 5. **Menempatkan Plugin Manifest**

Untuk plugin dinamis:

- Tempatkan file manifest di:

  ```
  apps/frontend/public/plugin-manifest.json
  ```

- Di `app/page.tsx`:

  ```ts
  const manifestUrl = '/plugin-manifest.json';
  ```

> Ini akan di-_serve_ secara statis oleh Next.js

---

## ✅ 6. **(Opsional) Mengaktifkan API Routes di Frontend**

Kalau kamu ingin plugin menyertakan API dinamis, tinggal tambahkan folder:

```
apps/frontend/app/api/<plugin>/
```

Contoh:

```ts
// apps/frontend/app/api/hello/route.ts

export async function GET() {
  return Response.json({ message: 'Hello from API!' });
}
```

---

## ✅ 7. **Cek dan Uji Build di Vercel**

- Setelah deploy:

  - Cek `https://mxcore-frontend.vercel.app`
  - Pastikan plugin dimuat (dari manifest)
  - Pastikan dokumentasi statis dapat diakses
  - Pastikan API routes jalan (jika ada)

---

## ✅ 8. **(Optional) Gunakan Domain Kustom**

- Buka Settings project di Vercel
- Masukkan domain kamu (`mxcore.mydomain.com`)
- Tambahkan DNS CNAME ke `cname.vercel-dns.com`
- Vercel akan aktifkan HTTPS otomatis

---

## ✅ 9. **Aktifkan CI/CD (Sudah otomatis)**

- Setiap push ke branch `main` / `production` akan auto-deploy
- Kamu bisa preview deploy untuk pull request (default behavior)

---

## 🧾 REKOMENDASI FILE `README.md` / `roadmap-migrasi-vercel.md`

Contoh isi:

```md
# 📦 Migrasi MX-Core ke Vercel (Roadmap)

## ✅ Struktur

- apps/frontend → Next.js utama (SSR + plugin dynamic)
- plugins/mx-core-docs → Dokumentasi (Next export)
- packages/core → Shared plugin engine
- packages/types → Shared types/interfaces

## ✅ Hosting

| Komponen           | Hosting               |
| ------------------ | --------------------- |
| Frontend           | Vercel                |
| Plugin Static Docs | GitHub Pages / Vercel |
| Plugin Manifest    | apps/frontend/public  |
| API Routes         | apps/frontend/app/api |

## ✅ Deployment

- push ke `main` → auto-deploy ke Vercel
- Dokumentasi (optional): `next export` → push ke `gh-pages`

## ✅ Tips

- Gunakan env var untuk konfigurasi plugin
- Gunakan `transpilePackages` jika ada import dari packages/\*
- Untuk API plugin, pakai app/api/[plugin]/route.ts
```

---

## ✅ 10. DONE – Sekarang MX-Core:

- ✅ Sudah bisa dideploy di Vercel
- ✅ Mendukung plugin dinamis & statis
- ✅ Plugin manifest fleksibel
- ✅ Bisa pakai domain sendiri
- ✅ Mendukung SSR, SPA, API, dan dokumentasi

---

## 💬 Butuh bantuan lebih lanjut?

Saya bisa bantu:

- Setup `vercel.json` untuk multi-project (frontend + docs)
- Buatkan template plugin dinamis
- Atur strategi lazy loading plugin runtime

Tinggal bilang: **“Lanjut bantu struktur plugin runtime”** atau kirim file yang ingin dioptimasi.
