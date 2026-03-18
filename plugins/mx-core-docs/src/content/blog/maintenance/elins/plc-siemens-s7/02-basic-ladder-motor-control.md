---
title: Basic Ladder Logic & Motor Start–Stop Control
authors: ['sam']
date: '2026-03-04'
tags:
  ['plc', 'siemens-s7', 'ladder-logic', 'motor-start-stop', 'seal-in-circuit']
draft: false
summary: Motor dalam sistem kontrol industri biasanya dioperasikan menggunakan logika start–stop control. Dalam ladder logic PLC, kontrol ini dibangun menggunakan elemen dasar seperti contact (NO/NC) dan coil. Agar motor tetap berjalan setelah tombol start dilepas, digunakan pola logika seal-in circuit yang memanfaatkan auxiliary contact untuk menjaga coil tetap aktif. Pola ini memungkinkan motor terus berjalan sampai operator menekan tombol stop. Memahami seal-in circuit penting bagi engineer untuk merancang logika kontrol motor serta melakukan troubleshooting sistem start–stop pada equipment seperti pump, fan, dan conveyor.
---

# **_Artikel 2: Basic Ladder Logic & Motor Start–Stop Control_**

---

- [**_Artikel 2: Basic Ladder Logic \& Motor Start–Stop Control_**](#artikel-2-basic-ladder-logic--motor-startstop-control)
- [Article 02](#article-02)
- [Basic Ladder Logic](#basic-ladder-logic)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Role of Ladder Logic in Equipment Control](#role-of-ladder-logic-in-equipment-control)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [FB101 Pump Control Ladder Context](#fb101-pump-control-ladder-context)
  - [PLC Architecture](#plc-architecture)
- [Section 3](#section-3)
- [Network N2 — Command Handling](#network-n2--command-handling)
  - [Rung N2-R1 — Stop Request](#rung-n2-r1--stop-request)
  - [Rung N2-R2 — Start Request](#rung-n2-r2--start-request)
- [Section 4](#section-4)
- [Network N4 — Start/Stop Latch](#network-n4--startstop-latch)
  - [Rung N4-R1 — Run Latch Set](#rung-n4-r1--run-latch-set)
  - [Rung N4-R2 — Run Latch Reset](#rung-n4-r2--run-latch-reset)
  - [Rung N4-R3 — Motor Start Command](#rung-n4-r3--motor-start-command)
- [Section 5](#section-5)
- [Basic Start-Stop Ladder Pattern](#basic-start-stop-ladder-pattern)
- [Section 6](#section-6)
- [Interaction with Other Networks](#interaction-with-other-networks)
- [Section 7](#section-7)
- [Pump Start Logic Flow](#pump-start-logic-flow)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Hasil Outline Ini](#hasil-outline-ini)

---

Berikut **Outline Artikel 02 — Basic Ladder Logic** yang tetap **terikat langsung pada ladder FB101 Pump_Control**, khususnya **Network N2 dan Network N4**.

Struktur ini memastikan:

- tidak ada ladder baru dibuat
- semua penjelasan merujuk **rung yang sudah dikunci**
- sistem tetap **Pump P-101**
- artikel hanya membedah **subset ladder program**

---

# Article 02

# Basic Ladder Logic

## System Reference (Locked)

Sistem yang dianalisis tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Control command berasal dari:

```
PB_START
PB_STOP
REMOTE_START_REQ
SEQ_START_REQ
```

Output utama PLC:

```
MTR_START_CMD
```

Diagram yang digunakan:

Diagram 1 — Pump System Reference
Diagram 5 — Pump Start Logic Flow

---

# Section 1

# Role of Ladder Logic in Equipment Control

## Engineering Focus

Menjelaskan bahwa ladder logic digunakan PLC untuk membuat **keputusan diskrit** berdasarkan kondisi input.

Hubungan kontrol dasar:

```
Start command
↓
PLC ladder logic
↓
Motor start command
↓
Pump operation
```

Artikel ini membahas **bagian ladder yang menangani command start dan stop**.

---

# Section 2

# FB101 Pump Control Ladder Context

## PLC Architecture

Program PLC yang digunakan:

```
OB1
 └ FB101 Pump_Control
```

Network yang relevan untuk artikel ini:

```
N2 Command Handling
N4 Start/Stop Latch
```

Diagram referensi:

Diagram 4 — Ladder Execution Flow

```
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling   ← artikel ini
 ├ N3 Permissive Logic
 ├ N4 Start/Stop Latch   ← artikel ini
 ├ N5 Trip Logic
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection
 └ N8 Sequence Interface
```

---

# Section 3

# Network N2 — Command Handling

Network ini mengubah **command fisik menjadi internal control signal**.

## Rung N2-R1 — Stop Request

```
| PB_STOP |
|----[ ]-------------------------------|
|                                       |----( ) CMD_STOP_REQ
| TRIP_ACTIVE |
|----[ ]-------------------------------|
```

Makna logika:

```
CMD_STOP_REQ =
PB_STOP
OR TRIP_ACTIVE
```

Engineering meaning:

- operator stop command
- protective stop dari trip logic

---

## Rung N2-R2 — Start Request

```
| PB_START |
|----[ ]--------------------------------|
|                                         |
| REMOTE_START_REQ |
|----[ ]--------------------------------|----[/]----( ) CMD_START_REQ
|                                         | CMD_STOP_REQ
| SEQ_START_REQ |
|----[ ]--------------------------------|
```

Makna logika:

```
CMD_START_REQ =
(PB_START OR REMOTE_START_REQ OR SEQ_START_REQ)
AND NOT CMD_STOP_REQ
```

Engineering meaning:

Pump dapat menerima start command dari:

```
local operator
remote control
sequence control
```

Namun command tidak diterima jika **stop request aktif**.

---

# Section 4

# Network N4 — Start/Stop Latch

Network ini membentuk **memory state** dari pump operation.

## Rung N4-R1 — Run Latch Set

```
| CMD_START_REQ | PERMISSIVE_OK | /TRIP_ACTIVE |
|----[ ]------------[ ]------------[/]------(S) RUN_LATCH
```

Makna logika:

```
Jika start request valid
dan permissive terpenuhi
dan tidak ada trip
→ pump run latch diaktifkan
```

Engineering meaning:

PLC mempertahankan status **pump running**.

---

## Rung N4-R2 — Run Latch Reset

```
| CMD_STOP_REQ |
|----[ ]----------------------------(R) RUN_LATCH
```

Tambahan reset:

```
| START_FAIL_ACTIVE |
|----[ ]----------------------------(R) RUN_LATCH
```

Makna logika:

```
RUN_LATCH reset jika:
operator stop
atau trip terjadi
atau start failure
```

---

## Rung N4-R3 — Motor Start Command

```
| RUN_LATCH | /TRIP_ACTIVE |
|----[ ]-------[/]--------------------( ) MTR_START_CMD
```

Makna logika:

```
MTR_START_CMD =
RUN_LATCH
AND NOT TRIP_ACTIVE
```

Engineering meaning:

Motor hanya menerima command jika:

```
pump running state aktif
dan tidak ada trip
```

---

# Section 5

# Basic Start-Stop Ladder Pattern

Bagian ini menjelaskan **struktur dasar ladder control**.

Start-stop pattern:

```
Start command
↓
Set run latch
↓
Motor start output
```

Stop pattern:

```
Stop command
↓
Reset run latch
↓
Motor stop
```

Ini merupakan **pattern dasar kontrol equipment di PLC**.

---

# Section 6

# Interaction with Other Networks

Walaupun artikel ini hanya membahas **N2 dan N4**, ladder ini bergantung pada network lain.

Contoh:

```
PERMISSIVE_OK
→ berasal dari N3 Permissive Logic
```

```
TRIP_ACTIVE
→ berasal dari N5 Trip Logic
```

Artinya ladder start-stop **tidak berdiri sendiri**.

---

# Section 7

# Pump Start Logic Flow

Diagram yang digunakan:

Diagram 5 — Pump Start Logic Flow

```
START COMMAND
     │
     ▼
CMD_START_REQ
     │
     ▼
PERMISSIVE_OK
     │
     ▼
RUN_LATCH
     │
     ▼
MTR_START_CMD
     │
     ▼
Motor M-101
     │
     ▼
Pump P-101 Running
```

Diagram ini menghubungkan **ladder dengan respon equipment**.

---

# Ladder Reference Summary

Artikel 02 hanya merujuk:

```
FB101 Pump_Control

Network:
N2 Command Handling
N4 Start/Stop Latch
```

Rung yang digunakan:

```
N2-R1
N2-R2
N4-R1
N4-R2
N4-R3
```

Tidak boleh menampilkan rung dari:

```
N1
N3
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

# Hasil Outline Ini

Artikel 02 sekarang terikat pada struktur berikut:

```
Pump P-101 System
↓
FB101 Pump_Control
↓
Network N2
Network N4
↓
Specific ladder rung
↓
Motor command logic
```

Sehingga artikel tidak dapat:

- mengganti ladder
- mengganti sistem
- menambah signal
- menambah logic baru

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 03 — Permissive Logic**, karena di situlah pembaca mulai melihat **bagaimana Network N1 dan N3 membentuk kondisi start authorization untuk Pump P-101**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
