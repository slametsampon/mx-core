# TEKNISI JUNIOR E&I

## 🔵 BULAN 12 – Integrated Case Study & Review

Fokus bulan ini:

- Integrasi Electrical–Instrumentation–Control
- Pola pikir sistem (system thinking)
- Penguatan troubleshooting sistematis
- Evaluasi efektivitas PM

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 12 – Integrated Case Study \& Review](#-bulan-12--integrated-case-study--review)
- [📘 ARTIKEL 1](#-artikel-1)
  - [Major Integrated Case: Motor Trip → Valve Malfunction → Plant Upset](#major-integrated-case-motor-trip--valve-malfunction--plant-upset)
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
  - [Review Efektivitas PM Program – Time Based atau Condition Based?](#review-efektivitas-pm-program--time-based-atau-condition-based)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-1)
  - [3️⃣ System Context](#3️⃣-system-context)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy)
  - [5️⃣ Review Framework](#5️⃣-review-framework)
  - [6️⃣ Gap Analysis](#6️⃣-gap-analysis)
  - [7️⃣ Improvement Proposal](#7️⃣-improvement-proposal)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 3](#-artikel-3)
  - [Root Cause Analysis (5 Why \& Fishbone) – Dasar untuk Teknisi Junior](#root-cause-analysis-5-why--fishbone--dasar-untuk-teknisi-junior)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Basic Theory](#5️⃣-basic-theory)
  - [6️⃣ Case Illustration](#6️⃣-case-illustration)
  - [7️⃣ Risk Awareness](#7️⃣-risk-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📊 FINAL ALIGNMENT – 12 BULAN JUNIOR E\&I](#-final-alignment--12-bulan-junior-ei)
- [🎯 HASIL AKHIR 1 TAHUN – JUNIOR E\&I](#-hasil-akhir-1-tahun--junior-ei)

---

# 📘 ARTIKEL 1

## Major Integrated Case: Motor Trip → Valve Malfunction → Plant Upset

---

## 1️⃣ Informasi Umum

Disiplin: Electrical, Instrumentation & Control (Integrated Case)
Level: Junior
Kategori: Major Case Study
Equipment: Motor Pump, Control Valve, PLC/DCS, Protection Relay

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Menelusuri kejadian secara sistematis lintas disiplin
- Membaca SLD, Loop Diagram, dan Cause & Effect secara terintegrasi
- Mengidentifikasi root cause teknis dan contributing factor sistemik

---

## 3️⃣ System Context & Criticality

Motor → Pump → Flow → Control Valve → Process Pressure → Interlock

Kejadian awal kecil dapat berkembang menjadi:

- Trip motor
- Control valve tidak stabil
- Pressure spike
- Unit upset

Kasus ini menguji pemahaman sistem secara menyeluruh.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi harus mampu membaca:

- Single Line Diagram (Motor feeder & protection)
- Loop Diagram (Flow transmitter & control valve)
- Cause & Effect (Interlock logic)

Harus mampu menunjukkan:

- Titik trip motor
- Jalur sinyal flow transmitter
- Interlock yang aktif

---

## 5️⃣ Background & Failure Scenario

Urutan kejadian:

1. Motor trip akibat overload
2. Flow turun drastis
3. Control valve membuka penuh
4. Pressure downstream naik
5. High pressure alarm aktif

Plant mengalami upset selama 30 menit.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Motor trip alarm
- Valve position 100%
- Flow low

Terukur:

- Arus motor naik sebelum trip
- Vibration sedikit meningkat

Asumsi awal:

- Motor rusak

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Overload setting terlalu rendah
- Voltage unbalance

Mechanical:

- Pump overload akibat blockage

Instrument:

- Flow transmitter error

Control:

- PID tuning agresif

Human:

- PM tidak dilakukan tepat waktu

---

## 8️⃣ Step-by-Step Investigation

1. Review timeline event log
2. Analisa arus motor sebelum trip
3. Cek vibration & bearing temperature
4. Verifikasi kondisi valve
5. Review histori PM

Decision logic:
Mulai dari trigger pertama (motor trip), bukan dari efek akhir.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Pump suction partially blocked → motor overload → trip.

Contributing factor:
Tidak ada inspeksi suction strainer periodik.

System factor:
Tidak ada monitoring trend arus untuk early warning.

---

## 🔟 Reference Standard & Gap Analysis

Best practice industri:
Trend monitoring & predictive maintenance harus aktif untuk rotating critical.

Gap:
PM hanya bersifat time-based tanpa data review.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Bersihkan suction line

Permanent:

- Tambahkan trend arus & vibration review bulanan
- Update PM checklist

System improvement:

- Buat alarm early overload warning

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Jangan reset trip tanpa investigasi
- Hindari bypass interlock tanpa izin formal

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Analisa:

- Arus naik gradual 10 hari sebelum trip
- Vibration naik 15%

Early warning terlewat karena tidak dianalisa.

---

## 1️⃣4️⃣ Competency Mapping

Integrated troubleshooting: W → I
System thinking: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa fokus pada event pertama penting?
2. Apa yang bisa mencegah kejadian ini?
3. Bagaimana peran trend dalam pencegahan?

---

## 1️⃣6️⃣ Key Takeaway

- Semua sistem saling terhubung
- Efek sering bukan penyebab
- Data historis adalah kunci pencegahan

---

# 📘 ARTIKEL 2

## Review Efektivitas PM Program – Time Based atau Condition Based?

---

## 1️⃣ Informasi Umum

Disiplin: E&I
Level: Junior
Kategori: Preventive & Review

---

## 2️⃣ Learning Objective

- Menilai efektivitas PM saat ini
- Mengidentifikasi gap dalam program PM
- Mengusulkan perbaikan sederhana berbasis data

---

## 3️⃣ System Context

PM tidak efektif → Failure berulang → Downtime meningkat.

---

## 4️⃣ Diagram Literacy

- Identifikasi equipment critical pada SLD & P&ID

---

## 5️⃣ Review Framework

1. Jumlah breakdown per tahun
2. Temuan berulang
3. Trend parameter tidak dianalisa
4. Item PM tidak relevan

---

## 6️⃣ Gap Analysis

Time-based tanpa data trend menyebabkan missed early warning.

---

## 7️⃣ Improvement Proposal

- Tambah trend review meeting bulanan
- Update checklist berdasarkan failure history

---

## 1️⃣4️⃣ Competency Mapping

PM evaluation awareness: A → W

---

# 📘 ARTIKEL 3

## Root Cause Analysis (5 Why & Fishbone) – Dasar untuk Teknisi Junior

---

## 1️⃣ Informasi Umum

Disiplin: E&I
Level: Junior
Kategori: Basic Theory

---

## 2️⃣ Learning Objective

- Menjelaskan metode 5 Why
- Menyusun fishbone sederhana
- Menghindari kesimpulan prematur

---

## 3️⃣ System Context

Tanpa RCA:

- Masalah berulang
- Solusi hanya bersifat sementara

---

## 4️⃣ Diagram Literacy

- Fishbone diagram (Man, Machine, Method, Material, Environment)

---

## 5️⃣ Basic Theory

5 Why:

- Menggali hingga akar masalah sistemik

Fishbone:

- Mengelompokkan faktor penyebab

---

## 6️⃣ Case Illustration

Motor trip → Kenapa?
Overload → Kenapa?
Pump overload → Kenapa?
Suction blocked → Kenapa?
Tidak ada inspeksi rutin.

---

## 7️⃣ Risk Awareness

Kesimpulan cepat tanpa data menyebabkan tindakan salah.

---

## 1️⃣4️⃣ Competency Mapping

RCA awareness: A → W

---

# 📊 FINAL ALIGNMENT – 12 BULAN JUNIOR E&I

| Outcome                                 | Status         |
| --------------------------------------- | -------------- |
| Troubleshooting sistematis              | ✔ Kuat         |
| Membaca SLD / Loop / C&E                | ✔ Konsisten    |
| Safety awareness                        | ✔ Terintegrasi |
| Preventive & inspeksi mandiri           | ✔              |
| Interaksi Electrical–Instrument–Control | ✔ Sangat kuat  |

---

# 🎯 HASIL AKHIR 1 TAHUN – JUNIOR E&I

Setelah 12 bulan:

Teknisi mampu:

- Melakukan troubleshooting dasar secara sistematis
- Membaca diagram utama plant
- Memahami interaksi lintas disiplin
- Melakukan inspeksi rutin dengan disiplin
- Berpartisipasi dalam RCA sederhana
