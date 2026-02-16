# TEKNISI JUNIOR E&I

## 🔵 BULAN 10 – Cable & Grounding System

Referensi utama:
IEEE – IEEE 80 (Grounding System Guide)

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 10 – Cable \& Grounding System](#-bulan-10--cable--grounding-system)
- [📘 ARTIKEL 36](#-artikel-36)
  - [Ground Fault pada Motor Feeder – Investigasi dari Insulation hingga Earthing System](#ground-fault-pada-motor-feeder--investigasi-dari-insulation-hingga-earthing-system)
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
- [📘 ARTIKEL 37](#-artikel-37)
  - [Signal Noise pada Analog Instrument – Masalah Ground Loop atau Shielding?](#signal-noise-pada-analog-instrument--masalah-ground-loop-atau-shielding)
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
- [📘 ARTIKEL 38](#-artikel-38)
  - [Inspection Cable Gland \& Termination – Preventive untuk Keandalan Sistem](#inspection-cable-gland--termination--preventive-untuk-keandalan-sistem)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Inspection Checklist](#5️⃣-inspection-checklist)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Data \& Documentation](#7️⃣-data--documentation)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📘 ARTIKEL 39](#-artikel-39)
  - [Earthing \& Bonding System Basic – Prinsip Proteksi Keselamatan](#earthing--bonding-system-basic--prinsip-proteksi-keselamatan)
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

# 📘 ARTIKEL 36

## Ground Fault pada Motor Feeder – Investigasi dari Insulation hingga Earthing System

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Troubleshooting
Equipment: Motor LV Feeder – MCC – Grounding System
Referensi: IEEE 80 awareness

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi penyebab ground fault pada motor feeder
- Membaca Single Line Diagram untuk jalur feeder
- Memahami hubungan insulation failure dengan sistem grounding

---

## 3️⃣ System Context & Criticality

Transformer → MCC → Motor Feeder → Motor

Ground fault dapat menyebabkan:

- Trip feeder
- Arc flash risk
- Damage winding
- Plant interruption

Interaksi lintas disiplin:
Insulation degradation (motor) ↔ Cable damage ↔ Protection relay ↔ Grounding grid.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Single Line Diagram (Feeder path)
- Basic earthing diagram (neutral grounding, body grounding)

Teknisi harus mampu menunjukkan:

- Jalur arus gangguan
- Titik grounding motor body
- Lokasi CT / relay proteksi

---

## 5️⃣ Background & Failure Scenario

Motor feeder trip dengan indikasi ground fault.
IR test menunjukkan nilai rendah pada salah satu fasa.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Breaker trip dengan ground fault indication

Terukur:

- IR fasa R ke ground rendah
- Cable temperature normal

Asumsi awal:

- Motor winding short

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Insulation breakdown motor
- Cable sheath damage

Mechanical:

- Vibration merusak cable support

Human:

- Cable gland tidak sealing sempurna

Environmental:

- Moisture ingress

---

## 8️⃣ Step-by-Step Investigation

1. Isolasi feeder sesuai LOTO
2. Lakukan IR test pada motor & cable terpisah
3. Visual inspection cable tray
4. Periksa gland & sealing
5. Verifikasi continuity grounding conductor

Decision logic:
Pisahkan motor dan cable untuk isolasi sumber fault.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Moisture masuk melalui cable gland yang tidak rapat.

Contributing:
Inspection gland tidak masuk PM rutin.

---

## 🔟 Reference Standard & Gap Analysis

IEEE 80 principle:
Grounding system harus menjamin arus fault mengalir aman ke tanah.

Gap:
Ground resistance tidak pernah diuji periodik.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Ganti gland & keringkan cable

Permanent:

- Tambahkan gland inspection checklist

Monitoring:

- IR trend tiap shutdown

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Arc flash hazard
- Jangan lakukan megger tanpa isolasi lengkap
- Gunakan PPE sesuai level energi

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- IR tahun lalu vs sekarang
- Lingkungan lembab vs kering

Early warning:
IR menurun perlahan sebelum trip.

---

## 1️⃣4️⃣ Competency Mapping

Ground fault troubleshooting: W → I
SLD reading: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa grounding penting saat terjadi fault?
2. Apa risiko jika grounding tidak baik?
3. Mengapa moisture sering menjadi penyebab utama?

---

## 1️⃣6️⃣ Key Takeaway

- Pisahkan motor dan cable saat investigasi
- Gland & sealing adalah titik kritis
- Grounding system menentukan keselamatan

---

# 📘 ARTIKEL 37

## Signal Noise pada Analog Instrument – Masalah Ground Loop atau Shielding?

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Mengidentifikasi penyebab noise pada 4–20 mA
- Membaca loop wiring diagram
- Memahami konsep single point grounding

---

## 3️⃣ System Context

Transmitter → Cable → Marshalling → AI Module → DCS

Signal noise menyebabkan:

- Fluktuasi PV
- Hunting control valve
- False alarm

---

## 4️⃣ Diagram Literacy

- Loop 2-wire transmitter
- Shield grounding point

Teknisi harus mampu menunjukkan:

- Titik grounding shield
- Jalur power & signal

---

## 5️⃣ Failure Scenario

Trend menunjukkan fluktuasi ±1 mA tanpa perubahan proses.

---

## 6️⃣ Possible Causes

Electrical:

- Ground loop
- Shield grounding di dua sisi

Mechanical:

- Cable dekat power cable

Human:

- Salah terminasi shield

---

## 7️⃣ Investigation

1. Periksa grounding shield (satu sisi saja)
2. Cek jarak cable power vs signal
3. Ukur ripple dengan multimeter
4. Lakukan temporary isolation test

---

## 8️⃣ Root Cause

Shield di-ground di dua sisi menyebabkan ground loop.

---

## 9️⃣ Risk

Noise dapat memicu false trip.

---

## 1️⃣3️⃣ Trend Awareness

Bandingkan:

- Noise sebelum & sesudah perbaikan
- Jam beban tinggi vs rendah

---

## 1️⃣4️⃣ Competency Mapping

Loop noise troubleshooting: W → I

---

# 📘 ARTIKEL 38

## Inspection Cable Gland & Termination – Preventive untuk Keandalan Sistem

---

## 1️⃣ Informasi Umum

Disiplin: Electrical & Instrumentation
Level: Junior
Kategori: Preventive

Referensi:
IEEE – IEEE 80 awareness

---

## 2️⃣ Learning Objective

- Mengidentifikasi tanda gland rusak
- Memahami pentingnya torque termination
- Menjelaskan risiko loose connection

---

## 3️⃣ System Context

Loose termination → Hotspot → Fault → Shutdown.

---

## 4️⃣ Diagram Literacy

- Identifikasi termination pada MCC & JB
- Jalur grounding conductor

---

## 5️⃣ Inspection Checklist

1. Visual crack pada gland
2. Seal ring condition
3. Torque terminal
4. Shield continuity
5. Label clarity

---

## 6️⃣ Risk

- Panel energized saat inspeksi
- Arc flash hazard

---

## 7️⃣ Data & Documentation

Catat:

- Panel name
- Temperature hotspot
- Tindakan koreksi

---

## 1️⃣4️⃣ Competency Mapping

Termination inspection: W → I

---

# 📘 ARTIKEL 39

## Earthing & Bonding System Basic – Prinsip Proteksi Keselamatan

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Basic Theory

Referensi:
IEEE – IEEE 80

---

## 2️⃣ Learning Objective

- Menjelaskan fungsi earthing & bonding
- Memahami perbedaan system grounding vs equipment grounding
- Menjelaskan konsep step & touch potential (awareness)

---

## 3️⃣ System Context

Grounding grid → Proteksi manusia & equipment saat fault.

---

## 4️⃣ Diagram Literacy

- Basic grounding grid
- Bonding motor frame ke earth

---

## 5️⃣ Basic Theory

- Fault current path
- Single point grounding principle
- Ground resistance concept

---

## 6️⃣ Failure Illustration

Grounding buruk → tegangan sentuh berbahaya.

---

## 7️⃣ Risk Awareness

Tanpa grounding baik:

- Shock hazard
- Protection tidak bekerja optimal

---

## 1️⃣4️⃣ Competency Mapping

Grounding awareness: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                         | Status   |
| ------------------------------- | -------- |
| Troubleshooting sistematis      | ✔        |
| Membaca SLD & loop              | ✔        |
| Safety awareness                | ✔ (kuat) |
| Preventive & inspeksi           | ✔        |
| Interaksi Electrical–Instrument | ✔        |
