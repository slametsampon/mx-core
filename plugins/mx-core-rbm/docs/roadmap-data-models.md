Terima kasih atas rangkuman yang rapi dan padat. Sekarang saya bantu menyusunnya dalam bentuk **📍Roadmap Implementasi Data Model RBM (`mx-core-rbm`)**, lengkap dengan struktur folder, penyimpanan schema/mocks, serta integrasi UI–form builder–mock/live switch.

---

## 🚀 ROADMAP IMPLEMENTASI DATA MODEL RBM

**Untuk Plugin: `mx-core-rbm`**

### 🔰 TUJUAN UTAMA

> Menyediakan kerangka data dan antarmuka dinamis untuk sistem RBM yang terstruktur, fleksibel, dan scalable berdasarkan jenis aset (`AssetType`) dan treatment-nya (PPC & Spareparts).

---

## 🔁 OVERVIEW TAHAPAN

1. 📁 **Setup Struktur Folder & Modul**
2. 📦 **Model Data: DB Schema & JSON Template**
3. 🧪 **Data Mocking untuk Testing**
4. 🖼️ **Form Builder Dinamis (Per AssetType)**
5. 🔌 **Integrasi CMMS & Engine**
6. 🧰 **Utility (Validator, CLI Generator)**
7. 📄 **Dokumentasi Developer + User Guide**

---

## 1️⃣ SETUP STRUKTUR FOLDER

```bash
plugins/
└── mx-core-rbm/
    ├── public/
    │   └── mocks/
    │       ├── asset-sample.json         # ← data aset umum (tagNumber, type, dst.)
    │       ├── asset-detail.json         # ← isi teknis tiap aset
    │       ├── rbm-values.json           # ← grading ESC untuk setiap aset
    │       └── asset-type-schema/
    │           ├── control-valve.json    # ← template field untuk Control Valve
    │           ├── centrifugal-pump.json
    │           └── transformer.json
    ├── src/
    │   ├── models/
    │   ├── views/
    │   ├── lib/
    │   └── ...
    ├── docs/
    │   ├── overview.md
    │   ├── asset-schema-guide.md
    │   └── integration-guide.md
    └── plugin.json
```

---

## 📘 Master List – `AssetCategory` (1–10)

| No. | `category_id`   | Label                | Keterangan Tambahan                  |
| --- | --------------- | -------------------- | ------------------------------------ |
| 01  | `controller`    | Control System       | DCS, PLC, SCADA                      |
| 02  | `instrument`    | Instrumentasi        | CV, Analyzer, Flow Meter, dsb.       |
| 03  | `electrical`    | Kelistrikan          | Motor, Switchgear, Transformer       |
| 04  | `rotating`      | Rotating Equipment   | Pompa, Blower, Compressor            |
| 05  | `static`        | Static Equipment     | Tank, Tower, Reactor, Heat Exchanger |
| 06  | `piping`        | Piping & Valve       | Manual Valve, Strainer, Steam Trap   |
| 07  | `utility`       | Utility / Fasilitas  | AHU, AC, PABX, Air System            |
| 08  | `infrastruktur` | Infrastruktur        | Road Lighting, Paging System         |
| 09  | `misc`          | Miscellaneous        | GD, VS, HY, HC, Peralatan Laborat    |
| 10  | `lab`           | Laboratory Equipment | Alat Ukur, Peralatan Uji             |

---

## 🔖 File JSON (opsional export untuk seed)

```json
[
  { "category_id": "controller", "label": "Control System" },
  { "category_id": "instrument", "label": "Instrumentasi" },
  { "category_id": "electrical", "label": "Kelistrikan" },
  { "category_id": "rotating", "label": "Rotating Equipment" },
  { "category_id": "static", "label": "Static Equipment" },
  { "category_id": "piping", "label": "Piping & Valve" },
  { "category_id": "utility", "label": "Utility / Fasilitas" },
  { "category_id": "infrastruktur", "label": "Infrastruktur" },
  { "category_id": "misc", "label": "Miscellaneous" },
  { "category_id": "lab", "label": "Laboratory Equipment" }
]
```

