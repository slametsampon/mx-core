## 📌 Tujuan Utama

> 🧠 **Membangun dan mengintegrasikan modul Risk-Based Maintenance (RBM) ke dalam sistem monorepo mx-core sebagai plugin modular yang mendukung strategi pemeliharaan berbasis dampak kegagalan, dengan pendekatan spesifik seperti yang diterapkan di PT PON.**

Tujuan ini menempatkan RBM **bukan sekadar fitur**, melainkan sebagai **lapisan pengambilan keputusan strategis** di atas data aset yang telah terstruktur.

---

## 🎯 Visi Sistem

Membangun sistem modular dalam kerangka `mx-core` yang mampu:

- Mengelola aset industri secara **struktural dan teknis**
- Melakukan evaluasi risiko berbasis **dampak kegagalan**
- Menghasilkan strategi pemeliharaan yang **adaptif dan berbasis data**
- Mengadopsi praktik nyata **Risk-Based Maintenance ala PT PON**
- Siap terintegrasi dengan CMMS, dashboard, dan sistem operasional lain

---

## 🧱 Strategi Arsitektur: Dua Sub-Domain dalam Satu Modul

Untuk mencapai visi tersebut, modul `mx-core-rbm` dirancang sebagai **satu plugin utuh**, namun secara konseptual dipisahkan menjadi dua sub-domain:

1. **Asset Sub-Domain** → fondasi data dan struktur aset
2. **RBM Sub-Domain** → lapisan evaluasi, klasifikasi, dan strategi

Pemisahan ini bersifat **konseptual dan struktural**, bukan modular deployment.

---

## 🏗️ Sub-Domain Asset — Fondasi Sistem

### 🎯 Peran

Sub-domain Asset berfungsi sebagai **representasi formal dan stabil** dari seluruh aset fisik yang terdaftar dalam sistem.

Asset adalah **obyek yang dievaluasi**, bukan pengambil keputusan.

### 🔧 Fungsionalitas Utama

- Identitas unik aset (`tagNumber`)
- Deskripsi teknis dan lokasi (`unit`, `area`, `status`)
- Klasifikasi melalui `AssetType` dan `AssetCategory`
- Definisi struktur teknis melalui `AssetTypeSchema`
- Penyimpanan data aktual melalui `AssetDetail`

### 🧩 Karakteristik

- Bersifat **statis, deskriptif, dan struktural**
- Tidak mengandung logika evaluasi risiko
- Menjadi fondasi bagi RBM, CMMS, IoT, dan modul lain

### 📌 Entitas Utama

- `Asset`
- `AssetType`
- `AssetCategory`
- `AssetTypeSchema`
- `AssetDetail`

---

## ⚙️ Sub-Domain RBM — Lapisan Evaluasi & Strategi

### 🎯 Peran

RBM adalah **lapisan intelektual sistem**, yang membaca data aset dan menghasilkan keputusan pemeliharaan berdasarkan **dampak kegagalan**.

RBM tidak mendefinisikan aset, tetapi **menilai dan merespons risiko aset**.

### 🔧 Fungsionalitas Utama

- Penilaian dampak kegagalan melalui **ESC Grading**
- Penentuan **Asset Criticality**
- Penyimpanan histori evaluasi
- Penyusunan **Maintenance Plan**
- Penurunan strategi TBM bila relevan

### 🧩 Karakteristik

- Bersifat **dinamis dan time-based**
- Menyimpan data evaluasi aktual
- Mendukung histori, audit trail, dan re-evaluasi
- Terintegrasi ke Asset melalui `tagNumber`

### 📌 Entitas Utama

- `ESCGrading`
- `AssetCriticality`
- `EvaluationRecord`
- `MaintenancePlan`
- `TBMSchedule`

---

## 🔗 Hubungan Asset dan RBM

RBM **dibangun di atas Asset**, bukan berdampingan secara setara.

