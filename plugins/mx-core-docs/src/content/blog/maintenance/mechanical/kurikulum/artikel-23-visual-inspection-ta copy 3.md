---
title: Gasket Failure Case – Salah Material atau Salah Instalasi?
authors: ['sam']
date: '2026-02-19'
tags:
  [
    'visual-inspection-static-equipment',
    'pressure-vessel-inspection',
    'corrosion-monitoring-program',
    'shutdown-maintenance-procedure',
    'api-510-awareness',
    'asme-section-viii-awareness',
    'confined-space-safety',
    'static-equipment-reliability',
    'pemeliharaan-pabrik-petrokimia',
  ]
draft: false
summary: Artikel ini membahas visual inspection internal static equipment saat shutdown sebagai bagian krusial dari preventive maintenance. Fokus diberikan pada pemeriksaan shell internal, tube sheet, gasket seating surface, dan bolt integrity untuk mendeteksi corrosion, pitting, deformasi, serta indikasi kegagalan awal. Pendekatan dilakukan secara sistematis sesuai prinsip API 510 dan ASME Section VIII, dengan penekanan pada pengendalian confined space dan prosedur keselamatan. Dibahas pula pentingnya thickness trending, dokumentasi inspeksi, serta evaluasi corrosion rate sebagai dasar reliability. Artikel ini menegaskan bahwa visual inspection bukan formalitas, melainkan sumber data integritas mekanik yang menentukan keamanan startup berikutnya.
---

# 📘 ARTIKEL 23: Gasket Failure Case – Salah Material atau Salah Instalasi?

---

