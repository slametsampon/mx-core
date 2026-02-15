## 🔵 BULAN 7 – Analyzer & Sampling System Basic

Fokus:

- Field analyzer reliability
- Sampling system awareness
- Interaksi proses–instrument–control

Referensi praktik umum instrumentasi industri mengacu pada:
International Electrotechnical Commission

---

- [� ARTIKEL 1](#-artikel-1)
  - [Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell](#gas-analyzer-reading-drifting--investigasi-dari-sampling-line-hingga-analyzer-cell)
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
- [📘 ARTIKEL 2](#-artikel-2)
  - [Moisture Analyzer False Alarm – Gangguan Sensor atau Kondensasi?](#moisture-analyzer-false-alarm--gangguan-sensor-atau-kondensasi)
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
- [📘 ARTIKEL 3](#-artikel-3)
  - [Cleaning \& Maintenance Sampling Line – Preventive untuk Reliability Analyzer](#cleaning--maintenance-sampling-line--preventive-untuk-reliability-analyzer)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Preventive Checklist](#5️⃣-preventive-checklist)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Data \& Documentation](#7️⃣-data--documentation)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📘 ARTIKEL 4](#-artikel-4)
  - [Prinsip Kerja Gas Analyzer \& Basic Gas Chromatograph (GC)](#prinsip-kerja-gas-analyzer--basic-gas-chromatograph-gc)
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

# 📘 ARTIKEL 1

## Gas Analyzer Reading Drifting – Investigasi dari Sampling Line hingga Analyzer Cell

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation (Analyzer)
Level: Junior
Kategori: Troubleshooting
Equipment: Online Gas Analyzer (Process Analyzer)

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi minimal 5 penyebab drift pada gas analyzer
- Membaca diagram sampling system dasar
- Membedakan drift akibat analyzer vs akibat sampling system

---

## 3️⃣ System Context & Criticality

Process Line → Sample Tap → Conditioning System → Analyzer → DCS → Control / Alarm

Drifting dapat menyebabkan:

- Quality deviation
- False composition reading
- Salah keputusan operasi

Interaksi lintas disiplin:
Sampling (mechanical) ↔ Analyzer (instrument) ↔ DCS (control).

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Simplified sampling system diagram
  (Probe → Filter → Regulator → Flowmeter → Analyzer Cell → Vent)
- Loop signal analyzer ke DCS (4–20 mA / digital)

Teknisi harus mampu menunjukkan:

- Titik pressure regulation
- Titik filtration
- Jalur sinyal ke DCS

---

## 5️⃣ Background & Failure Scenario

Gas analyzer menunjukkan komposisi O₂ naik perlahan 1–2% dalam 3 hari.
Proses secara aktual stabil.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Trend naik gradual

Terukur:

- Sample flow tidak stabil
- Filter differential pressure meningkat

Asumsi awal:

- Analyzer cell rusak

---

## 7️⃣ Possible Causes (Structured)

Mechanical:

- Sampling line partially blocked
- Leakage pada fitting

Instrument:

- Analyzer sensor aging
- Calibration drift

Electrical:

- Signal noise

Human:

- Tidak dilakukan zero/span check periodik

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi kondisi proses aktual
2. Cek flow sampling
3. Periksa filter & moisture trap
4. Lakukan zero check
5. Bandingkan reading dengan portable analyzer

Decision logic:
Validasi sampling sebelum mengganti analyzer cell.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Filter sampling tersumbat menyebabkan pressure drop & reading bias.

Contributing:
PM filter replacement tidak sesuai interval.

---

## 🔟 Reference Standard & Gap Analysis

Best practice:
Sampling harus representatif & stabil sebelum analisa.

Gap:
Tidak ada monitoring differential pressure filter.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Ganti filter

Permanent:

- Tambahkan monitoring DP filter

Monitoring:

- Trend analyzer vs reference portable

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko gas berbahaya saat membuka sampling line
- Wajib purge & depressurize
- Gunakan gas detector portable

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- Analyzer trend vs process parameter
- Sample flow vs reading

Early warning:
Flow sample mulai tidak stabil sebelum drift terlihat.

---

## 1️⃣4️⃣ Competency Mapping

Analyzer troubleshooting: W → I
Sampling system awareness: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa sampling lebih sering menjadi sumber masalah?
2. Apa dampak drift kecil terhadap kualitas produk?
3. Mengapa zero check penting sebelum mengganti cell?

---

## 1️⃣6️⃣ Key Takeaway

- 70% masalah analyzer ada di sampling system
- Validasi sampling sebelum menyalahkan analyzer
- Trend gradual lebih berbahaya dari alarm instan

---

# 📘 ARTIKEL 2

## Moisture Analyzer False Alarm – Gangguan Sensor atau Kondensasi?

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation (Analyzer)
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab false high moisture alarm
- Membaca jalur sampling moisture analyzer
- Memahami efek kondensasi pada sensor

---

## 3️⃣ System Context

Moisture analyzer → Alarm → Protection interlock → Equipment trip.

False alarm dapat menyebabkan:

- Shutdown tidak perlu
- Kerugian produksi

---

## 4️⃣ Diagram Literacy

- Sampling line heater
- Moisture analyzer cell
- Signal output ke DCS

---

## 5️⃣ Failure Scenario

Moisture reading tiba-tiba naik tinggi setelah hujan deras.

---

## 6️⃣ Possible Causes

Mechanical:

- Kondensasi pada sampling line
- Heater sampling mati

Instrument:

- Sensor contamination

Electrical:

- Power supply fluctuation

---

## 7️⃣ Investigation

1. Cek heater sampling
2. Cek suhu line
3. Cek supply air purge
4. Lakukan zero gas verification

---

## 8️⃣ Root Cause

Sampling line heater off → kondensasi → reading tinggi palsu.

---

## 9️⃣ Risk

False trip unit akibat moisture alarm.

---

## 1️⃣3️⃣ Trend Awareness

Bandingkan:

- Ambient humidity vs analyzer reading
- Heater current vs waktu

---

## 1️⃣4️⃣ Competency Mapping

Sampling diagnostic skill: W → I

---

# 📘 ARTIKEL 3

## Cleaning & Maintenance Sampling Line – Preventive untuk Reliability Analyzer

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Preventive

---

## 2️⃣ Learning Objective

- Menjelaskan pentingnya sampling representatif
- Melakukan inspeksi & cleaning basic

---

## 3️⃣ System Context

Sampling buruk → analyzer error → process decision salah.

---

## 4️⃣ Diagram Literacy

- Jalur sampling lengkap
- Titik drain & purge

---

## 5️⃣ Preventive Checklist

1. Periksa filter
2. Cek leak fitting
3. Verifikasi heater operation
4. Periksa flowmeter
5. Dokumentasi kondisi line

---

## 6️⃣ Risk

Gas release saat membuka fitting.
Wajib isolasi & purge.

---

## 7️⃣ Data & Documentation

Catat:

- Flow rate
- Differential pressure filter
- Kondisi visual

---

## 1️⃣4️⃣ Competency Mapping

Preventive analyzer: W → I

---

# 📘 ARTIKEL 4

## Prinsip Kerja Gas Analyzer & Basic Gas Chromatograph (GC)

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Basic Theory

---

## 2️⃣ Learning Objective

- Menjelaskan prinsip dasar pengukuran komposisi gas
- Memahami konsep carrier gas pada GC
- Mengerti mengapa sampling harus stabil

---

## 3️⃣ System Context

Analyzer → DCS → Control / Quality Monitoring.

---

## 4️⃣ Diagram Literacy

- Basic GC flow path (Sample injection → Column → Detector → Vent)
- Signal output ke DCS

---

## 5️⃣ Basic Theory

- Separation berdasarkan waktu retensi
- Peran temperature control
- Importance of stable flow

---

## 6️⃣ Failure Illustration

Flow carrier gas tidak stabil → peak shifting → composition error.

---

## 7️⃣ Risk Awareness

Misinterpretasi data dapat menyebabkan keputusan operasi salah.

---

## 1️⃣4️⃣ Competency Mapping

Analyzer theory: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                              | Status |
| ------------------------------------ | ------ |
| Troubleshooting sistematis           | ✔      |
| Membaca diagram sampling & loop      | ✔      |
| Safety awareness                     | ✔      |
| Preventive & inspeksi                | ✔      |
| Interaksi Process–Instrument–Control | ✔      |