| Asset (Fondasi)   | RBM (Evaluasi & Strategi)         |
| ----------------- | --------------------------------- |
| `tagNumber`       | FK logis di seluruh model RBM     |
| `AssetTypeSchema` | Referensi UI dan konteks evaluasi |
| `AssetDetail`     | Konteks teknis saat grading       |

### 🔄 Alur Operasional

1. Asset didefinisikan dalam Asset Sub-Domain
2. ESC Grading dilakukan oleh engineer
3. Criticality ditentukan
4. Semua dicatat dalam Evaluation Record
5. Maintenance Plan disusun
6. Jika TBM → jadwal TBM dibuat

---

## 🧭 Strategi Sistem Berbasis Praktik PT PON

### 🎯 Tujuan

Berpindah dari pemeliharaan berbasis waktu menuju **pemeliharaan berbasis dampak kegagalan**.

### 💡 Konsekuensi Desain

- Evaluasi berbasis ESC (Environment, Safety, Continuity)
- Criticality sebagai prioritas utama
- Maintenance Plan bersifat adaptif
- TBM hanya diterapkan bila hasil RBM mengarah ke sana
- Seluruh sistem modular dalam `mx-core-rbm`

---

## 📋 Ringkasan Fungsi Modul

| Fungsi            | Tujuan                                    |
| ----------------- | ----------------------------------------- |
| ESC Grading       | Menilai dampak kegagalan                  |
| Asset Criticality | Klasifikasi prioritas                     |
| PPC Matrix        | Strategi Preventive/Predictive/Corrective |
| DIA Management    | Data master aset                          |
| TBM Schedule      | Jadwal berbasis hasil RBM                 |
| Evaluation Engine | Histori dan monitoring                    |
| CMMS Export       | Integrasi eksternal                       |
| Dashboard         | Visualisasi risiko                        |

---

## 🧭 Roadmap Implementasi

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

## 📁 Struktur Monorepo Plugin

Berbasis `monorepo`, plugin ini akan berada di:

```bash
plugins/
mx-core-rbm/
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
│   ├── models/
│   │   ├── asset/
│   │   │   ├── Asset.ts
│   │   │   ├── AssetType.ts
│   │   │   ├── AssetTypeSchema.ts
│   │   │   └── AssetDetail.ts
│   │   │   └── ...
│   │   └── rbm/
│   │       ├── ESCGrading.ts
│   │       ├── AssetCriticality.ts
│   │       ├── EvaluationRecord.ts
│   │       ├── MaintenancePlan.ts
│   │       ├── TBMSchedule.ts
│   │       └── ...
│   ├── models/                  # definisi data model (ESC, Aset, dsb)
│   │   ├── asset/               # models asset
│   │   ├── rbm/                 # models rbm
│   ├── services/                # logika bisnis (grading, jadwal, dsb)
│   └── utils/                   # helper functions
├── .env                         # konfigurasi env
├── .env.local                   # env lokal
├── .env.production              # env production
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── plugin.json                  # metadata plugin (bisa pakai schema standar mx-core)
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── scripts/                     # optional: migrasi data, import csv, dll
│   └── import-assets.ts         # contoh script helper
└── check-list-migrasi.md        # dokumentasi teknis migrasi RBM
```

---

## 🧩 Model Mental Sistem

```
┌─────────────┐         ┌────────────────────┐
│  Asset Data │◄───────►│ RBM Evaluations    │
│ (static)    │         │ (dynamic, strategy)│
└─────────────┘         └────────────────────┘
        ▲                        ▲
        │                        │
        │                        └── EvaluationRecord, ESCGrading
        │
        └── AssetTypeSchema ───→ Digunakan UI untuk form grading, detail input
```

---

## 🔗 ERD Terpadu

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

