# ✅ **LLD Import File XLSX**

Untuk Sistem **MX-CORE-RBM**

Dokumen ini mendefinisikan struktur **standar, sistematis, dan scalable** untuk mengelola proses **import file XLSX** ke dalam sistem berbasis schema JSON. LLD ini terdiri dari **4 fase utama** dan **11 langkah terstruktur**.

---

## 🧱 **📌 TUJUAN**

- Menjamin konsistensi struktur data hasil import
- Menyaring dan memverifikasi data mentah dari Excel
- Menghubungkan file XLSX dengan `asset-type.json` dan schema JSON
- Menghindari kesalahan format dan validasi sejak awal

---

# 🧭 **PHASE 1 – INPUT & PREPROCESSING**

---

### ✅ **Step 1 – File Validation**

- Validasi ekstensi file (`.xlsx`, `.csv`)
- Validasi ukuran file, integritas, dan struktur dasar (worksheet tersedia)
- Tampilkan pesan error jika file rusak atau kosong

---

### ✅ **Step 2 – Load & Parse File**

- Gunakan library parser (misalnya: `xlsx`, `exceljs`)
- Ekstrak semua worksheet dan baris data
- Simpan hasil dalam bentuk:

  ```ts
  Record<string, any[]>; // { "25-1": [...rows] }
  ```

---

### ✅ Step 3 – Worksheet Identification

> 🔧 Konteks:

> Step ini menjadi **landasan metadata** untuk setiap asset-type yang akan diproses dari file Excel:
> _Siapa dia? Nama worksheet-nya apa? Apa kategorinya? Pakai schema apa?_

---

> 🧩 **3.1 Baca Worksheet `Menu`**

- Worksheet `Menu` diharapkan berisi:

  | No  | WS  | NL             |
  | --- | --- | -------------- |
  | 1   | 2   | CONTROL VALVE  |
  | 2   | 3   | PRESSURE GAUGE |

- Dibaca sebagai list data awal

---

> 🧩 **3.2 Tampilkan Tabel Interaktif untuk Verifikasi**

> Tabel ini muncul secara interaktif setelah file di-parse

| No  | WS  | NL (Label)     | Suggested Schema Name        | Asset Category                 | Action      |
| --- | --- | -------------- | ---------------------------- | ------------------------------ | ----------- |
| 1   | 2   | CONTROL VALVE  | `control-valve` _(editable)_ | `Instrumentation` _(dropdown)_ | [⚙️ Config] |
| 2   | 3   | PRESSURE GAUGE | `pressure-gauge`             | `Instrumentation`              | [⚙️ Config] |

🔹 Keterangan:

- **Suggested Schema Name (editable)**:

  - Diisi otomatis dari slugified `NL`
  - Bisa diubah oleh user
  - Akan menjadi `asset_type_id` dan nama file JSON schema

- **Asset Category (dropdown)**:

  - Dibaca dari:

    ```
    public/mocks/asset-category.json
    ```

  - User memilih satu kategori dari opsi yang tersedia
  - Misal:

    ```json
    [
      { "category_id": "instrumentation", "label": "Instrumentation" },
      { "category_id": "electrical", "label": "Electrical" },
      ...
    ]
    ```

---

> 🧩 **3.3 Konfigurasi Schema per Baris**

- Button **[Config]** → membawa user ke halaman konfigurasi header (Phase 2)
- Halaman tersebut akan menampilkan:

  - Nama schema
  - Worksheet yang dibaca
  - Seluruh header kolom (baris pertama)
  - → Lanjut ke Step 4: interpretasi fields

---

> 🧩 **3.4 Simpan Metadata ke `asset-type.json`**

- Setelah user verifikasi semua baris (schema name + category):

  - Klik tombol **[Simpan Semua]**
  - Sistem akan menulis file ke:

    ```
    public/mocks/asset-type.json
    ```

- Format output:

  ```json
  [
    {
      "worksheet": "2",
      "label": "CONTROL VALVE",
      "asset_type_id": "control-valve",
      "category_id": "instrumentation"
    },
    {
      "worksheet": "3",
      "label": "PRESSURE GAUGE",
      "asset_type_id": "pressure-gauge",
      "category_id": "instrumentation"
    }
  ]
  ```

---

> ✅ Validasi Unik

- Validasi agar:

  - `asset_type_id` tidak duplikat
  - `worksheet` tidak kosong
  - `category_id` wajib dipilih

> ✅ Auto-suggest Category

- Jika memungkinkan, bisa gunakan _keyword detection_ dari label (`NL`) untuk mengisi `category_id` awal

Misalnya:

- NL: `"CONTROL VALVE"` → suggest: `Instrumentation`
- NL: `"MOTOR"` → suggest: `Electrical`

Ini tidak wajib, tapi meningkatkan UX.

---

> 🔁 Posisi Step Ini dalam Framework Import XLSX

```
PHASE 1 – INPUT & PREPROCESSING
├── Step 1: File Validation
├── Step 2: Load & Parse File
└── Step 3: Worksheet Identification
    ├── Baca worksheet "Menu"
    ├── Tampilkan tabel interaktif:
    │     - WS, NL, schema name (editable), category (dropdown), action
    ├── Validasi input user (unique, required)
    ├── Simpan ke asset-type.json setelah user klik "Simpan"
    └── [Config] membuka halaman Phase 2 (interpretasi kolom)
```

---

> 📁 Struktur File yang Terlibat

