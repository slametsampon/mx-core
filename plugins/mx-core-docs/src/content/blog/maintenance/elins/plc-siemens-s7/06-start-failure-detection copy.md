---
title: Start Failure Detection — Mendeteksi Equipment Gagal Start
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'start-failure-detection',
    'motor-control',
    'ladder-diagram',
    'industrial-automation',
    'pump-control',
    'plc-troubleshooting',
  ]
draft: false
summary: Artikel ini membahas Start Failure Detection pada sistem PLC untuk mendeteksi ketika equipment gagal start walaupun perintah sudah diberikan. Menggunakan contoh motor–pump system, artikel menjelaskan bagaimana PLC tidak hanya mengirim start command tetapi juga memverifikasi bahwa motor benar-benar beroperasi melalui feedback contact dari MCC. Jika feedback tidak muncul dalam waktu tertentu setelah RUN_CMD aktif, PLC menghasilkan start failure alarm. Mekanisme ini membantu engineer mengidentifikasi kegagalan pada motor starter, sistem electrical, atau masalah mekanis seperti pump macet. Start failure detection merupakan bagian penting dalam sistem kontrol untuk memastikan command kontrol menghasilkan respon fisik yang benar pada equipment.
---

# **_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**

---

- [**_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**](#artikel-6-start-failure-detection--mendeteksi-equipment-gagal-start)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
  - [3. Physical Mechanism](#3-physical-mechanism)
    - [Mekanisme Ketika Motor Gagal Start](#mekanisme-ketika-motor-gagal-start)
    - [Peran Feedback Contact](#peran-feedback-contact)
  - [4. Control Objective](#4-control-objective)
    - [1. Memverifikasi Keberhasilan Start Equipment](#1-memverifikasi-keberhasilan-start-equipment)
    - [2. Mendeteksi Kegagalan Sistem Electrical](#2-mendeteksi-kegagalan-sistem-electrical)
    - [3. Mendeteksi Masalah Mechanical](#3-mendeteksi-masalah-mechanical)
    - [4. Memberi Alarm kepada Operator](#4-memberi-alarm-kepada-operator)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Start Command Signal](#start-command-signal)
    - [Motor Feedback Signal](#motor-feedback-signal)
    - [Hubungan Command dan Feedback](#hubungan-command-dan-feedback)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Step 1 — Start Timer ketika RUN\_CMD aktif](#step-1--start-timer-ketika-run_cmd-aktif)
    - [Step 2 — Menunggu Feedback Motor](#step-2--menunggu-feedback-motor)
    - [Step 3 — Evaluasi Start Failure](#step-3--evaluasi-start-failure)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Start Normal](#scenario-1--start-normal)
    - [Scenario 2 — Start Failure](#scenario-2--start-failure)
    - [Scenario 3 — Feedback Delay](#scenario-3--feedback-delay)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Periksa Motor Starter di MCC](#step-1--periksa-motor-starter-di-mcc)
    - [Step 2 — Periksa Motor Feedback Contact](#step-2--periksa-motor-feedback-contact)
    - [Step 3 — Periksa Timer Setting](#step-3--periksa-timer-setting)
    - [Step 4 — Periksa Mechanical System](#step-4--periksa-mechanical-system)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini masih menggunakan **motor–pump system** sebagai konteks utama agar konsisten dengan artikel sebelumnya.

Pump merupakan equipment yang sering **start dan stop berulang** dalam operasi plant, misalnya pada:

- transfer pump
- utility water pump
- cooling water pump.

Ketika operator memberikan perintah **START**, PLC tidak hanya mengirim command ke motor starter tetapi juga harus memverifikasi bahwa **equipment benar-benar mulai beroperasi**.

Komponen sistem:

- **Pump** — rotating equipment yang memindahkan fluida
- **Motor listrik** — penggerak pump
- **MCC motor starter** — sistem electrical untuk menghidupkan motor
- **Motor auxiliary feedback contact** — memberikan status running
- **PLC** — controller yang menjalankan start logic dan monitoring
- **Operator HMI** — interface operator untuk memonitor status equipment

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen                      |
| --------------- | ----------------------------- |
| Mechanical      | pump & rotating assembly      |
| Electrical      | motor starter, overload relay |
| Instrumentation | auxiliary feedback contact    |
| Control         | PLC start logic & monitoring  |

Secara normal, urutan start motor adalah:

```text id="s7k7px"
START command
↓
PLC mengaktifkan MOTOR_CMD
↓
kontaktor MCC energize
↓
motor mulai berputar
↓
auxiliary contact berubah status
↓
PLC menerima MOTOR_FB
```

Feedback ini penting untuk memastikan bahwa **command kontrol benar-benar menghasilkan respon fisik pada equipment**.

---

## 2. Operational Problem

Masalah yang sering terjadi di plant adalah kondisi ketika **perintah start diberikan tetapi equipment tidak benar-benar berjalan**.

Contoh situasi yang sering terjadi:

Operator menekan tombol START di HMI.

```text id="4lsp2o"
START_PB = ON
RUN_CMD = TRUE
```

Namun motor tidak berputar.

Beberapa penyebab umum:

- overload relay trip
- kontaktor MCC tidak energize
- motor protection relay aktif
- supply MCC tidak tersedia.

Dalam beberapa kasus, sistem kontrol hanya memonitor **status command**, bukan **status equipment sebenarnya**.

Akibatnya operator melihat kondisi seperti:

```text id="e6sh3c"
HMI menunjukkan RUNNING
↓
motor sebenarnya tidak berputar
↓
pump tidak menghasilkan flow
```

Kondisi ini berbahaya karena:

- operator menganggap equipment sudah running
- proses tidak berjalan sesuai rencana
- troubleshooting menjadi lebih sulit.

Untuk menghindari kondisi ini, sistem kontrol harus memiliki **start failure detection**.

Prinsipnya adalah:

```text id="s3xv8r"
command diberikan
↓
feedback harus muncul
↓
jika tidak muncul
→ start failure alarm
```

Dengan logika ini PLC dapat mendeteksi bahwa **motor gagal start walaupun command sudah diberikan**.

---

## 3. Physical Mechanism

Ketika operator memberikan **perintah start**, sistem electrical dan mechanical harus bekerja secara berurutan agar motor benar-benar mulai berputar. Jika salah satu komponen gagal, maka **motor tidak akan menghasilkan putaran walaupun PLC telah mengirim command**.

Untuk memahami start failure detection, engineer harus memahami **rantai mekanisme fisik dari command PLC hingga motor benar-benar berputar**.

✔ Rantai Mekanisme Start Motor

![Image](https://www.ato.com/Content/Images/uploaded/simulation-wiring-diagram.jpg)

Urutan mekanisme start motor secara normal adalah:

```text
RUN_CMD aktif
↓
PLC mengaktifkan output MOTOR_CMD
↓
coil kontaktor MCC energize
↓
kontak utama kontaktor menutup
↓
supply listrik mengalir ke motor
↓
motor mulai berputar
↓
auxiliary contact berubah status
↓
PLC menerima MOTOR_FB
```

Perubahan status **auxiliary contact** inilah yang menjadi indikasi bahwa motor benar-benar running.

---

### Mekanisme Ketika Motor Gagal Start

Jika salah satu komponen dalam rantai ini gagal, maka motor tidak akan berputar walaupun PLC telah mengirim command.

Contoh kegagalan:

```text
RUN_CMD aktif
↓
PLC mengirim MOTOR_CMD
↓
kontaktor tidak energize
↓
supply listrik tidak masuk ke motor
↓
motor tidak berputar
↓
auxiliary contact tetap OFF
↓
PLC tidak menerima feedback
```

Beberapa penyebab kegagalan ini antara lain:

| Penyebab               | Mekanisme                            |
| ---------------------- | ------------------------------------ |
| Overload relay trip    | coil kontaktor tidak mendapat supply |
| Kontaktor coil rusak   | kontaktor tidak energize             |
| Motor protection aktif | MCC memblok start                    |
| Mechanical jam         | motor tidak bisa berputar            |

Dalam kondisi ini PLC melihat bahwa:

```text
RUN_CMD = TRUE
MOTOR_FB = FALSE
```

Kondisi ini menandakan **command diberikan tetapi equipment tidak merespon**.

---

### Peran Feedback Contact

Auxiliary contact pada MCC berfungsi sebagai **indikasi status motor running**.

✔ Mekanisme Feedback Motor

![Image](https://storage.googleapis.com/production-bigrock-v1-0-1/511/1189511/LeXNjP71/b6ab7520d07b45098f5156381cdd423f)

![Image](https://control.com/uploads/articles/image17_29_5b.jpg)

Ketika kontaktor energize:

```text
kontak utama menutup
↓
motor menerima supply listrik
↓
auxiliary contact berubah status
↓
MOTOR_FB = TRUE
```

PLC membaca sinyal ini sebagai **konfirmasi bahwa motor benar-benar running**.

Jika feedback tidak muncul, PLC dapat mendeteksi bahwa **start command gagal dieksekusi oleh sistem electrical atau mechanical**.

---

## 4. Control Objective

Start failure detection dirancang untuk memastikan bahwa **perintah start menghasilkan respon fisik yang benar pada equipment**.

Tujuan utama logika ini adalah sebagai berikut.

---

### 1. Memverifikasi Keberhasilan Start Equipment

PLC harus memastikan bahwa setelah command diberikan:

```text
RUN_CMD = TRUE
```

equipment benar-benar mulai beroperasi.

Hal ini diverifikasi melalui:

```text
MOTOR_FB = TRUE
```

---

### 2. Mendeteksi Kegagalan Sistem Electrical

Jika PLC mengirim command tetapi motor tidak berjalan, kemungkinan masalah berada pada:

- kontaktor MCC
- overload relay
- motor protection system.

Start failure detection membantu engineer mengidentifikasi masalah ini dengan cepat.

---

### 3. Mendeteksi Masalah Mechanical

Kegagalan start tidak selalu berasal dari sistem electrical.

Contoh masalah mechanical:

```text
pump shaft macet
↓
motor tidak dapat berputar
↓
motor starter gagal start
```

Dalam kondisi ini PLC tetap mendeteksi bahwa **feedback tidak muncul setelah command diberikan**.

---

### 4. Memberi Alarm kepada Operator

Jika motor gagal start, PLC menghasilkan alarm:

```text
START_FAIL_ALARM = TRUE
```

Alarm ini memberi informasi kepada operator bahwa equipment **tidak berhasil start walaupun command sudah diberikan**.

---

## 5. Instrument and Signal Mapping

Untuk membangun **start failure detection**, PLC membutuhkan dua jenis informasi utama:

1. **command signal** — perintah start yang diberikan oleh sistem kontrol
2. **feedback signal** — indikasi bahwa equipment benar-benar berjalan.

Tanpa feedback dari equipment, PLC tidak dapat mengetahui apakah motor benar-benar beroperasi setelah command diberikan.

✔ Arsitektur Sinyal Start Monitoring

![Image](https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-3-031-85194-0_6/MediaObjects/634647_1_En_6_Fig42_HTML.png)

Mapping sinyal yang digunakan dalam sistem start monitoring dapat digambarkan sebagai berikut.

| Signal           | Source                | PLC Type | Function               |
| ---------------- | --------------------- | -------- | ---------------------- |
| START_PB         | push button           | DI       | start command          |
| STOP_PB          | push button           | DI       | stop command           |
| MOTOR_FB         | MCC auxiliary contact | DI       | motor running feedback |
| RUN_CMD          | PLC internal          | internal | run logic              |
| MOTOR_CMD        | PLC output            | DO       | motor start command    |
| START_FAIL_ALARM | PLC logic             | internal | alarm signal           |

Dalam sistem ini PLC membandingkan **command yang diberikan dengan respon equipment**.

---

### Start Command Signal

Start command berasal dari **operator atau sistem kontrol**.

Ketika operator menekan tombol start:

```text id="qnb5oe"
START_PB = TRUE
```

PLC mengevaluasi logika dan menghasilkan:

```text id="y1u3er"
RUN_CMD = TRUE
```

RUN_CMD kemudian mengaktifkan output:

```text id="qxfkt7"
MOTOR_CMD = TRUE
```

Output ini mengirim perintah ke MCC untuk menyalakan motor.

---

### Motor Feedback Signal

Motor feedback berasal dari **auxiliary contact pada MCC contactor**.

Ketika motor benar-benar running:

```text id="f0zq3u"
MOTOR_FB = TRUE
```

Signal ini dikirim ke PLC sebagai konfirmasi bahwa motor telah berhasil start.

Jika motor tidak berputar maka:

```text id="8qsb4m"
MOTOR_FB = FALSE
```

PLC akan mendeteksi bahwa **command tidak menghasilkan respon equipment**.

---

### Hubungan Command dan Feedback

Start failure detection bekerja dengan membandingkan dua kondisi berikut:

```text id="u1kg19"
RUN_CMD
MOTOR_FB
```

Dalam kondisi normal:

```text id="5d8r9q"
RUN_CMD = TRUE
MOTOR_FB = TRUE
```

Jika motor gagal start:

```text id="q1y9bh"
RUN_CMD = TRUE
MOTOR_FB = FALSE
```

Kondisi ini menjadi indikasi bahwa **equipment gagal start**.

---

## 6. Ladder Logic Implementation

Setelah sinyal dipetakan, langkah berikutnya adalah membuat **logika ladder yang mendeteksi kegagalan start**.

Logika ini biasanya menggunakan **timer** untuk memberi waktu bagi motor mencapai kondisi running.

---

✔ Struktur Start Failure Detection

![Image](https://cdn.automationforum.co/uploads/2023/08/plc-motor-2-scaled.jpg)

Prinsip dasar logika adalah sebagai berikut.

### Step 1 — Start Timer ketika RUN_CMD aktif

```text id="5yffr1"
IF RUN_CMD = TRUE
START TIMER
```

Timer mulai menghitung waktu sejak perintah start diberikan.

---

### Step 2 — Menunggu Feedback Motor

PLC menunggu sinyal berikut:

```text id="se6ak7"
MOTOR_FB = TRUE
```

Jika feedback muncul sebelum timer selesai, maka:

```text id="v2vh47"
motor berhasil start
timer reset
```

---

### Step 3 — Evaluasi Start Failure

Jika timer selesai tetapi feedback tidak muncul:

```text id="8yq1tf"
TIMER_DONE = TRUE
AND MOTOR_FB = FALSE
```

Maka PLC menghasilkan alarm:

```text id="6ak6pe"
START_FAIL_ALARM = TRUE
```

Alarm ini memberi tahu operator bahwa **motor gagal start walaupun command sudah diberikan**.

---

## 7. System Response

Setelah logika **Start Failure Detection** diterapkan, PLC akan memonitor hubungan antara **RUN_CMD**, **MOTOR_CMD**, dan **MOTOR_FB** selama proses start equipment.

Setiap kali operator memberikan perintah start, PLC menjalankan proses berikut:

```text
RUN_CMD aktif
↓
timer start monitoring
↓
menunggu MOTOR_FB
↓
evaluasi apakah start berhasil
```

Respon sistem bergantung pada apakah **feedback motor muncul dalam waktu yang ditentukan**.

---

✔ Respon Sistem pada Start Monitoring

![Image](https://control.com/uploads/articles/image24_29_5b.jpg)

---

### Scenario 1 — Start Normal

Kondisi normal ketika motor berhasil start.

Urutan sistem:

```text
START_PB = TRUE
↓
RUN_CMD = TRUE
↓
MOTOR_CMD = TRUE
↓
kontaktor MCC energize
↓
motor mulai berputar
↓
MOTOR_FB = TRUE
```

PLC menerima feedback sebelum timer selesai.

Evaluasi logika:

```text
MOTOR_FB = TRUE
↓
timer reset
↓
START_FAIL_ALARM = FALSE
```

Respon sistem:

```text
motor running normal
pump menghasilkan flow
status RUNNING ditampilkan di HMI
```

Dalam kondisi ini tidak ada alarm karena command berhasil dieksekusi.

---

### Scenario 2 — Start Failure

Jika motor gagal start setelah command diberikan.

Urutan kejadian:

```text
START_PB = TRUE
↓
RUN_CMD = TRUE
↓
MOTOR_CMD = TRUE
↓
kontaktor gagal energize
↓
motor tidak berputar
↓
MOTOR_FB = FALSE
```

PLC menunggu feedback hingga timer selesai.

Evaluasi logika:

```text
TIMER_DONE = TRUE
AND MOTOR_FB = FALSE
```

Hasil:

```text
START_FAIL_ALARM = TRUE
```

Respon sistem:

```text
alarm muncul di HMI
operator diberi notifikasi start failure
motor tetap OFF
```

Alarm ini menunjukkan bahwa **command start tidak menghasilkan respon equipment**.

---

### Scenario 3 — Feedback Delay

Pada beberapa equipment, motor membutuhkan waktu tertentu untuk mencapai kecepatan operasi.

Contoh:

- motor berdaya besar
- pump dengan inertia tinggi
- sistem dengan soft starter atau VFD.

Dalam kondisi ini feedback mungkin muncul **beberapa detik setelah start command**.

Urutan kejadian:

```text
RUN_CMD = TRUE
↓
motor mulai akselerasi
↓
beberapa detik kemudian
↓
MOTOR_FB = TRUE
```

Untuk menghindari **false start failure alarm**, timer biasanya diset:

```text
3 – 10 detik
```

Jika feedback muncul sebelum timer selesai:

```text
START_FAIL_ALARM = FALSE
```

Sistem menganggap start berhasil.

---

Dengan mekanisme ini PLC dapat membedakan antara:

| Kondisi        | Respon Sistem    |
| -------------- | ---------------- |
| Start normal   | motor running    |
| Start failure  | start fail alarm |
| Feedback delay | timer menunggu   |

Logika ini membantu memastikan bahwa **command kontrol benar-benar menghasilkan operasi equipment yang diharapkan**.

---

## 8. Troubleshooting Guide

Ketika **START_FAIL_ALARM** muncul, engineer harus menentukan **di bagian mana rantai start motor terputus**. Troubleshooting harus mengikuti urutan energi dan sinyal dari PLC hingga mechanical equipment.

Rantai start motor dapat digambarkan sebagai berikut:

```text
PLC Command
↓
MCC Motor Starter
↓
Motor Rotation
↓
Motor Feedback Contact
↓
PLC Monitoring
```

Jika salah satu tahap gagal, PLC akan mendeteksi bahwa:

```text
RUN_CMD = TRUE
MOTOR_FB = FALSE
```

dan menghasilkan **start failure alarm**.

---

✔ Alur Diagnosa Start Failure

![Image](https://img.viox.com/Star-delta-starter-troubleshooting-flowchart-for-diagnosing-motor-starting-failures.webp)

![Image](https://www.researchgate.net/publication/272667342/figure/fig1/AS%3A610388534116352%401522539375325/Motor-repair-decision-flowchart.png)

---

### Step 1 — Periksa Motor Starter di MCC

Langkah pertama adalah memverifikasi apakah **kontaktor MCC benar-benar energize** ketika PLC mengirim command.

Periksa:

- apakah coil kontaktor menerima tegangan
- apakah kontaktor menarik (pull-in)
- apakah overload relay dalam kondisi normal.

Jika kontaktor tidak energize, kemungkinan penyebabnya adalah:

- overload relay trip
- motor protection relay aktif
- coil kontaktor rusak
- supply MCC tidak tersedia.

Dalam kondisi ini motor tidak akan menerima supply listrik.

---

### Step 2 — Periksa Motor Feedback Contact

Jika motor sebenarnya running tetapi PLC tetap menunjukkan **start failure**, kemungkinan masalah berada pada feedback signal.

Periksa:

- auxiliary contact MCC
- wiring feedback menuju PLC
- input module PLC.

Kondisi yang sering terjadi:

```text
motor running
↓
auxiliary contact tidak berubah status
↓
PLC membaca MOTOR_FB = FALSE
↓
start failure alarm muncul
```

Masalah ini sering disebabkan oleh **auxiliary contact yang rusak atau wiring yang longgar**.

---

### Step 3 — Periksa Timer Setting

Jika timer monitoring terlalu pendek, PLC dapat menghasilkan **false start failure alarm**.

Contoh:

Motor membutuhkan waktu 5 detik untuk mencapai kondisi running.

Namun timer diset:

```text
2 detik
```

Akibatnya:

```text
timer selesai
↓
feedback belum muncul
↓
start failure alarm
```

Karena itu timer harus disesuaikan dengan **karakteristik start equipment**.

---

### Step 4 — Periksa Mechanical System

Jika sistem electrical normal tetapi motor tetap tidak dapat berputar, kemungkinan terdapat masalah mechanical.

Beberapa kemungkinan:

- pump shaft macet
- bearing pump rusak
- coupling jam
- impeller tersumbat.

Contoh mekanisme kegagalan:

```text
bearing pump rusak
↓
friction meningkat
↓
motor tidak mampu berputar
↓
motor gagal start
↓
MOTOR_FB tidak muncul
```

Dalam kasus ini start failure alarm justru membantu **mendeteksi masalah mechanical pada tahap awal**.

---

### Kesimpulan Teknis

Start failure detection memastikan bahwa **perintah start benar-benar menghasilkan operasi equipment**.

Struktur dasar logika:

```text
RUN_CMD aktif
↓
timer monitoring start
↓
menunggu MOTOR_FB
↓
jika feedback tidak muncul
→ START_FAIL_ALARM

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
```
