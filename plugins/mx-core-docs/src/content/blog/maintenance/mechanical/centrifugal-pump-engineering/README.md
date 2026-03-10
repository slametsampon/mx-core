---
title: Centrifugal Pump Engineering Series
authors: ['sam']
date: '2026-03-10'
tags:
  [
    'centrifugal-pump',
    'pump-engineering',
    'fluid-mechanics',
    'pump-selection',
    'pump-installation',
    'pump-operation',
    'pump-reliability',
    'rotating-equipment',
  ]
draft: false
summary: Seri artikel ini menyusun pengetahuan centrifugal pump berdasarkan pendekatan model teknik yang digunakan dalam praktik industri. Struktur seri mengikuti lifecycle equipment mulai dari prinsip fisika dasar, analisis performa pompa, perhitungan kebutuhan head sistem, analisis cavitation melalui NPSH, metode pemilihan pompa berdasarkan specific speed, praktik instalasi mekanis dan hidraulik, perilaku operasi pompa terhadap variasi flow, hingga mekanisme kegagalan dan reliability. Setiap artikel dirancang sebagai referensi analitis yang menghubungkan fenomena fisika, variabel sistem, dan model matematis sehingga engineer dapat melakukan evaluasi desain, operasi, dan troubleshooting sistem pompa secara sistematis.
---

# **_README - Centrifugal Pump Engineering Series_**

---

