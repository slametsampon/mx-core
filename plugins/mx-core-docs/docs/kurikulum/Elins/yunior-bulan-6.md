# TEKNISI JUNIOR E&I

## 🔵 BULAN 6 – Transformer & Power Distribution

Referensi utama:
IEEE – IEEE C57 (Transformer Guide)

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 6 – Transformer \& Power Distribution](#-bulan-6--transformer--power-distribution)
- [📘 ARTIKEL 1](#-artikel-1)
  - [Transformer Overheating Alarm – Investigasi Beban, Pendinginan, atau Fault Internal?](#transformer-overheating-alarm--investigasi-beban-pendinginan-atau-fault-internal)
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
  - [Unbalance Voltage pada Panel Distribusi – Dampaknya ke Motor \& Equipment](#unbalance-voltage-pada-panel-distribusi--dampaknya-ke-motor--equipment)
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
  - [Visual Inspection \& Thermography Awareness pada Transformer \& Panel](#visual-inspection--thermography-awareness-pada-transformer--panel)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Inspection Checklist](#5️⃣-inspection-checklist)
  - [6️⃣ Risk](#6️⃣-risk)
  - [7️⃣ Data \& Documentation](#7️⃣-data--documentation)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📘 ARTIKEL 4](#-artikel-4)
  - [Basic Transformer Operation \& Protection Concept](#basic-transformer-operation--protection-concept)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-3)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-3)
  - [3️⃣ System Context](#3️⃣-system-context-2)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-2)
  - [5️⃣ Failure Illustration](#5️⃣-failure-illustration)
  - [6️⃣ Risk Awareness](#6️⃣-risk-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-3)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 1

## Transformer Overheating Alarm – Investigasi Beban, Pendinginan, atau Fault Internal?

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Troubleshooting
Equipment: Power Transformer 20 kV / 400 V (Oil Immersed)
Referensi: IEEE C57 – Transformer Loading & Temperature Guide

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi minimal 5 penyebab transformer overheating
- Membaca jalur transformer pada Single Line Diagram (SLD)
- Membedakan overheating akibat overload vs masalah pendinginan

---

## 3️⃣ System Context & Criticality

Incoming MV → Transformer → LV Switchboard → MCC → Motor & Instrument Load

Overheating dapat menyebabkan:

- Oil degradation
- Insulation aging
- Trip upstream protection
- Plant shutdown total

Interaksi lintas disiplin:
Beban motor ↑ → Arus LV ↑ → Temperatur trafo ↑ → Alarm DCS.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Menggunakan:

- Single Line Diagram (MV feeder → Transformer → LV bus)
- Indikasi lokasi temperature sensor (OTI / WTI)

Teknisi harus mampu menunjukkan:

- Posisi proteksi trafo
- Jalur beban terbesar
- Titik pengukuran temperatur

---

## 5️⃣ Background & Failure Scenario

Alarm OTI menunjukkan 95°C (normal <85°C).
Beban LV 92% rated capacity.
Ambient temperature tinggi.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Radiator panas
- Cooling fan tidak beroperasi

Terukur:

- Arus mendekati rating
- Tegangan normal

Asumsi awal:

- Transformer rusak internal

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Overload
- Voltage unbalance

Mechanical:

- Cooling fan failure
- Radiator blocked

Instrument:

- Faulty temperature sensor

Human:

- Beban tambahan tanpa evaluasi kapasitas

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi beban total LV
2. Cek status cooling fan & control circuit
3. Cek oil level & kondisi visual
4. Bandingkan OTI vs WTI
5. Review histori beban harian

Decision logic:
Validasi cooling system sebelum menyimpulkan fault internal.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Cooling fan tidak aktif akibat MCB auxiliary trip.

Contributing:
Tidak ada inspeksi fan rutin.

---

## 🔟 Reference Standard & Gap Analysis

IEEE C57 guidance:
Operating temperature harus dalam limit desain untuk menjaga insulation life.

Gap:
Fan inspection tidak masuk checklist preventive.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Reset/repair fan circuit

Permanent:

- Tambahkan fan operational check pada PM

Monitoring:

- Trend temperature vs load

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko arc flash pada panel LV
- Risiko oil spill jika overheating ekstrem
- Wajib PPE & LOTO sebelum inspeksi internal

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Bandingkan:

- Trend load vs temperature
- Peak load hour vs ambient temperature

Early warning:
Temperature naik gradual 1 minggu sebelum alarm.

---

## 1️⃣4️⃣ Competency Mapping

Transformer troubleshooting: W → I
SLD reading: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa overload 90% bisa tetap aman tetapi suhu tinggi?
2. Apa dampak jangka panjang suhu tinggi pada insulation?
3. Bagaimana membedakan sensor error vs overheating nyata?

---

## 1️⃣6️⃣ Key Takeaway

- Pendinginan sama pentingnya dengan beban
- Gunakan trend sebelum menyimpulkan fault internal
- IEEE C57 menjadi referensi batas operasi

---

# 📘 ARTIKEL 2

## Unbalance Voltage pada Panel Distribusi – Dampaknya ke Motor & Equipment

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Troubleshooting

---

## 2️⃣ Learning Objective

- Menghitung persentase voltage unbalance
- Memahami dampak unbalance terhadap motor
- Membaca SLD panel distribusi

---

## 3️⃣ System Context

Panel LV → Motor & Load → Arus tidak seimbang → Heating pada motor.

---

## 4️⃣ Diagram Literacy

- Distribusi 3 fasa dari transformer ke panel
- Identifikasi feeder beban besar

---

## 5️⃣ Failure Scenario

Tegangan:
R = 400 V
S = 390 V
T = 410 V

Motor overheating terjadi di beberapa unit.

---

## 6️⃣ Possible Causes

Electrical:

- Single phase load dominan
- Loose connection

Mechanical:

- Tidak relevan (dibedakan dari overheating mekanis)

Human:

- Penambahan load tidak seimbang

---

## 7️⃣ Investigation

1. Hitung % voltage unbalance
2. Periksa koneksi busbar
3. Identifikasi distribusi beban per fasa
4. Cek arus tiap fasa

---

## 8️⃣ Root Cause

Distribusi beban tidak merata antar fasa.

---

## 9️⃣ Risk

Voltage unbalance 3–5% dapat meningkatkan arus hingga 20%.

---

## 1️⃣3️⃣ Trend Awareness

Pantau:

- Voltage per fasa
- Arus per fasa

---

## 1️⃣4️⃣ Competency Mapping

Power distribution awareness: W → I

---

# 📘 ARTIKEL 3

## Visual Inspection & Thermography Awareness pada Transformer & Panel

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Preventive

Referensi: IEEE C57 awareness

---

## 2️⃣ Learning Objective

- Mengidentifikasi hotspot secara visual
- Memahami dasar thermography

---

## 3️⃣ System Context

Loose termination → Hotspot → Failure → Shutdown.

---

## 4️⃣ Diagram Literacy

- Identifikasi titik sambungan kritis pada SLD

---

## 5️⃣ Inspection Checklist

1. Oil leakage
2. Discoloration
3. Abnormal sound
4. Thermography scan point
5. Busbar joint temperature

---

## 6️⃣ Risk

- Arc flash saat membuka panel
- Jangan buka panel tanpa izin

---

## 7️⃣ Data & Documentation

Bandingkan thermal image tahun ini vs sebelumnya.

---

## 1️⃣4️⃣ Competency Mapping

Inspection skill: W → I

---

# 📘 ARTIKEL 4

## Basic Transformer Operation & Protection Concept

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Basic Theory

Referensi:
IEEE – IEEE C57

---

## 2️⃣ Learning Objective

- Menjelaskan prinsip induksi elektromagnetik
- Memahami fungsi OTI, WTI, dan protection relay dasar
- Memahami hubungan beban vs temperature

---

## 3️⃣ System Context

Transformer sebagai pusat distribusi energi plant.

---

## 4️⃣ Diagram Literacy

- Core & winding basic diagram
- Posisi relay proteksi

---

## 5️⃣ Failure Illustration

Overload jangka panjang → insulation aging → short circuit.

---

## 6️⃣ Risk Awareness

Overheating berulang mempercepat aging insulation.

---

## 1️⃣4️⃣ Competency Mapping

Transformer theory: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                     | Status |
| --------------------------- | ------ |
| Troubleshooting sistematis  | ✔      |
| Membaca SLD                 | ✔      |
| Safety awareness            | ✔      |
| Preventive & inspeksi       | ✔      |
| Interaksi beban–motor–trafo | ✔      |
