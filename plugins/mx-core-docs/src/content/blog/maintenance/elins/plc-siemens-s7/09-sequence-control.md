---
title: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses
authors: ['sam']
date: '2026-03-04'
tags: ['plc', 'siemens-s7', 'sequence-control', 'step-logic', 'process-control']
draft: false
summary: Sequence control digunakan dalam sistem kontrol industri untuk memastikan bahwa beberapa equipment beroperasi dalam urutan yang benar. Dalam PLC, sequence biasanya diimplementasikan menggunakan step logic, di mana setiap langkah proses dijalankan secara berurutan berdasarkan kondisi completion dan feedback dari equipment. Dengan pendekatan ini, sistem dapat memastikan bahwa setiap tahap operasi telah selesai sebelum melanjutkan ke tahap berikutnya. Sequence control sangat penting dalam berbagai proses startup seperti pump system startup, compressor startup, dan boiler startup untuk menjaga stabilitas proses dan melindungi equipment.
---

# **_Artikel 9: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses_**

---

- [**_Artikel 9: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses_**](#artikel-9-sequence-control--mengatur-urutan-operasi-equipment-dalam-sistem-proses)
- [Article 09](#article-09)
- [Sequence Control](#sequence-control)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Need for Sequence Control in Process Systems](#need-for-sequence-control-in-process-systems)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Relationship Between Equipment Control and Sequence Control](#relationship-between-equipment-control-and-sequence-control)
- [Section 3](#section-3)
- [Position of Sequence Interface in FB101](#position-of-sequence-interface-in-fb101)
- [Section 4](#section-4)
- [Sequence Start Request](#sequence-start-request)
- [Section 5](#section-5)
- [Network N8 — Sequence Ready Status](#network-n8--sequence-ready-status)
  - [Ladder Reference](#ladder-reference)
    - [Rung N8-R1 — Sequence Ready](#rung-n8-r1--sequence-ready)
- [Section 6](#section-6)
- [Sequence Running Status](#sequence-running-status)
  - [Ladder Reference](#ladder-reference-1)
    - [Rung N8-R2 — Sequence Running](#rung-n8-r2--sequence-running)
- [Section 7](#section-7)
- [Sequence Trip Status](#sequence-trip-status)
  - [Ladder Reference](#ladder-reference-2)
    - [Rung N8-R3 — Sequence Trip](#rung-n8-r3--sequence-trip)
- [Section 8](#section-8)
- [Sequence Interaction with Pump Control](#sequence-interaction-with-pump-control)
- [Section 9](#section-9)
- [Example Pump Start Sequence](#example-pump-start-sequence)
- [Section 10](#section-10)
- [Role of Sequence Interface in Process Automation](#role-of-sequence-interface-in-process-automation)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Knowledge Layer Built by Article 09](#knowledge-layer-built-by-article-09)

---

Berikut **Outline Artikel 09 — Sequence Control** yang tetap **terikat pada PLC Reference System Pump P-101**, serta hanya merujuk **Network N8 — Sequence Interface** dari **FB101 Pump_Control** yang telah dikunci.

Artikel ini memperkenalkan **bagaimana equipment control module (FB101) dapat diintegrasikan dengan sequence operasi proses**.

Semua bagian tetap mematuhi aturan:

- tidak membuat equipment baru
- tidak membuat signal baru
- tidak mengubah ladder
- hanya merujuk **Network N8 Sequence Interface**

---

# Article 09

# Sequence Control

## System Reference (Locked)

Sistem yang dianalisis tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Pump dikontrol oleh:

```
FB101 Pump_Control
```

dengan interface sequence yang berada pada:

```
Network N8 Sequence Interface
```

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 8 — Sequence Control Interface

---

# Section 1

# Need for Sequence Control in Process Systems

## Engineering Focus

Dalam sistem proses industri, equipment sering tidak boleh beroperasi secara independen.

Operasi biasanya mengikuti **urutan tertentu**.

Contoh operasi pump:

```
Open suction valve
↓
Start pump
↓
Open discharge valve
↓
Start downstream process
```

PLC menggunakan **sequence control** untuk memastikan operasi berjalan dalam urutan yang benar.

---

# Section 2

# Relationship Between Equipment Control and Sequence Control

Equipment control dan sequence control memiliki peran berbeda.

| Control Layer     | Function                       |
| ----------------- | ------------------------------ |
| Equipment Control | mengontrol satu equipment      |
| Sequence Control  | mengatur urutan operasi proses |

Dalam sistem ini:

```
FB101 Pump_Control
```

menyediakan interface yang memungkinkan pump dikontrol oleh sequence system.

---

# Section 3

# Position of Sequence Interface in FB101

Sequence interface berada pada struktur ladder berikut:

```
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling
 ├ N3 Permissive Logic
 ├ N4 Start/Stop Latch
 ├ N5 Trip Logic
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection
 └ N8 Sequence Interface   ← fokus artikel
```

Network N8 menyediakan **status dan command interface untuk sequence controller**.

---

# Section 4

# Sequence Start Request

Sequence controller dapat mengirim **start command ke pump**.

Signal yang digunakan:

```
SEQ_START_REQ
```

Signal ini telah digunakan dalam **Network N2 Command Handling** untuk menghasilkan start request.

Hubungan logika:

```
SEQ_START_REQ
↓
CMD_START_REQ
↓
RUN_LATCH
↓
MTR_START_CMD
```

Artinya pump dapat dijalankan sebagai bagian dari **sequence operasi proses**.

---

# Section 5

# Network N8 — Sequence Ready Status

PLC harus memberi tahu sequence controller apakah pump **siap untuk dijalankan**.

## Ladder Reference

### Rung N8-R1 — Sequence Ready

```
| PERMISSIVE_OK | /TRIP_ACTIVE |
|----[ ]-------------[/]--------------------( ) SEQ_READY
```

Makna logika:

```
SEQ_READY =
PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

Engineering meaning:

```
pump siap untuk dioperasikan oleh sequence
```

---

# Section 6

# Sequence Running Status

Sequence controller juga perlu mengetahui apakah pump sudah running.

## Ladder Reference

### Rung N8-R2 — Sequence Running

```
| MOTOR_FEEDBACK_ON |
|----[ ]-------------------------------( ) SEQ_RUNNING
```

Makna logika:

```
SEQ_RUNNING =
MOTOR_FEEDBACK_ON
```

Engineering meaning:

```
motor benar-benar running
pump sedang beroperasi
```

---

# Section 7

# Sequence Trip Status

Jika pump mengalami trip, sequence system harus diberi informasi.

## Ladder Reference

### Rung N8-R3 — Sequence Trip

```
| TRIP_ACTIVE |
|----[ ]--------------------------------|
|                                         |----( ) SEQ_TRIP
| START_FAIL_ACTIVE |
|----[ ]--------------------------------|
```

Makna logika:

```
SEQ_TRIP =
TRIP_ACTIVE
OR START_FAIL_ACTIVE
```

Engineering meaning:

```
pump tidak dapat beroperasi
sequence harus berhenti atau beralih ke langkah berikutnya
```

---

# Section 8

# Sequence Interaction with Pump Control

Hubungan antara sequence controller dan pump control module:

```
Sequence Controller
      │
      ▼
SEQ_START_REQ
      │
      ▼
FB101 Pump_Control
      │
      ├ SEQ_READY
      ├ SEQ_RUNNING
      └ SEQ_TRIP
```

Sequence system menggunakan status tersebut untuk menentukan langkah berikutnya.

---

# Section 9

# Example Pump Start Sequence

Contoh sequence sederhana:

```
Step 1
Open suction valve
↓
Step 2
Check SEQ_READY
↓
Step 3
Send SEQ_START_REQ
↓
Step 4
Wait SEQ_RUNNING
↓
Step 5
Continue process
```

Jika terjadi trip:

```
TRIP_ACTIVE
↓
SEQ_TRIP
↓
Sequence interrupted
```

---

# Section 10

# Role of Sequence Interface in Process Automation

Sequence interface memungkinkan equipment control module berintegrasi dengan **process automation layer**.

Struktur sistem kontrol:

```
Process Automation
      │
      ▼
Sequence Controller
      │
      ▼
FB101 Pump_Control
      │
      ▼
Pump P-101
```

Dengan demikian pump dapat menjadi bagian dari **operasi proses yang lebih kompleks**.

---

# Ladder Reference Summary

Artikel ini hanya merujuk:

```
FB101 Pump_Control
```

Network:

```
N8 Sequence Interface
```

Rung yang digunakan:

```
N8-R1
N8-R2
N8-R3
```

Tidak boleh menampilkan rung dari:

```
N1
N2
N3
N4
N5
N6
N7
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```
Diagram 1 — Pump System Reference
Diagram 4 — Ladder Execution Flow
Diagram 8 — Sequence Control Interface
```

---

# Knowledge Layer Built by Article 09

Artikel ini menambahkan pemahaman berikut:

```
Equipment Control Module
↓
Sequence Interface
↓
Process Sequence Control
↓
Integrated Plant Operation
```

Pembaca sekarang memahami bahwa **Pump P-101 tidak hanya dikontrol secara lokal oleh PLC**, tetapi juga dapat menjadi bagian dari **sequence operasi proses industri**.

---

Jika Anda ingin, langkah terakhir dari serial ini adalah membuat **Outline Artikel 10 — Shutdown Logic & Cause-Effect**, yang akan menghubungkan:

```
process deviation
↓
trip logic
↓
equipment shutdown
↓
plant protection
```

Ini akan menjadi **lapisan tertinggi dalam sistem kontrol yang telah dibangun sejak Artikel 01**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
