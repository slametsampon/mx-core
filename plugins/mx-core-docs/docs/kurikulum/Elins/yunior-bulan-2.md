# TEKNISI JUNIOR E&I

## 🔵 BULAN 2 – Induction Motor & Alignment Awareness

Referensi utama:
IEEE – IEEE 43 (Insulation Resistance & PI)

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 2 – Induction Motor \& Alignment Awareness](#-bulan-2--induction-motor--alignment-awareness)
- [📘 ARTIKEL 5](#-artikel-5)
  - [Motor Overheating – Electrical atau Mechanical? Investigasi Berbasis Data \& Diagram](#motor-overheating--electrical-atau-mechanical-investigasi-berbasis-data--diagram)
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
- [📘 ARTIKEL 6](#-artikel-6)
  - [Vibrasi Tinggi Setelah Coupling Replacement – Electrical atau Alignment Issue?](#vibrasi-tinggi-setelah-coupling-replacement--electrical-atau-alignment-issue)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-1)
  - [3️⃣ System Context](#3️⃣-system-context)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy)
  - [5️⃣ Failure Scenario](#5️⃣-failure-scenario)
  - [6️⃣ Possible Causes](#6️⃣-possible-causes)
  - [7️⃣ Investigation](#7️⃣-investigation)
  - [8️⃣ Root Cause](#8️⃣-root-cause)
  - [9️⃣ Risk](#9️⃣-risk)
  - [1️⃣3️⃣ Data Awareness](#1️⃣3️⃣-data-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 7](#-artikel-7)
  - [Insulation Resistance Test \& Polarization Index (PI) – Praktik Sesuai IEEE 43](#insulation-resistance-test--polarization-index-pi--praktik-sesuai-ieee-43)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Procedure Outline](#5️⃣-procedure-outline)
  - [6️⃣ Acceptance Criteria (Basic Awareness)](#6️⃣-acceptance-criteria-basic-awareness)
  - [7️⃣ Risk](#7️⃣-risk)
  - [8️⃣ Data \& Trend](#8️⃣-data--trend)
  - [9️⃣ Competency Mapping](#9️⃣-competency-mapping)
- [📘 ARTIKEL 8](#-artikel-8)
  - [Prinsip Kerja Motor Induksi 3 Fasa \& Hubungannya dengan Beban Mekanis](#prinsip-kerja-motor-induksi-3-fasa--hubungannya-dengan-beban-mekanis)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-3)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-3)
  - [3️⃣ System Context](#3️⃣-system-context-2)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-2)
  - [5️⃣ Failure Illustration](#5️⃣-failure-illustration)
  - [6️⃣ Risk Awareness](#6️⃣-risk-awareness)
  - [7️⃣ Competency Mapping](#7️⃣-competency-mapping)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 5

## Motor Overheating – Electrical atau Mechanical? Investigasi Berbasis Data & Diagram

---

## 1️⃣ Informasi Umum

Disiplin: Electrical & Mechanical Interface
Level: Junior
Kategori: Troubleshooting
Equipment: Motor Induksi 3 Fasa – Pump Service
Referensi: IEEE 43 (IR & PI testing awareness)

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi minimal 5 penyebab motor overheating
- Membedakan indikasi overheating akibat electrical vs mechanical
- Membaca jalur motor pada Single Line Diagram (SLD) dan keterkaitan dengan beban mekanis

---

## 3️⃣ System Context & Criticality

Motor → Menggerakkan pompa → Menjaga flow → Mempengaruhi control valve → Stabilitas proses.

Overheating dapat menyebabkan:

- Insulation degradation
- Trip overload
- Unplanned shutdown

Interaksi lintas disiplin:
Mechanical load ↑ → Current ↑ → Temperature ↑ → Relay trip.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Analisa berbasis:

- Single Line Diagram (Feeder → MCC → Overload → Motor)
- Basic motor cross-section (stator, rotor, bearing, cooling fan)

Teknisi harus mampu:

- Menunjukkan titik proteksi thermal
- Mengidentifikasi jalur supply
- Mengaitkan arus dengan beban mekanis

---

## 5️⃣ Background & Failure Scenario

Motor 55 kW menunjukkan temperature housing 95°C (normal <80°C).
Running current 105% FLA.
Tidak terjadi trip.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Housing panas
- Bau varnish ringan

Terukur:

- Arus slightly di atas FLA
- Tegangan normal

Asumsi awal:

- Motor winding rusak

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Overload
- Unbalance voltage
- Insulation degradation

Mechanical:

- Misalignment
- Bearing friction
- Pump overload

Instrument:

- CT reading error

Human:

- Ventilation motor tertutup debu

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi arus & tegangan 3 fasa
2. Cek unbalance (%)
3. Cek alignment coupling
4. Cek bearing noise
5. Lakukan IR test sesuai IEEE 43

Decision logic:
Electrical diverifikasi sebelum pembongkaran mekanis.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Misalignment menyebabkan beban meningkat.

Contributing:
Coupling tidak direcheck setelah maintenance.

---

## 🔟 Reference Standard & Gap Analysis

Menurut IEEE 43:
Insulation test dilakukan sebelum menyimpulkan winding damage.

Gap:
IR test belum dilakukan sebelum asumsi kerusakan.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Realignment coupling

Permanent:

- Tambahkan alignment verification checklist

Monitoring:

- Trend arus & temperatur bulanan

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko arc flash saat membuka MCC
- Risiko rotating hazard saat buka guard
- Wajib LOTO sebelum alignment

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter monitoring:

- Running current
- Motor surface temperature
- Vibration

Early warning:
Arus meningkat 5% dalam 2 minggu sebelum overheating.

---

## 1️⃣4️⃣ Competency Mapping

Motor troubleshooting: W → Target I
SLD reading: A → W
Mechanical interaction awareness: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa overheating tidak selalu berarti winding rusak?
2. Apa hubungan misalignment dengan arus listrik?
3. Mengapa voltage unbalance berbahaya?

---

## 1️⃣6️⃣ Key Takeaway

- Gunakan data sebelum bongkar motor
- Beban mekanis mempengaruhi arus
- Selalu lakukan IR test sebelum menyimpulkan kerusakan winding

---

# 📘 ARTIKEL 6

## Vibrasi Tinggi Setelah Coupling Replacement – Electrical atau Alignment Issue?

---

## 1️⃣ Informasi Umum

Disiplin: Electrical–Mechanical Interface
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab vibrasi pasca maintenance
- Memahami hubungan alignment dengan bearing & arus
- Membaca posisi coupling pada drawing dasar

---

## 3️⃣ System Context

Misalignment → Bearing load ↑ → Arus motor ↑ → Temperature ↑ → Trip.

---

## 4️⃣ Diagram Literacy

- Basic shaft–coupling–pump alignment diagram
- Posisi motor foot & soft foot check

---

## 5️⃣ Failure Scenario

Setelah coupling diganti, vibration naik dari 2 mm/s menjadi 6 mm/s.

---

## 6️⃣ Possible Causes

Mechanical:

- Angular misalignment
- Parallel misalignment
- Soft foot

Electrical:

- Rotor unbalance

Human:

- Torque bolt tidak sesuai

---

## 7️⃣ Investigation

1. Cek alignment dial/laser
2. Cek soft foot
3. Bandingkan vibration direction
4. Cek arus motor

---

## 8️⃣ Root Cause

Angular misalignment > tolerance.

---

## 9️⃣ Risk

Bearing premature failure
Seal leakage
Motor overheating

---

## 1️⃣3️⃣ Data Awareness

Trend vibration sebelum & sesudah pekerjaan.

---

## 1️⃣4️⃣ Competency Mapping

Alignment skill: W → Target I

---

# 📘 ARTIKEL 7

## Insulation Resistance Test & Polarization Index (PI) – Praktik Sesuai IEEE 43

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Preventive

Referensi:
IEEE – IEEE 43

---

## 2️⃣ Learning Objective

- Melakukan IR test sesuai prosedur
- Menghitung Polarization Index
- Menginterpretasi hasil dasar

---

## 3️⃣ System Context

Insulation degradation → short circuit → motor failure → plant trip.

---

## 4️⃣ Diagram Literacy

- Titik test pada terminal motor
- Posisi grounding saat test

---

## 5️⃣ Procedure Outline

1. Isolasi & LOTO
2. Lepas cable
3. Megger 500/1000V sesuai rating
4. Catat nilai 1 menit & 10 menit
5. Hitung PI

---

## 6️⃣ Acceptance Criteria (Basic Awareness)

PI ≥ 2 → Good
PI < 1 → Investigasi lanjut

---

## 7️⃣ Risk

Megger voltage hazard
Residual charge

---

## 8️⃣ Data & Trend

Bandingkan IR tahun ini vs tahun lalu.

---

## 9️⃣ Competency Mapping

IR test: W → Target I

---

# 📘 ARTIKEL 8

## Prinsip Kerja Motor Induksi 3 Fasa & Hubungannya dengan Beban Mekanis

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Basic Theory

---

## 2️⃣ Learning Objective

- Menjelaskan konsep medan magnet berputar
- Memahami slip
- Mengaitkan beban dengan arus

---

## 3️⃣ System Context

Beban mekanis ↑ → Slip ↑ → Arus ↑ → Temperatur ↑.

---

## 4️⃣ Diagram Literacy

- Stator–rotor cross section
- Kurva torque–speed dasar

---

## 5️⃣ Failure Illustration

Pump overload → slip naik → arus naik → overheating.

---

## 6️⃣ Risk Awareness

Overload terus menerus → insulation breakdown.

---

## 7️⃣ Competency Mapping

Motor theory: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                         | Status |
| ------------------------------- | ------ |
| Troubleshooting sistematis      | ✔      |
| Membaca diagram                 | ✔      |
| Safety awareness                | ✔      |
| Inspeksi & preventive           | ✔      |
| Interaksi Electrical–Mechanical | ✔      |
