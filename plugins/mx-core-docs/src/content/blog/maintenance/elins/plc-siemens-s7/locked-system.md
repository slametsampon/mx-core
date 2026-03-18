- [1. PLC Reference System](#1-plc-reference-system)
  - [1. PLC Platform](#1-plc-platform)
  - [2. PLC Program Architecture](#2-plc-program-architecture)
  - [3. Equipment Configuration](#3-equipment-configuration)
  - [4. PLC Input Signals](#4-plc-input-signals)
  - [5. PLC Output Signals](#5-plc-output-signals)
  - [6. Analog Signal](#6-analog-signal)
  - [7. Basic Control Logic](#7-basic-control-logic)
  - [8. Basic Ladder Logic Concept](#8-basic-ladder-logic-concept)
  - [9. Trip Logic](#9-trip-logic)
  - [10. Start Failure Detection](#10-start-failure-detection)
  - [11. Signal Flow dalam PLC Siemens S7](#11-signal-flow-dalam-plc-siemens-s7)
  - [12. Sequence of Operation](#12-sequence-of-operation)
  - [13. Bagaimana Sistem Ini Digunakan dalam Serial](#13-bagaimana-sistem-ini-digunakan-dalam-serial)
  - [14. Keuntungan Menggunakan Siemens S7 Context](#14-keuntungan-menggunakan-siemens-s7-context)
- [2. Master Control Logic Map](#2-master-control-logic-map)
  - [1. Tujuan Master Control Logic Map](#1-tujuan-master-control-logic-map)
  - [2. Ruang lingkup kontrol](#2-ruang-lingkup-kontrol)
  - [3. Tag dasar sistem](#3-tag-dasar-sistem)
  - [4. Struktur utama Master Control Logic Map](#4-struktur-utama-master-control-logic-map)
  - [5. Layer 1 — Input Conditioning](#5-layer-1--input-conditioning)
  - [6. Layer 2 — Command Handling](#6-layer-2--command-handling)
  - [7. Layer 3 — Permissive Logic](#7-layer-3--permissive-logic)
  - [8. Layer 4 — Start/Stop Latch Logic](#8-layer-4--startstop-latch-logic)
  - [9. Layer 5 — Trip / Interlock Logic](#9-layer-5--trip--interlock-logic)
  - [10. Layer 6 — Alarm Logic](#10-layer-6--alarm-logic)
  - [11. Layer 7 — Start Failure Detection](#11-layer-7--start-failure-detection)
  - [12. Layer 8 — Sequence Interface](#12-layer-8--sequence-interface)
  - [13. Master logic hierarchy lengkap](#13-master-logic-hierarchy-lengkap)
  - [14. Mapping ke artikel 01–10](#14-mapping-ke-artikel-0110)
  - [15. Struktur Siemens S7 yang direkomendasikan](#15-struktur-siemens-s7-yang-direkomendasikan)
  - [16. Prinsip editorial agar AI tetap konsisten](#16-prinsip-editorial-agar-ai-tetap-konsisten)
  - [17. Kesimpulan](#17-kesimpulan)
- [3. Master I/O List](#3-master-io-list)
  - [1. Master I/O List](#1-master-io-list)
  - [2. Signal Naming Convention](#2-signal-naming-convention)
  - [3. OB1–FB101–DB101 Baseline Structure](#3-ob1fb101db101-baseline-structure)
  - [4. FB101 Network-by-Network Breakdown](#4-fb101-network-by-network-breakdown)
  - [5. Ringkasan Struktur FB101](#5-ringkasan-struktur-fb101)
  - [6. Article-to-Network Mapping](#6-article-to-network-mapping)
  - [7. Editorial Lock Rules](#7-editorial-lock-rules)
  - [8. Kesimpulan](#8-kesimpulan)
- [4. Full Ladder Design](#4-full-ladder-design)
  - [1. Arsitektur Program](#1-arsitektur-program)
  - [2. Master Tag Basis](#2-master-tag-basis)
  - [3. Parameter di DB101](#3-parameter-di-db101)
  - [4. Desain Ladder per Network](#4-desain-ladder-per-network)
  - [5. Ringkasan Logic Final](#5-ringkasan-logic-final)
  - [6. Struktur Siemens S7 yang Direkomendasikan di FB101](#6-struktur-siemens-s7-yang-direkomendasikan-di-fb101)
  - [7. Mapping ke Artikel 01–10](#7-mapping-ke-artikel-0110)
  - [8. Kesimpulan](#8-kesimpulan-1)

---

# 1. PLC Reference System

✓ Siemens S7 Motor Driven Pump Control System

Sistem referensi dalam seluruh serial adalah **centrifugal pump P-101** yang dikontrol oleh **PLC Siemens S7**.

PLC bertanggung jawab untuk:

- membaca sinyal instrument
- mengeksekusi ladder logic control
- mengirim perintah ke motor starter

Sistem ini mewakili **equipment control typical pada plant industri** seperti:

- cooling water pump
- transfer pump
- utility pump

---

## 1. PLC Platform

Platform PLC yang diasumsikan dalam serial:

| Item                 | Description        |
| -------------------- | ------------------ |
| PLC                  | Siemens S7         |
| Programming          | Ladder Logic (LAD) |
| Engineering Software | TIA Portal         |
| Architecture         | OB – FB – DB       |

PLC menjalankan program secara **cyclic scan** melalui **Organization Block OB1**.

---

## 2. PLC Program Architecture

Struktur program yang digunakan dalam serial mengikuti praktik Siemens S7.

```text
OB1  (Main Scan Cycle)
 │
 └── FB101 Pump_Control
        │
        └── DB101 Pump_Data
```

Deskripsi:

| Block | Function            |
| ----- | ------------------- |
| OB1   | Main PLC scan cycle |
| FB101 | Pump control logic  |
| DB101 | Instance data pump  |

Pendekatan ini sesuai dengan **modular equipment control pada Siemens S7**.

---

## 3. Equipment Configuration

Peralatan fisik sistem:

| Tag    | Equipment        | Description     |
| ------ | ---------------- | --------------- |
| P-101  | Centrifugal Pump | Pump proses     |
| M-101  | Electric Motor   | Motor penggerak |
| XV-101 | Suction Valve    | Valve suction   |
| XV-102 | Discharge Valve  | Valve discharge |

Pump digerakkan oleh motor melalui **Motor Control Center (MCC)**.

---

## 4. PLC Input Signals

Sinyal yang dibaca PLC sebagai **digital input**.

| PLC Tag | Source         | Description            |
| ------- | -------------- | ---------------------- |
| I0.0    | PB-START       | Start command          |
| I0.1    | PB-STOP        | Stop command           |
| I0.2    | MCC_RDY        | MCC ready              |
| I0.3    | OL_TRIP        | Motor overload         |
| I0.4    | XV101_OPEN     | Suction valve open     |
| I0.5    | XV102_OPEN     | Discharge valve open   |
| I0.6    | MTR_RUN        | Motor running feedback |
| I0.7    | LOW_SUCT_PRESS | Low suction pressure   |

---

## 5. PLC Output Signals

Output PLC ke equipment.

| PLC Tag | Destination  | Description         |
| ------- | ------------ | ------------------- |
| Q0.0    | MCC Starter  | Motor start command |
| Q0.1    | Alarm System | Pump alarm          |
| Q0.2    | Trip Signal  | Pump trip           |

---

## 6. Analog Signal

Sinyal analog dari instrument.

| PLC Tag | Instrument | Description                  |
| ------- | ---------- | ---------------------------- |
| AIW64   | PT-101     | Suction pressure transmitter |

Nilai ini digunakan untuk menghasilkan:

- alarm
- trip threshold

---

## 7. Basic Control Logic

Logika dasar start pump:

```text
START command
AND permissive satisfied
→ motor start
```

Permissive conditions:

```text
MCC ready
AND suction valve open
AND no motor overload
AND suction pressure normal
```

---

## 8. Basic Ladder Logic Concept

Struktur ladder dasar:

```text
START PB      STOP PB
----] [----+----]/[------( )---- MTR_START
           |
           +----] [------ seal-in
```

Seal-in digunakan untuk mempertahankan motor tetap running setelah start.

---

## 9. Trip Logic

Pump harus berhenti jika kondisi berikut terjadi:

```text
Motor overload
OR
Low suction pressure
```

Trip logic memutus coil motor.

---

## 10. Start Failure Detection

PLC memonitor apakah motor benar-benar berjalan setelah start command.

Logika dasar:

```text
START command
AND
motor feedback not active
after delay
→ start fail alarm
```

Timer Siemens yang digunakan:

```text
TON start_fail_timer
```

---

## 11. Signal Flow dalam PLC Siemens S7

Alur sinyal dalam PLC:

```text
FIELD DEVICE
↓
DI / AI module
↓
Process Image Input
↓
OB1 execution
↓
FB101 Pump_Control
↓
Process Image Output
↓
DO module
↓
Motor Starter
```

Ini adalah **model operasi standar PLC Siemens S7**.

---

## 12. Sequence of Operation

Operasi normal pump:

```text
1 operator menekan START
2 PLC membaca input pada scan cycle
3 FB101 mengevaluasi permissive
4 PLC mengirim output start
5 motor running feedback muncul
6 pump beroperasi
```

---

## 13. Bagaimana Sistem Ini Digunakan dalam Serial

Sistem ini **tidak berubah di seluruh artikel**.

Yang berubah hanyalah **layer analisis kontrol**.

---

✓ Artikel 01

PLC Scan Cycle

Menganalisis bagaimana OB1 membaca:

```text
I0.0
I0.1
I0.6
AIW64
```

---

✓ Artikel 02

Basic Ladder Logic

Start–Stop motor M-101.

---

✓ Artikel 03

Permissive Logic

Menambahkan kondisi:

```text
MCC_RDY
XV101_OPEN
```

---

✓ Artikel 04

Interlock & Trip

Trip conditions:

```text
OL_TRIP
LOW_SUCT_PRESS
```

---

✓ Artikel 05

Alarm vs Trip

Threshold pressure:

```text
Low pressure → alarm
Very low pressure → trip
```

---

✓ Artikel 06

Start Failure Detection

Menggunakan timer **TON** Siemens.

---

✓ Artikel 07

PLC Program Structure

Memperkenalkan:

```text
OB
FB
DB
```

---

✓ Artikel 08

Equipment Control Module

Pump control sebagai **FB reusable module**.

---

✓ Artikel 09

Sequence Control

Sequence valve dan pump.

---

✓ Artikel 10

Shutdown Logic

Cause & effect shutdown.

---

## 14. Keuntungan Menggunakan Siemens S7 Context

Dengan menetapkan Siemens S7 sebagai referensi:

1️⃣ Contoh ladder logic realistis untuk industri
2️⃣ Struktur program OB-FB-DB konsisten
3️⃣ Timer dan function block dapat dijelaskan nyata
4️⃣ Artikel menjadi **lebih engineering-grade**

---

# 2. Master Control Logic Map

✓ Pump P-101 — Siemens S7

## 1. Tujuan Master Control Logic Map

Master Control Logic Map berfungsi sebagai:

- kerangka logika utama untuk seluruh serial
- peta hubungan antar fungsi kontrol
- acuan tetap untuk ladder logic Siemens S7
- basis konsistensi antara artikel 1 sampai 10

Secara prinsip:

```text
PLC Reference System = physical system tetap
Master Control Logic Map = logic structure tetap
Artikel = pembahasan parsial dari logic structure tersebut
```

---

## 2. Ruang lingkup kontrol

Pump **P-101** dikontrol oleh **PLC Siemens S7** untuk fungsi:

- start / stop normal
- permissive checking
- trip / interlock protection
- alarm generation
- start failure detection
- sequence participation
- shutdown response

Struktur ini diasumsikan berjalan dalam arsitektur Siemens S7:

```text
OB1
 └─ FB101 Pump_Control
     └─ DB101 Pump_P101
```

---

## 3. Tag dasar sistem

✓ 3.1 Digital Input

| Symbolic Tag | Address | Description                   |
| ------------ | ------: | ----------------------------- |
| PB_START     |    I0.0 | Push button start             |
| PB_STOP      |    I0.1 | Push button stop              |
| MCC_RDY      |    I0.2 | MCC starter ready             |
| OL_TRIP      |    I0.3 | Motor overload trip           |
| XV101_OPEN   |    I0.4 | Suction valve open feedback   |
| XV102_OPEN   |    I0.5 | Discharge valve open feedback |
| MTR_RUN_FB   |    I0.6 | Motor run feedback            |
| LSL101       |    I0.7 | Low suction tank level switch |

✓ 3.2 Analog Input

| Symbolic Tag | Address | Description                  |
| ------------ | ------: | ---------------------------- |
| PT101_PV     |   AIW64 | Suction pressure transmitter |

✓ 3.3 Digital Output

| Symbolic Tag   | Address | Description          |
| -------------- | ------: | -------------------- |
| MTR_START_CMD  |    Q0.0 | Start command to MCC |
| ALM_P101       |    Q0.1 | General alarm        |
| TRIP_P101      |    Q0.2 | Trip output          |
| START_FAIL_ALM |    Q0.3 | Start fail alarm     |

✓ 3.4 Internal Bits

| Symbolic Tag      | Description                     |
| ----------------- | ------------------------------- |
| CMD_START_REQ     | Internal start request          |
| CMD_STOP_REQ      | Internal stop request           |
| RUN_LATCH         | Run latch memory                |
| PERMISSIVE_OK     | All start permissives satisfied |
| TRIP_ACTIVE       | Trip active                     |
| ALARM_ACTIVE      | Alarm active                    |
| START_FAIL_ACTIVE | Start failure active            |
| SEQ_START_REQ     | Start request from sequence     |
| REMOTE_START_REQ  | Start request from remote logic |
| LOCAL_MODE        | Local mode selected             |
| REMOTE_MODE       | Remote mode selected            |

---

## 4. Struktur utama Master Control Logic Map

Logika kontrol dibagi menjadi 8 layer tetap.

```text
Pump P-101 Control Logic
│
├─ 1. Input Conditioning
├─ 2. Command Handling
├─ 3. Permissive Logic
├─ 4. Start/Stop Latch Logic
├─ 5. Trip / Interlock Logic
├─ 6. Alarm Logic
├─ 7. Start Failure Detection
└─ 8. Sequence Interface
```

Ini adalah peta utama yang akan diwariskan ke seluruh serial.

---

## 5. Layer 1 — Input Conditioning

Layer ini memastikan bahwa sinyal lapangan dibaca PLC Siemens S7 dalam bentuk yang siap digunakan oleh logika utama.

✓ Fungsi

- normalisasi status input
- pemisahan raw signal vs logic signal
- scaling analog pressure
- pembentukan status threshold

✓ Logic outputs dari layer ini

| Logic Tag         | Description                     |
| ----------------- | ------------------------------- |
| SUCT_PRESS_LOW    | Pressure low alarm threshold    |
| SUCT_PRESS_LOWLOW | Pressure low-low trip threshold |
| TANK_LEVEL_LOW    | Tank low level active           |
| MCC_HEALTHY       | MCC ready and not fault         |
| SUCT_VALVE_READY  | Suction valve proven open       |
| DISC_VALVE_READY  | Discharge valve proven open     |
| MOTOR_FEEDBACK_ON | Motor run proven                |

✓ Contoh hubungan

```text
PT101_PV < Low_Alarm_SP     -> SUCT_PRESS_LOW
PT101_PV < LowLow_Trip_SP   -> SUCT_PRESS_LOWLOW
MCC_RDY = 1                 -> MCC_HEALTHY
XV101_OPEN = 1              -> SUCT_VALVE_READY
MTR_RUN_FB = 1              -> MOTOR_FEEDBACK_ON
```

Dalam Siemens S7, bagian ini idealnya berada di awal `FB101` sebelum logika keputusan utama.

---

## 6. Layer 2 — Command Handling

Layer ini mengumpulkan semua sumber perintah start/stop.

✓ Sumber command

- local push button
- remote command
- sequence command
- internal stop because trip

✓ Logic structure

✓ Start request

```text
CMD_START_REQ =
(PB_START OR REMOTE_START_REQ OR SEQ_START_REQ)
AND NOT CMD_STOP_REQ
```

✓ Stop request

```text
CMD_STOP_REQ =
PB_STOP
OR TRIP_ACTIVE
OR sequence stop
OR remote stop
```

✓ Catatan Siemens S7

Pada Siemens S7, command handling sebaiknya dipisahkan dari output coil final.
Artinya `PB_START` tidak langsung men-drive `Q0.0`, tetapi terlebih dahulu membentuk internal bit seperti `CMD_START_REQ`.

Ini penting agar artikel 02, 03, 04, 06, dan 09 tetap konsisten.

---

## 7. Layer 3 — Permissive Logic

Layer ini menentukan apakah pump **boleh start**.

✓ Definisi permissive utama

Pump P-101 hanya boleh start jika seluruh kondisi berikut terpenuhi:

```text
PERMISSIVE_OK =
MCC_HEALTHY
AND SUCT_VALVE_READY
AND NOT TANK_LEVEL_LOW
AND NOT SUCT_PRESS_LOWLOW
AND NOT OL_TRIP
AND NOT TRIP_ACTIVE
```

✓ Rinciannya

| Permissive Tag        | Description                                     |
| --------------------- | ----------------------------------------------- |
| MCC_HEALTHY           | MCC siap menerima start                         |
| SUCT_VALVE_READY      | Suction valve terbuka                           |
| NOT TANK_LEVEL_LOW    | Level suction tank tidak rendah                 |
| NOT SUCT_PRESS_LOWLOW | Suction pressure tidak berada pada kondisi trip |
| NOT OL_TRIP           | Tidak ada overload                              |
| NOT TRIP_ACTIVE       | Tidak ada trip yang masih aktif                 |

✓ Prinsip

Permissive adalah **start authorization**, bukan trip.

Artinya:

- permissive dicek sebelum start
- permissive gagal → start ditolak
- permissive bukan selalu berarti motor harus langsung stop saat running, kecuali diklasifikasikan juga sebagai trip/interlock

Ini penting untuk membedakan artikel 03 dari artikel 04.

---

## 8. Layer 4 — Start/Stop Latch Logic

Layer ini membentuk status run command internal dengan gaya Siemens S7 ladder.

✓ Fungsi

- membentuk seal-in / latch
- menerapkan stop priority
- menahan command run selama kondisi normal

✓ Logika inti

✓ Set run latch

```text
RUN_LATCH set jika:
CMD_START_REQ
AND PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

✓ Reset run latch

```text
RUN_LATCH reset jika:
CMD_STOP_REQ
OR NOT PERMISSIVE_OK sebelum start selesai
OR TRIP_ACTIVE
```

✓ Final motor command

```text
MTR_START_CMD = RUN_LATCH AND NOT TRIP_ACTIVE
```

✓ Prinsip Siemens S7

Dalam implementasi Siemens S7, latch dapat direalisasikan dengan:

- coil memory normal
- set/reset dominant structure
- internal memory bit dalam FB/DB

Untuk serial ini, paling konsisten jika diposisikan sebagai:

```text
FB101 internal memory
-> RUN_LATCH
-> output command Q0.0
```

Ini membuat artikel 02 menjadi dasar untuk artikel berikutnya.

---

## 9. Layer 5 — Trip / Interlock Logic

Layer ini menentukan kapan pump harus berhenti secara protektif.

✓ Trip sources utama

| Trip Source                      | Description                    |
| -------------------------------- | ------------------------------ |
| OL_TRIP                          | Motor overload trip            |
| SUCT_PRESS_LOWLOW                | Suction pressure sangat rendah |
| optional MCC fault while running | MCC failure during operation   |

✓ Trip active

```text
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR MCC fault while running
```

✓ Trip response

```text
Jika TRIP_ACTIVE = 1 maka:
- RUN_LATCH reset
- MTR_START_CMD = 0
- TRIP_P101 = 1
```

✓ Interlock vs Trip dalam logic map ini

Agar serial tetap konsisten:

- **Permissive**: syarat untuk boleh start
- **Interlock**: logika yang memblok command atau memaksa stop sesuai filosofi operasi
- **Trip**: protective stop otomatis

Dalam struktur artikel, artikel 04 bisa menjelaskan interlock dan trip sebagai satu domain proteksi, tetapi di map ini tetap dipisahkan secara fungsi.

---

## 10. Layer 6 — Alarm Logic

Layer ini membentuk alarm untuk operator tanpa selalu menghentikan pump.

✓ Alarm sources utama

| Alarm Source                          | Description                                |
| ------------------------------------- | ------------------------------------------ |
| SUCT_PRESS_LOW                        | Suction pressure rendah                    |
| START_FAIL_ACTIVE                     | Start failure terdeteksi                   |
| permissive not ready on start request | Permissive gagal saat operator minta start |
| valve not ready                       | Status valve tidak sesuai                  |

✓ Alarm active

```text
ALARM_ACTIVE =
SUCT_PRESS_LOW
OR START_FAIL_ACTIVE
OR start rejected by permissive
```

✓ Output

```text
ALM_P101 = ALARM_ACTIVE
```

✓ Prinsip

Pada sistem ini:

- `SUCT_PRESS_LOW` = alarm
- `SUCT_PRESS_LOWLOW` = trip

Ini menjadi tulang punggung artikel 05.

---

## 11. Layer 7 — Start Failure Detection

Layer ini mendeteksi kondisi ketika PLC sudah memberi command start tetapi motor tidak benar-benar running.

✓ Filosofi

Start failure hanya dievaluasi setelah:

- start command benar-benar diberikan
- diberi waktu cukup untuk motor mencapai run feedback

✓ Struktur Siemens S7

Gunakan timer `TON`.

✓ Kondisi timer aktif

```text
StartFail_Timer_IN =
MTR_START_CMD
AND NOT MOTOR_FEEDBACK_ON
AND NOT TRIP_ACTIVE
```

✓ Setelah timer selesai

```text
Jika TON.Q = 1
-> START_FAIL_ACTIVE = 1
```

✓ Ekspresi konseptual

```text
START_FAIL_ACTIVE =
(MTR_START_CMD AND NOT MOTOR_FEEDBACK_ON)
for more than StartFailDelay
```

✓ Response

Bisa dipilih salah satu filosofi:

- alarm only
- alarm + auto stop

Agar serial konsisten dan tetap industrially practical, saya sarankan untuk sistem referensi ini:

```text
START_FAIL_ACTIVE
-> START_FAIL_ALM = 1
-> RUN_LATCH reset
```

Jadi start failure menghasilkan alarm dan memaksa command start dilepas.

Ini sangat cocok untuk artikel 06.

---

## 12. Layer 8 — Sequence Interface

Layer ini membuat Pump P-101 bisa menjadi bagian dari operasi berurutan.

✓ Sequence logic interface

Pump menerima command dari sequence:

| Sequence Tag  | Description                     |
| ------------- | ------------------------------- |
| SEQ_START_REQ | Sequence meminta pump start     |
| SEQ_STOP_REQ  | Sequence meminta pump stop      |
| SEQ_READY     | Pump siap untuk step berikutnya |
| SEQ_RUNNING   | Pump terbukti running           |
| SEQ_TRIP      | Pump trip saat sequence aktif   |

✓ Definisi dasar

```text
SEQ_READY =
PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

```text
SEQ_RUNNING =
MOTOR_FEEDBACK_ON
```

```text
SEQ_TRIP =
TRIP_ACTIVE
OR START_FAIL_ACTIVE
```

✓ Contoh penggunaan pada sequence

```text
Step 1: verify XV101 open
Step 2: issue pump start
Step 3: wait MTR_RUN_FB
Step 4: open XV102
```

Ini akan menjadi dasar artikel 09.

---

## 13. Master logic hierarchy lengkap

Berikut peta hirarki final yang dapat dipakai sebagai induk seluruh serial.

```text
FB101 Pump_Control
│
├─ A. Input Conditioning
│   ├─ MCC_HEALTHY
│   ├─ SUCT_VALVE_READY
│   ├─ DISC_VALVE_READY
│   ├─ MOTOR_FEEDBACK_ON
│   ├─ SUCT_PRESS_LOW
│   ├─ SUCT_PRESS_LOWLOW
│   └─ TANK_LEVEL_LOW
│
├─ B. Command Handling
│   ├─ CMD_START_REQ
│   └─ CMD_STOP_REQ
│
├─ C. Permissive Logic
│   └─ PERMISSIVE_OK
│
├─ D. Run Command Logic
│   ├─ RUN_LATCH
│   └─ MTR_START_CMD
│
├─ E. Trip Logic
│   ├─ TRIP_ACTIVE
│   └─ TRIP_P101
│
├─ F. Alarm Logic
│   ├─ ALARM_ACTIVE
│   └─ ALM_P101
│
├─ G. Start Failure Detection
│   ├─ TON_StartFail
│   ├─ START_FAIL_ACTIVE
│   └─ START_FAIL_ALM
│
└─ H. Sequence Interface
    ├─ SEQ_READY
    ├─ SEQ_RUNNING
    └─ SEQ_TRIP
```

---

## 14. Mapping ke artikel 01–10

✓ 01 — PLC Scan Cycle & Signal Flow

Fokus pada:

- input conditioning
- process image input/output
- OB1 cyclic execution
- aliran sinyal dari `I`, `AIW`, internal logic, `Q`

Bagian map yang dipakai:

- A
- sebagian B
- sebagian D

---

✓ 02 — Basic Ladder Logic

Fokus pada:

- `PB_START`
- `PB_STOP`
- `RUN_LATCH`
- stop priority
- seal-in

Bagian map yang dipakai:

- B
- D

---

✓ 03 — Permissive Logic

Fokus pada:

- `PERMISSIVE_OK`
- syarat boleh start
- start rejection

Bagian map yang dipakai:

- A
- C

---

✓ 04 — Interlock & Trip Logic

Fokus pada:

- `TRIP_ACTIVE`
- overload
- suction pressure low-low
- forced stop

Bagian map yang dipakai:

- E

---

✓ 05 — Alarm vs Trip

Fokus pada:

- `SUCT_PRESS_LOW` vs `SUCT_PRESS_LOWLOW`
- `ALM_P101` vs `TRIP_P101`

Bagian map yang dipakai:

- A
- E
- F

---

✓ 06 — Start Failure Detection

Fokus pada:

- `MTR_START_CMD`
- `MTR_RUN_FB`
- `TON_StartFail`
- `START_FAIL_ACTIVE`

Bagian map yang dipakai:

- G

---

✓ 07 — PLC Program Structure

Fokus pada:

- `OB1`
- `FB101`
- `DB101`
- bagaimana logic map ditempatkan dalam Siemens S7

Bagian map yang dipakai:

- seluruh struktur block level

---

✓ 08 — Equipment Control Module

Fokus pada:

- `FB101 Pump_Control` sebagai modular reusable object
- parameterisasi dan instance DB

Bagian map yang dipakai:

- seluruh logic map sebagai module

---

✓ 09 — Sequence Control

Fokus pada:

- `SEQ_START_REQ`
- `SEQ_READY`
- `SEQ_RUNNING`
- urutan valve–pump–valve

Bagian map yang dipakai:

- H
- sebagian B
- sebagian D

---

✓ 10 — Shutdown Logic & Cause Effect

Fokus pada:

- relasi deviasi proses ke trip output
- cause → logic → shutdown response

Bagian map yang dipakai:

- E
- F
- H bila dikaitkan ke unit shutdown response

---

## 15. Struktur Siemens S7 yang direkomendasikan

Agar tetap konsisten di seluruh serial, saya sarankan struktur berikut sebagai baseline.

✓ OB1

Fungsi:

- memanggil `FB101`
- menjalankan cyclic scan

Contoh struktur konseptual:

```text
OB1
 └─ CALL FB101, DB101
```

✓ FB101 — Pump_Control

Fungsi:

- menampung seluruh logic map Pump P-101

Subbagian internal:

- Network 1: input conditioning
- Network 2: command handling
- Network 3: permissive
- Network 4: run latch
- Network 5: trip
- Network 6: alarm
- Network 7: start fail timer
- Network 8: sequence interface

✓ DB101 — Pump_P101

Fungsi:

- menyimpan instance data:

  - latch
  - timer state
  - status memory
  - parameter setpoint bila dibutuhkan

Ini membuat artikel 07 dan 08 menjadi natural dan tidak dipaksakan.

---

## 16. Prinsip editorial agar AI tetap konsisten

Saat nanti serial diturunkan menjadi artikel, setiap prompt harus memuat aturan tetap ini:

```text
Gunakan hanya PLC Reference System Pump P-101 yang telah dikunci.
Gunakan hanya Master Control Logic Map Pump P-101 Siemens S7 yang telah dikunci.
Jangan membuat equipment baru.
Jangan membuat signal baru kecuali sudah didefinisikan di logic map.
Jangan mengubah OB1-FB101-DB101 architecture.
Setiap artikel hanya membahas subset dari logic map yang relevan.
```

Ini adalah kunci agar konteks tidak pecah.

---

## 17. Kesimpulan

Dengan **PLC Reference System yang terkunci** dan **Master Control Logic Map ini**, maka seluruh serial sekarang memiliki dua fondasi tetap:

```text
Physical consistency  -> Pump P-101 system tetap
Logic consistency     -> FB101 Pump_Control logic tetap
```

Artinya mulai dari artikel 01 sampai 10:

- equipment tetap sama
- instrument tetap sama
- tag tetap sama
- logika tetap sama
- yang berubah hanya sudut pembahasan

Ini yang membuat serial berubah dari sekadar kumpulan artikel menjadi **satu model kontrol Siemens S7 yang dibedah bertahap**.

---

# 3. Master I/O List

## 1. Master I/O List

✓ Pump P-101 — Siemens S7

Daftar ini menjadi referensi tunggal seluruh serial.

✓ 1.1 Digital Input

| Symbolic Tag | Address | Type | Description                   |
| ------------ | ------: | ---- | ----------------------------- |
| PB_START     |    I0.0 | DI   | Push button start             |
| PB_STOP      |    I0.1 | DI   | Push button stop              |
| MCC_RDY      |    I0.2 | DI   | MCC starter ready             |
| OL_TRIP      |    I0.3 | DI   | Motor overload trip           |
| XV101_OPEN   |    I0.4 | DI   | Suction valve open feedback   |
| XV102_OPEN   |    I0.5 | DI   | Discharge valve open feedback |
| MTR_RUN_FB   |    I0.6 | DI   | Motor running feedback        |
| LSL101       |    I0.7 | DI   | Low suction tank level switch |

✓ 1.2 Analog Input

| Symbolic Tag | Address | Type | Description                        |
| ------------ | ------: | ---- | ---------------------------------- |
| PT101_PV     |   AIW64 | AI   | Suction pressure transmitter value |

✓ 1.3 Digital Output

| Symbolic Tag   | Address | Type | Description          |
| -------------- | ------: | ---- | -------------------- |
| MTR_START_CMD  |    Q0.0 | DO   | Start command to MCC |
| ALM_P101       |    Q0.1 | DO   | General pump alarm   |
| TRIP_P101      |    Q0.2 | DO   | Pump trip output     |
| START_FAIL_ALM |    Q0.3 | DO   | Start failure alarm  |

✓ 1.4 Internal Logic Tags

| Symbolic Tag      | Type | Description                          |
| ----------------- | ---- | ------------------------------------ |
| CMD_START_REQ     | BOOL | Internal start request               |
| CMD_STOP_REQ      | BOOL | Internal stop request                |
| RUN_LATCH         | BOOL | Internal run latch                   |
| PERMISSIVE_OK     | BOOL | All start permissives satisfied      |
| TRIP_ACTIVE       | BOOL | Trip active                          |
| ALARM_ACTIVE      | BOOL | Alarm active                         |
| START_FAIL_ACTIVE | BOOL | Start failure active                 |
| SEQ_START_REQ     | BOOL | Sequence start request               |
| REMOTE_START_REQ  | BOOL | Remote start request                 |
| LOCAL_MODE        | BOOL | Local mode selected                  |
| REMOTE_MODE       | BOOL | Remote mode selected                 |
| SUCT_PRESS_LOW    | BOOL | Low suction pressure alarm status    |
| SUCT_PRESS_LOWLOW | BOOL | Low-low suction pressure trip status |
| TANK_LEVEL_LOW    | BOOL | Low tank level status                |
| MCC_HEALTHY       | BOOL | MCC ready status                     |
| SUCT_VALVE_READY  | BOOL | Suction valve proven open            |
| DISC_VALVE_READY  | BOOL | Discharge valve proven open          |
| MOTOR_FEEDBACK_ON | BOOL | Motor running proven                 |
| SEQ_READY         | BOOL | Pump ready for sequence              |
| SEQ_RUNNING       | BOOL | Pump running status for sequence     |
| SEQ_TRIP          | BOOL | Pump trip status for sequence        |

Catatan:

- seluruh tag di atas sudah berada di dalam reference system dan logic map
- tidak ada tag tambahan di luar definisi yang sudah dikunci

---

## 2. Signal Naming Convention

✓ Siemens S7 — Pump P-101

Agar seluruh artikel konsisten, penamaan dibekukan sebagai berikut.

✓ 2.1 Prinsip umum

Penamaan dibagi menjadi 4 kelompok:

- **field input/output tag**
- **status hasil conditioning**
- **command/internal logic**
- **sequence interface**

✓ 2.2 Aturan penamaan

✓ Field signal

Gunakan nama fisik yang langsung merepresentasikan sumber lapangan.

Contoh:

- `PB_START`
- `PB_STOP`
- `MCC_RDY`
- `OL_TRIP`
- `XV101_OPEN`
- `MTR_RUN_FB`
- `PT101_PV`

✓ Conditioned status

Gunakan suffix atau bentuk status operasional yang siap dipakai logika.

Contoh:

- `MCC_HEALTHY`
- `SUCT_VALVE_READY`
- `DISC_VALVE_READY`
- `MOTOR_FEEDBACK_ON`
- `SUCT_PRESS_LOW`
- `SUCT_PRESS_LOWLOW`
- `TANK_LEVEL_LOW`

✓ Internal command / control

Gunakan nama yang menunjukkan fungsi keputusan PLC.

Contoh:

- `CMD_START_REQ`
- `CMD_STOP_REQ`
- `RUN_LATCH`
- `PERMISSIVE_OK`
- `TRIP_ACTIVE`
- `ALARM_ACTIVE`
- `START_FAIL_ACTIVE`

✓ Sequence interface

Gunakan prefix `SEQ_`.

Contoh:

- `SEQ_START_REQ`
- `SEQ_READY`
- `SEQ_RUNNING`
- `SEQ_TRIP`

✓ 2.3 Aturan editorial serial

Di seluruh artikel:

- jangan mengganti `MTR_RUN_FB` menjadi `RUN_FB`, `RUNNING_FB`, atau nama lain
- jangan mengganti `SUCT_PRESS_LOWLOW` menjadi `LL_PRESS`, `PSLL`, atau nama lain
- jangan mengganti `RUN_LATCH` menjadi `motor_mem`, `run_cmd`, atau nama lain
- jangan mengganti `FB101` dan `DB101`

Artinya, konsistensi istilah harus absolut.

---

## 3. OB1–FB101–DB101 Baseline Structure

✓ Siemens S7

Arsitektur ini dikunci.

```text
OB1
 └── CALL FB101 , DB101
```

✓ 3.1 OB1

Fungsi OB1 adalah:

- menjalankan scan cycle utama
- memanggil `FB101`
- tidak memuat logic kontrol detail pump secara langsung

Dengan demikian, seluruh artikel harus mengasumsikan:

```text
OB1 = eksekusi siklik utama
FB101 = seluruh control logic Pump P-101
DB101 = instance data Pump P-101
```

✓ 3.2 FB101

`FB101` adalah blok utama kontrol Pump P-101.

Di dalamnya terdapat network tetap:

1. Input Conditioning
2. Command Handling
3. Permissive Logic
4. Start/Stop Latch Logic
5. Trip Logic
6. Alarm Logic
7. Start Failure Detection
8. Sequence Interface

✓ 3.3 DB101

`DB101` adalah instance data untuk `FB101`.

DB ini menyimpan:

- state internal
- latch memory
- timer instance
- result status internal logic

---

## 4. FB101 Network-by-Network Breakdown

✓ Pump P-101 — Siemens S7

Bagian ini adalah fondasi utama agar semua artikel konsisten.

---

✓ Network 1 — Input Conditioning

✓ Tujuan

Mengubah raw field signal menjadi status internal yang siap dipakai logic.

✓ Input

- `MCC_RDY`
- `XV101_OPEN`
- `XV102_OPEN`
- `MTR_RUN_FB`
- `LSL101`
- `PT101_PV`

✓ Output internal

- `MCC_HEALTHY`
- `SUCT_VALVE_READY`
- `DISC_VALVE_READY`
- `MOTOR_FEEDBACK_ON`
- `TANK_LEVEL_LOW`
- `SUCT_PRESS_LOW`
- `SUCT_PRESS_LOWLOW`

✓ Hubungan logika konseptual

```text
MCC_RDY = 1              -> MCC_HEALTHY
XV101_OPEN = 1           -> SUCT_VALVE_READY
XV102_OPEN = 1           -> DISC_VALVE_READY
MTR_RUN_FB = 1           -> MOTOR_FEEDBACK_ON
LSL101 = 1               -> TANK_LEVEL_LOW
PT101_PV < Low_SP        -> SUCT_PRESS_LOW
PT101_PV < LowLow_SP     -> SUCT_PRESS_LOWLOW
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 01
- artikel 03
- artikel 05

---

✓ Network 2 — Command Handling

✓ Tujuan

Membentuk permintaan start dan stop dari sumber command yang sah.

✓ Input

- `PB_START`
- `PB_STOP`
- `REMOTE_START_REQ`
- `SEQ_START_REQ`
- `TRIP_ACTIVE`

✓ Output internal

- `CMD_START_REQ`
- `CMD_STOP_REQ`

✓ Hubungan logika konseptual

```text
CMD_START_REQ =
(PB_START OR REMOTE_START_REQ OR SEQ_START_REQ)
AND NOT CMD_STOP_REQ
```

```text
CMD_STOP_REQ =
PB_STOP
OR TRIP_ACTIVE
```

Catatan:

- tidak dibuat sinyal baru seperti remote stop atau sequence stop
- tetap hanya memakai sinyal yang sudah dikunci

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 02
- artikel 09

---

✓ Network 3 — Permissive Logic

✓ Tujuan

Menentukan apakah Pump P-101 diizinkan start.

✓ Input

- `MCC_HEALTHY`
- `SUCT_VALVE_READY`
- `TANK_LEVEL_LOW`
- `SUCT_PRESS_LOWLOW`
- `OL_TRIP`
- `TRIP_ACTIVE`

✓ Output internal

- `PERMISSIVE_OK`

✓ Hubungan logika konseptual

```text
PERMISSIVE_OK =
MCC_HEALTHY
AND SUCT_VALVE_READY
AND NOT TANK_LEVEL_LOW
AND NOT SUCT_PRESS_LOWLOW
AND NOT OL_TRIP
AND NOT TRIP_ACTIVE
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 03

---

✓ Network 4 — Start/Stop Latch Logic

✓ Tujuan

Membentuk memory run internal dengan stop priority.

✓ Input

- `CMD_START_REQ`
- `CMD_STOP_REQ`
- `PERMISSIVE_OK`
- `TRIP_ACTIVE`

✓ Output internal / external

- `RUN_LATCH`
- `MTR_START_CMD`

✓ Hubungan logika konseptual

```text
RUN_LATCH set jika:
CMD_START_REQ
AND PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

```text
RUN_LATCH reset jika:
CMD_STOP_REQ
OR TRIP_ACTIVE
```

```text
MTR_START_CMD = RUN_LATCH AND NOT TRIP_ACTIVE
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 02
- artikel 06
- artikel 09

---

✓ Network 5 — Trip Logic

✓ Tujuan

Menentukan kondisi protective stop.

✓ Input

- `OL_TRIP`
- `SUCT_PRESS_LOWLOW`
- `MCC_HEALTHY`
- `RUN_LATCH`

✓ Output internal / external

- `TRIP_ACTIVE`
- `TRIP_P101`

✓ Hubungan logika konseptual

```text
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR (RUN_LATCH AND NOT MCC_HEALTHY)
```

```text
TRIP_P101 = TRIP_ACTIVE
```

Catatan:

- ini tidak membuat equipment atau signal baru
- hanya menggunakan kombinasi sinyal yang telah dikunci

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 04
- artikel 05
- artikel 10

---

✓ Network 6 — Alarm Logic

✓ Tujuan

Membangkitkan alarm untuk operator tanpa selalu melakukan trip.

✓ Input

- `SUCT_PRESS_LOW`
- `START_FAIL_ACTIVE`
- `CMD_START_REQ`
- `PERMISSIVE_OK`

✓ Output internal / external

- `ALARM_ACTIVE`
- `ALM_P101`

✓ Hubungan logika konseptual

```text
ALARM_ACTIVE =
SUCT_PRESS_LOW
OR START_FAIL_ACTIVE
OR (CMD_START_REQ AND NOT PERMISSIVE_OK)
```

```text
ALM_P101 = ALARM_ACTIVE
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 05
- artikel 06

---

✓ Network 7 — Start Failure Detection

✓ Tujuan

Mendeteksi kondisi start command gagal menghasilkan motor running feedback.

✓ Input

- `MTR_START_CMD`
- `MOTOR_FEEDBACK_ON`
- `TRIP_ACTIVE`

✓ Internal

- timer `TON`

✓ Output internal / external

- `START_FAIL_ACTIVE`
- `START_FAIL_ALM`

✓ Hubungan logika konseptual

```text
TON input =
MTR_START_CMD
AND NOT MOTOR_FEEDBACK_ON
AND NOT TRIP_ACTIVE
```

```text
START_FAIL_ACTIVE = TON.Q
```

```text
START_FAIL_ALM = START_FAIL_ACTIVE
```

Tambahan response:

```text
START_FAIL_ACTIVE -> reset RUN_LATCH
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 06

---

✓ Network 8 — Sequence Interface

✓ Tujuan

Menghubungkan Pump P-101 dengan sequence logic tanpa mengubah logic inti pump.

✓ Input

- `SEQ_START_REQ`
- `PERMISSIVE_OK`
- `MOTOR_FEEDBACK_ON`
- `TRIP_ACTIVE`
- `START_FAIL_ACTIVE`

✓ Output internal

- `SEQ_READY`
- `SEQ_RUNNING`
- `SEQ_TRIP`

✓ Hubungan logika konseptual

```text
SEQ_READY =
PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

```text
SEQ_RUNNING =
MOTOR_FEEDBACK_ON
```

```text
SEQ_TRIP =
TRIP_ACTIVE
OR START_FAIL_ACTIVE
```

✓ Fungsi serial

Network ini menjadi basis untuk:

- artikel 09
- artikel 10

---

## 5. Ringkasan Struktur FB101

Berikut struktur final yang harus dipertahankan di seluruh serial.

```text
FB101 Pump_Control
│
├─ Network 1  Input Conditioning
├─ Network 2  Command Handling
├─ Network 3  Permissive Logic
├─ Network 4  Start/Stop Latch Logic
├─ Network 5  Trip Logic
├─ Network 6  Alarm Logic
├─ Network 7  Start Failure Detection
└─ Network 8  Sequence Interface
```

Ini adalah **arsitektur tetap**.

---

## 6. Article-to-Network Mapping

✓ Agar 10 artikel otomatis konsisten

✓ Artikel 01 — PLC Scan Cycle & Signal Flow

Bahas hanya:

- OB1 cyclic scan
- process image input
- process image output
- Network 1
- aliran `I -> logic -> Q`

Jangan masuk ke seluruh permissive atau trip tree.

✓ Artikel 02 — Basic Ladder Logic

Bahas hanya:

- Network 2
- Network 4
- start
- stop
- seal-in
- stop priority

Jangan membahas sequence penuh atau shutdown penuh.

✓ Artikel 03 — Permissive Logic

Bahas hanya:

- Network 1 yang relevan
- Network 3

Fokus pada `PERMISSIVE_OK`.

✓ Artikel 04 — Interlock & Trip Logic

Bahas hanya:

- Network 5

Fokus pada `TRIP_ACTIVE` dan forced stop.

✓ Artikel 05 — Alarm vs Trip

Bahas hanya:

- Network 1 untuk threshold pressure
- Network 5
- Network 6

Fokus pada beda respon:

- `SUCT_PRESS_LOW -> alarm`
- `SUCT_PRESS_LOWLOW -> trip`

✓ Artikel 06 — Start Failure Detection

Bahas hanya:

- Network 4
- Network 7
- sebagian Network 6

Fokus pada command vs feedback.

✓ Artikel 07 — PLC Program Structure

Bahas hanya:

- OB1
- FB101
- DB101
- pembagian network dalam FB101

Jangan membuat block architecture baru.

✓ Artikel 08 — Equipment Control Module

Bahas hanya:

- FB101 sebagai reusable module
- DB101 sebagai instance data
- bagaimana network tetap berada di dalam module yang sama

✓ Artikel 09 — Sequence Control

Bahas hanya:

- Network 8
- relasinya dengan Network 2 dan Network 4

Fokus pada step-based interaction, bukan mengubah pump logic dasar.

✓ Artikel 10 — Shutdown Logic & Cause Effect

Bahas hanya:

- Network 5
- Network 6
- Network 8 bila diperlukan untuk status response

Fokus pada cause -> logic -> shutdown response.

---

## 7. Editorial Lock Rules

✓ Wajib dipakai untuk semua penulisan artikel

Gunakan aturan ini secara tetap.

```text
1. Gunakan hanya Pump P-101 sebagai reference system.
2. Gunakan hanya tag yang telah didefinisikan dalam Master I/O List.
3. Gunakan hanya OB1-FB101-DB101 sebagai architecture Siemens S7.
4. Gunakan hanya Network 1 sampai Network 8 yang telah dikunci.
5. Jangan membuat diagram baru yang mengubah sistem fisik.
6. Jangan membuat contoh equipment lain.
7. Jangan mengganti nama tag.
8. Setiap artikel hanya membahas network yang relevan.
9. Artikel tidak boleh menambah philosophy baru yang tidak ada di logic map.
10. Ladder logic harus selalu merujuk ke FB101 Pump_Control.
```

---

## 8. Kesimpulan

Dengan dokumen ini, serial Anda sekarang sudah memiliki fondasi implementasi yang lengkap:

- **physical model tetap**
- **tag tetap**
- **Siemens S7 architecture tetap**
- **FB101 network structure tetap**
- **cakupan tiap artikel tetap**

Artinya, mulai titik ini AI tidak lagi perlu “mencari contoh”, karena seluruh contoh sudah dibekukan di dalam satu sistem kontrol yang sama.

---

# 4. Full Ladder Design

✓ FB101 Pump_Control

✓ Siemens S7 LAD

## 1. Arsitektur Program

✓ OB1

OB1 hanya memanggil block kontrol pump.

```text
OB1
 └── CALL FB101, DB101
```

✓ FB101

`FB101` memuat seluruh ladder logic Pump P-101 dalam 8 network:

1. Input Conditioning
2. Command Handling
3. Permissive Logic
4. Start/Stop Latch Logic
5. Trip Logic
6. Alarm Logic
7. Start Failure Detection
8. Sequence Interface

✓ DB101

`DB101` menyimpan:

- state internal
- latch
- timer instance
- parameter pembanding pressure

---

## 2. Master Tag Basis

✓ Digital Input

- `PB_START`
- `PB_STOP`
- `MCC_RDY`
- `OL_TRIP`
- `XV101_OPEN`
- `XV102_OPEN`
- `MTR_RUN_FB`
- `LSL101`

✓ Analog Input

- `PT101_PV`

✓ Digital Output

- `MTR_START_CMD`
- `ALM_P101`
- `TRIP_P101`
- `START_FAIL_ALM`

✓ Internal BOOL

- `CMD_START_REQ`
- `CMD_STOP_REQ`
- `RUN_LATCH`
- `PERMISSIVE_OK`
- `TRIP_ACTIVE`
- `ALARM_ACTIVE`
- `START_FAIL_ACTIVE`
- `SEQ_START_REQ`
- `REMOTE_START_REQ`
- `LOCAL_MODE`
- `REMOTE_MODE`
- `SUCT_PRESS_LOW`
- `SUCT_PRESS_LOWLOW`
- `TANK_LEVEL_LOW`
- `MCC_HEALTHY`
- `SUCT_VALVE_READY`
- `DISC_VALVE_READY`
- `MOTOR_FEEDBACK_ON`
- `SEQ_READY`
- `SEQ_RUNNING`
- `SEQ_TRIP`

---

## 3. Parameter di DB101

Karena `PT101_PV` adalah analog input, maka threshold pressure perlu berada di `DB101` sebagai parameter, bukan signal baru.

✓ Parameter minimum

- `Low_SP`
- `LowLow_SP`
- `StartFailDelay`

Parameter ini bukan signal lapangan baru, tetapi parameter internal block.

---

## 4. Desain Ladder per Network

---

✓ Network 1 — Input Conditioning

✓ Tujuan

Mengubah raw input menjadi status logic internal.

✓ Network 1.1 — MCC healthy

```text
| MCC_RDY |
|----[ ]-----------------------------------------( ) MCC_HEALTHY |
```

✓ Network 1.2 — Suction valve ready

```text
| XV101_OPEN |
|----[ ]------------------------------------( ) SUCT_VALVE_READY |
```

✓ Network 1.3 — Discharge valve ready

```text
| XV102_OPEN |
|----[ ]------------------------------------( ) DISC_VALVE_READY |
```

✓ Network 1.4 — Motor feedback on

```text
| MTR_RUN_FB |
|----[ ]------------------------------------( ) MOTOR_FEEDBACK_ON |
```

✓ Network 1.5 — Tank level low

```text
| LSL101 |
|----[ ]--------------------------------------( ) TANK_LEVEL_LOW |
```

✓ Network 1.6 — Suction pressure low

Konsep Siemens S7 LAD:

```text
IF PT101_PV < Low_SP THEN SUCT_PRESS_LOW := 1
```

Representasi ladder konseptual:

```text
|  PT101_PV < Low_SP  |
|----[CMP<]----------------------------------( ) SUCT_PRESS_LOW |
```

✓ Network 1.7 — Suction pressure low-low

```text
|  PT101_PV < LowLow_SP  |
|----[CMP<]-------------------------------( ) SUCT_PRESS_LOWLOW |
```

---

✓ Network 2 — Command Handling

✓ Tujuan

Menghasilkan request start dan request stop internal.

✓ Network 2.1 — Stop request

```text
| PB_STOP |                                   |
|----[ ]--------------------------------------|
|                                              |----( ) CMD_STOP_REQ |
| TRIP_ACTIVE |                                |
|----[ ]--------------------------------------|
```

Artinya:

```text
CMD_STOP_REQ = PB_STOP OR TRIP_ACTIVE
```

✓ Network 2.2 — Start request

```text
| PB_START |                                  |
|----[ ]--------------------------------------|
|                                              |
| REMOTE_START_REQ |                           |
|----[ ]--------------------------------------|----[/]----( ) CMD_START_REQ |
|                                              | CMD_STOP_REQ
| SEQ_START_REQ |                              |
|----[ ]--------------------------------------|
```

Artinya:

```text
CMD_START_REQ =
(PB_START OR REMOTE_START_REQ OR SEQ_START_REQ)
AND NOT CMD_STOP_REQ
```

---

✓ Network 3 — Permissive Logic

✓ Tujuan

Menentukan apakah Pump P-101 diizinkan start.

```text
| MCC_HEALTHY | SUCT_VALVE_READY | /TANK_LEVEL_LOW | /SUCT_PRESS_LOWLOW | /OL_TRIP | /TRIP_ACTIVE |
|----[ ]-------------[ ]---------------[/]----------------[/]---------------[/]-----------[/]----( ) PERMISSIVE_OK |
```

Artinya:

```text
PERMISSIVE_OK =
MCC_HEALTHY
AND SUCT_VALVE_READY
AND NOT TANK_LEVEL_LOW
AND NOT SUCT_PRESS_LOWLOW
AND NOT OL_TRIP
AND NOT TRIP_ACTIVE
```

---

✓ Network 4 — Start/Stop Latch Logic

✓ Tujuan

Membentuk run memory dengan stop priority.

✓ Network 4.1 — Set RUN_LATCH

Dipakai coil `S` Siemens.

```text
| CMD_START_REQ | PERMISSIVE_OK | /TRIP_ACTIVE |
|----[ ]-------------[ ]------------[/]--------------------(S) RUN_LATCH |
```

✓ Network 4.2 — Reset RUN_LATCH

```text
| CMD_STOP_REQ |
|----[ ]--------------------------------------------(R) RUN_LATCH |
```

Tambahan reset karena start failure:

```text
| START_FAIL_ACTIVE |
|----[ ]--------------------------------------------(R) RUN_LATCH |
```

✓ Network 4.3 — Final motor start command

```text
| RUN_LATCH | /TRIP_ACTIVE |
|----[ ]---------[/]----------------------------( ) MTR_START_CMD |
```

Artinya:

```text
MTR_START_CMD = RUN_LATCH AND NOT TRIP_ACTIVE
```

---

✓ Network 5 — Trip Logic

✓ Tujuan

Membentuk protective stop.

✓ Network 5.1 — Trip active

```text
| OL_TRIP |
|----[ ]-------------------------------------------|
|                                                   |
| SUCT_PRESS_LOWLOW |                               |
|----[ ]-------------------------------------------|----( ) TRIP_ACTIVE |
|                                                   |
| RUN_LATCH | /MCC_HEALTHY |                        |
|----[ ]--------[/]--------------------------------|
```

Artinya:

```text
TRIP_ACTIVE =
OL_TRIP
OR SUCT_PRESS_LOWLOW
OR (RUN_LATCH AND NOT MCC_HEALTHY)
```

✓ Network 5.2 — Trip output

```text
| TRIP_ACTIVE |
|----[ ]--------------------------------------------( ) TRIP_P101 |
```

---

✓ Network 6 — Alarm Logic

✓ Tujuan

Membentuk alarm operator.

✓ Network 6.1 — Alarm active

```text
| SUCT_PRESS_LOW |
|----[ ]--------------------------------------------|
|                                                    |
| START_FAIL_ACTIVE |                                |
|----[ ]--------------------------------------------|----( ) ALARM_ACTIVE |
|                                                    |
| CMD_START_REQ | /PERMISSIVE_OK |                   |
|----[ ]------------[/]-----------------------------|
```

Artinya:

```text
ALARM_ACTIVE =
SUCT_PRESS_LOW
OR START_FAIL_ACTIVE
OR (CMD_START_REQ AND NOT PERMISSIVE_OK)
```

✓ Network 6.2 — Alarm output

```text
| ALARM_ACTIVE |
|----[ ]----------------------------------------------( ) ALM_P101 |
```

---

✓ Network 7 — Start Failure Detection

✓ Tujuan

Mendeteksi motor gagal running setelah start command diberikan.

✓ Network 7.1 — TON start fail

Di Siemens S7, `TON` dipasang sebagai instruction block.

Kondisi input timer:

```text
| MTR_START_CMD | /MOTOR_FEEDBACK_ON | /TRIP_ACTIVE |
|----[ ]--------------[/]----------------[/]----------------( TON ) |
|                                                            PT = StartFailDelay
```

Konsepnya:

```text
TON.IN =
MTR_START_CMD
AND NOT MOTOR_FEEDBACK_ON
AND NOT TRIP_ACTIVE
```

✓ Network 7.2 — Start fail active

```text
| TON.Q |
|----[ ]------------------------------------( ) START_FAIL_ACTIVE |
```

✓ Network 7.3 — Start fail alarm output

```text
| START_FAIL_ACTIVE |
|----[ ]--------------------------------------( ) START_FAIL_ALM |
```

✓ Network 7.4 — Reset run latch saat start fail

Reset sudah dilakukan di Network 4.2:

```text
| START_FAIL_ACTIVE |
|----[ ]--------------------------------------------(R) RUN_LATCH |
```

Jadi tidak perlu logika baru.

---

✓ Network 8 — Sequence Interface

✓ Tujuan

Menghubungkan pump ke logic sequence tanpa mengubah logic inti.

✓ Network 8.1 — Sequence ready

```text
| PERMISSIVE_OK | /TRIP_ACTIVE |
|----[ ]-------------[/]----------------------------( ) SEQ_READY |
```

✓ Network 8.2 — Sequence running

```text
| MOTOR_FEEDBACK_ON |
|----[ ]-----------------------------------------( ) SEQ_RUNNING |
```

✓ Network 8.3 — Sequence trip

```text
| TRIP_ACTIVE |
|----[ ]-------------------------------------------|
|                                                   |----( ) SEQ_TRIP |
| START_FAIL_ACTIVE |                               |
|----[ ]-------------------------------------------|
```

Artinya:

```text
SEQ_TRIP =
TRIP_ACTIVE
OR START_FAIL_ACTIVE
```

---

## 5. Ringkasan Logic Final

✓ Start path

```text
PB_START / REMOTE_START_REQ / SEQ_START_REQ
→ CMD_START_REQ
→ cek PERMISSIVE_OK
→ set RUN_LATCH
→ MTR_START_CMD
```

✓ Stop path

```text
PB_STOP atau TRIP_ACTIVE
→ CMD_STOP_REQ
→ reset RUN_LATCH
→ MTR_START_CMD off
```

✓ Protective path

```text
OL_TRIP
atau SUCT_PRESS_LOWLOW
atau MCC gagal saat running
→ TRIP_ACTIVE
→ TRIP_P101
→ RUN_LATCH reset
→ motor stop
```

✓ Alarm path

```text
SUCT_PRESS_LOW
atau START_FAIL_ACTIVE
atau start request saat permissive gagal
→ ALARM_ACTIVE
→ ALM_P101
```

✓ Start fail path

```text
MTR_START_CMD on
dan MTR_RUN_FB belum muncul
dalam waktu StartFailDelay
→ START_FAIL_ACTIVE
→ START_FAIL_ALM
→ reset RUN_LATCH
```

✓ Sequence path

```text
PERMISSIVE_OK dan tidak trip → SEQ_READY
MOTOR_FEEDBACK_ON → SEQ_RUNNING
TRIP_ACTIVE atau START_FAIL_ACTIVE → SEQ_TRIP
```

---

## 6. Struktur Siemens S7 yang Direkomendasikan di FB101

Urutan network di TIA Portal sebaiknya tetap seperti ini:

✓ Network 1

Input Conditioning

✓ Network 2

Command Handling

✓ Network 3

Permissive Logic

✓ Network 4

Start/Stop Latch Logic

✓ Network 5

Trip Logic

✓ Network 6

Alarm Logic

✓ Network 7

Start Failure Detection

✓ Network 8

Sequence Interface

Urutan ini penting karena:

- status input dibentuk lebih dulu
- request command dibentuk setelah itu
- permissive dihitung sebelum latch
- trip dan alarm dibentuk setelah run logic tersedia
- sequence interface mengambil status akhir

---

## 7. Mapping ke Artikel 01–10

✓ Artikel 01 — PLC Scan Cycle & Signal Flow

Ambil:

- OB1 call FB101
- Network 1
- aliran `I -> FB101 -> Q`

✓ Artikel 02 — Basic Ladder Logic

Ambil:

- Network 2
- Network 4

✓ Artikel 03 — Permissive Logic

Ambil:

- Network 1 status relevan
- Network 3

✓ Artikel 04 — Interlock & Trip Logic

Ambil:

- Network 5

✓ Artikel 05 — Alarm vs Trip

Ambil:

- Network 1 pressure threshold
- Network 5
- Network 6

✓ Artikel 06 — Start Failure Detection

Ambil:

- Network 4
- Network 7

✓ Artikel 07 — PLC Program Structure

Ambil:

- OB1
- FB101
- DB101
- urutan network

✓ Artikel 08 — Equipment Control Module

Ambil:

- FB101 sebagai reusable pump module
- DB101 sebagai instance

✓ Artikel 09 — Sequence Control

Ambil:

- Network 8
- hubungan dengan Network 2 dan 4

✓ Artikel 10 — Shutdown Logic & Cause Effect

Ambil:

- Network 5
- Network 6
- bagian response logic dari status trip/alarm

---

## 8. Kesimpulan

Dengan desain ini, sekarang Anda sudah memiliki **program ladder tunggal** untuk serial:

```text
OB1
 └── FB101 Pump_Control
      ├── N1 Input Conditioning
      ├── N2 Command Handling
      ├── N3 Permissive Logic
      ├── N4 Start/Stop Latch
      ├── N5 Trip Logic
      ├── N6 Alarm Logic
      ├── N7 Start Failure Detection
      └── N8 Sequence Interface
```

Artinya seluruh serial 01–10 sekarang bisa ditulis dengan basis yang sama:

- sistem fisik sama
- tag sama
- ladder sama
- architecture sama
- yang berubah hanya subset pembahasannya
