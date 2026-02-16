# TEKNISI JUNIOR E&I

## 🔵 BULAN 4 – Control Valve & Pneumatic System

Referensi praktik air instrument mengacu pada ISO 8573 (air quality awareness).

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 4 – Control Valve \& Pneumatic System](#-bulan-4--control-valve--pneumatic-system)
- [📘 ARTIKEL 13](#-artikel-13)
  - [Control Valve Hunting Saat Beban Naik – Analisa Loop vs Valve Problem](#control-valve-hunting-saat-beban-naik--analisa-loop-vs-valve-problem)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [7️⃣ Possible Causes (Structured)](#7️⃣-possible-causes-structured)
  - [8️⃣ Step-by-Step Investigation](#8️⃣-step-by-step-investigation)
  - [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
  - [🔟 Reference Standard \& Gap Analysis](#-reference-standard--gap-analysis)
  - [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
  - [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
  - [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [1️⃣5️⃣ Discussion Question](#1️⃣5️⃣-discussion-question)
  - [1️⃣6️⃣ Key Takeaway](#1️⃣6️⃣-key-takeaway)
- [📘 ARTIKEL 14](#-artikel-14)
  - [Control Valve Tidak Mencapai Posisi 100% – Analisa Signal, Air Supply, dan Travel Limit](#control-valve-tidak-mencapai-posisi-100--analisa-signal-air-supply-dan-travel-limit)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-1)
  - [3️⃣ System Context](#3️⃣-system-context)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy)
  - [5️⃣ Failure Scenario](#5️⃣-failure-scenario)
  - [6️⃣ Possible Causes](#6️⃣-possible-causes)
  - [7️⃣ Investigation](#7️⃣-investigation)
  - [8️⃣ Root Cause](#8️⃣-root-cause)
  - [9️⃣ Risk](#9️⃣-risk)
  - [1️⃣3️⃣ Trend Awareness](#1️⃣3️⃣-trend-awareness)
- [📘 ARTIKEL 15](#-artikel-15)
  - [Air Quality Requirement (ISO 8573 Awareness) \& Dampaknya pada Control Valve](#air-quality-requirement-iso-8573-awareness--dampaknya-pada-control-valve)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Failure Illustration](#5️⃣-failure-illustration)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Monitoring](#7️⃣-monitoring)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 16](#-artikel-16)
  - [Positioner Calibration Basic \& Prinsip Kerja Control Valve](#positioner-calibration-basic--prinsip-kerja-control-valve)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-3)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-3)
  - [3️⃣ System Context](#3️⃣-system-context-2)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-2)
  - [5️⃣ Basic Theory](#5️⃣-basic-theory)
  - [6️⃣ Procedure Outline](#6️⃣-procedure-outline)
  - [7️⃣ Risk](#7️⃣-risk)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 13

## Control Valve Hunting Saat Beban Naik – Analisa Loop vs Valve Problem

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control
Level: Junior
Kategori: Troubleshooting
Equipment: Control Valve + Positioner + DCS PID Loop
Referensi: IEC instrument practice awareness

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi penyebab control valve hunting
- Membedakan masalah tuning PID vs masalah mekanis valve
- Membaca P&ID dan loop diagram terkait control valve

---

## 3️⃣ System Context & Criticality

Pressure/Flow Transmitter → DCS (PID) → Control Valve → Process Stability

Valve hunting menyebabkan:

- Fluktuasi proses
- Mechanical wear pada stem & actuator
- Potensi off-spec product

Interaksi lintas disiplin:
Instrument (sensor) ↔ Control (PID) ↔ Mechanical (valve body & actuator).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- P&ID untuk melihat posisi valve dalam sistem
- Loop diagram (Transmitter → AI → PID → AO → I/P → Actuator)

Teknisi harus mampu menunjukkan:

- Jalur sinyal 4–20 mA
- Jalur udara instrument
- Titik isolasi valve

---

## 5️⃣ Background & Failure Scenario

Saat plant load meningkat 20%, valve mulai membuka-menutup cepat (oscillation ±5%).
Trend menunjukkan PV berfluktuasi.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Stem bergerak cepat
- Suara actuator berubah

Terukur:

- Output PID berubah cepat
- PV mengikuti pola osilasi

Asumsi awal:

- Tuning PID salah

---

## 7️⃣ Possible Causes (Structured)

Instrument:

- Transmitter noise
- Damping terlalu rendah

Control:

- PID tuning terlalu agresif

Mechanical:

- Valve stiction
- Actuator diaphragm lemah

Pneumatic:

- Supply air pressure tidak stabil

Human:

- Manual mode sebelumnya tidak dikembalikan benar

---

## 8️⃣ Step-by-Step Investigation

1. Review trend PV, SP, OP
2. Cek kestabilan supply air
3. Cek positioner feedback
4. Lakukan stroke test manual
5. Evaluasi apakah hunting tetap terjadi di manual mode

Decision logic:
Jika hunting tetap saat manual → masalah mekanis/pneumatik.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Stiction akibat packing terlalu kencang.

Contributing:
Tidak dilakukan adjustment setelah maintenance.

---

## 🔟 Reference Standard & Gap Analysis

Best practice:
Valve stroke harus smooth tanpa stick-slip.

Gap:
Tidak dilakukan stroke test pasca pekerjaan.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Re-adjust packing

Permanent:

- Tambahkan stroke verification pada PM

Monitoring:

- Trend valve travel deviation

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko pelepasan tekanan saat membuka actuator
- Wajib isolasi udara instrument sebelum pekerjaan

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- PV vs OP trend
- Hunting saat load tinggi vs load rendah

Early warning:
Valve response mulai lambat sebelum hunting.

---

## 1️⃣4️⃣ Competency Mapping

Loop troubleshooting: W → I
Valve mechanical awareness: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Bagaimana membedakan hunting akibat PID vs stiction?
2. Apa dampak hunting terhadap actuator life?
3. Mengapa manual mode penting untuk diagnosis?

---

## 1️⃣6️⃣ Key Takeaway

- Jangan langsung ubah tuning PID
- Validasi mechanical & pneumatic terlebih dahulu
- Trend adalah alat analisa utama

---

# 📘 ARTIKEL 14

## Control Valve Tidak Mencapai Posisi 100% – Analisa Signal, Air Supply, dan Travel Limit

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab valve tidak full open
- Membaca feedback positioner
- Memahami hubungan sinyal output vs posisi stem

---

## 3️⃣ System Context

Valve tidak 100% open → Flow terbatas → Pressure naik → Potensi trip upstream.

---

## 4️⃣ Diagram Literacy

- Loop AO (4–20 mA)
- I/P converter
- Pneumatic actuator path

---

## 5️⃣ Failure Scenario

DCS menunjukkan output 100%, namun valve hanya 82%.

---

## 6️⃣ Possible Causes

Electrical:

- AO scaling error

Pneumatic:

- Air pressure rendah

Mechanical:

- Mechanical stop limit
- Bent stem

Instrument:

- Positioner mis-calibration

---

## 7️⃣ Investigation

1. Verifikasi output mA di terminal
2. Cek supply air pressure
3. Lakukan stroke test lokal
4. Periksa travel stop setting

---

## 8️⃣ Root Cause

Supply air hanya 3 bar (spec 5 bar).

---

## 9️⃣ Risk

Under-capacity flow dapat memicu high pressure trip.

---

## 1️⃣3️⃣ Trend Awareness

Bandingkan:

- Air header pressure vs waktu
- Valve position vs command

---

# 📘 ARTIKEL 15

## Air Quality Requirement (ISO 8573 Awareness) & Dampaknya pada Control Valve

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Preventive

Referensi: ISO 8573 (Instrument Air Quality Awareness)

---

## 2️⃣ Learning Objective

- Menjelaskan mengapa kualitas udara penting
- Mengidentifikasi dampak moisture & oil pada actuator

---

## 3️⃣ System Context

Compressed Air → Filter/ Dryer → Control Valve Actuator → Process Stability.

---

## 4️⃣ Diagram Literacy

- Jalur air instrument dari compressor hingga valve

---

## 5️⃣ Failure Illustration

Moisture menyebabkan diaphragm rusak & valve response lambat.

---

## 6️⃣ Risk

Water carry-over → corrosion internal.

---

## 7️⃣ Monitoring

- Dew point monitoring
- Filter differential pressure

---

## 1️⃣4️⃣ Competency Mapping

Air system awareness: A → W

---

# 📘 ARTIKEL 16

## Positioner Calibration Basic & Prinsip Kerja Control Valve

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Basic Theory & Preventive

---

## 2️⃣ Learning Objective

- Menjelaskan prinsip kerja actuator pneumatic
- Melakukan zero & span positioner basic
- Memahami fail-safe action

---

## 3️⃣ System Context

Positioner error → valve mis-position → control instability.

---

## 4️⃣ Diagram Literacy

- Signal 4–20 mA → I/P → Actuator → Stem

---

## 5️⃣ Basic Theory

- Air to open / air to close
- Fail open / fail close
- Relationship pressure vs travel

---

## 6️⃣ Procedure Outline

1. Isolasi valve
2. Set zero
3. Set span
4. Verifikasi full travel

---

## 7️⃣ Risk

- Valve bergerak tiba-tiba saat calibration
- Isolasi proses wajib dilakukan

---

## 1️⃣4️⃣ Competency Mapping

Positioner calibration: W → I
Valve principle understanding: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                    | Status |
| -------------------------- | ------ |
| Troubleshooting sistematis | ✔      |
| Membaca P&ID & loop        | ✔      |
| Safety awareness           | ✔      |
| Preventive & inspeksi      | ✔      |
| Interaksi E–I–C            | ✔      |
