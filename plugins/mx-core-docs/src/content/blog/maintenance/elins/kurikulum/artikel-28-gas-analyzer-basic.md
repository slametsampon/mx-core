---
title: Prinsip Kerja Gas Analyzer & Basic Gas Chromatograph (GC)
authors: ['sam']
date: '2026-02-18'
tags:
  [
    'transformer-basic-operation',
    'ieee-c57',
    'iec-60076',
    'transformer-protection-49-50-51',
    'oti-wti-monitoring',
    'thermal-aging-insulation',
    'power-distribution-reliability',
    'electrical-system-awareness',
    'pemeliharaan-pabrik-petrokimia',
  ]
draft: false
summary: Artikel ini menjelaskan prinsip dasar operasi transformer berbasis induksi elektromagnetik serta konsep proteksi fundamental mengacu pada IEEE C57, IEC 60076, dan IEEE C37. Dibahas hubungan antara beban, arus, temperatur (OTI/WTI), dan percepatan aging isolasi. Studi ilustratif menunjukkan operasi 95–100% kapasitas dalam jangka panjang meningkatkan temperatur dan menurunkan umur isolasi hingga memicu short circuit internal. Perbedaan fungsi proteksi arus lebih (50/51) dan proteksi thermal (49) ditegaskan untuk mencegah salah interpretasi. Artikel menekankan pentingnya trending temperatur dan loading, evaluasi kapasitas pasca ekspansi plant, serta manajemen margin sebagai fondasi reliability dan keselamatan sistem tenaga.
---

# 📘 ARTIKEL 28: Prinsip Kerja Gas Analyzer & Basic Gas Chromatograph (GC)

---

