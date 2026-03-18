---
title: Interlock & Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi
authors: ['sam']
date: '2026-03-04'
tags: ['plc', 'siemens-s7', 'ladder-logic', 'trip-logic', 'interlock-logic']
draft: false
summary: Interlock dan trip logic digunakan dalam sistem kontrol industri untuk melindungi equipment dari kondisi operasi yang berbahaya. PLC memonitor berbagai sinyal proteksi seperti low pressure, high temperature, dan motor overload selama equipment beroperasi. Ketika salah satu kondisi trip terdeteksi, PLC akan menghasilkan stop command yang mematikan output equipment sehingga equipment berhenti secara otomatis. Berbeda dengan permissive logic yang menentukan apakah equipment boleh start, trip logic berfungsi menghentikan equipment yang sedang berjalan untuk mencegah kerusakan dan menjaga keselamatan proses.
---

# **_Artikel 4: Interlock & Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi_**

---

- [**_Artikel 4: Interlock \& Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi_**](#artikel-4-interlock--trip-logic--menghentikan-equipment-saat-kondisi-berbahaya-terjadi)
- [Article 04](#article-04)
- [Interlock \& Trip Logic](#interlock--trip-logic)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Purpose of Interlock \& Trip Logic](#purpose-of-interlock--trip-logic)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Position of Trip Logic in FB101](#position-of-trip-logic-in-fb101)
- [Section 3](#section-3)
- [Process Conditions Leading to Trip](#process-conditions-leading-to-trip)
- [Section 4](#section-4)
- [Network N5 — Trip Evaluation](#network-n5--trip-evaluation)
  - [Ladder Reference](#ladder-reference)
    - [Rung N5-R1 — Trip Logic Evaluation](#rung-n5-r1--trip-logic-evaluation)
- [Section 5](#section-5)
- [Trip Output Generation](#trip-output-generation)
  - [Ladder Reference](#ladder-reference-1)
    - [Rung N5-R2 — Trip Output](#rung-n5-r2--trip-output)
- [Section 6](#section-6)
- [Interaction with Start Logic](#interaction-with-start-logic)
- [Section 7](#section-7)
- [Example Trip Scenarios](#example-trip-scenarios)
  - [Scenario 1 — Motor Overload](#scenario-1--motor-overload)
  - [Scenario 2 — Low Suction Pressure](#scenario-2--low-suction-pressure)
  - [Scenario 3 — MCC Failure During Operation](#scenario-3--mcc-failure-during-operation)
- [Section 8](#section-8)
- [Interlock vs Trip](#interlock-vs-trip)
- [Section 9](#section-9)
- [Pump Protection Flow](#pump-protection-flow)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Knowledge Layer Built by Article 04](#knowledge-layer-built-by-article-04)

---

Berikut **Outline Artikel 04 — Interlock & Trip Logic** yang tetap **terkunci pada ladder FB101 Pump_Control**, khususnya **Network N5 Trip Logic**.

Artikel ini adalah **transisi penting dalam serial**, karena pembaca mulai memahami bahwa PLC tidak hanya **mengizinkan start**, tetapi juga **memaksa equipment berhenti ketika kondisi proses berbahaya**.

Semua bagian artikel tetap mematuhi aturan:

- hanya menggunakan **Pump P-101 system**
- hanya menggunakan **tag yang sudah dikunci**
- hanya merujuk **Network N5**
- hanya menampilkan **rung yang sudah ada**

---

# Article 04

# Interlock & Trip Logic

## System Reference (Locked)

Sistem yang dikontrol tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Instrument dan status yang relevan untuk proteksi:

```
PT101_PV
OL_TRIP
MCC_RDY
```

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 6 — Pump Protection Logic

---

# Section 1

# Purpose of Interlock & Trip Logic

## Engineering Focus

Permissive logic memastikan **pump hanya start dalam kondisi aman**.

Namun selama operasi, kondisi proses bisa berubah.

Contoh:

```
suction pressure turun drastis
motor overload
motor starter fault
```

Dalam kondisi ini PLC harus:

```
menghentikan pump secara otomatis
```

Struktur keputusan PLC:

```
Process deviation
↓
Trip evaluation
↓
Trip active
↓
Motor stop
↓
Pump shutdown
```

---

# Section 2

# Position of Trip Logic in FB101

Trip logic berada dalam struktur ladder berikut:

```
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling
 ├ N3 Permissive Logic
 ├ N4 Start/Stop Latch
 ├ N5 Trip Logic      ← fokus artikel
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection
 └ N8 Sequence Interface
```

Hubungan antar network:

```
N4 Run Logic
↓
N5 Trip Logic
↓
RUN_LATCH reset
↓
Motor stop
```

---

# Section 3

# Process Conditions Leading to Trip

Trip logic menggunakan status yang dibentuk oleh **Network N1**.

Signal yang relevan:

```
OL_TRIP
SUCT_PRESS_LOWLOW
MCC_HEALTHY
RUN_LATCH
```

Makna kondisi:

| Condition         | Engineering meaning             |
| ----------------- | ------------------------------- |
| OL_TRIP           | motor overload                  |
| SUCT_PRESS_LOWLOW | suction pressure terlalu rendah |
| NOT MCC_HEALTHY   | MCC fault                       |
| RUN_LATCH         | pump sedang running             |

Trip logic hanya aktif **ketika pump sedang beroperasi atau kondisi proteksi terjadi**.

---

# Section 4

# Network N5 — Trip Evaluation

## Ladder Reference

### Rung N5-R1 — Trip Logic Evaluation

```
| OL_TRIP |
|----[ ]--------------------------------|
|                                         |
| SUCT_PRESS_LOWLOW |
|----[ ]--------------------------------|----( ) TRIP_ACTIVE
|                                         |
| RUN_LATCH | /MCC_HEALTHY |
|----[ ]--------[/]----------------------|
```

Makna logika:

```
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR (RUN_LATCH AND NOT MCC_HEALTHY)
```

Engineering meaning:

Pump harus dihentikan jika:

```
motor overload
atau suction pressure sangat rendah
atau MCC gagal saat pump sedang running
```

---

# Section 5

# Trip Output Generation

Setelah kondisi trip terdeteksi, PLC menghasilkan **trip output**.

## Ladder Reference

### Rung N5-R2 — Trip Output

```
| TRIP_ACTIVE |
|----[ ]-----------------------------( ) TRIP_P101
```

Makna logika:

```
TRIP_P101 = TRIP_ACTIVE
```

Engineering meaning:

```
trip signal dikirim ke motor starter
motor berhenti
pump shutdown
```

---

# Section 6

# Interaction with Start Logic

Trip logic berinteraksi langsung dengan **run latch logic di Network N4**.

Hubungan ladder:

```
TRIP_ACTIVE
↓
CMD_STOP_REQ
↓
RUN_LATCH reset
↓
MTR_START_CMD off
```

Artinya trip tidak hanya menghasilkan alarm, tetapi **memaksa motor berhenti**.

---

# Section 7

# Example Trip Scenarios

## Scenario 1 — Motor Overload

Kondisi:

```
OL_TRIP = TRUE
```

Hasil ladder:

```
TRIP_ACTIVE = TRUE
TRIP_P101 = TRUE
motor stop
```

---

## Scenario 2 — Low Suction Pressure

Kondisi:

```
PT101_PV < LowLow_SP
```

Hasil ladder:

```
SUCT_PRESS_LOWLOW = TRUE
TRIP_ACTIVE = TRUE
pump shutdown
```

---

## Scenario 3 — MCC Failure During Operation

Kondisi:

```
RUN_LATCH = TRUE
MCC_HEALTHY = FALSE
```

Hasil ladder:

```
TRIP_ACTIVE = TRUE
motor stop
```

---

# Section 8

# Interlock vs Trip

Artikel ini juga menjelaskan perbedaan konsep:

| Logic      | Function             |
| ---------- | -------------------- |
| Permissive | mencegah start       |
| Trip       | menghentikan operasi |

Hubungan:

```
Permissive logic
↓
Start authorization
↓
Pump running
↓
Trip logic protects equipment
```

---

# Section 9

# Pump Protection Flow

Diagram referensi:

Diagram 6 — Pump Protection Logic

```
Process Deviation
     │
     ▼
Trip Logic Evaluation
     │
     ▼
TRIP_ACTIVE
     │
     ▼
RUN_LATCH Reset
     │
     ▼
Motor Stop
     │
     ▼
Pump Shutdown
```

Diagram ini menghubungkan **ladder logic dengan respon fisik equipment**.

---

# Ladder Reference Summary

Artikel ini hanya boleh merujuk:

```
FB101 Pump_Control
```

Network:

```
N5 Trip Logic
```

Rung yang digunakan:

```
N5-R1
N5-R2
```

Tidak boleh menampilkan rung dari:

```
N1
N2
N3
N4
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
Diagram 6 — Pump Protection Logic
```

---

# Knowledge Layer Built by Article 04

Artikel ini menambahkan lapisan pemahaman berikut:

```
Process deviation
↓
Trip evaluation (N5)
↓
TRIP_ACTIVE
↓
Motor stop
↓
Pump shutdown
```

Pembaca sekarang memahami bahwa PLC:

```
tidak hanya memulai equipment
tetapi juga melindungi equipment
```

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 05 — Alarm vs Trip**, karena di situ pembaca mulai memahami **perbedaan respon PLC antara deviasi proses yang memerlukan tindakan operator dan deviasi yang memerlukan shutdown otomatis**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