## 📘 **Referensi Master List – `AssetType` (1–54)**

| No. | Label                                       | `asset_type_id`           | `category_id`   |
| --- | ------------------------------------------- | ------------------------- | --------------- |
| 01  | CONTROL SYSTEM (DCS & RACK ROOM)            | `control-system`          | `controller`    |
| 02  | CONTROL VALVE                               | `control-valve`           | `instrument`    |
| 03  | FLOW METER                                  | `flow-meter`              | `instrument`    |
| 04  | PRESSURE INSTRUMENT                         | `pressure-instrument`     | `instrument`    |
| 05  | PRESSURE GAUGE                              | `pressure-gauge`          | `instrument`    |
| 06  | TEMPERATURE INSTRUMENT                      | `temperature-instrument`  | `instrument`    |
| 07  | TEMPERATURE GAUGE                           | `temperature-gauge`       | `instrument`    |
| 08  | LEVEL INSTRUMENT                            | `level-instrument`        | `instrument`    |
| 09  | LEVEL GAUGE                                 | `level-gauge`             | `instrument`    |
| 10  | ANALYZER                                    | `analyzer`                | `instrument`    |
| 11  | MISCELLENOUS (GD,VS,HY,HC,PY,TY, RD)        | `miscellaneous`           | `misc`          |
| 12  | MOTOR                                       | `motor`                   | `electrical`    |
| 13  | TRANSFORMER                                 | `transformer`             | `electrical`    |
| 14  | BATTERY                                     | `battery`                 | `electrical`    |
| 15  | PANEL LISTRIK                               | `electrical-panel`        | `electrical`    |
| 16  | PANEL INSTRUMENT                            | `instrument-panel`        | `instrument`    |
| 17  | RECEIPTACLE                                 | `receptacle`              | `electrical`    |
| 18  | PAGING SYSTEM                               | `paging-system`           | `infrastruktur` |
| 19  | AIR CONDITIONING                            | `air-conditioning`        | `utility`       |
| 20  | FASILITAS (SNORKLIFT, PENGUSIR TIKUS, PABX) | `facility`                | `infrastruktur` |
| 21  | CATHODIC PROTECTION                         | `cathodic-protection`     | `electrical`    |
| 22  | GROUNDING                                   | `grounding`               | `electrical`    |
| 23  | JUNCTION BOX                                | `junction-box`            | `electrical`    |
| 24  | CUBICLE                                     | `cubicle`                 | `electrical`    |
| 25  | PLC & SCADA                                 | `plc-scada`               | `controller`    |
| 26  | BREATHER VALVE                              | `breather-valve`          | `piping`        |
| 27  | SWITCHGEAR 20KV & 6.3 KV                    | `switchgear`              | `electrical`    |
| 28  | PERALATAN LABORAT                           | `lab-equipment`           | `misc`          |
| 29  | ROAD LIGHTING                               | `road-lighting`           | `infrastruktur` |
| 30  | ALAT UKUR                                   | `measuring-device`        | `instrument`    |
| 31  | CABLE                                       | `cable`                   | `electrical`    |
| 32  | AGITATOR                                    | `agitator`                | `rotating`      |
| 33  | GEAR PUMP                                   | `gear-pump`               | `rotating`      |
| 34  | RECIPROCATING PUMP                          | `reciprocating-pump`      | `rotating`      |
| 35  | CENTRIFUGAL PUMP                            | `centrifugal-pump`        | `rotating`      |
| 36  | BLOWER                                      | `blower`                  | `rotating`      |
| 37  | COMPRESSOR                                  | `compressor`              | `rotating`      |
| 38  | Package Unit                                | `package-unit`            | `static`        |
| 39  | SEPARATOR                                   | `separator`               | `static`        |
| 40  | TANK                                        | `tank`                    | `static`        |
| 41  | DRUM                                        | `drum`                    | `static`        |
| 42  | TOWER                                       | `tower`                   | `static`        |
| 43  | REAKTOR                                     | `reactor`                 | `static`        |
| 44  | HEAT EXCHANGER (STHE, PHE)                  | `heat-exchanger-sthe-phe` | `static`        |
| 45  | FILTER                                      | `filter`                  | `static`        |
| 46  | CANNED PUMP                                 | `canned-pump`             | `rotating`      |
| 47  | EJECTOR                                     | `ejector`                 | `static`        |
| 48  | SAFETY VALVE                                | `safety-valve`            | `piping`        |
| 49  | STEAM TRAP                                  | `steam-trap`              | `piping`        |
| 50  | STRAINER                                    | `strainer`                | `piping`        |
| 51  | STATIC MIXER                                | `static-mixer`            | `static`        |
| 52  | HEAT EXCHANGER (AIR FIN COOLER)             | `heat-exchanger-afc`      | `static`        |
| 53  | PIPING                                      | `piping`                  | `piping`        |
| 54  | VALVE Manual                                | `manual-valve`            | `piping`        |

