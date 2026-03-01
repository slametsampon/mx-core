**MASTER WRITING TEMPLATE – CREG Sub-Clause Standard Format** yang dapat digunakan untuk seluruh sub-bab dalam 14 bab CREG.

Template ini dirancang agar setiap klausul:

- Defensible secara regulator & insurer
- Konsisten lintas disiplin
- Audit-ready
- Lifecycle enforceable
- Tidak vendor-driven
- Berlaku untuk SMR, hydrogenation, distillation, flammable storage

Template ini adalah **kerangka satu halaman baku** yang harus dipakai secara identik untuk semua sub-bab.

---

# COMPANY RISK ENGINEERING GUIDELINE (CREG)

## Sub-Clause Writing Template

---

## 1. INTENT

**Tujuan teknis spesifik dari klausul ini.**

Harus menjawab:

- Hazard apa yang dikendalikan?
- Failure mechanism apa yang dicegah?
- Sistem apa yang terdampak (process, mechanical, electrical, instrument, control)?
- Apakah ini terkait catastrophic risk, major loss, atau asset integrity?

Format penulisan:

> “Klausul ini bertujuan untuk mencegah **\_\_** akibat **\_\_** sehingga tidak berkembang menjadi **\_\_**.”

Tidak boleh normatif. Tidak boleh generik.

---

## 2. RISK CONTEXT & FAILURE MECHANISM

### 2.1 Root Physical Mechanism

- Jelaskan mekanisme fisik (overpressure, runaway, flame instability, embrittlement, overflow, dll.)
- Beban/stress dominan
- Mode operasi yang relevan (startup, upset, shutdown)

### 2.2 Initiating Causes

- Mechanical
- Electrical
- Instrument
- Human error
- Utility failure

### 2.3 Escalation Path

Tuliskan rantai sebab–akibat:

Initiating Event → Process Deviation → Protection Failure → Consequence → Escalation

Harus eksplisit dan teknis.

---

## 3. REQUIREMENT (NORMATIVE – SHALL)

Semua kalimat menggunakan “shall”.

### 3.1 Functional Requirement

Contoh:

- “System shall provide automatic isolation…”
- “Logic solver shall be independent…”

### 3.2 Performance Requirement

- SIL minimum (jika berlaku)
- Response time
- Redundancy
- Diagnostic coverage

### 3.3 Independence Requirement

- No shared CPU
- No shared power upstream breaker
- No shared I/O
- Network segregation
- No common cause domain

### 3.4 Lifecycle Requirement

- Proof test interval
- KPI monitoring
- MOC trigger
- Revalidation trigger

Tidak boleh ada requirement tanpa parameter yang dapat diuji.

---

## 4. RATIONALE (TECHNICAL JUSTIFICATION)

Menjelaskan mengapa requirement tersebut wajib.

Harus mencakup:

- Hubungan ke failure mechanism
- Dampak jika requirement tidak dipenuhi
- Interaksi lintas disiplin
- Referensi standar internasional

Contoh referensi:

- IEC 61511 (lifecycle & independence)
- IEC 61508 (hardware integrity)
- IEC 62682 (alarm performance)
- CCPS LOPA
- API 521 (overpressure)
- API 2350 (overfill)
- API 556 (fired heater)
- FM Global Data Sheet
- NFPA 30

Penulisan harus berbasis engineering, bukan opini.

---

## 5. ACCEPTANCE CRITERIA

Ini adalah bagian paling kritis untuk defensibility.

Harus menjawab: “Bagaimana auditor tahu ini comply?”

Minimal mencakup:

### 5.1 Design Compliance

- Diagram segregasi tersedia
- Calculation tersedia
- PFDavg within SIL range
- Valve closing time validated

### 5.2 Operational Compliance

- Proof test completed
- Overdue < threshold %
- Alarm KPI within limit
- Bypass duration < max allowed

### 5.3 Performance KPI

- Spurious trip rate threshold
- Demand rate threshold
- Alarm flood index threshold

Semua harus kuantitatif.

---

## 6. EVIDENCE & RECORDS

Daftar artefak yang wajib tersedia:

- HAZOP reference
- LOPA worksheet
- SRS
- SIL verification report
- Cause & Effect matrix
- Proof test procedure
- Proof test record
- MOC record (jika applicable)
- Segregation checklist
- KPI report

Tambahkan:

Traceability mapping:
Deviation ID → LOPA ID → SIF ID → SRS Clause → Verification → Test → KPI.

Tanpa evidence, klausul dianggap tidak defensible.

---

## 7. EXCEPTION & COMPENSATING MEASURES

Jika requirement tidak dapat dipenuhi:

Harus mencantumkan:

1. Risk review mandatory
2. Compensating measure (engineering, bukan administratif saja)
3. Temporary duration limit
4. Executive approval threshold
5. Revalidation requirement

Tidak boleh ada deviasi tanpa dokumentasi risiko.

---

## 8. GOVERNANCE & ACCOUNTABILITY

Harus menyebut:

- Siapa owner teknis
- Siapa approval authority
- Kapan revalidation wajib
- Escalation trigger (mis. KPI breach)

Ini menghubungkan klausul ke Bab Governance.

---

# MASTER STRUCTURE FLOW (WAJIB SAMA UNTUK SEMUA SUB-BAB)

Intent
↓
Failure Mechanism
↓
Requirement (shall)
↓
Rationale
↓
Acceptance Criteria
↓
Evidence
↓
Exception
↓
Governance

Tidak boleh ada sub-bab yang lompat struktur ini.

---

# Mengapa Template Ini Defensible

1. Semua klaim tertambat pada mekanisme fisik.
2. Semua requirement dapat diuji.
3. Semua keputusan punya rujukan standar.
4. Ada kontrol common cause.
5. Ada enforcement lifecycle.
6. Ada jalur traceability lengkap.
7. Ada aturan deviasi yang terkendali.
