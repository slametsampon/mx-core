---
title: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'plc-program-structure',
    'function-block',
    'industrial-automation',
  ]
draft: false
summary: Pada sistem kontrol industri yang besar, program PLC harus disusun secara modular agar mudah dipahami dan dipelihara. Pada PLC Siemens S7, struktur program biasanya menggunakan Organization Block (OB), Function Block (FB), dan Data Block (DB). OB berfungsi sebagai program utama yang dijalankan oleh CPU PLC, FB berisi fungsi kontrol yang dapat digunakan kembali untuk berbagai equipment, dan DB menyimpan data operasional untuk setiap instance equipment. Pendekatan modular ini membuat program PLC lebih terorganisasi, scalable, dan mudah dikembangkan pada sistem kontrol yang kompleks.
---

# **_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**

---

- [**_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**](#artikel-7-plc-program-structure-ob-fb-db--menyusun-program-control-yang-terstruktur)
- [Article 07](#article-07)
- [PLC Program Structure](#plc-program-structure)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Why PLC Programs Need Structure](#why-plc-programs-need-structure)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [PLC Program Architecture for Pump P-101](#plc-program-architecture-for-pump-p-101)
- [Section 3](#section-3)
- [OB1 — Main Scan Cycle](#ob1--main-scan-cycle)
  - [Engineering Focus](#engineering-focus-1)
- [Section 4](#section-4)
- [FB101 — Pump Control Logic](#fb101--pump-control-logic)
- [Section 5](#section-5)
- [DB101 — Instance Data Block](#db101--instance-data-block)
- [Section 6](#section-6)
- [Relationship Between OB1, FB101, and DB101](#relationship-between-ob1-fb101-and-db101)
- [Section 7](#section-7)
- [Program Execution Sequence](#program-execution-sequence)
- [Section 8](#section-8)
- [Modular Control Philosophy](#modular-control-philosophy)
- [Section 9](#section-9)
- [Ladder Context Within Program Structure](#ladder-context-within-program-structure)
- [Section 10](#section-10)
- [Summary of PLC Program Structure](#summary-of-plc-program-structure)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Knowledge Layer Built by Article 07](#knowledge-layer-built-by-article-07)

---

Berikut **Outline Artikel 07 — PLC Program Structure** yang tetap **terkunci pada sistem Pump P-101**, serta merujuk langsung pada **arsitektur OB1–FB101–DB101** dan **ladder FB101 Pump_Control yang sudah dirancang**.

Artikel ini penting karena pembaca mulai memahami **bagaimana ladder program yang sudah dipelajari di artikel sebelumnya ditempatkan dalam struktur program PLC Siemens S7**.

Semua bagian tetap mematuhi aturan:

- hanya menggunakan **Pump P-101**
- hanya menggunakan **FB101 Pump_Control**
- tidak membuat **block baru**
- tidak membuat **signal baru**
- tidak menampilkan **network baru**

---

# Article 07

# PLC Program Structure

## System Reference (Locked)

Sistem yang dikontrol tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```text
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Program PLC yang mengontrol sistem ini telah dijelaskan pada artikel sebelumnya melalui ladder **FB101 Pump_Control**.

---

# Section 1

# Why PLC Programs Need Structure

## Engineering Focus

Pada sistem kontrol industri, program PLC tidak hanya terdiri dari ladder tunggal.

Program harus diorganisasi agar:

- mudah dipahami
- mudah dikembangkan
- mudah dipelihara
- dapat digunakan kembali

Dalam PLC Siemens S7, struktur program biasanya terdiri dari:

```text
Organization Block (OB)
Function Block (FB)
Data Block (DB)
```

Artikel ini menjelaskan bagaimana **ladder Pump P-101 ditempatkan dalam struktur tersebut**.

---

# Section 2

# PLC Program Architecture for Pump P-101

Struktur program yang digunakan dalam sistem ini adalah:

```text
PLC CPU
 │
 │
OB1  Main Scan Cycle
 │
 │
FB101 Pump_Control
 │
 │
DB101 Pump_Data
```

Makna struktur:

| Block | Function             |
| ----- | -------------------- |
| OB1   | main execution cycle |
| FB101 | pump control logic   |
| DB101 | instance data pump   |

Semua ladder yang telah dipelajari sebelumnya berada dalam:

```text
FB101 Pump_Control
```

---

# Section 3

# OB1 — Main Scan Cycle

## Engineering Focus

Dalam PLC Siemens S7, **OB1 adalah entry point utama program**.

Setiap scan cycle, PLC menjalankan:

```text
Read Inputs
↓
Execute OB1
↓
Update Outputs
```

Di dalam OB1, PLC memanggil block kontrol pump.

Contoh struktur OB1:

```text
OB1
 │
 │
CALL FB101 , DB101
```

Artinya:

```text
OB1 menjalankan logika pump setiap scan cycle
```

---

# Section 4

# FB101 — Pump Control Logic

FB101 adalah **blok yang berisi seluruh ladder control Pump P-101**.

Struktur ladder di dalam FB101:

```text
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling
 ├ N3 Permissive Logic
 ├ N4 Start/Stop Latch
 ├ N5 Trip Logic
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection
 └ N8 Sequence Interface
```

Semua artikel sebelumnya menjelaskan bagian dari ladder ini.

Contoh:

| Article    | Network |
| ---------- | ------- |
| Article 01 | N1      |
| Article 02 | N2 N4   |
| Article 03 | N3      |
| Article 04 | N5      |
| Article 05 | N6      |
| Article 06 | N7      |

Dengan kata lain:

```text
FB101 adalah modul kontrol lengkap untuk Pump P-101
```

---

# Section 5

# DB101 — Instance Data Block

Function Block di Siemens S7 tidak bekerja sendiri.

FB memerlukan **Data Block** untuk menyimpan state internal.

Dalam sistem ini:

```text
FB101 Pump_Control
│
DB101 Pump_Data
```

DB101 menyimpan:

- status latch
- status alarm
- status trip
- timer instance
- parameter threshold

Contoh data yang tersimpan:

```text
RUN_LATCH
START_FAIL_ACTIVE
ALARM_ACTIVE
TRIP_ACTIVE
```

Ini membuat FB101 dapat mempertahankan **state antar scan cycle**.

---

# Section 6

# Relationship Between OB1, FB101, and DB101

Hubungan ketiga block dapat digambarkan sebagai berikut:

```text
PLC Scan Cycle
     │
     ▼
OB1
     │
     ▼
CALL FB101 Pump_Control
     │
     ▼
DB101 Pump_Data
     │
     ▼
Ladder Logic Execution
```

Dengan struktur ini:

- OB1 menjalankan logika
- FB101 berisi ladder control pump
- DB101 menyimpan data internal

---

# Section 7

# Program Execution Sequence

Ketika PLC berjalan, urutan eksekusi adalah:

```text
Field Inputs Read
↓
OB1 execution
↓
FB101 Pump_Control
↓
Network N1 → N8 executed
↓
Output updated
```

Artinya:

PLC menjalankan **ladder pump control setiap scan cycle**.

---

# Section 8

# Modular Control Philosophy

Pendekatan menggunakan FB memiliki keuntungan:

| Benefit        | Explanation                             |
| -------------- | --------------------------------------- |
| modular design | setiap equipment memiliki block sendiri |
| reuse          | block dapat digunakan untuk pump lain   |
| maintenance    | perubahan logika lebih mudah            |

Dalam sistem ini:

```text
FB101 = Pump Control Module
```

Artikel berikutnya akan menjelaskan konsep ini lebih lanjut.

---

# Section 9

# Ladder Context Within Program Structure

Semua ladder yang telah dibahas sebelumnya berada dalam:

```text
FB101 Pump_Control
```

Contoh hubungan:

```text
N3 Permissive Logic
↓
N4 Start Latch
↓
MTR_START_CMD
```

Network ini dijalankan setiap scan cycle oleh OB1.

---

# Section 10

# Summary of PLC Program Structure

Struktur akhir program PLC untuk Pump P-101:

```text
PLC CPU
 │
OB1
 │
CALL FB101 Pump_Control
 │
DB101 Pump_Data
 │
Network N1 → N8
 │
Motor command output
```

Dengan struktur ini:

```text
Pump P-101 control logic
dapat diorganisasi secara modular
dan dijalankan secara cyclic oleh PLC
```

---

# Ladder Reference Summary

Artikel ini merujuk pada **seluruh ladder di FB101**, tetapi **tidak menampilkan rung baru**.

Network yang dirujuk secara konseptual:

```text
N1
N2
N3
N4
N5
N6
N7
N8
```

Semua ladder tetap berada dalam:

```text
FB101 Pump_Control
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```text
Diagram 3 — PLC Program Architecture
Diagram 4 — Ladder Execution Flow
```

---

# Knowledge Layer Built by Article 07

Artikel ini menambahkan pemahaman berikut:

```text
PLC Scan Cycle
↓
OB1 execution
↓
FB101 Pump Control
↓
DB101 data storage
↓
Ladder networks executed
```

Pembaca sekarang memahami **bagaimana seluruh ladder Pump P-101 ditempatkan dalam struktur program PLC Siemens S7**.

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 08 — Equipment Control Module**, karena di situ pembaca mulai memahami **mengapa FB101 dapat digunakan sebagai reusable control module untuk equipment seperti pump, fan, atau motor lainnya**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
