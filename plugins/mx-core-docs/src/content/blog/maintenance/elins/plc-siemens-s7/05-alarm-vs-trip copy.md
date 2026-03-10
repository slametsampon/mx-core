---
title: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'alarm-logic',
    'trip-logic',
    'process-protection',
    'industrial-automation',
    'pump-control',
    'process-safety',
  ]
draft: false
summary: Artikel ini menjelaskan perbedaan alarm dan trip logic pada sistem PLC serta bagaimana menentukan batas kapan equipment harus berhenti. Menggunakan contoh motor–pump system, artikel menunjukkan bagaimana kondisi proses berubah secara bertahap sebelum mencapai kondisi berbahaya. PLC biasanya menggunakan proteksi bertingkat - alarm sebagai peringatan dini, high alarm sebagai indikasi kondisi mendekati batas aman, dan trip sebagai proteksi terakhir yang menghentikan equipment. Dengan pemisahan ini operator memiliki waktu untuk menstabilkan proses tanpa menyebabkan nuisance trip. Struktur logika ini penting untuk menjaga reliability operasi, perlindungan equipment, dan keselamatan proses industri.
---

# **_Artikel 5: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti_**

---

- [**_Artikel 5: Alarm vs Trip Logic — Menentukan Kapan Equipment Harus Berhenti_**](#artikel-5-alarm-vs-trip-logic--menentukan-kapan-equipment-harus-berhenti)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Pump sering trip terlalu cepat](#pump-sering-trip-terlalu-cepat)
    - [Pump tidak trip ketika kondisi sudah berbahaya](#pump-tidak-trip-ketika-kondisi-sudah-berbahaya)
    - [Operator menerima terlalu banyak alarm](#operator-menerima-terlalu-banyak-alarm)
  - [3. Physical Mechanism](#3-physical-mechanism)
    - [Tahapan Degradasi Kondisi Proses](#tahapan-degradasi-kondisi-proses)
    - [Hubungan Tahapan dengan Respon Sistem Kontrol](#hubungan-tahapan-dengan-respon-sistem-kontrol)
  - [4. Control Objective](#4-control-objective)
    - [1. Memberikan Peringatan Dini kepada Operator](#1-memberikan-peringatan-dini-kepada-operator)
    - [2. Memberikan Waktu untuk Koreksi Proses](#2-memberikan-waktu-untuk-koreksi-proses)
    - [3. Menghentikan Equipment Jika Kondisi Berbahaya](#3-menghentikan-equipment-jika-kondisi-berbahaya)
    - [4. Menjaga Stabilitas Operasi Plant](#4-menjaga-stabilitas-operasi-plant)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Low Pressure Alarm](#low-pressure-alarm)
    - [Low-Low Pressure Trip](#low-low-pressure-trip)
    - [Low Flow Alarm](#low-flow-alarm)
    - [High Temperature Trip](#high-temperature-trip)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Struktur Trip Logic](#struktur-trip-logic)
    - [Integrasi Trip dengan Run Command](#integrasi-trip-dengan-run-command)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Alarm Condition](#scenario-1--alarm-condition)
    - [Scenario 2 — High Alarm](#scenario-2--high-alarm)
    - [Scenario 3 — Trip Condition](#scenario-3--trip-condition)
    - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Identifikasi jenis alarm](#step-1--identifikasi-jenis-alarm)
    - [Step 2 — Verifikasi kondisi proses](#step-2--verifikasi-kondisi-proses)
    - [Step 3 — Periksa instrument](#step-3--periksa-instrument)
    - [Step 4 — Periksa konfigurasi setpoint](#step-4--periksa-konfigurasi-setpoint)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini masih menggunakan **motor–pump system** yang sama agar alur pembelajaran tetap konsisten.

Pump merupakan equipment yang sangat sensitif terhadap perubahan kondisi proses seperti:

- tekanan suction
- aliran fluida
- temperatur motor.

Selama operasi normal, kondisi proses jarang berubah secara tiba-tiba. Biasanya perubahan terjadi **secara bertahap** sebelum mencapai kondisi yang benar-benar berbahaya.

Komponen utama sistem:

- **Pump** — equipment hidraulik yang memindahkan fluida
- **Motor listrik** — penggerak mekanik pump
- **Pressure instrument** — memonitor tekanan proses
- **Flow instrument** — memonitor aliran fluida
- **Temperature switch** — memonitor temperatur motor
- **MCC motor starter** — sistem electrical untuk mengendalikan motor
- **PLC** — controller yang menjalankan alarm dan trip logic

Hubungan disiplin dalam sistem:

| Discipline      | Komponen                           |
| --------------- | ---------------------------------- |
| Mechanical      | pump, impeller, seal               |
| Electrical      | motor starter MCC                  |
| Instrumentation | pressure, flow, temperature sensor |
| Control         | PLC alarm & trip logic             |

Dalam sistem kontrol modern, PLC tidak hanya mengendalikan start dan stop equipment tetapi juga memonitor **kondisi operasi secara kontinu**.

Ketika kondisi proses mulai menyimpang, sistem kontrol memberikan respon bertingkat:

```text id="d6e2pq"
Process deviation
↓
Alarm
↓
High Alarm
↓
Trip
```

Struktur ini memungkinkan operator melakukan koreksi sebelum kondisi proses berkembang menjadi kegagalan equipment.

---

## 2. Operational Problem

Banyak masalah operasi di plant terjadi karena **perbedaan antara alarm dan trip tidak dirancang dengan benar**.

Beberapa masalah yang sering terjadi:

### Pump sering trip terlalu cepat

Jika trip setpoint terlalu dekat dengan kondisi normal, pump dapat berhenti walaupun kondisi proses masih bisa diperbaiki oleh operator.

Contoh:

```text id="p2p1hc"
pressure sedikit turun
↓
langsung memicu trip
↓
pump berhenti
```

Kondisi ini disebut **nuisance trip**.

---

### Pump tidak trip ketika kondisi sudah berbahaya

Jika setpoint trip terlalu tinggi, pump dapat terus beroperasi dalam kondisi yang merusak equipment.

Contoh:

```text id="x3o9ip"
pressure sangat rendah
↓
cavitation terjadi
↓
impeller rusak
↓
trip baru aktif
```

Dalam kondisi ini trip datang **terlambat**.

---

### Operator menerima terlalu banyak alarm

Jika sistem menghasilkan terlalu banyak alarm, operator akan kesulitan menentukan mana alarm yang benar-benar penting.

Hal ini dikenal sebagai **alarm flooding**.

Ketika alarm penting muncul, operator dapat mengabaikannya karena terlalu banyak alarm lain yang tidak kritis.

---

Kesalahan dalam menentukan **batas antara alarm dan trip** dapat menyebabkan:

- gangguan operasi
- kerusakan equipment
- peningkatan risiko keselamatan.

Karena itu sistem kontrol biasanya menggunakan **struktur proteksi bertingkat**.

---

## 3. Physical Mechanism

Perubahan kondisi proses pada pump biasanya **tidak terjadi secara instan**, tetapi berkembang secara bertahap sebelum mencapai kondisi yang benar-benar berbahaya.

Sebagai contoh, penurunan tekanan suction pada sistem pump dapat berkembang melalui beberapa tahap sebelum menyebabkan kerusakan serius.

✔ Mekanisme Penurunan Suction Pressure pada Pump

![Image](https://www.researchgate.net/publication/290749721/figure/fig1/AS%3A436064054714369%401480977180215/Suction-pressure-falling-below-vapor-pressure-causes-bubble-formation-3.png)

![Image](https://insights.globalspec.com/images/assets/400/12400/cavitation_diagram.png)

Rantai perubahan kondisi proses dapat dijelaskan sebagai berikut:

```text id="2n5myk"
suction pressure mulai turun
↓
flow ke pump berkurang
↓
NPSH margin mengecil
↓
gelembung uap mulai terbentuk
↓
cavitation ringan mulai terjadi
↓
getaran pump meningkat
↓
impeller mulai mengalami erosi
↓
kerusakan mekanis berkembang
```

Jika pump terus beroperasi dalam kondisi ini, kerusakan dapat berkembang menjadi kegagalan serius.

---

### Tahapan Degradasi Kondisi Proses

Perubahan kondisi proses biasanya dapat dibagi menjadi beberapa tahap.

| Stage   | Kondisi Proses         | Dampak Sistem       |
| ------- | ---------------------- | ------------------- |
| Stage 1 | pressure sedikit turun | sistem masih stabil |
| Stage 2 | pressure rendah        | getaran meningkat   |
| Stage 3 | pressure sangat rendah | cavitation berat    |

Pada **Stage 1**, pump masih dapat beroperasi secara normal walaupun kondisi mulai menyimpang dari kondisi optimal.

Pada **Stage 2**, kondisi sudah mendekati batas aman dan operator harus melakukan tindakan koreksi.

Pada **Stage 3**, kondisi sudah berbahaya dan equipment harus dihentikan untuk mencegah kerusakan.

---

### Hubungan Tahapan dengan Respon Sistem Kontrol

Karena perubahan kondisi terjadi secara bertahap, sistem kontrol biasanya dirancang dengan **beberapa level respon**.

```text id="wqf3c6"
Stage 1 → Alarm
Stage 2 → High Alarm
Stage 3 → Trip
```

Pendekatan ini memberikan **waktu bagi operator untuk menstabilkan proses** sebelum equipment dihentikan secara otomatis.

Jika sistem langsung trip pada Stage 1, maka operasi plant akan sering terganggu.

Sebaliknya, jika trip baru terjadi pada tahap akhir, kerusakan equipment mungkin sudah terjadi.

---

## 4. Control Objective

Pemisahan antara alarm dan trip memiliki tujuan penting dalam sistem kontrol proses.

---

### 1. Memberikan Peringatan Dini kepada Operator

Alarm memberikan informasi bahwa kondisi proses mulai menyimpang dari kondisi normal.

Contoh:

```text id="p0m2l7"
LOW_PRESS_ALARM = TRUE
```

Pump masih berjalan, tetapi operator harus memeriksa kondisi sistem.

---

### 2. Memberikan Waktu untuk Koreksi Proses

Ketika alarm muncul, operator dapat melakukan tindakan seperti:

- membuka valve
- meningkatkan supply fluida
- menstabilkan tekanan sistem.

Dengan demikian proses dapat kembali normal tanpa harus menghentikan equipment.

---

### 3. Menghentikan Equipment Jika Kondisi Berbahaya

Jika kondisi proses terus memburuk hingga melewati batas aman, sistem trip akan aktif.

```text id="h9m3h0"
LOW_LOW_PRESS_TRIP = TRUE
↓
RUN_CMD = FALSE
↓
motor stop
```

Trip berfungsi sebagai **proteksi terakhir untuk melindungi equipment dan sistem proses**.

---

### 4. Menjaga Stabilitas Operasi Plant

Dengan struktur alarm dan trip bertingkat, sistem kontrol dapat:

- menghindari nuisance trip
- memberi kesempatan operator melakukan koreksi
- tetap melindungi equipment dari kerusakan serius.

---

## 5. Instrument and Signal Mapping

Untuk membangun sistem **alarm dan trip bertingkat**, PLC membutuhkan sinyal instrument yang dapat mendeteksi perubahan kondisi proses pada pump.

Instrument tersebut biasanya dipasang pada titik proses yang kritis seperti:

- suction piping
- discharge piping
- motor housing
- flow line.

Instrument ini mengubah kondisi fisik proses menjadi **sinyal digital yang dapat diproses oleh PLC**.

✔ Arsitektur Sinyal Alarm & Trip Pump System

![Image](https://cdn.forumautomation.com/original/2X/a/a0195f995729ecc8d6fda4dfe0523c38ddfcced0.png)

Contoh sinyal yang digunakan dalam sistem alarm dan trip pump adalah sebagai berikut.

| Signal             | Source             | PLC Type | Function         |
| ------------------ | ------------------ | -------- | ---------------- |
| LOW_PRESS_ALARM    | pressure switch    | DI       | warning          |
| LOW_LOW_PRESS_TRIP | pressure switch    | DI       | equipment trip   |
| LOW_FLOW_ALARM     | flow switch        | DI       | warning          |
| HIGH_TEMP_TRIP     | temperature switch | DI       | motor protection |
| RUN_CMD            | PLC logic          | internal | run command      |
| MOTOR_CMD          | PLC output         | DO       | motor control    |

Dalam sistem ini, instrument biasanya memiliki **dua setpoint berbeda**:

1. setpoint alarm
2. setpoint trip.

Setpoint trip selalu berada pada kondisi **lebih ekstrem dibanding alarm**.

---

### Low Pressure Alarm

Pressure switch pertama digunakan sebagai **early warning**.

Ketika tekanan suction turun melewati batas pertama:

```text id="3zj8en"
LOW_PRESS_ALARM = TRUE
```

PLC akan mengaktifkan alarm di HMI.

Pump tetap berjalan, tetapi operator harus memeriksa kondisi sistem.

---

### Low-Low Pressure Trip

Pressure switch kedua digunakan sebagai **trip protection**.

Jika tekanan terus turun melewati batas aman:

```text id="vyl06p"
LOW_LOW_PRESS_TRIP = TRUE
```

PLC harus menghentikan pump untuk mencegah cavitation berat.

---

### Low Flow Alarm

Flow switch digunakan untuk mendeteksi jika aliran fluida melalui pump menurun.

Ketika flow turun:

```text id="9y5xoz"
LOW_FLOW_ALARM = TRUE
```

Hal ini dapat disebabkan oleh:

- blockage pada piping
- suction valve tidak terbuka penuh
- sistem downstream bermasalah.

Alarm memberi operator waktu untuk memperbaiki kondisi tersebut.

---

### High Temperature Trip

Temperature switch biasanya dipasang pada motor atau bearing housing.

Jika temperatur motor terlalu tinggi:

```text id="w5awrc"
HIGH_TEMP_TRIP = TRUE
```

PLC harus menghentikan motor untuk mencegah kerusakan pada winding motor.

---

## 6. Ladder Logic Implementation

Setelah sinyal instrument dipetakan, langkah berikutnya adalah membangun **struktur ladder logic yang memisahkan alarm dan trip**.

Tujuannya adalah memastikan bahwa:

- alarm hanya memberi peringatan
- trip menghentikan equipment.

---

✔ Struktur Alarm dan Trip Logic

![Image](https://cdn.automationforum.co/uploads/2023/08/plc-motor-2-729x1024.jpg)

![Image](https://control.com/uploads/articles/image37_29_5b.jpg)

Langkah pertama adalah membuat logika alarm.

```text id="fwy8bq"
ALARM_ACTIVE =
LOW_PRESS_ALARM
OR LOW_FLOW_ALARM
```

Jika salah satu kondisi alarm aktif:

```text id="3k7poc"
ALARM_ACTIVE = TRUE
```

PLC akan mengirim alarm ke HMI tetapi **tidak menghentikan pump**.

---

### Struktur Trip Logic

Logika trip dibuat terpisah dari alarm.

```text id="pbns7r"
TRIP_ACTIVE =
LOW_LOW_PRESS_TRIP
OR HIGH_TEMP_TRIP
```

Jika salah satu trip condition aktif:

```text id="kl0bqa"
TRIP_ACTIVE = TRUE
```

Trip kemudian memutus run command.

---

### Integrasi Trip dengan Run Command

```text id="gi2rmr"
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
AND PERMISSIVE_OK
AND NOT TRIP_ACTIVE
```

Jika trip aktif:

```text id="dbx4f3"
TRIP_ACTIVE = TRUE
↓
RUN_CMD = FALSE
↓
motor stop
```

Dengan struktur ini PLC dapat membedakan antara **peringatan proses dan kondisi proteksi equipment**.

---

## 7. System Response

Setelah logika **ALARM_ACTIVE** dan **TRIP_ACTIVE** dibangun di PLC, sistem kontrol akan merespon perubahan kondisi proses secara bertahap. PLC terus memonitor sinyal instrument pada setiap **scan cycle**, dan respon sistem bergantung pada level deviasi proses.

Secara umum struktur respon kontrol dapat digambarkan sebagai berikut:

```text
Normal Operation
↓
Alarm
↓
High Alarm
↓
Trip
```

Setiap level memiliki tujuan yang berbeda dalam menjaga stabilitas proses dan melindungi equipment.

---

✔ Respon Sistem pada Alarm dan Trip Condition

![Image](https://ars.els-cdn.com/content/image/3-s2.0-B9780128195048000147-f14-33-9780128195048.jpg)

---

### Scenario 1 — Alarm Condition

Kondisi proses mulai menyimpang dari kondisi normal tetapi masih berada dalam batas aman.

Contoh:

```text
LOW_PRESS_ALARM = TRUE
LOW_LOW_PRESS_TRIP = FALSE
```

PLC mengevaluasi logika:

```text
ALARM_ACTIVE = TRUE
TRIP_ACTIVE = FALSE
```

Respon sistem:

```text
alarm muncul di HMI
↓
operator menerima peringatan
↓
pump tetap running
```

Operator harus memeriksa kondisi proses, misalnya:

- memastikan suction valve terbuka penuh
- memeriksa level tank upstream
- memeriksa kondisi flow system.

Alarm bertujuan memberikan **peringatan dini sebelum kondisi berkembang menjadi berbahaya**.

---

### Scenario 2 — High Alarm

Jika kondisi proses terus memburuk, alarm dapat tetap aktif atau meningkat menjadi **high alarm level**.

Contoh kondisi:

```text
pressure semakin turun
flow mulai tidak stabil
```

PLC masih menghasilkan:

```text
ALARM_ACTIVE = TRUE
TRIP_ACTIVE = FALSE
```

Respon sistem:

```text
alarm tetap aktif
↓
operator harus segera melakukan tindakan koreksi
```

Contoh tindakan operator:

- membuka valve
- menstabilkan tekanan sistem
- mengurangi beban pump.

Pada tahap ini equipment masih berjalan, tetapi operasi sudah berada **dekat dengan batas aman**.

---

### Scenario 3 — Trip Condition

Jika kondisi proses melewati batas aman, trip akan aktif.

Contoh:

```text
LOW_LOW_PRESS_TRIP = TRUE
```

PLC mengevaluasi logika:

```text
TRIP_ACTIVE = TRUE
```

Rung RUN_CMD menjadi:

```text
RUN_CMD = FALSE
```

PLC mematikan output motor.

Respon sistem:

```text
MOTOR_CMD = OFF
↓
kontaktor MCC de-energize
↓
motor stop
↓
pump berhenti
```

Trip melindungi equipment dari kondisi yang dapat menyebabkan kerusakan seperti:

- cavitation berat
- overheating motor
- loss of flow.

---

Dengan struktur alarm dan trip bertingkat, sistem kontrol dapat:

- memberikan peringatan dini kepada operator
- memungkinkan koreksi proses sebelum shutdown
- menghentikan equipment hanya ketika kondisi benar-benar berbahaya.

---

### 8. Troubleshooting Guide

Ketika alarm atau trip muncul secara tidak normal, engineer harus menentukan **apakah kondisi tersebut benar-benar disebabkan oleh proses atau akibat kesalahan instrument dan konfigurasi sistem kontrol**.

Pendekatan troubleshooting harus mengikuti urutan berikut:

```text
Process Condition
↓
Instrument Signal
↓
Alarm / Trip Logic (PLC)
↓
Operator Response
```

Metode ini membantu engineer menghindari kesalahan diagnosa yang dapat menyebabkan equipment berhenti tanpa alasan yang jelas.

---

✔ Alur Diagnosa Alarm & Trip

![Image](https://www.researchgate.net/publication/369643339/figure/fig3/AS%3A11431281132232676%401680205985600/PLC-Ladder-diagram-program-for-alarm-activating-and-deactivating-procedures-for-the.png)

---

### Step 1 — Identifikasi jenis alarm

Langkah pertama adalah menentukan **jenis alarm yang muncul**.

Engineer harus melihat sinyal berikut di PLC atau HMI:

```text
LOW_PRESS_ALARM
LOW_LOW_PRESS_TRIP
LOW_FLOW_ALARM
HIGH_TEMP_TRIP
```

Jika sinyal berasal dari:

```text
LOW_PRESS_ALARM
```

maka sistem hanya memberikan **peringatan proses**.

Namun jika sinyal berasal dari:

```text
LOW_LOW_PRESS_TRIP
```

maka pump dihentikan oleh **proteksi trip**.

Mengetahui jenis sinyal sangat penting untuk menentukan langkah investigasi berikutnya.

---

### Step 2 — Verifikasi kondisi proses

Setelah mengetahui sumber alarm atau trip, engineer harus memverifikasi kondisi proses di lapangan.

Contoh pemeriksaan:

**Low pressure alarm**

Periksa:

- tekanan suction pump
- level tank upstream
- kondisi suction valve.

---

**Low flow alarm**

Periksa:

- kemungkinan blockage pada piping
- kondisi filter atau strainer
- kondisi valve downstream.

Jika kondisi proses memang abnormal, alarm atau trip tersebut merupakan **respon sistem yang benar**.

---

### Step 3 — Periksa instrument

Jika alarm muncul tetapi kondisi proses normal, kemungkinan masalah berada pada instrument.

Beberapa penyebab umum:

- pressure switch mengalami drift
- sensor rusak
- impulse line tersumbat
- wiring instrument longgar.

Kesalahan instrument dapat menyebabkan **false alarm atau false trip**.

---

### Step 4 — Periksa konfigurasi setpoint

Jika alarm sering muncul tanpa sebab proses yang jelas, engineer harus memeriksa **setpoint konfigurasi alarm dan trip**.

Beberapa kesalahan yang sering terjadi:

- setpoint alarm terlalu dekat dengan kondisi normal
- jarak antara alarm dan trip terlalu kecil
- setpoint tidak sesuai dengan kondisi proses aktual.

Contoh konfigurasi yang baik:

```text
Normal Pressure   = 3.0 bar
Alarm Setpoint    = 2.5 bar
Trip Setpoint     = 2.0 bar
```

Dengan jarak setpoint yang cukup, operator memiliki waktu untuk memperbaiki kondisi proses sebelum trip terjadi.

---

### Kesimpulan Teknis

Alarm dan trip memiliki fungsi yang berbeda dalam sistem kontrol proses.

Struktur proteksi bertingkat dapat digambarkan sebagai berikut:

```text
Alarm
↓
High Alarm
↓
Trip
```

Alarm memberikan **peringatan dini kepada operator** agar kondisi proses dapat diperbaiki sebelum mencapai batas aman.

Trip digunakan sebagai **proteksi terakhir untuk menghentikan equipment ketika kondisi berbahaya terdeteksi**.

Dengan desain alarm dan trip yang tepat, sistem kontrol dapat:

- mengurangi nuisance trip
- meningkatkan stabilitas operasi
- melindungi equipment dan keselamatan proses.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
