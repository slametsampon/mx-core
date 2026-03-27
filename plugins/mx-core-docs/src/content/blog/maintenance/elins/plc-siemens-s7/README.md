---
title: README - PLC Ladder Programming — Siemens S7
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc-control',
    'ladder-logic',
    'process-control',
    'industrial-automation',
    'siemens-s7',
    'equipment-control',
    'permissive-interlock-trip',
    'sequence-control',
    'shutdown-logic',
    'process-protection',
  ]
draft: false
summary: Serial PLC Control Engineering Series menjelaskan bagaimana PLC ladder logic mengontrol equipment dalam sistem proses industri. Fokus utama serial ini adalah hubungan antara kondisi proses, sinyal instrument, logika kontrol PLC, dan respon equipment. Artikel disusun secara progresif mulai dari dasar perilaku PLC seperti scan cycle dan basic ladder logic, kemudian berkembang ke logic kontrol equipment seperti permissive, interlock, alarm, dan start failure detection. Selanjutnya dibahas struktur program PLC, modular control logic, sequence automation, hingga shutdown logic dan cause–effect pada sistem proteksi proses. Serial ini dirancang untuk membantu engineer memahami bagaimana PLC menghubungkan kondisi proses dengan aksi equipment dalam operasi plant industri.
---

# **_README — PLC Control Engineering Series_**

---

