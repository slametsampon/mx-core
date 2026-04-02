---
title: Protection Philosophy & LOPA untuk PLC
authors: ['sam']
date: '2026-03-29'
tags:
  ['lopa', 'process-safety', 'bpcs-vs-sis', 'plc-design', 'industrial-safety']
draft: false
summary: Protection philosophy dan LOPA memastikan bahwa fungsi kontrol, protection, dan safety dipisahkan secara jelas dalam sistem industri. BPCS digunakan untuk operasi normal dan process protection, sedangkan SIS digunakan untuk fungsi keselamatan yang membutuhkan independensi dan reliability tinggi. Tidak semua trip adalah safety, sehingga klasifikasi fungsi menjadi kritikal dalam desain. Kesalahan umum seperti false safety assumption dan penggabungan BPCS dengan SIS dapat menyebabkan sistem tidak aman. Mapping LOPA ke control logic memastikan bahwa setiap fungsi ditempatkan pada sistem yang tepat. Artikel ini menjadi dasar untuk memahami arsitektur PLC sebelum masuk ke desain logic.
---

# 🚀 **_ARTICLE 2: Protection Philosophy & LOPA untuk PLC_**

---

- [🚀 **_ARTICLE 2: Protection Philosophy \& LOPA untuk PLC_**](#-article-2-protection-philosophy--lopa-untuk-plc)
  - [1. Objective](#1-objective)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Prinsip Utama](#prinsip-utama)
  - [3. Scope / Boundary](#3-scope--boundary)
    - [Dibahas](#dibahas)
    - [Tidak dibahas](#tidak-dibahas)
- [4.1 Kenapa Protection Philosophy Wajib Dipahami](#41-kenapa-protection-philosophy-wajib-dipahami)
  - [Tujuan](#tujuan)
  - [Risiko dalam Sistem Industri](#risiko-dalam-sistem-industri)
    - [a. Sistem memiliki risiko inherent](#a-sistem-memiliki-risiko-inherent)
    - [b. Kegagalan kontrol → konsekuensi nyata](#b-kegagalan-kontrol--konsekuensi-nyata)
    - [c. Tanpa protection](#c-tanpa-protection)
  - [Implikasi Engineering](#implikasi-engineering)
  - [Design Consequence](#design-consequence)
- [4.2 Konsep Layer of Protection (LOPA)](#42-konsep-layer-of-protection-lopa)
  - [Definisi](#definisi)
  - [Ilustrasi Layer Protection](#ilustrasi-layer-protection)
  - [Struktur Layer (Konseptual)](#struktur-layer-konseptual)
  - [Prinsip Utama LOPA](#prinsip-utama-lopa)
    - [1. Independence](#1-independence)
    - [2. Diversity](#2-diversity)
    - [3. Redundancy (opsional)](#3-redundancy-opsional)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Design Consequence](#design-consequence-1)
    - [Jika prinsip independence dilanggar:](#jika-prinsip-independence-dilanggar)
    - [Jika hanya mengandalkan PLC:](#jika-hanya-mengandalkan-plc)
    - [Jika layer tidak jelas:](#jika-layer-tidak-jelas)
- [4.3 Definisi dan Peran BPCS](#43-definisi-dan-peran-bpcs)
  - [Definisi](#definisi-1)
  - [Posisi BPCS dalam Sistem](#posisi-bpcs-dalam-sistem)
  - [Fungsi Utama BPCS](#fungsi-utama-bpcs)
  - [Karakteristik](#karakteristik)
    - [1. Fokus pada Operasi](#1-fokus-pada-operasi)
    - [2. Tidak SIL-certified](#2-tidak-sil-certified)
    - [3. Tidak Independen](#3-tidak-independen)
  - [Contoh Implementasi](#contoh-implementasi)
    - [a. Pump Control](#a-pump-control)
    - [b. Process Protection](#b-process-protection)
  - [Batasan BPCS](#batasan-bpcs)
  - [Design Consequence](#design-consequence-2)
- [4.4 Definisi dan Peran SIS](#44-definisi-dan-peran-sis)
  - [Definisi](#definisi-2)
  - [Posisi SIS dalam Sistem](#posisi-sis-dalam-sistem)
  - [Fungsi Utama SIS](#fungsi-utama-sis)
  - [Karakteristik](#karakteristik-1)
    - [1. SIL-rated](#1-sil-rated)
    - [2. Independen dari BPCS](#2-independen-dari-bpcs)
    - [3. Reliability Tinggi](#3-reliability-tinggi)
  - [Contoh Implementasi](#contoh-implementasi-1)
    - [a. High-High Pressure Trip](#a-high-high-pressure-trip)
    - [b. Emergency Stop System](#b-emergency-stop-system)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Design Consequence](#design-consequence-3)
- [4.5 Klasifikasi Fungsi dalam Perspektif LOPA](#45-klasifikasi-fungsi-dalam-perspektif-lopa)
  - [Tujuan](#tujuan-1)
  - [Struktur Fungsi](#struktur-fungsi)
  - [1. Monitoring](#1-monitoring)
    - [Definisi](#definisi-3)
    - [Karakteristik](#karakteristik-2)
  - [2. Alarm](#2-alarm)
    - [Definisi](#definisi-4)
    - [Karakteristik](#karakteristik-3)
  - [3. Interlock](#3-interlock)
    - [Definisi](#definisi-5)
  - [4. Trip (Process Protection)](#4-trip-process-protection)
    - [Definisi](#definisi-6)
  - [5. Safety Trip](#5-safety-trip)
    - [Definisi](#definisi-7)
  - [Perbedaan Utama](#perbedaan-utama)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Design Consequence](#design-consequence-4)
- [4.6 BPCS vs SIS dalam Desain PLC](#46-bpcs-vs-sis-dalam-desain-plc)
  - [Pertanyaan Kunci](#pertanyaan-kunci)
  - [Kriteria Penentuan](#kriteria-penentuan)
    - [BPCS](#bpcs)
    - [SIS](#sis)
  - [Contoh Perbandingan](#contoh-perbandingan)
  - [Prinsip Pemisahan](#prinsip-pemisahan)
  - [Implikasi ke Desain](#implikasi-ke-desain)
    - [1. Tidak boleh overlap](#1-tidak-boleh-overlap)
    - [2. Tidak boleh double control tanpa alasan](#2-tidak-boleh-double-control-tanpa-alasan)
    - [3. Boundary harus jelas sebelum desain](#3-boundary-harus-jelas-sebelum-desain)
  - [Design Consequence](#design-consequence-5)
- [4.7 False Safety Assumption (KRITIKAL)](#47-false-safety-assumption-kritikal)
  - [Definisi](#definisi-8)
  - [Ilustrasi Kesalahan Umum](#ilustrasi-kesalahan-umum)
  - [Contoh Kasus](#contoh-kasus)
    - [1. Trip kritikal hanya di PLC](#1-trip-kritikal-hanya-di-plc)
    - [2. Tidak ada SIS](#2-tidak-ada-sis)
  - [Dampak](#dampak)
  - [Penyebab Umum](#penyebab-umum)
    - [1. Kurang memahami LOPA](#1-kurang-memahami-lopa)
    - [2. Simplifikasi desain](#2-simplifikasi-desain)
    - [3. Tekanan cost / waktu](#3-tekanan-cost--waktu)
  - [Implikasi Engineering](#implikasi-engineering-4)
  - [Design Consequence](#design-consequence-6)
- [4.8 Mapping LOPA ke Control Logic](#48-mapping-lopa-ke-control-logic)
  - [Tujuan](#tujuan-2)
  - [Mapping Fungsi ke Sistem](#mapping-fungsi-ke-sistem)
  - [Visual Mapping ke Control Structure](#visual-mapping-ke-control-structure)
  - [Prinsip Utama](#prinsip-utama-1)
  - [Implikasi ke Desain Ladder](#implikasi-ke-desain-ladder)
    - [BPCS](#bpcs-1)
    - [SIS](#sis-1)
  - [Design Consequence](#design-consequence-7)
- [4.9 Interface antara BPCS dan SIS](#49-interface-antara-bpcs-dan-sis)
  - [Tujuan](#tujuan-3)
  - [Struktur Interface](#struktur-interface)
  - [Prinsip Hubungan](#prinsip-hubungan)
  - [Contoh Implementasi](#contoh-implementasi-2)
    - [1. SIS Trip](#1-sis-trip)
    - [2. BPCS Response](#2-bpcs-response)
  - [Constraint](#constraint)
    - [1. BPCS tidak membuat keputusan safety](#1-bpcs-tidak-membuat-keputusan-safety)
    - [2. SIS tidak bergantung pada BPCS](#2-sis-tidak-bergantung-pada-bpcs)
  - [Design Consequence](#design-consequence-8)
- [4.10 Kesalahan Umum dalam Desain PLC terkait LOPA](#410-kesalahan-umum-dalam-desain-plc-terkait-lopa)
  - [1. Menganggap semua trip = safety](#1-menganggap-semua-trip--safety)
    - [Dampak](#dampak-1)
  - [2. Menggabungkan BPCS dan SIS logic](#2-menggabungkan-bpcs-dan-sis-logic)
    - [Dampak](#dampak-2)
  - [3. Tidak mendefinisikan boundary](#3-tidak-mendefinisikan-boundary)
    - [Dampak](#dampak-3)
  - [4. Over-reliance pada PLC](#4-over-reliance-pada-plc)
    - [Dampak](#dampak-4)
  - [5. Tidak mempertimbangkan independence](#5-tidak-mempertimbangkan-independence)
    - [Dampak](#dampak-5)
  - [Implikasi Engineering](#implikasi-engineering-5)
- [4.11 Transition ke Artikel 3](#411-transition-ke-artikel-3)
  - [Arah Pembelajaran](#arah-pembelajaran)

---

## 1. Objective

Membangun pemahaman bahwa:

```text
tidak semua fungsi kontrol memiliki level kritikal yang sama,
dan tidak semua fungsi boleh diimplementasikan di PLC (BPCS)
```

Tujuan akhir:

- engineer mampu membedakan:

  - control
  - protection
  - safety

- engineer memahami boundary:

  - BPCS vs SIS

- engineer tidak melakukan:

  - false safety design

---

## 2. Position dalam Serial

- lanjutan langsung dari Article 1
- menjadi fondasi sebelum seluruh design logic

---

## Prinsip Utama

```text
semua desain setelah ini harus menghormati boundary LOPA
```

---

## 3. Scope / Boundary

---

### Dibahas

- konsep protection dalam sistem industri
- Layer of Protection (LOPA)
- klasifikasi fungsi:

  - alarm
  - interlock
  - trip
  - safety trip

- BPCS vs SIS
- implikasi ke desain PLC

---

### Tidak dibahas

- SIL calculation detail
- risk matrix formal
- standar IEC detail
- programming safety PLC

---

# 4.1 Kenapa Protection Philosophy Wajib Dipahami

---

## Tujuan

Menunjukkan bahwa:

```text
desain kontrol tidak bisa dipisahkan dari risiko proses
```

---

## Risiko dalam Sistem Industri

![Image](https://www.researchgate.net/publication/336745436/figure/fig1/AS%3A11431281146932174%401681574283166/The-pipe-rupture-caused-by-abnormal-overpressure.tif)

![Image](https://www.researchgate.net/publication/315136059/figure/fig1/AS%3A585195015114753%401516532772521/Arrangement-of-superheater-tube-with-frequent-failure-zone-in-one-panel.png)

---

### a. Sistem memiliki risiko inherent

- overpressure
- dry running
- overheating

---

### b. Kegagalan kontrol → konsekuensi nyata

- kerusakan equipment
- downtime
- potensi kecelakaan

---

### c. Tanpa protection

```text
control system bisa menjadi sumber bahaya
```

---

## Implikasi Engineering

Engineer tidak boleh hanya berpikir:

```text
bagaimana menjalankan sistem
```

tetapi juga:

```text
bagaimana mencegah sistem menjadi berbahaya
```

---

## Design Consequence

Jika protection tidak dipertimbangkan:

- logic hanya fokus operasi
- tidak ada proteksi
- sistem menjadi unsafe

---

# 4.2 Konsep Layer of Protection (LOPA)

---

## Definisi

```text
Sistem proteksi dibangun dalam beberapa layer independen
untuk mengurangi risiko secara berlapis
```

---

## Ilustrasi Layer Protection

![Image](https://www.researchgate.net/publication/336886693/figure/fig2/AS%3A826711956541440%401574114898297/Super-alarm-layer-of-protection.png)

---

## Struktur Layer (Konseptual)

- Basic Control System (BPCS)
- Alarm + operator response
- Interlock / Trip
- Safety Instrumented System (SIS)
- Mechanical protection (relief valve, dll)

---

## Prinsip Utama LOPA

---

### 1. Independence

- setiap layer tidak boleh saling bergantung

---

### 2. Diversity

- metode proteksi berbeda
- menghindari common failure

---

### 3. Redundancy (opsional)

- multiple layer untuk risiko tinggi

---

## Implikasi Engineering

```text
PLC BPCS bukan satu-satunya proteksi
```

---

## Design Consequence

---

### Jika prinsip independence dilanggar:

- satu failure → semua layer gagal

---

### Jika hanya mengandalkan PLC:

- tidak ada backup protection
- risiko meningkat signifikan

---

### Jika layer tidak jelas:

- sulit menentukan:

  - mana control
  - mana safety

---

# 4.3 Definisi dan Peran BPCS

---

## Definisi

```text id="7o6x1b"
BPCS = sistem kontrol utama untuk operasi normal
```

---

## Posisi BPCS dalam Sistem

![Image](https://www.researchgate.net/publication/270572366/figure/fig1/AS%3A295110446206979%401447371221461/Architecture-of-Basic-Process-Control-System-BPCS-and-Risk-Reduction-Layer-SIS-for-a.png)

---

## Fungsi Utama BPCS

- start / stop equipment
- control loop (flow, pressure, dll)
- permissive logic
- basic trip (non-SIL)

---

## Karakteristik

---

### 1. Fokus pada Operasi

- menjaga sistem berjalan normal
- bukan untuk kondisi ekstrem

---

### 2. Tidak SIL-certified

- tidak dirancang untuk safety-critical function

---

### 3. Tidak Independen

- logic saling terkait
- satu failure bisa mempengaruhi sistem

---

---

## Contoh Implementasi

---

### a. Pump Control

- permissive:

  - MCC ready
  - valve open

---

### b. Process Protection

- low pressure trip
- overload trip

---

---

## Batasan BPCS

```text id="d2p9az"
BPCS tidak boleh dianggap sebagai safety layer utama
```

---

## Design Consequence

---

Jika BPCS dipaksa menjadi safety:

- tidak memenuhi reliability
- tidak memenuhi independence
- berpotensi gagal saat dibutuhkan

---

---

# 4.4 Definisi dan Peran SIS

---

## Definisi

```text id="z1k8fy"
SIS = sistem independen untuk fungsi keselamatan
```

---

## Posisi SIS dalam Sistem

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-10-1024x667.jpg)

![Image](https://miro.medium.com/0%2AOiSVVorYCDUXhLYs)

---

## Fungsi Utama SIS

- emergency shutdown
- high-high trip
- critical protection

---

---

## Karakteristik

---

### 1. SIL-rated

- SIL 1 – SIL 3
- sesuai tingkat risiko

---

### 2. Independen dari BPCS

- tidak boleh tergantung control logic

---

### 3. Reliability Tinggi

- harus bekerja saat dibutuhkan
- failure probability rendah

---

---

## Contoh Implementasi

---

### a. High-High Pressure Trip

- shutdown otomatis

---

### b. Emergency Stop System

- memutus energi secara langsung

---

---

## Implikasi Engineering

```text id="u9v3dt"
SIS tidak boleh digabung dengan BPCS logic
```

---

## Design Consequence

---

Jika SIS tidak independen:

- failure di BPCS → safety gagal
- risiko meningkat drastis

---

---

# 4.5 Klasifikasi Fungsi dalam Perspektif LOPA

---

## Tujuan

Mengelompokkan fungsi berdasarkan peran proteksi

---

## Struktur Fungsi

![Image](https://media.licdn.com/dms/image/v2/D5622AQEqIe8yF3Y51g/feedshare-shrink_800/B56ZwiYOACKsAg-/0/1770103300425?e=2147483647&t=f4HvzZ9mdM0c3uLlCGq27YM5WuwIlmZ0UuYpsdeSx4Y&v=beta)

---

## 1. Monitoring

---

### Definisi

- hanya membaca kondisi

---

### Karakteristik

- tidak mempengaruhi sistem

---

---

## 2. Alarm

---

### Definisi

- memberikan peringatan

---

### Karakteristik

- operator yang mengambil aksi

---

---

## 3. Interlock

---

### Definisi

- mencegah kondisi tidak aman sebelum terjadi

---

---

## 4. Trip (Process Protection)

---

### Definisi

- menghentikan operasi saat kondisi abnormal

---

---

## 5. Safety Trip

---

### Definisi

- fungsi keselamatan (SIS)

---

---

## Perbedaan Utama

| Fungsi      | Aksi      | Sistem |
| ----------- | --------- | ------ |
| Alarm       | Warning   | BPCS   |
| Interlock   | Prevent   | BPCS   |
| Trip        | Shutdown  | BPCS   |
| Safety Trip | Emergency | SIS    |

---

## Implikasi Engineering

```text id="5j9c7m"
tidak semua trip adalah safety
```

---

## Design Consequence

---

Jika semua trip dianggap safety:

- overdesign atau underdesign
- salah penempatan fungsi
- sistem tidak compliant

---

---

# 4.6 BPCS vs SIS dalam Desain PLC

---

## Pertanyaan Kunci

```text id="1r8m2y"
fungsi ini milik BPCS atau SIS?
```

---

## Kriteria Penentuan

---

### BPCS

- risiko rendah – menengah
- tidak membutuhkan SIL
- tidak membutuhkan independensi tinggi

---

---

### SIS

- risiko tinggi
- potensi bahaya signifikan
- membutuhkan SIL

---

---

## Contoh Perbandingan

| Kondisi                    | Sistem |
| -------------------------- | ------ |
| Low suction pressure       | BPCS   |
| High-high pressure reactor | SIS    |

---

---

## Prinsip Pemisahan

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-10-1024x667.jpg)

![Image](https://www.researchgate.net/publication/255568198/figure/fig2/AS%3A670716320038927%401536922640926/Control-system-architecture-This-illustrates-the-relationship-between-safety-and-control.png)

---

```text id="sep_rule"
logic harus dipisah secara jelas
```

---

## Implikasi ke Desain

---

### 1. Tidak boleh overlap

- satu fungsi hanya di satu sistem

---

---

### 2. Tidak boleh double control tanpa alasan

---

---

### 3. Boundary harus jelas sebelum desain

---

---

## Design Consequence

---

Jika boundary tidak jelas:

- logic bercampur
- safety tidak terjamin
- sulit diaudit

---

# 4.7 False Safety Assumption (KRITIKAL)

---

## Definisi

```text id="g4k1qz"
menganggap PLC biasa cukup untuk fungsi safety
```

---

## Ilustrasi Kesalahan Umum

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-1-scaled.jpg)

---

## Contoh Kasus

---

### 1. Trip kritikal hanya di PLC

- high pressure hanya ditangani PLC biasa

---

### 2. Tidak ada SIS

- semua proteksi digabung di BPCS

---

---

## Dampak

```text id="impact_false_safety"
- sistem tidak memenuhi safety requirement
- tidak ada independensi
- risiko kecelakaan meningkat
```

---

---

## Penyebab Umum

---

### 1. Kurang memahami LOPA

---

### 2. Simplifikasi desain

---

### 3. Tekanan cost / waktu

---

---

## Implikasi Engineering

```text id="m2z7hr"
engineer wajib memahami batas kemampuan PLC (BPCS)
```

---

## Design Consequence

---

Jika false safety terjadi:

- safety layer hilang
- system terlihat aman, tetapi tidak benar-benar aman
- failure menjadi catastrophic

---

---

# 4.8 Mapping LOPA ke Control Logic

---

## Tujuan

Menghubungkan konsep LOPA ke implementasi logic

---

## Mapping Fungsi ke Sistem

| Fungsi      | Implementasi |
| ----------- | ------------ |
| Permissive  | BPCS         |
| Alarm       | BPCS         |
| Trip        | BPCS         |
| Safety Trip | SIS          |

---

---

## Visual Mapping ke Control Structure

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-10-1024x667.jpg)

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-13-1024x735.jpg)

---

## Prinsip Utama

```text id="8t6y2p"
Layer Trip (BPCS) ≠ Safety Trip (SIS)
```

---

---

## Implikasi ke Desain Ladder

---

### BPCS

- boleh:

  - permissive
  - interlock
  - trip

---

---

### SIS

- harus:

  - independent
  - external (atau safety PLC)

---

---

## Design Consequence

---

Jika mapping salah:

- trip dianggap safety
- safety logic tidak independen
- sistem tidak compliant

---

---

# 4.9 Interface antara BPCS dan SIS

---

## Tujuan

Menentukan hubungan antar sistem tanpa melanggar independensi

---

## Struktur Interface

![Image](https://cdn.automationforum.co/uploads/2025/05/Understanding-Differences-of-SIS-PLC-and-BPCS-in-Industrial-Automation-10-1024x667.jpg)

![Image](https://www.researchgate.net/publication/363881642/figure/fig1/AS%3A11431281093707559%401667260153259/Block-Diagram-of-an-Intelligent-Traffic-Control-System-Using-PLC.png)

![Image](https://www.mdpi.com/sensors/sensors-20-00508/article_deploy/html/images/sensors-20-00508-g003.png)

---

## Prinsip Hubungan

```text id="z3p8qw"
SIS → memberikan signal ke BPCS
```

---

## Contoh Implementasi

---

### 1. SIS Trip

- SIS mengirim:

  - trip signal

---

### 2. BPCS Response

- memutus:

  - RUN_LATCH
  - output command

---

---

## Constraint

---

### 1. BPCS tidak membuat keputusan safety

---

### 2. SIS tidak bergantung pada BPCS

---

---

## Design Consequence

---

Jika interface salah:

- safety tergantung control
- independensi hilang
- risiko meningkat

---

---

# 4.10 Kesalahan Umum dalam Desain PLC terkait LOPA

---

## 1. Menganggap semua trip = safety

---

### Dampak

- salah klasifikasi
- desain tidak sesuai risiko

---

---

## 2. Menggabungkan BPCS dan SIS logic

---

### Dampak

- independensi hilang
- safety gagal

---

---

## 3. Tidak mendefinisikan boundary

---

### Dampak

- overlap antar sistem
- konflik fungsi

---

---

## 4. Over-reliance pada PLC

---

### Dampak

- tidak ada layer proteksi lain
- sistem rapuh

---

---

## 5. Tidak mempertimbangkan independence

---

### Dampak

- single point of failure
- risiko tinggi

---

---

## Implikasi Engineering

```text id="avoid_err"
kesalahan ini harus dieliminasi sebelum masuk desain logic
```

---

---

# 4.11 Transition ke Artikel 3

---

Artikel berikutnya akan membahas:

```text id="b6y1nt"
bagaimana sistem PLC dibangun secara fisik dan logis
(I/O, control, communication)
```

---

## Arah Pembelajaran

```text id="next_a2"
dari:
risk & protection

menuju:
system architecture
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