- [📘 ARTIKEL 24: Basic Transformer Operation \& Protection Concept](#-artikel-24-basic-transformer-operation--protection-concept)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective (Measurable \& Skill-Based)](#2️⃣-learning-objective-measurable--skill-based)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
    - [Posisi dalam Sistem](#posisi-dalam-sistem)
    - [Dampak Jika Gagal](#dampak-jika-gagal)
    - [Interaksi Lintas Disiplin](#interaksi-lintas-disiplin)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
    - [1. Core \& Winding Basic Diagram](#1-core--winding-basic-diagram)
    - [2. Single Line Diagram (SLD)](#2-single-line-diagram-sld)
    - [3. Posisi Proteksi](#3-posisi-proteksi)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
    - [Ilustrasi Kasus](#ilustrasi-kasus)
    - [Data Operasional](#data-operasional)
    - [Perkembangan Kejadian](#perkembangan-kejadian)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
    - [Terlihat:](#terlihat)
    - [Terukur:](#terukur)
    - [Asumsi awal:](#asumsi-awal)
    - [Tujuan Analisis](#tujuan-analisis)
  - [7️⃣ Possible Causes (Structured Hypothesis)](#7️⃣-possible-causes-structured-hypothesis)
    - [A. Electrical](#a-electrical)
    - [B. Mechanical](#b-mechanical)
    - [C. Instrument](#c-instrument)
    - [D. Human Error](#d-human-error)
  - [8️⃣ Step-by-Step Investigation Flow](#8️⃣-step-by-step-investigation-flow)
    - [Decision Point:](#decision-point)
  - [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
    - [Root Cause Teknis:](#root-cause-teknis)
    - [Contributing Factor:](#contributing-factor)
  - [🔟 Reference to Standard \& Gap Analysis](#-reference-to-standard--gap-analysis)
    - [IEEE C57:](#ieee-c57)
    - [IEC 60076:](#iec-60076)
    - [Gap:](#gap)
  - [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
    - [Immediate Action:](#immediate-action)
    - [Permanent Fix:](#permanent-fix)
    - [System Improvement:](#system-improvement)
    - [Monitoring Plan:](#monitoring-plan)
  - [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
    - [Risiko Utama:](#risiko-utama)
    - [Potensi Bahaya:](#potensi-bahaya)
    - [Permit Relevan:](#permit-relevan)
    - [Safety Awareness:](#safety-awareness)
  - [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
    - [Parameter Penting:](#parameter-penting)
    - [Trend Pencegahan:](#trend-pencegahan)
    - [Early Warning Indicator:](#early-warning-indicator)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [1️⃣5️⃣ Discussion Question (Toolbox Use)](#1️⃣5️⃣-discussion-question-toolbox-use)
  - [1️⃣6️⃣ Key Takeaway](#1️⃣6️⃣-key-takeaway)

---

## 1️⃣ Informasi Umum

1. **Judul Artikel**
   Prinsip Kerja Gas Analyzer & Basic Gas Chromatograph (GC)

2. **Disiplin**
   Instrumentation (Process Analyzer)

3. **Level**
   Junior

4. **Kategori**

   - Basic Theory
   - Reliability
   - System Interaction
   - Safety Awareness

5. **Equipment / System Terkait**

   - Online Gas Analyzer (O₂, CO₂, H₂, dll.)
   - Gas Chromatograph (GC)
   - Sampling Conditioning System
   - Carrier Gas Supply System
   - DCS / Quality Monitoring System

6. **Referensi Standar (Praktik Umum Industri)**

   - IEC (Analyzer installation & operation practice)
   - ISA Analyzer Guidelines
   - NFPA (Hazardous area & gas handling safety)

---

## 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- LO1 – Menjelaskan prinsip dasar pemisahan komponen gas pada GC.
- LO2 – Mengidentifikasi jalur aliran sample dan carrier gas pada diagram dasar GC.
- LO3 – Menjelaskan dampak ketidakstabilan flow terhadap akurasi komposisi dan keputusan operasi.

⚠ LO3 memenuhi aspek sistem & safety.

---

## 3️⃣ System Context & Criticality

**Posisi dalam sistem:**

Process Line → Sampling System → GC / Gas Analyzer → DCS → Quality Control / Advanced Control → Product Specification

**Dampak jika analyzer salah baca:**

- Produk off-spec
- Kesalahan blending
- Inefisiensi energi
- Salah keputusan operasi

**Interaksi lintas disiplin:**

- Mechanical → Sampling pressure & temperature
- Instrument → Analyzer cell & column
- Electrical → Power supply & temperature control
- Control → APC / Interlock / Quality loop

👉 Section ini menjamin Outcome #5 (System Interaction).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi wajib memahami:

### A. Basic GC Flow Path

Sample Injection → Carrier Gas → Column → Detector → Vent

Teknisi harus mampu menjelaskan:

- Peran injection valve
- Jalur carrier gas
- Fungsi column separation
- Posisi detector
- Jalur vent / exhaust

### B. Signal Output ke DCS

- Output analog/digital
- Konversi peak area menjadi komposisi
- Alarm deviation & quality monitoring

Minimum kompetensi:

- Menelusuri jalur fluida & sinyal
- Menentukan titik kritikal flow control
- Mengidentifikasi sumber error potensial

👉 Section ini menjamin Outcome #2 (Diagram Literacy).

---

## 5️⃣ Background & Failure Scenario

Kasus ilustrasi:

Unit mengalami deviasi komposisi produk ±2% dari target.
GC menunjukkan perubahan komposisi signifikan, namun parameter proses relatif stabil.

Data aktual:

- Carrier gas pressure fluktuatif
- Column temperature stabil
- Peak retention time berubah ±5%

Waktu kejadian: Setelah penggantian tabung carrier gas.

---

## 6️⃣ Symptom & Initial Finding

**Terlihat:**

- Peak bergeser pada chromatogram
- Waktu retensi tidak konsisten

**Terukur:**

- Pressure carrier gas tidak stabil
- Flow controller menunjukkan variasi ±8%

**Asumsi awal:**

- Column rusak
- Detector error

Tujuan: Melatih analisa berbasis data sebelum menyimpulkan komponen mahal rusak.

---

## 7️⃣ Possible Causes (Structured Hypothesis)

### A. Mechanical

- Leak pada jalur carrier gas
- Pressure regulator tidak stabil

### B. Instrument

- Column contamination
- Detector aging
- Injection valve malfunction

### C. Electrical

- Heater column control tidak stabil
- Power fluctuation

### D. Human Error

- Setting ulang pressure regulator tanpa verifikasi
- Tidak dilakukan leak test setelah penggantian tabung

---

## 8️⃣ Step-by-Step Investigation Flow

1. Review histori carrier gas replacement
2. Verifikasi pressure & flow stability
3. Lakukan leak test jalur carrier gas
4. Periksa regulator & flow controller
5. Bandingkan retention time dengan baseline
6. Verifikasi menggunakan standard reference gas

Decision Point:
Stabilkan carrier gas terlebih dahulu sebelum membuka column atau mengganti detector.

---

## 9️⃣ Root Cause & Contributing Factor

**Root Cause Teknis:**
Pressure regulator carrier gas tidak stabil → flow berubah → retention time bergeser → komposisi salah terbaca.

**Contributing Factor:**
Tidak ada monitoring pressure carrier gas di DCS.

---

## 🔟 Reference to Standard & Gap Analysis

**Best Practice:**

- Carrier gas harus stabil dalam tekanan & kemurnian.
- Flow rate harus terkontrol presisi.
- Column temperature harus stabil.

**Gap yang Terjadi:**

- Tidak ada alarm low/high carrier pressure.
- Tidak ada trending retention time secara rutin.
- Tidak ada prosedur leak test standar setelah cylinder replacement.

---

## 1️⃣1️⃣ Corrective & Preventive Action

### Immediate Action

- Stabilkan regulator carrier gas
- Verifikasi flow controller

### Permanent Fix

- Tambahkan pressure indicator & alarm
- Buat SOP leak test setelah cylinder change

### System Improvement

- Integrasi pressure carrier gas ke DCS
- Tambahkan trending retention time

### Monitoring Plan

- Catat retention time baseline
- Monitor pressure & flow carrier gas harian

---

## 1️⃣2️⃣ Risk & Safety Reflection

Potensi bahaya:

- Kebocoran carrier gas (H₂, He, dll.)
- Risiko kebakaran jika carrier H₂
- Kesalahan komposisi menyebabkan keputusan operasi berisiko

Permit & kontrol:

- Gas test sebelum pekerjaan
- LOTO saat maintenance
- Prosedur penggantian tabung sesuai standar keselamatan

Outcome #3 diperkuat pada section ini.

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter penting:

- Carrier gas pressure
- Carrier gas flow
- Column temperature
- Retention time
- Peak area repeatability

Trend pencegahan:

- Retention time mulai bergeser sebelum deviasi komposisi besar.
- Pressure fluktuasi kecil bisa berdampak signifikan.

Early Warning Indicator:

- Deviasi retention time >2% dari baseline.

---

## 1️⃣4️⃣ Competency Mapping

| Skill Area                      | Level Saat Ini | Target |
| ------------------------------- | -------------- | ------ |
| GC basic theory understanding   | A              | W      |
| Diagram literacy (GC flow path) | W              | I      |
| Carrier gas system awareness    | A              | W      |
| Data trend interpretation       | A              | W      |
| Safety handling gas cylinder    | A              | W      |

---

## 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa carrier gas stabil lebih kritikal daripada kalibrasi sering?
2. Apa dampak retention time shifting terhadap kualitas produk?
3. Bagaimana membedakan column problem vs carrier gas problem?
4. Parameter mana yang paling efektif untuk early detection GC instability?

---

## 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- GC memisahkan komponen berdasarkan waktu retensi.
- Carrier gas stabil adalah kunci akurasi.
- Flow & pressure kecil yang berubah dapat menyebabkan error besar.
- Jangan langsung menyalahkan column atau detector.
- Trending retention time sangat penting.
- Analyzer mempengaruhi keputusan kualitas & operasi.
- Troubleshooting harus dimulai dari sistem paling sederhana.

---

<small>
  **_Catatan Penyusunan_** Artikel ini merupakan bagian dari serial peningkatan
  kompetensi yang dirancang untuk diikuti secara berurutan guna membangun
  pemahaman sistematis dan bertahap. Meskipun demikian, setiap artikel tetap
  dapat dibaca secara terpisah sebagai referensi mandiri sesuai kebutuhan
  pembaca. Materi disusun berdasarkan berbagai sumber pustaka teknis, praktik
  lapangan industri, serta dukungan alat bantu penulisan. Pembaca disarankan
  melakukan verifikasi lanjutan dan penyesuaian teknis sesuai dengan standar
  perusahaan, kondisi aktual peralatan, serta regulasi keselamatan yang berlaku.
</small>
