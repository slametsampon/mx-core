# 🧩 Business Plan Implementasi Modul `mxcore-rbm` (Untuk Monorepo MxCore)

## 📌 Tujuan Utama

Membangun dan mengintegrasikan **modul Risk-Based Maintenance (RBM)** ke dalam sistem monorepo `mxcore` sebagai **plugin modular** yang mendukung strategi pemeliharaan berbasis dampak kegagalan, dengan pendekatan spesifik seperti yang diterapkan di PT PON.

---

## 📋 Ringkasan Fungsi Modul

| Fungsi                                  | Tujuan Bisnis                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| 📌 **Grading ESC**                      | Menentukan dampak kegagalan berdasarkan Environment, Safety, dan Continuity  |
| 🧾 **Asset Criticality Classification** | Mengelompokkan peralatan ke dalam kategori Kritis vs Normal                  |
| 🛠️ **Maintenance Strategy Matrix**      | Menetapkan strategi PPC (Preventive, Predictive, Corrective) secara selektif |
| 🗂️ **DIA & KDIA Management**            | Manajemen data master aset dan hasil klasifikasi berbasis ESC                |
| 📆 **TBM Hybrid Schedule Engine**       | Penjadwalan pemeliharaan berbasis klasifikasi dan evaluasi                   |
| 🔍 **Evaluation Engine**                | Sistem monitoring hasil performa dan gangguan secara berkala                 |
| 📤 **Export CMMS / Work Order**         | Output data work order untuk diintegrasi ke CMMS                             |
| 📊 **Reporting & Dashboard**            | Laporan dan dashboard visual berbasis data risiko & histori evaluasi         |

---

## 🧭 Rencana Implementasi Modular (Tahapan)

| Tahap | Modul / Sub-Produk                     | Target Output                                      | Stakeholder         |
| ----- | -------------------------------------- | -------------------------------------------------- | ------------------- |
| 1     | **Grading ESC + Kritis/Normal**        | ESC grading engine + KDIA output                   | Reliability Eng     |
| 2     | **Manajemen DIA (Daftar Induk Aset)**  | Form input/tagging aset                            | Maint. Planner      |
| 3     | **Strategi Pemeliharaan (PPC Matrix)** | Mapping criticality ke jenis perawatan             | Maint. Planner      |
| 4     | **Jadwal TBM Hybrid**                  | Engine generasi jadwal berdasarkan tier            | Maint. Scheduler    |
| 5     | **Evaluation Engine**                  | Formulir dan histori evaluasi                      | Inspector, Eng      |
| 6     | **Export CMMS**                        | JSON/CSV exporter untuk CMMS (integration-ready)   | IT, CMMS Admin      |
| 7     | **Dashboard & Reporting**              | Visualisasi tier, ESC grading, histori maintenance | Supervisor, Manajer |

---

## 📁 Struktur Implementasi Modular

Berbasis `monorepo`, plugin ini akan berada di:

```bash
mx-core-rbm
├── .next/                        # build output (auto-generated)
├── .turbo/                      # turbo cache (auto-generated)
├── dist/                        # optional for compiled output
├── node_modules/
├── public/                      # assets (icons, static files)
├── src/
│   ├── app/
│   │   ├── about/               # halaman info plugin (optional)
│   │   ├── assets/              # halaman Daftar Induk Aset (DIA)
│   │   ├── grading/             # halaman grading ESC
│   │   ├── schedule/            # halaman TBM Schedule
│   │   ├── evaluation/          # histori evaluasi
│   │   ├── export/              # halaman integrasi/export CMMS
│   │   ├── dashboard/           # visualisasi ESC, TBM, grafik
│   │   ├── layout.tsx           # layout utama
│   │   └── page.tsx             # halaman root plugin (landing RBM)
│   ├── components/              # komponen UI reusable
│   ├── config/                  # konfigurasi plugin
│   ├── css/                     # tailwind / custom css
│   ├── data/                    # mock data aset, grading, dsb
│   ├── hooks/                   # custom React hooks
│   ├── models/                  # definisi data model (ESC, Aset, dsb)
│   ├── services/                # logika bisnis (grading, jadwal, dsb)
│   └── utils/                   # helper functions
├── .env                         # konfigurasi env
├── .env.local                   # env lokal
├── .env.production              # env production
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── plugin.json                  # metadata plugin (bisa pakai schema standar mxcore)
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── scripts/                     # optional: migrasi data, import csv, dll
│   └── import-assets.ts         # contoh script helper
└── check-list-migrasi.md        # dokumentasi teknis migrasi RBM
```

