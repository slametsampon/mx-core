# TEKNISI JUNIOR E&I

## 🔵 BULAN 3 – Basic Instrumentation (Pressure & Temperature)

Referensi prinsip umum instalasi & instrument practice:
International Electrotechnical Commission

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 3 – Basic Instrumentation (Pressure \& Temperature)](#-bulan-3--basic-instrumentation-pressure--temperature)
- [📘 ARTIKEL 9](#-artikel-9)
  - [Pressure Transmitter Reading Tidak Stabil – Investigasi dari Impulse Line hingga AI Channel](#pressure-transmitter-reading-tidak-stabil--investigasi-dari-impulse-line-hingga-ai-channel)
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
- [📘 ARTIKEL 10](#-artikel-10)
  - [Temperature Transmitter Error Setelah Shutdown – Investigasi Wiring \& Sensor](#temperature-transmitter-error-setelah-shutdown--investigasi-wiring--sensor)
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
- [📘 ARTIKEL 11](#-artikel-11)
  - [Praktik Kalibrasi Transmitter – Bench Test vs Loop Test](#praktik-kalibrasi-transmitter--bench-test-vs-loop-test)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Procedure Outline](#5️⃣-procedure-outline)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Data \& Documentation](#7️⃣-data--documentation)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 12](#-artikel-12)
  - [Konsep 4–20 mA \& Loop Wiring dalam Sistem Kontrol](#konsep-420-ma--loop-wiring-dalam-sistem-kontrol)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-3)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-3)
  - [3️⃣ System Context](#3️⃣-system-context-2)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-2)
  - [5️⃣ Failure Illustration](#5️⃣-failure-illustration)
  - [6️⃣ Risk Awareness](#6️⃣-risk-awareness)
  - [7️⃣ Competency Mapping](#7️⃣-competency-mapping)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 9

## Pressure Transmitter Reading Tidak Stabil – Investigasi dari Impulse Line hingga AI Channel

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Troubleshooting
Equipment: Pressure Transmitter 4–20 mA (Field to DCS)
Referensi: IEC instrument installation practice awareness

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi minimal 5 penyebab reading pressure tidak stabil
- Membaca loop diagram dari transmitter ke DCS
- Membedakan gangguan proses vs gangguan instrument

---

## 3️⃣ System Context & Criticality

Pressure Transmitter → PLC/DCS → Control Valve → Stabilitas pressure line.

Reading tidak stabil dapat menyebabkan:

- Control valve hunting
- False alarm high/low pressure
- Potensi trip interlock

Interaksi lintas disiplin:
Impulse line (mechanical) ↔ Signal loop (electrical) ↔ Control logic (DCS).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Loop diagram (24V supply, signal 4–20 mA, AI channel)
- P&ID untuk melihat tapping point & impulse line

Teknisi harus mampu menunjukkan:

- Titik supply
- Jalur sinyal
- Titik vent/drain impulse line

---

## 5️⃣ Background & Failure Scenario

DCS menunjukkan pressure fluktuatif ±0.5 bar.
Proses terlihat stabil secara visual.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Trend zig-zag cepat

Terukur:

- Loop current berubah cepat
- Valve ikut bergerak

Asumsi awal:

- Proses tidak stabil

---

## 7️⃣ Possible Causes (Structured)

Mechanical:

- Impulse line blockage parsial
- Air trap

Electrical:

- Noise pada signal cable
- Shield grounding tidak benar

Instrument:

- Transmitter damping setting terlalu rendah
- Sensor diaphragm rusak

Human:

- Valve manifold tidak fully open

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi kondisi proses (cross-check field gauge)
2. Cek manifold valve position
3. Cek impulse line (drain/blow)
4. Ukur loop current dengan multimeter
5. Periksa shielding & grounding

Decision logic:
Validasi proses terlebih dahulu sebelum menyalahkan instrument.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Impulse line partially blocked.

Contributing:
Tidak dilakukan flushing setelah shutdown.

---

## 🔟 Reference Standard & Gap Analysis

IEC practice:
Impulse line harus bebas kondensat & blockage.

Gap:
Tidak ada checklist flushing pasca shutdown.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Flushing impulse line

Permanent:

- Tambahkan flushing step pada startup checklist

Monitoring:

- Trend stabilitas pressure pasca perbaikan

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko release fluida bertekanan
- Wajib depressurize sebelum buka impulse line
- Gunakan face shield & PPE

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- Trend DCS vs field gauge
- Trend sebelum & sesudah flushing

Early warning:
Fluktuasi kecil muncul 3 hari sebelum alarm.

---

## 1️⃣4️⃣ Competency Mapping

Loop troubleshooting: W → Target I
P&ID reading: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa kontrol valve ikut hunting?
2. Bagaimana membedakan noise listrik vs gangguan proses?
3. Mengapa impulse line sering menjadi penyebab utama?

---

## 1️⃣6️⃣ Key Takeaway

- Jangan langsung kalibrasi ulang
- Validasi proses & impulse line dahulu
- Trend adalah alat analisa utama

---

# 📘 ARTIKEL 10

## Temperature Transmitter Error Setelah Shutdown – Investigasi Wiring & Sensor

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab error setelah shutdown
- Memahami perbedaan RTD vs Thermocouple
- Membaca loop diagram temperature

---

## 3️⃣ System Context

Temperature → DCS → Interlock / Alarm → Protection equipment.

---

## 4️⃣ Diagram Literacy

- Wiring RTD 2-wire / 3-wire
- Jalur compensation thermocouple

---

## 5️⃣ Failure Scenario

Setelah shutdown, DCS menunjukkan -200°C (out of range).

---

## 6️⃣ Possible Causes

Electrical:

- Cable putus
- Terminal longgar

Instrument:

- Sensor rusak akibat thermal shock

Human:

- Salah reconnect saat maintenance

---

## 7️⃣ Investigation

1. Verifikasi wiring continuity
2. Cek terminal torque
3. Bandingkan resistance RTD vs chart
4. Cek range setting transmitter

---

## 8️⃣ Root Cause

Open circuit akibat terminal tidak dikencangkan.

---

## 9️⃣ Risk

False low temperature dapat memicu unsafe restart.

---

## 1️⃣3️⃣ Trend Awareness

Bandingkan trend sebelum shutdown vs sesudah restart.

---

# 📘 ARTIKEL 11

## Praktik Kalibrasi Transmitter – Bench Test vs Loop Test

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Kategori: Preventive
Level: Junior

Referensi:
International Electrotechnical Commission

---

## 2️⃣ Learning Objective

- Menjelaskan perbedaan bench vs loop calibration
- Melakukan basic zero & span adjustment
- Memahami dampak kalibrasi terhadap proses

---

## 3️⃣ System Context

Kalibrasi tidak akurat → control error → product off-spec.

---

## 4️⃣ Diagram Literacy

- Simulasi 4–20 mA injection
- Loop isolation point

---

## 5️⃣ Procedure Outline

Bench:

- Lepas transmitter
- Gunakan pressure calibrator

Loop:

- Inject signal di marshalling panel

---

## 6️⃣ Risk

- Isolasi tidak benar → proses terganggu
- Salah range setting

---

## 7️⃣ Data & Documentation

Wajib:

- As found
- As left
- Tolerance

---

## 1️⃣4️⃣ Competency Mapping

Calibration skill: W → Target I

---

# 📘 ARTIKEL 12

## Konsep 4–20 mA & Loop Wiring dalam Sistem Kontrol

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control
Level: Junior
Kategori: Basic Theory

---

## 2️⃣ Learning Objective

- Menjelaskan mengapa 4 mA bukan 0 mA
- Menghitung konversi mA ke engineering unit
- Mengidentifikasi open loop vs short loop

---

## 3️⃣ System Context

Signal 4–20 mA → PLC/DCS → Control action.

---

## 4️⃣ Diagram Literacy

- Loop wiring (2-wire)
- Power supply + AI module

---

## 5️⃣ Failure Illustration

Open loop → 0 mA → DCS baca 0%.

---

## 6️⃣ Risk Awareness

Ground loop dapat menyebabkan noise.

---

## 7️⃣ Competency Mapping

Signal loop understanding: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                    | Status |
| -------------------------- | ------ |
| Troubleshooting sistematis | ✔      |
| Membaca loop & P&ID        | ✔      |
| Safety awareness           | ✔      |
| Inspeksi & preventive      | ✔      |
| Interaksi E–I–C            | ✔      |
