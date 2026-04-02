---
title: Case Study - Pump Control (Vendor-Neutral)
authors: ['sam']
date: '2026-03-29'
tags:
  [
    'plc-case-study',
    'pump-control',
    'control-logic-design',
    'industrial-automation',
    'layered-control',
  ]
draft: false
summary: Case study Pump P-101 menunjukkan integrasi lengkap dari system definition hingga layered control logic. Dimulai dari boundary BPCS vs SIS, dilanjutkan dengan I/O list, klasifikasi LOPA, dan penyusunan signal architecture yang konsisten. Logic kemudian disusun dalam bentuk logic map sebelum ditransformasikan ke dalam layered mapping yang terstruktur. Signal flow memastikan semua data melewati jalur yang benar tanpa bypass. Behaviour sistem mencakup start, stop, trip, dan alarm yang jelas. Validasi memastikan desain memenuhi prinsip deterministic, fail-safe, dan tanpa dependency tersembunyi. Case ini menjadi referensi langsung untuk desain equipment lain secara konsisten.
---

# 🚀 **_ARTICLE 9: Case Study: Pump Control (Vendor-Neutral)_**

---

- [🚀 **_ARTICLE 9: Case Study: Pump Control (Vendor-Neutral)_**](#-article-9-case-study-pump-control-vendor-neutral)
  - [1. Objective](#1-objective)
  - [Tujuan akhir](#tujuan-akhir)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Dependency](#dependency)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 System Definition (Pump P-101)](#41-system-definition-pump-p-101)
  - [Tujuan](#tujuan)
  - [Ilustrasi Sistem Pump](#ilustrasi-sistem-pump)
  - [Deskripsi Sistem](#deskripsi-sistem)
  - [Fungsi Utama](#fungsi-utama)
  - [Mode Operasi](#mode-operasi)
  - [Implikasi Engineering](#implikasi-engineering)
- [4.2 System Boundary (LOPA Context)](#42-system-boundary-lopa-context)
  - [Tujuan](#tujuan-1)
  - [Ilustrasi Boundary BPCS vs SIS](#ilustrasi-boundary-bpcs-vs-sis)
  - [Boundary](#boundary)
  - [Implikasi](#implikasi)
  - [Design Consequence](#design-consequence)
- [4.3 Equipment Breakdown](#43-equipment-breakdown)
  - [Tujuan](#tujuan-2)
  - [Ilustrasi Equipment Interaction](#ilustrasi-equipment-interaction)
  - [Komponen Utama](#komponen-utama)
  - [Interaksi](#interaksi)
  - [Implikasi Engineering](#implikasi-engineering-1)
- [4.4 I/O List (BASELINE ENGINEERING)](#44-io-list-baseline-engineering)
  - [Tujuan](#tujuan-3)
  - [Ilustrasi I/O Mapping](#ilustrasi-io-mapping)
  - [Digital Input (DI)](#digital-input-di)
  - [Digital Output (DO)](#digital-output-do)
  - [Analog Input (AI)](#analog-input-ai)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Design Consequence](#design-consequence-1)
- [4.5 LOPA Classification](#45-lopa-classification)
  - [Tujuan](#tujuan-4)
  - [Ilustrasi LOPA Mapping](#ilustrasi-lopa-mapping)
  - [Mapping Signal](#mapping-signal)
  - [Implikasi](#implikasi-1)
  - [Design Consequence](#design-consequence-2)
- [4.6 Signal Architecture (Tag System)](#46-signal-architecture-tag-system)
  - [Tujuan](#tujuan-5)
  - [Ilustrasi Signal Structure](#ilustrasi-signal-structure)
  - [Field Signal](#field-signal)
  - [Conditioned Signal](#conditioned-signal)
  - [Internal Signal](#internal-signal)
  - [Naming Principle](#naming-principle)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Design Consequence](#design-consequence-3)
- [4.7 Control Logic Map (HIGH LEVEL)](#47-control-logic-map-high-level)
  - [Struktur](#struktur)
  - [Ilustrasi Logic Map](#ilustrasi-logic-map)
  - [Fungsi Utama](#fungsi-utama-1)
  - [Implikasi Engineering](#implikasi-engineering-4)
  - [Design Consequence](#design-consequence-4)
- [4.8 Layered Mapping (CORE IMPLEMENTATION)](#48-layered-mapping-core-implementation)
  - [Tujuan](#tujuan-6)
  - [Ilustrasi Layer Mapping](#ilustrasi-layer-mapping)
  - [Layer 1 — Input Conditioning](#layer-1--input-conditioning)
  - [Layer 2 — Command](#layer-2--command)
  - [Layer 3 — Permissive](#layer-3--permissive)
  - [Layer 4 — Latch](#layer-4--latch)
  - [Layer 5 — Trip](#layer-5--trip)
  - [Layer 6 — Alarm](#layer-6--alarm)
  - [Layer 7 — Start Failure](#layer-7--start-failure)
  - [Layer 8 — Sequence](#layer-8--sequence)
  - [Implikasi Engineering](#implikasi-engineering-5)
- [4.9 Signal Flow dalam Sistem](#49-signal-flow-dalam-sistem)
  - [Alur](#alur)
  - [Ilustrasi Signal Flow](#ilustrasi-signal-flow)
  - [Prinsip](#prinsip)
  - [Implikasi Engineering](#implikasi-engineering-6)
- [4.10 Behaviour Summary](#410-behaviour-summary)
  - [Start Path](#start-path)
  - [Stop Path](#stop-path)
  - [Trip Path](#trip-path)
  - [Alarm Path](#alarm-path)
  - [Ilustrasi Behaviour](#ilustrasi-behaviour)
- [4.11 Design Validation](#411-design-validation)
  - [Checklist](#checklist)
  - [Implikasi Engineering](#implikasi-engineering-7)
- [4.12 Implikasi Engineering](#412-implikasi-engineering)
  - [Dengan Framework](#dengan-framework)
  - [Tanpa Framework](#tanpa-framework)

---

## 1. Objective

Mengintegrasikan seluruh konsep dari Artikel 1–8 ke dalam satu case nyata:

```text id="obj_a9"
Pump Control System (P-101)
```

---

## Tujuan akhir

```text id="goal_a9"
Engineer mampu melihat alur lengkap:
System → LOPA → I/O → Signal → Layer → Logic Map
```

---

## 2. Position dalam Serial

Artikel ini adalah:

```text id="pos_a9"
jembatan antara:
framework (Artikel 1–8)
dan
implementasi nyata (Artikel 10)
```

---

## Dependency

- Artikel 1–8 (WAJIB dipahami)

---

## Peran Artikel

```text id="role_a9"
menjadi reference design yang bisa ditiru untuk equipment lain
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- definisi sistem pump
- I/O lengkap
- klasifikasi LOPA
- tag system
- logic map
- layered mapping

---

✓ Tidak dibahas

- syntax ladder vendor
- detail implementasi PLC

---

# 4.1 System Definition (Pump P-101)

---

## Tujuan

Menentukan konteks sistem yang akan dikontrol

---

## Ilustrasi Sistem Pump

![Image](https://images.ctfassets.net/w6r2i5d8q73s/3YpMNzxBWAIaeK74yRnXc1/fed60ef2505d1d0dbcfa8e3971263b30/P_ID-software_hero_xxl_sub-use-case_img_EN?fm=webp&q=75)

---

## Deskripsi Sistem

- centrifugal pump
- motor driven
- memiliki:

  - suction line
  - discharge line

---

## Fungsi Utama

---

✓ 1. Memindahkan fluida

---

✓ 2. Menjaga flow dalam sistem

---

## Mode Operasi

---

✓ 1. Manual Start

- melalui pushbutton

---

✓ 2. Remote Start

- melalui HMI / system

---

## Implikasi Engineering

```text id="impl_sys_a9"
PLC mengontrol perilaku sistem fluida melalui motor pump
```

---

# 4.2 System Boundary (LOPA Context)

---

## Tujuan

Menentukan batas antara control dan safety

---

## Ilustrasi Boundary BPCS vs SIS

![Image](https://media.licdn.com/dms/image/v2/D5622AQHlcPFAb8y_JA/feedshare-shrink_800/B56Zuhi1DFG0Ag-/0/1767941831413?e=2147483647&t=dSxMQjS-rkJ8c26HFJSczS89R7cQufouPWIQB-prZ2Q&v=beta)

---

## Boundary

| Fungsi                 | Sistem |
| ---------------------- | ------ |
| Start/Stop             | BPCS   |
| Permissive             | BPCS   |
| Trip (low suction)     | BPCS   |
| Safety Trip (critical) | SIS    |

---

## Implikasi

```text id="bpcs_sis_a9"
FB101 hanya menangani BPCS logic
```

---

## Design Consequence

---

Jika boundary tidak jelas:

- safety masuk ke PLC biasa
- sistem tidak compliant

---

# 4.3 Equipment Breakdown

---

## Tujuan

Menentukan elemen fisik yang dikontrol

---

## Ilustrasi Equipment Interaction

![Image](https://cdn.automationforum.co/uploads/2025/07/PLC-Program-for-Motor-Starter-with-Low-Level-Switch-Interlock-3-1024x566.jpg)

---

## Komponen Utama

---

✓ 1. Motor

- penggerak pump

---

✓ 2. Pump

- memindahkan fluida

---

✓ 3. Valve Suction

- memastikan suction tersedia

---

✓ 4. Valve Discharge

- mengatur output

---

## Interaksi

---

✓ 1. Valve harus open sebelum start

---

✓ 2. Motor harus ready

---

## Implikasi Engineering

```text id="equip_a9"
control logic harus mengikuti hubungan antar equipment
```

---

# 4.4 I/O List (BASELINE ENGINEERING)

---

## Tujuan

Menentukan seluruh interface antara sistem fisik dan PLC

---

## Ilustrasi I/O Mapping

![Image](https://cdn.automationforum.co/uploads/2023/10/io-list-scaled.jpg)

---

## Digital Input (DI)

---

- PB_START
- PB_STOP
- MCC_RDY
- OL_TRIP
- XV101_OPEN
- XV102_OPEN
- MTR_RUN_FB
- LSL101 / LOW_SUCT_PRESS

---

## Digital Output (DO)

---

- MTR_START_CMD
- ALM_P101
- TRIP_P101
- START_FAIL_ALM

---

## Analog Input (AI)

---

- PT101_PV

---

## Implikasi Engineering

```text id="io_a9"
semua logic harus berasal dari I/O ini
```

---

## Design Consequence

---

Jika I/O tidak lengkap:

- logic tidak lengkap
- sistem tidak dapat beroperasi

---

# 4.5 LOPA Classification

---

## Tujuan

Menentukan fungsi setiap signal dalam konteks protection layer

---

## Ilustrasi LOPA Mapping

![Image](https://media.licdn.com/dms/image/v2/D4E12AQE0U0OcxpiSHA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1735954595513?e=2147483647&t=6kD0PQO8pC1rYt-SMlQwqjjfZOsN56tYHNV6tDfaA3w&v=beta)

---

## Mapping Signal

| Signal             | Kategori   |
| ------------------ | ---------- |
| PB_START           | Control    |
| MCC_RDY            | Permissive |
| XV101_OPEN         | Permissive |
| OL_TRIP            | Trip       |
| LOW_SUCT_PRESS     | Trip       |
| PT101              | Process    |
| High-High Pressure | SIS        |

---

## Implikasi

```text id="lopa_map_a9"
tidak semua trip adalah safety
```

---

## Design Consequence

---

Jika klasifikasi salah:

- trip tidak bekerja
- atau safety tidak independent

---

# 4.6 Signal Architecture (Tag System)

---

## Tujuan

Menyusun seluruh signal menjadi struktur yang siap digunakan dalam logic

---

## Ilustrasi Signal Structure

![Image](https://cdn.forumautomation.com/original/2X/9/9b90a883c8362f75db928a5ad7504523732dfd80.png)

![Image](https://symbiosisonlinepublishing.com/computer-science-technology/images/computer-science-information-technology38-g014.gif)

---

## Field Signal

---

- PB_START
- MCC_RDY
- PT101_PV

---

## Conditioned Signal

---

- MCC_HEALTHY
- SUCT_PRESS_LOW
- VALVE_READY

---

## Internal Signal

---

- CMD_START_REQ
- RUN_LATCH
- TRIP_ACTIVE

---

## Naming Principle

---

- konsisten
- tidak berubah

---

## Implikasi Engineering

```text id="sig_a9"
logic hanya menggunakan conditioned dan internal signal
```

---

## Design Consequence

---

Jika raw signal digunakan:

- logic tidak konsisten
- sulit di-maintain

---

# 4.7 Control Logic Map (HIGH LEVEL)

---

## Struktur

```text id="logic_map_a9"
Command → Permissive → Latch → Trip → Alarm
```

---

## Ilustrasi Logic Map

![Image](https://global.discourse-cdn.com/digikey/original/3X/f/e/fe2aab28b0b9a8d6f7349984c29e961c50aacb34.png)

---

## Fungsi Utama

---

✓ 1. Start Logic

- menerima command
- mengecek permissive

---

✓ 2. Stop Logic

- reset RUN_LATCH

---

✓ 3. Trip Logic

- menghentikan sistem

---

✓ 4. Alarm Logic

- memberikan indikasi

---

✓ 5. Start Failure

- deteksi gagal start

---

## Implikasi Engineering

```text id="logic_a9"
logic disusun sebelum ditulis dalam ladder
```

---

## Design Consequence

---

Jika logic map tidak dibuat:

- ladder menjadi trial-error
- tidak terstruktur

---

# 4.8 Layered Mapping (CORE IMPLEMENTATION)

---

## Tujuan

Mentransformasikan logic map menjadi struktur layer yang terdefinisi

---

## Ilustrasi Layer Mapping

![Image](https://media.licdn.com/dms/image/v2/D4E12AQGRpYf3Qr6R7Q/article-inline_image-shrink_400_744/B4EZqTTP8BGUAY-/0/1763407892003?e=2147483647&t=KqWWbuk9S2hYeEAK4MvP_2ydXmNPqoUoJVDACd48c58&v=beta)

---

## Layer 1 — Input Conditioning

---

- MCC_RDY → MCC_HEALTHY
- PT101_PV → SUCT_PRESS_LOW

---

## Layer 2 — Command

---

- PB_START → CMD_START_REQ

---

## Layer 3 — Permissive

---

- MCC_HEALTHY
- VALVE_READY

---

## Layer 4 — Latch

---

- RUN_LATCH

---

## Layer 5 — Trip

---

- OL_TRIP
- LOW_SUCT_PRESS

---

## Layer 6 — Alarm

---

- ALM_P101

---

## Layer 7 — Start Failure

---

- timer + MTR_RUN_FB

---

## Layer 8 — Sequence

---

- READY
- RUNNING
- TRIP

---

## Implikasi Engineering

```text id="layer_a9"
struktur ini menjadi template tetap untuk semua equipment
```

---

# 4.9 Signal Flow dalam Sistem

---

## Alur

```text id="flow_a9"
Field → I/O → Conditioned → Logic → Output → Equipment
```

---

## Ilustrasi Signal Flow

![Image](https://media.licdn.com/dms/image/v2/D4D22AQE7uJ4oKiaqLg/feedshare-shrink_800/B4DZfuYGoAHAAk-/0/1752050992726?e=2147483647&t=2wzeSahPh5XC0QLpsH7mbA3iryGD6F1VQuZieV7MdhE&v=beta)

---

## Prinsip

---

✓ 1. Semua signal melalui conditioning

---

✓ 2. Semua keputusan di logic

---

✓ 3. Output melalui I/O

---

## Implikasi Engineering

- flow harus traceable
- tidak boleh ada bypass

---

# 4.10 Behaviour Summary

---

## Start Path

---

- CMD_START_REQ
  → cek permissive
  → set RUN_LATCH

---

## Stop Path

---

- CMD_STOP_REQ
  → reset RUN_LATCH

---

## Trip Path

---

- TRIP condition
  → reset RUN_LATCH

---

## Alarm Path

---

- alarm condition
  → aktifkan ALM_P101

---

## Ilustrasi Behaviour

![Image](https://cdn.automationforum.co/uploads/2026/01/PLC-Permissive-Logic-Troubleshooting-Procedure-for-Instrumentation-Engineers-6-1024x581.jpg)

---

# 4.11 Design Validation

---

## Checklist

---

- LOPA compliant
- signal lengkap
- layering benar
- tidak ada cross dependency
- fail-safe OK

---

## Implikasi Engineering

```text id="val_a9"
desain harus valid sebelum implementasi ladder
```

---

# 4.12 Implikasi Engineering

---

## Dengan Framework

---

- design konsisten
- reusable
- scalable

---

## Tanpa Framework

```text id="fail_a9"
logic akan:
- acak
- tidak reusable
- sulit dipahami
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
