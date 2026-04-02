---
title: PLC Scan Cycle & Execution Model
authors: ['sam']
date: '2026-03-29'
tags:
  [
    'plc-scan-cycle',
    'execution-model',
    'deterministic-control',
    'industrial-automation',
    'plc-timer',
  ]
draft: false
summary: PLC bekerja dengan scan cycle yang terdiri dari membaca input, mengeksekusi logic, dan menulis output secara berulang. Semua input dibaca sebagai snapshot (process image), sehingga perubahan hanya terlihat pada cycle berikutnya. Logic dieksekusi secara sequential dan hasilnya disimpan dalam memory sebelum dikirim ke output. Timer bergantung pada scan cycle, bukan waktu real-time langsung. Memory memungkinkan state persistence seperti latch. Kesalahan memahami execution model dapat menyebabkan race condition, timing error, dan behaviour tidak stabil. Oleh karena itu, seluruh desain control logic harus mengikuti sifat cyclic dan deterministic dari PLC agar sistem dapat diprediksi dan aman.
---

# 🚀 **_ARTICLE 4: PLC Scan Cycle & Execution Model_**

---

- [🚀 **_ARTICLE 4: PLC Scan Cycle \& Execution Model_**](#-article-4-plc-scan-cycle--execution-model)
  - [1. Objective](#1-objective)
  - [Tujuan akhir](#tujuan-akhir)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 PLC Execution Model — Cyclic Operation](#41-plc-execution-model--cyclic-operation)
  - [Definisi](#definisi)
  - [Ilustrasi Scan Cycle](#ilustrasi-scan-cycle)
  - [Struktur Dasar Cycle](#struktur-dasar-cycle)
  - [Karakteristik Utama](#karakteristik-utama)
  - [Implikasi Engineering](#implikasi-engineering)
  - [Design Consequence](#design-consequence)
- [4.2 Read Phase — Input Acquisition](#42-read-phase--input-acquisition)
  - [Tujuan](#tujuan)
  - [Mekanisme](#mekanisme)
  - [Konsep Kunci](#konsep-kunci)
  - [Implikasi](#implikasi)
  - [Contoh](#contoh)
  - [Design Consequence](#design-consequence-1)
- [4.3 Process Image Concept](#43-process-image-concept)
  - [Definisi](#definisi-1)
  - [Ilustrasi Process Image](#ilustrasi-process-image)
  - [Jenis Process Image](#jenis-process-image)
  - [Prinsip Utama](#prinsip-utama)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Design Consequence](#design-consequence-2)
- [4.4 Execute Phase — Logic Processing](#44-execute-phase--logic-processing)
  - [Tujuan](#tujuan-1)
  - [Ilustrasi Execution Order](#ilustrasi-execution-order)
  - [Karakteristik Utama](#karakteristik-utama-1)
  - [Prinsip Kunci](#prinsip-kunci)
  - [Contoh](#contoh-1)
  - [Implikasi](#implikasi-1)
  - [Design Consequence](#design-consequence-3)
- [4.5 Write Phase — Output Update](#45-write-phase--output-update)
  - [Mekanisme](#mekanisme-1)
  - [Prinsip Utama](#prinsip-utama-1)
  - [Implikasi](#implikasi-2)
  - [Contoh](#contoh-2)
  - [Design Consequence](#design-consequence-4)
- [4.6 Memory Behavior dalam PLC](#46-memory-behavior-dalam-plc)
  - [Tujuan](#tujuan-2)
  - [Ilustrasi Memory System](#ilustrasi-memory-system)
  - [Jenis Memory](#jenis-memory)
  - [Prinsip Utama](#prinsip-utama-2)
  - [Contoh](#contoh-3)
  - [Implikasi](#implikasi-3)
  - [Design Consequence](#design-consequence-5)
- [4.7 Timer Behavior dalam Scan Cycle](#47-timer-behavior-dalam-scan-cycle)
  - [Tujuan](#tujuan-3)
  - [Ilustrasi Timer dalam Scan Cycle](#ilustrasi-timer-dalam-scan-cycle)
  - [Prinsip Dasar](#prinsip-dasar)
  - [Mekanisme](#mekanisme-2)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Contoh](#contoh-4)
  - [Design Consequence](#design-consequence-6)
- [4.8 Implikasi Scan Cycle ke Control Logic (KRITIKAL)](#48-implikasi-scan-cycle-ke-control-logic-kritikal)
  - [1. Latch Behavior](#1-latch-behavior)
  - [2. Edge Detection](#2-edge-detection)
  - [3. Permissive Evaluation](#3-permissive-evaluation)
  - [4. Trip Reaction](#4-trip-reaction)
  - [5. Race Condition](#5-race-condition)
  - [Design Consequence](#design-consequence-7)
- [4.9 Deterministic Execution](#49-deterministic-execution)
  - [Definisi](#definisi-2)
  - [Syarat Deterministic](#syarat-deterministic)
  - [Ilustrasi Deterministic System](#ilustrasi-deterministic-system)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Design Consequence](#design-consequence-8)
- [4.10 Kesalahan Umum dalam Memahami Execution Model](#410-kesalahan-umum-dalam-memahami-execution-model)
  - [1. Menganggap PLC event-driven](#1-menganggap-plc-event-driven)
  - [2. Tidak memahami process image](#2-tidak-memahami-process-image)
  - [3. Mengabaikan urutan network](#3-mengabaikan-urutan-network)
  - [4. Salah memahami timer](#4-salah-memahami-timer)
  - [5. Tidak memahami memory persistence](#5-tidak-memahami-memory-persistence)
  - [Implikasi Engineering](#implikasi-engineering-4)
- [4.11 Hubungan ke Artikel Berikutnya](#411-hubungan-ke-artikel-berikutnya)
  - [Arah Pembelajaran](#arah-pembelajaran)

---

## 1. Objective

Membangun pemahaman bahwa:

```text id="x4t8kq"
PLC bekerja secara cyclic dan deterministic,
dan semua logic harus didesain mengikuti model eksekusi ini
```

---

## Tujuan akhir

Engineer mampu:

- memahami bagaimana PLC membaca input
- memahami bagaimana PLC mengeksekusi logic
- memahami bagaimana output dihasilkan
- memprediksi behaviour logic
- menghindari race condition
- mendesain logic yang stabil

---

## 2. Position dalam Serial

Artikel ini berada setelah:

- Article 1 → system
- Article 2 → LOPA
- Article 3 → architecture

---

Dan sebelum:

- Article 5 → design principles
- Article 6 → signal
- Article 7 → layering

---

## Peran Artikel

```text id="role_a4"
menentukan bagaimana logic benar-benar bekerja di dalam PLC
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- scan cycle
- process image
- execution order
- memory update
- timer behavior
- implikasi ke logic

---

---

✓ Tidak dibahas

- vendor-specific detail
- interrupt / multitasking
- performance tuning

---

# 4.1 PLC Execution Model — Cyclic Operation

---

## Definisi

```text id="m5k9xq"
PLC bekerja dalam siklus berulang (scan cycle)
yang terus menerus selama sistem berjalan
```

---

## Ilustrasi Scan Cycle

![Image](https://media.licdn.com/dms/image/v2/D5622AQFvUO8ULVOkCg/feedshare-shrink_800/B56Zfs0d2THcAg-/0/1752024868636?e=2147483647&t=JbfG-T7XYuMKG10acLhynTv5Ty_JeTAJAQpxmbEwMac&v=beta)

---

## Struktur Dasar Cycle

```text id="z2t6wp"
1. Read Input
2. Execute Logic
3. Write Output
4. Repeat
```

---

## Karakteristik Utama

---

✓ 1. Cyclic

- berjalan terus menerus
- tidak berhenti selama PLC aktif

---

✓ 2. Deterministic

- urutan selalu sama
- hasil dapat diprediksi

---

✓ 3. Sequential

- tidak parallel (dalam konteks dasar)
- satu langkah selesai → lanjut berikutnya

---

## Implikasi Engineering

```text id="k7v3bd"
PLC tidak bekerja seperti software event-driven
```

---

## Design Consequence

---

Jika dianggap event-driven:

- logic salah desain
- trigger tidak sesuai ekspektasi
- behaviour tidak stabil

---

# 4.2 Read Phase — Input Acquisition

---

## Tujuan

Memahami bagaimana PLC membaca kondisi lapangan

---

## Mekanisme

![Image](https://theautomization.com/plc-working-principle-and-plc-scan-cycle/plc-scanning-cycle/)

---

- semua input dibaca di awal cycle
- disimpan dalam memory internal

---

## Konsep Kunci

```text id="p9y4cz"
nilai input tidak berubah selama satu cycle
```

---

## Implikasi

---

✓ 1. Input adalah snapshot

- bukan real-time continuous

---

✓ 2. Perubahan input tidak langsung terlihat

- harus menunggu cycle berikutnya

---

## Contoh

---

Jika:

- PB_START ditekan di tengah cycle

---

Maka:

- PLC baru melihat perubahan di cycle berikutnya

---

## Design Consequence

---

Jika tidak memahami ini:

- edge detection salah
- trigger tidak konsisten
- event miss

---

# 4.3 Process Image Concept

---

## Definisi

```text id="r3k8vx"
process image adalah snapshot input dan output dalam memory PLC
```

---

## Ilustrasi Process Image

![Image](https://www.researchgate.net/publication/350110488/figure/fig1/AS%3A1019865951375360%401620166399766/Architecture-of-PLC-3.png)

---

## Jenis Process Image

---

✓ 1. Input Image

---

✓ Definisi

- hasil pembacaan semua input pada awal scan

---

✓ Karakteristik

- bersifat statis selama satu cycle
- digunakan oleh semua logic

---

✓ 2. Output Image

---

✓ Definisi

- hasil perhitungan logic sebelum dikirim ke hardware

---

✓ Karakteristik

- berubah selama execution phase
- baru dikirim ke field di akhir cycle

---

## Prinsip Utama

```text id="pi_principle"
logic bekerja pada memory,
bukan langsung pada hardware
```

---

## Implikasi Engineering

---

✓ 1. Input tidak langsung dari field

- berasal dari input image

---

✓ 2. Output tidak langsung ke field

- disimpan di output image terlebih dahulu

---

## Design Consequence

---

Jika tidak memahami process image:

- logic dianggap real-time (padahal tidak)
- hasil tidak sesuai ekspektasi
- debugging menjadi sulit

---

# 4.4 Execute Phase — Logic Processing

---

## Tujuan

Menjelaskan bagaimana logic dijalankan di dalam PLC

---

## Ilustrasi Execution Order

![Image](https://www.ezautomation.net/industry-articles/img/chart-3.jpg)

---

## Karakteristik Utama

---

✓ 1. Sequential Execution

- logic dieksekusi satu per satu
- mengikuti urutan program

---

✓ 2. Top-Down Processing

- dari network pertama ke terakhir

---

## Prinsip Kunci

```text id="v8y2mh"
urutan logic mempengaruhi hasil
```

---

## Contoh

---

✓ Network 1:

- set RUN_LATCH

---

✓ Network 2:

- menggunakan RUN_LATCH

---

## Implikasi

- hasil network sebelumnya mempengaruhi berikutnya

---

## Design Consequence

---

Jika urutan salah:

- logic tidak bekerja sesuai ekspektasi
- terjadi dependency error

---

# 4.5 Write Phase — Output Update

---

## Mekanisme

![Image](https://theautomization.com/plc-working-principle-and-plc-scan-cycle/plc-scanning-cycle/)

---

- setelah execution selesai
- output image dikirim ke hardware

---

## Prinsip Utama

```text id="c1p7zn"
output tidak berubah selama execution phase
```

---

## Implikasi

---

✓ 1. Output update sekali per cycle

---

✓ 2. Tidak real-time continuous

---

## Contoh

---

Jika output berubah di tengah logic:

- perubahan hanya terlihat setelah cycle selesai

---

## Design Consequence

---

Jika tidak memahami ini:

- ekspektasi output salah
- delay tidak dipahami

---

# 4.6 Memory Behavior dalam PLC

---

## Tujuan

Menjelaskan bagaimana PLC menyimpan state antar cycle

---

## Ilustrasi Memory System

![Image](https://support.industry.siemens.com/cs/images/53034113/STEP7_V11_Unlinked_DB_S7_1200_1_e.png)

![Image](https://cdn.prod.website-files.com/63dea6cb95e58cb38bb98cbd/64d801510e8ad21983898384_38Vxxnb1tT683fDGMCJfITQQwtG0TYuV_8JfRereQzB_NW8hQiRTFjsEUihJFZ8EeH1TryO9-WZqDJ7YVeNjt1t1WEmWmibLh878oNduxwz__YBNrWB-q7CcRR0jHL0OnP5DXRpt-gL9DY6uJDU5qLUpfNjsHq--.png)

---

## Jenis Memory

---

✓ 1. Input Memory

- berisi input image

---

✓ 2. Output Memory

- berisi output image

---

✓ 3. Internal Memory

- bit internal
- data block
- register

---

## Prinsip Utama

```text id="y6v8kp"
state hanya berubah saat logic dieksekusi
```

---

## Contoh

---

✓ RUN_LATCH

- tetap ON walaupun input berubah
- sampai di-reset oleh logic

---

## Implikasi

---

✓ 1. State persistence

- memungkinkan sistem menyimpan kondisi

---

✓ 2. Tidak semua bergantung pada input langsung

---

## Design Consequence

---

Jika memory tidak dipahami:

- latch tidak bekerja
- state hilang
- sistem tidak stabil

---

# 4.7 Timer Behavior dalam Scan Cycle

---

## Tujuan

Memahami bagaimana timer bekerja dalam konteks scan cycle PLC

---

## Ilustrasi Timer dalam Scan Cycle

![Image](https://cdn.automationforum.co/uploads/2021/04/Untitled-31.jpg)

![Image](https://media.cheggcdn.com/media/6e7/6e7c5ea3-e972-4a5e-abba-2ae425883b16/php7T5OxG)

---

## Prinsip Dasar

```text id="n4x2qc"
timer dihitung berdasarkan scan cycle,
bukan waktu real-time langsung
```

---

## Mekanisme

---

✓ 1. Timer aktif saat kondisi TRUE

---

✓ 2. Setiap scan:

- timer bertambah

---

✓ 3. Jika kondisi FALSE:

- timer reset (untuk TON)

---

## Implikasi Engineering

---

✓ 1. Bergantung pada scan time

- semakin lambat scan → semakin kasar resolusi

---

✓ 2. Tidak benar-benar kontinu

- waktu dihitung per increment

---

## Contoh

---

Jika:

- scan time = 10 ms

---

Maka:

- timer increment = 10 ms per cycle

---

## Design Consequence

---

Jika tidak memahami ini:

- delay tidak akurat
- timing logic tidak stabil

---

# 4.8 Implikasi Scan Cycle ke Control Logic (KRITIKAL)

---

## 1. Latch Behavior

---

```text id="f7t3wk"
latch bekerja karena state disimpan antar cycle
```

---

✓ Implikasi

- RUN_LATCH tetap ON
- walaupun input sudah OFF

---

## 2. Edge Detection

---

✓ Definisi

- mendeteksi perubahan antar cycle

---

✓ Implikasi

- perlu memory previous state

---

## 3. Permissive Evaluation

---

- dievaluasi setiap cycle
- bukan hanya saat start

---

## 4. Trip Reaction

---

- terjadi dalam satu cycle
- langsung mempengaruhi output

---

## 5. Race Condition

---

✓ Definisi

```text id="w2k6mz"
hasil logic bergantung pada urutan eksekusi
```

---

✓ Penyebab

- dependency tidak jelas
- urutan network salah

---

## Design Consequence

---

Jika tidak mengikuti scan model:

- logic tidak deterministic
- output berubah tidak terprediksi

---

# 4.9 Deterministic Execution

---

## Definisi

```text id="q3m9tx"
PLC selalu menghasilkan output yang sama untuk input yang sama
```

---

## Syarat Deterministic

---

✓ 1. Urutan logic jelas

---

✓ 2. Tidak ada circular dependency

---

✓ 3. Tidak ada hidden dependency

---

## Ilustrasi Deterministic System

![Image](https://media.licdn.com/dms/image/v2/D4E22AQE2I-R2bv0q8Q/feedshare-shrink_1280/B4EZtUfvtgIgAs-/0/1766649167992?e=2147483647&t=gvVxGKD3cdqasd76lTzrszp27hlxDe-LQfQoijpQ9F0&v=beta)

![Image](https://imgv2-1-f.scribdassets.com/img/document/420714784/original/2ff59d68e1/1?v=1)

---

## Implikasi Engineering

---

- behaviour dapat diprediksi
- mudah dianalisis

---

## Design Consequence

---

Jika tidak deterministic:

- sulit troubleshooting
- behaviour tidak konsisten

---

# 4.10 Kesalahan Umum dalam Memahami Execution Model

---

## 1. Menganggap PLC event-driven

---

✓ Dampak

- logic tidak sesuai scan cycle

---

## 2. Tidak memahami process image

---

✓ Dampak

- salah membaca input/output

---

## 3. Mengabaikan urutan network

---

✓ Dampak

- dependency salah
- race condition

---

## 4. Salah memahami timer

---

✓ Dampak

- delay tidak sesuai

---

## 5. Tidak memahami memory persistence

---

✓ Dampak

- latch gagal
- state tidak tersimpan

---

## Implikasi Engineering

```text id="avoid_a4"
kesalahan ini akan langsung menghasilkan behaviour yang salah di lapangan
```

---

# 4.11 Hubungan ke Artikel Berikutnya

---

Artikel berikutnya akan membahas:

```text id="z8y4nr"
prinsip desain logic yang harus mengikuti execution model ini
```

---

## Arah Pembelajaran

```text id="next_a4"
dari:
execution behaviour

menuju:
design principles
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