- [📘 ARTIKEL 23: Gasket Failure Case – Salah Material atau Salah Instalasi?](#-artikel-23-gasket-failure-case--salah-material-atau-salah-instalasi)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective (Measurable \& Skill-Based)](#2️⃣-learning-objective-measurable--skill-based)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [7️⃣ Possible Causes (Structured Hypothesis)](#7️⃣-possible-causes-structured-hypothesis)
    - [A. Mechanical](#a-mechanical)
    - [B. Process](#b-process)
    - [C. Human Error](#c-human-error)
    - [D. System](#d-system)
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

1. **Judul:** Gasket Failure dalam 2 Minggu Operasi – Analisa Sistematis Berbasis Data
2. **Disiplin:** Mechanical
3. **Level:** Junior
4. **Kategori:** Troubleshooting
5. **Equipment / System Terkait:**

   - Spiral Wound Gasket
   - Non-Metallic Gasket
   - Raised Face Flange Joint (Class 150–600)

6. **Referensi Standar:**

   - ASME B31.3 (Process Piping Awareness)
   - Praktik torque tightening industri petrokimia

---

## 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- **LO1** – Mengidentifikasi pola kegagalan gasket berdasarkan bentuk kerusakan fisik
- **LO2** – Menganalisa kesesuaian material gasket terhadap tekanan & temperatur operasi
- **LO3** – Mengidentifikasi risiko kebocoran pada service hydrocarbon bertekanan (safety awareness)

⚠ LO3 memenuhi requirement safety/system awareness.

---

## 3️⃣ System Context & Criticality

Posisi dalam sistem:

Pump → Piping → Flange Joint → Gasket → Downstream Equipment

Peran gasket:

- Menjamin **seal integrity**
- Mencegah loss of containment
- Menjaga pressure boundary

Jika gasket gagal:

- Kehilangan produk
- Potensi fire (flammable service)
- Gas detector alarm
- Shutdown interlock

Interaksi lintas disiplin:

Leak → Gas Detector (Instrument) → Alarm → DCS Interlock (Control) → Trip Unit

👉 Menjamin Outcome #5 (System Interaction).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi wajib memahami:

1. **Cross-section flange–gasket–bolt**

   - Distribusi gaya kompresi bolt
   - Area seating stress gasket

2. **Raised Face Flange Interface**

   - Kontak gasket pada raised face
   - Zona potensial extrusion

3. **P&ID Identification**

   - Posisi flange terhadap valve isolasi
   - Titik vent & drain
   - Jalur tekanan upstream & downstream

Minimal mampu menjelaskan:

- Jalur tekanan
- Titik isolasi sebelum pekerjaan
- Arah gaya kompresi gasket

👉 Menjamin Outcome #2 (Diagram Literacy).

---

## 5️⃣ Background & Failure Scenario

Unit baru selesai shutdown.

Setelah 2 minggu operasi normal:

- Terjadi leak tiba-tiba pada flange suction line.
- Tekanan operasi: 14 bar
- Temperatur operasi: 160°C
- Service: Light hydrocarbon

Saat pembongkaran ditemukan:

- Gasket blow-out di satu sisi
- Bolt masih utuh
- Tidak ada deformasi flange signifikan

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Gasket extrusion pada satu sisi
- Permukaan gasket rusak sebagian

Terukur:

- Tekanan dalam batas design
- Temperatur sesuai datasheet

Asumsi awal operator:

- Gasket material salah spesifikasi
- Vendor quality issue

Tujuan section ini:
Melatih teknisi membedakan antara fakta dan asumsi.

---

## 7️⃣ Possible Causes (Structured Hypothesis)

### A. Mechanical

- Under-torque (compression kurang)
- Over-torque (crushing gasket)
- Flange face uneven
- Bolt elongation tidak merata

### B. Process

- Pressure spike saat startup
- Thermal expansion tidak terakomodasi

### C. Human Error

- Salah penyimpanan gasket (moisture exposure)
- Tidak mengikuti tightening sequence
- Torque wrench tidak terkalibrasi

### D. System

- Piping misalignment menyebabkan bending stress

👉 Memaksa analisa lintas disiplin.

---

## 8️⃣ Step-by-Step Investigation Flow

1. Review design pressure & temperature
2. Verifikasi material gasket vs service data
3. Review torque value & tightening sequence record
4. Periksa kondisi flange face (flatness & scratch)
5. Periksa torque wrench calibration record
6. Evaluasi histori pressure spike saat startup

Decision Point:

Jika torque tidak terdokumentasi → verifikasi ulang sebelum menyalahkan material.

---

## 9️⃣ Root Cause & Contributing Factor

**Root Cause (Teknis):**
Under-torque menyebabkan seating stress gasket tidak cukup → blow-out saat pressure surge.

**Contributing Factor (System/Human):**

- Tidak ada torque value terdokumentasi
- Torque wrench tidak memiliki calibration record
- Tidak ada re-torque setelah thermal cycle

👉 Mencegah simplifikasi “gasket jelek”.

---

## 🔟 Reference to Standard & Gap Analysis

Menurut **ASME B31.3**:

- Flange joint harus mampu menahan design pressure
- Mechanical joint harus dipasang sesuai prosedur engineering practice

Gap yang ditemukan:

- Tidak ada torque specification tertulis
- Tidak ada verification seating stress
- Tidak ada prosedur re-torque pasca startup

Best practice industri:

- Multi-step torque (30%–60%–100%)
- Star pattern tightening
- Re-check setelah thermal cycle

---

## 1️⃣1️⃣ Corrective & Preventive Action

### Immediate Action

- Isolasi & depressurize line
- Ganti gasket
- Re-tightening sesuai star pattern

### Permanent Fix

- Standarisasi torque chart per flange class
- Wajibkan torque record sheet

### System Improvement

- Kalibrasi torque wrench berkala
- SOP penyimpanan gasket (dry & flat)

### Monitoring Plan

- Leak inspection mingguan
- Verifikasi ulang torque setelah 1 thermal cycle
- Monitoring pressure spike saat startup

---

## 1️⃣2️⃣ Risk & Safety Reflection

Potensi bahaya:

- Sudden blow-out
- High pressure hydrocarbon jet
- Fire/explosion risk
- Thermal burn hazard

Permit yang wajib:

- Line isolation
- Gas test
- Hot work permit (jika grinding/repair)

Relevansi SHE:

Loss of containment = major incident precursor.

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter yang perlu dipantau:

- Pressure surge saat startup
- Temperature ramp rate
- Leak log historis pada flange yang sama

Early Warning Indicator:

- Minor sweating sebelum blow-out
- Fluktuasi tekanan abnormal saat warm-up

Trend awareness mencegah kegagalan berulang.

---

## 1️⃣4️⃣ Competency Mapping

| Skill Area                   | Level Saat Ini | Target |
| ---------------------------- | -------------- | ------ |
| Gasket failure diagnosis     | W              | I      |
| Torque calculation awareness | W              | I      |
| Flange inspection literacy   | W              | I      |
| Safety risk recognition      | W              | I      |

---

## 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa gasket bisa gagal meskipun tekanan operasi sesuai design?
2. Mengapa under-torque lebih berbahaya dibanding asumsi “material salah”?
3. Bagaimana pressure spike kecil dapat memicu blow-out?
4. Mengapa re-torque setelah thermal cycle penting?

---

## 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- Gasket failure jarang murni akibat material.
- Seating stress menentukan seal integrity.
- Torque tanpa dokumentasi = potensi failure.
- Pressure surge dapat memicu blow-out.
- Re-torque pasca thermal cycle penting.
- Piping stress mempengaruhi flange joint.
- Safety awareness wajib pada service bertekanan.

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
