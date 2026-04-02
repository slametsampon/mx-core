---
title: Control Design Workflow - Dari Sistem ke Logic
authors: ['sam']
date: '2026-03-31'
tags:
  [
    'plc-workflow',
    'control-design',
    'engineering-process',
    'industrial-automation',
    'plc-logic-design',
  ]
draft: false
summary: Control design workflow memberikan langkah sistematis mulai dari definisi sistem hingga validasi desain sebelum implementasi. Proses dimulai dari penentuan boundary, identifikasi equipment, dan definisi I/O, kemudian dilanjutkan dengan klasifikasi LOPA untuk memastikan pemisahan fungsi control, protection, dan safety. Signal kemudian disusun melalui struktur dan naming yang konsisten sebelum digunakan dalam layered logic. Setelah logic map selesai, dilakukan validasi menyeluruh terhadap LOPA, signal, logic, authority, dan fail-safe. Workflow ini memastikan desain tidak berbasis trial-error, tetapi berbasis struktur engineering yang dapat direplikasi dan menghasilkan sistem yang stabil serta aman.
---

# 🚀 **_ARTICLE 8: Control Design Workflow: Dari Sistem ke Logic_**

---

- [🚀 **_ARTICLE 8: Control Design Workflow: Dari Sistem ke Logic_**](#-article-8-control-design-workflow-dari-sistem-ke-logic)
  - [1. Objective](#1-objective)
  - [Sesuai dengan](#sesuai-dengan)
  - [Tujuan akhir](#tujuan-akhir)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Dependency](#dependency)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 Kenapa Workflow Dibutuhkan](#41-kenapa-workflow-dibutuhkan)
  - [Problem tanpa workflow](#problem-tanpa-workflow)
  - [Root Cause](#root-cause)
  - [Ilustrasi Tanpa vs Dengan Workflow](#ilustrasi-tanpa-vs-dengan-workflow)
  - [Implikasi Engineering](#implikasi-engineering)
- [4.2 Overview Workflow](#42-overview-workflow)
  - [Urutan Utama](#urutan-utama)
  - [Ilustrasi Workflow](#ilustrasi-workflow)
  - [Prinsip](#prinsip)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Design Consequence](#design-consequence)
- [4.3 Step 1 — Define System Boundary](#43-step-1--define-system-boundary)
  - [Tujuan](#tujuan)
  - [Ilustrasi System Boundary](#ilustrasi-system-boundary)
  - [Pertanyaan Kunci](#pertanyaan-kunci)
  - [Output](#output)
  - [Referensi](#referensi)
  - [Constraint](#constraint)
  - [Kesalahan Umum](#kesalahan-umum)
  - [Design Consequence](#design-consequence-1)
- [4.4 Step 2 — Define Equipment](#44-step-2--define-equipment)
  - [Tujuan](#tujuan-1)
  - [Ilustrasi Equipment System](#ilustrasi-equipment-system)
  - [Contoh Equipment](#contoh-equipment)
  - [Detail yang Harus Didefinisikan](#detail-yang-harus-didefinisikan)
  - [Output](#output-1)
  - [Constraint](#constraint-1)
  - [Kesalahan Umum](#kesalahan-umum-1)
  - [Design Consequence](#design-consequence-2)
- [4.5 Step 3 — Define I/O](#45-step-3--define-io)
  - [Tujuan](#tujuan-2)
  - [Ilustrasi I/O Definition](#ilustrasi-io-definition)
  - [Kategori I/O](#kategori-io)
  - [Output](#output-2)
  - [Referensi](#referensi-1)
  - [Constraint](#constraint-2)
  - [Kesalahan Umum](#kesalahan-umum-2)
  - [Design Consequence](#design-consequence-3)
- [4.6 Step 4 — Classify LOPA](#46-step-4--classify-lopa)
  - [Tujuan](#tujuan-3)
  - [Ilustrasi LOPA Classification](#ilustrasi-lopa-classification)
  - [Klasifikasi](#klasifikasi)
  - [Output](#output-3)
  - [Referensi](#referensi-2)
  - [Constraint](#constraint-3)
  - [Kesalahan Umum](#kesalahan-umum-3)
  - [Design Consequence](#design-consequence-4)
- [4.7 Step 5 — Build Signal \& Tag](#47-step-5--build-signal--tag)
  - [Tujuan](#tujuan-4)
  - [Ilustrasi Signal Structuring](#ilustrasi-signal-structuring)
  - [Aktivitas](#aktivitas)
  - [Output](#output-4)
  - [Referensi](#referensi-3)
  - [Constraint](#constraint-4)
  - [Kesalahan Umum](#kesalahan-umum-4)
  - [Design Consequence](#design-consequence-5)
- [🚀 ARTICLE 8 — RESPONSE 3 (FINAL)](#-article-8--response-3-final)
- [4.8 Step 6 — Build Layered Logic](#48-step-6--build-layered-logic)
  - [Tujuan](#tujuan-5)
  - [Ilustrasi Layered Logic Mapping](#ilustrasi-layered-logic-mapping)
  - [Aktivitas](#aktivitas-1)
  - [Output](#output-5)
  - [Referensi](#referensi-4)
  - [Constraint](#constraint-5)
  - [Kesalahan Umum](#kesalahan-umum-5)
  - [Design Consequence](#design-consequence-6)
- [4.9 Step 7 — Validate Design (CRITICAL)](#49-step-7--validate-design-critical)
  - [Tujuan](#tujuan-6)
  - [Ilustrasi Validation Process](#ilustrasi-validation-process)
  - [Validasi](#validasi)
  - [Tool](#tool)
  - [Constraint](#constraint-6)
  - [Design Consequence](#design-consequence-7)
- [4.10 Output Workflow](#410-output-workflow)
  - [Hasil Akhir](#hasil-akhir)
  - [Status](#status)
  - [Implikasi Engineering](#implikasi-engineering-2)
- [4.11 Contoh Alur Singkat (Mini Case)](#411-contoh-alur-singkat-mini-case)
  - [Contoh: Pump Control](#contoh-pump-control)
  - [Ilustrasi Mini Flow](#ilustrasi-mini-flow)
- [4.12 Kesalahan Umum dalam Workflow](#412-kesalahan-umum-dalam-workflow)
  - [1. Langsung ke ladder](#1-langsung-ke-ladder)
  - [2. Skip LOPA](#2-skip-lopa)
  - [3. Tidak membuat tag system](#3-tidak-membuat-tag-system)
  - [4. Tidak menggunakan layering](#4-tidak-menggunakan-layering)
  - [5. Tidak melakukan validasi](#5-tidak-melakukan-validasi)
  - [Implikasi Engineering](#implikasi-engineering-3)

---

## 1. Objective

Menyusun workflow sistematis untuk desain control logic PLC yang:

- terstruktur
- repeatable
- tidak bergantung vendor

---

## Sesuai dengan

- LOPA (Artikel 2)
- Architecture (Artikel 3)
- Execution Model (Artikel 4)
- Principles (Artikel 5)
- Signal (Artikel 6)
- Layering (Artikel 7)

---

## Tujuan akhir

```text id="obj_a8"
Engineer mampu:
- memulai desain dari nol
- menyusun control logic secara sistematis
- menghindari trial-error
```

---

## 2. Position dalam Serial

Artikel ini adalah:

```text id="pos_a8"
pengikat seluruh artikel sebelumnya
menjadi workflow nyata
```

---

## Dependency

- Artikel 1 → system understanding
- Artikel 2 → LOPA
- Artikel 3 → architecture
- Artikel 4 → execution model
- Artikel 5 → design principles
- Artikel 6 → signal structure
- Artikel 7 → layered pattern

---

## Peran Artikel

```text id="role_a8"
menjadi "cara kerja engineer" dalam project nyata
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- langkah desain dari awal sampai siap implementasi
- hubungan antar tahap desain
- validasi desain sebelum implementasi

---

✓ Tidak dibahas

- detail ladder (Artikel 9)
- vendor implementation (Artikel 10)

---

# 4.1 Kenapa Workflow Dibutuhkan

---

## Problem tanpa workflow

---

✓ 1. Engineer langsung menulis ladder

---

✓ 2. Logic trial-error

---

✓ 3. Tidak konsisten antar project

---

✓ 4. Sulit di-review

---

## Root Cause

```text id="root_a8"
tidak ada urutan kerja yang jelas
```

---

## Ilustrasi Tanpa vs Dengan Workflow

![Image](https://media.licdn.com/dms/image/v2/D4D22AQEpP7hUaNm0GA/feedshare-shrink_800/B4DZXsMo9cHkAg-/0/1743424495339?e=2147483647&t=aY6eWOKOAUjnk72Ea-J6xlK9Umt9MG0IoxY3bDGObmk&v=beta)

---

## Implikasi Engineering

```text id="imp_a8"
desain PLC harus mengikuti workflow tetap
```

---

# 4.2 Overview Workflow

---

## Urutan Utama

```text id="flow_a8"
1. Define System Boundary
2. Define Equipment
3. Define I/O
4. Classify LOPA
5. Build Signal & Tag
6. Build Layered Logic
7. Validate Design
```

---

## Ilustrasi Workflow

![Image](https://www.researchgate.net/publication/327906805/figure/fig6/AS%3A675420445896710%401538044191942/PLC-Process-Flowchart.ppm)

---

## Prinsip

```text id="principle_a8"
tidak boleh lompat tahap
```

---

## Implikasi Engineering

- setiap tahap memiliki output
- output menjadi input tahap berikutnya

---

## Design Consequence

---

Jika workflow dilanggar:

- desain tidak lengkap
- logic tidak konsisten
- error muncul di lapangan

---

# 4.3 Step 1 — Define System Boundary

---

## Tujuan

Menentukan batas tanggung jawab sistem kontrol PLC

---

## Ilustrasi System Boundary

![Image](https://www.manufacturingtomorrow.com/images/upload/images/What-is-PLC-programmable-logic-controller.jpg)

---

## Pertanyaan Kunci

```text id="step1_q"
- apa yang dikontrol PLC?
- apa yang hanya dimonitor?
- apa yang dikontrol sistem lain (SIS/DCS)?
```

---

## Output

- definisi boundary sistem
- pembagian tanggung jawab jelas

---

## Referensi

- Artikel 1 (system context)
- Artikel 2 (LOPA)

---

## Constraint

---

✓ 1. Harus eksplisit

---

✓ 2. Tidak boleh asumsi

---

## Kesalahan Umum

---

✓ 1. Semua fungsi dimasukkan ke PLC

---

✓ 2. Tidak membedakan control vs safety

---

## Design Consequence

---

Jika boundary tidak jelas:

- overlap fungsi
- conflict antar sistem
- unsafe behaviour

---

# 4.4 Step 2 — Define Equipment

---

## Tujuan

Menentukan objek fisik yang akan dikontrol

---

## Ilustrasi Equipment System

![Image](https://www.researchgate.net/publication/328702938/figure/fig1/AS%3A966662136274950%401607481621438/Schematic-diagram-of-the-valve-flow-control-system.ppm)

---

## Contoh Equipment

- pump
- motor
- valve

---

## Detail yang Harus Didefinisikan

---

✓ 1. Mode Operasi

- manual
- auto

---

✓ 2. Relasi Antar Equipment

- interlock
- dependency

---

## Output

- daftar equipment
- relasi antar equipment

---

## Constraint

```text id="step2_const"
equipment harus didefinisikan sebelum logic dibuat
```

---

## Kesalahan Umum

---

✓ 1. Tidak memahami equipment

---

✓ 2. Tidak mendefinisikan hubungan

---

## Design Consequence

---

Jika equipment tidak jelas:

- logic tidak sesuai sistem
- behaviour tidak realistis

---

# 4.5 Step 3 — Define I/O

---

## Tujuan

Mengidentifikasi semua interface antara PLC dan field

---

## Ilustrasi I/O Definition

![Image](https://www.industrialautomationco.com/cdn/shop/articles/Understanding_the_Differences_Between_Digital_and_Analog_Inputs_in_PLCs_1024x.png?v=1724291488)

---

## Kategori I/O

---

✓ 1. Digital Input (DI)

- PB_START
- MCC_RDY

---

✓ 2. Digital Output (DO)

- MTR_START
- VALVE_OPEN

---

✓ 3. Analog Input (AI)

- pressure
- flow

---

✓ 4. Analog Output (AO)

- VFD speed
- valve control

---

## Output

- I/O list lengkap

---

## Referensi

- Artikel 3

---

## Constraint

---

✓ 1. Tidak boleh ada I/O yang tidak terdefinisi

---

✓ 2. Harus traceable ke equipment

---

## Kesalahan Umum

---

✓ 1. I/O tidak lengkap

---

✓ 2. Signal tidak jelas

---

## Design Consequence

---

Jika I/O tidak lengkap:

- logic tidak lengkap
- sistem tidak bekerja

---

# 4.6 Step 4 — Classify LOPA

---

## Tujuan

Menentukan posisi setiap fungsi dalam protection layer

---

## Ilustrasi LOPA Classification

![Image](https://media.licdn.com/dms/image/v2/D4D22AQE6BC4QsPCmow/feedshare-shrink_800/B4DZv1SlbWJoAk-/0/1769346848880?e=2147483647&t=YVmsK-z0Td-CaFEsIZadDXJy_IV5vwvBxft-iskjMbk&v=beta)

---

## Klasifikasi

---

✓ 1. Control

- operasi normal

---

✓ 2. Alarm

- indikasi abnormal

---

✓ 3. Interlock / Trip

- menghentikan sistem

---

✓ 4. Safety (SIS)

- proteksi tingkat tinggi

---

## Output

- setiap signal memiliki kategori fungsi

---

## Referensi

- Artikel 2

---

## Constraint

```text id="step4_rule"
tidak boleh salah klasifikasi
```

---

## Kesalahan Umum

---

✓ 1. Alarm digunakan sebagai trip

---

✓ 2. Safety dimasukkan ke PLC biasa

---

## Design Consequence

---

Jika salah klasifikasi:

- sistem tidak aman
- pelanggaran LOPA

---

# 4.7 Step 5 — Build Signal & Tag

---

## Tujuan

Menyusun struktur signal yang siap digunakan dalam logic

---

## Ilustrasi Signal Structuring

![Image](https://www.researchgate.net/publication/371904012/figure/fig2/AS%3A11431281170797866%401687886272090/Basic-Internal-Structure-of-PLC-For-programing-language-of-PLC-is-primarily-based-on-the.ppm)

---

## Aktivitas

---

✓ 1. Klasifikasi Signal

- field
- conditioned
- internal

---

✓ 2. Transformasi Signal

- raw → conditioned

---

---

✓ 3. Naming Convention

- konsisten
- tidak ambigu

---

## Output

```text id="step5_out"
tag system final
```

---

## Referensi

- Artikel 6

---

## Constraint

---

✓ 1. Tidak boleh ada raw signal di logic

---

✓ 2. Semua tag harus konsisten

---

## Kesalahan Umum

---

✓ 1. Tidak membuat tag system

---

✓ 2. Naming tidak konsisten

---

## Design Consequence

---

Jika signal tidak disusun:

- logic sulit dibaca
- tidak scalable
- error sulit dilacak

---

# 🚀 ARTICLE 8 — RESPONSE 3 (FINAL)

---

# 4.8 Step 6 — Build Layered Logic

---

## Tujuan

Menyusun struktur control logic berdasarkan layered pattern

---

## Ilustrasi Layered Logic Mapping

![Image](https://media.licdn.com/dms/image/v2/D4E12AQGRpYf3Qr6R7Q/article-inline_image-shrink_400_744/B4EZqTTP8BGUAY-/0/1763407892003?e=2147483647&t=KqWWbuk9S2hYeEAK4MvP_2ydXmNPqoUoJVDACd48c58&v=beta)

---

## Aktivitas

---

✓ Mapping Layer

---

- Layer 1 — Input Conditioning

- raw → conditioned

---

- Layer 2 — Command

- command aggregation

---

- Layer 3 — Permissive

- kondisi start

---

- Layer 4 — Latch

- state RUN/STOP

---

- Layer 5 — Trip

- shutdown logic

---

- Layer 6 — Alarm

- indikasi

---

- Layer 7 — Start Failure

- detection failure

---

- Layer 8 — Sequence

- interface

---

## Output

```text id="step6_out"
logic map (belum ladder)
```

---

## Referensi

- Artikel 7

---

## Constraint

```text id="step6_rule"
tidak boleh melanggar dependency layer
```

---

## Kesalahan Umum

---

✓ 1. Menggabungkan layer

---

✓ 2. Urutan layer salah

---

## Design Consequence

---

Jika layering tidak benar:

- logic tidak deterministic
- sulit dipahami
- tidak reusable

---

# 4.9 Step 7 — Validate Design (CRITICAL)

---

## Tujuan

Memastikan desain siap sebelum implementasi

---

## Ilustrasi Validation Process

![Image](https://www.mdpi.com/actuators/actuators-14-00201/article_deploy/html/images/actuators-14-00201-g006-550.jpg)

---

## Validasi

---

✓ 1. LOPA Validation

- BPCS vs SIS jelas

---

✓ 2. Signal Validation

- semua signal terdefinisi

---

✓ 3. Logic Validation

- tidak ada circular dependency

---

✓ 4. Authority Validation

- command source jelas

---

✓ 5. Fail-Safe Validation

- semua failure dipertimbangkan

---

## Tool

- checklist (Artikel 5)

---

## Constraint

```text id="step7_rule"
desain tidak boleh diimplementasikan sebelum validasi
```

---

## Design Consequence

---

Jika validasi dilewati:

- error muncul di lapangan
- sulit diperbaiki

---

# 4.10 Output Workflow

---

## Hasil Akhir

```text id="out_a8"
- system boundary
- equipment list
- I/O list
- signal & tag system
- layered logic map
```

---

## Status

```text id="status_a8"
siap diimplementasikan ke ladder
```

---

## Implikasi Engineering

- desain sudah lengkap
- implementasi menjadi translasi saja

---

# 4.11 Contoh Alur Singkat (Mini Case)

---

## Contoh: Pump Control

```text id="example_a8"
Boundary → Pump System
I/O → PB_START, MCC_RDY, PT101
LOPA → Trip vs Alarm
Tag → SUCT_PRESS_LOW
Layer → RUN_LATCH, TRIP_ACTIVE
```

---

## Ilustrasi Mini Flow

![Image](https://www.researchgate.net/publication/327906805/figure/fig6/AS%3A675420445896710%401538044191942/PLC-Process-Flowchart.ppm)

---

# 4.12 Kesalahan Umum dalam Workflow

---

## 1. Langsung ke ladder

---

## 2. Skip LOPA

---

## 3. Tidak membuat tag system

---

## 4. Tidak menggunakan layering

---

## 5. Tidak melakukan validasi

---

## Implikasi Engineering

```text id="error_a8"
workflow yang dilanggar akan menghasilkan desain yang gagal di lapangan
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