---

---

## 2️⃣ MODEL DATA (Zod & Interface)

### 🔸 Definisi Model di `/models/`

- `Asset` → Informasi umum (tagNumber, unit, area, status, tier, dst.)
- `AssetType` → Master tipe aset (centrifugal-pump, control-valve, dll.)
- `AssetCategory` → Pengelompokan statis, rotating, elektrik, dll.
- `AssetTemplate` → JSON schema field + PPC + spareParts (per `AssetType`)
- `AssetDetail` → Nilai aktual per tagNumber sesuai template
- `RbmConsequenceValue` → Safety, Environment, Production + metadata

### 🔸 Sample Format

```ts
// asset.ts
export interface Asset {
  tagNumber: string;
  description: string;
  assetType: string;
  unit: string;
  area: string;
  status: 'Active' | 'Spare' | 'Retired';
  criticality?: 'Kritis' | 'Normal';
  tier?: 'Tier1' | 'Tier2' | 'Tier3';
  installationDate?: string;
}
```

---

## 3️⃣ DATA MOCKING UNTUK TESTING

### 📁 `/mocks/`

- `asset-sample.json` → Data 10–20 aset nyata
- `asset-detail.json` → Detail berdasarkan `assetTypeId`
- `rbm-values.json` → ESC grading nilai safety/env/production

### 🔌 Switching: Mock vs Live

```ts
// lib/data-source.ts
export const useMockData = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const fetchAssetData = () => {
  return useMockData
    ? import('../mocks/asset-sample.json')
    : fetch('/api/assets').then((r) => r.json());
};
```

> ✅ Gunakan ENV flag (`NEXT_PUBLIC_USE_MOCK`) agar dapat toggle antara real API dan file mock (untuk pengembangan awal & testing UI)

---

## 4️⃣ FORM BUILDER DINAMIS

### 🔧 `/lib/form-generator.ts`

- Membaca `AssetTypeSchema` JSON
- Membentuk `Zod Schema` + komponen form dinamis berdasarkan `field.type`
- Support: `string`, `number`, `enum`, `date`, `boolean`

### 🧩 `/views/AssetDetailForm.tsx`

- Menampilkan form sesuai tipe aset
- Input → validasi → simpan ke DB / tampilkan hasil grading
- Integrasi langsung dengan:

  - Template field (`metadata`)
  - Form rules (Zod from JSON)
  - PPC strategy (sebagai checklist atau reference)

---

## 5️⃣ INTEGRASI CMMS, ESC & DASHBOARD

### 🔌 `/views/RbmDashboard.tsx`

- Visualisasi:

  - Risk Matrix berdasarkan ESC
  - Jumlah aset Kritis vs Normal
  - Performance Evaluasi (based on tier)

- Ekspor: Work Order, TBM Interval Plan

### 🎯 CMMS Export

- Endpoint atau export ke JSON/CSV:

```json
{
  "tagNumber": "CV-101-A",
  "nextInspection": "2025-04-01",
  "recommendedActions": ["Check stem", "Clean actuator"]
}
```

---

## 6️⃣ UTILITIES & SUPPORT

### 🛠️ `lib/schema-validator.ts`