```sql
// Title: ERD mx-core-rbm - Asset & RBM Domain
// Description: Entity Relationship Diagram untuk plugin RBM dalam monorepo mx-core

// ---------------------------
// 🔹 DOMAIN: ASSET
// ---------------------------

Table asset {
  tag_number varchar [pk]
  name varchar
  unit varchar
  asset_type_id varchar [ref: > asset_type.asset_type_id]
  location varchar
}

Table asset_type {
  asset_type_id varchar [pk]
  label varchar
  category_id varchar [ref: > asset_category.category_id]
}

Table asset_category {
  category_id varchar [pk]
  name varchar
  category enum('Rotating', 'Static', 'Electrical', 'Instrumentation', 'Control')
}

Table asset_detail {
  tag_number varchar [pk, ref: > asset.tag_number]
  data jsonb
  created_at timestamp
}

// ---------------------------
// 🔸 DOMAIN: ASSET TYPE SCHEMA (Extended)
// ---------------------------

Table asset_type_schema {
  id uuid [pk]
  asset_type_id varchar [ref: > asset_type.asset_type_id]
  label varchar
  category_id varchar
  version varchar [null]
  created_at timestamp
  updated_at timestamp
}

Table asset_type_schema_field {
  id uuid [pk]
  schema_id uuid [ref: > asset_type_schema.id]
  name varchar
  label varchar
  type enum('string', 'number', 'enum', 'boolean', 'date')
  required boolean
  unit varchar [null]
}

Table asset_type_schema_field_option {
  id uuid [pk]
  field_id uuid [ref: > asset_type_schema_field.id]
  value varchar
}

Table asset_type_schema_spare_part {
  id uuid [pk]
  schema_id uuid [ref: > asset_type_schema.id]
  name varchar
  part_number varchar [null]
  uom varchar
  quantity int
  remarks text [null]
}

Table asset_type_schema_ppc {
  id uuid [pk]
  schema_id uuid [ref: > asset_type_schema.id]
  strategy_type enum('Preventive', 'Predictive', 'Corrective')
  description varchar
}

// ---------------------------
// 🔸 DOMAIN: RBM
// ---------------------------

Table esc_grading {
  tag_number varchar [pk, ref: > asset.tag_number]
  environment enum('Low', 'Medium', 'High')
  safety enum('Low', 'Medium', 'High')
  continuous_running enum('Low', 'Medium', 'High')
  graded_by varchar
  graded_at timestamp
}

Table asset_criticality {
  tag_number varchar [pk, ref: > asset.tag_number]
  criticality enum('Kritis', 'Normal')
  determined_by varchar
  determined_at timestamp
}

Table asset_tier {
  tag_number varchar [pk, ref: > asset.tag_number]
  tier enum('Tier1', 'Tier2', 'Tier3')
  notes text [null]
}

Table maintenance_plan {
  tag_number varchar [pk, ref: > asset.tag_number]
  strategy enum('P', 'P+C', 'P+P+C') // Preventive, Predictive, Corrective
  updated_by varchar
  updated_at timestamp
}

Table tbm_schedule {
  tag_number varchar [pk, ref: > asset.tag_number]
  maintenance_type enum('Preventive', 'Predictive', 'Corrective')
  interval enum('Daily', 'Monthly', '6Months')
  last_executed timestamp
  next_due timestamp
}

Table evaluation_record {
  id uuid [pk]
  tag_number varchar [ref: > asset.tag_number]
  evaluated_at timestamp
  evaluator varchar
  result enum('OK', 'Warning', 'Failure')
  notes text [null]
}
```

---

## 🔒 Catatan Teknis

- `tagNumber` sebagai single business key
- Konsistensi penulisan wajib
- Parsing struktur tag dimungkinkan

---

## 🔚 Kesimpulan

`mx-core-rbm` adalah modul strategis yang:

- Menjaga **Asset tetap bersih dan stabil**
- Menjadikan **RBM sebagai decision layer**
- Mewujudkan praktik RBM PT PON dalam sistem modular
- Siap dikembangkan ke CBM, Predictive, dan Advanced Analytics

```

```
