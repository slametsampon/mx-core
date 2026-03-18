---
title: Start Failure Detection — Mendeteksi Equipment Gagal Start
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'start-failure-detection',
    'equipment-diagnostics',
    'pump-control',
  ]
draft: false
summary: Start failure detection digunakan dalam sistem kontrol industri untuk mendeteksi kondisi ketika perintah start telah diberikan tetapi equipment tidak berhasil mencapai kondisi running. PLC memonitor hubungan antara start command dan running feedback menggunakan timer delay untuk memberikan waktu bagi equipment mencapai kondisi operasi normal. Jika setelah waktu delay running feedback tidak muncul, sistem akan menghasilkan start failure alarm. Logika ini membantu operator dan engineer mendeteksi kegagalan start dengan cepat serta mempercepat proses troubleshooting pada equipment seperti pump, fan, dan compressor.
---

# **_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**

---

- [**_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**](#artikel-6-start-failure-detection--mendeteksi-equipment-gagal-start)
- [Article 06](#article-06)
- [Start Failure Detection](#start-failure-detection)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [The Problem of Start Failure](#the-problem-of-start-failure)
  - [Engineering Focus](#engineering-focus)
- [Section 2](#section-2)
- [Position of Start Failure Logic in FB101](#position-of-start-failure-logic-in-fb101)
- [Section 3](#section-3)
- [Start Command Generation](#start-command-generation)
  - [Ladder Reference](#ladder-reference)
    - [Rung N4-R3 — Motor Start Command](#rung-n4-r3--motor-start-command)
- [Section 4](#section-4)
- [Motor Running Feedback](#motor-running-feedback)
  - [Ladder Reference](#ladder-reference-1)
    - [Rung N1-R4 — Motor Feedback Conditioning](#rung-n1-r4--motor-feedback-conditioning)
- [Section 5](#section-5)
- [Network N7 — Start Failure Timer](#network-n7--start-failure-timer)
  - [Ladder Reference](#ladder-reference-2)
    - [Rung N7-R1 — Start Failure Timer](#rung-n7-r1--start-failure-timer)
- [Section 6](#section-6)
- [Start Failure Detection](#start-failure-detection-1)
  - [Ladder Reference](#ladder-reference-3)
    - [Rung N7-R2 — Start Fail Status](#rung-n7-r2--start-fail-status)
- [Section 7](#section-7)
- [Start Failure Alarm](#start-failure-alarm)
  - [Ladder Reference](#ladder-reference-4)
    - [Rung N7-R3 — Start Fail Alarm](#rung-n7-r3--start-fail-alarm)
- [Section 8](#section-8)
- [Interaction with Run Logic](#interaction-with-run-logic)
- [Section 9](#section-9)
- [Example Start Failure Scenario](#example-start-failure-scenario)
  - [Scenario 1 — Normal Start](#scenario-1--normal-start)
  - [Scenario 2 — Motor Fails to Start](#scenario-2--motor-fails-to-start)
- [Section 10](#section-10)
- [Start Command Verification Concept](#start-command-verification-concept)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Knowledge Layer Built by Article 06](#knowledge-layer-built-by-article-06)

---

Berikut **Outline Artikel 06 — Start Failure Detection** yang tetap **terkunci pada ladder FB101 Pump_Control**, khususnya **Network N4 dan Network N7**.

Artikel ini menjelaskan **bagaimana PLC memverifikasi bahwa perintah start benar-benar menghasilkan motor running**, menggunakan **command–feedback validation**.

Seluruh outline tetap mengikuti aturan yang telah dikunci:

- hanya menggunakan **Pump P-101 system**
- hanya menggunakan **tag yang sudah didefinisikan**
- hanya merujuk **Network N4 dan N7**
- hanya menampilkan **rung yang sudah ada**
- tidak menambah ladder baru

---

# Article 06

# Start Failure Detection

## System Reference (Locked)

Sistem yang dianalisis tetap **Pump P-101 motor-driven centrifugal pump**.

Equipment:

```text
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Signal yang digunakan untuk verifikasi start:

```text
MTR_START_CMD
MTR_RUN_FB
```

Signal internal PLC:

```text
MOTOR_FEEDBACK_ON
START_FAIL_ACTIVE
START_FAIL_ALM
```

Diagram yang digunakan:

- Diagram 1 — Pump System Reference
- Diagram 7 — Start Failure Detection Logic

---

# Section 1

# The Problem of Start Failure

## Engineering Focus

Dalam sistem kontrol equipment, **perintah start tidak selalu menghasilkan equipment running**.

Contoh kondisi di plant:

```text
motor starter gagal
motor protection aktif
mechanical jam
power supply gagal
```

Dalam kondisi ini:

```text
PLC sudah memberi command start
tetapi equipment tidak benar-benar berjalan
```

Struktur masalah:

```text
Start Command
      │
      ▼
Motor should run
      │
      ├ Running feedback present
      │
      └ Running feedback missing
```

PLC harus mendeteksi kondisi **start command tanpa running feedback**.

---

# Section 2

# Position of Start Failure Logic in FB101

Start failure detection berada pada struktur ladder berikut:

```text
FB101 Pump_Control
 │
 ├ N1 Input Conditioning
 ├ N2 Command Handling
 ├ N3 Permissive Logic
 ├ N4 Start/Stop Latch
 ├ N5 Trip Logic
 ├ N6 Alarm Logic
 ├ N7 Start Failure Detection   ← fokus artikel
 └ N8 Sequence Interface
```

Hubungan network:

```text
N4 Start Command
↓
N7 Start Failure Detection
↓
Alarm / Run reset
```

---

# Section 3

# Start Command Generation

Start command berasal dari **Network N4 Start/Stop Latch**.

## Ladder Reference

### Rung N4-R3 — Motor Start Command

```text
| RUN_LATCH | /TRIP_ACTIVE |
|----[ ]-------[/]--------------------( ) MTR_START_CMD
```

Makna logika:

```text
MTR_START_CMD =
RUN_LATCH
AND NOT TRIP_ACTIVE
```

Engineering meaning:

```text
PLC mengirim command start ke motor starter
```

Namun PLC masih harus memastikan **motor benar-benar running**.

---

# Section 4

# Motor Running Feedback

Motor status diperoleh dari **field feedback signal**.

## Ladder Reference

### Rung N1-R4 — Motor Feedback Conditioning

```text
| MTR_RUN_FB |
|----[ ]--------------------( ) MOTOR_FEEDBACK_ON
```

Makna engineering:

```text
motor contactor closed
motor running signal
```

Hubungan command dan feedback:

```text
MTR_START_CMD
↓
Motor start attempt
↓
MOTOR_FEEDBACK_ON
```

---

# Section 5

# Network N7 — Start Failure Timer

PLC memberikan waktu tertentu bagi motor untuk mencapai kondisi running.

## Ladder Reference

### Rung N7-R1 — Start Failure Timer

```text
| MTR_START_CMD | /MOTOR_FEEDBACK_ON | /TRIP_ACTIVE |
|----[ ]--------------[/]----------------[/]--------( TON )
```

Makna logika:

```text
TON.IN =
MTR_START_CMD
AND NOT MOTOR_FEEDBACK_ON
AND NOT TRIP_ACTIVE
```

Engineering meaning:

```text
timer berjalan jika start command aktif
tetapi motor belum running
```

Timer memberikan **waktu akselerasi motor**.

---

# Section 6

# Start Failure Detection

Jika timer selesai dan feedback belum muncul, maka PLC menyimpulkan **start gagal**.

## Ladder Reference

### Rung N7-R2 — Start Fail Status

```text
| TON.Q |
|----[ ]-----------------------------( ) START_FAIL_ACTIVE
```

Makna logika:

```text
START_FAIL_ACTIVE = TRUE
```

Engineering meaning:

```text
motor gagal mencapai kondisi running
```

---

# Section 7

# Start Failure Alarm

Setelah start failure terdeteksi, PLC mengirim alarm.

## Ladder Reference

### Rung N7-R3 — Start Fail Alarm

```text
| START_FAIL_ACTIVE |
|----[ ]-----------------------------( ) START_FAIL_ALM
```

Makna engineering:

```text
operator diberi notifikasi bahwa pump gagal start
```

---

# Section 8

# Interaction with Run Logic

Start failure juga berinteraksi dengan **run latch logic**.

Hubungan ladder:

```text
START_FAIL_ACTIVE
↓
RUN_LATCH reset
↓
MTR_START_CMD off
```

Artinya PLC tidak mempertahankan **command start yang gagal**.

---

# Section 9

# Example Start Failure Scenario

## Scenario 1 — Normal Start

Kondisi:

```text
MTR_START_CMD = TRUE
MOTOR_FEEDBACK_ON muncul sebelum timer selesai
```

Hasil:

```text
START_FAIL_ACTIVE = FALSE
pump running
```

---

## Scenario 2 — Motor Fails to Start

Kondisi:

```text
MTR_START_CMD = TRUE
MOTOR_FEEDBACK_ON = FALSE
timer selesai
```

Hasil:

```text
START_FAIL_ACTIVE = TRUE
START_FAIL_ALM = TRUE
RUN_LATCH reset
```

Pump tidak running.

---

# Section 10

# Start Command Verification Concept

Start failure detection adalah contoh **command verification logic**.

Struktur umum:

```text
Command issued
↓
Expected response
↓
Verify response
↓
Alarm if response missing
```

Dalam sistem Pump P-101:

```text
MTR_START_CMD
↓
Motor should run
↓
MOTOR_FEEDBACK_ON
↓
If not → START_FAIL_ACTIVE
```

---

# Ladder Reference Summary

Artikel ini hanya boleh merujuk:

```text
FB101 Pump_Control
```

Network:

```text
N4 Start/Stop Latch
N7 Start Failure Detection
```

Rung yang digunakan:

```text
N4-R3
N7-R1
N7-R2
N7-R3
```

Tidak boleh menampilkan rung dari:

```text
N1
N2
N3
N5
N6
N8
```

---

# Diagram Reference Summary

Artikel ini hanya boleh menggunakan diagram dari library:

```text
Diagram 1 — Pump System Reference
Diagram 4 — Ladder Execution Flow
Diagram 7 — Start Failure Detection Logic
```

---

# Knowledge Layer Built by Article 06

Artikel ini menambahkan pemahaman berikut:

```text
Start command
↓
Expected motor response
↓
Feedback verification
↓
Start failure detection
↓
Operator alarm
```

Pembaca sekarang memahami bahwa PLC tidak hanya:

```text
mengirim command
```

tetapi juga:

```text
memverifikasi hasil command tersebut
```

---

Jika Anda ingin, langkah berikutnya yang sangat penting adalah membuat **Outline Artikel 07 — PLC Program Structure**, karena di situ pembaca mulai memahami **bagaimana seluruh ladder Pump P-101 diorganisasi dalam OB1, FB101, dan DB101 pada Siemens S7**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
```