- Validasi form input berdasarkan `AssetTypeSchema`
- Otomatis reject jika field salah atau missing

### 🧪 CLI Generator (opsional)

```bash
pnpm dev:generate-asset-detail CV-101-A
```

- Mengambil schema dari `assetTypeId`
- Membuat template isian kosong (`asset-detail.json`) per aset

---

## 7️⃣ DOKUMENTASI

### 📁 `/docs/`

| File                    | Isi                                                         |
| ----------------------- | ----------------------------------------------------------- |
| `overview.md`           | Penjelasan RBM, strategi ESC, grading                       |
| `asset-schema-guide.md` | Panduan membuat JSON schema baru                            |
| `integration-guide.md`  | Integrasi ke CMMS, export CSV, REST API (jika dikembangkan) |

---

## ✅ CHECKLIST IMPLEMENTASI

| Langkah                | Status | Catatan                        |
| ---------------------- | ------ | ------------------------------ |
| Struktur folder plugin | ✅     | Sudah tersusun                 |
| Zod schema untuk model | ✅     | Sudah lengkap                  |
| JSON schema template   | ⏳     | Buat per `AssetType`           |
| Form UI dinamis        | ⏳     | Gunakan generator              |
| Data mock awal         | ✅     | Bisa dikembangkan lebih lanjut |
| Validasi + Switcher    | ✅     | ENV based toggle               |
| Dokumentasi internal   | ⏳     | Akan dibuat per bab            |
| Integrasi CMMS/API     | ⏳     | Tahap akhir setelah UI stabil  |

---

✅ **Ya, benar** — roadmap implementasi yang kita susun terdiri dari **7 langkah utama**, dan semua sudah **disusun secara berurutan & logis**, dari pondasi data hingga integrasi akhir.

---

## 🔢 Rangkuman **7 Langkah Roadmap Implementasi `mx-core-rbm`**

| No. | Langkah                                      | Tujuan Utama                                                            |
| --- | -------------------------------------------- | ----------------------------------------------------------------------- |
| 1️⃣  | **Setup Struktur Folder & Modul**            | Menyiapkan arsitektur plugin agar modular, scalable, dan konsisten      |
| 2️⃣  | **Model Data: DB Schema & JSON Template**    | Mendefinisikan model `Asset`, `AssetType`, `Template`, `RBM`, dsb.      |
| 3️⃣  | **Data Mocking untuk Testing**               | Menyediakan data dummy (public/mocks) untuk preview UI & pengujian awal |
| 4️⃣  | **Form Builder Dinamis (Per AssetType)**     | Membangun UI form dinamis berdasarkan JSON Schema (Zod + Type)          |
| 5️⃣  | **Integrasi CMMS, ESC Grading & Dashboard**  | Menyambungkan data RBM ke sistem eksternal, visualisasi & WO export     |
| 6️⃣  | **Utility Tools (Validator, CLI Generator)** | Alat bantu validasi schema, generate sample data, & bantu pengembangan  |
| 7️⃣  | **Dokumentasi Developer + User Guide**       | Menyusun dokumentasi teknis, panduan penggunaan, dan standar kontribusi |

---

### 🔁 _Kenapa 7 langkah ini ideal?_

Karena:

- ✅ **Langkah 1–3** = membangun fondasi teknis & data
- ✅ **Langkah 4–5** = merealisasikan fungsi utama modul RBM
- ✅ **Langkah 6–7** = memperkuat maintainability & kolaborasi tim

---

### 📌 Contoh Eksekusi Sederhana:

Jika kamu sekarang di langkah 3 (mock), maka berikutnya logis ke:

- Langkah 4 → **membangun UI dari template JSON**
- Lalu lanjut ke 5 → **mengintegrasikan grading ESC dan CMMS planning**

---

Kalau kamu ingin, saya bisa bantu checklist implementasi per langkah, dan menyiapkan starter file untuk tiap bagian (misalnya: `control-valve.json`, `form-generator.ts`, atau `docs/asset-schema-guide.md`).

Siap lanjut ke langkah keberapa? 🛠️
