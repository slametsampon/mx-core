# 🔵 BULAN 1 – FUNDAMENTAL ELECTRICAL SAFETY & MOTOR BASIC

(Level 1 – Junior ELINS)

---

- [🔵 BULAN 1 – FUNDAMENTAL ELECTRICAL SAFETY \& MOTOR BASIC](#-bulan-1--fundamental-electrical-safety--motor-basic)
- [📘 ARTIKEL 1](#-artikel-1)
  - [Motor LV Trip Saat Start – Investigasi Sistematis Berbasis Diagram \& Data](#motor-lv-trip-saat-start--investigasi-sistematis-berbasis-diagram--data)
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
  - [MCC Breaker Trip – Overload vs Short Circuit Analysis](#mcc-breaker-trip--overload-vs-short-circuit-analysis)
- [📘 ARTIKEL 3](#-artikel-3)
  - [Checklist Inspeksi Harian MCC \& Panel Distribusi Berbasis Risk](#checklist-inspeksi-harian-mcc--panel-distribusi-berbasis-risk)
- [📘 ARTIKEL 4](#-artikel-4)
  - [Dasar Proteksi Listrik \& ANSI Relay Code (50/51/27/59) dalam Konteks Sistem](#dasar-proteksi-listrik--ansi-relay-code-50512759-dalam-konteks-sistem)
- [📊 ALIGNMENT TERHADAP 5 OUTCOME](#-alignment-terhadap-5-outcome)

---

# 📘 ARTIKEL 1

## Motor LV Trip Saat Start – Investigasi Sistematis Berbasis Diagram & Data

---

## 1️⃣ Informasi Umum

Disiplin: Electrical
Level: Junior
Kategori: Troubleshooting
Equipment: Motor LV 75 kW – Pump Service
Referensi:

- NFPA
- IEEE

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi minimal 5 penyebab motor trip saat start
- Membaca jalur motor pada Single Line Diagram (SLD)
- Menjelaskan hubungan mechanical binding terhadap arus start

---

## 3️⃣ System Context & Criticality

Motor → Menggerakkan pump → Mengontrol flow → Mempengaruhi control valve → Mempengaruhi pressure transmitter → Bisa memicu interlock low flow.

Kegagalan motor dapat menyebabkan:

- Flow drop
- Process upset
- Trip downstream unit

👉 Menguatkan pemahaman interaksi Electrical–Instrument–Control.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Analisa berbasis SLD:

- Incoming feeder → MCC → Breaker → Overload relay → Motor
- Titik proteksi: ANSI 50/51
- Titik isolasi: MCC breaker

Teknisi harus mampu menunjukkan:

- Posisi proteksi
- Titik ukur ampere
- Jalur supply

---

## 5️⃣ Background & Failure Scenario

Motor 75 kW trip 3 detik setelah start.
Ampere naik hingga 6x FLA.
Tegangan drop 8%.
Tidak ada bunyi abnormal.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Trip alarm di DCS

Terukur:

- Arus inrush tinggi
- Tegangan drop sesaat

Asumsi operator:

- “Motor rusak”

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Undervoltage
- Shorted winding

Mechanical:

- Pump jammed
- Impeller fouling

Instrument:

- False current reading

Human:

- Setting overload terlalu rendah

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi overload setting
2. Cek SLD untuk upstream feeder load
3. Cek coupling free rotation
4. Ukur IR motor
5. Verifikasi voltage drop saat start

Decision logic:
Electrical diverifikasi sebelum membuka mechanical.

---

## 9️⃣ Root Cause & Contributing Factor

Root Cause:
Impeller fouling menyebabkan locked rotor condition.

Contributing:
Suction strainer tidak dibersihkan periodik.

---

## 🔟 Reference Standard & Gap Analysis

Menurut IEEE:
Setting overload harus 115–125% FLA.

Gap:
Setting ditemukan terlalu rendah (105%).

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Bersihkan impeller

Permanent:

- Review PM suction line

Monitoring:

- Trend arus start tiap bulan

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Arc flash risk saat buka panel
- Wajib LOTO
- Gunakan PPE sesuai NFPA 70E

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Parameter monitoring:

- Starting current
- Voltage drop
- Running ampere

Early warning:
Ampere naik perlahan dalam 2 minggu sebelum trip.

---

## 1️⃣4️⃣ Competency Mapping

Motor troubleshooting:
W → Target I

Diagram reading:
A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa arus tinggi tidak selalu berarti short circuit?
2. Apa risiko reset berulang?
3. Apa hubungan fouling dengan arus listrik?

---

## 1️⃣6️⃣ Key Takeaway

- Gunakan data sebelum asumsi
- Periksa mechanical sebelum menyalahkan electrical
- SLD adalah alat investigasi utama

---

# 📘 ARTIKEL 2

## MCC Breaker Trip – Overload vs Short Circuit Analysis

Fokus tambahan:

- Membaca kurva trip
- Memahami selective coordination
- Interaksi upstream–downstream protection

Tambahan penting pada versi ini:

Diagram Literacy:

- Interpretasi feeder coordination di SLD

System Interaction:

- Jika breaker upstream trip → multiple equipment shutdown

Trend Awareness:

- Repeated near-trip event sebelum failure

---

# 📘 ARTIKEL 3

## Checklist Inspeksi Harian MCC & Panel Distribusi Berbasis Risk

Tambahan versi 2.0:

System Context:

- Panel overheating dapat memicu trip instrument power supply

Diagram Literacy:

- Identifikasi busbar & feeder path

Data Section:

- Thermal scanning trend

Risk:

- Loose termination → arc flash potential

Outcome yang diperkuat:
Inspeksi mandiri & safety awareness.

---

# 📘 ARTIKEL 4

## Dasar Proteksi Listrik & ANSI Relay Code (50/51/27/59) dalam Konteks Sistem

Tambahan versi 2.0:

System Context:

- Undervoltage dapat menyebabkan false instrument reading

Diagram Literacy:

- Identifikasi relay location pada SLD

Failure Scenario:

- Plant load tinggi → undervoltage → motor trip → low flow interlock

Trend Awareness:

- Voltage trending pada peak load

---

# 📊 ALIGNMENT TERHADAP 5 OUTCOME

| Outcome                    | Status               |
| -------------------------- | -------------------- |
| Troubleshooting sistematis | ✔ Kuat               |
| Membaca SLD & diagram      | ✔ Ada section wajib  |
| Safety awareness           | ✔ Dedicated section  |
| Inspeksi mandiri           | ✔ Artikel 3          |
| Interaksi E–I–C            | ✔ Ada System Context |
