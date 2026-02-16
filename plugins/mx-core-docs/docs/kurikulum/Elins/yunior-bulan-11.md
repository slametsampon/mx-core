# TEKNISI JUNIOR E&I

## 🔵 BULAN 11 – Rotating Equipment Instrumentation

Fokus bulan ini:

- Interface Mechanical–Instrumentation
- Machinery protection awareness
- Data-based troubleshooting (vibration & temperature)

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 11 – Rotating Equipment Instrumentation](#-bulan-11--rotating-equipment-instrumentation)
- [📘 ARTIKEL 40](#-artikel-40)
  - [Vibration Transmitter Abnormal Reading – Sensor Fault atau Machinery Problem?](#vibration-transmitter-abnormal-reading--sensor-fault-atau-machinery-problem)
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
- [📘 ARTIKEL 41](#-artikel-41)
  - [Bearing Temperature Spike – Gangguan Proses, Sensor, atau Lubrikasi?](#bearing-temperature-spike--gangguan-proses-sensor-atau-lubrikasi)
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
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 42](#-artikel-42)
  - [Inspection Vibration Probe \& RTD Wiring – Preventive untuk Machinery Protection](#inspection-vibration-probe--rtd-wiring--preventive-untuk-machinery-protection)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Inspection Checklist](#5️⃣-inspection-checklist)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Documentation](#7️⃣-documentation)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📘 ARTIKEL 43](#-artikel-43)
  - [Basic Machinery Protection System – Konsep Alarm \& Trip pada Rotating Equipment](#basic-machinery-protection-system--konsep-alarm--trip-pada-rotating-equipment)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-3)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-3)
  - [3️⃣ System Context](#3️⃣-system-context-2)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-2)
  - [5️⃣ Basic Theory](#5️⃣-basic-theory)
  - [6️⃣ Failure Illustration](#6️⃣-failure-illustration)
  - [7️⃣ Risk Awareness](#7️⃣-risk-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-3)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 40

## Vibration Transmitter Abnormal Reading – Sensor Fault atau Machinery Problem?

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation (Machinery Monitoring)
Level: Junior
Kategori: Troubleshooting
Equipment: Vibration Transmitter (4–20 mA) – Pump / Motor

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi penyebab abnormal reading vibration transmitter
- Membaca jalur signal dari sensor ke DCS
- Membedakan indikasi sensor fault vs mechanical vibration nyata

---

## 3️⃣ System Context & Criticality

Rotating Equipment → Vibration Sensor → PLC/DCS → Alarm / Trip

Jika vibration tinggi:

- Bearing damage
- Seal failure
- Shaft misalignment
- Potensi shutdown

Interaksi lintas disiplin:
Mechanical condition ↔ Sensor ↔ Control system.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Basic vibration probe installation diagram
- Loop diagram (Sensor → Transmitter → AI Module → DCS)

Teknisi harus mampu menunjukkan:

- Titik mounting sensor
- Jalur kabel shield
- Lokasi power supply

---

## 5️⃣ Background & Failure Scenario

DCS menunjukkan vibration naik dari 2 mm/s menjadi 8 mm/s.
Secara fisik mesin tidak terdengar abnormal.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Alarm vibration high

Terukur:

- Arus 4–20 mA naik mendekati 18 mA
- Tidak ada perubahan suhu bearing

Asumsi awal:

- Bearing rusak

---

## 7️⃣ Possible Causes (Structured)

Mechanical:

- Misalignment
- Unbalance
- Bearing defect

Instrument:

- Sensor loose mounting
- Calibration drift
- Cable shield open

Electrical:

- Noise interference

Human:

- Range scaling salah

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi kondisi fisik mesin
2. Periksa mounting bolt sensor
3. Cek shielding & grounding
4. Bandingkan dengan portable vibration meter
5. Verifikasi scaling di DCS

Decision logic:
Validasi sensor sebelum menyimpulkan kerusakan mekanis.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Sensor mounting longgar menyebabkan over-reading.

Contributing:
Tidak ada torque check pada sensor saat PM.

---

## 🔟 Reference Standard & Gap Analysis

Best practice:
Sensor vibration harus rigid mounting untuk akurasi.

Gap:
Tidak ada checklist torque mounting probe.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Re-tighten mounting

Permanent:

- Tambahkan torque check pada PM

Monitoring:

- Trend vibration sebelum & sesudah perbaikan

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Jangan mendekati rotating shaft tanpa guard
- LOTO jika perlu membuka cover

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- Trend vibration vs load
- Trend vibration vs temperature

Early warning:
Kenaikan bertahap berbeda dengan lonjakan tiba-tiba (sensor issue).

---

## 1️⃣4️⃣ Competency Mapping

Vibration troubleshooting: W → I
Mechanical–instrument interaction: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Bagaimana membedakan sensor fault vs unbalance?
2. Mengapa mounting rigidity penting?
3. Apa risiko false high vibration?

---

## 1️⃣6️⃣ Key Takeaway

- Jangan langsung bongkar bearing
- Validasi sensor & wiring dahulu
- Trend adalah alat utama diagnosis

---

# 📘 ARTIKEL 41

## Bearing Temperature Spike – Gangguan Proses, Sensor, atau Lubrikasi?

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Mechanical Interface
Level: Junior
Kategori: Troubleshooting
Equipment: RTD Bearing Temperature – Motor / Pump

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab lonjakan suhu bearing
- Membaca loop wiring RTD
- Membedakan overheat nyata vs sensor error

---

## 3️⃣ System Context

Bearing → RTD → PLC/DCS → Alarm / Trip

Temperature spike dapat menyebabkan:

- Automatic trip
- Equipment damage

---

## 4️⃣ Diagram Literacy

- RTD 3-wire wiring diagram
- Jalur sinyal ke AI module

---

## 5️⃣ Failure Scenario

Suhu bearing naik tiba-tiba dari 70°C ke 120°C dalam 1 menit.

---

## 6️⃣ Possible Causes

Mechanical:

- Lubrikasi kurang
- Bearing defect

Instrument:

- Open circuit RTD
- Loose terminal

Electrical:

- Noise interference

Human:

- Salah reconnect saat maintenance

---

## 7️⃣ Investigation

1. Verifikasi suhu dengan handheld thermometer
2. Periksa wiring continuity RTD
3. Cek resistance sensor
4. Periksa kondisi grease

---

## 8️⃣ Root Cause

Terminal RTD longgar menyebabkan pembacaan tidak stabil.

---

## 9️⃣ Risk

False spike dapat memicu trip tidak perlu.

---

## 1️⃣3️⃣ Trend Awareness

Bandingkan:

- Trend gradual vs spike instan
- Suhu vs load mesin

---

## 1️⃣4️⃣ Competency Mapping

RTD troubleshooting: W → I

---

# 📘 ARTIKEL 42

## Inspection Vibration Probe & RTD Wiring – Preventive untuk Machinery Protection

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Preventive

---

## 2️⃣ Learning Objective

- Melakukan inspeksi fisik probe vibration
- Memeriksa integritas wiring RTD
- Mengidentifikasi tanda kerusakan dini

---

## 3️⃣ System Context

Machinery protection system bergantung pada sensor akurat.

---

## 4️⃣ Diagram Literacy

- Lokasi sensor pada bearing housing
- Jalur cable routing

---

## 5️⃣ Inspection Checklist

1. Mounting bolt tightness
2. Cable damage
3. Shield continuity
4. Terminal torque
5. Junction box condition

---

## 6️⃣ Risk

Rotating hazard saat inspeksi
Panel energized hazard

---

## 7️⃣ Documentation

Catat:

- Nilai baseline vibration
- Nilai baseline temperature

---

## 1️⃣4️⃣ Competency Mapping

Inspection skill: W → I

---

# 📘 ARTIKEL 43

## Basic Machinery Protection System – Konsep Alarm & Trip pada Rotating Equipment

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control
Level: Junior
Kategori: Basic Theory

---

## 2️⃣ Learning Objective

- Menjelaskan konsep alarm vs trip
- Memahami perbedaan monitoring dan protection
- Menjelaskan peran sensor dalam machinery protection

---

## 3️⃣ System Context

Vibration & Temperature → Protection Relay / PLC → Trip Motor

---

## 4️⃣ Diagram Literacy

- Basic protection block diagram
- Sensor → Logic → Trip relay

---

## 5️⃣ Basic Theory

- Setpoint alarm
- Trip delay
- Fail-safe principle

---

## 6️⃣ Failure Illustration

Alarm diabaikan → akhirnya trip terjadi.

---

## 7️⃣ Risk Awareness

Setting terlalu sensitif → nuisance trip
Setting terlalu tinggi → equipment damage

---

## 1️⃣4️⃣ Competency Mapping

Machinery protection awareness: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                                 | Status |
| --------------------------------------- | ------ |
| Troubleshooting sistematis              | ✔      |
| Membaca loop & protection diagram       | ✔      |
| Safety awareness                        | ✔      |
| Preventive & inspeksi                   | ✔      |
| Interaksi Mechanical–Instrument–Control | ✔      |
