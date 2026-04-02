---
title: PLC Architecture - I/O, Control, Communication
authors: ['sam']
date: '2026-03-29'
tags:
  [
    'plc-architecture',
    'io-system',
    'control-layer',
    'industrial-automation',
    'system-design',
  ]
draft: false
summary: PLC architecture terdiri dari empat layer utama - physical, I/O, control, dan communication yang harus dipisahkan secara jelas. I/O berfungsi sebagai interface, bukan logic. Control layer adalah pusat keputusan, sedangkan communication hanya untuk integrasi sistem. Signal harus diklasifikasikan agar tidak terjadi pencampuran fungsi. Boundary sistem menentukan apa yang menjadi tanggung jawab PLC, SIS, dan SCADA. Kesalahan dalam arsitektur seperti mencampur layer, tidak mendefinisikan signal, atau membiarkan communication menggantikan control akan menyebabkan sistem tidak terstruktur dan tidak aman. Artikel ini menjadi dasar untuk memahami bagaimana PLC mengeksekusi logic secara internal.
---

# 🚀 **_ARTICLE 3: PLC Architecture: I/O, Control, Communication_**

---

- [🚀 **_ARTICLE 3: PLC Architecture: I/O, Control, Communication_**](#-article-3-plc-architecture-io-control-communication)
  - [1. Objective](#1-objective)
  - [Tujuan akhir](#tujuan-akhir)
  - [Constraint](#constraint)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 PLC sebagai Bagian dari Sistem Berlapis](#41-plc-sebagai-bagian-dari-sistem-berlapis)
  - [Tujuan](#tujuan)
  - [Ilustrasi Layer System](#ilustrasi-layer-system)
  - [Struktur Layer Utama](#struktur-layer-utama)
  - [Definisi Layer](#definisi-layer)
  - [Implikasi Engineering](#implikasi-engineering)
  - [Design Consequence](#design-consequence)
- [4.2 Physical Layer (Field Reality)](#42-physical-layer-field-reality)
  - [Tujuan](#tujuan-1)
  - [Ilustrasi Field Equipment](#ilustrasi-field-equipment)
  - [Komponen Physical Layer](#komponen-physical-layer)
  - [Karakteristik Physical System](#karakteristik-physical-system)
  - [Implikasi](#implikasi)
  - [Design Consequence](#design-consequence-1)
- [4.3 I/O Layer (Interface ke PLC)](#43-io-layer-interface-ke-plc)
  - [Tujuan](#tujuan-2)
  - [Ilustrasi I/O System](#ilustrasi-io-system)
  - [Definisi I/O Layer](#definisi-io-layer)
  - [1. Digital Input (DI)](#1-digital-input-di)
  - [2. Digital Output (DO)](#2-digital-output-do)
  - [3. Analog Input (AI)](#3-analog-input-ai)
  - [4. Analog Output (AO)](#4-analog-output-ao)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Design Consequence](#design-consequence-2)
- [4.4 Signal Classification (KRITIKAL)](#44-signal-classification-kritikal)
  - [Tujuan](#tujuan-3)
  - [Ilustrasi Klasifikasi Signal](#ilustrasi-klasifikasi-signal)
  - [Kategori Signal](#kategori-signal)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Design Consequence](#design-consequence-3)
- [4.5 Control Layer (Decision Engine)](#45-control-layer-decision-engine)
  - [Tujuan](#tujuan-4)
  - [Ilustrasi Control Layer](#ilustrasi-control-layer)
  - [Definisi](#definisi)
  - [Fungsi Utama](#fungsi-utama)
  - [Komponen Utama](#komponen-utama)
  - [Prinsip Utama](#prinsip-utama)
  - [Pelanggaran Umum](#pelanggaran-umum)
  - [Dampak](#dampak)
  - [Design Consequence](#design-consequence-4)
- [4.6 Communication Layer (System Integration)](#46-communication-layer-system-integration)
  - [Tujuan](#tujuan-5)
  - [Ilustrasi Communication System](#ilustrasi-communication-system)
  - [Jenis Komunikasi](#jenis-komunikasi)
  - [Prinsip Utama](#prinsip-utama-1)
  - [Pelanggaran](#pelanggaran)
  - [Dampak](#dampak-1)
  - [Design Consequence](#design-consequence-5)
- [4.7 System Boundary Definition](#47-system-boundary-definition)
  - [Tujuan](#tujuan-6)
  - [Ilustrasi Boundary Sistem](#ilustrasi-boundary-sistem)
  - [Pertanyaan Kunci](#pertanyaan-kunci)
  - [Contoh Boundary](#contoh-boundary)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Prinsip Utama](#prinsip-utama-2)
  - [Design Consequence](#design-consequence-6)
- [4.8 Hubungan Antar Layer](#48-hubungan-antar-layer)
  - [Tujuan](#tujuan-7)
  - [Ilustrasi Flow Sistem](#ilustrasi-flow-sistem)
  - [Alur Utama](#alur-utama)
  - [Dengan Communication](#dengan-communication)
  - [Prinsip Interaksi](#prinsip-interaksi)
  - [Implikasi Engineering](#implikasi-engineering-4)
  - [Design Consequence](#design-consequence-7)
- [4.9 Kesalahan Umum dalam Arsitektur PLC](#49-kesalahan-umum-dalam-arsitektur-plc)
  - [1. Mencampur I/O dan Logic](#1-mencampur-io-dan-logic)
  - [2. Tidak Mendefinisikan Signal Type](#2-tidak-mendefinisikan-signal-type)
  - [3. Communication Menggantikan Logic](#3-communication-menggantikan-logic)
  - [4. Boundary Tidak Jelas](#4-boundary-tidak-jelas)
  - [5. Menganggap Semua Berada di PLC](#5-menganggap-semua-berada-di-plc)
  - [Implikasi Engineering](#implikasi-engineering-5)
- [4.10 Transition ke Artikel 4](#410-transition-ke-artikel-4)
  - [Arah Pembelajaran](#arah-pembelajaran)

---

## 1. Objective

Membangun pemahaman bahwa:

```text id="2m7q4v"
PLC system terdiri dari beberapa layer:
physical, I/O, control, dan communication
yang harus dipisahkan secara jelas dalam desain
```

---

## Tujuan akhir

- engineer memahami struktur sistem end-to-end
- engineer mampu menentukan:

  - posisi signal
  - posisi logic
  - posisi komunikasi

---

## Constraint

```text id="constraint_a3"
I/O ≠ Logic ≠ Communication
```

---

## 2. Position dalam Serial

- setelah:

  - Article 1 → system context
  - Article 2 → LOPA & safety

---

- sebelum:

  - execution model
  - control design

---

## Peran Artikel

```text id="role_a3"
menentukan struktur sistem sebelum logic dibuat
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- struktur layer PLC
- I/O system (DI, DO, AI, AO)
- signal classification
- control layer
- communication layer
- system boundary

---

✓ Tidak dibahas

- ladder diagram
- logic pattern
- workflow
- vendor-specific detail

---

# 4.1 PLC sebagai Bagian dari Sistem Berlapis

---

## Tujuan

Menunjukkan bahwa:

```text id="c9w2hx"
PLC bukan sistem tunggal,
melainkan bagian dari sistem berlapis
```

---

## Ilustrasi Layer System

![Image](https://www.researchgate.net/publication/327073518/figure/fig1/AS%3A660600527015936%401534510847055/Architecture-of-industrial-control-system.png)

---

## Struktur Layer Utama

```text id="layer_main"
Physical → I/O → Control → Communication
```

---

## Definisi Layer

---

✓ 1. Physical Layer

- dunia nyata
- tempat energi dan proses terjadi

---

✓ 2. I/O Layer

- interface antara physical dan PLC

---

✓ 3. Control Layer

- tempat decision logic

---

✓ 4. Communication Layer

- integrasi dengan sistem lain

---

---

## Implikasi Engineering

```text id="g7v8na"
setiap layer harus dipisahkan secara eksplisit
```

---

## Design Consequence

---

Jika layer tidak dipisah:

- logic bercampur dengan I/O
- communication mempengaruhi control
- sistem menjadi tidak terstruktur

---

# 4.2 Physical Layer (Field Reality)

---

## Tujuan

Memahami kondisi nyata yang dikontrol PLC

---

## Ilustrasi Field Equipment

![Image](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41598-024-75601-z/MediaObjects/41598_2024_75601_Fig3_HTML.png)

![Image](https://www.valmet.com/globalassets/flow-control/product-images/actuators/neles-actuators.jpg?format=webp&quality=70&width=1290)

---

## Komponen Physical Layer

---

✓ a. Sensor

- pressure transmitter
- flow meter
- level switch

---

✓ b. Actuator

- motor
- valve
- solenoid

---

## Karakteristik Physical System

---

✓ 1. Analog / Digital

- signal bisa continuous atau discrete

---

✓ 2. Real-world uncertainty

- noise
- delay
- disturbance

---

✓ 3. Tidak deterministik sempurna

- kondisi selalu berubah

---

---

## Implikasi

```text id="u1t5dq"
PLC tidak membaca kondisi nyata,
tetapi representasi dari kondisi tersebut
```

---

---

## Design Consequence

---

Jika physical reality diabaikan:

- threshold salah
- permissive tidak akurat
- trip terlambat

---

# 4.3 I/O Layer (Interface ke PLC)

---

## Tujuan

Menentukan bagaimana sistem fisik (field) terhubung ke PLC sebagai decision engine

---

## Ilustrasi I/O System

![Image](https://cdn.automationforum.co/uploads/2024/06/remote-io-1-scaled.jpg)

---

## Definisi I/O Layer

```text id="io_def"
I/O adalah interface antara dunia fisik dan sistem kontrol
```

---

## 1. Digital Input (DI)

---

✓ Fungsi

- membaca kondisi ON/OFF

---

✓ Contoh

- PB_START
- MCC_RDY

---

✓ Karakteristik

- binary (0 / 1)
- representasi status

---

## 2. Digital Output (DO)

---

✓ Fungsi

- memberikan command ON/OFF

---

✓ Contoh

- motor start
- valve open

---

✓ Karakteristik

- aksi diskrit
- langsung mempengaruhi equipment

---

## 3. Analog Input (AI)

---

✓ Fungsi

- membaca nilai kontinu

---

✓ Contoh

- pressure
- flow

---

✓ Karakteristik

- continuous signal
- membutuhkan interpretasi (threshold, scaling)

---

## 4. Analog Output (AO)

---

✓ Fungsi

- memberikan control signal kontinu

---

✓ Contoh

- VFD speed
- control valve position

---

✓ Karakteristik

- bukan ON/OFF
- mempengaruhi performa sistem

---

## Implikasi Engineering

```text id="6u3p5z"
I/O bukan logic
→ hanya representasi input/output sistem
```

---

## Design Consequence

---

Jika I/O dianggap logic:

- logic menjadi bercampur
- sulit di-maintain
- tidak scalable

---

# 4.4 Signal Classification (KRITIKAL)

---

## Tujuan

Mencegah pencampuran fungsi signal sebelum masuk ke control logic

---

## Ilustrasi Klasifikasi Signal

![Image](https://cdn.automationforum.co/uploads/2025/06/Explore-how-permissive-logic-and-trip-interlocks-ensure-safe-equipment-operation-in-DCS-PLC-and-SIS-based-automation-systems.-2-1024x562.jpg)

---

## Kategori Signal

---

✓ 1. Command

---

✓ Definisi

- signal untuk memulai aksi

---

✓ Contoh

- PB_START
- remote start

---

✓ 2. Feedback

---

✓ Definisi

- signal dari equipment

---

✓ Contoh

- motor running
- valve open

---

✓ 3. Permissive

---

✓ Definisi

- syarat untuk mengizinkan operasi

---

✓ Contoh

- MCC ready
- valve ready

---

✓ 4. Trip

---

✓ Definisi

- kondisi untuk menghentikan operasi

---

✓ Contoh

- overload
- low pressure

---

✓ 5. Analog Process

---

✓ Definisi

- nilai proses kontinu

---

✓ Contoh

- pressure PV
- flow PV

---

## Implikasi Engineering

```text id="j4y6c8"
setiap signal harus memiliki satu peran tunggal
```

---

## Design Consequence

---

Jika signal tidak diklasifikasikan:

- permissive tercampur dengan trip
- command tercampur dengan feedback
- logic menjadi tidak jelas

---

# 4.5 Control Layer (Decision Engine)

---

## Tujuan

Menentukan lokasi semua keputusan dalam sistem

---

## Ilustrasi Control Layer

![Image](https://media.licdn.com/dms/image/v2/D5622AQHKHHYfNw5XQA/feedshare-shrink_800/B56ZhkzMTJHUAg-/0/1754037799209?e=2147483647&t=sDducWRudm9eD8S8Lo3xIaktDO96UHQQpwvHn00PuiQ&v=beta)

---

## Definisi

```text id="control_def"
control layer adalah tempat semua keputusan sistem dibuat
```

---

## Fungsi Utama

- decision making
- state management
- control flow

---

## Komponen Utama

---

✓ 1. Internal Bit

- representasi kondisi logic

---

✓ 2. Latch

- menyimpan state

---

✓ 3. Timer

- delay / sequencing

---

---

## Prinsip Utama

```text id="w3k8zb"
semua keputusan hanya boleh terjadi di layer ini
```

---

## Pelanggaran Umum

---

✓ 1. HMI langsung mengontrol output

---

✓ 2. I/O langsung mempengaruhi output

---

## Dampak

```text id="impact_control"
- bypass logic
- sistem tidak deterministic
- sulit dikontrol
```

---

## Design Consequence

---

Jika control layer tidak digunakan:

- tidak ada struktur decision
- behaviour tidak predictable

---

# 4.6 Communication Layer (System Integration)

---

## Tujuan

Menentukan bagaimana PLC berinteraksi dengan sistem eksternal

---

## Ilustrasi Communication System

![Image](https://www.researchgate.net/profile/Salman-Mohagheghi/publication/224408154/figure/fig2/AS%3A393842189717508%401470910703363/Modbus-implementation-on-LAN.png)

---

## Jenis Komunikasi

---

✓ 1. PLC ↔ HMI

---

✓ Fungsi

- monitoring
- command

---

✓ 2. PLC ↔ PLC

---

✓ Fungsi

- interlock antar unit
- sequence coordination

---

✓ 3. PLC ↔ SCADA / DCS

---

✓ Fungsi

- supervisory control
- data logging

---

✓ 4. PLC ↔ IoT (opsional)

---

✓ Fungsi

- analytics
- monitoring

---

## Prinsip Utama

```text id="n6h3xp"
communication tidak boleh menggantikan control logic
```

---

## Pelanggaran

---

✓ 1. HMI bypass logic

- langsung mengaktifkan output

---

✓ 2. PLC bergantung pada external system

- safety tergantung SCADA

---

## Dampak

```text id="impact_comm"
- sistem tidak robust
- dependency eksternal
- kehilangan kontrol internal
```

---

## Design Consequence

---

Jika communication menggantikan control:

- PLC kehilangan fungsi utama
- sistem menjadi tidak stabil

---

# 4.7 System Boundary Definition

---

## Tujuan

Menentukan batas tanggung jawab PLC dalam keseluruhan sistem kontrol

---

## Ilustrasi Boundary Sistem

![Image](https://www.theknowledgeacademy.com/_files/images/The_Industrial_control_system_architecture.png)

![Image](https://cdn.automationforum.co/uploads/2023/07/scada5.jpg)

---

## Pertanyaan Kunci

```text id="y8m2rx"
- apa yang dikontrol PLC?
- apa yang hanya dimonitor?
- apa yang dikontrol sistem lain?
```

---

## Contoh Boundary

| Fungsi             | Sistem |
| ------------------ | ------ |
| Start pump         | PLC    |
| Emergency shutdown | SIS    |
| Monitoring         | SCADA  |

---

## Implikasi Engineering

```text id="d1k5bz"
boundary harus ditentukan sebelum menulis logic
```

---

## Prinsip Utama

---

✓ 1. PLC tidak mengontrol semua hal

- ada fungsi yang:

  - bukan tanggung jawab PLC

---

✓ 2. Safety tidak boleh diambil alih PLC biasa

- harus tetap di SIS

---

✓ 3. Monitoring bukan control

- SCADA hanya observasi

---

## Design Consequence

---

Jika boundary tidak jelas:

- logic overlap
- konflik antar sistem
- unsafe behaviour

---

# 4.8 Hubungan Antar Layer

---

## Tujuan

Memahami alur interaksi antar layer dalam sistem

---

## Ilustrasi Flow Sistem

![Image](https://cdn.automationforum.co/uploads/2024/06/remote-io-1-scaled.jpg)

---

## Alur Utama

```text id="r2m6cw"
Physical → I/O → Control → Output → Physical
```

---

## Dengan Communication

```text id="t8z3pq"
Control ↔ Communication ↔ External System
```

---

## Prinsip Interaksi

---

✓ 1. Semua input melalui I/O

- tidak ada direct access ke physical

---

✓ 2. Semua keputusan di control layer

- tidak di I/O
- tidak di communication

---

✓ 3. Output harus melalui I/O

---

## Implikasi Engineering

- tidak boleh:

  - lompat layer
  - bypass control

---

## Design Consequence

---

Jika layer dilompati:

- logic tidak terkendali
- sistem tidak deterministic

---

# 4.9 Kesalahan Umum dalam Arsitektur PLC

---

## 1. Mencampur I/O dan Logic

---

✓ Pola

- input langsung mengontrol output

---

✓ Dampak

- tidak ada decision layer
- sulit dikontrol

---

## 2. Tidak Mendefinisikan Signal Type

---

✓ Pola

- semua signal dianggap sama

---

✓ Dampak

- permissive bercampur trip
- logic ambigu

---

## 3. Communication Menggantikan Logic

---

✓ Pola

- HMI langsung mengontrol output

---

✓ Dampak

- bypass control
- tidak deterministic

---

## 4. Boundary Tidak Jelas

---

✓ Pola

- semua fungsi dimasukkan ke PLC

---

✓ Dampak

- overlap dengan SIS / SCADA

---

## 5. Menganggap Semua Berada di PLC

---

✓ Pola

- PLC dianggap pusat semua sistem

---

✓ Dampak

- arsitektur tidak realistis
- sistem tidak scalable

---

## Implikasi Engineering

```text id="avoid_a3"
kesalahan arsitektur akan menghasilkan logic yang salah sejak awal
```

---

# 4.10 Transition ke Artikel 4

---

Artikel berikutnya akan membahas:

```text id="m3t9rx"
bagaimana PLC mengeksekusi logic secara internal
(scan cycle dan execution model)
```

---

## Arah Pembelajaran

```text id="next_a3"
dari:
system architecture

menuju:
execution behaviour
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
