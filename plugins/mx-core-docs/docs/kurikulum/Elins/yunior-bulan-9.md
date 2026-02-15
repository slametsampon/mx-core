# TEKNISI JUNIOR E&I

## 🔵 BULAN 9 – Shutdown Preparation

Fokus bulan ini:

- Awareness persiapan teknis sebelum shutdown
- Integrasi Electrical–Instrumentation–Control
- Risk discipline sebelum pekerjaan besar

---

- [TEKNISI JUNIOR E\&I](#teknisi-junior-ei)
  - [🔵 BULAN 9 – Shutdown Preparation](#-bulan-9--shutdown-preparation)
- [📘 ARTIKEL 1](#-artikel-1)
  - [Temuan Umum Saat Pre-Shutdown Inspection – Identifikasi Awal Sebelum Unit Dimatikan](#temuan-umum-saat-pre-shutdown-inspection--identifikasi-awal-sebelum-unit-dimatikan)
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
  - [Penyusunan Checklist Shutdown E\&I – Struktur \& Prioritas](#penyusunan-checklist-shutdown-ei--struktur--prioritas)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-1)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-1)
  - [3️⃣ System Context](#3️⃣-system-context)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy)
  - [5️⃣ Struktur Checklist Dasar](#5️⃣-struktur-checklist-dasar)
  - [6️⃣ Risk Classification](#6️⃣-risk-classification)
  - [7️⃣ Documentation Requirement](#7️⃣-documentation-requirement)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-1)
- [📘 ARTIKEL 3](#-artikel-3)
  - [Risk Assessment Dasar (JSA) untuk Pekerjaan Shutdown](#risk-assessment-dasar-jsa-untuk-pekerjaan-shutdown)
  - [1️⃣ Informasi Umum](#1️⃣-informasi-umum-2)
  - [2️⃣ Learning Objective](#2️⃣-learning-objective-2)
  - [3️⃣ System Context](#3️⃣-system-context-1)
  - [4️⃣ Diagram Literacy](#4️⃣-diagram-literacy-1)
  - [5️⃣ Basic Theory – JSA Structure](#5️⃣-basic-theory--jsa-structure)
  - [6️⃣ Contoh Hazard E\&I Shutdown](#6️⃣-contoh-hazard-ei-shutdown)
  - [7️⃣ Risk Awareness](#7️⃣-risk-awareness)
  - [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping-2)
- [📊 ALIGNMENT DENGAN OUTCOME JUNIOR](#-alignment-dengan-outcome-junior)

---

# 📘 ARTIKEL 1

## Temuan Umum Saat Pre-Shutdown Inspection – Identifikasi Awal Sebelum Unit Dimatikan

---

## 1️⃣ Informasi Umum

Disiplin: Electrical & Instrumentation
Level: Junior
Kategori: Troubleshooting Case (Pre-Shutdown)
Equipment: MCC, Transformer, Field Instrument, Control Valve, Analyzer

---

## 2️⃣ Learning Objective

Setelah membaca artikel ini, teknisi mampu:

- Mengidentifikasi temuan umum saat pre-shutdown inspection
- Mengklasifikasikan temuan: critical vs non-critical
- Membaca SLD, loop diagram, dan P&ID untuk menentukan scope kerja

---

## 3️⃣ System Context & Criticality

Shutdown adalah momen:

- Isolasi energi
- Pembongkaran equipment
- Testing safety system
- Major maintenance

Kesalahan identifikasi awal dapat menyebabkan:

- Overrun schedule
- Safety incident
- Rework setelah startup

Interaksi lintas disiplin:
Electrical isolation ↔ Instrument isolation ↔ Mechanical opening ↔ Safety permit.

---

## 4️⃣ Diagram Literacy Section (WAJIB)

Teknisi harus mampu membaca:

- Single Line Diagram (untuk isolasi feeder)
- Loop Diagram (untuk isolasi signal & power)
- P&ID (untuk valve & tapping point)

Wajib mampu menunjukkan:

- Titik isolasi energi
- Titik bypass
- Titik drain & vent

---

## 5️⃣ Background & Failure Scenario

Saat pre-shutdown inspection ditemukan:

- MCC termination panas
- Impulse line corrosion
- Valve positioner response lambat
- Analyzer sampling filter hampir tersumbat

Namun belum ada alarm aktif.

---

## 6️⃣ Symptom & Initial Finding

Terlihat:

- Discoloration pada busbar joint
- Leakage kecil di impulse fitting

Terukur:

- Thermography hotspot
- Response time valve > normal

---

## 7️⃣ Possible Causes (Structured)

Electrical:

- Loose termination
- Overload intermittent

Instrument:

- Aging tubing
- Drift transmitter

Mechanical:

- Packing wear
- Vibration impact

Human:

- PM interval tidak disiplin

---

## 8️⃣ Step-by-Step Investigation

1. Dokumentasikan temuan visual
2. Validasi dengan pengukuran (thermal, vibration, IR test)
3. Tentukan prioritas perbaikan
4. Update shutdown scope list
5. Koordinasi dengan planner

Decision logic:
Prioritaskan item yang berdampak ke safety & startup reliability.

---

## 9️⃣ Root Cause & Contributing Factor

Sebagian besar temuan berasal dari:

- PM interval tidak optimal
- Tidak ada trend review sebelum shutdown

---

## 🔟 Reference Standard & Gap Analysis

Best practice industri:
Pre-shutdown inspection minimal 2–4 minggu sebelum shutdown.

Gap:
Belum ada checklist formal pre-shutdown E&I.

---

## 1️⃣1️⃣ Corrective & Preventive Action

Immediate:

- Masukkan temuan ke shutdown scope

Permanent:

- Buat pre-shutdown inspection program rutin

Monitoring:

- Track jumlah temuan per shutdown

---

## 1️⃣2️⃣ Risk & Safety Reflection

- Pastikan tidak membuka equipment sebelum isolasi energi
- Hindari pekerjaan tambahan tanpa risk review

---

## 1️⃣3️⃣ Data Interpretation & Trend Awareness

Analisa:

- Hotspot trend 6 bulan terakhir
- Alarm frequency
- Valve response time trend

---

## 1️⃣4️⃣ Competency Mapping

Pre-shutdown awareness: W → I
Scope identification: A → W

---

## 1️⃣5️⃣ Discussion Question

1. Mengapa temuan kecil sebelum shutdown bisa menjadi besar saat startup?
2. Bagaimana menentukan prioritas pekerjaan?
3. Apa risiko pekerjaan tambahan tanpa perencanaan?

---

## 1️⃣6️⃣ Key Takeaway

- Shutdown dimulai jauh sebelum unit dimatikan
- Dokumentasi temuan sangat penting
- Data trend adalah dasar penentuan scope

---

# 📘 ARTIKEL 2

## Penyusunan Checklist Shutdown E&I – Struktur & Prioritas

---

## 1️⃣ Informasi Umum

Disiplin: Electrical & Instrumentation
Level: Junior
Kategori: Preventive / Planning

---

## 2️⃣ Learning Objective

- Menyusun checklist shutdown dasar
- Mengelompokkan pekerjaan Electrical vs Instrument
- Memahami dependensi pekerjaan lintas disiplin

---

## 3️⃣ System Context

Shutdown melibatkan:

- Isolasi energi
- Pembongkaran & inspeksi
- Testing & commissioning

Tanpa checklist:

- Risiko item terlewat
- Startup delay

---

## 4️⃣ Diagram Literacy

- Identifikasi feeder pada SLD untuk isolasi
- Identifikasi loop kritis pada C&E

---

## 5️⃣ Struktur Checklist Dasar

Electrical:

- IR test motor
- Termination tightening
- Thermography

Instrumentation:

- Calibration critical transmitter
- Stroke test control valve
- Proof test SIS

Control:

- Backup PLC/DCS
- Alarm review

---

## 6️⃣ Risk Classification

Tandai setiap item:

- Safety critical
- Reliability critical
- Improvement

---

## 7️⃣ Documentation Requirement

Checklist harus mencakup:

- Equipment tag
- Scope
- PIC
- Status

---

## 1️⃣4️⃣ Competency Mapping

Shutdown checklist preparation: A → W

---

# 📘 ARTIKEL 3

## Risk Assessment Dasar (JSA) untuk Pekerjaan Shutdown

---

## 1️⃣ Informasi Umum

Disiplin: E&I
Level: Junior
Kategori: Basic Theory & Safety

---

## 2️⃣ Learning Objective

- Menjelaskan konsep dasar JSA
- Mengidentifikasi hazard pekerjaan E&I
- Mengusulkan kontrol risiko sederhana

---

## 3️⃣ System Context

Shutdown meningkatkan:

- Jumlah pekerjaan simultan
- Paparan energi berbahaya
- Potensi konflik pekerjaan

---

## 4️⃣ Diagram Literacy

- Identifikasi titik energi pada SLD
- Identifikasi titik tekanan pada P&ID

---

## 5️⃣ Basic Theory – JSA Structure

1. Identifikasi pekerjaan
2. Identifikasi bahaya
3. Penilaian risiko
4. Tindakan pengendalian

---

## 6️⃣ Contoh Hazard E&I Shutdown

Electrical:

- Arc flash

Instrument:

- Gas release

Mechanical:

- Stored pressure

Human:

- Miscommunication

---

## 7️⃣ Risk Awareness

Tanpa JSA:

- Bypass safety system
- LOTO tidak lengkap

---

## 1️⃣4️⃣ Competency Mapping

Risk assessment awareness: A → W

---

# 📊 ALIGNMENT DENGAN OUTCOME JUNIOR

| Outcome                    | Status   |
| -------------------------- | -------- |
| Troubleshooting sistematis | ✔        |
| Membaca SLD, P&ID, C&E     | ✔        |
| Safety awareness           | ✔ (kuat) |
| Preventive & planning      | ✔        |
| Interaksi lintas disiplin  | ✔        |