- [**_README - Centrifugal Pump Engineering Series_**](#readme---centrifugal-pump-engineering-series)
  - [1. Executive Summary](#1-executive-summary)
  - [2. Locked Article Scope](#2-locked-article-scope)
    - [01 — centrifugal-pump-fundamentals.md](#01--centrifugal-pump-fundamentalsmd)
    - [02 — pump-performance-curve-and-operating-point.md](#02--pump-performance-curve-and-operating-pointmd)
    - [03 — total-dynamic-head-calculation.md](#03--total-dynamic-head-calculationmd)
    - [04 — npsh-and-cavitation-in-centrifugal-pumps.md](#04--npsh-and-cavitation-in-centrifugal-pumpsmd)
    - [05 — centrifugal-pump-selection-engineering.md](#05--centrifugal-pump-selection-engineeringmd)
    - [06 — centrifugal-pump-installation-engineering.md](#06--centrifugal-pump-installation-engineeringmd)
    - [07 — centrifugal-pump-operation-behavior.md](#07--centrifugal-pump-operation-behaviormd)
    - [08 — centrifugal-pump-maintenance-and-reliability.md](#08--centrifugal-pump-maintenance-and-reliabilitymd)
  - [3. Peta Konsep Seri](#3-peta-konsep-seri)
  - [4. Urutan Membaca](#4-urutan-membaca)
  - [5. Hubungan Antar Artikel](#5-hubungan-antar-artikel)

---

## 1. Executive Summary

Seri ini menyajikan kerangka engineering untuk memahami, memilih, mengoperasikan, dan memelihara centrifugal pump berdasarkan pendekatan model teknik yang digunakan dalam praktik industri proses seperti Oil & Gas, Petrochemical, Power Generation, dan Process Manufacturing.

Struktur seri mengikuti lifecycle peralatan yang dimulai dari prinsip fisika dasar, perilaku performa pompa, perhitungan kebutuhan head sistem, analisis cavitation, metode pemilihan pompa, instalasi mekanis dan hidraulik, perilaku operasi, hingga mekanisme kegagalan dan reliability.

Setiap artikel disusun menggunakan pendekatan model-based engineering yang menekankan hubungan antara fenomena fisika, variabel operasi, dan model matematis yang dapat digunakan langsung oleh engineer lapangan untuk analisis dan troubleshooting.

Tujuan utama seri ini adalah menyediakan referensi teknis yang ringkas, sistematis, dan dapat digunakan sebagai dasar pengambilan keputusan engineering pada sistem pompa sentrifugal.

---

## 2. Locked Article Scope

### 01 — centrifugal-pump-fundamentals.md

Scope:

- Prinsip konversi energi pada pompa sentrifugal
- Komponen utama pompa dan peran impeller
- Komponen kecepatan fluida pada impeller
- Mekanisme pembangkitan head
- Euler Pump Equation sebagai model dasar energi fluida

---

### 02 — pump-performance-curve-and-operating-point.md

Scope:

- Kurva performa pompa (Head vs Flow)
- Kurva sistem (System Curve)
- Interaksi antara pump curve dan system curve
- Penentuan operating point
- Konsep Best Efficiency Point (BEP)

---

### 03 — total-dynamic-head-calculation.md

Scope:

- Definisi head dalam sistem fluida
- Static head pada sistem pompa
- Friction loss pada pipa
- Minor losses pada komponen sistem
- Model perhitungan Total Dynamic Head (TDH)

---

### 04 — npsh-and-cavitation-in-centrifugal-pumps.md

Scope:

- Definisi Net Positive Suction Head (NPSH)
- NPSH Available (NPSHa)
- NPSH Required (NPSHr)
- Mekanisme terbentuknya cavitation
- Batas operasi pompa terhadap cavitation

---

### 05 — centrifugal-pump-selection-engineering.md

Scope:

- Parameter utama pemilihan pompa
- Specific Speed sebagai parameter klasifikasi pompa
- Hubungan flow, head, dan tipe pompa
- Pertimbangan efisiensi pompa
- Estimasi kebutuhan daya penggerak

---

### 06 — centrifugal-pump-installation-engineering.md

Scope:

- Foundation dan baseplate
- Alignment poros pompa dan motor
- Desain suction piping
- Konfigurasi discharge piping
- Prinsip stabilitas hidraulik saat instalasi

---

### 07 — centrifugal-pump-operation-behavior.md

Scope:

- Prinsip startup pompa
- Operating region pompa
- Minimum flow requirement
- Deviation dari Best Efficiency Point
- Fenomena ketidakstabilan hidraulik

---

### 08 — centrifugal-pump-maintenance-and-reliability.md

Scope:

- Mekanisme kegagalan bearing
- Degradasi mechanical seal
- Konsep failure rate
- Mean Time Between Failure (MTBF)
- Availability sistem pompa

---

## 3. Peta Konsep Seri

Centrifugal Pump Engineering
│
├─ Fundamental Physics
│ └─ Energy transfer and Euler pump equation
│
├─ Hydraulic Performance
│ ├─ Pump performance curve
│ └─ System curve interaction
│
├─ System Requirement
│ └─ Total Dynamic Head calculation
│
├─ Cavitation Control
│ └─ NPSH analysis
│
├─ Engineering Design
│ └─ Pump selection using specific speed
│
├─ Mechanical Implementation
│ └─ Pump installation engineering
│
├─ Operational Behavior
│ └─ Pump operating region
│
└─ Lifecycle Reliability
└─ Maintenance and failure mechanisms

---

## 4. Urutan Membaca

Urutan membaca mengikuti alur engineering dari fenomena fisika menuju implementasi operasi dan reliability.

1. centrifugal-pump-fundamentals.md
2. pump-performance-curve-and-operating-point.md
3. total-dynamic-head-calculation.md
4. npsh-and-cavitation-in-centrifugal-pumps.md
5. centrifugal-pump-selection-engineering.md
6. centrifugal-pump-installation-engineering.md
7. centrifugal-pump-operation-behavior.md
8. centrifugal-pump-maintenance-and-reliability.md

Urutan ini memastikan pemahaman berkembang dari model dasar menuju aplikasi engineering dalam operasi industri.

---

## 5. Hubungan Antar Artikel

Hubungan antar artikel mengikuti rantai analisis engineering sistem pompa.

- **Fundamentals** menjelaskan mekanisme fisika pembangkitan energi fluida.
- **Pump Performance Curve** menggambarkan perilaku hidraulik pompa terhadap variasi flow.
- **Total Dynamic Head** menentukan kebutuhan energi sistem fluida.
- **NPSH** menentukan batas operasi aman terhadap cavitation.
- **Pump Selection** menggunakan TDH dan flow requirement untuk menentukan tipe pompa.
- **Installation Engineering** memastikan kondisi hidraulik dan mekanis sesuai desain.
- **Operation Behavior** menjelaskan respons pompa selama operasi.
- **Maintenance and Reliability** menjelaskan mekanisme degradasi dan manajemen lifecycle.

Dengan hubungan ini, seri artikel membentuk satu kerangka analisis sistem pompa yang utuh.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
```
