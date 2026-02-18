---
title: Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell
authors: ['sam']
date: '2026-02-19'
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

# 📘 ARTIKEL 25: Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell

---

- [📘 ARTIKEL 25: Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell](#-artikel-25-gas-analyzer-reading-drifting--investigasi-dari-sampling-line-hingga-analyzer-cell)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective (Measurable \& Skill-Based)](#2️⃣-learning-objective-measurable--skill-based)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
    - [A. Simplified Sampling System Diagram](#a-simplified-sampling-system-diagram)
    - [B. Loop Signal Analyzer ke DCS](#b-loop-signal-analyzer-ke-dcs)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [7️⃣ Possible Causes (Structured Hypothesis)](#7️⃣-possible-causes-structured-hypothesis)
    - [A. Mechanical](#a-mechanical)
    - [B. Instrument](#b-instrument)
    - [C. Electrical](#c-electrical)
    - [D. Human Error](#d-human-error)
  - [8️⃣ Step-by-Step Investigation Flow](#8️⃣-step-by-step-investigation-flow)
  - [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
  - [🔟 Reference to Standard \& Gap Analysis](#-reference-to-standard--gap-analysis)
  - [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
    - [Immediate Action](#immediate-action)
    - [Permanent Fix](#permanent-fix)
    - [System Improvement](#system-improvement)
    - [Monitoring Plan](#monitoring-plan)
  - [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
  - [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [1️⃣5️⃣ Discussion Question (Toolbox Use)](#1️⃣5️⃣-discussion-question-toolbox-use)
  - [1️⃣6️⃣ Key Takeaway (Max 7 Bullet)](#1️⃣6️⃣-key-takeaway-max-7-bullet)

---

## 1️⃣ Informasi Umum

1. **Judul Artikel**
   Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell

2. **Disiplin**
   Instrumentation (Process Analyzer)

3. **Level**
   Junior

4. **Kategori**

   - Troubleshooting
   - Reliability
   - System Interaction
   - Safety Awareness

5. **Equipment / System Terkait**

   - Online O₂ / CO₂ Gas Analyzer
   - Sampling Conditioning System
   - Sample Filter & Moisture Trap
   - Flowmeter Sampling
   - DCS & Alarm System

6. **Referensi Standar (Praktik Umum Industri)**

   - IEC (Analyzer installation & operation practice)
   - ISA Analyzer Guidelines
   - NFPA (Hazardous area safety & gas handling)

---

## 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- LO1 – Mengidentifikasi minimal 5 penyebab drift pada gas analyzer secara sistematis.
- LO2 – Membaca dan menelusuri jalur sampling pada diagram dasar analyzer.
- LO3 – Membedakan drift akibat analyzer internal vs akibat sampling system serta menjelaskan dampaknya terhadap keputusan operasi.

⚠ LO3 memenuhi aspek sistem & safety.

---

## 3️⃣ System Context & Criticality

**Posisi dalam sistem:**

Process Line → Sample Tap → Conditioning System → Analyzer → DCS → Alarm / Control Decision

**Dampak drifting:**

- Quality deviation
- False composition reading
- Salah pengaturan kontrol
- Potensi produk off-spec

**Interaksi lintas disiplin:**

- Mechanical → Sampling line & filter
- Instrument → Analyzer sensor & calibration
- Electrical → Power supply & signal integrity
- Control → Alarm & decision logic

👉 Section ini menjamin Outcome #5 (System Interaction).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

### A. Simplified Sampling System Diagram

Probe → Filter → Regulator → Flowmeter → Analyzer Cell → Vent

Teknisi harus mampu menunjukkan:

- Titik pressure regulation
- Titik filtration
- Titik potensi kondensasi
- Jalur vent
- Titik isolasi valve

### B. Loop Signal Analyzer ke DCS

- Output 4–20 mA / Digital
- Power supply analyzer
- Alarm threshold

Minimum kompetensi:

- Menelusuri jalur fluida dan sinyal
- Menentukan titik kritikal penyebab drift

👉 Section ini menjamin Outcome #2 (Diagram Literacy).

---

## 5️⃣ Background & Failure Scenario

Kronologi:

- Hari ke-1: Analyzer O₂ menunjukkan 2.0%
- Hari ke-2: Naik menjadi 2.7%
- Hari ke-3: Stabil di 3.1%

Proses aktual:

- Tidak ada perubahan beban
- Tidak ada perubahan komposisi feed

Data aktual:

- Sample flow fluktuatif ±12%
- Differential pressure filter meningkat
- Tidak ada alarm analyzer internal

Waktu kejadian: Perubahan gradual selama 72 jam.

---

## 6️⃣ Symptom & Initial Finding

**Terlihat:**

- Trend naik gradual tanpa spike

**Terukur:**

- Sample flow tidak stabil
- DP filter meningkat
- Tidak ada error internal analyzer

**Asumsi awal operator:**

- Analyzer cell aging
- Perlu penggantian sensor

Tujuan: Melatih pemisahan fakta vs asumsi.

---

## 7️⃣ Possible Causes (Structured Hypothesis)

### A. Mechanical

- Sampling line partially blocked
- Filter tersumbat
- Leakage kecil pada fitting
- Kondensasi pada line

### B. Instrument

- Analyzer sensor aging
- Calibration drift
- Optical cell contamination

### C. Electrical

- Signal noise
- Grounding issue
- Power supply fluctuation

### D. Human Error

- Tidak dilakukan zero/span check periodik
- Tidak ada trending DP filter

---

## 8️⃣ Step-by-Step Investigation Flow

1. Verifikasi kondisi proses aktual (bandingkan dengan parameter upstream)
2. Review trend sample flow & DP filter
3. Periksa kondisi filter & moisture trap
4. Stabilkan flow sampling
5. Lakukan zero check & span check
6. Bandingkan reading dengan portable analyzer

Decision Logic:

Jika sampling tidak stabil → perbaiki sampling terlebih dahulu sebelum menyimpulkan analyzer internal rusak.

---

## 9️⃣ Root Cause & Contributing Factor

**Root Cause Teknis:**
Filter sampling tersumbat → pressure drop → flow tidak stabil → sample tidak representatif → reading bias.

**Contributing Factor:**
Tidak ada monitoring differential pressure filter & tidak ada preventive interval yang jelas.

---

## 🔟 Reference to Standard & Gap Analysis

**Best Practice:**

- Sampling harus representatif & stabil sebelum analisa.
- Flow dan pressure harus terkontrol.
- Analyzer harus divalidasi dengan zero/span check berkala.

**Gap yang Terjadi:**

- Tidak ada monitoring DP filter.
- Tidak ada alarm low sample flow.
- Tidak ada baseline trend retention analyzer.

---

## 1️⃣1️⃣ Corrective & Preventive Action

### Immediate Action

- Ganti filter
- Stabilkan flow sampling
- Verifikasi ulang reading

### Permanent Fix

- Tambahkan DP indicator & alarm
- Buat jadwal penggantian filter berbasis data

### System Improvement

- Integrasi flow & DP filter ke DCS
- Tambahkan dashboard analyzer health

### Monitoring Plan

- Trend analyzer vs portable reference
- Trend flow sampling
- Trend DP filter

---

## 1️⃣2️⃣ Risk & Safety Reflection

Potensi bahaya:

- Gas beracun / mudah terbakar saat membuka sampling line
- Risiko tekanan tersisa dalam line
- Potensi ignition di area classified

Tindakan wajib:

- Isolasi & depressurize sebelum membuka line
- Gas test sebelum pekerjaan
- Gunakan PPE & permit kerja sesuai prosedur

Outcome #3 (Safety Awareness) diperkuat di sini.

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter yang harus dipantau:

- Sample flow
- Differential pressure filter
- Analyzer reading stability
- Zero/span deviation

Trend pencegahan:

- Flow mulai tidak stabil sebelum drift terlihat.
- DP filter naik sebelum bias reading signifikan.

Early Warning Indicator:

- Deviasi flow >10% dari baseline.
- DP filter meningkat >20% dari normal.

---

## 1️⃣4️⃣ Competency Mapping

| Skill Area                       | Level Saat Ini | Target |
| -------------------------------- | -------------- | ------ |
| Analyzer troubleshooting         | W              | I      |
| Sampling system awareness        | A              | W      |
| Diagram literacy (sampling path) | W              | I      |
| Data trend interpretation        | A              | W      |
| Safety isolation awareness       | A              | W      |

---

## 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa sampling lebih sering menjadi sumber masalah dibanding analyzer cell?
2. Apa dampak drift kecil namun gradual terhadap kualitas produk?
3. Mengapa zero check wajib dilakukan sebelum mengganti sensor?
4. Parameter apa yang paling efektif sebagai early warning sampling issue?

---

## 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- 70% masalah analyzer berasal dari sampling system.
- Drift gradual lebih berbahaya daripada alarm instan.
- Validasi sampling sebelum menyalahkan analyzer.
- Differential pressure filter adalah indikator penting.
- Flow stabil = sample representatif.
- Trending lebih efektif daripada inspeksi sesaat.
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
