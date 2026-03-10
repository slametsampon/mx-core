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
  - [1. Executive Summary](#1-executive-summary)
- [2. Locked Article Scope](#2-locked-article-scope)
- [01 — PLC Scan Cycle \& Signal Flow](#01--plc-scan-cycle--signal-flow)
- [02 — Basic Ladder Logic](#02--basic-ladder-logic)
- [03 — Permissive Logic](#03--permissive-logic)
- [04 — Interlock \& Trip Logic](#04--interlock--trip-logic)
- [05 — Alarm vs Trip](#05--alarm-vs-trip)
- [06 — Start Failure Detection](#06--start-failure-detection)
- [07 — PLC Program Structure](#07--plc-program-structure)
- [08 — Equipment Control Module](#08--equipment-control-module)
- [09 — Sequence Control](#09--sequence-control)
- [10 — Shutdown Logic \& Cause Effect](#10--shutdown-logic--cause-effect)
- [3. Peta Konsep Seri](#3-peta-konsep-seri)
- [4. Urutan Membaca](#4-urutan-membaca)
- [5. Hubungan Antar Artikel](#5-hubungan-antar-artikel)
- [Engineering Notes](#engineering-notes)
  - [Engineering Note 1 — PLC Hardware Architecture](#engineering-note-1--plc-hardware-architecture)
  - [Engineering Note 2 — PLC Fault Diagnosis](#engineering-note-2--plc-fault-diagnosis)
  - [Engineering Note 3 — Control PLC vs Safety PLC](#engineering-note-3--control-plc-vs-safety-plc)

---

## 1. Executive Summary

Serial ini menjelaskan **bagaimana PLC ladder logic mengontrol equipment dalam sistem proses industri**.

Fokus utama serial bukan pada pemrograman PLC sebagai software, tetapi pada **hubungan antara kondisi proses, sinyal instrument, logika kontrol PLC, dan respon equipment**.

Hubungan dasar sistem kontrol dapat digambarkan sebagai berikut:

```text
process condition
↓
instrument detection
↓
PLC control logic
↓
equipment response
```

Dengan pendekatan ini engineer diharapkan dapat memahami:

- bagaimana kondisi proses diterjemahkan menjadi sinyal instrument
- bagaimana PLC membaca sinyal tersebut
- bagaimana ladder logic membuat keputusan kontrol
- bagaimana equipment merespon keputusan tersebut

Serial ini dirancang untuk lingkungan **process plant dan rotating equipment**, khususnya pada sistem kontrol berbasis **Siemens S7**.

Topik yang dibahas merupakan **logic control yang benar-benar digunakan di plant industri**, seperti:

- motor control
- permissive logic
- interlock dan trip logic
- alarm dan shutdown logic
- sequence control

---

# 2. Locked Article Scope

Serial ini berfokus pada **equipment control logic menggunakan PLC ladder logic**.

Cakupan utama meliputi:

- PLC scan cycle
- basic ladder logic
- motor control logic
- permissive logic
- interlock dan trip logic
- alarm vs trip
- start failure detection
- PLC program structure
- equipment control module
- sequence control
- shutdown logic

Beberapa topik **tidak dibahas secara mendalam** agar fokus serial tetap pada **logic control equipment**, yaitu:

- desain hardware PLC
- arsitektur industrial communication network
- konfigurasi SCADA / HMI
- desain Safety Instrumented System (SIS)
- engineering SIL dan functional safety

Topik tersebut hanya muncul sebagai **engineering context tambahan**.

---

# 01 — PLC Scan Cycle & Signal Flow

Artikel ini menjelaskan **bagaimana PLC bekerja sebagai sistem pemroses sinyal kontrol**.

Engineer mempelajari bagaimana PLC melakukan siklus operasi berikut:

```text
INPUT
↓
LOGIC
↓
OUTPUT
```

Topik utama:

- PLC scan cycle
- pembacaan input signal
- eksekusi logic program
- update output signal

Pemahaman ini penting untuk memahami **bagaimana PLC merespon kondisi proses secara real time**.

---

# 02 — Basic Ladder Logic

Artikel ini menjelaskan **elemen dasar ladder logic** yang digunakan untuk mengontrol equipment.

Elemen dasar yang dibahas:

- NO contact
- NC contact
- coil
- seal-in circuit
- stop priority

Contoh implementasi yang digunakan adalah **motor start–stop control** yang umum digunakan pada sistem pompa di plant industri.

---

# 03 — Permissive Logic

Permissive logic digunakan untuk memastikan bahwa **equipment hanya dapat start jika kondisi operasi aman terpenuhi**.

Contoh permissive pada pump system:

```text
MCC healthy
AND suction valve open
→ pump start allowed
```

Artikel ini menjelaskan bagaimana PLC memastikan bahwa **kondisi operasi aman sebelum equipment dijalankan**.

---

# 04 — Interlock & Trip Logic

Interlock dan trip logic digunakan untuk **melindungi equipment dari kondisi proses yang berbahaya**.

Contoh trip condition:

```text
Low suction pressure
→ pump trip
```

Artikel ini menjelaskan bagaimana PLC melakukan **protective stop terhadap equipment** ketika kondisi proses tidak aman.

---

# 05 — Alarm vs Trip

Artikel ini menjelaskan **perbedaan antara alarm dan trip dalam sistem kontrol proses**.

Contoh respon sistem:

```text
Alarm
→ operator response
```

```text
Trip
→ automatic equipment stop
```

Engineer mempelajari bagaimana sistem kontrol membedakan **deviasi proses yang memerlukan tindakan operator dan deviasi yang memerlukan shutdown otomatis**.

---

# 06 — Start Failure Detection

Start failure detection digunakan untuk mendeteksi kondisi dimana **equipment menerima perintah start tetapi tidak benar-benar berjalan**.

Contoh logika:

```text
RUN command ON
AND feedback tidak muncul
→ start fail alarm
```

Logika ini sering digunakan pada:

- motor
- pump
- compressor

untuk meningkatkan **diagnosis kegagalan equipment**.

---

# 07 — PLC Program Structure

Artikel ini menjelaskan **struktur program PLC pada Siemens S7**.

Struktur utama yang dibahas:

- Organization Block (OB)
- Function Block (FB)
- Data Block (DB)

Engineer mempelajari bagaimana program PLC diorganisasi agar:

- mudah dipahami
- mudah dikembangkan
- mudah dipelihara

---

# 08 — Equipment Control Module

Artikel ini menjelaskan pendekatan **modular control logic** menggunakan reusable module.

Equipment control module biasanya digunakan untuk:

- motor
- valve
- pump
- fan

Pendekatan modular membuat program PLC:

- lebih konsisten
- lebih mudah dikembangkan
- lebih mudah di-maintain

---

# 09 — Sequence Control

Sequence control digunakan ketika **equipment harus beroperasi dalam urutan tertentu**.

Contoh sequence pada pump system:

```text
1 suction valve open
2 motor start
3 discharge valve open
```

Artikel ini menjelaskan bagaimana PLC mengontrol **step-by-step operation dalam proses industri**.

---

# 10 — Shutdown Logic & Cause Effect

Artikel ini menjelaskan **hubungan antara deviasi proses dan shutdown sistem**.

Struktur dasar shutdown system:

```text
process deviation
↓
trip logic
↓
equipment shutdown
```

Shutdown system bertujuan untuk:

- melindungi equipment
- mencegah eskalasi proses
- mencegah potensi kebakaran atau ledakan

Artikel ini memperkenalkan konsep **cause & effect dalam sistem proteksi proses**.

---

# 3. Peta Konsep Seri

Jika seluruh artikel dilihat sebagai satu sistem pengetahuan, maka struktur konsep serial adalah:

```text
PLC behaviour
↓
equipment control logic
↓
program architecture
↓
process automation
↓
process protection
```

Struktur ini menunjukkan bagaimana pemahaman engineer berkembang dari **operasi dasar PLC hingga proteksi sistem proses**.

---

# 4. Urutan Membaca

Urutan membaca yang direkomendasikan:

1 — PLC Scan Cycle & Signal Flow
2 — Basic Ladder Logic
3 — Permissive Logic
4 — Interlock & Trip Logic
5 — Alarm vs Trip
6 — Start Failure Detection
7 — PLC Program Structure
8 — Equipment Control Module
9 — Sequence Control
10 — Shutdown Logic & Cause Effect

Urutan ini mengikuti perkembangan pemahaman berikut:

```text
PLC behaviour
↓
basic ladder logic
↓
equipment control logic
↓
program architecture
↓
process automation
↓
process protection
```

---

# 5. Hubungan Antar Artikel

Hubungan antar artikel dalam serial ini dapat digambarkan sebagai berikut:

```text
PLC Scan Cycle
↓
Basic Ladder Logic
↓
Equipment Control Logic
   ├ Permissive
   ├ Interlock
   ├ Alarm
   └ Start Failure
↓
Program Architecture
   ├ PLC Program Structure
   └ Equipment Control Module
↓
Process Automation
   └ Sequence Control
↓
Process Protection
   └ Shutdown Logic
```

Struktur ini menunjukkan bahwa setiap artikel membangun **lapisan pemahaman yang berbeda dalam sistem kontrol industri**.

---

# Engineering Notes

Engineering Notes memberikan konteks tambahan mengenai beberapa aspek sistem kontrol industri yang **tidak menjadi fokus utama serial**, namun penting dipahami oleh engineer yang bekerja dengan PLC di plant industri.

---

## Engineering Note 1 — PLC Hardware Architecture

PLC merupakan sistem kontrol berbasis **hardware modular** yang terdiri dari beberapa komponen utama.

Komponen utama PLC system:

- CPU module
- I/O modules
- I/O rack
- remote I/O
- communication bus
- power supply module

Hubungan antara komponen tersebut dapat digambarkan sebagai berikut:

```text
FIELD DEVICE
↓
I/O MODULE
↓
PLC CPU
↓
CONTROL LOGIC
↓
OUTPUT SIGNAL
↓
EQUIPMENT
```

Pemahaman arsitektur hardware PLC penting untuk:

- instalasi sistem kontrol
- integrasi instrument
- diagnosa kegagalan modul
- pengembangan sistem kontrol yang lebih besar

Namun detail engineering hardware tidak menjadi fokus utama serial ini karena serial berfokus pada **control logic equipment**.

---

## Engineering Note 2 — PLC Fault Diagnosis

Dalam operasi plant sering terjadi kondisi dimana **equipment tidak merespon perintah PLC**.

Beberapa penyebab umum kegagalan sistem PLC meliputi:

```text
I/O failure
communication loss
module fault
power supply failure
```

Diagnosis sistem biasanya melibatkan pemeriksaan terhadap:

- status I/O module
- diagnostic buffer PLC
- communication network
- feedback signal dari field device

Engineer biasanya menggunakan kombinasi dari:

- PLC diagnostics
- signal monitoring
- equipment inspection

untuk menentukan penyebab kegagalan sistem kontrol.

---

## Engineering Note 3 — Control PLC vs Safety PLC

Dalam plant proses berskala besar biasanya terdapat dua sistem kontrol yang berbeda:

```text
Control PLC
→ process control
```

```text
Safety PLC (SIS)
→ safety protection
```

Control PLC digunakan untuk:

- mengontrol operasi equipment
- menjalankan sequence proses
- mengelola alarm sistem

Sedangkan **Safety PLC** digunakan untuk menjalankan fungsi proteksi keselamatan plant seperti:

- emergency shutdown
- high pressure trip
- fire and gas shutdown

Safety system biasanya dirancang mengikuti standar keselamatan industri seperti:

- IEC 61508
- IEC 61511

Karena fokus serial ini adalah **equipment control logic**, desain sistem keselamatan tidak dibahas secara mendalam dalam artikel utama.
