---
title: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman
authors: ['sam']
date: '2026-03-04'
tags: ['plc', 'siemens-s7', 'ladder-logic', 'permissive-logic', 'pump-control']
draft: false
summary: Permissive logic digunakan dalam sistem kontrol industri untuk memastikan bahwa equipment hanya dapat start ketika kondisi operasi yang diperlukan telah terpenuhi. PLC memeriksa beberapa sinyal permissive seperti status MCC, posisi valve, dan kondisi trip sebelum menerima start command dari operator. Jika semua kondisi permissive terpenuhi, PLC akan mengizinkan equipment untuk start. Jika salah satu kondisi tidak terpenuhi, start command akan ditolak. Pendekatan ini membantu mencegah equipment beroperasi dalam kondisi yang tidak aman dan melindungi sistem proses dari potensi kerusakan.
---

# **_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**

---

- [**_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**](#artikel-3-permissive-logic--mencegah-equipment-start-dalam-kondisi-tidak-aman)
- [Article 03](#article-03)
- [Permissive Logic](#permissive-logic)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Purpose of Permissive Logic](#purpose-of-permissive-logic)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Position of Permissive Logic in FB101](#position-of-permissive-logic-in-fb101)
- [Section 3](#section-3)
- [Network N1 — Signal Conditioning](#network-n1--signal-conditioning)
  - [Rung N1-R1 — MCC Healthy](#rung-n1-r1--mcc-healthy)
  - [Rung N1-R2 — Suction Valve Ready](#rung-n1-r2--suction-valve-ready)
  - [Rung N1-R5 — Tank Level Low](#rung-n1-r5--tank-level-low)
  - [Rung N1-R7 — Suction Pressure Low-Low](#rung-n1-r7--suction-pressure-low-low)
- [Section 4](#section-4)
- [Network N3 — Permissive Logic](#network-n3--permissive-logic)
  - [Rung N3-R1 — Permissive Evaluation](#rung-n3-r1--permissive-evaluation)
- [Section 5](#section-5)
- [Start Authorization Mechanism](#start-authorization-mechanism)
- [Section 6](#section-6)
- [Example Operating Scenarios](#example-operating-scenarios)
  - [Scenario 1 — Normal Start](#scenario-1--normal-start)
  - [Scenario 2 — Suction Valve Closed](#scenario-2--suction-valve-closed)
  - [Scenario 3 — Tank Level Low](#scenario-3--tank-level-low)
- [Section 7](#section-7)
- [Relation to Other Logic Layers](#relation-to-other-logic-layers)
- [Section 8](#section-8)
- [Pump Start Logic Context](#pump-start-logic-context)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Resulting Knowledge Layer](#resulting-knowledge-layer)

---

Berikut **Outline Artikel 03 — Permissive Logic** yang tetap **terikat langsung ke ladder FB101 Pump_Control**, khususnya **Network N1 dan Network N3**.

Artikel ini adalah titik penting dalam serial karena pembaca mulai melihat **bagaimana PLC menentukan apakah pump diizinkan start atau tidak**.

Struktur outline tetap mengikuti aturan:

- hanya menggunakan **Pump P-101 system**
- hanya menggunakan **tag yang sudah dikunci**
- hanya merujuk **Network N1 dan N3**
- hanya menampilkan **rung yang sudah ada**
- tidak membuat ladder baru

---

# Article 03

# Permissive Logic

## System Reference (Locked)

Sistem yang dianalisis tetap **Pump P-101**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Instrument signals yang mempengaruhi permissive:

```
MCC_RDY
XV101_OPEN
LSL101
PT101_PV
OL_TRIP
```

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 5 — Pump Start Logic Flow

---

# Section 1

# Purpose of Permissive Logic

## Engineering Focus

Permissive logic digunakan untuk memastikan bahwa **equipment hanya dapat dijalankan ketika kondisi operasi aman terpenuhi**.

Dalam sistem Pump P-101:

```
Start command
↓
Permissive check
↓
Run authorization
↓
Motor start
```

Tanpa permissive, pump bisa start pada kondisi yang berbahaya seperti:

```
valve tertutup
suction pressure terlalu rendah
tank level rendah
```

---

# Section 2

# Position of Permissive Logic in FB101

Permissive logic berada dalam struktur ladder berikut:

```
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling
 ├ N3 Permissive Logic   ← fokus artikel
 ├ N4 Start/Stop Latch
 ├ N5 Trip Logic
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection
 └ N8 Sequence Interface
```

Hubungan network:

```
N1 Input Conditioning
↓
N3 Permissive Logic
↓
N4 Start Logic
```

Artinya **permissive logic menggunakan status yang dibentuk oleh Network N1**.

---

# Section 3

# Network N1 — Signal Conditioning

Sebelum permissive dihitung, PLC harus mengubah **field signal menjadi logic state**.

Artikel ini hanya menampilkan rung dari **N1 yang relevan untuk permissive**.

---

## Rung N1-R1 — MCC Healthy

```
| MCC_RDY |
|----[ ]--------------------( ) MCC_HEALTHY
```

Makna engineering:

```
motor starter siap menerima start command
```

---

## Rung N1-R2 — Suction Valve Ready

```
| XV101_OPEN |
|----[ ]--------------------( ) SUCT_VALVE_READY
```

Makna engineering:

```
suction valve sudah terbuka
```

---

## Rung N1-R5 — Tank Level Low

```
| LSL101 |
|----[ ]--------------------( ) TANK_LEVEL_LOW
```

Makna engineering:

```
level tank terlalu rendah
```

---

## Rung N1-R7 — Suction Pressure Low-Low

```
| PT101_PV < LowLow_SP |
|----[CMP<]---------( ) SUCT_PRESS_LOWLOW
```

Makna engineering:

```
tekanan suction berada pada kondisi berbahaya
```

---

# Section 4

# Network N3 — Permissive Logic

Network ini menghitung apakah pump **boleh start**.

---

## Rung N3-R1 — Permissive Evaluation

```
| MCC_HEALTHY |
|----[ ]------------------------------|
|                                      |
| SUCT_VALVE_READY |
|----[ ]------------------------------|
|                                      |
| /TANK_LEVEL_LOW |
|----[/]------------------------------|
|                                      |
| /SUCT_PRESS_LOWLOW |
|----[/]------------------------------|
|                                      |
| /OL_TRIP |
|----[/]------------------------------|
|                                      |
| /TRIP_ACTIVE |
|----[/]------------------------------( ) PERMISSIVE_OK
```

Makna logika:

```
PERMISSIVE_OK =
MCC_HEALTHY
AND SUCT_VALVE_READY
AND NOT TANK_LEVEL_LOW
AND NOT SUCT_PRESS_LOWLOW
AND NOT OL_TRIP
AND NOT TRIP_ACTIVE
```

---

# Section 5

# Start Authorization Mechanism

Permissive logic berfungsi sebagai **authorization gate** sebelum pump start.

Hubungan dengan ladder start logic:

```
CMD_START_REQ
↓
PERMISSIVE_OK
↓
RUN_LATCH
↓
MTR_START_CMD
```

Jika **PERMISSIVE_OK = FALSE**, maka:

```
RUN_LATCH tidak akan set
motor tidak akan start
```

---

# Section 6

# Example Operating Scenarios

## Scenario 1 — Normal Start

```
MCC_HEALTHY = TRUE
SUCT_VALVE_READY = TRUE
TANK_LEVEL_LOW = FALSE
SUCT_PRESS_LOWLOW = FALSE
OL_TRIP = FALSE
```

Hasil:

```
PERMISSIVE_OK = TRUE
pump boleh start
```

---

## Scenario 2 — Suction Valve Closed

```
XV101_OPEN = FALSE
```

Hasil:

```
SUCT_VALVE_READY = FALSE
PERMISSIVE_OK = FALSE
pump tidak boleh start
```

---

## Scenario 3 — Tank Level Low

```
LSL101 = TRUE
```

Hasil:

```
TANK_LEVEL_LOW = TRUE
PERMISSIVE_OK = FALSE
pump start diblok
```

---

# Section 7

# Relation to Other Logic Layers

Permissive logic bukan proteksi shutdown.

Perbedaannya:

| Logic      | Function            |
| ---------- | ------------------- |
| Permissive | start authorization |
| Trip       | emergency stop      |
| Alarm      | operator warning    |

Hubungan network:

```
N3 Permissive Logic
↓
N4 Start Latch
```

---

# Section 8

# Pump Start Logic Context

Diagram referensi:

Diagram 5 — Pump Start Logic

```
Start Command
↓
CMD_START_REQ
↓
PERMISSIVE_OK
↓
RUN_LATCH
↓
MTR_START_CMD
↓
Motor M-101
↓
Pump P-101 Running
```

Permissive berada **di tengah alur keputusan PLC**.

---

# Ladder Reference Summary

Artikel ini hanya boleh merujuk:

```
FB101 Pump_Control
```

Network:

```
N1 Input Conditioning
N3 Permissive Logic
```

Rung yang boleh digunakan:

```
N1-R1
N1-R2
N1-R5
N1-R7
N3-R1
```

Tidak boleh menampilkan rung dari:

```
N2
N4
N5
N6
N7
N8
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```
Diagram 1 — Pump System Reference
Diagram 4 — Ladder Execution Flow
Diagram 5 — Pump Start Logic
```

---

# Resulting Knowledge Layer

Artikel 03 membangun pemahaman berikut:

```
Field signal
↓
Input conditioning (N1)
↓
Permissive evaluation (N3)
↓
Start authorization
↓
Run logic (N4)
```

Pembaca mulai melihat **bagaimana PLC membuat keputusan start equipment berdasarkan kondisi proses**.

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 04 — Interlock & Trip Logic**, karena di situ pembaca akan melihat **bagaimana Network N5 menghentikan Pump P-101 ketika kondisi proses menjadi berbahaya**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
