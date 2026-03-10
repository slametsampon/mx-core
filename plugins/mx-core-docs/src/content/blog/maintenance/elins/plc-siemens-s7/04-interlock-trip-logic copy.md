---
title: Interlock & Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'interlock-logic',
    'trip-logic',
    'pump-protection',
    'industrial-automation',
    'process-safety',
    'motor-protection',
  ]
draft: false
summary: Artikel ini menjelaskan interlock dan trip logic pada sistem PLC yang digunakan untuk menghentikan equipment secara otomatis ketika kondisi operasi menjadi berbahaya. Contoh yang digunakan adalah motor–pump system dengan kondisi proses seperti suction pressure rendah, discharge pressure tinggi, dan motor overload. Berbeda dengan permissive yang memblok start sebelum operasi, interlock bekerja selama equipment sedang berjalan untuk melindungi sistem dari kerusakan mekanis dan electrical. Artikel ini menunjukkan bagaimana sinyal instrument digabungkan menjadi logika TRIP_ACTIVE yang memutus run command motor. Pendekatan ini merupakan lapisan proteksi penting untuk menjaga reliability equipment dan keselamatan proses industri.
---

# **_Artikel 4: Interlock & Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi_**

---

- [**_Artikel 4: Interlock \& Trip Logic — Menghentikan Equipment Saat Kondisi Berbahaya Terjadi_**](#artikel-4-interlock--trip-logic--menghentikan-equipment-saat-kondisi-berbahaya-terjadi)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Suction pressure tiba-tiba turun](#suction-pressure-tiba-tiba-turun)
    - [Discharge pressure terlalu tinggi](#discharge-pressure-terlalu-tinggi)
    - [Motor overload](#motor-overload)
  - [3. Physical Mechanism](#3-physical-mechanism)
    - [Peran Instrument dalam Deteksi Kondisi Berbahaya](#peran-instrument-dalam-deteksi-kondisi-berbahaya)
  - [4. Control Objective](#4-control-objective)
    - [1. Mendeteksi Kondisi Operasi Berbahaya](#1-mendeteksi-kondisi-operasi-berbahaya)
    - [2. Menghentikan Equipment Sebelum Kerusakan Terjadi](#2-menghentikan-equipment-sebelum-kerusakan-terjadi)
    - [3. Mencegah Eskalasi Kegagalan Sistem](#3-mencegah-eskalasi-kegagalan-sistem)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Low Suction Pressure Signal](#low-suction-pressure-signal)
    - [High Discharge Pressure Signal](#high-discharge-pressure-signal)
    - [Motor Overload Signal](#motor-overload-signal)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Integrasi Trip dengan Run Command](#integrasi-trip-dengan-run-command)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Normal Operation](#scenario-1--normal-operation)
    - [Scenario 2 — Low Suction Pressure](#scenario-2--low-suction-pressure)
    - [Scenario 3 — Motor Overload](#scenario-3--motor-overload)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Periksa status trip di PLC](#step-1--periksa-status-trip-di-plc)
    - [Step 2 — Verifikasi kondisi proses](#step-2--verifikasi-kondisi-proses)
    - [Step 3 — Periksa instrument](#step-3--periksa-instrument)
    - [Step 4 — Periksa electrical protection](#step-4--periksa-electrical-protection)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini masih menggunakan **motor–pump system** yang sama agar kontinuitas sistem tetap terjaga dengan artikel sebelumnya.

Pump merupakan salah satu **rotating equipment paling umum dalam plant industri** dan biasanya beroperasi secara kontinu selama proses berjalan.

Komponen utama sistem:

- **Pump** — equipment hidraulik yang memindahkan fluida
- **Motor listrik** — penggerak mekanik pump
- **Discharge piping** — jalur keluaran fluida dari pump
- **Pressure instrument** — mendeteksi kondisi tekanan proses
- **MCC motor starter** — sistem electrical untuk menghidupkan motor
- **PLC** — controller yang menjalankan logika kontrol

Hubungan disiplin dalam sistem:

| Discipline      | Komponen                      |
| --------------- | ----------------------------- |
| Mechanical      | pump, impeller, seal          |
| Electrical      | motor & MCC starter           |
| Instrumentation | pressure switch / transmitter |
| Control         | PLC interlock logic           |

Pada artikel sebelumnya PLC digunakan untuk **mencegah pump start dalam kondisi tidak aman** menggunakan permissive logic.

Namun setelah pump berjalan, kondisi proses masih dapat berubah karena faktor seperti:

- perubahan tekanan sistem
- perubahan aliran fluida
- gangguan pada motor.

Karena itu sistem kontrol membutuhkan **interlock dan trip logic** untuk melindungi equipment selama operasi berlangsung.

Secara konsep, struktur proteksi sistem menjadi:

```text id="r8g4m7"
Permissive Logic
↓
Start Equipment
↓
Monitor Process Condition
↓
Interlock / Trip Logic
↓
Stop Equipment jika kondisi berbahaya
```

---

## 2. Operational Problem

Beberapa kondisi berbahaya dapat muncul **setelah pump sudah running**.

Contoh kondisi yang sering terjadi di plant:

### Suction pressure tiba-tiba turun

Hal ini dapat disebabkan oleh:

- suction valve tertutup sebagian
- level tank upstream turun
- blockage pada suction piping.

---

### Discharge pressure terlalu tinggi

Penyebab umum:

- discharge valve tertutup
- downstream line tersumbat
- control valve gagal membuka.

---

### Motor overload

Motor overload dapat terjadi karena:

- pump bekerja pada beban terlalu tinggi
- mechanical friction meningkat
- bearing rusak.

---

Jika pump tetap berjalan dalam kondisi tersebut, kegagalan dapat berkembang menjadi kerusakan serius.

Contoh eskalasi kegagalan:

```text id="4os8qk"
low suction pressure
↓
cavitation
↓
impeller erosion
↓
vibration meningkat
↓
seal failure
↓
loss of containment
```

Atau pada sisi electrical:

```text id="2h8ykn"
motor overload
↓
motor winding overheating
↓
insulation breakdown
↓
motor failure
```

Karena itu PLC harus memiliki kemampuan untuk **menghentikan equipment secara otomatis ketika kondisi berbahaya terdeteksi**.

Fungsi ini disebut **interlock atau trip logic**.

---

## 3. Physical Mechanism

Salah satu kondisi berbahaya yang paling sering terjadi pada pump adalah **penurunan tekanan suction secara tiba-tiba**. Kondisi ini dapat menyebabkan fenomena hidraulik yang merusak komponen internal pump.

Pump sentrifugal membutuhkan tekanan inlet minimum agar fluida dapat masuk ke impeller secara stabil. Jika tekanan terlalu rendah maka kondisi **NPSH (Net Positive Suction Head)** tidak terpenuhi.

✔ Mekanisme Cavitation pada Pump

![Image](https://www.researchgate.net/publication/336253916/figure/fig2/AS%3A11431281108504850%401671533386335/Formation-and-collapsing-of-vapor-bubbles-Some-of-situations-where-cavitation-phenomenon.png)

![Image](https://www.michael-smith-engineers.co.uk/mse/uploads/UsefulInfo/PumpCavitation/PUMP-CAVITATION-FIG-1.JPG)

![Image](https://media.licdn.com/dms/image/v2/D5622AQGOSxKGq4QFjg/feedshare-shrink_800/B56Zk5CPqFJsAg-/0/1757598514893?e=2147483647&t=K2KInpHmCG-_i_-EAjqO6H2W8D506qi-sI3dTXXU208&v=beta)

Rantai mekanisme kegagalan dapat dijelaskan sebagai berikut.

```text
suction pressure turun
↓
NPSH tidak terpenuhi
↓
fluida mulai menguap di area impeller
↓
vapor bubble terbentuk
↓
bubble runtuh ketika tekanan meningkat
↓
micro shock terjadi pada permukaan impeller
↓
impeller mengalami erosi
↓
vibration meningkat
↓
mechanical seal rusak
↓
fluida proses bocor
```

Fenomena ini disebut **cavitation**.

Cavitation memiliki beberapa gejala yang dapat diamati di plant:

- suara seperti kerikil di dalam pump
- peningkatan getaran
- penurunan flow rate
- kerusakan permukaan impeller.

Jika pump terus dioperasikan dalam kondisi ini, kerusakan dapat berkembang menjadi kegagalan sistem.

---

### Peran Instrument dalam Deteksi Kondisi Berbahaya

PLC tidak dapat mengukur fenomena fisik seperti cavitation secara langsung. Oleh karena itu sistem menggunakan **instrument proses** untuk mendeteksi kondisi yang mengarah pada kegagalan tersebut.

Contoh instrument yang digunakan:

- **pressure switch**
- **pressure transmitter**
- **flow switch**
- **motor protection relay**

✔ Deteksi Trip melalui Pressure Switch

![Image](https://www.adminstrumentengineering.com.au/sites/default/files/styles/wide/public/pressure_switches_for_water_pumps_copy.webp?itok=gjHuJKto)

Pressure switch dipasang pada suction piping untuk memonitor tekanan inlet pump.

Ketika tekanan berada di atas batas minimum:

```text
SUCTION_PRESS_OK = TRUE
```

Jika tekanan turun di bawah setpoint:

```text
LOW_SUCTION_PRESS = TRUE
```

Perubahan status ini dikirim ke PLC sebagai **digital input**.

PLC kemudian memproses sinyal tersebut dalam logika trip.

```text
LOW_SUCTION_PRESS
↓
TRIP_ACTIVE = TRUE
↓
RUN_CMD = FALSE
↓
motor stop
```

Dengan cara ini PLC dapat menghentikan pump **sebelum cavitation merusak komponen internal**.

---

## 4. Control Objective

Interlock dan trip logic memiliki tujuan utama untuk **melindungi equipment selama operasi berlangsung**.

Berbeda dengan permissive yang bekerja sebelum start, interlock bekerja **ketika equipment sedang running**.

Tujuan utama sistem interlock adalah sebagai berikut.

---

### 1. Mendeteksi Kondisi Operasi Berbahaya

PLC harus memonitor kondisi proses secara terus-menerus menggunakan sinyal instrument.

Contoh kondisi yang harus dipantau:

```text
low suction pressure
high discharge pressure
motor overload
```

Jika salah satu kondisi ini muncul maka sistem harus segera merespon.

---

### 2. Menghentikan Equipment Sebelum Kerusakan Terjadi

Interlock dirancang untuk menghentikan equipment sebelum kerusakan berkembang.

Contoh respon sistem:

```text
LOW_SUCTION_PRESS = TRUE
↓
TRIP_ACTIVE = TRUE
↓
motor stop
```

Dengan cara ini pump tidak terus beroperasi dalam kondisi cavitation.

---

### 3. Mencegah Eskalasi Kegagalan Sistem

Jika kondisi berbahaya tidak dihentikan, kegagalan dapat berkembang menjadi insiden yang lebih besar.

Contoh eskalasi:

```text
cavitation
↓
seal failure
↓
loss of containment
↓
potensi fire / explosion
```

Dengan interlock logic, PLC menjadi **lapisan proteksi penting dalam sistem kontrol proses**.

---

## 5. Instrument and Signal Mapping

Untuk membangun **interlock dan trip logic**, PLC membutuhkan sinyal yang dapat mendeteksi kondisi operasi berbahaya secara real-time. Sinyal ini biasanya berasal dari **instrument proses dan sistem proteksi electrical**.

Instrument tersebut mengubah kondisi fisik di lapangan (tekanan, arus motor, aliran) menjadi **sinyal digital yang dapat diproses oleh PLC**.

✔ Arsitektur Sinyal Interlock Pump System

![Image](https://cdn.automationforum.co/uploads/2025/07/PLC-Program-for-Motor-Starter-with-Low-Level-Switch-Interlock-7-scaled.jpg)

Contoh sinyal yang digunakan dalam sistem interlock pump:

| Signal            | Source             | PLC Type | Function        |
| ----------------- | ------------------ | -------- | --------------- |
| LOW_SUCTION_PRESS | pressure switch    | DI       | trip condition  |
| HIGH_DISCH_PRESS  | pressure switch    | DI       | trip condition  |
| MOTOR_OVERLOAD    | MCC overload relay | DI       | electrical trip |
| RUN_CMD           | PLC logic          | internal | run command     |
| MOTOR_CMD         | PLC output         | DO       | motor control   |

Ketiga sinyal trip ini akan digabungkan menjadi satu kondisi logika yang disebut:

```text
TRIP_ACTIVE
```

Jika salah satu kondisi trip aktif, PLC harus menghentikan motor pump.

---

### Low Suction Pressure Signal

Pressure switch dipasang pada **suction piping** untuk memonitor tekanan inlet pump.

Ketika tekanan turun di bawah batas minimum:

```text
LOW_SUCTION_PRESS = TRUE
```

Sinyal ini menunjukkan bahwa pump berpotensi mengalami **cavitation**.

PLC harus menghentikan pump sebelum kerusakan terjadi.

---

### High Discharge Pressure Signal

Pressure switch juga dapat dipasang pada **discharge piping**.

Jika tekanan discharge terlalu tinggi:

```text
HIGH_DISCH_PRESS = TRUE
```

Hal ini dapat disebabkan oleh:

- discharge valve tertutup
- downstream line blockage
- control valve gagal membuka.

Jika pump tetap berjalan, tekanan berlebih dapat menyebabkan:

- overloading motor
- kerusakan casing pump
- kegagalan piping system.

---

### Motor Overload Signal

Motor overload biasanya dideteksi oleh **thermal overload relay** di MCC.

Ketika arus motor melebihi batas aman:

```text
MOTOR_OVERLOAD = TRUE
```

Sinyal ini dikirim ke PLC sebagai trip condition.

Overload dapat terjadi karena:

- pump bekerja pada tekanan terlalu tinggi
- mechanical friction meningkat
- bearing rusak.

---

Semua sinyal ini menjadi **indikasi bahwa sistem sedang berada dalam kondisi tidak aman**.

PLC menggabungkan sinyal tersebut untuk menentukan apakah pump harus dihentikan.

---

## 6. Ladder Logic Implementation

Setelah semua sinyal trip dipetakan, langkah berikutnya adalah membangun **struktur ladder logic interlock**.

Logika ini memastikan bahwa equipment dihentikan segera ketika kondisi berbahaya terdeteksi.

---

✔ Struktur Interlock & Trip Logic

![Image](https://cdn.automationforum.co/uploads/2023/08/plc-motor-2-scaled.jpg)

Langkah pertama adalah membuat logika trip.

```text
TRIP_ACTIVE =
LOW_SUCTION_PRESS
OR HIGH_DISCH_PRESS
OR MOTOR_OVERLOAD
```

Jika salah satu kondisi trip aktif maka:

```text
TRIP_ACTIVE = TRUE
```

---

### Integrasi Trip dengan Run Command

Trip kemudian dimasukkan ke dalam rung RUN_CMD.

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
AND PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

Penjelasan logika:

Jika salah satu trip aktif:

```text
TRIP_ACTIVE = TRUE
↓
NOT TRIP_ACTIVE = FALSE
↓
RUN_CMD = FALSE
↓
motor stop
```

Motor akan berhenti secara otomatis tanpa intervensi operator.

---

## 7. System Response

Setelah logika **TRIP_ACTIVE** dimasukkan ke dalam rung **RUN_CMD**, PLC akan memonitor kondisi proses secara terus-menerus melalui **scan cycle**. Setiap perubahan sinyal instrument akan mempengaruhi status trip dan menentukan apakah motor pump tetap berjalan atau harus dihentikan.

Secara prinsip kontrol:

```text
Equipment boleh running
jika tidak ada kondisi trip
```

atau dalam bentuk logika:

```text
RUN_CMD = RUN_LOGIC
AND NOT TRIP_ACTIVE
```

---

✔ Lanjutan Artikel — Bagian 5

![Image](https://www.researchgate.net/publication/318191208/figure/fig1/AS%3A512736128966656%401499257227865/Flowchart-of-Program-Working-Condition-A.png)

![Image](https://www.researchgate.net/publication/351508147/figure/fig2/AS%3A1033116625948673%401623325606182/Piping-and-instrumentation-diagram-P-ID-of-the-system.png)

---

### Scenario 1 — Normal Operation

Kondisi sistem:

```text
PERMISSIVE_OK = TRUE
LOW_SUCTION_PRESS = FALSE
HIGH_DISCH_PRESS = FALSE
MOTOR_OVERLOAD = FALSE
```

PLC mengevaluasi logika trip:

```text
TRIP_ACTIVE = FALSE
```

Rung RUN_CMD menjadi:

```text
RUN_CMD = TRUE
```

PLC mengaktifkan output:

```text
MOTOR_CMD = ON
```

Respon sistem:

```text
motor running
↓
pump memindahkan fluida
↓
tekanan dan flow stabil
```

Dalam kondisi ini PLC hanya **memantau kondisi proses tanpa melakukan intervensi**.

---

### Scenario 2 — Low Suction Pressure

Jika tekanan suction turun di bawah batas aman:

```text
LOW_SUCTION_PRESS = TRUE
```

PLC mengevaluasi logika trip:

```text
TRIP_ACTIVE = TRUE
```

Rung RUN_CMD menjadi:

```text
RUN_CMD = FALSE
```

PLC mematikan output:

```text
MOTOR_CMD = OFF
```

Respon sistem:

```text
kontaktor MCC de-energize
↓
motor berhenti
↓
pump berhenti
```

Dengan respon ini pump dihentikan **sebelum cavitation merusak impeller**.

---

### Scenario 3 — Motor Overload

Jika arus motor melebihi batas aman, overload relay di MCC akan aktif.

```text
MOTOR_OVERLOAD = TRUE
```

PLC menerima sinyal trip ini dan menghitung logika:

```text
TRIP_ACTIVE = TRUE
```

Akibatnya:

```text
RUN_CMD = FALSE
```

PLC mematikan output motor.

Respon sistem:

```text
motor stop
↓
arus motor turun
↓
motor terlindungi dari overheating
```

Trip ini melindungi motor dari **thermal damage pada winding motor**.

---

## 8. Troubleshooting Guide

Ketika pump tiba-tiba berhenti selama operasi, engineer harus menentukan **trip condition mana yang memicu penghentian equipment**. Pendekatan troubleshooting harus mengikuti urutan evaluasi logika trip di PLC.

Secara sistematis alur diagnosa adalah:

```text
Process Condition
↓
Instrument Signal
↓
Trip Logic (PLC)
↓
Motor Command
↓
MCC Motor Starter
```

Pendekatan ini mencegah troubleshooting dilakukan secara acak.

---

✔ Alur Diagnosa Trip System

![Image](https://cdn.automationforum.co/uploads/2025/06/Explore-how-permissive-logic-and-trip-interlocks-ensure-safe-equipment-operation-in-DCS-PLC-and-SIS-based-automation-systems.-1-scaled.jpg)

![Image](https://cdn.automationforum.co/uploads/2026/01/PLC-Permissive-Logic-Troubleshooting-Procedure-for-Instrumentation-Engineers-4-1024x670.jpg)

---

### Step 1 — Periksa status trip di PLC

Langkah pertama adalah melihat **status trip signal pada PLC atau HMI**.

Engineer harus mengidentifikasi sinyal mana yang aktif:

```text
LOW_SUCTION_PRESS
HIGH_DISCH_PRESS
MOTOR_OVERLOAD
```

Jika salah satu bernilai TRUE maka:

```text
TRIP_ACTIVE = TRUE
```

Pump akan berhenti.

Mengetahui **trip source** adalah langkah paling penting sebelum melakukan investigasi lebih lanjut.

---

### Step 2 — Verifikasi kondisi proses

Jika trip berasal dari kondisi proses, engineer harus memverifikasi apakah kondisi tersebut benar-benar terjadi.

Contoh pemeriksaan:

**Low suction pressure**

Periksa:

- level tank upstream
- posisi suction valve
- kemungkinan blockage pada suction line.

---

**High discharge pressure**

Periksa:

- discharge valve
- control valve downstream
- kondisi pipeline.

Trip sering terjadi karena **kondisi proses memang tidak normal**.

---

### Step 3 — Periksa instrument

Jika PLC menunjukkan trip tetapi kondisi proses normal, kemungkinan masalah berada pada **instrument lapangan**.

Periksa perangkat berikut:

**Pressure switch**

- apakah switch berfungsi
- apakah setpoint benar
- apakah wiring instrument normal.

Kesalahan kalibrasi atau kerusakan instrument dapat menyebabkan **false trip**.

---

### Step 4 — Periksa electrical protection

Jika trip berasal dari sinyal:

```text
MOTOR_OVERLOAD
```

maka pemeriksaan harus diarahkan ke sistem electrical.

Periksa:

- overload relay setting
- arus motor
- temperatur motor
- kemungkinan mechanical friction pada pump.

Contoh eskalasi kegagalan:

```text
bearing friction meningkat
↓
motor current naik
↓
overload relay trip
↓
motor stop
```

Dalam kasus ini trip justru **melindungi motor dari kerusakan yang lebih besar**.

---

### Kesimpulan Teknis

Interlock dan trip logic digunakan untuk **menghentikan equipment secara otomatis ketika kondisi berbahaya terdeteksi selama operasi**.

Struktur dasar trip logic:

```text
TRIP_ACTIVE =
trip_condition_1
OR trip_condition_2
OR trip_condition_3
```

Trip kemudian memutus logika run command:

```text
RUN_CMD = RUN_LOGIC
AND NOT TRIP_ACTIVE
```

Dengan struktur ini PLC dapat:

- memonitor kondisi proses secara terus-menerus
- menghentikan equipment sebelum kerusakan berkembang
- mencegah eskalasi kegagalan menjadi insiden keselamatan.

Interlock & trip logic merupakan **lapisan proteksi penting dalam sistem kontrol industri** yang bekerja setelah equipment mulai beroperasi.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
