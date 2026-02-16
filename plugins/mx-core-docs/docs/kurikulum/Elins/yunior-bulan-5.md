# 🔵 BULAN 5 – PLC & DCS Basic Awareness

(Level 1 – Junior ELINS)

---

- [🔵 BULAN 5 – PLC \& DCS Basic Awareness](#-bulan-5--plc--dcs-basic-awareness)
- [📘 ARTIKEL 17](#-artikel-17)
  - [PLC Kehilangan Komunikasi dengan Field Device – Investigasi Berbasis Loop \& Network Path](#plc-kehilangan-komunikasi-dengan-field-device--investigasi-berbasis-loop--network-path)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective)
  - [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
  - [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [7️⃣ Possible Causes](#7️⃣-possible-causes)
  - [8️⃣ Step-by-Step Investigation](#8️⃣-step-by-step-investigation)
  - [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
  - [🔟 Reference Standard \& Gap Analysis](#-reference-standard--gap-analysis)
  - [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
  - [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
  - [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [1️⃣5️⃣ Discussion Question](#1️⃣5️⃣-discussion-question)
  - [1️⃣6️⃣ Key Takeaway](#1️⃣6️⃣-key-takeaway)
- [📘 ARTIKEL 18](#-artikel-18)
  - [Analog Input Reading Tidak Sesuai di DCS – Validasi Field hingga Logic](#analog-input-reading-tidak-sesuai-di-dcs--validasi-field-hingga-logic)
- [📘 ARTIKEL 19](#-artikel-19)
  - [Backup \& Restore PLC Program – Awareness untuk Junior](#backup--restore-plc-program--awareness-untuk-junior)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [Learning Objective](#learning-objective)
  - [System Context](#system-context)
  - [Diagram Literacy](#diagram-literacy)
  - [Risk Section](#risk-section)
- [📘 ARTIKEL 20](#-artikel-20)
  - [Perbedaan PLC vs DCS \& Konsep Redundancy Dasar](#perbedaan-plc-vs-dcs--konsep-redundancy-dasar)
  - [System Context](#system-context-1)
  - [Diagram Literacy](#diagram-literacy-1)
  - [Failure Scenario](#failure-scenario)
  - [Risk Awareness](#risk-awareness)
- [📊 ALIGNMENT TERHADAP 5 OUTCOME](#-alignment-terhadap-5-outcome)
- [🎯 Evaluasi Template 2.0 pada Bulan 5](#-evaluasi-template-20-pada-bulan-5)

---

Total: 4 Outline Artikel
Semua sudah mengandung:

- System Context
- Diagram Literacy (Loop / Network / Cause & Effect)
- Cross-discipline interaction
- Safety awareness
- Data & trend interpretation

---

# 📘 ARTIKEL 17

## PLC Kehilangan Komunikasi dengan Field Device – Investigasi Berbasis Loop & Network Path

---

## 1️⃣ Informasi Umum

Disiplin: Instrumentation & Control
Level: Junior
Kategori: Troubleshooting
Equipment: PLC Panel – Remote I/O – Field Transmitter
Referensi:

- International Electrotechnical Commission
- IEEE

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Menjelaskan jalur komunikasi dari field device ke PLC
- Mengidentifikasi minimal 4 penyebab komunikasi loss
- Melakukan investigasi tanpa langsung restart PLC

---

## 3️⃣ System Context & Criticality

Pressure Transmitter → AI Module → PLC → DCS → Control Valve → Process Stability

Jika komunikasi hilang:

- DCS menampilkan bad signal
- Control valve bisa freeze position
- Potensi process upset

👉 Memahami interaksi Instrument–Control–Process.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Analisa berdasarkan:

Loop Diagram:

- 24VDC supply
- 4–20 mA signal path
- Terminal marshalling
- AI module channel

Network Diagram (jika remote I/O):

- PLC CPU → Communication module → Remote rack

Teknisi harus bisa menunjukkan:

- Titik supply
- Titik sinyal
- Titik komunikasi

---

## 5️⃣ Background & Failure Scenario

DCS alarm: “AI Channel Fault”
Nilai pressure menjadi 0
Tidak ada perubahan proses nyata

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Status channel fault

Terukur:

- 24V supply normal
- Signal 4–20 mA tidak terbaca

Asumsi awal:

- Transmitter rusak

---

## 7️⃣ Possible Causes

Electrical:

- Power supply drop
- Terminal loose

Instrument:

- Transmitter failure
- Impulse line blockage

Control:

- AI module failure
- Network communication loss

Human:

- Wiring salah setelah maintenance

---

## 8️⃣ Step-by-Step Investigation

1. Verifikasi 24V di transmitter
2. Ukur loop current di field
3. Periksa continuity cable
4. Swap channel test
5. Cek status communication LED

Decision logic:
Selalu mulai dari field menuju panel.

---

## 9️⃣ Root Cause & Contributing Factor

Root cause:
Loose terminal pada marshalling panel.

Contributing:
Tidak dilakukan torque verification saat pekerjaan sebelumnya.

---

## 🔟 Reference Standard & Gap Analysis

IEC wiring practice:
Terminal harus dikencangkan sesuai torque spec.

Gap:
Tidak ada checklist post-maintenance.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Kencangkan terminal

Permanent:

- Implementasikan post-work inspection checklist

Monitoring:

- Trend “bad signal” alarm frequency

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Risiko short circuit saat membuka panel
- Wajib LOTO sebelum buka marshalling

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Early warning:
Alarm intermittent sebelum total loss.

Trend review:
Frekuensi bad signal meningkat 3 hari terakhir.

---

## 1️⃣4️⃣ Competency Mapping

Loop troubleshooting:
W → Target I

Diagram reading:
A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa tidak langsung restart PLC?
2. Apa risiko loose terminal terhadap process safety?
3. Apa hubungan komunikasi loss dengan control valve?

---

## 1️⃣6️⃣ Key Takeaway

- Ikuti jalur sinyal
- Jangan langsung menyalahkan PLC
- 80% problem ada di wiring

---

# 📘 ARTIKEL 18

## Analog Input Reading Tidak Sesuai di DCS – Validasi Field hingga Logic

---

Fokus tambahan:

System Context:
Flow transmitter salah baca → control valve salah posisi → product off-spec.

Diagram Literacy:
Loop diagram + scaling configuration di PLC.

Possible Causes:

- Scaling error
- 4–20 mA drift
- Wrong range configuration

Trend Awareness:
Bandingkan data historian vs field gauge.

Outcome diperkuat:
Troubleshooting berbasis data & sistem.

---

# 📘 ARTIKEL 19

## Backup & Restore PLC Program – Awareness untuk Junior

---

## 1️⃣ Informasi Umum

Disiplin: Control
Kategori: Preventive
Level: Junior

Referensi:

- International Electrotechnical Commission

---

## Learning Objective

- Menjelaskan pentingnya backup sebelum modification
- Mengidentifikasi risiko kehilangan program

---

## System Context

PLC adalah logic controller utama.
Kehilangan program → unit shutdown total.

---

## Diagram Literacy

Basic PLC architecture:

- CPU
- I/O module
- Communication module

Teknisi harus tahu:
Program tersimpan di mana?
Bagaimana hubungan PLC–DCS?

---

## Risk Section

- Upload salah versi bisa menyebabkan plant trip
- Unauthorized modification risk

---

Outcome:
Safety + system awareness.

---

# 📘 ARTIKEL 20

## Perbedaan PLC vs DCS & Konsep Redundancy Dasar

---

## System Context

PLC:
Discrete & machine control

DCS:
Process control continuous

Interaksi:
PLC package compressor → signal ke DCS → interlock plant.

---

## Diagram Literacy

Architecture comparison:

PLC standalone
DCS distributed node

Redundancy concept:

- Redundant CPU
- Redundant power supply
- Redundant communication

---

## Failure Scenario

Primary CPU failure → sistem switch ke standby.

---

## Risk Awareness

Tidak semua PLC memiliki redundancy → single point failure.

---

# 📊 ALIGNMENT TERHADAP 5 OUTCOME

| Outcome                    | Status                   |
| -------------------------- | ------------------------ |
| Troubleshooting sistematis | ✔ Artikel 1 & 2          |
| Membaca loop/diagram       | ✔ Semua artikel          |
| Safety awareness           | ✔ Backup & panel safety  |
| Inspeksi mandiri           | ✔ Loop validation        |
| Interaksi E–I–C            | ✔ System Context section |

---

# 🎯 Evaluasi Template 2.0 pada Bulan 5

Template bekerja sangat baik untuk topik Control karena:

✔ Memaksa diagram literacy
✔ Menghindari “PLC reset culture”
✔ Mengajarkan system thinking
✔ Mengajarkan data validation
