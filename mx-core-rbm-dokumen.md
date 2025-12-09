# MxCore RBM Plugin – Overview

## 📌 Tujuan Plugin

Modul `mxcore-rbm` adalah plugin berbasis monorepo yang mengimplementasikan pendekatan Risk-Based Maintenance (RBM) untuk fasilitas industri petrokimia dan proses kontinu, seperti yang diterapkan di PT. Petro Oxo Nusantara (PT PON).

## 🧠 Latar Belakang

Dalam industri proses dengan risiko tinggi, pendekatan pemeliharaan berbasis waktu (Time-Based Maintenance/TBM) tidak selalu efisien atau efektif. Setiap kegagalan kecil dapat menimbulkan shutdown besar, kerugian finansial, gangguan rantai pasok, hingga potensi kecelakaan.

RBM menawarkan pendekatan strategis berbasis **konsekuensi kegagalan** (CoF), bukan probabilitas (PoF), dengan klasifikasi asset berdasarkan **dampaknya terhadap Lingkungan, Keselamatan, dan Keberlangsungan Produksi (ESC)**.

## 🔍 Konsep Kunci

- Menggunakan metode **ESC grading** untuk menentukan criticality aset
- Tidak menggunakan **PoF** (Probabilitas Kegagalan)
- Aset diklasifikasikan sebagai **Kritis** atau **Normal**
- Strategi pemeliharaan PPC: **Preventive, Predictive, Corrective**
- TBM digunakan sebagai kerangka dasar dengan penyesuaian berdasarkan risiko
- Evaluasi berkala berdasarkan **tier operasional** aset

## ⚙️ Fitur Plugin

- ESC Grading System
- Asset Criticality Classification (KDIA)
- TBM Schedule Engine (berbasis tier evaluasi)
- Evaluasi berkala (real-time, bulanan, 6 bulanan)
- Export data ke CMMS (manual/otomatis)
- Dashboard risiko dan histori performa

## 📌 Use-case: PT PON

- Semua peralatan dianggap **high-risk secara default**
- ESC digunakan sebagai satu-satunya parameter penilaian
- Pendekatan disebut **"consequence-driven RBM"**

---

# Panduan Grading ESC (Environmental, Safety, Continuous Running)

## 🎯 Tujuan

Dokumen ini menjelaskan cara melakukan penilaian risiko berbasis **ESC** untuk setiap aset.

ESC adalah singkatan dari:

- **E – Environmental**: Potensi dampak terhadap lingkungan
- **S – Safety**: Risiko terhadap keselamatan manusia
- **C – Continuous Running**: Risiko terhadap kelangsungan produksi

## 📋 Skala Penilaian

Setiap kategori dinilai dengan skala:

- `High` – Dampak signifikan (shutdown, kecelakaan, pencemaran)
- `Medium` – Dampak menengah (penurunan performa, potensi gangguan)
- `Low` – Dampak minimal (tidak mempengaruhi operasi utama)

## 📌 Contoh Penilaian Aset

| Asset                | E      | S    | C      |
| -------------------- | ------ | ---- | ------ |
| Hydrogen Compressor  | High   | High | High   |
| Cooling Water Pump   | Medium | Low  | Medium |
| Instrument Air Dryer | Low    | Low  | Medium |

## 🛑 Aturan Criticality

Jika **salah satu nilai ESC = High**, maka aset otomatis diklasifikasikan sebagai **Kritis**.

### Rule:

```ts
if (E === 'High' || S === 'High' || C === 'High') {
  return 'Kritis';
} else {
  return 'Normal';
}
```

## 🧾 Output

- Aset dengan status `Kritis` → masuk ke daftar prioritas pemeliharaan
- Aset dengan status `Normal` → tetap dimonitor, tapi dengan intensitas lebih ringan

---

# Strategi Time-Based Maintenance (TBM) Adaptif

## 📌 Pendekatan PT PON

PT PON menggunakan strategi **PPC Maintenance**:

- **P**redictive
- **P**reventive
- **C**orrective

Strategi ini tidak lagi berbasis waktu tetap, melainkan **hybrid berdasarkan tier operasional dan hasil evaluasi kondisi**.

## 🧱 Tiering Evaluasi Aset

| Tier   | Jenis Aset                       | Evaluasi    |
| ------ | -------------------------------- | ----------- |
| Tier 1 | Reformer, Hydrogen Compressor    | Harian      |
| Tier 2 | Cooling System, PSA, Boiler      | Bulanan     |
| Tier 3 | Non-kritis (valve, line support) | Per 6 bulan |

## 🛠️ Mapping Strategi Pemeliharaan

| Criticality | Tier   | Strategi                |
| ----------- | ------ | ----------------------- |
| Kritis      | Tier 1 | Predictive + Preventive |
| Kritis      | Tier 2 | Preventive              |
| Normal      | Tier 3 | Basic TBM               |

## ⚙️ Scheduler Engine

Engine akan menghasilkan:

- **Interval** (frekuensi pelaksanaan)
- **Tipe pemeliharaan** (P, P, atau C)
- **Aset prioritas tinggi** → jadwal lebih padat

---

# Panduan Integrasi Plugin RBM

## 🎯 Tujuan

Plugin `mxcore-rbm` dirancang untuk diintegrasikan dengan:

- Sistem CMMS internal (SAP PM, Maximo, custom)
- Modul `mxcore-dashboard`
- Sistem evaluasi dan pelaporan eksternal

## 📤 Export Format

### CSV (Untuk CMMS)

| assetId | tagNumber | status | ESC   | nextMaintenance |
| ------- | --------- | ------ | ----- | --------------- |
| A001    | HC-01     | Kritis | H-H-H | 2025-12-12      |

### JSON (Untuk API Integrasi)

```json
{
  "assetId": "A001",
  "tagNumber": "HC-01",
  "status": "Kritis",
  "ESC": {
    "environment": "High",
    "safety": "High",
    "continuousRunning": "High"
  },
  "nextMaintenance": "2025-12-12"
}
```

## 🧩 Integrasi ke Dashboard

- Grading ESC → Ditampilkan sebagai **risk color box**
- Tier Evaluasi → Disajikan dalam bentuk **timeline pemeliharaan**
- Histori Evaluasi → Diakses oleh user teknik & auditor

## 🛠️ Rekomendasi Teknologi

- Export module: `@mxcore-rbm/services/exporter.ts`
- API endpoint (opsional): `/api/rbm/export`
- Frontend integrasi: `@mxcore-dashboard/components/ESCMatrix.tsx`

---

## ✅ Langkah Selanjutnya

Apakah kamu ingin saya:

1. **Kirim semua dokumentasi ini dalam format file (`.md`)** siap ditaruh di `/docs`, atau
2. Kita lanjut dulu membuat **mock data + `models/*.ts` file**, atau
3. Kita generate **scaffold plugin `mxcore-rbm`** di repo (struktur folder + file kosong), atau
4. Buat satu per satu isi dokumentasi tadi langsung di repo kamu (jika pakai GitHub/VS Code)