- [**_README — PLC Control Engineering Series_**](#readme--plc-control-engineering-series)
- [**README — PLC Control Engineering Series (Siemens S7)**](#readme--plc-control-engineering-series-siemens-s7)
- [1. Executive Summary](#1-executive-summary)
- [2. PLC Reference System (Locked)](#2-plc-reference-system-locked)
  - [Arsitektur PLC](#arsitektur-plc)
  - [Equipment](#equipment)
  - [Prinsip Sistem](#prinsip-sistem)
  - [Signal Flow](#signal-flow)
  - [Lock Rule](#lock-rule)
- [**2A. PLC Program Block Architecture (OB, FB, FC, DB)**](#2a-plc-program-block-architecture-ob-fb-fc-db)
  - [Tujuan](#tujuan)
  - [1. Organization Block (OB)](#1-organization-block-ob)
    - [Definisi](#definisi)
    - [Karakteristik](#karakteristik)
    - [Dalam sistem referensi](#dalam-sistem-referensi)
    - [Peran OB1](#peran-ob1)
    - [Engineering Insight](#engineering-insight)
  - [2. Function Block (FB)](#2-function-block-fb)
    - [Definisi](#definisi-1)
    - [Karakteristik](#karakteristik-1)
    - [Dalam sistem referensi](#dalam-sistem-referensi-1)
    - [Fungsi FB101](#fungsi-fb101)
    - [Engineering Insight](#engineering-insight-1)
  - [3. Function (FC)](#3-function-fc)
    - [Definisi](#definisi-2)
    - [Karakteristik](#karakteristik-2)
    - [Contoh penggunaan (tidak digunakan dalam model referensi utama)](#contoh-penggunaan-tidak-digunakan-dalam-model-referensi-utama)
    - [Posisi dalam arsitektur](#posisi-dalam-arsitektur)
    - [Engineering Insight](#engineering-insight-2)
  - [4. Data Block (DB)](#4-data-block-db)
    - [Definisi](#definisi-3)
    - [Jenis DB](#jenis-db)
    - [Dalam sistem referensi](#dalam-sistem-referensi-2)
    - [Isi DB101](#isi-db101)
    - [Engineering Insight](#engineering-insight-3)
  - [5. Hubungan Antar Blok](#5-hubungan-antar-blok)
  - [6. Lock Compliance Statement](#6-lock-compliance-statement)
- [3. Master Control Logic Map (Locked)](#3-master-control-logic-map-locked)
  - [Struktur Utama](#struktur-utama)
  - [Hierarki Logika](#hierarki-logika)
  - [Prinsip](#prinsip)
  - [Lock Rule](#lock-rule-1)
- [4. Master I/O List + Naming Convention + FB101 Breakdown (Locked)](#4-master-io-list--naming-convention--fb101-breakdown-locked)
  - [4.1 Master I/O List](#41-master-io-list)
    - [Digital Input](#digital-input)
    - [Analog Input](#analog-input)
    - [Digital Output](#digital-output)
  - [4.2 Signal Naming Convention](#42-signal-naming-convention)
    - [Field Signals](#field-signals)
    - [Conditioned Status](#conditioned-status)
    - [Internal Logic](#internal-logic)
    - [Sequence Interface](#sequence-interface)
  - [Naming Lock Rule](#naming-lock-rule)
  - [4.3 FB101 Network Breakdown](#43-fb101-network-breakdown)
- [5. Full Ladder Design (Locked)](#5-full-ladder-design-locked)
  - [Prinsip Eksekusi](#prinsip-eksekusi)
  - [Control Paths](#control-paths)
    - [Start Path](#start-path)
    - [Trip Path](#trip-path)
    - [Alarm Path](#alarm-path)
    - [Start Failure Path](#start-failure-path)
  - [Lock Rule](#lock-rule-2)
- [6. Master Article Skeleton (Locked)](#6-master-article-skeleton-locked)
  - [Mapping ke Network](#mapping-ke-network)
  - [Diagram Library (Locked)](#diagram-library-locked)
- [7. Hubungan Antar Artikel \& Urutan Belajar](#7-hubungan-antar-artikel--urutan-belajar)
  - [Struktur Pengetahuan](#struktur-pengetahuan)
  - [Relasi Artikel](#relasi-artikel)
  - [Prinsip Pembelajaran](#prinsip-pembelajaran)
- [Final Lock Statement](#final-lock-statement)
  - [Mandatory Rules](#mandatory-rules)
- [Status Serial](#status-serial)

---

# **README — PLC Control Engineering Series (Siemens S7)**

---

# 1. Executive Summary

Serial ini menjelaskan **bagaimana PLC Siemens S7 mengontrol equipment dalam sistem proses industri menggunakan ladder logic (LAD)**.

Fokus utama bukan pada pemrograman PLC sebagai software, tetapi pada hubungan:

```text
process condition
↓
instrument detection
↓
PLC control logic
↓
equipment response
```

Dengan pendekatan ini, engineer memahami:

- bagaimana kondisi proses diterjemahkan menjadi sinyal instrument
- bagaimana PLC membaca sinyal tersebut dalam scan cycle
- bagaimana ladder logic membentuk keputusan kontrol
- bagaimana equipment merespon keputusan tersebut

Serial ini menggunakan satu sistem referensi tetap:

```text
Pump P-101 — Motor Driven Centrifugal Pump
PLC Siemens S7 (OB1–FB101–DB101)
```

Seluruh artikel **tidak mengubah sistem**, tetapi hanya membahas bagian berbeda dari model kontrol yang sama.

---

# 2. PLC Reference System (Locked)

Sistem referensi seluruh serial adalah:

```text
Pump P-101 — Siemens S7 Controlled System
```

## Arsitektur PLC

```text
OB1  (Main Scan Cycle)
 │
 └── FB101 Pump_Control
        │
        └── DB101 Pump_Data
```

## Equipment

- P-101 Pump
- M-101 Motor
- XV-101 Suction Valve
- XV-102 Discharge Valve

## Prinsip Sistem

PLC bertanggung jawab untuk:

```text
read input
↓
execute ladder logic
↓
write output
```

## Signal Flow

```text
FIELD DEVICE
↓
I/O Module
↓
PLC CPU (OB1)
↓
FB101 Pump_Control
↓
Output Module
↓
Motor Starter
```

## Lock Rule

```text
PLC Reference System ini bersifat tetap dan tidak boleh diubah.
Semua artikel wajib menggunakan sistem ini.
```

---

# **2A. PLC Program Block Architecture (OB, FB, FC, DB)**

## Tujuan

Section ini menjelaskan **struktur dasar program PLC Siemens S7** yang menjadi fondasi dari arsitektur:

```text
OB1 → FB101 → DB101
```

Penjelasan ini bersifat **fundamental awareness** dan tidak mengubah sistem referensi yang telah di-lock.

---

## 1. Organization Block (OB)

### Definisi

**OB (Organization Block)** adalah blok yang mengatur **kapan dan bagaimana program PLC dieksekusi oleh CPU**.

### Karakteristik

- Dieksekusi oleh sistem (tidak dipanggil manual)
- Bersifat **event-driven**
- Menjadi entry point program

### Dalam sistem referensi

```text
OB1 = Main Scan Cycle
```

### Peran OB1

```text
Read Input
↓
Execute Logic (FB101)
↓
Write Output
```

### Engineering Insight

OB memastikan bahwa:

- seluruh logic berjalan **deterministic**
- urutan eksekusi tetap konsisten
- scan cycle dapat dianalisis untuk troubleshooting

---

## 2. Function Block (FB)

### Definisi

**FB (Function Block)** adalah blok program yang memiliki **memory internal (stateful logic)**.

### Karakteristik

- Memerlukan **Instance DB**
- Data tersimpan antar scan cycle
- Cocok untuk **equipment control module**

### Dalam sistem referensi

```text
FB101 = Pump_Control
DB101 = Pump_Data
```

### Fungsi FB101

FB101 menangani seluruh logika:

- permissive
- start/stop latch
- trip & interlock
- alarm
- start failure detection
- sequence interface

### Engineering Insight

FB digunakan karena:

- equipment memiliki **state (RUN, STOP, TRIP)**
- membutuhkan **memory antar scan**
- mendukung modularisasi (1 equipment = 1 FB)

---

## 3. Function (FC)

### Definisi

**FC (Function)** adalah blok program yang **tidak memiliki memory internal (stateless logic)**.

### Karakteristik

- Tidak memiliki instance DB
- Semua input/output melalui parameter
- Tidak menyimpan kondisi sebelumnya

### Contoh penggunaan (tidak digunakan dalam model referensi utama)

- scaling analog signal (4–20 mA → engineering unit)
- kalkulasi flow / pressure
- unit conversion
- reusable utility logic

### Posisi dalam arsitektur

Walaupun tidak digunakan dalam struktur utama:

```text
OB1 → FB101 → DB101
```

FC tetap merupakan bagian penting dalam:

- pengembangan sistem skala besar
- modular reusable logic
- optimasi program

### Engineering Insight

Gunakan FC untuk:

```text
calculation
data processing
signal normalization
```

Hindari menggunakan FB untuk logic yang tidak membutuhkan memory.

---

## 4. Data Block (DB)

### Definisi

**DB (Data Block)** adalah blok yang digunakan untuk **menyimpan data dalam PLC**.

### Jenis DB

✓ a. Instance DB

- Terhubung langsung dengan FB
- Menyimpan state FB

```text
FB101 ↔ DB101
```

✓ b. Global DB

- Dapat diakses oleh seluruh blok
- Menyimpan data umum

### Dalam sistem referensi

```text
DB101 = Pump_Data
```

### Isi DB101

- RUN status
- TRIP status
- timer data
- alarm state
- internal flags

### Engineering Insight

DB adalah implementasi nyata dari:

```text
Single Source of Truth (SSOT)
```

Semua status penting disimpan di DB untuk:

- integrasi ke DCS
- troubleshooting
- data consistency

---

## 5. Hubungan Antar Blok

Struktur final tetap:

```text
OB1
 └── FB101 Pump_Control
        └── DB101 Pump_Data
```

Dengan tambahan pemahaman:

- OB → eksekusi
- FB → logic + state
- DB → storage
- FC → utility (opsional, tidak digunakan dalam model ini)

---

## 6. Lock Compliance Statement

```text
Penambahan penjelasan ini:

- tidak mengubah struktur OB1–FB101–DB101
- tidak menambahkan blok baru ke sistem referensi
- tidak mengubah logic map
- tidak mengubah I/O
- tidak mengubah ladder

Hanya bersifat explanatory untuk meningkatkan pemahaman engineer.
```

---

# 3. Master Control Logic Map (Locked)

Master Control Logic Map adalah **struktur logika utama FB101 Pump_Control**.

## Struktur Utama

```text
FB101 Pump_Control
│
├─ 1 Input Conditioning
├─ 2 Command Handling
├─ 3 Permissive Logic
├─ 4 Start/Stop Latch Logic
├─ 5 Trip / Interlock Logic
├─ 6 Alarm Logic
├─ 7 Start Failure Detection
└─ 8 Sequence Interface
```

## Hierarki Logika

```text
Input Signal
↓
Conditioned Status
↓
Command Processing
↓
Permissive Evaluation
↓
Run Logic
↓
Trip / Alarm
↓
Equipment Response
↓
Sequence Interaction
```

## Prinsip

```text
Physical system  = tetap
Logic structure  = tetap
Artikel          = subset dari logic structure
```

## Lock Rule

```text
Master Control Logic Map tidak boleh diubah.
Semua artikel wajib merujuk struktur ini.
```

---

# 4. Master I/O List + Naming Convention + FB101 Breakdown (Locked)

## 4.1 Master I/O List

### Digital Input

- PB_START (I0.0)
- PB_STOP (I0.1)
- MCC_RDY (I0.2)
- OL_TRIP (I0.3)
- XV101_OPEN (I0.4)
- XV102_OPEN (I0.5)
- MTR_RUN_FB (I0.6)
- LSL101 (I0.7)

### Analog Input

- PT101_PV (AIW64)

### Digital Output

- MTR_START_CMD (Q0.0)
- ALM_P101 (Q0.1)
- TRIP_P101 (Q0.2)
- START_FAIL_ALM (Q0.3)

---

## 4.2 Signal Naming Convention

### Field Signals

PB_START, MCC_RDY, MTR_RUN_FB, PT101_PV

### Conditioned Status

MCC_HEALTHY, SUCT_PRESS_LOW, SUCT_PRESS_LOWLOW

### Internal Logic

CMD_START_REQ, RUN_LATCH, TRIP_ACTIVE

### Sequence Interface

SEQ_START_REQ, SEQ_READY, SEQ_RUNNING, SEQ_TRIP

## Naming Lock Rule

```text
Nama tag tidak boleh diubah di seluruh artikel.
```

---

## 4.3 FB101 Network Breakdown

```text
N1 Input Conditioning
N2 Command Handling
N3 Permissive Logic
N4 Start/Stop Latch
N5 Trip Logic
N6 Alarm Logic
N7 Start Failure Detection
N8 Sequence Interface
```

Setiap network memiliki fungsi tetap dan tidak boleh diubah.

---

# 5. Full Ladder Design (Locked)

Seluruh ladder program Pump P-101 berada dalam:

```text
OB1
 └── FB101 Pump_Control
       ├ N1 Input Conditioning
       ├ N2 Command Handling
       ├ N3 Permissive Logic
       ├ N4 Start/Stop Latch
       ├ N5 Trip Logic
       ├ N6 Alarm Logic
       ├ N7 Start Failure Detection
       └ N8 Sequence Interface
```

## Prinsip Eksekusi

```text
Input → Logic → Output
```

## Control Paths

### Start Path

```text
START → CMD_START_REQ → PERMISSIVE_OK → RUN_LATCH → MTR_START_CMD
```

### Trip Path

```text
Process deviation → TRIP_ACTIVE → RUN_LATCH reset → Motor stop
```

### Alarm Path

```text
Abnormal condition → ALARM_ACTIVE → ALM_P101
```

### Start Failure Path

```text
Start command + no feedback → START_FAIL_ACTIVE → alarm + stop
```

## Lock Rule

```text
Ladder ini adalah referensi tunggal dan tidak boleh diubah.
```

---

# 6. Master Article Skeleton (Locked)

Seluruh artikel mengikuti struktur tetap:

```text
01 PLC Scan Cycle
02 Basic Ladder Logic
03 Permissive Logic
04 Interlock & Trip Logic
05 Alarm vs Trip
06 Start Failure Detection
07 PLC Program Structure
08 Equipment Control Module
09 Sequence Control
10 Shutdown Logic
```

## Mapping ke Network

| Article | Network         |
| ------- | --------------- |
| 01      | N1              |
| 02      | N2 N4           |
| 03      | N3              |
| 04      | N5              |
| 05      | N6              |
| 06      | N7              |
| 07      | OB1 FB101 DB101 |
| 08      | FB101           |
| 09      | N8              |
| 10      | N5 N6 N8        |

## Diagram Library (Locked)

Semua artikel hanya boleh menggunakan:

```text
Diagram 1 Pump System
Diagram 2 PLC Signal Flow
Diagram 3 Program Architecture
Diagram 4 Ladder Execution
Diagram 5 Pump Start Logic
Diagram 6 Pump Protection
Diagram 7 Start Failure
Diagram 8 Sequence Interface
```

---

# 7. Hubungan Antar Artikel & Urutan Belajar

## Struktur Pengetahuan

```text
PLC behaviour
↓
Basic ladder logic
↓
Equipment control logic
↓
Program architecture
↓
Process automation
↓
Process protection
```

## Relasi Artikel

```text
Scan Cycle
↓
Basic Ladder
↓
Permissive
↓
Trip / Alarm
↓
Start Failure
↓
Program Structure
↓
Equipment Module
↓
Sequence Control
↓
Shutdown Logic
```

## Prinsip Pembelajaran

Setiap artikel:

```text
tidak berdiri sendiri
tetapi merupakan bagian dari satu model kontrol yang sama
```

---

# Final Lock Statement

Dokumen ini adalah:

```text
Single Source of Truth
```

Untuk seluruh serial.

## Mandatory Rules

```text
1. Gunakan hanya Pump P-101 sebagai sistem referensi
2. Gunakan hanya tag dari Master I/O List
3. Gunakan hanya OB1–FB101–DB101 architecture
4. Gunakan hanya Network N1–N8
5. Jangan membuat equipment baru
6. Jangan membuat signal baru
7. Jangan mengubah ladder logic
8. Setiap artikel hanya membahas subset network
9. Gunakan hanya diagram dari diagram library
10. Jangan mengubah terminology
```

---

# Status Serial

Serial sekarang telah memiliki:

```text
Physical model        ✔
Logic model           ✔
I/O definition        ✔
Ladder implementation ✔
Program structure     ✔
Article skeleton      ✔
Diagram library       ✔
Drift control rule    ✔
```

Artinya sistem telah siap untuk:

```text
Article Writing Phase
```

---

Jika Anda ingin, langkah berikutnya yang paling krusial adalah:

👉 **menulis Article 01 full (bukan outline)** dengan enforcement penuh terhadap README ini, sehingga kita bisa menguji apakah sistem benar-benar anti-drift dalam praktik.