---

## 📦 Penjelasan per Folder

### ✅ `src/app/`

Struktur berbasis **Next.js App Router**, halaman terbagi berdasarkan fitur utama RBM:

| Folder        | Tujuan                                                               |
| ------------- | -------------------------------------------------------------------- |
| `assets/`     | Daftar Induk Aset (DIA), input & tampilan asset                      |
| `grading/`    | ESC grading page, klasifikasi kritikalitas aset                      |
| `schedule/`   | Visualisasi jadwal TBM (berdasarkan tiering)                         |
| `evaluation/` | Entry histori evaluasi peralatan                                     |
| `export/`     | Halaman ekspor work order / CMMS                                     |
| `dashboard/`  | Dashboard ringkasan: ESC status, tier, TBM plan, grafik kritikalitas |
| `about/`      | Halaman penjelasan RBM (opsional untuk edukasi user)                 |

---

### ✅ `src/models/`

Berisi semua definisi data model, konsisten dengan diskusi sebelumnya:

- `Asset.ts`
- `ESCGrading.ts`
- `AssetCriticality.ts`
- `TBMSchedule.ts`
- `EvaluationRecord.ts`
- `MaintenancePlan.ts`

---

### ✅ `src/services/`

Berisi logic bisnis dan engine utama:

- `gradingService.ts`
- `criticalityService.ts`
- `scheduleService.ts`
- `evaluationService.ts`
- `exportService.ts`

---

### ✅ `src/data/`

Berisi data mockup atau referensi:

- `assets.json`
- `grading.json`
- `tbmSchedule.json`
- `evaluation.json`

> Saat belum terkoneksi DB atau API, file ini bisa digunakan untuk testing dan demo.

---

### ✅ `plugin.json`

Berisi metadata plugin, misalnya:

```json
{
  "name": "mx-core-rbm",
  "type": "plugin",
  "version": "0.1.0",
  "description": "Risk-Based Maintenance plugin untuk manajemen aset berbasis ESC grading dan strategi TBM adaptif",
  "ui": true,
  "api": true,
  "active": true,
  "module": "dist/index.js",
  "basePath": "https://mx-core-rbm.vercel.app",
  "rbac": [
    { "role": "Operator", "resource": "rbm", "action": "view" },
    { "role": "Inspector", "resource": "rbm", "action": "evaluate" },
    { "role": "Engineer", "resource": "rbm", "action": "grade" },
    { "role": "Planner", "resource": "rbm", "action": "schedule" },
    { "role": "Supervisor", "resource": "rbm", "action": "approve" },
    { "role": "Manager", "resource": "rbm", "action": "export" }
  ]
}
```

---

### ✅ `scripts/`

Berisi script utilitas:

- Import/export data
- Konversi file `.csv` ke JSON
- Migrasi struktur DIA lama ke model baru

---

### ✅ `check-list-migrasi.md`

Dokumen untuk tracking progress migrasi dari spreadsheet/manual ke sistem ini:

Contoh isi:

```md
# Checklist Migrasi RBM PT PON

✅ Daftar Induk Aset (DIA) ter-input ke /data/assets.json  
✅ ESC grading minimal 80% lengkap  
✅ Mapping tier evaluasi selesai  
🟡 TBM Schedule masih 50% manual  
❌ Belum integrasi CMMS
```

---

## 🔚 Kesimpulan

Struktur folder ini:

