# TEKNISI JUNIOR E&I

## 🔵 BULAN 8 – Safety Instrumented System (SIS) Awareness

Referensi utama:
International Electrotechnical Commission – IEC 61511 (Functional Safety – Process Industry)

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 8 – Safety Instrumented System (SIS) Awareness](#-bulan-8--safety-instrumented-system-sis-awareness)
- [📘 ARTIKEL 1](#-artikel-1)
  - [ESD Valve Gagal Close Saat Test – Investigasi dari Logic hingga Actuator](#esd-valve-gagal-close-saat-test--investigasi-dari-logic-hingga-actuator)
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
  - [False Trip pada Safety Loop – Sensor Fault atau Logic Issue?](#false-trip-pada-safety-loop--sensor-fault-atau-logic-issue)
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
  - [Proof Test Awareness \& Dokumentasi Sesuai IEC 61511](#proof-test-awareness--dokumentasi-sesuai-iec-61511)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Procedure Outline (Awareness)](#5️⃣-procedure-outline-awareness)
  - [6️⃣ Documentation Requirement](#6️⃣-documentation-requirement)
  - [7️⃣ Risk](#7️⃣-risk)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📘 ARTIKEL 4](#-artikel-4)
  - [Perbedaan BPCS vs SIS \& Konsep Dasar SIL](#perbedaan-bpcs-vs-sis--konsep-dasar-sil)
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

## ESD Valve Gagal Close Saat Test – Investigasi dari Logic hingga Actuator

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control (SIS)
Level: Junior
Kategori: Troubleshooting
Equipment: ESD Valve + Logic Solver + Field Device
Referensi: IEC 61511 awareness

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi penyebab ESD valve gagal close saat test
- Membaca Cause & Effect diagram dasar
- Memahami interaksi antara logic solver dan final element

---

## 3️⃣ System Context & Criticality

Process Parameter → SIS Logic Solver → ESD Valve → Risk Mitigation

Jika ESD valve gagal close:

- Fungsi proteksi tidak berjalan
- Potensi major accident hazard

Interaksi lintas disiplin:
Sensor (instrument) → Logic (SIS) → Actuator (mechanical) → Proses.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Cause & Effect Diagram
- Loop diagram ESD valve
- Pneumatic supply path

Teknisi harus mampu menunjukkan:

- Sumber trigger trip
- Jalur sinyal ke logic solver
- Jalur udara ke actuator

---

## 5️⃣ Background & Failure Scenario

Saat proof test, ESD valve tidak bergerak meskipun trip command aktif.
DCS menunjukkan “Trip Active”.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Solenoid valve tidak mengeluarkan udara

Terukur:

- Output logic berubah
- Air pressure normal di header

Asumsi awal:

- Valve macet

---

## 7️⃣ Possible Causes (Structured)

Instrument:

- Solenoid valve coil failure
- Wiring open circuit

Control:

- Output card failure

Mechanical:

- Actuator diaphragm bocor
- Stem jam

Human:

- Bypass belum dikembalikan normal

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi status bypass di panel SIS
2. Cek output voltage ke solenoid
3. Cek resistance coil
4. Cek air supply lokal
5. Lakukan manual stroke test

Decision logic:
Validasi logic output sebelum membongkar actuator.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Solenoid valve coil open circuit.

Contributing:
Tidak ada inspeksi coil resistance periodik.

---

## 🔟 Reference Standard & Gap Analysis

IEC 61511:
Final element reliability sangat krusial untuk Safety Function.

Gap:
Proof test tidak mencakup pengecekan electrical coil resistance.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Ganti solenoid coil

Permanent:

- Tambahkan coil resistance check dalam proof test

Monitoring:

- Catat response time valve setiap test

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Jangan bypass SIS tanpa izin formal
- Wajib permit & komunikasi dengan operasi
- Pastikan sistem dalam kondisi aman sebelum test

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- Response time historis vs saat ini
- Frekuensi kegagalan solenoid sebelumnya

Early warning:
Response time meningkat sebelum gagal total.

---

## 1️⃣4️⃣ Competency Mapping

SIS troubleshooting: W → I
Cause & Effect reading: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa bypass berbahaya jika tidak dikontrol?
2. Apa dampak satu solenoid gagal pada fungsi SIL?
3. Mengapa proof test harus terdokumentasi?

---

## 1️⃣6️⃣ Key Takeaway

- SIS adalah lapisan proteksi terakhir
- Validasi logic & output sebelum membongkar mekanis
- Dokumentasi test sama pentingnya dengan test itu sendiri

---

# 📘 ARTIKEL 2

## False Trip pada Safety Loop – Sensor Fault atau Logic Issue?

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control (SIS)
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab false trip
- Membaca voting configuration dasar (1oo1, 1oo2)
- Membedakan sensor drift vs genuine trip

---

## 3️⃣ System Context

Process Parameter → Sensor → Logic Solver → Trip

False trip menyebabkan:

- Production loss
- Operator distrust terhadap sistem safety

---

## 4️⃣ Diagram Literacy

- Voting logic sederhana
- Jalur input sensor ke logic solver

---

## 5️⃣ Failure Scenario

Plant trip akibat high pressure alarm, namun field gauge normal.

---

## 6️⃣ Possible Causes

Instrument:

- Sensor drift
- Wiring loose

Control:

- Logic configuration error

Human:

- Maintenance bypass tidak dilepas

---

## 7️⃣ Investigation

1. Cross-check field gauge
2. Review historian trend
3. Cek sensor calibration
4. Verifikasi logic configuration

---

## 8️⃣ Root Cause

Pressure transmitter drift akibat impulse line blockage.

---

## 9️⃣ Risk

Repeated false trip → operator mengabaikan alarm nyata.

---

## 1️⃣3️⃣ Trend Awareness

Analisa:

- Frekuensi trip per bulan
- Sensor drift pattern

---

## 1️⃣4️⃣ Competency Mapping

Safety loop analysis: W → I

---

# 📘 ARTIKEL 3

## Proof Test Awareness & Dokumentasi Sesuai IEC 61511

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation (SIS)
Level: Junior
Kategori: Preventive

Referensi:
International Electrotechnical Commission – IEC 61511

---

## 2️⃣ Learning Objective

- Menjelaskan tujuan proof test
- Memahami interval proof test
- Melakukan dokumentasi hasil test

---

## 3️⃣ System Context

Proof test memastikan Safety Instrumented Function tetap andal.

---

## 4️⃣ Diagram Literacy

- Identify sensor–logic–final element dalam satu SIF

---

## 5️⃣ Procedure Outline (Awareness)

1. Persiapan & komunikasi operasi
2. Bypass sesuai prosedur
3. Simulasi trip
4. Verifikasi valve close
5. Restore system

---

## 6️⃣ Documentation Requirement

- Test date
- Result
- Response time
- Anomaly

---

## 7️⃣ Risk

Sistem tidak direstore → kehilangan proteksi.

---

## 1️⃣4️⃣ Competency Mapping

Proof test execution: W → I

---

# 📘 ARTIKEL 4

## Perbedaan BPCS vs SIS & Konsep Dasar SIL

---

## 1️⃣ Informasi Umum

Disiplin: Control
Level: Junior
Kategori: Basic Theory

Referensi:
International Electrotechnical Commission – IEC 61511

---

## 2️⃣ Learning Objective

- Menjelaskan perbedaan BPCS dan SIS
- Memahami konsep SIL secara dasar
- Mengerti mengapa redundancy penting

---

## 3️⃣ System Context

BPCS = Control
SIS = Protection

Keduanya bekerja independen.

---

## 4️⃣ Diagram Literacy

- Diagram sederhana BPCS vs SIS architecture
- Jalur sensor terpisah

---

## 5️⃣ Basic Theory

- SIL = Risk Reduction Level
- Voting logic sederhana
- Independence requirement

---

## 6️⃣ Failure Illustration

Jika BPCS gagal → SIS harus tetap bekerja.

---

## 7️⃣ Risk Awareness

Menggabungkan BPCS & SIS tanpa independensi meningkatkan risiko.

---

## 1️⃣4️⃣ Competency Mapping

SIL awareness: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                                 | Status   |
| --------------------------------------- | -------- |
| Troubleshooting sistematis              | ✔        |
| Membaca C&E & loop                      | ✔        |
| Safety awareness                        | ✔ (kuat) |
| Preventive & dokumentasi                | ✔        |
| Interaksi Instrument–Control–Mechanical | ✔        |
