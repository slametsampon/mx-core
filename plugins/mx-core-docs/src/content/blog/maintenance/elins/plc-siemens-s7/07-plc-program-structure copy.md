---
title: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'plc-program-structure',
    'organization-block',
    'function-block',
    'data-block',
    'industrial-automation',
    'ladder-diagram',
  ]
draft: false
summary: Artikel ini menjelaskan **struktur program PLC Siemens (OB, FB, DB)** yang digunakan untuk membangun sistem kontrol yang modular dan mudah dipelihara. Pada sistem industri dengan banyak equipment seperti pump, compressor, dan fan, menulis seluruh logika di satu program menyebabkan ladder sulit dibaca dan troubleshooting menjadi lambat. Siemens S7 menggunakan pendekatan modular - **OB (Organization Block)** sebagai entry point scan cycle, **FB (Function Block)** sebagai logic control equipment, dan **DB (Data Block)** sebagai penyimpan data dan status operasi. Dengan struktur ini setiap equipment memiliki blok kontrol sendiri sehingga program menjadi lebih rapi, scalable, dan lebih mudah dianalisis ketika terjadi trip atau kegagalan operasi.
---

# **_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**

---

- [**_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**](#artikel-7-plc-program-structure-ob-fb-db--menyusun-program-control-yang-terstruktur)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Semua logika berada dalam satu block](#semua-logika-berada-dalam-satu-block)
    - [Ladder menjadi sangat panjang](#ladder-menjadi-sangat-panjang)
    - [Troubleshooting menjadi lambat](#troubleshooting-menjadi-lambat)
    - [Risiko kesalahan saat modifikasi program](#risiko-kesalahan-saat-modifikasi-program)
  - [3. Physical Mechanism](#3-physical-mechanism)
  - [4. Control Objective](#4-control-objective)
    - [1. Memisahkan logika berdasarkan equipment](#1-memisahkan-logika-berdasarkan-equipment)
    - [2. Membuat program mudah dibaca](#2-membuat-program-mudah-dibaca)
    - [3. Mempermudah maintenance dan troubleshooting](#3-mempermudah-maintenance-dan-troubleshooting)
    - [4. Menggunakan logic yang sama untuk banyak equipment](#4-menggunakan-logic-yang-sama-untuk-banyak-equipment)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Input Signal Processing](#input-signal-processing)
    - [Equipment Control Logic](#equipment-control-logic)
    - [Output Command](#output-command)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [OB (Organization Block)](#ob-organization-block)
    - [FB (Function Block)](#fb-function-block)
    - [DB (Data Block)](#db-data-block)
  - [7. System Response](#7-system-response)
    - [Step 1 — PLC Menjalankan OB1](#step-1--plc-menjalankan-ob1)
    - [Step 2 — OB1 Memanggil FB Equipment](#step-2--ob1-memanggil-fb-equipment)
    - [Step 3 — FB Mengakses Data pada Instance DB](#step-3--fb-mengakses-data-pada-instance-db)
    - [Step 4 — PLC Menghasilkan Output Command](#step-4--plc-menghasilkan-output-command)
    - [Eksekusi Berulang pada Setiap Scan Cycle](#eksekusi-berulang-pada-setiap-scan-cycle)
    - [Keuntungan Struktur Modular](#keuntungan-struktur-modular)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Identifikasi Equipment Block](#step-1--identifikasi-equipment-block)
    - [Step 2 — Periksa Instance DB](#step-2--periksa-instance-db)
    - [Step 3 — Monitor Logic FB](#step-3--monitor-logic-fb)
    - [Step 4 — Periksa Pemanggilan Block di OB1](#step-4--periksa-pemanggilan-block-di-ob1)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini tetap menggunakan **motor–pump system** sebagai contoh implementasi struktur program PLC.

Pada plant industri, satu PLC biasanya mengendalikan **banyak equipment sekaligus**, misalnya:

- pump
- compressor
- fan
- conveyor
- valve system.

Setiap equipment memiliki logika kontrol sendiri seperti:

- permissive logic
- start–stop control
- trip protection
- alarm monitoring.

Komponen sistem yang dikontrol:

- **Pump** — equipment mekanik yang memindahkan fluida
- **Motor listrik** — penggerak pump
- **MCC motor starter** — sistem electrical untuk menghidupkan motor
- **Instrument permissive** — sensor proses
- **PLC Siemens S7** — controller yang menjalankan program kontrol

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen                     |
| --------------- | ---------------------------- |
| Mechanical      | pump & rotating equipment    |
| Electrical      | motor starter MCC            |
| Instrumentation | pressure switch, valve limit |
| Control         | PLC program blocks           |

Pada sistem kecil, engineer sering menulis semua logika langsung di **OB1**.

Namun pada plant besar yang memiliki ratusan equipment, pendekatan ini menyebabkan:

- ladder sangat panjang
- logika sulit dilacak
- risiko kesalahan saat modifikasi program meningkat.

Karena itu Siemens S7 menggunakan **struktur program modular berbasis block**.

---

## 2. Operational Problem

Program PLC yang tidak terstruktur biasanya memiliki karakteristik berikut.

### Semua logika berada dalam satu block

Contoh:

```text
OB1
↓
ratusan rung ladder
```

Semua logic equipment bercampur dalam satu program.

---

### Ladder menjadi sangat panjang

Ketika jumlah equipment meningkat:

```text
Pump logic
Compressor logic
Fan logic
Valve logic
```

semua logic bercampur di satu tempat.

Akibatnya engineer harus mencari logic di **ratusan atau ribuan rung ladder**.

---

### Troubleshooting menjadi lambat

Jika pump trip, engineer harus mencari logika berikut:

- permissive pump
- trip pump
- start command
- alarm logic.

Jika semua logic bercampur, proses troubleshooting menjadi sangat lama.

---

### Risiko kesalahan saat modifikasi program

Ketika engineer mengubah satu bagian program, perubahan tersebut dapat mempengaruhi equipment lain.

Contoh:

```text
modifikasi rung pump
↓
secara tidak sengaja mempengaruhi logic fan
```

Hal ini berisiko menyebabkan **shutdown proses yang tidak diinginkan**.

---

Masalah ini dapat dihindari dengan menggunakan **struktur program modular**.

---

## 3. Physical Mechanism

Walaupun PLC merupakan sistem digital, struktur programnya tetap mengikuti **alur kontrol sistem fisik di plant**.

Alur kontrol equipment biasanya mengikuti urutan berikut.

```text
field signal
↓
equipment control logic
↓
command output
```

Field signal berasal dari:

- instrument proses
- feedback equipment
- perintah operator.

Signal ini diproses oleh **logic control equipment** sebelum menghasilkan command output.

---

✔ Hubungan Program PLC dengan Sistem Kontrol

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFPiJmhmC2v9Q/feedshare-shrink_1280/B4DZdnzmRNGYAo-/0/1749793284504?e=2147483647&t=zzhnAlL4m1kuTZsESRsJpvWdzQVh6dkurC_KVlDxOCk&v=beta)

![Image](https://cdn.prod.website-files.com/63dea6cb95e58cb38bb98cbd/6415d9e336dcd34cc5dca413_627d1f644f35777f76234812_WeYXN9hfu4-M-F87iWSg_edzYRhR2d5nScXLHXhtRCsQDkg-mdLE3X2_eCtV5WtfQ_LXankolDEQOGy2tqJOVvq9IriuGWq7zdEPABZIVII00WN_A6X370AlUroMQ82uHev5_0Ot-_BTSJ8gjg.png)

Dalam sistem PLC Siemens, struktur program mengikuti pola modular berikut:

```text
OB (Program execution)
↓
FB (Equipment control logic)
↓
DB (Equipment data)
```

Struktur ini memungkinkan setiap equipment memiliki **logic control sendiri**.

---

## 4. Control Objective

Tujuan utama struktur program PLC modular adalah meningkatkan **reliability dan maintainability sistem kontrol**.

Beberapa tujuan utama adalah sebagai berikut.

---

### 1. Memisahkan logika berdasarkan equipment

Setiap equipment memiliki **block program sendiri**.

Contoh:

```text
Pump_Control_FB
Compressor_Control_FB
Fan_Control_FB
```

Dengan cara ini logika setiap equipment tidak bercampur.

---

### 2. Membuat program mudah dibaca

Engineer dapat langsung menemukan logic equipment tanpa harus mencari di seluruh ladder.

Contoh struktur program:

```text
OB1
↓
Pump_Control_FB
```

Engineer cukup membuka **FB pump** untuk melihat semua logika pump.

---

### 3. Mempermudah maintenance dan troubleshooting

Jika pump trip, engineer langsung memonitor block:

```text
Pump_Control_FB
```

tanpa harus mencari di seluruh program PLC.

---

### 4. Menggunakan logic yang sama untuk banyak equipment

FB dapat digunakan kembali untuk equipment yang memiliki fungsi sama.

Contoh:

```text
Pump_A_Control_FB
Pump_B_Control_FB
Pump_C_Control_FB
```

Semua pump menggunakan **logic yang sama**, tetapi memiliki data berbeda.

---

## 5. Instrument and Signal Mapping

Dalam struktur program modular PLC, semua sinyal dari field tidak langsung diproses di **OB1**.
Sebaliknya, sinyal tersebut diproses oleh **equipment control block (FB)** yang khusus menangani satu equipment.

Pada contoh ini kita menggunakan **Pump_Control_FB**.

Prinsip pemetaan sinyal adalah:

```text
Field Signal
↓
Input Address PLC
↓
Pump_Control_FB
↓
Output Command
```

Pendekatan ini memastikan bahwa seluruh logika pump berada dalam **satu block program**.

---

✔ Arsitektur Sinyal Pump Control Module

![Image](https://media.licdn.com/dms/image/v2/D4D22AQGgPnLOG2qS8g/feedshare-shrink_1280/B4DZewHCmuH4Aw-/0/1751006327711?e=2147483647&t=QvXfsiratx-Cpmq85MKgPKv_IkpJqP75Me6DQw3QDVg&v=beta)

Mapping sinyal untuk pump control module dapat digambarkan sebagai berikut.

| Signal           | Source                | PLC Type | Function               |
| ---------------- | --------------------- | -------- | ---------------------- |
| START_PB         | operator panel        | DI       | start command          |
| STOP_PB          | operator panel        | DI       | stop command           |
| SUCTION_PRESS_OK | pressure switch       | DI       | permissive condition   |
| LOW_PRESS_TRIP   | pressure switch       | DI       | trip protection        |
| MOTOR_FB         | MCC auxiliary contact | DI       | motor running feedback |
| MOTOR_CMD        | PLC output            | DO       | motor start command    |

Semua sinyal input diproses oleh **Pump_Control_FB**.

---

### Input Signal Processing

Input signal berasal dari field device seperti:

- push button
- pressure switch
- limit switch
- motor feedback contact.

Contoh aliran sinyal:

```text
pressure switch
↓
PLC digital input module
↓
SUCTION_PRESS_OK
↓
Pump_Control_FB
```

Signal ini digunakan untuk membangun beberapa logika seperti:

- permissive logic
- trip protection
- alarm monitoring.

---

### Equipment Control Logic

Semua sinyal yang telah dipetakan akan diproses oleh **equipment control block**.

Contoh logika dalam block:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
AND SUCTION_PRESS_OK
AND NOT LOW_PRESS_TRIP
```

FB kemudian menentukan apakah motor harus berjalan atau berhenti.

---

### Output Command

Setelah logika dievaluasi, PLC menghasilkan command output.

Contoh:

```text
RUN_CMD = TRUE
↓
MOTOR_CMD = TRUE
```

Output ini mengaktifkan **motor starter di MCC**.

Aliran command:

```text
PLC output module
↓
MCC contactor coil
↓
motor energize
↓
pump beroperasi
```

---

## 6. Ladder Logic Implementation

Setelah sinyal dipetakan, langkah berikutnya adalah membangun **struktur program PLC Siemens** menggunakan block modular.

---

✔ Struktur Program PLC Siemens

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFPiJmhmC2v9Q/feedshare-shrink_1280/B4DZdnzmRNGYAo-/0/1749793284504?e=2147483647&t=zzhnAlL4m1kuTZsESRsJpvWdzQVh6dkurC_KVlDxOCk&v=beta)

Program PLC Siemens biasanya terdiri dari tiga jenis block utama.

---

### OB (Organization Block)

OB adalah **program utama yang dijalankan oleh PLC**.

Contoh:

```text
OB1
```

OB1 dieksekusi pada setiap **scan cycle PLC**.

Di dalam OB1 biasanya hanya terdapat **pemanggilan block lain**.

Contoh:

```text
CALL Pump_A_Control_FB
CALL Pump_B_Control_FB
CALL Pump_C_Control_FB
```

---

### FB (Function Block)

FB digunakan untuk menulis **logic kontrol equipment**.

Contoh:

```text
Pump_Control_FB
```

Di dalam FB terdapat logika seperti:

- permissive logic
- start command
- trip protection
- alarm monitoring.

FB dapat digunakan berulang untuk banyak equipment.

---

### DB (Data Block)

DB digunakan untuk menyimpan **data operasi equipment**.

Contoh data yang disimpan:

- run status
- trip status
- alarm status
- timer value
- configuration parameter.

Setiap instance FB biasanya memiliki **instance DB sendiri**.

Contoh:

```text
Pump_A_DB
Pump_B_DB
Pump_C_DB
```

Walaupun logika FB sama, setiap pump memiliki **data operasi yang berbeda**.

---

## 7. System Response

Pada PLC Siemens S7, semua logika program dijalankan melalui **scan cycle**. Dalam setiap scan cycle, **Organization Block (OB)** menjadi titik masuk eksekusi program dan bertugas memanggil **Function Block (FB)** yang berisi logika kontrol equipment.

Urutan eksekusi program dapat digambarkan sebagai berikut:

```text
PLC Scan Cycle
↓
OB1 Execution
↓
Call Equipment FB
↓
Evaluate Logic
↓
Update Outputs
```

Struktur ini memastikan bahwa seluruh equipment di plant diproses secara **konsisten dan berulang dalam setiap siklus PLC**.

---

✔ Arsitektur Eksekusi Program PLC

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFPiJmhmC2v9Q/feedshare-shrink_1280/B4DZdnzmRNGYAo-/0/1749793284504?e=2147483647&t=zzhnAlL4m1kuTZsESRsJpvWdzQVh6dkurC_KVlDxOCk&v=beta)

---

### Step 1 — PLC Menjalankan OB1

Setiap kali PLC menyelesaikan **input scan**, PLC akan menjalankan **OB1**.

OB1 berfungsi sebagai **program utama** yang mengatur urutan eksekusi control logic.

Contoh isi OB1:

```text
CALL Pump_A_Control_FB
CALL Pump_B_Control_FB
CALL Pump_C_Control_FB
```

Dengan cara ini OB1 tidak berisi logika equipment secara langsung, melainkan hanya **memanggil block kontrol equipment**.

---

### Step 2 — OB1 Memanggil FB Equipment

Ketika OB1 memanggil **Pump_Control_FB**, PLC akan menjalankan seluruh logika yang ada di dalam FB tersebut.

Alur eksekusi:

```text
OB1
↓
Pump_Control_FB
↓
Evaluate control logic
```

Di dalam FB, PLC mengevaluasi berbagai kondisi seperti:

- permissive logic
- start command
- trip logic
- alarm logic.

---

### Step 3 — FB Mengakses Data pada Instance DB

Setiap FB memiliki **instance Data Block (DB)** yang menyimpan data operasi equipment.

Contoh:

```text
Pump_A_Control_FB
↓
Instance DB = Pump_A_DB
```

DB ini menyimpan berbagai parameter seperti:

- run status
- trip status
- timer value
- alarm status.

Dengan menggunakan DB terpisah, setiap equipment dapat menggunakan **logic FB yang sama tetapi dengan data yang berbeda**.

---

### Step 4 — PLC Menghasilkan Output Command

Setelah logika dalam FB dievaluasi, PLC menghasilkan command output.

Contoh:

```text
RUN_CMD = TRUE
↓
MOTOR_CMD = TRUE
```

Output ini dikirim ke **output module PLC** dan kemudian menuju **MCC motor starter**.

Alur command:

```text
PLC Output
↓
MCC Contactor Coil
↓
Motor Energize
↓
Pump Running
```

---

### Eksekusi Berulang pada Setiap Scan Cycle

Proses ini terjadi pada setiap scan cycle PLC.

Contoh:

```text
Scan Cycle 1
OB1 → Pump_A_FB → Output

Scan Cycle 2
OB1 → Pump_A_FB → Output

Scan Cycle 3
OB1 → Pump_A_FB → Output
```

Dengan scan cycle yang sangat cepat (biasanya **5–20 ms**), PLC dapat memonitor dan mengontrol equipment hampir secara real-time.

---

### Keuntungan Struktur Modular

Dengan struktur OB–FB–DB, sistem kontrol memiliki beberapa keuntungan penting:

| Aspek               | Manfaat                                      |
| ------------------- | -------------------------------------------- |
| Program readability | logika equipment mudah ditemukan             |
| Troubleshooting     | engineer dapat langsung membuka FB equipment |
| Scalability         | mudah menambah equipment baru                |
| Safety              | perubahan program lebih terkendali           |

Struktur ini menjadi standar dalam sistem PLC Siemens untuk plant dengan **banyak equipment dan interlock kompleks**.

---

## 8. Troubleshooting Guide

Pada sistem PLC modular berbasis **OB–FB–DB**, troubleshooting tidak lagi dilakukan dengan mencari rung ladder secara acak. Engineer dapat mengikuti **alur struktur program** untuk menemukan sumber masalah dengan cepat.

Prinsip troubleshooting adalah menelusuri jalur berikut:

```text
Equipment
↓
Signal Input
↓
Function Block (FB)
↓
Instance Data Block (DB)
↓
Organization Block (OB1)
```

Jika salah satu bagian ini tidak bekerja dengan benar maka **logic equipment tidak akan dieksekusi sesuai harapan**.

---

✔ Alur Diagnosa Program PLC Modular

![Image](https://media.licdn.com/dms/image/v2/D4D22AQFPiJmhmC2v9Q/feedshare-shrink_1280/B4DZdnzmRNGYAo-/0/1749793284504?e=2147483647&t=zzhnAlL4m1kuTZsESRsJpvWdzQVh6dkurC_KVlDxOCk&v=beta)

---

### Step 1 — Identifikasi Equipment Block

Langkah pertama adalah menemukan **Function Block (FB)** yang mengendalikan equipment tersebut.

Contoh:

```text
Pump_A_Control_FB
```

Dengan mengetahui block ini, engineer dapat langsung memonitor:

- permissive logic
- trip logic
- run command
- alarm logic.

Pendekatan ini jauh lebih cepat dibanding mencari logic di seluruh program PLC.

---

### Step 2 — Periksa Instance DB

Setiap FB memiliki **instance Data Block (DB)** yang menyimpan status operasi equipment.

Contoh:

```text
Pump_A_DB
```

Di dalam DB engineer dapat melihat parameter seperti:

- run status
- permissive status
- trip signal
- timer value.

Jika salah satu parameter bernilai **FALSE atau TRUE secara tidak normal**, engineer dapat langsung mengetahui penyebab logic tidak berjalan.

Contoh:

```text
PERMISSIVE_OK = FALSE
```

Artinya pump tidak dapat start karena kondisi permissive belum terpenuhi.

---

### Step 3 — Monitor Logic FB

Langkah berikutnya adalah melakukan **online monitoring pada FB** menggunakan TIA Portal.

Engineer dapat melihat secara langsung status setiap rung ladder:

- kontak mana yang aktif
- kondisi logic permissive
- status trip
- output command.

Contoh kondisi:

```text
START_PB = TRUE
PERMISSIVE_OK = TRUE
TRIP_ACTIVE = FALSE
```

Namun jika:

```text
RUN_CMD = FALSE
```

maka engineer dapat langsung melihat rung mana yang memblok command tersebut.

---

### Step 4 — Periksa Pemanggilan Block di OB1

Jika logic di FB sudah benar tetapi tetap tidak berjalan, engineer harus memastikan bahwa **FB dipanggil oleh OB1**.

Contoh pemanggilan yang benar:

```text
CALL Pump_A_Control_FB
```

Jika FB tidak dipanggil di OB1 maka:

```text
logic FB tidak dieksekusi
```

Walaupun program sudah ditulis dengan benar, PLC tidak akan menjalankan logika tersebut.

---

### Kesimpulan Teknis

Struktur program PLC Siemens menggunakan tiga jenis block utama:

```text
OB (Organization Block)
FB (Function Block)
DB (Data Block)
```

Hubungan eksekusi program adalah:

```text
OB1
↓
Function Block
↓
Instance Data Block
↓
Output Command
```

Dengan struktur modular ini engineer dapat:

- menemukan logika equipment dengan cepat
- memonitor status operasi equipment secara langsung
- melakukan troubleshooting tanpa harus membaca seluruh program PLC.

Pendekatan ini sangat penting pada sistem kontrol industri yang memiliki **banyak equipment, interlock kompleks, dan kebutuhan reliability tinggi**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