| Path                                              | Fungsi                                      |
| ------------------------------------------------- | ------------------------------------------- |
| `public/mocks/asset-category.json`                | Sumber opsi dropdown category               |
| `public/mocks/asset-type.json`                    | Output hasil mapping WS → schema + kategori |
| `public/schemas/asset-types/[asset_type_id].json` | File schema untuk masing-masing asset-type  |
| `Menu` worksheet                                  | Input data awal user                        |

---

> ✅ Kesimpulan

Kamu telah menyempurnakan **Step 3 menjadi titik kontrol metadata** yang sangat strategis, dengan fitur:

| Fitur                     | Manfaat                                         |
| ------------------------- | ----------------------------------------------- |
| Editable schema name      | Menjamin fleksibilitas dan penamaan standar     |
| Dropdown kategori         | Kategorisasi terstruktur dan konsisten          |
| Mapping manual + validasi | Menjamin integritas sebelum ke parsing          |
| Simpan ke asset-type.json | Menjadi _source of truth_ untuk proses lanjutan |

---

# 🧭 **PHASE 2 – STRUCTURE INTERPRETATION**

---

### ✅ **Step 4 – Interpretasi Kolom XLSX → Calon Schema**

- Ambil baris header dari worksheet
- Untuk setiap kolom:

  - Tentukan `label` (tampilan), `name` (camelCase), `type`, `required`, `unit`, dan `options` (jika enum)
  - Catat justifikasi (mengapa kolom ini penting? wajib? enum?)

- Dokumentasikan dalam tabulasi atau sheet internal

---

### ✅ **Step 5 – Simpan Hasil Step 4 ke Schema JSON**

- Simpan struktur `fields[]` ke file:

  ```
  public/schemas/asset-types/[asset_type_id].json
  ```

- Contoh:

  ```json
  {
    "asset_type_id": "control-valve",
    "fields": [
      {
        "name": "tagNumber",
        "label": "TAG NO.",
        "type": "string",
        "required": true
      },
      {
        "name": "flowMax",
        "label": "FLOW MAX.",
        "type": "number",
        "required": false,
        "unit": "Nm³/h"
      }
    ]
  }
  ```

- Inilah schema **resmi** yang akan digunakan seluruh proses setelahnya

---

# 🧭 **PHASE 3 – VALIDATION & TRANSFORMATION**

---

### ✅ **Step 6 – Header Matching**

- Cek apakah semua kolom di Excel dapat dimapping ke `fields[]`
- Pastikan:

  - Semua kolom `required: true` tersedia
  - Tidak ada kolom tidak dikenal (jika strict)

- Gunakan `label`, `header`, atau `aliases[]` untuk fleksibilitas

---

### ✅ **Step 7 – Data Normalization**

- Bersihkan nilai cell:

  - Ganti `0,03` → `0.03`, `-` → `null`, trim whitespace

- Terapkan transformasi berdasarkan `type` dan `unit`
- Hasil: data siap divalidasi

---

### ✅ **Step 8 – Row-Level Validation**

- Bangun schema runtime dari `fields[]` (misal: Zod)
- Validasi tiap baris:

  - Cek tipe, enum, kolom kosong

- Tandai baris valid dan error
- Buat ringkasan error

---

### ✅ **Step 9 – Preview & Summary**

- Tampilkan:

  - Jumlah baris valid / error
  - Preview data valid
  - Baris error + alasan

- Opsi user:

  - Simpan hanya baris valid
  - Perbaiki error dan reupload
  - Export error sebagai file terpisah

---

# 🧭 **PHASE 4 – CONFIRMATION & STORAGE**

---

### ✅ **Step 10 – User Confirmation & Save**

- Setelah user klik **Simpan**:

  - Data valid disimpan ke DB / API
  - Catat:

    - `asset_type_id`
    - Jumlah baris sukses
    - User pengunggah
    - Tanggal dan nama file

---

### ✅ **Step 11 – Logging, Notifikasi, Audit Trail**

- Tampilkan notifikasi sukses atau error
- Simpan log aktivitas:

  - Waktu
  - User
  - Jumlah data sukses / gagal
  - Worksheet dan jenis data

- Digunakan untuk audit & analitik

---

# 📂 Struktur Referensi Pendukung

### 🔸 `asset-type.json`

- Mapping antara worksheet → asset_type_id
- Contoh:
  `"25-1"` → `"control-valve"`

### 🔸 Schema JSON per Aset

- Disimpan di:
  `public/schemas/asset-types/[asset_type_id].json`
- Berisi: `fields[]`, `ppc_strategy`, `spare_parts`

---

# 🧩 Ekstensi Opsional (Recommended)

| Tambahan                                      | Fungsi                                   |
| --------------------------------------------- | ---------------------------------------- |
| `Step 12 – Export Template XLSX`              | Membantu user mengisi data sesuai schema |
| `Step 13 – Async Import Queue`                | Untuk file besar (1000+ baris)           |
| `Step 14 – Auto Column Mapping (AI or Rules)` | Memetakan kolom bebas ke schema known    |

---

## ✅ Format Resmi: `LLD Import File XLSX`

LLD ini sekarang bisa dijadikan:

- 📄 Dokumen internal / project Wiki
- 🧭 Panduan kerja teknis tim developer + data engineer
- 📚 Basis pelatihan user entry
- 📦 Acuan membangun modul import berbasis schema JSON

---
