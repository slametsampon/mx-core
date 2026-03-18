---
title: PLC Scan Cycle & Signal Flow dalam Control Equipment
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'ladder-logic',
    'plc-scan-cycle',
    'industrial-automation',
  ]
draft: false
summary: PLC bekerja menggunakan **scan cycle** yang terdiri dari tiga tahap utama - membaca input, mengeksekusi logika program, dan memperbarui output. Seluruh input dari field device disalin ke dalam **Input Memory (Process Image)** sebelum program ladder dijalankan. Hasil evaluasi logika kemudian disimpan pada **Output Memory** dan dikirim ke output module pada akhir scan cycle. Memahami mekanisme ini membantu engineer menganalisis perilaku sistem kontrol serta melakukan troubleshooting dengan mengikuti urutan **input → logic → output → equipment**.
---

# **_Artikel 1: PLC Scan Cycle & Signal Flow dalam Control Equipment_**

---

- [**_Artikel 1: PLC Scan Cycle \& Signal Flow dalam Control Equipment_**](#artikel-1-plc-scan-cycle--signal-flow-dalam-control-equipment)
- [Article 01](#article-01)
- [PLC Scan Cycle \& Signal Flow](#plc-scan-cycle--signal-flow)
  - [System Reference (Locked)](#system-reference-locked)
- [Section 1](#section-1)
- [PLC as Control Signal Processor](#plc-as-control-signal-processor)
  - [Diagram Reference](#diagram-reference)
  - [Engineering Focus](#engineering-focus)
  - [Ladder Relation](#ladder-relation)
- [Section 2](#section-2)
- [PLC Scan Cycle Concept](#plc-scan-cycle-concept)
  - [Diagram Reference](#diagram-reference-1)
  - [Engineering Focus](#engineering-focus-1)
- [Section 3](#section-3)
- [Ladder Execution inside FB101](#ladder-execution-inside-fb101)
  - [Diagram Reference](#diagram-reference-2)
  - [Engineering Focus](#engineering-focus-2)
- [Section 4](#section-4)
- [Network N1 — Input Conditioning](#network-n1--input-conditioning)
  - [Network Scope](#network-scope)
  - [Ladder Reference](#ladder-reference)
    - [Rung N1-R1](#rung-n1-r1)
    - [Rung N1-R2](#rung-n1-r2)
    - [Rung N1-R3](#rung-n1-r3)
    - [Rung N1-R4](#rung-n1-r4)
    - [Rung N1-R5](#rung-n1-r5)
    - [Rung N1-R6](#rung-n1-r6)
    - [Rung N1-R7](#rung-n1-r7)
- [Section 5](#section-5)
- [Signal Transformation inside PLC](#signal-transformation-inside-plc)
- [Section 6](#section-6)
- [Role of Input Conditioning in Control Logic](#role-of-input-conditioning-in-control-logic)
- [Section 7](#section-7)
- [Summary of PLC Signal Flow](#summary-of-plc-signal-flow)
- [Ladder Reference Summary](#ladder-reference-summary)
- [Diagram Reference Summary](#diagram-reference-summary)
- [Hasil Outline Ini](#hasil-outline-ini)

---

Baik. Berikut **Outline Artikel 01 — PLC Scan Cycle & Signal Flow** yang **langsung terikat pada ladder, network, tag, dan diagram library** yang telah dikunci.

Outline ini **bukan outline bebas**, tetapi **network-anchored outline**, sehingga:

- setiap bagian artikel merujuk **network tertentu**
- setiap bagian artikel merujuk **rung ladder tertentu**
- setiap bagian artikel merujuk **diagram library tertentu**

Dengan cara ini artikel hampir **tidak mungkin drift**.

---

# Article 01

# PLC Scan Cycle & Signal Flow

## System Reference (Locked)

System yang dianalisis adalah **Pump P-101**.

Equipment:

```
P-101 Pump
M-101 Motor
XV-101 Suction Valve
XV-102 Discharge Valve
```

Instrument signals:

```
PT101_PV
LSL101
MTR_RUN_FB
MCC_RDY
```

Diagram yang digunakan:

Diagram 1 — Pump System Reference

---

# Section 1

# PLC as Control Signal Processor

## Diagram Reference

Diagram 2 — PLC Hardware Signal Flow

```
FIELD DEVICE
 ↓
I/O Module
 ↓
PLC CPU
 ↓
Control Logic
 ↓
Output Module
 ↓
Motor Starter
```

## Engineering Focus

Menjelaskan bahwa PLC bekerja sebagai **processor sinyal kontrol**.

Hubungan sistem:

```
process condition
↓
instrument signal
↓
PLC logic
↓
equipment response
```

## Ladder Relation

Artikel mulai memperkenalkan bahwa **PLC logic berada di dalam FB101**.

```
OB1
 └ FB101 Pump_Control
```

Belum membahas rung detail.

---

# Section 2

# PLC Scan Cycle Concept

## Diagram Reference

Diagram 3 — PLC Program Architecture

```
PLC CPU
 │
OB1
 │
FB101 Pump_Control
 │
DB101 Pump_Data
```

## Engineering Focus

PLC Siemens S7 menjalankan program secara **cyclic scan**.

Urutan scan:

```
Read Inputs
↓
Execute Logic
↓
Update Outputs
```

Hubungkan langsung dengan:

```
OB1
↓
FB101 Pump_Control
```

---

# Section 3

# Ladder Execution inside FB101

## Diagram Reference

Diagram 4 — Ladder Execution Flow

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

## Engineering Focus

Menjelaskan bahwa:

PLC **tidak menjalankan seluruh logic sekaligus**, tetapi menjalankan **network secara berurutan**.

Namun Artikel 01 hanya fokus pada:

```
N1 Input Conditioning
```

---

# Section 4

# Network N1 — Input Conditioning

## Network Scope

```
N1 Input Conditioning
```

## Ladder Reference

### Rung N1-R1

```
| MCC_RDY |
|----[ ]--------------------( ) MCC_HEALTHY
```

Makna:

```
MCC ready signal
→ PLC mengubahnya menjadi status internal
```

---

### Rung N1-R2

```
| XV101_OPEN |
|----[ ]--------------------( ) SUCT_VALVE_READY
```

Makna:

```
valve feedback
→ status valve ready
```

---

### Rung N1-R3

```
| XV102_OPEN |
|----[ ]--------------------( ) DISC_VALVE_READY
```

Makna:

```
discharge valve open status
```

---

### Rung N1-R4

```
| MTR_RUN_FB |
|----[ ]--------------------( ) MOTOR_FEEDBACK_ON
```

Makna:

```
motor running feedback
→ PLC run status
```

---

### Rung N1-R5

```
| LSL101 |
|----[ ]--------------------( ) TANK_LEVEL_LOW
```

Makna:

```
tank level switch
→ suction availability
```

---

### Rung N1-R6

```
| PT101_PV < Low_SP |
|----[CMP<]------------( ) SUCT_PRESS_LOW
```

Makna:

```
pressure threshold
→ alarm level detection
```

---

### Rung N1-R7

```
| PT101_PV < LowLow_SP |
|----[CMP<]---------( ) SUCT_PRESS_LOWLOW
```

Makna:

```
trip threshold detection
```

---

# Section 5

# Signal Transformation inside PLC

Bagian ini menjelaskan konsep penting:

PLC tidak bekerja langsung dengan **raw signal**.

PLC mengubahnya menjadi **logic state**.

Contoh dari ladder:

```
MCC_RDY
↓
MCC_HEALTHY
```

```
XV101_OPEN
↓
SUCT_VALVE_READY
```

```
PT101_PV
↓
SUCT_PRESS_LOW
↓
SUCT_PRESS_LOWLOW
```

Ini adalah **fungsi utama Network N1**.

---

# Section 6

# Role of Input Conditioning in Control Logic

Menjelaskan hubungan N1 dengan network berikutnya.

```
N1 Input Conditioning
↓
N3 Permissive Logic
↓
N4 Start Logic
↓
N5 Trip Logic
```

Contoh hubungan nyata:

```
SUCT_PRESS_LOWLOW
→ digunakan oleh Trip Logic
```

```
SUCT_VALVE_READY
→ digunakan oleh Permissive Logic
```

---

# Section 7

# Summary of PLC Signal Flow

Ringkasan alur sistem.

```
FIELD DEVICE
↓
Input Signal
↓
Network N1 Input Conditioning
↓
Logic Evaluation
↓
Output Command
↓
Motor M-101
↓
Pump P-101
```

---

# Ladder Reference Summary

Artikel 01 hanya merujuk:

```
FB101 Pump_Control
Network N1
Rung R1–R7
```

Tidak boleh menampilkan rung dari:

```
N2
N3
N4
N5
N6
N7
N8
```

---

# Diagram Reference Summary

Artikel hanya boleh menggunakan diagram:

```
Diagram 1 Pump System
Diagram 2 PLC Signal Flow
Diagram 3 Program Architecture
Diagram 4 Ladder Execution
```

---

# Hasil Outline Ini

Artikel 01 sekarang **terikat kuat ke sistem PLC**:

```
System
↓
OB1
↓
FB101
↓
Network N1
↓
Rung N1-R1 ... N1-R7
```

Sehingga:

- tidak bisa drift
- tidak bisa ganti ladder
- tidak bisa ganti sistem
- tidak bisa ganti signal

---

Jika Anda mau, langkah berikutnya yang sangat powerful adalah membuat:

**Outline Artikel 02 — Basic Ladder Logic**

yang akan langsung membedah:

```
Network N2
Network N4
```

dan menunjukkan **rung start/stop pump P-101 secara lengkap**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
