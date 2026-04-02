---
title: Signal Architecture & Tagging Strategy untuk PLC
authors: ['sam']
date: '2026-03-29'
tags:
  [
    'plc-signal',
    'tagging-strategy',
    'control-logic',
    'industrial-automation',
    'signal-classification',
  ]
draft: false
summary: Signal architecture dan tagging strategy memastikan bahwa semua signal dalam sistem PLC memiliki struktur yang konsisten, jelas, dan siap digunakan dalam control logic. Signal harus diklasifikasikan menjadi field, conditioned, dan internal untuk menghindari penggunaan raw signal langsung. Perbedaan antara command, feedback, permissive, trip, dan alarm sangat penting untuk mencegah kesalahan desain. Naming convention harus konsisten dan tidak ambigu karena menjadi dasar readability dan maintainability. Integrasi dengan HMI/SCADA harus menjaga bahwa control tetap berada di PLC. Dengan struktur signal yang benar, logic menjadi lebih sederhana, scalable, dan mudah dianalisis.
---

# 🚀 **_ARTICLE 6: Signal Architecture & Tagging Strategy untuk PLC_**

---

- [🚀 **_ARTICLE 6: Signal Architecture \& Tagging Strategy untuk PLC_**](#-article-6-signal-architecture--tagging-strategy-untuk-plc)
  - [1. Objective](#1-objective)
  - [Tujuan akhir](#tujuan-akhir)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Dependency](#dependency)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 Kenapa Signal Architecture Kritis](#41-kenapa-signal-architecture-kritis)
  - [Tujuan](#tujuan)
  - [Ilustrasi Dampak Signal vs Logic](#ilustrasi-dampak-signal-vs-logic)
  - [Problem tanpa struktur signal](#problem-tanpa-struktur-signal)
  - [Root Cause](#root-cause)
  - [Implikasi Engineering](#implikasi-engineering)
- [4.2 Klasifikasi Utama Signal](#42-klasifikasi-utama-signal)
  - [Tujuan](#tujuan-1)
  - [Ilustrasi Struktur Signal](#ilustrasi-struktur-signal)
  - [1. Field Signal](#1-field-signal)
  - [2. Conditioned Signal](#2-conditioned-signal)
  - [3. Internal Logic Signal](#3-internal-logic-signal)
  - [Implikasi](#implikasi)
  - [Design Consequence](#design-consequence)
- [4.3 Command vs Feedback](#43-command-vs-feedback)
  - [Tujuan](#tujuan-2)
  - [Ilustrasi Command vs Feedback](#ilustrasi-command-vs-feedback)
  - [1. Command Signal](#1-command-signal)
  - [Karakteristik](#karakteristik)
  - [2. Feedback Signal](#2-feedback-signal)
  - [Karakteristik](#karakteristik-1)
  - [Prinsip Utama](#prinsip-utama)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Design Consequence](#design-consequence-1)
- [4.4 Permissive vs Trip vs Alarm](#44-permissive-vs-trip-vs-alarm)
  - [Tujuan](#tujuan-3)
  - [Ilustrasi Perbedaan Fungsi](#ilustrasi-perbedaan-fungsi)
  - [1. Permissive](#1-permissive)
  - [2. Trip](#2-trip)
  - [3. Alarm](#3-alarm)
  - [Implikasi (LOPA — Artikel 2)](#implikasi-lopa--artikel-2)
  - [Design Consequence](#design-consequence-2)
- [4.5 Signal Transformation (CRITICAL)](#45-signal-transformation-critical)
  - [Definisi](#definisi)
  - [Ilustrasi Transformation](#ilustrasi-transformation)
  - [Tujuan](#tujuan-4)
  - [Contoh Digital](#contoh-digital)
  - [Contoh Analog](#contoh-analog)
  - [Prinsip](#prinsip)
  - [Pelanggaran](#pelanggaran)
  - [Dampak](#dampak)
- [4.6 Analog Signal Handling](#46-analog-signal-handling)
  - [Tujuan](#tujuan-5)
  - [Ilustrasi Analog Processing](#ilustrasi-analog-processing)
  - [Tahapan](#tahapan)
  - [Output](#output)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Design Consequence](#design-consequence-3)
- [4.7 Naming Convention (WAJIB)](#47-naming-convention-wajib)
  - [Tujuan](#tujuan-6)
  - [Ilustrasi Naming System](#ilustrasi-naming-system)
  - [Prinsip Utama](#prinsip-utama-1)
  - [Struktur Naming](#struktur-naming)
  - [Aturan Kritis](#aturan-kritis)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Design Consequence](#design-consequence-4)
- [4.8 Integrasi Signal ke HMI / SCADA](#48-integrasi-signal-ke-hmi--scada)
  - [Tujuan](#tujuan-7)
  - [Ilustrasi Integrasi Sistem](#ilustrasi-integrasi-sistem)
  - [Prinsip Integrasi](#prinsip-integrasi)
  - [Mapping Signal](#mapping-signal)
  - [Pelanggaran](#pelanggaran-1)
  - [Dampak](#dampak-1)
  - [Implikasi Engineering](#implikasi-engineering-4)
- [4.9 Signal Flow dalam Sistem PLC](#49-signal-flow-dalam-sistem-plc)
  - [Tujuan](#tujuan-8)
  - [Ilustrasi Signal Flow](#ilustrasi-signal-flow)
  - [Alur Standar](#alur-standar)
  - [Dengan Communication](#dengan-communication)
  - [Prinsip](#prinsip-1)
  - [Implikasi Engineering](#implikasi-engineering-5)
  - [Design Consequence](#design-consequence-5)
- [4.10 Kesalahan Umum dalam Signal Architecture](#410-kesalahan-umum-dalam-signal-architecture)
  - [1. Menggunakan raw signal langsung](#1-menggunakan-raw-signal-langsung)
  - [2. Tidak membedakan command vs feedback](#2-tidak-membedakan-command-vs-feedback)
  - [3. Mencampur permissive dan trip](#3-mencampur-permissive-dan-trip)
  - [4. Naming tidak konsisten](#4-naming-tidak-konsisten)
  - [5. Tidak ada signal structure](#5-tidak-ada-signal-structure)
  - [Implikasi Engineering](#implikasi-engineering-6)
- [4.11 Transition ke Artikel 7](#411-transition-ke-artikel-7)
  - [Arah Pembelajaran](#arah-pembelajaran)

---

## 1. Objective

Membangun sistem klasifikasi dan penamaan signal yang:

- konsisten
- tidak ambigu
- scalable
- langsung mendukung desain control logic

---

## Tujuan akhir

```text id="obj_a6"
Engineer mampu:
- mengklasifikasikan semua signal dengan benar
- membangun tag system yang konsisten
- memastikan signal siap digunakan dalam control logic
```

---

## 2. Position dalam Serial

Artikel ini adalah:

```text id="pos_a6"
translasi dari:
principle (Artikel 5)
→ menjadi struktur signal yang nyata
```

---

## Dependency

- Artikel 3 → architecture (I/O, control, communication)
- Artikel 5 → design principles

---

## Peran Artikel

```text id="role_a6"
menjadi fondasi sebelum logic dibangun (Artikel 7 & 8)
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- jenis signal dalam sistem PLC
- klasifikasi signal berdasarkan fungsi
- transformation signal
- analog threshold handling
- naming convention
- integrasi ke HMI / SCADA

---

✓ Tidak dibahas

- logic design
- workflow
- implementasi vendor

---

# 4.1 Kenapa Signal Architecture Kritis

---

## Tujuan

Menunjukkan bahwa signal adalah fondasi sebelum logic dibuat

---

## Ilustrasi Dampak Signal vs Logic

![Image](https://media.licdn.com/dms/image/v2/D5622AQExz5zZ91ZC_A/feedshare-shrink_1280/B56ZhBu7OtHQAo-/0/1753449477624?e=2147483647&t=gMqVXahIeTE75E56bqhS4Afb1kGRv293lcqNLmtpzaQ&v=beta)

---

## Problem tanpa struktur signal

---

✓ 1. Tag tidak konsisten

- nama berubah-ubah
- arti tidak jelas

---

✓ 2. Logic sulit dibaca

---

✓ 3. Debugging sulit

---

✓ 4. Reusability rendah

---

## Root Cause

```text id="root_a6"
tidak adanya struktur signal yang jelas sebelum desain logic
```

---

## Implikasi Engineering

```text id="imp_a6"
signal harus didesain terlebih dahulu sebelum logic dibuat
```

---

# 4.2 Klasifikasi Utama Signal

---

## Tujuan

Memisahkan signal berdasarkan peran dalam sistem

---

## Ilustrasi Struktur Signal

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFiG2W0B134Kg/feedshare-shrink_1280/B4DZfvCqttGkAo-/0/1752062145844?e=2147483647&t=S1_VZjM-3pt__7PndhCmK27uu9ZFRJtcDmge3mXWDUA&v=beta)

---

## 1. Field Signal

---

✓ Definisi

```text id="field_sig"
signal langsung dari/ke perangkat lapangan
```

---

✓ Contoh

- PB_START
- MCC_RDY
- MTR_RUN_FB
- PT101_PV

---

## 2. Conditioned Signal

---

✓ Definisi

```text id="cond_sig"
signal hasil pemrosesan dari field signal
yang siap digunakan dalam logic
```

---

✓ Contoh

- MCC_HEALTHY
- MOTOR_RUNNING
- SUCT_PRESS_LOW

---

## 3. Internal Logic Signal

---

✓ Definisi

```text id="int_sig"
signal yang hanya digunakan dalam logic internal PLC
```

---

✓ Contoh

- RUN_LATCH
- CMD_START_REQ
- TRIP_ACTIVE

---

## Implikasi

```text id="imp_class"
logic tidak boleh langsung menggunakan field signal
```

---

## Design Consequence

---

Jika klasifikasi tidak dilakukan:

- logic menggunakan raw signal
- behaviour tidak konsisten
- sulit scaling

---

# 4.3 Command vs Feedback

---

## Tujuan

Membedakan arah aliran signal dalam sistem kontrol

---

## Ilustrasi Command vs Feedback

![Image](https://media.licdn.com/dms/image/v2/D4E22AQH7qj-he3rbuA/feedshare-shrink_800/B4EZacKuYwHkAg-/0/1746376781306?e=2147483647&t=rCrtb5eU6ZjKRDosxTBR7Pd2Sz9dcP2r52amDxj1Bsc&v=beta)

---

## 1. Command Signal

---

✓ Definisi

- signal yang memerintahkan aksi

---

✓ Sumber

- operator (pushbutton)
- HMI / SCADA
- sequence logic

---

✓ Contoh

- PB_START
- REMOTE_START

---

## Karakteristik

- bersifat inisiasi
- tidak menjamin aksi terjadi

---

## 2. Feedback Signal

---

✓ Definisi

- signal yang menunjukkan kondisi aktual equipment

---

✓ Sumber

- sensor
- auxiliary contact
- transmitter

---

✓ Contoh

- MTR_RUN_FB
- VALVE_OPEN

---

## Karakteristik

- representasi kondisi nyata
- digunakan untuk verifikasi

---

## Prinsip Utama

```text id="cmd_fb"
command ≠ feedback
tidak boleh dipertukarkan
```

---

## Implikasi Engineering

---

✓ 1. Command tidak boleh dianggap sebagai status

---

✓ 2. Feedback wajib digunakan untuk verifikasi

---

## Design Consequence

---

Jika command = feedback:

- sistem menganggap aksi berhasil padahal belum
- terjadi false running condition

---

# 4.4 Permissive vs Trip vs Alarm

---

## Tujuan

Memisahkan fungsi protection dalam control system

---

## Ilustrasi Perbedaan Fungsi

![Image](https://media.licdn.com/dms/image/v2/D4D22AQHZH-9ucf0Fmg/feedshare-shrink_800/B4DZsiwET5JcAk-/0/1765814585545?e=2147483647&t=RJTigjeK7YkD1wph6C1W0EioMsnRpLC_-nEw7mbOCs4&v=beta)

---

## 1. Permissive

---

✓ Definisi

```text id="perm_def"
syarat untuk mengizinkan start
```

---

✓ Karakteristik

- diperiksa sebelum start
- tidak menghentikan sistem yang sudah running

---

✓ Contoh

- MCC_HEALTHY
- VALVE_READY

---

## 2. Trip

---

✓ Definisi

```text id="trip_def"
kondisi untuk menghentikan sistem
```

---

✓ Karakteristik

- aktif saat sistem berjalan
- menghentikan operasi

---

✓ Contoh

- OL_TRIP
- LOW_PRESSURE

---

## 3. Alarm

---

✓ Definisi

```text id="alarm_def"
indikasi kondisi abnormal tanpa menghentikan sistem
```

---

✓ Karakteristik

- hanya memberikan peringatan
- operator yang bertindak

---

## Implikasi (LOPA — Artikel 2)

```text id="perm_trip_alarm"
tidak boleh mencampur permissive, trip, dan alarm
```

---

## Design Consequence

---

Jika tercampur:

- sistem bisa berhenti saat tidak perlu
- atau tidak berhenti saat diperlukan

---

# 4.5 Signal Transformation (CRITICAL)

---

## Definisi

```text id="sig_trans"
Raw Signal → Conditioned Signal → Logic Ready
```

---

## Ilustrasi Transformation

![Image](https://www.researchgate.net/publication/3357841/figure/fig3/AS%3A394728517455874%401471122020327/Signal-processing-block-diagram.png)

![Image](https://www.researchgate.net/publication/314274406/figure/fig2/AS%3A11431281208765141%401701437699284/Schematic-diagram-of-the-analog-and-digital-signal-processing-of-the-position-signals.jpg)

---

## Tujuan

- menyederhanakan logic
- meningkatkan readability
- meningkatkan reusability

---

## Contoh Digital

---

✓ Raw

- MCC_RDY

---

✓ Conditioned

- MCC_HEALTHY

---

## Contoh Analog

---

✓ Raw

- PT101_PV

---

✓ Conditioned

- SUCT_PRESS_LOW
- SUCT_PRESS_LOWLOW

---

## Prinsip

---

✓ 1. Raw signal tidak langsung digunakan

---

✓ 2. Semua logic menggunakan conditioned signal

---

## Pelanggaran

- raw signal langsung masuk logic

---

---

## Dampak

```text id="st_impact"
- logic kompleks
- tidak konsisten
- sulit reuse
```

---

# 4.6 Analog Signal Handling

---

## Tujuan

Mengubah signal analog menjadi format yang dapat digunakan dalam logic

---

## Ilustrasi Analog Processing

![Image](https://digilent.com/reference/_media/learn/courses/unit-6/fig-6-1.png)

![Image](https://plcblog.in/plc/basic/img/analog-scaling/what-is-analog-scaling.webp)

---

## Tahapan

---

✓ 1. Raw Value

- PT101_PV

---

✓ 2. Scaling (opsional)

- konversi engineering unit

---

✓ 3. Threshold Comparison

```text id="analog_th"
PV < Low → LOW
PV < LowLow → LOWLOW
```

---

## Output

- SUCT_PRESS_LOW
- SUCT_PRESS_LOWLOW

---

## Implikasi Engineering

```text id="analog_imp"
logic tidak boleh menggunakan nilai analog mentah secara langsung
```

---

## Design Consequence

---

Jika analog tidak dikondisikan:

- threshold tersebar di logic
- sulit dikontrol
- sulit di-maintain

---

# 4.7 Naming Convention (WAJIB)

---

## Tujuan

Menjamin konsistensi dan kejelasan dalam seluruh sistem signal

---

## Ilustrasi Naming System

![Image](https://cdn.automationforum.co/uploads/2024/04/best-practice-1-1024x567.jpg)

![Image](https://automation-notes.readthedocs.io/en/latest/_images/bad_name_tags3.png)

---

## Prinsip Utama

```text id="naming_rule"
tag harus:
- konsisten
- deskriptif
- tidak ambigu
```

---

## Struktur Naming

---

✓ 1. Field Signal

- mengikuti nama device

---

✓ Contoh

- PB_START
- MCC_RDY
- PT101_PV

---

✓ 2. Conditioned Signal

- menggambarkan kondisi

---

✓ Contoh

- MCC_HEALTHY
- VALVE_READY
- SUCT_PRESS_LOW

---

✓ 3. Internal Logic

- menunjukkan fungsi logic

---

✓ Contoh

- CMD_START_REQ
- RUN_LATCH
- TRIP_ACTIVE

---

## Aturan Kritis

---

✓ 1. Tidak boleh rename

```text id="no_rename"
tag harus konsisten dari awal sampai akhir
```

---

✓ 2. Tidak boleh multi-meaning

---

✓ 3. Tidak boleh singkatan tidak jelas

---

## Implikasi Engineering

- tag menjadi dokumentasi sistem
- memudahkan debugging
- memudahkan scaling

---

## Design Consequence

---

Jika naming tidak konsisten:

- logic sulit dipahami
- error sulit dilacak
- knowledge tidak transferable

---

# 4.8 Integrasi Signal ke HMI / SCADA

---

## Tujuan

Menentukan bagaimana signal digunakan di layer visualisasi

---

## Ilustrasi Integrasi Sistem

![Image](https://media.licdn.com/dms/image/v2/D4E22AQFdK2tKJloYcg/feedshare-shrink_800/B4EZmVSAsSKcAg-/0/1759146153286?e=2147483647&t=WZrHpwQduGc-zHOtMh07_uB5e8rF2xHtgJWsHuoFLl4&v=beta)

![Image](https://media.licdn.com/dms/image/v2/D4E22AQG4COdpf5badQ/feedshare-shrink_800/B4EZh5ZxBdHEAo-/0/1754383457978?e=2147483647&t=ai9kyphh7_FwX59NuxmHwwXzI4eEOnrrXBRgdXswIyQ&v=beta)

---

## Prinsip Integrasi

---

✓ 1. HMI hanya membaca dari PLC

---

✓ 2. Command melalui control logic

---

## Mapping Signal

---

✓ HMI Display

- menggunakan:

  - conditioned signal
  - status

---

✓ HMI Command

- masuk sebagai:

  - command signal

---

## Pelanggaran

---

✓ 1. HMI bypass control logic

---

✓ 2. HMI langsung mengontrol output

---

---

## Dampak

```text id="hmi_impact"
- bypass logic
- sistem tidak deterministic
- unsafe behaviour
```

---

## Implikasi Engineering

- HMI adalah interface
- bukan decision maker

---

# 4.9 Signal Flow dalam Sistem PLC

---

## Tujuan

Memastikan alur signal terstruktur dan konsisten

---

## Ilustrasi Signal Flow

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFiG2W0B134Kg/feedshare-shrink_1280/B4DZfvCqttGkAo-/0/1752062145844?e=2147483647&t=S1_VZjM-3pt__7PndhCmK27uu9ZFRJtcDmge3mXWDUA&v=beta)

![Image](https://www.researchgate.net/publication/237626522/figure/fig1/AS%3A299009374736384%401448300798111/ndustrial-three-layer-control-system.png)

---

## Alur Standar

```text id="flow_a6"
Field → I/O → Conditioned → Logic → Output → Field
```

---

## Dengan Communication

```text id="flow_comm_a6"
Field → PLC → HMI/SCADA → PLC → Output
```

---

## Prinsip

---

✓ 1. Semua signal harus melalui conditioning

---

✓ 2. Semua keputusan di logic

---

✓ 3. Tidak ada shortcut

---

## Implikasi Engineering

- flow harus traceable
- tidak boleh ada hidden path

---

## Design Consequence

---

Jika flow tidak jelas:

- debugging sulit
- behaviour tidak dapat ditelusuri

---

# 4.10 Kesalahan Umum dalam Signal Architecture

---

## 1. Menggunakan raw signal langsung

---

✓ Dampak

- logic kompleks
- tidak konsisten

---

## 2. Tidak membedakan command vs feedback

---

✓ Dampak

- false state
- salah interpretasi

---

## 3. Mencampur permissive dan trip

---

✓ Dampak

- behaviour tidak sesuai

---

## 4. Naming tidak konsisten

---

✓ Dampak

- sulit maintenance

---

## 5. Tidak ada signal structure

---

✓ Dampak

- sistem tidak scalable

---

## Implikasi Engineering

```text id="avoid_a6"
signal error akan langsung menjadi logic error
```

---

# 4.11 Transition ke Artikel 7

---

Artikel berikutnya akan membahas:

```text id="next_a6"
bagaimana signal digunakan dalam struktur logic berlapis (layered control pattern)
```

---

## Arah Pembelajaran

```text id="flow_next_a6"
dari:
signal architecture

menuju:
control structure (layering)
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
