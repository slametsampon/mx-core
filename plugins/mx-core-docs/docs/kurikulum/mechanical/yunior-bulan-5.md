# 🔵 BULAN 5 – Reciprocating Compressor Basic

(Level 1 – Junior Mechanical)

Referensi utama:
American Petroleum Institute – API 618 (Reciprocating Compressor Awareness)

---

- [🔵 BULAN 5 – Reciprocating Compressor Basic](#-bulan-5--reciprocating-compressor-basic)
- [📘 ARTIKEL 1](#-artikel-1)
  - [Compressor Discharge Temperature Tinggi – Masalah Valve, Clearance, atau Cooling?](#compressor-discharge-temperature-tinggi--masalah-valve-clearance-atau-cooling)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective (Measurable \& Skill-Based)](#2️⃣-learning-objective-measurable--skill-based)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [7️⃣ Possible Causes (Structured Hypothesis)](#7️⃣-possible-causes-structured-hypothesis)
  - [8️⃣ Step-by-Step Investigation Flow](#8️⃣-step-by-step-investigation-flow)
  - [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
  - [🔟 Reference to Standard \& Gap Analysis](#-reference-to-standard--gap-analysis)
  - [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
  - [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
  - [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [1️⃣5️⃣ Discussion Question (Toolbox Use)](#1️⃣5️⃣-discussion-question-toolbox-use)
  - [1️⃣6️⃣ Key Takeaway (Max 7 Bullet)](#1️⃣6️⃣-key-takeaway-max-7-bullet)
- [📘 ARTIKEL 2](#-artikel-2)
  - [Valve Failure Symptoms – Bagaimana Mendeteksi Sebelum Rusak Total?](#valve-failure-symptoms--bagaimana-mendeteksi-sebelum-rusak-total)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective)
  - [3️⃣ System Context](#3️⃣-system-context)
  - [4️⃣ Diagram Literacy Section](#4️⃣-diagram-literacy-section)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario-1)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding-1)
  - [7️⃣ Possible Causes](#7️⃣-possible-causes)
  - [8️⃣ Investigation Flow](#8️⃣-investigation-flow)
  - [9️⃣ Root Cause](#9️⃣-root-cause)
  - [🔟 Gap Analysis](#-gap-analysis)
  - [1️⃣1️⃣ Corrective Action](#1️⃣1️⃣-corrective-action)
  - [1️⃣2️⃣ Risk Reflection](#1️⃣2️⃣-risk-reflection)
  - [1️⃣3️⃣ Data Awareness](#1️⃣3️⃣-data-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 3](#-artikel-3)
  - [Clearance Measurement Awareness – Mengapa Clearance Penting pada Reciprocating Compressor?](#clearance-measurement-awareness--mengapa-clearance-penting-pada-reciprocating-compressor)
- [📊 ALIGNMENT DENGAN OUTPUT JUNIOR MECHANICAL](#-alignment-dengan-output-junior-mechanical)

---

# 📘 ARTIKEL 1

## Compressor Discharge Temperature Tinggi – Masalah Valve, Clearance, atau Cooling?

---

## 1️⃣ Informasi Umum

1. Judul: Discharge Temperature Tinggi pada Reciprocating Compressor
2. Disiplin: Mechanical
3. Level: Junior
4. Kategori: Troubleshooting
5. Equipment: Reciprocating Compressor – Cylinder & Valve Assembly
6. Referensi Standar: API 618 awareness

---

## 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- LO1 – Mengidentifikasi minimal 5 penyebab discharge temperature tinggi
- LO2 – Membaca P&ID compressor stage dan jalur pendinginan
- LO3 – Mengidentifikasi risiko keselamatan akibat over-temperature (auto-ignition & trip)

---

## 3️⃣ System Context & Criticality

Suction → Compression → Discharge → Aftercooler → Downstream Process

Jika discharge temperature tinggi:

- Valve damage
- Lubricant degradation
- Piston ring wear
- Interlock trip

Interaksi lintas disiplin:

Temperature sensor ↑ → Alarm (Instrument) → Trip logic (Control) → Shutdown.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi harus memahami:

- P&ID jalur suction–discharge
- Posisi temperature transmitter
- Jalur cooling water pada aftercooler

Harus mampu menunjukkan:

- Titik suction pressure
- Titik discharge pressure
- Jalur cooling

---

## 5️⃣ Background & Failure Scenario

Normal discharge temperature: 135°C
Saat ini: 175°C

Suction pressure normal.
Cooling water flow terlihat normal.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Temperatur naik bertahap selama 2 hari

Terukur:

- Discharge pressure sedikit turun
- Vibration sedikit meningkat

Asumsi awal operator:

- Cooling water kurang efektif

---

## 7️⃣ Possible Causes (Structured Hypothesis)

A. Mechanical

- Valve bocor
- Clearance terlalu kecil
- Ring aus

B. Process

- Suction temperature tinggi
- Gas composition berubah

C. Cooling

- Fouling aftercooler

D. Human Error

- Clearance tidak dicek saat overhaul

---

## 8️⃣ Step-by-Step Investigation Flow

1. Verifikasi suction & discharge pressure
2. Cek cooling water inlet–outlet temperature
3. Periksa trend vibration
4. Analisa indikasi valve leakage
5. Review histori overhaul & clearance record

Decision Point:
Pressure ratio dianalisa sebelum membongkar cylinder.

---

## 9️⃣ Root Cause & Contributing Factor

Root Cause:
Discharge valve bocor menyebabkan re-compression & overheating.

Contributing Factor:
Tidak dilakukan valve inspection sesuai interval.

---

## 🔟 Reference to Standard & Gap Analysis

API 618 menyarankan monitoring temperatur discharge dan kondisi valve.

Gap:

- Tidak ada trending pressure ratio
- Clearance tidak terdokumentasi

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate Action:

- Ganti discharge valve

Permanent Fix:

- Update interval inspection valve

System Improvement:

- Tambahkan trend pressure ratio review

Monitoring Plan:

- Pantau discharge temperature harian

---

## 1️⃣2️⃣ Risk & Safety Reflection

Potensi bahaya:

- High pressure gas release
- Explosion risk
- Hot surface

Permit:

- Pressure isolation
- Depressurization sebelum membuka cylinder

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter penting:

- Discharge temperature
- Pressure ratio
- Vibration

Early Warning:

- Kenaikan bertahap discharge temperature sebelum alarm.

---

## 1️⃣4️⃣ Competency Mapping

Skill Area: Compressor Troubleshooting
Level Saat Ini: W
Target Setelah Artikel: Menuju I

---

## 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa valve bocor menyebabkan temperature naik?
2. Apa perbedaan gejala fouling vs valve leakage?
3. Mengapa trending pressure ratio penting?

---

## 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- Discharge temperature tinggi sering terkait valve
- Pressure ratio adalah indikator penting
- Cooling harus diverifikasi dengan data
- Clearance harus terdokumentasi

---

# 📘 ARTIKEL 2

## Valve Failure Symptoms – Bagaimana Mendeteksi Sebelum Rusak Total?

---

## 1️⃣ Informasi Umum

Disiplin: Mechanical
Level: Junior
Kategori: Troubleshooting

Referensi: API 618 awareness

---

## 2️⃣ Learning Objective

- LO1 – Mengidentifikasi gejala awal valve failure
- LO2 – Menghubungkan gejala dengan parameter operasi
- LO3 – Memahami risiko kegagalan valve terhadap keselamatan

---

## 3️⃣ System Context

Valve suction & discharge menentukan efisiensi kompresi.

Jika valve rusak:

- Capacity drop
- Temperature naik
- Power consumption naik

---

## 4️⃣ Diagram Literacy Section

- Posisi suction & discharge valve pada cylinder
- Jalur aliran gas

---

## 5️⃣ Background & Failure Scenario

Gejala:

- Capacity turun 10%
- Discharge temperature naik
- Noise tidak normal

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Suara knocking ringan

Terukur:

- Pressure fluctuation meningkat

---

## 7️⃣ Possible Causes

A. Mechanical

- Valve plate crack
- Spring fatigue

B. Process

- Liquid carryover

C. Human

- Clearance tidak sesuai

---

## 8️⃣ Investigation Flow

1. Analisa pressure pulsation
2. Review vibration
3. Cek histori liquid carryover

Decision Point:
Analisa data sebelum membuka cylinder.

---

## 9️⃣ Root Cause

Valve plate crack akibat fatigue.

---

## 🔟 Gap Analysis

Tidak ada monitoring liquid carryover.

---

## 1️⃣1️⃣ Corrective Action

- Ganti valve
- Perbaiki upstream separator

Monitoring:

- Trend pulsation & temperature

---

## 1️⃣2️⃣ Risk Reflection

- High pressure opening risk
- Gas exposure

---

## 1️⃣3️⃣ Data Awareness

Pressure pulsation meningkat sebelum failure.

---

## 1️⃣4️⃣ Competency Mapping

Valve symptom recognition: W → I

---

# 📘 ARTIKEL 3

## Clearance Measurement Awareness – Mengapa Clearance Penting pada Reciprocating Compressor?

(Kategori: Preventive)

Struktur tetap 16 section.

Fokus utama:

- Definisi clearance volume
- Dampak clearance terlalu kecil → overheating
- Dampak clearance terlalu besar → capacity drop
- Awareness penggunaan feeler gauge

Safety:

- Pastikan cylinder depressurized
- Gunakan prosedur lock-out

---

# 📊 ALIGNMENT DENGAN OUTPUT JUNIOR MECHANICAL

| Target Output                   | Status                            |
| ------------------------------- | --------------------------------- |
| Bisa melakukan alignment        | ✔                                 |
| Bisa inspeksi pump              | ✔                                 |
| Bisa identifikasi early symptom | ✔ (compressor parameter trending) |
