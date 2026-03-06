---
title: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'permissive-logic',
    'ladder-diagram',
    'pump-protection',
    'industrial-automation',
    'process-control',
    'equipment-safety',
  ]
draft: false
summary: Artikel ini menjelaskan permissive logic pada sistem PLC yang digunakan untuk mencegah equipment start ketika kondisi proses belum aman. Contoh yang digunakan adalah motor–pump system dengan kondisi proses seperti suction valve position, suction pressure, dan status MCC. Permissive logic memastikan bahwa perintah start dari operator hanya diterima jika seluruh kondisi operasi memenuhi persyaratan keamanan. Dengan pendekatan ini PLC dapat mencegah kerusakan mekanis seperti cavitation pada pump akibat tekanan suction rendah atau valve tertutup. Artikel juga menjelaskan bagaimana permissive digabungkan ke dalam run command ladder logic sehingga PLC menolak start command ketika kondisi proses tidak memenuhi syarat operasi.
---

# **_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**

---

- [**_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**](#artikel-3-permissive-logic--mencegah-equipment-start-dalam-kondisi-tidak-aman)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Pump start saat suction valve masih tertutup](#pump-start-saat-suction-valve-masih-tertutup)
    - [Pump start saat suction pressure terlalu rendah](#pump-start-saat-suction-pressure-terlalu-rendah)
    - [Pump trip setelah start](#pump-trip-setelah-start)
  - [3. Physical Mechanism](#3-physical-mechanism)
    - [Dampak Sistem](#dampak-sistem)
    - [Peran PLC dalam Pencegahan](#peran-plc-dalam-pencegahan)
  - [4. Control Objective](#4-control-objective)
    - [1. Mencegah Equipment Start dalam Kondisi Tidak Aman](#1-mencegah-equipment-start-dalam-kondisi-tidak-aman)
    - [2. Melindungi Equipment dari Kerusakan Mekanis](#2-melindungi-equipment-dari-kerusakan-mekanis)
    - [3. Menghindari Trip Setelah Start](#3-menghindari-trip-setelah-start)
    - [4. Memastikan Operasi Sistem yang Stabil](#4-memastikan-operasi-sistem-yang-stabil)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Suction Valve Position](#suction-valve-position)
    - [Suction Pressure Status](#suction-pressure-status)
    - [MCC Status](#mcc-status)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Integrasi Permissive dengan Run Command](#integrasi-permissive-dengan-run-command)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Start Normal](#scenario-1--start-normal)
    - [Scenario 2 — Suction Valve Closed](#scenario-2--suction-valve-closed)
    - [Scenario 3 — Pressure Too Low](#scenario-3--pressure-too-low)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Periksa permissive status](#step-1--periksa-permissive-status)
    - [Step 2 — Periksa instrument lapangan](#step-2--periksa-instrument-lapangan)
    - [Step 3 — Periksa logic PERMISSIVE\_OK](#step-3--periksa-logic-permissive_ok)
    - [Step 4 — Periksa run command](#step-4--periksa-run-command)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini masih menggunakan **motor–pump system** sebagai contoh karena hampir semua fasilitas industri memiliki equipment jenis ini.

Pump biasanya digunakan untuk:

- cooling water circulation
- utility water transfer
- process fluid transfer
- chemical circulation system

Komponen utama sistem:

- **Motor listrik** — penggerak mekanik pump
- **Pump** — equipment proses untuk memindahkan fluida
- **Suction valve** — mengontrol aliran masuk ke pump
- **Pressure switch / pressure transmitter** — mendeteksi tekanan suction
- **MCC motor starter** — sistem electrical yang menghubungkan supply motor
- **PLC** — controller yang menjalankan logic control

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen                             |
| --------------- | ------------------------------------ |
| Mechanical      | pump & piping                        |
| Electrical      | motor starter MCC                    |
| Instrumentation | pressure switch / valve limit switch |
| Control         | PLC permissive logic                 |

Dalam operasi normal, pump **tidak boleh langsung start hanya karena operator menekan tombol START**.

Sistem kontrol harus memastikan bahwa kondisi proses telah memenuhi persyaratan operasi sebelum equipment dijalankan.

Konsep ini disebut **permissive logic**.

Secara umum alur kontrol menjadi:

```text
Operator START command
↓
PLC mengevaluasi permissive condition
↓
Jika semua kondisi OK
↓
PLC mengaktifkan run command
↓
motor start
```

Jika salah satu kondisi tidak terpenuhi maka PLC **menolak perintah start**.

---

## 2. Operational Problem

Tanpa permissive logic, pump dapat start walaupun kondisi proses belum siap.

Beberapa kondisi yang sering terjadi di plant:

### Pump start saat suction valve masih tertutup

Operator menekan START:

```text
START_PB = ON
```

Namun suction valve belum terbuka:

```text
SUCTION_VALVE_OPEN = FALSE
```

Pump tetap start.

Akibatnya tidak ada fluida yang masuk ke pump.

---

### Pump start saat suction pressure terlalu rendah

Jika tekanan suction terlalu rendah:

```text
SUCTION_PRESS_OK = FALSE
```

Pump dapat mengalami **cavitation**.

Gejala yang biasanya muncul:

- suara berisik pada pump
- getaran meningkat
- kerusakan impeller.

---

### Pump trip setelah start

Jika pump start dalam kondisi proses yang tidak stabil:

- pressure fluctuation
- flow tidak stabil
- protective trip aktif.

Hal ini menyebabkan:

- operasi tidak stabil
- downtime equipment meningkat.

---

Sebagian besar masalah ini terjadi karena **sistem kontrol hanya mengikuti perintah operator tanpa memverifikasi kondisi proses**.

Permissive logic digunakan untuk memastikan bahwa:

```text
equipment hanya dapat start
jika kondisi proses aman
```

---

## 3. Physical Mechanism

Pump adalah **rotating equipment hidraulik** yang bergantung pada aliran fluida untuk menjaga stabilitas operasi. Jika pump dijalankan tanpa kondisi proses yang benar, maka akan terjadi fenomena fisik yang dapat merusak komponen internal.

Kerusakan ini sering terjadi ketika pump start saat:

- suction valve tertutup
- suction pressure terlalu rendah
- suction line belum terisi fluida.

✔ Mekanisme Kerusakan Pump

![Image](https://www.researchgate.net/publication/337998114/figure/fig1/AS%3A1130960972197889%401646653516327/Damage-due-to-cavitation-in-the-impeller-of-a-centrifugal-pump-2-6.png)

![Image](https://www.researchgate.net/publication/336253916/figure/fig2/AS%3A11431281108504850%401671533386335/Formation-and-collapsing-of-vapor-bubbles-Some-of-situations-where-cavitation-phenomenon.png)

![Image](https://www.michael-smith-engineers.co.uk/mse/uploads/UsefulInfo/NPSH/NPSH-FIG1.JPG)

![Image](https://static1.squarespace.com/static/556c6ecae4b099a4afb2aa99/556c8b72e4b0c6e620556497/5d163c71cef2f000012b693a/1567796204374/Internal-pressure-drop-of-centrifugal-pump.jpg?format=1500w)

Rantai mekanisme kerusakan dapat dijelaskan sebagai berikut.

```text id="l0pfxo"
Suction valve tertutup / suction pressure rendah
↓
fluida tidak mengalir ke pump
↓
tekanan lokal di impeller turun
↓
fluida mulai menguap membentuk vapor bubble
↓
bubble runtuh ketika tekanan meningkat
↓
terjadi cavitation pada impeller
↓
impeller surface erosion
↓
vibration meningkat
↓
mechanical seal rusak
↓
potensi loss of containment
```

Fenomena **cavitation** terjadi ketika tekanan fluida turun di bawah **vapor pressure** sehingga terbentuk gelembung uap.

Ketika gelembung ini runtuh di area bertekanan tinggi, terjadi **shock micro-jet** yang merusak permukaan impeller.

Kerusakan ini biasanya ditandai oleh:

- pitting pada permukaan impeller
- peningkatan getaran
- penurunan performa pump.

---

### Dampak Sistem

Jika pump tetap dioperasikan dalam kondisi ini, dampaknya dapat berkembang menjadi kegagalan sistem.

Contoh eskalasi kegagalan:

```text id="blfy4a"
cavitation
↓
vibration meningkat
↓
bearing load meningkat
↓
mechanical seal gagal
↓
fluida bocor dari casing pump
↓
potensi loss of containment
```

Pada sistem yang membawa fluida proses berbahaya, kegagalan ini dapat menyebabkan:

- kebocoran fluida proses
- potensi kebakaran
- shutdown unit proses.

---

### Peran PLC dalam Pencegahan

PLC tidak dapat mengendalikan fenomena fisik seperti cavitation secara langsung.

Namun PLC dapat **mencegah kondisi tersebut terjadi** dengan memblok start equipment sebelum kondisi proses siap.

Contoh kondisi yang harus diverifikasi sebelum pump start:

```text id="9y8k2o"
SUCTION_VALVE_OPEN = TRUE
SUCTION_PRESS_OK = TRUE
MCC_HEALTHY = TRUE
```

Jika salah satu kondisi tidak terpenuhi maka PLC harus:

```text id="s0dz8n"
menolak start command
```

Pendekatan ini mencegah pump masuk ke kondisi operasi yang berpotensi merusak equipment.

---

## 4. Control Objective

Permissive logic dirancang untuk memastikan bahwa equipment hanya dapat start ketika **kondisi operasi minimum terpenuhi**.

Tujuan utama permissive control adalah sebagai berikut.

---

### 1. Mencegah Equipment Start dalam Kondisi Tidak Aman

PLC harus memverifikasi kondisi proses sebelum menerima perintah start.

Contoh kondisi minimum pump:

```text id="3u37k3"
suction valve terbuka
suction pressure cukup
MCC dalam kondisi healthy
```

Jika salah satu kondisi tidak terpenuhi maka:

```text id="gk8s1e"
RUN_CMD = FALSE
```

Motor tidak akan start.

---

### 2. Melindungi Equipment dari Kerusakan Mekanis

Permissive logic mencegah pump beroperasi dalam kondisi yang dapat menyebabkan:

- cavitation
- vibration berlebihan
- kerusakan impeller.

Dengan demikian permissive berfungsi sebagai **lapisan proteksi pertama untuk equipment**.

---

### 3. Menghindari Trip Setelah Start

Jika pump start dalam kondisi proses yang tidak stabil, sistem proteksi biasanya akan memicu trip segera setelah start.

Permissive logic mencegah kondisi ini dengan memastikan bahwa **kondisi proses stabil sebelum equipment berjalan**.

---

### 4. Memastikan Operasi Sistem yang Stabil

Dengan permissive logic, urutan kontrol menjadi:

```text id="0r06vo"
verifikasi kondisi proses
↓
terima perintah start
↓
jalankan equipment
```

Struktur kontrol ini sangat umum digunakan dalam:

- pump system
- compressor system
- fan system
- conveyor system.

---

## 5. Instrument and Signal Mapping

Permissive logic tidak dapat bekerja tanpa **sinyal instrument yang memverifikasi kondisi proses**. Oleh karena itu sebelum membuat ladder logic, engineer harus menentukan **sinyal apa saja yang mewakili kondisi aman operasi equipment**.

Pada sistem pump sederhana, kondisi minimum yang harus diverifikasi biasanya meliputi:

- posisi suction valve
- tekanan suction
- status kesehatan motor starter.

Sinyal-sinyal tersebut dikirim ke PLC sebagai **digital input** yang kemudian digunakan dalam logika permissive.

✔ Arsitektur Sinyal Permissive Pump System

![Image](https://www.adminstrumentengineering.com.au/sites/default/files/styles/wide/public/pressure_switches_for_water_pumps_copy.webp?itok=gjHuJKto)

Mapping sinyal yang digunakan dalam sistem ini dapat digambarkan sebagai berikut.

| Signal             | Source             | PLC Type | Function            |
| ------------------ | ------------------ | -------- | ------------------- |
| START_PB           | push button        | DI       | start command       |
| STOP_PB            | push button        | DI       | stop command        |
| SUCTION_VALVE_OPEN | valve limit switch | DI       | permissive          |
| SUCTION_PRESS_OK   | pressure switch    | DI       | permissive          |
| MCC_HEALTHY        | MCC status contact | DI       | permissive          |
| MOTOR_CMD          | PLC output         | DO       | motor start command |

Dalam logika PLC, ketiga sinyal permissive akan digabungkan menjadi satu kondisi logika yang disebut:

```text id="n4ejcd"
PERMISSIVE_OK
```

---

### Suction Valve Position

Valve limit switch digunakan untuk mendeteksi apakah suction valve telah terbuka.

Ketika valve terbuka penuh:

```text id="8jqh1i"
SUCTION_VALVE_OPEN = TRUE
```

Jika valve tertutup:

```text id="3o0u6i"
SUCTION_VALVE_OPEN = FALSE
```

Pump tidak boleh start jika suction valve tertutup karena tidak ada aliran fluida menuju impeller.

---

### Suction Pressure Status

Pressure switch atau transmitter digunakan untuk memverifikasi bahwa tekanan suction berada pada level minimum yang aman.

Contoh kondisi permissive:

```text id="nksmq9"
SUCTION_PRESS_OK = TRUE
```

Jika tekanan terlalu rendah:

```text id="m1pnil"
SUCTION_PRESS_OK = FALSE
```

PLC akan memblok start command untuk mencegah cavitation.

---

### MCC Status

Motor starter biasanya memberikan **status healthy contact** ke PLC.

Contoh:

```text id="uoxq6v"
MCC_HEALTHY = TRUE
```

Jika MCC mengalami masalah seperti:

- overload trip
- breaker open
- protection relay active

maka:

```text id="ql9u6u"
MCC_HEALTHY = FALSE
```

PLC akan menolak start command.

---

Ketiga sinyal permissive ini akan digabungkan menjadi satu logika yang menentukan apakah **pump boleh start atau tidak**.

---

## 6. Ladder Logic Implementation

Setelah semua sinyal dipetakan, langkah berikutnya adalah membangun **struktur ladder logic permissive**.

Logika ini memastikan bahwa **start command hanya diterima jika semua kondisi operasi terpenuhi**.

---

✔ Struktur Permissive Logic

![Image](https://cdn.automationforum.co/uploads/2025/06/Explore-how-permissive-logic-and-trip-interlocks-ensure-safe-equipment-operation-in-DCS-PLC-and-SIS-based-automation-systems.-1-scaled.jpg)

![Image](https://cdn.automationforum.co/uploads/2026/01/PLC-Permissive-Logic-Troubleshooting-Procedure-for-Instrumentation-Engineers-2-1024x577.jpg)

Langkah pertama adalah membangun logika permissive.

```text id="kgcsle"
PERMISSIVE_OK =
SUCTION_VALVE_OPEN
AND SUCTION_PRESS_OK
AND MCC_HEALTHY
```

Jika semua kondisi bernilai TRUE maka permissive terpenuhi.

---

### Integrasi Permissive dengan Run Command

Setelah permissive dibuat, kondisi ini dimasukkan ke dalam logika run command.

```text id="6z2e1t"
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
AND PERMISSIVE_OK
```

Logika ini menghasilkan perilaku berikut:

Jika operator menekan START tetapi permissive tidak terpenuhi:

```text id="p0v5j3"
PERMISSIVE_OK = FALSE
↓
RUN_CMD = FALSE
↓
motor tidak start
```

PLC secara efektif **menolak start command**.

---

## 7. System Response

Setelah permissive logic dibuat dan dimasukkan ke dalam rung **RUN_CMD**, PLC akan merespon berbagai kondisi operasi berdasarkan status sinyal permissive.

Respon sistem bergantung pada hasil evaluasi logika berikut:

```text
PERMISSIVE_OK =
SUCTION_VALVE_OPEN
AND SUCTION_PRESS_OK
AND MCC_HEALTHY
```

Jika hasilnya TRUE maka pump boleh start.
Jika FALSE maka PLC menolak start command.

---

✔ Respon Sistem pada Pump Control

![Image](https://miro.medium.com/v2/resize%3Afit%3A1232/1%2ABCQYm-aR-ugfDocxtHKgPg.png)

![Image](https://cdn.automationforum.co/uploads/2025/06/Explore-how-permissive-logic-and-trip-interlocks-ensure-safe-equipment-operation-in-DCS-PLC-and-SIS-based-automation-systems.-1-scaled.jpg)

---

### Scenario 1 — Start Normal

Kondisi proses:

```text
START_PB = ON
SUCTION_VALVE_OPEN = TRUE
SUCTION_PRESS_OK = TRUE
MCC_HEALTHY = TRUE
```

PLC menghitung logika permissive:

```text
PERMISSIVE_OK = TRUE
```

Kemudian rung RUN_CMD dievaluasi:

```text
RUN_CMD = TRUE
```

PLC mengaktifkan output:

```text
MOTOR_CMD = ON
```

Respon sistem:

```text
kontaktor MCC energize
↓
motor mulai berputar
↓
pump mulai memindahkan fluida
```

Dalam kondisi ini pump beroperasi normal karena semua kondisi operasi terpenuhi.

---

### Scenario 2 — Suction Valve Closed

Kondisi proses:

```text
START_PB = ON
SUCTION_VALVE_OPEN = FALSE
SUCTION_PRESS_OK = TRUE
MCC_HEALTHY = TRUE
```

PLC mengevaluasi permissive:

```text
PERMISSIVE_OK = FALSE
```

Karena salah satu kondisi tidak terpenuhi, rung RUN_CMD menjadi:

```text
RUN_CMD = FALSE
```

Respon sistem:

```text
MOTOR_CMD tetap OFF
↓
motor tidak start
```

PLC **menolak perintah start** karena suction valve belum terbuka.

Ini mencegah pump berjalan tanpa aliran fluida.

---

### Scenario 3 — Pressure Too Low

Kondisi proses:

```text
SUCTION_PRESS_OK = FALSE
```

PLC menghitung permissive:

```text
PERMISSIVE_OK = FALSE
```

Akibatnya:

```text
RUN_CMD = FALSE
```

Respon sistem:

```text
motor tidak start
```

PLC memblok start command untuk mencegah pump mengalami **cavitation akibat tekanan suction rendah**.

---

Permissive logic memastikan bahwa pump hanya dapat beroperasi ketika **semua kondisi operasi minimum telah terpenuhi**.

Dengan demikian sistem kontrol dapat mencegah equipment masuk ke kondisi operasi yang berpotensi merusak equipment.

---

## 8. Troubleshooting Guide

Ketika pump tidak dapat start karena permissive logic, engineer harus memastikan **apakah masalah berasal dari kondisi proses, instrument, atau logika PLC**.

Pendekatan troubleshooting harus mengikuti alur evaluasi permissive yang dilakukan PLC.

```text
Field Condition
↓
Instrument Signal
↓
PLC Permissive Logic
↓
Run Command
↓
Motor Starter
```

Dengan mengikuti alur ini engineer dapat menentukan **di titik mana permissive menjadi FALSE**.

---

✔ Alur Diagnosa Permissive Logic

![Image](https://cdn.automationforum.co/uploads/2026/01/PLC-Permissive-Logic-Troubleshooting-Procedure-for-Instrumentation-Engineers-4-1024x670.jpg)

---

### Step 1 — Periksa permissive status

Langkah pertama adalah memeriksa **status setiap sinyal permissive di PLC**.

Engineer harus memonitor input berikut:

```text
SUCTION_VALVE_OPEN
SUCTION_PRESS_OK
MCC_HEALTHY
```

Jika salah satu bernilai FALSE maka:

```text
PERMISSIVE_OK = FALSE
```

Pump tidak akan start.

Monitoring ini biasanya dilakukan melalui **online monitoring pada software PLC** atau melalui **HMI status screen**.

---

### Step 2 — Periksa instrument lapangan

Jika salah satu permissive tidak aktif, langkah berikutnya adalah memeriksa perangkat instrument yang menghasilkan sinyal tersebut.

Contoh pemeriksaan:

**Valve limit switch**

- apakah valve benar-benar terbuka
- apakah limit switch berfungsi.

**Pressure switch**

- apakah tekanan suction benar-benar cukup
- apakah sensor mengalami fault.

Jika instrument rusak maka PLC akan terus membaca **permissive = FALSE**.

---

### Step 3 — Periksa logic PERMISSIVE_OK

Jika semua instrument lapangan menunjukkan kondisi normal tetapi PLC tetap membaca permissive FALSE, maka engineer harus memeriksa rung logika.

Periksa struktur logika berikut:

```text
PERMISSIVE_OK =
SUCTION_VALVE_OPEN
AND SUCTION_PRESS_OK
AND MCC_HEALTHY
```

Kesalahan yang sering terjadi:

- alamat tag salah
- kontak ladder salah tipe (NO / NC)
- sinyal tidak masuk ke rung.

Kesalahan kecil pada logika dapat menyebabkan **permissive selalu FALSE**.

---

### Step 4 — Periksa run command

Jika permissive sudah TRUE tetapi pump tetap tidak start, langkah berikutnya adalah memeriksa rung RUN_CMD.

Contoh logika:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
AND PERMISSIVE_OK
```

Engineer harus memverifikasi bahwa:

```text
RUN_CMD = TRUE
```

Jika tidak TRUE, kemungkinan penyebab:

- START_PB tidak aktif
- STOP_PB aktif
- seal-in contact tidak bekerja.

Jika RUN_CMD TRUE tetapi motor tetap tidak start, maka masalah berada pada **output PLC atau MCC motor starter**.

---

### Kesimpulan Teknis

Permissive logic digunakan untuk memastikan bahwa **equipment hanya dapat start dalam kondisi proses yang aman**.

Struktur dasar permissive logic adalah:

```text
PERMISSIVE_OK =
condition_1
AND condition_2
AND condition_3
```

Logika ini berfungsi sebagai **lapisan proteksi pertama sebelum equipment beroperasi**.

Dengan permissive logic, PLC dapat:

- menolak start command ketika kondisi proses tidak aman
- melindungi equipment dari kerusakan mekanis
- meningkatkan stabilitas operasi sistem proses.

Pendekatan ini digunakan hampir pada semua sistem kontrol industri seperti:

- pump system
- compressor system
- fan system
- conveyor system.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