- Konsisten dengan plugin `mx-core-metric`
- Terstruktur rapi: **data | model | logic | UI | dokumentasi**
- Siap mendukung Next.js App Router + integrasi ke sistem lain
- Modular: bisa di-scale ke fitur tambahan seperti predictive analysis atau CBM

---

# ✅ Revisi Data Model (Menggunakan `tagNumber` sebagai Primary ID)

Semua relasi antar-entitas akan menggunakan `tagNumber: string` sebagai foreign key.

---

## 📦 `Asset.ts`

```ts
export interface Asset {
  tagNumber: string; // PRIMARY ID
  name: string;
  unit: string; // Syngas, Octanol, Utility, dst
  category:
    | 'Rotating'
    | 'Static'
    | 'Electrical'
    | 'Instrumentation'
    | 'Control';
  location: string; // optional, e.g., area code
}
```

---

## 📦 `ESCGrading.ts`

```ts
export type ESCGrade = 'Low' | 'Medium' | 'High';

export interface ESCGrading {
  tagNumber: string; // FK ke Asset
  environment: ESCGrade;
  safety: ESCGrade;
  continuousRunning: ESCGrade;
  gradedBy: string;
  gradedAt: Date;
}
```

---

## 📦 `Criticality.ts`

```ts
export type Criticality = 'Kritis' | 'Normal';

export interface AssetCriticality {
  tagNumber: string; // FK ke Asset
  criticality: Criticality;
  determinedBy: string;
  determinedAt: Date;
}
```

---

## 📦 `Tier.ts`

```ts
export type EvaluationTier = 'Tier1' | 'Tier2' | 'Tier3';

export interface AssetTier {
  tagNumber: string;
  tier: EvaluationTier;
  notes?: string;
}
```

---

## 📦 `TBMSchedule.ts`

```ts
export interface TBMSchedule {
  tagNumber: string;
  maintenanceType: 'Preventive' | 'Predictive' | 'Corrective';
  interval: 'Daily' | 'Monthly' | '6Months';
  lastExecuted: Date;
  nextDue: Date;
}
```

---

## 📦 `EvaluationRecord.ts`

```ts
export interface EvaluationRecord {
  id: string; // ID unik evaluasi (UUID atau incremental)
  tagNumber: string;
  evaluatedAt: Date;
  evaluator: string;
  result: 'OK' | 'Warning' | 'Failure';
  notes?: string;
}
```

---

## 📦 `MaintenancePlan.ts`

```ts
export interface MaintenancePlan {
  tagNumber: string;
  strategy: 'P' | 'P+C' | 'P+P+C';
  updatedAt: Date;
  updatedBy: string;
}
```

---

# 🔗 Revisi ERD (Entity Relationship Diagram)

Sekarang semua entitas menggunakan **`tagNumber` sebagai kunci utama dan relasional**:

```
     ┌─────────────┐
     │   Asset     │
     │ tagNumber*  │
     └────┬────────┘
          │
          ▼
┌──────────────────┐
│   ESCGrading     │
│  tagNumber (FK)  │
└──────────────────┘

          │
          ▼
┌──────────────────────┐
│  AssetCriticality    │
│  tagNumber (FK)      │
└──────────────────────┘

          │
          ▼
┌──────────────────────┐
│      AssetTier       │
│    tagNumber (FK)    │
└──────────────────────┘

          │
          ▼
┌──────────────────────┐
│     TBMSchedule      │
│    tagNumber (FK)    │
└──────────────────────┘

          │
          ▼
┌──────────────────────┐
│  EvaluationRecord    │
│    tagNumber (FK)    │
└──────────────────────┘

          │
          ▼
┌──────────────────────┐
│   MaintenancePlan    │
│    tagNumber (FK)    │
└──────────────────────┘
```

---

## 🔒 Catatan Teknis

- `tagNumber` harus dijaga konsistensinya **tanpa spasi** atau **case-sensitive**.
- Jika ada struktur tag (misal: `U1-HC-001` → Unit1, Hydrogen Compressor), bisa diparsing untuk grouping.
- Gunakan `tagNumber.toUpperCase()` jika ingin menghindari case mismatch dalam validasi.
