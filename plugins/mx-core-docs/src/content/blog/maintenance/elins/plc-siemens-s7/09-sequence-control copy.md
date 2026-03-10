---
title: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'sequence-control',
    'industrial-automation',
    'pump-control',
    'process-sequence',
    'ladder-diagram',
    'process-safety',
  ]
draft: false
summary: Artikel ini membahas Sequence Control pada PLC untuk mengatur urutan operasi beberapa equipment dalam sistem proses. Menggunakan contoh pump system dengan suction dan discharge valve, artikel menjelaskan bagaimana PLC memastikan setiap equipment beroperasi dalam urutan yang benar. Tanpa sequence control, pump dapat start ketika valve masih tertutup yang menyebabkan pressure surge atau hydraulic shock pada piping. PLC mengimplementasikan sequence melalui step logic di mana setiap langkah memiliki aksi dan kondisi transisi. Pendekatan ini memastikan operasi sistem berlangsung stabil, melindungi equipment dari stress mekanik, serta mempermudah troubleshooting ketika urutan operasi tidak berjalan sesuai desain.
---

# **_Artikel 9: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses_**

---

- [**_Artikel 9: Sequence Control — Mengatur Urutan Operasi Equipment dalam Sistem Proses_**](#artikel-9-sequence-control--mengatur-urutan-operasi-equipment-dalam-sistem-proses)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Pump start ketika valve belum terbuka](#pump-start-ketika-valve-belum-terbuka)
    - [Discharge valve terbuka terlalu cepat](#discharge-valve-terbuka-terlalu-cepat)
    - [Pump stop tanpa urutan shutdown](#pump-stop-tanpa-urutan-shutdown)
  - [3. Physical Mechanism](#3-physical-mechanism)
  - [4. Control Objective](#4-control-objective)
    - [1. Mengatur urutan operasi equipment](#1-mengatur-urutan-operasi-equipment)
    - [2. Mencegah shock mekanik dan hidraulik](#2-mencegah-shock-mekanik-dan-hidraulik)
    - [3. Menjaga stabilitas proses](#3-menjaga-stabilitas-proses)
    - [4. Mempermudah otomatisasi sistem](#4-mempermudah-otomatisasi-sistem)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Arsitektur Sinyal Sequence Control](#arsitektur-sinyal-sequence-control)
    - [Mapping Sinyal Sequence Pump](#mapping-sinyal-sequence-pump)
    - [Operator Command Signal](#operator-command-signal)
    - [Valve Position Feedback](#valve-position-feedback)
    - [Motor Running Feedback](#motor-running-feedback)
    - [Control Output Signal](#control-output-signal)
    - [Hubungan Signal dengan Step Sequence](#hubungan-signal-dengan-step-sequence)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Struktur Sequence Control](#struktur-sequence-control)
    - [Step 1 — Open Suction Valve](#step-1--open-suction-valve)
    - [Step 2 — Start Pump](#step-2--start-pump)
    - [Step 3 — Open Discharge Valve](#step-3--open-discharge-valve)
    - [Struktur Ladder Sequence Logic](#struktur-ladder-sequence-logic)
    - [Karakteristik Sequence Control](#karakteristik-sequence-control)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Normal Start](#scenario-1--normal-start)
    - [Scenario 2 — Valve Fail to Open](#scenario-2--valve-fail-to-open)
    - [Scenario 3 — Pump Fail to Start](#scenario-3--pump-fail-to-start)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Identifikasi Step Aktif](#step-1--identifikasi-step-aktif)
    - [Step 2 — Periksa Kondisi Transisi](#step-2--periksa-kondisi-transisi)
    - [Step 3 — Periksa Instrument Lapangan](#step-3--periksa-instrument-lapangan)
    - [Step 4 — Periksa Output PLC](#step-4--periksa-output-plc)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Dalam banyak sistem proses industri, beberapa equipment tidak dapat dijalankan secara bersamaan tanpa urutan tertentu. Operasi harus mengikuti **sequence yang dirancang berdasarkan perilaku fisik sistem proses**.

Contoh sederhana adalah **pump system dengan valve control**.

Komponen utama sistem:

- **Suction valve**
- **Pump**
- **Discharge valve**
- **Motor starter MCC**
- **PLC**

Sistem ini sering ditemukan pada:

- cooling water system
- transfer pump system
- chemical dosing pump.

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen           |
| --------------- | ------------------ |
| Mechanical      | pump & piping      |
| Electrical      | motor starter      |
| Instrumentation | valve limit switch |
| Control         | PLC sequence logic |

Jika pump dijalankan tanpa urutan yang benar, sistem fluida dapat mengalami kondisi tidak stabil.

Contoh urutan yang tidak benar:

```text id="3j6h8b"
pump start
↓
discharge valve masih tertutup
↓
pressure meningkat
```

Kondisi ini dapat menyebabkan **tekanan mendadak dalam sistem piping**.

Karena itu PLC digunakan untuk mengatur **urutan operasi equipment** melalui sequence control.

---

## 2. Operational Problem

Jika sistem tidak memiliki sequence control, beberapa masalah operasi dapat terjadi.

---

### Pump start ketika valve belum terbuka

Jika suction valve belum terbuka:

```text id="grd4mi"
pump start
↓
fluida tidak masuk ke pump
```

Akibatnya pump dapat mengalami:

- cavitation
- vibration
- kerusakan impeller.

---

### Discharge valve terbuka terlalu cepat

Jika discharge valve dibuka sebelum pump stabil:

```text id="i7g08t"
pump start
↓
discharge valve langsung terbuka
↓
flow surge
```

Hal ini dapat menyebabkan **tekanan fluktuatif dalam piping system**.

---

### Pump stop tanpa urutan shutdown

Jika pump berhenti secara tiba-tiba tanpa mengatur valve:

```text id="f2d0om"
pump stop
↓
discharge valve tetap terbuka
↓
reverse flow
```

Hal ini dapat merusak pump atau sistem downstream.

---

Masalah-masalah ini dapat dihindari dengan **sequence control yang mengatur urutan operasi equipment secara otomatis**.

---

## 3. Physical Mechanism

Sequence control dibuat berdasarkan **mekanisme fisik aliran fluida dalam sistem pump**.

Contoh kegagalan jika pump start tanpa urutan yang benar.

```text id="r9y8w1"
pump start
↓
discharge valve tertutup
↓
tekanan meningkat cepat
↓
hydraulic shock
↓
stress pada piping dan flange
↓
potensi kebocoran
```

Hydraulic shock atau **water hammer** dapat merusak:

- valve
- flange connection
- gasket
- piping support.

---

✔ Mekanisme Water Hammer pada Pump System

![Image](https://www.researchgate.net/publication/259465976/figure/fig2/AS%3A392620858724359%401470619515856/Simple-pump-reservoir-system-combined-with-closed-surge-tank.png)

Water hammer terjadi ketika fluida dipaksa berhenti atau berubah arah secara mendadak.

Dalam sistem pump:

```text id="dhlj1q"
pump start
↓
flow tidak dapat keluar
↓
pressure wave terbentuk
↓
shock pada piping
```

Untuk menghindari kondisi ini, sequence operasi biasanya dirancang sebagai berikut:

```text id="x94y2q"
open suction valve
↓
start pump
↓
open discharge valve
```

Dengan urutan ini fluida dapat mulai mengalir sebelum tekanan meningkat secara signifikan.

---

## 4. Control Objective

Sequence control digunakan untuk memastikan bahwa **equipment beroperasi sesuai urutan proses yang aman**.

Beberapa tujuan utama sequence control adalah:

---

### 1. Mengatur urutan operasi equipment

PLC memastikan bahwa setiap equipment berjalan sesuai **step yang telah ditentukan**.

Contoh sequence:

```text id="g8g0ve"
Step 1
open suction valve

Step 2
start pump

Step 3
open discharge valve
```

---

### 2. Mencegah shock mekanik dan hidraulik

Dengan urutan operasi yang benar, sistem dapat menghindari:

- pressure surge
- water hammer
- mechanical stress pada piping.

---

### 3. Menjaga stabilitas proses

Sequence control memungkinkan proses mencapai kondisi stabil sebelum melanjutkan ke tahap berikutnya.

---

### 4. Mempermudah otomatisasi sistem

Sequence control banyak digunakan pada:

- pump system
- compressor auxiliary system
- boiler start-up
- conveyor system.

Dengan sequence control, PLC dapat mengotomatisasi proses yang sebelumnya dilakukan secara manual oleh operator.

---

## 5. Instrument and Signal Mapping

Agar PLC dapat menjalankan **sequence control**, PLC harus menerima informasi status dari equipment dan instrument lapangan. Informasi ini digunakan untuk menentukan:

- **aksi pada setiap step**
- **kondisi transisi ke step berikutnya**

Pada pump sequence system, PLC memonitor status valve, motor, dan command operator untuk menentukan urutan operasi.

---

### Arsitektur Sinyal Sequence Control

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFiG2W0B134Kg/feedshare-shrink_1280/B4DZfvCqttGkAo-/0/1752062145844?e=2147483647&t=S1_VZjM-3pt__7PndhCmK27uu9ZFRJtcDmge3mXWDUA&v=beta)

PLC menerima sinyal dari tiga kelompok utama:

1. **Operator command**
2. **Equipment feedback**
3. **Control output**

Sinyal ini membentuk **loop kontrol sequence** yang memungkinkan PLC mengetahui kapan suatu langkah selesai dan kapan langkah berikutnya dapat dimulai.

---

### Mapping Sinyal Sequence Pump

Contoh mapping sinyal untuk sistem pump dengan valve control.

| Signal             | Source                | PLC Type      | Function                 |
| ------------------ | --------------------- | ------------- | ------------------------ |
| START_CMD          | operator / auto logic | DI / internal | start sequence           |
| SUCTION_VALVE_OPEN | valve limit switch    | DI            | suction valve position   |
| DISCH_VALVE_OPEN   | valve limit switch    | DI            | discharge valve position |
| VALVE_OPEN_CMD     | PLC output            | DO            | open valve command       |
| MOTOR_CMD          | PLC output            | DO            | motor start command      |
| RUN_FB             | MCC auxiliary contact | DI            | motor running feedback   |

Mapping ini memungkinkan PLC mengetahui **status setiap equipment dalam sistem**.

---

### Operator Command Signal

Sequence biasanya dimulai oleh **perintah operator** atau oleh **logic otomatis dari sistem proses**.

Contoh:

```text
START_CMD = TRUE
```

Ketika START_CMD aktif, PLC mengaktifkan **step pertama sequence**.

---

### Valve Position Feedback

Valve position dipantau menggunakan **limit switch** yang terpasang pada actuator valve.

Contoh sinyal:

```text
SUCTION_VALVE_OPEN
DISCH_VALVE_OPEN
```

Sinyal ini menunjukkan apakah valve sudah mencapai posisi **fully open**.

PLC menggunakan sinyal ini sebagai **kondisi transisi antar step**.

Contoh:

```text
SUCTION_VALVE_OPEN = TRUE
↓
Step 2 dapat dimulai
```

---

### Motor Running Feedback

Setelah PLC memberikan command start motor, PLC harus memverifikasi bahwa motor benar-benar running.

Sinyal feedback biasanya berasal dari **auxiliary contact MCC**.

Contoh:

```text
RUN_FB
```

Sinyal ini digunakan untuk memastikan bahwa pump telah beroperasi sebelum melanjutkan sequence.

---

### Control Output Signal

PLC mengendalikan equipment melalui **output module**.

Contoh output pada sistem ini:

```text
VALVE_OPEN_CMD
MOTOR_CMD
```

Aliran command:

```text
PLC output
↓
valve actuator / MCC contactor
↓
equipment bergerak
```

Output ini merupakan **aksi pada setiap step sequence**.

---

### Hubungan Signal dengan Step Sequence

Dalam sequence control, setiap step memiliki dua elemen:

1️⃣ **Action (output command)**
2️⃣ **Transition condition (feedback signal)**

Contoh implementasi sederhana:

```text
STEP_1
Action: VALVE_OPEN_CMD
Transition: SUCTION_VALVE_OPEN
```

```text
STEP_2
Action: MOTOR_CMD
Transition: RUN_FB
```

```text
STEP_3
Action: DISCH_VALVE_CMD
Transition: DISCH_VALVE_OPEN
```

Dengan struktur ini PLC dapat mengontrol urutan operasi secara sistematis.

---

## 6. Ladder Logic Implementation

### Struktur Sequence Control

Sequence control pada PLC biasanya dibangun menggunakan **step logic**.
Setiap **step** merepresentasikan satu kondisi operasi equipment.

Struktur dasar sequence:

```text
STEP_1
↓
STEP_2
↓
STEP_3
```

Setiap step memiliki dua elemen utama:

1. **Action** → perintah ke equipment
2. **Transition Condition** → syarat untuk berpindah ke step berikutnya

PLC akan mempertahankan suatu step sampai **kondisi transisi terpenuhi**.

---

✔ Struktur Ladder Sequence Control

![Image](https://cdn.automationforum.co/uploads/2023/09/tia-tank-2.jpg)

Sequence biasanya diimplementasikan menggunakan **memory bit** untuk setiap step.

Contoh:

```text
STEP_1
STEP_2
STEP_3
```

Hanya satu step yang aktif pada satu waktu.

---

### Step 1 — Open Suction Valve

Sequence dimulai ketika operator memberikan perintah start.

```text
START_CMD = TRUE
```

PLC mengaktifkan step pertama.

```text
STEP_1 = TRUE
```

Action pada Step 1:

```text
VALVE_OPEN_CMD = TRUE
```

PLC memberikan perintah untuk membuka suction valve.

Transisi ke step berikutnya terjadi ketika valve sudah terbuka.

```text
SUCTION_VALVE_OPEN = TRUE
↓
STEP_2 aktif
```

Selama valve belum terbuka, PLC tetap berada di **Step 1**.

---

### Step 2 — Start Pump

Setelah suction valve terbuka, PLC mengaktifkan step berikutnya.

```text
STEP_2 = TRUE
```

Action pada step ini:

```text
MOTOR_CMD = TRUE
```

PLC mengirim command ke **MCC motor starter**.

PLC kemudian menunggu konfirmasi bahwa motor sudah running.

```text
RUN_FB = TRUE
```

Jika feedback muncul:

```text
STEP_3 aktif
```

Jika tidak muncul, PLC tetap berada di Step 2.

---

### Step 3 — Open Discharge Valve

Pada step ini pump sudah running sehingga fluida mulai mengalir.

PLC kemudian membuka discharge valve.

```text
DISCH_VALVE_CMD = TRUE
```

PLC menunggu konfirmasi valve terbuka.

```text
DISCH_VALVE_OPEN = TRUE
```

Setelah kondisi ini terpenuhi, sequence selesai dan sistem masuk ke kondisi **normal operation**.

---

### Struktur Ladder Sequence Logic

Contoh logika sederhana sequence:

```text
STEP_1 =
START_CMD
AND NOT STEP_2
```

```text
STEP_2 =
STEP_1
AND SUCTION_VALVE_OPEN
```

```text
STEP_3 =
STEP_2
AND RUN_FB
```

Dengan struktur ini PLC selalu mengetahui **step mana yang sedang aktif**.

---

### Karakteristik Sequence Control

Sequence control memiliki beberapa karakteristik penting:

1. **step-based logic**
2. **transisi berdasarkan feedback instrument**
3. **hanya satu step aktif pada satu waktu**

Struktur ini memungkinkan PLC mengontrol **operasi equipment yang kompleks secara terurut**.

---

## 7. System Response

Beberapa skenario operasi sequence.

---

### Scenario 1 — Normal Start

```text id="w9qpna"
START_CMD = TRUE
↓
Step 1: suction valve open
↓
Step 2: pump start
↓
Step 3: discharge valve open
```

Sistem masuk kondisi **running**.

---

### Scenario 2 — Valve Fail to Open

```text id="shxfo4"
VALVE_OPEN_CMD = TRUE
SUCTION_VALVE_OPEN = FALSE
```

PLC tetap berada di **Step 1**.

Pump tidak akan start.

---

### Scenario 3 — Pump Fail to Start

```text id="pxaf61"
MOTOR_CMD = TRUE
RUN_FB = FALSE
```

PLC tetap di **Step 2** dan menghasilkan **start fail alarm**.

---

## 8. Troubleshooting Guide

Ketika **sequence control tidak berjalan sesuai desain**, engineer harus menentukan **step mana yang sedang aktif dan kondisi apa yang menghambat transisi ke step berikutnya**.

Karena sequence control berbasis **step logic**, troubleshooting selalu mengikuti urutan:

```text
STEP aktif
↓
transition condition
↓
feedback instrument
↓
output command
```

Pendekatan ini memungkinkan engineer menemukan penyebab masalah secara sistematis tanpa harus memeriksa seluruh program PLC.

---

✔ Alur Diagnosa Sequence Control

![Image](https://cdn.automationforum.co/uploads/2025/05/Step-by-Step-Procedure-to-Troubleshooting-Solenoid-Valves-in-PLC-Digital-Output-Loops-1-scaled.jpg)

Engineer harus memverifikasi empat hal utama:

1. step yang sedang aktif
2. kondisi transisi step
3. status instrument
4. output command PLC

---

### Step 1 — Identifikasi Step Aktif

Langkah pertama adalah menentukan **step mana yang sedang aktif di PLC**.

Contoh status step:

```text
STEP_1 = TRUE
STEP_2 = FALSE
STEP_3 = FALSE
```

Artinya sistem masih berada pada **Step 1**.

Engineer kemudian mengetahui bahwa PLC sedang menunggu kondisi tertentu untuk melanjutkan sequence.

Contoh kondisi transisi Step 1:

```text
SUCTION_VALVE_OPEN
```

Jika kondisi ini belum terpenuhi maka sequence tidak akan berpindah ke Step 2.

---

### Step 2 — Periksa Kondisi Transisi

Setiap step memiliki **transition condition** yang harus terpenuhi sebelum melanjutkan ke step berikutnya.

Contoh:

```text
STEP_1 → STEP_2
condition = SUCTION_VALVE_OPEN
```

Jika transisi tidak terjadi maka engineer harus memeriksa status sinyal tersebut.

Contoh kondisi:

```text
SUCTION_VALVE_OPEN = FALSE
```

Sequence tidak akan melanjutkan ke Step 2.

---

### Step 3 — Periksa Instrument Lapangan

Jika kondisi transisi tidak terpenuhi, engineer harus memverifikasi **instrument lapangan**.

Contoh instrument yang mempengaruhi sequence:

- valve limit switch
- motor running feedback
- pressure switch.

Kemungkinan masalah:

- limit switch rusak
- valve actuator tidak bergerak
- wiring instrument bermasalah.

---

### Step 4 — Periksa Output PLC

Jika instrument normal tetapi sequence tidak bergerak, periksa **output PLC**.

Contoh:

```text
VALVE_OPEN_CMD
MOTOR_CMD
```

Engineer harus memastikan bahwa PLC benar-benar mengirim command ke equipment.

Jika output aktif tetapi equipment tidak bergerak maka masalah kemungkinan berada pada:

- actuator valve
- MCC motor starter
- power supply equipment.

---

### Kesimpulan Teknis

Sequence control memungkinkan PLC mengatur **urutan operasi beberapa equipment dalam sistem proses**.

Struktur sequence terdiri dari:

```text
STEP
↓
ACTION
↓
TRANSITION CONDITION
```

Ketika troubleshooting sequence system, engineer harus mengikuti urutan diagnosa:

```text
STEP aktif
↓
transition condition
↓
instrument feedback
↓
PLC output
```

Pendekatan ini membantu engineer dengan cepat menentukan **mengapa suatu step tidak dapat berpindah ke langkah berikutnya**, sehingga masalah sistem kontrol dapat diselesaikan secara efisien.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
