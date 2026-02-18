---
title: Flange Leakage Setelah Startup – Torque Tidak Merata atau Gasket Damage?
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

# 📘 ARTIKEL 22: Flange Leakage Setelah Startup – Torque Tidak Merata atau Gasket Damage?

---

- [📘 ARTIKEL 22: Flange Leakage Setelah Startup – Torque Tidak Merata atau Gasket Damage?](#-artikel-22-flange-leakage-setelah-startup--torque-tidak-merata-atau-gasket-damage)
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

1. **Judul:** Flange Leakage Pasca Startup – Investigasi Sistematis Berbasis Data & Diagram
2. **Disiplin:** Mechanical
3. **Level:** Junior
4. **Kategori:** Troubleshooting
5. **Equipment / System Terkait:**

   - Process Piping Flange Joint (Class 150–600)
   - Spiral Wound / Non-Metallic Gasket
   - Carbon Steel Bolt & Nut

6. **Referensi Standar:**

   - ASME B31.3 (Process Piping Awareness)
   - Praktik bolt tightening industri petrokimia

---

## 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- **LO1** – Mengidentifikasi penyebab kebocoran flange pasca startup berbasis parameter aktual
- **LO2** – Membaca P&ID untuk menentukan jalur tekanan, titik isolasi, dan potensi stress point
- **LO3** – Mengidentifikasi risiko keselamatan akibat pressurized hydrocarbon leak

⚠ LO3 memenuhi requirement safety/system awareness.

---

## 3️⃣ System Context & Criticality

Struktur sistem:

Pump → Discharge Line → Flange Joint → Downstream Control Valve → Process Equipment

Peran flange joint:

- Pressure boundary containment
- Seal integrity terhadap hydrocarbon service

Jika flange leak:

- Kehilangan produk
- Fire & explosion hazard (flammable vapor)
- Pressure drop mempengaruhi downstream control
- Potensi automatic trip melalui gas detector

Interaksi lintas disiplin:

Leak → Gas Detector (Instrument) → Alarm → DCS Interlock (Control) → Unit Shutdown

👉 Menjamin Outcome #5 (System Interaction).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi harus mampu:

1. Membaca **P&ID jalur proses**

   - Identifikasi upstream & downstream isolation valve
   - Identifikasi vent & drain point
   - Identifikasi posisi flange relatif terhadap pump

2. Memahami **Cross-section Flange Joint**

   - Gaya tarik bolt → seating stress gasket
   - Raised face contact area

3. Menunjukkan:

   - Titik isolasi sebelum pembongkaran
   - Arah aliran fluida
   - Titik potensial piping stress

👉 Section ini menjamin Outcome #2 (Diagram Literacy).

---

## 5️⃣ Background & Failure Scenario

Kondisi:

- Unit selesai turnaround
- Tidak ada leak saat hydrotest (water test, ambient temperature)

Setelah startup normal operation:

- Terlihat drip pada flange discharge pump
- Tekanan operasi: 12 bar
- Temperatur operasi: 120°C
- Service: Light hydrocarbon

Leak muncul ± 6 jam setelah temperatur mencapai steady state.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Kebocoran kecil pada satu sisi flange
- Drip meningkat saat temperatur naik

Terukur:

- Tekanan stabil
- Temperatur sesuai design
- Tidak ada vibration abnormal

Asumsi awal operator:

- Gasket defect dari vendor

Tujuan section ini:
Memisahkan fakta teknis dari asumsi.

---

## 7️⃣ Possible Causes (Structured Hypothesis)

### A. Mechanical

- Torque tidak merata
- Bolt elongation tidak seragam
- Gasket tidak center
- Flange face uneven

### B. Process

- Thermal expansion saat startup
- Pressure spike singkat

### C. Human Error

- Tidak mengikuti star pattern
- Tidak melakukan multi-step torque
- Tidak ada re-torque pasca thermal cycle

### D. System

- Piping misalignment menyebabkan bending stress
- Tidak ada prosedur torque documentation

---

## 8️⃣ Step-by-Step Investigation Flow

1. Verifikasi service pressure & temperature vs design data
2. Review histori tightening record
3. Verifikasi torque wrench calibration record
4. Periksa alignment & piping stress
5. Inspeksi gasket seating pattern (bekas kompresi)
6. Evaluasi apakah dilakukan re-torque setelah thermal cycle

Decision Point:

Jika tidak ada torque record → investigasi prosedur tightening sebelum mengganti gasket.

---

## 9️⃣ Root Cause & Contributing Factor

**Root Cause (Teknis):**
Bolt tightening tidak mengikuti star pattern & multi-step torque → uneven gasket compression saat thermal expansion.

**Contributing Factor (System/Human):**

- Tidak ada torque value record
- Tidak ada prosedur re-torque pasca startup
- Kurangnya pemahaman seating stress

👉 Mencegah simplifikasi “gasket rusak”.

---

## 🔟 Reference to Standard & Gap Analysis

Menurut prinsip yang selaras dengan **ASME B31.3**:

- Flange joint harus mampu menahan design pressure & temperature
- Mechanical joint harus dirakit sesuai engineering practice

Gap ditemukan:

- Tidak ada torque specification tertulis
- Tidak ada bolt tension verification
- Tidak ada dokumentasi tightening sequence
- Tidak ada post-startup inspection checklist

Best Practice Industri:

- Star pattern tightening
- Multi-step torque (30%–60%–100%)
- Re-torque setelah thermal stabilization

---

## 1️⃣1️⃣ Corrective & Preventive Action

### Immediate Action

- Isolasi & depressurize line
- Re-tighten sesuai star pattern & multi-step torque

### Permanent Fix

- Standardisasi torque chart per flange class
- Wajib torque record sheet

### System Improvement

- Pelatihan tightening sequence
- Posting torque sequence diagram di workshop
- Integrasi checklist torque dalam turnaround package

### Monitoring Plan

- Re-check torque setelah 1 thermal cycle
- Leak inspection harian selama 1 minggu pertama startup
- Monitoring pressure surge saat warm-up

---

## 1️⃣2️⃣ Risk & Safety Reflection

Potensi bahaya:

- High pressure hydrocarbon leak
- Fire/explosion risk
- Jet release hazard
- Thermal burn

Persyaratan keselamatan:

- Line harus depressurized sebelum rework
- Gas test sebelum pekerjaan
- Gunakan torque wrench sesuai rating
- PPE sesuai service class

Relevansi SHE:

Flange leak = Loss of Containment precursor.

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter penting:

- Pressure fluctuation saat startup
- Temperature ramp rate
- Leak trend historis pada flange yang sama

Early Warning Indicator:

- Minor sweating sebelum drip
- Leak muncul setelah temperatur steady state

Trend awareness mencegah kegagalan berulang.

---

## 1️⃣4️⃣ Competency Mapping

| Skill Area                | Level Saat Ini | Target |
| ------------------------- | -------------- | ------ |
| Flange troubleshooting    | W              | I      |
| Torque sequence awareness | W              | I      |
| Diagram reading (P&ID)    | W              | I      |
| Safety risk recognition   | W              | I      |

---

## 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa leak sering muncul saat startup, bukan saat hydrotest?
2. Mengapa thermal expansion dapat memperparah uneven compression?
3. Apa risiko jika piping stress tidak diverifikasi sebelum re-tightening?
4. Mengapa torque documentation meningkatkan reliability?

---

## 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- Flange leak pasca startup sering terkait prosedur tightening.
- Hydrotest tidak merepresentasikan kondisi temperatur operasi.
- Thermal expansion mempengaruhi gasket seating stress.
- Star pattern & multi-step torque adalah wajib.
- Dokumentasi torque meningkatkan traceability.
- Piping stress dapat menyebabkan leak berulang.
- Safety awareness harus melekat pada setiap pekerjaan flange.

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
