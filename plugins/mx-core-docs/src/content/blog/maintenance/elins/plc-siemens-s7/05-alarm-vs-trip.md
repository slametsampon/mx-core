---
title: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti
authors: ['sam']
date: '2026-03-04'
tags: ['plc', 'siemens-s7', 'alarm-system', 'trip-logic', 'process-control']
draft: false
summary: Dalam sistem kontrol industri, deviasi parameter proses dapat menghasilkan dua jenis respon utama - **alarm** dan **trip**. Alarm digunakan untuk memberikan peringatan kepada operator ketika kondisi proses mulai menyimpang dari normal, sehingga operator dapat melakukan tindakan koreksi. Trip digunakan ketika kondisi proses mencapai batas kritis yang dapat menyebabkan kerusakan equipment atau bahaya proses. Dalam desain sistem kontrol yang baik, alarm biasanya muncul sebelum trip agar operator memiliki kesempatan untuk mencegah kondisi menjadi lebih serius.
---

# **_Artikel 5: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti_**

---

- [**_Artikel 5: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti_**](#artikel-5-alarm-vs-trip-logic--menentukan-kapan-equipment-harus-berhenti)
- [Article 05](#article-05)
- [Alarm vs Trip](#alarm-vs-trip)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Process Deviation in Pump Operation](#process-deviation-in-pump-operation)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Alarm and Trip in FB101 Structure](#alarm-and-trip-in-fb101-structure)
- [Section 3](#section-3)
- [Network N1 — Process Deviation Detection](#network-n1--process-deviation-detection)
  - [Rung N1-R6 — Low Pressure Detection](#rung-n1-r6--low-pressure-detection)
  - [Rung N1-R7 — Low-Low Pressure Detection](#rung-n1-r7--low-low-pressure-detection)
- [Section 4](#section-4)
- [Network N6 — Alarm Logic](#network-n6--alarm-logic)
  - [Rung N6-R1 — Alarm Evaluation](#rung-n6-r1--alarm-evaluation)
  - [Rung N6-R2 — Alarm Output](#rung-n6-r2--alarm-output)
- [Section 5](#section-5)
- [Network N5 — Trip Logic](#network-n5--trip-logic)
  - [Rung N5-R1 — Trip Evaluation](#rung-n5-r1--trip-evaluation)
  - [Rung N5-R2 — Trip Output](#rung-n5-r2--trip-output)
- [Section 6](#section-6)
- [Alarm vs Trip Threshold Concept](#alarm-vs-trip-threshold-concept)
- [Section 7](#section-7)
- [Example Process Scenario](#example-process-scenario)
  - [Scenario 1 — Pressure Slightly Low](#scenario-1--pressure-slightly-low)
  - [Scenario 2 — Pressure Very Low](#scenario-2--pressure-very-low)
- [Section 8](#section-8)
- [Protection Philosophy in PLC](#protection-philosophy-in-plc)
- [Section 9](#section-9)
- [Alarm and Trip in Pump Protection](#alarm-and-trip-in-pump-protection)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Knowledge Layer Built by Article 05](#knowledge-layer-built-by-article-05)

---

Berikut **Outline Artikel 05 — Alarm vs Trip** yang tetap **terkunci pada ladder FB101 Pump_Control**, khususnya **Network N1, Network N5, dan Network N6**.

Artikel ini menjelaskan **perbedaan respon sistem kontrol terhadap deviasi proses**:

- **Alarm → operator response**
- **Trip → automatic shutdown**

Semua bagian tetap mematuhi aturan:

- hanya menggunakan **Pump P-101 system**
- hanya menggunakan **tag yang telah dikunci**
- hanya merujuk **Network N1, N5, dan N6**
- hanya menampilkan **rung yang sudah ada**

---

# Article 05

# Alarm vs Trip

## System Reference (Locked)

Sistem yang dikontrol tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```text
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Instrument yang mempengaruhi alarm dan trip:

```text
PT101_PV
OL_TRIP
```

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 6 — Pump Protection Logic

---

# Section 1

# Process Deviation in Pump Operation

## Engineering Focus

Dalam operasi pump, kondisi proses dapat menyimpang dari kondisi normal.

Contoh deviasi:

```text
suction pressure mulai turun
motor overload
suction pressure sangat rendah
```

Namun **tidak semua deviasi memerlukan shutdown otomatis**.

Struktur respon sistem kontrol:

```text
Process Deviation
      │
      ├ Alarm → operator intervention
      │
      └ Trip → automatic shutdown
```

Artikel ini menjelaskan **bagaimana PLC membedakan dua respon tersebut**.

---

# Section 2

# Alarm and Trip in FB101 Structure

Struktur ladder yang relevan:

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

Network yang dianalisis dalam artikel ini:

```text
N1 Input Conditioning
N5 Trip Logic
N6 Alarm Logic
```

Hubungan network:

```text
Input signal
↓
N1 Input Conditioning
↓
Alarm threshold
↓
Trip threshold
```

---

# Section 3

# Network N1 — Process Deviation Detection

Sebelum alarm atau trip diputuskan, PLC harus mendeteksi kondisi proses.

---

## Rung N1-R6 — Low Pressure Detection

```text
| PT101_PV < Low_SP |
|----[CMP<]--------------------( ) SUCT_PRESS_LOW
```

Makna engineering:

```text
tekanan suction mulai rendah
```

Status ini digunakan untuk **alarm condition**.

---

## Rung N1-R7 — Low-Low Pressure Detection

```text
| PT101_PV < LowLow_SP |
|----[CMP<]-----------------( ) SUCT_PRESS_LOWLOW
```

Makna engineering:

```text
tekanan suction berada pada kondisi berbahaya
```

Status ini digunakan untuk **trip condition**.

---

# Section 4

# Network N6 — Alarm Logic

Network ini menghasilkan **peringatan untuk operator**.

---

## Rung N6-R1 — Alarm Evaluation

```text
| SUCT_PRESS_LOW |
|----[ ]--------------------------------|
|                                         |
| START_FAIL_ACTIVE |
|----[ ]--------------------------------|----( ) ALARM_ACTIVE
|                                         |
| CMD_START_REQ | /PERMISSIVE_OK |
|----[ ]------------[/]------------------|
```

Makna logika:

```text
ALARM_ACTIVE =
SUCT_PRESS_LOW
OR START_FAIL_ACTIVE
OR (CMD_START_REQ AND NOT PERMISSIVE_OK)
```

Engineering meaning:

Alarm muncul ketika:

```text
pressure rendah
start gagal
operator mencoba start ketika permissive tidak terpenuhi
```

---

## Rung N6-R2 — Alarm Output

```text
| ALARM_ACTIVE |
|----[ ]-----------------------------( ) ALM_P101
```

Makna logika:

```text
ALM_P101 = ALARM_ACTIVE
```

Engineering meaning:

PLC mengirim **alarm signal ke operator interface**.

---

# Section 5

# Network N5 — Trip Logic

Trip logic digunakan ketika kondisi proses sudah **tidak aman untuk operasi pump**.

---

## Rung N5-R1 — Trip Evaluation

```text
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

```text
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR (RUN_LATCH AND NOT MCC_HEALTHY)
```

---

## Rung N5-R2 — Trip Output

```text
| TRIP_ACTIVE |
|----[ ]-----------------------------( ) TRIP_P101
```

Makna engineering:

```text
motor stop
pump shutdown
```

---

# Section 6

# Alarm vs Trip Threshold Concept

Perbedaan threshold:

| Condition         | Response |
| ----------------- | -------- |
| SUCT_PRESS_LOW    | Alarm    |
| SUCT_PRESS_LOWLOW | Trip     |

Hubungan ladder:

```text
PT101_PV
 ↓
SUCT_PRESS_LOW
 ↓
Alarm
```

```text
PT101_PV
 ↓
SUCT_PRESS_LOWLOW
 ↓
Trip
```

Ini adalah konsep **process deviation severity**.

---

# Section 7

# Example Process Scenario

## Scenario 1 — Pressure Slightly Low

```text
PT101_PV < Low_SP
```

Hasil:

```text
SUCT_PRESS_LOW = TRUE
ALARM_ACTIVE = TRUE
Pump tetap running
```

Operator mendapat alarm.

---

## Scenario 2 — Pressure Very Low

```text
PT101_PV < LowLow_SP
```

Hasil:

```text
SUCT_PRESS_LOWLOW = TRUE
TRIP_ACTIVE = TRUE
Pump shutdown
```

PLC melakukan **automatic protection**.

---

# Section 8

# Protection Philosophy in PLC

Sistem kontrol biasanya mengikuti filosofi berikut:

```text
Normal condition
↓
Alarm region
↓
Trip region
```

Struktur respon:

```text
Process deviation
 ↓
Alarm threshold
 ↓
Trip threshold
```

Ini membuat operator memiliki **kesempatan untuk melakukan koreksi sebelum shutdown terjadi**.

---

# Section 9

# Alarm and Trip in Pump Protection

Diagram referensi:

Diagram 6 — Pump Protection Logic

```text
Process Deviation
     │
     ├ Alarm → Operator Response
     │
     └ Trip → Automatic Shutdown
```

Diagram ini menjelaskan **hubungan antara ladder logic dan respon plant**.

---

# Ladder Reference Summary

Artikel ini hanya boleh merujuk:

```text
FB101 Pump_Control
```

Network:

```text
N1 Input Conditioning
N5 Trip Logic
N6 Alarm Logic
```

Rung yang digunakan:

```text
N1-R6
N1-R7
N5-R1
N5-R2
N6-R1
N6-R2
```

Tidak boleh menampilkan rung dari:

```text
N2
N3
N4
N7
N8
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```text
Diagram 1 — Pump System Reference
Diagram 4 — Ladder Execution Flow
Diagram 6 — Pump Protection Logic
```

---

# Knowledge Layer Built by Article 05

Artikel ini menambahkan pemahaman berikut:

```text
Process signal
↓
Deviation detection
↓
Alarm threshold
↓
Trip threshold
↓
Operator response vs automatic shutdown
```

Pembaca sekarang memahami bahwa PLC:

```text
tidak semua deviasi memerlukan shutdown
beberapa hanya memerlukan alarm
```

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 06 — Start Failure Detection**, karena di situlah pembaca mulai memahami **bagaimana PLC memverifikasi bahwa perintah start benar-benar menghasilkan equipment running**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
