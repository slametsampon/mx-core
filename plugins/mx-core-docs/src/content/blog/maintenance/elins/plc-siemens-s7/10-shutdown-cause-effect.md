---
title: Shutdown Logic & Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'shutdown-logic',
    'cause-effect-matrix',
    'process-safety',
  ]
draft: false
summary: Shutdown logic digunakan dalam sistem kontrol industri untuk melindungi equipment dan keselamatan plant ketika terjadi kondisi proses yang berbahaya. Ketika parameter proses melewati trip limit, sistem akan menghasilkan trip signal yang memicu tindakan shutdown seperti menutup valve, menghentikan pump, dan mengaktifkan alarm. Hubungan antara kondisi trip dan respon sistem biasanya didokumentasikan dalam Cause & Effect Matrix. Dalam banyak plant modern, fungsi shutdown sering diimplementasikan dalam Safety Instrumented System (SIS) menggunakan Safety PLC yang terpisah dari control PLC.
---

# **_Artikel 10: Shutdown Logic & Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat_**

---

- [**_Artikel 10: Shutdown Logic \& Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat_**](#artikel-10-shutdown-logic--causeeffect--menghentikan-sistem-secara-aman-saat-kondisi-darurat)
- [Article 10](#article-10)
- [Shutdown Logic \& Cause-Effect](#shutdown-logic--cause-effect)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [Process Protection in Industrial Control](#process-protection-in-industrial-control)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Shutdown Logic in Pump P-101 Control](#shutdown-logic-in-pump-p-101-control)
- [Section 3](#section-3)
- [Process Deviation Detection](#process-deviation-detection)
  - [Rung N1-R7 — Low-Low Suction Pressure](#rung-n1-r7--low-low-suction-pressure)
- [Section 4](#section-4)
- [Trip Logic as Shutdown Trigger](#trip-logic-as-shutdown-trigger)
  - [Ladder Reference](#ladder-reference)
    - [Rung N5-R1 — Trip Evaluation](#rung-n5-r1--trip-evaluation)
- [Section 5](#section-5)
- [Equipment Shutdown Response](#equipment-shutdown-response)
  - [Rung N5-R2 — Trip Output](#rung-n5-r2--trip-output)
- [Section 6](#section-6)
- [Alarm vs Shutdown Response](#alarm-vs-shutdown-response)
  - [Rung N6-R1 — Alarm Evaluation](#rung-n6-r1--alarm-evaluation)
- [Section 7](#section-7)
- [Cause-Effect Relationship](#cause-effect-relationship)
- [Section 8](#section-8)
- [Interaction with Sequence Control](#interaction-with-sequence-control)
  - [Rung N8-R3 — Sequence Trip](#rung-n8-r3--sequence-trip)
- [Section 9](#section-9)
- [Shutdown Response in Process Automation](#shutdown-response-in-process-automation)
- [Section 10](#section-10)
- [Control System Protection Hierarchy](#control-system-protection-hierarchy)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Final Knowledge Layer of the Series](#final-knowledge-layer-of-the-series)

---

Berikut **Outline Artikel 10 — Shutdown Logic & Cause-Effect** yang tetap **terkunci pada PLC Reference System Pump P-101**, dan hanya merujuk pada **Network N5 Trip Logic**, **Network N6 Alarm Logic**, serta **Network N8 Sequence Interface** dari **FB101 Pump_Control**.

Artikel ini adalah **lapisan tertinggi dari keseluruhan serial**, karena menghubungkan seluruh konsep yang telah dipelajari sebelumnya:

```
process deviation
↓
alarm / trip logic
↓
equipment shutdown
↓
process protection
```

Semua aturan tetap dijaga:

- tidak membuat equipment baru
- tidak membuat signal baru
- tidak mengubah ladder
- hanya merujuk network yang sudah ada

---

# Article 10

# Shutdown Logic & Cause-Effect

## System Reference (Locked)

Sistem yang dianalisis tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Pump dikontrol oleh:

```
FB101 Pump_Control
```

yang dipanggil oleh:

```
OB1
```

Artikel ini menghubungkan **trip logic dan alarm logic dengan shutdown respon sistem**.

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 6 — Pump Protection Logic
- Diagram 8 — Sequence Control Interface

---

# Section 1

# Process Protection in Industrial Control

## Engineering Focus

Sistem kontrol industri tidak hanya mengontrol operasi equipment, tetapi juga melindungi plant dari kondisi berbahaya.

Dalam banyak sistem proses, deviasi proses dapat menyebabkan:

```
equipment damage
process instability
fire hazard
explosion risk
```

Untuk mencegah eskalasi tersebut, sistem kontrol menggunakan **shutdown logic**.

Struktur proteksi:

```
Process Deviation
↓
Protection Logic
↓
Automatic Shutdown
↓
Plant Protection
```

---

# Section 2

# Shutdown Logic in Pump P-101 Control

Dalam sistem Pump P-101, shutdown terjadi melalui **trip logic** yang telah dijelaskan pada artikel sebelumnya.

Posisi trip logic dalam ladder:

```
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

Trip logic berada pada:

```
Network N5 Trip Logic
```

---

# Section 3

# Process Deviation Detection

Deviasi proses dideteksi oleh **Network N1 Input Conditioning**.

Contoh deviasi yang memicu proteksi:

```
SUCT_PRESS_LOWLOW
OL_TRIP
MCC_HEALTHY = FALSE
```

Contoh rung deteksi deviasi:

### Rung N1-R7 — Low-Low Suction Pressure

```
| PT101_PV < LowLow_SP |
|----[CMP<]--------------------( ) SUCT_PRESS_LOWLOW
```

Makna engineering:

```
suction pressure berada pada kondisi kritis
```

Status ini digunakan oleh **trip logic**.

---

# Section 4

# Trip Logic as Shutdown Trigger

Trip logic mengevaluasi kondisi proses untuk menentukan apakah pump harus dihentikan.

## Ladder Reference

### Rung N5-R1 — Trip Evaluation

```
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

```
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR (RUN_LATCH AND NOT MCC_HEALTHY)
```

Engineering meaning:

```
PLC mendeteksi kondisi operasi tidak aman
```

---

# Section 5

# Equipment Shutdown Response

Ketika trip aktif, PLC memaksa pump berhenti.

### Rung N5-R2 — Trip Output

```
| TRIP_ACTIVE |
|----[ ]-----------------------------( ) TRIP_P101
```

Shutdown chain:

```
TRIP_ACTIVE
↓
TRIP_P101
↓
RUN_LATCH reset
↓
MTR_START_CMD off
↓
Motor stop
↓
Pump shutdown
```

Ini adalah **automatic protective shutdown**.

---

# Section 6

# Alarm vs Shutdown Response

Tidak semua deviasi memicu shutdown.

Beberapa hanya memicu alarm.

Alarm logic berada pada:

```
Network N6 Alarm Logic
```

Contoh rung:

### Rung N6-R1 — Alarm Evaluation

```
| SUCT_PRESS_LOW |
|----[ ]--------------------------------|
|                                         |
| START_FAIL_ACTIVE |
|----[ ]--------------------------------|----( ) ALARM_ACTIVE
|                                         |
| CMD_START_REQ | /PERMISSIVE_OK |
|----[ ]------------[/]------------------|
```

Perbedaan respon:

| Condition         | Response |
| ----------------- | -------- |
| SUCT_PRESS_LOW    | Alarm    |
| SUCT_PRESS_LOWLOW | Trip     |

---

# Section 7

# Cause-Effect Relationship

Shutdown system bekerja berdasarkan **hubungan cause-effect**.

Struktur hubungan:

```
Cause
↓
Protection Logic
↓
Effect
```

Contoh pada Pump P-101:

```
Cause
Low suction pressure
↓
Logic
Trip evaluation
↓
Effect
Pump shutdown
```

Contoh lain:

```
Cause
Motor overload
↓
Logic
Trip detection
↓
Effect
Motor stop
```

---

# Section 8

# Interaction with Sequence Control

Shutdown juga harus diinformasikan kepada **sequence controller**.

Interface tersedia pada:

```
Network N8 Sequence Interface
```

### Rung N8-R3 — Sequence Trip

```
| TRIP_ACTIVE |
|----[ ]--------------------------------|
|                                         |----( ) SEQ_TRIP
| START_FAIL_ACTIVE |
|----[ ]--------------------------------|
```

Makna logika:

```
SEQ_TRIP =
TRIP_ACTIVE
OR START_FAIL_ACTIVE
```

Engineering meaning:

```
sequence controller mengetahui bahwa pump tidak dapat beroperasi
```

---

# Section 9

# Shutdown Response in Process Automation

Ketika shutdown terjadi, efeknya dapat meluas ke sistem proses.

Contoh alur:

```
Process deviation
↓
Trip logic
↓
Pump shutdown
↓
Sequence interrupted
↓
Process protection
```

Ini mencegah eskalasi kegagalan dalam plant.

---

# Section 10

# Control System Protection Hierarchy

Jika seluruh serial dirangkum, struktur proteksi sistem menjadi:

```
Process Condition
↓
Instrument Detection
↓
PLC Logic
↓
Alarm / Trip Decision
↓
Equipment Response
↓
Process Protection
```

Dalam sistem Pump P-101:

```
PT101_PV
↓
SUCT_PRESS_LOWLOW
↓
TRIP_ACTIVE
↓
Pump shutdown
```

---

# Ladder Reference Summary

Artikel ini hanya merujuk:

```
FB101 Pump_Control
```

Network:

```
N5 Trip Logic
N6 Alarm Logic
N8 Sequence Interface
```

Rung yang digunakan:

```
N5-R1
N5-R2
N6-R1
N8-R3
```

Tidak boleh menampilkan rung dari:

```
N2
N3
N4
N7
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```
Diagram 1 — Pump System Reference
Diagram 6 — Pump Protection Logic
Diagram 8 — Sequence Control Interface
```

---

# Final Knowledge Layer of the Series

Artikel terakhir ini menghubungkan seluruh lapisan kontrol yang telah dibangun sejak Artikel 01.

Struktur akhir sistem kontrol:

```
Process Condition
↓
Signal Detection
↓
PLC Ladder Logic
↓
Permissive / Alarm / Trip
↓
Equipment Response
↓
Process Protection
```

Dalam konteks Pump P-101:

```
Process deviation
↓
Trip logic
↓
Pump shutdown
↓
Plant protection
```

Ini menyelesaikan **alur pengetahuan serial PLC Control Engineering** dari:

```
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

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
