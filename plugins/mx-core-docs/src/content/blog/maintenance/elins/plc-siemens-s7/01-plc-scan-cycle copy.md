---
title: PLC Scan Cycle & Signal Flow dalam Control Equipment
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'ladder-diagram',
    'industrial-automation',
    'motor-control',
    'pump-control',
    'plc-scan-cycle',
    'control-system-troubleshooting',
  ]
draft: false
summary: Artikel ini menjelaskan **PLC Scan Cycle dan alur sinyal kontrol pada equipment industri** menggunakan contoh **motor–pump system**. Fokus utama adalah memahami bagaimana sinyal dari field device diproses oleh PLC melalui tiga tahap utama - **input scan, program execution, dan output update**. Dengan memahami siklus ini, engineer dapat menentukan titik kegagalan ketika equipment tidak merespon perintah kontrol. Artikel ini juga menunjukkan hubungan antara **sinyal instrument, ladder logic, dan respon equipment electrical**. Pemahaman scan cycle menjadi dasar troubleshooting sistem kontrol industri sebelum mempelajari logika PLC yang lebih kompleks seperti permissive, interlock, dan sequence control.
---

# **_Artikel 1: PLC Scan Cycle & Signal Flow dalam Control Equipment_**

---

- [**_Artikel 1: PLC Scan Cycle \& Signal Flow dalam Control Equipment_**](#artikel-1-plc-scan-cycle--signal-flow-dalam-control-equipment)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
  - [3. Physical Mechanism](#3-physical-mechanism)
  - [4. Control Objective](#4-control-objective)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
  - [7. System Response](#7-system-response)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
  - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel pertama menggunakan **motor–pump system sederhana** sebagai konteks kontrol. Sistem ini sangat umum ditemukan pada berbagai fasilitas industri seperti:

- cooling water pump
- utility water pump
- transfer pump

Walaupun sederhana, sistem ini mewakili struktur kontrol dasar yang terdapat pada hampir semua **equipment motor-driven** di plant.

Komponen utama sistem:

- **Motor listrik** – penggerak mekanik pump
- **Pump** – equipment proses yang memindahkan fluida
- **MCC motor starter** – perangkat electrical untuk start/stop motor
- **Start / Stop push button** – interface operator
- **Motor auxiliary feedback contact** – konfirmasi motor running
- **PLC** – controller yang menjalankan logic ladder

Hubungan antar disiplin dalam sistem ini:

| Discipline      | Komponen                   |
| --------------- | -------------------------- |
| Mechanical      | pump                       |
| Electrical      | MCC motor starter          |
| Instrumentation | auxiliary feedback contact |
| Control         | PLC ladder logic           |

Secara sistem kontrol, PLC berfungsi sebagai **penghubung antara sinyal operator dan equipment electrical**.

Alur kontrol dasar:

```
Operator Command
↓
PLC Input
↓
Ladder Logic
↓
PLC Output
↓
Motor Starter (MCC)
↓
Pump Running
```

PLC tidak langsung menggerakkan motor. PLC hanya memberikan **command listrik ke MCC**, kemudian MCC yang mengenergize kontaktor motor.

---

## 2. Operational Problem

Masalah yang sering ditemui di lapangan adalah:

**Motor tidak start walaupun tombol start sudah ditekan.**

Operator biasanya melihat kondisi berikut:

- lampu indikator start menyala
- HMI menunjukkan start command aktif
- tetapi motor tidak berputar.

Dalam kondisi seperti ini engineer harus menjawab pertanyaan penting:

> Di bagian mana sinyal kontrol berhenti?

Kemungkinan titik kegagalan dapat terjadi pada beberapa bagian sistem:

| Area              | Kemungkinan masalah                   |
| ----------------- | ------------------------------------- |
| Field device      | push button rusak                     |
| PLC input         | input module tidak membaca sinyal     |
| PLC logic         | rung ladder tidak menghasilkan output |
| PLC output        | output module tidak aktif             |
| Electrical system | kontaktor MCC tidak energize          |

Tanpa memahami **alur pemrosesan sinyal dalam PLC**, engineer sering melakukan troubleshooting secara acak.

Padahal PLC selalu memproses sistem kontrol melalui mekanisme yang sangat terstruktur yaitu **scan cycle**.

Memahami scan cycle memungkinkan engineer menentukan secara cepat:

- apakah masalah berada di **field device**
- di **PLC logic**
- atau di **equipment electrical**

---

## 3. Physical Mechanism

Mekanisme fisik aliran sinyal kontrol dalam sistem motor–pump dimulai dari **aksi operator** dan berakhir pada **pergerakan mekanik motor**. Walaupun PLC bekerja secara digital, rantai kontrol ini tetap melibatkan interaksi antara **perangkat mekanik, listrik, dan logika kontrol**.

✔ Alur Fisik Sinyal Kontrol

![Image](https://www.researchgate.net/publication/378749198/figure/fig1/AS%3A11431281227735712%401709728899226/PLC-Motor-control-circuit.ppm)

![Image](https://cdn.forumautomation.com/original/2X/e/e7088f178df93338d16b49f1c60553cb507f52ef.png)

Urutan mekanisme kontrol secara fisik adalah sebagai berikut:

```text
Operator menekan START push button
↓
Kontak push button menutup
↓
Digital input PLC berubah status
↓
PLC membaca input pada tahap input scan
↓
Program ladder dieksekusi
↓
PLC mengaktifkan output module
↓
Kontaktor MCC energize
↓
Motor menerima supply listrik
↓
Motor mulai berputar
↓
Auxiliary contact berubah status
↓
PLC menerima motor running feedback
```

Setiap langkah dalam rantai ini merupakan **hubungan sebab–akibat antar disiplin sistem**.

| Tahap                   | Domain Sistem      | Mekanisme                       |
| ----------------------- | ------------------ | ------------------------------- |
| Operator menekan PB     | Human interface    | kontak mekanik berubah          |
| Input PLC aktif         | Instrumentation    | sinyal digital masuk            |
| Logic ladder dieksekusi | Control            | keputusan logika                |
| Output PLC aktif        | Control/Electrical | sinyal ke MCC                   |
| Kontaktor energize      | Electrical         | supply motor terhubung          |
| Motor berputar          | Mechanical         | energi listrik → energi mekanik |

Jika salah satu tahap gagal maka motor tidak akan start.

Contoh kegagalan pada rantai kontrol:

| Titik Kegagalan     | Dampak                       |
| ------------------- | ---------------------------- |
| Push button rusak   | PLC tidak menerima input     |
| Input module gagal  | logic tidak dieksekusi       |
| Ladder logic salah  | output tidak aktif           |
| Output module rusak | MCC tidak menerima command   |
| Kontaktor rusak     | motor tidak menerima listrik |

Karena PLC bekerja dalam **scan cycle yang sangat cepat**, semua proses ini sebenarnya terjadi dalam waktu sangat singkat.

Namun dari sudut pandang troubleshooting, engineer harus memahami **di titik mana rantai kontrol terputus**.

---

## 4. Control Objective

Tujuan utama sistem kontrol PLC pada motor starter adalah memastikan bahwa **perintah operator diterjemahkan menjadi aksi equipment secara konsisten dan dapat diverifikasi**.

Secara praktis, sistem kontrol harus memenuhi tiga tujuan berikut.

✔ 1. Membaca Kondisi Lapangan

PLC harus mampu membaca status semua sinyal input dari field device secara akurat.

Contoh input penting:

```text
START_PB
STOP_PB
MOTOR_FEEDBACK
```

Kesalahan pembacaan input dapat menyebabkan:

- motor tidak start
- motor tidak stop
- status sistem tidak akurat.

---

✔ 2. Mengevaluasi Logic Control

PLC harus mengevaluasi program ladder untuk menentukan apakah kondisi operasi memungkinkan equipment berjalan.

Contoh logika dasar:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Logika ini menentukan apakah motor harus berjalan atau berhenti.

---

✔ 3. Mengirim Command ke Equipment

Jika hasil evaluasi logika menghasilkan kondisi **RUN_CMD = TRUE**, PLC harus mengaktifkan output yang mengendalikan motor starter.

Contoh output:

```text
MOTOR_CMD
```

Output ini akan:

```text
energize MCC contactor
↓
motor supply terhubung
↓
motor berputar
```

---

Semua proses ini tidak terjadi sekali saja, tetapi terus diulang oleh PLC melalui mekanisme yang disebut **scan cycle**.

Setiap scan cycle memastikan bahwa:

- perubahan input segera terdeteksi
- logic selalu diperbarui
- output selalu mencerminkan kondisi sistem terbaru.

---

## 5. Instrument and Signal Mapping

Sebelum menulis logic ladder, engineer harus terlebih dahulu memahami **jalur sinyal yang menghubungkan operator, PLC, dan equipment electrical**. Proses ini disebut **signal mapping**.

Signal mapping menjawab tiga pertanyaan utama:

1. **Sinyal berasal dari mana**
2. **Sinyal masuk ke modul PLC mana**
3. **Sinyal digunakan untuk fungsi apa dalam logic**

Tanpa mapping yang jelas, program PLC akan sulit dibaca dan troubleshooting menjadi tidak sistematis.

✔ Signal Flow dalam Sistem Motor Control

![Image](https://media.licdn.com/dms/image/v2/D4E22AQHdFJ8YFr_O8A/feedshare-shrink_1280/B4EZhUkmN0GcAk-/0/1753765537412?e=2147483647&t=oPuG9QdTRJPXREEWOYnKB12TDDfyJPD76gT2-d7ivY8&v=beta)

Dalam sistem motor–pump sederhana, jalur sinyal kontrol biasanya terdiri dari empat sinyal utama.

| Signal    | Source                | PLC Type | Function                 |
| --------- | --------------------- | -------- | ------------------------ |
| START_PB  | push button panel     | DI       | perintah start           |
| STOP_PB   | push button panel     | DI       | perintah stop            |
| MOTOR_FB  | MCC auxiliary contact | DI       | konfirmasi motor running |
| MOTOR_CMD | PLC output            | DO       | command ke motor starter |

Penjelasan setiap sinyal:

✔ START_PB

START push button memberikan **perintah awal untuk menjalankan motor**.

Ketika tombol ditekan:

```text id="9q9c7e"
START_PB = ON
```

Sinyal ini masuk ke **digital input module PLC**.

---

✔ STOP_PB

STOP push button digunakan untuk menghentikan motor.

Dalam praktik industri, STOP biasanya menggunakan **kontak NC (Normally Closed)**.

Tujuannya adalah **fail-safe**.

Jika kabel putus:

```text id="g7g8fd"
STOP_PB = FALSE
↓
motor stop
```

Dengan desain ini motor tidak akan tetap berjalan ketika sistem kontrol mengalami kegagalan.

---

✔ MOTOR_FB

Motor feedback berasal dari **auxiliary contact pada MCC contactor**.

Ketika motor benar-benar berjalan:

```text id="q7rj9b"
MOTOR_FB = TRUE
```

Signal ini penting untuk:

- verifikasi start berhasil
- alarm start failure
- status running di HMI.

---

✔ MOTOR_CMD

Output PLC yang mengendalikan motor starter.

Jika output ini aktif:

```text id="rsn98j"
MOTOR_CMD = TRUE
```

PLC akan mengirim sinyal listrik ke coil kontaktor MCC.

Akibatnya:

```text id="v6i3je"
kontaktor energize
↓
motor supply terhubung
↓
motor berputar
```

Mapping sinyal ini membentuk **jalur kontrol lengkap dari operator hingga equipment**.

---

## 6. Ladder Logic Implementation

Setelah sinyal dipetakan, langkah berikutnya adalah membuat **logic ladder yang menentukan kapan motor harus berjalan**.

✔ Basic Motor Start Logic

![Image](https://control.com/uploads/articles/startstop_1.jpg)

![Image](https://www.allaboutcircuits.com/uploads/articles/switch-motor-stop.jpg)

![Image](https://i.pinimg.com/736x/1b/df/c0/1bdfc073cc72abb5c216b1479e67a9f8.jpg)

Logika dasar yang digunakan dalam motor starter adalah **seal-in circuit** atau **self-holding circuit**.

Logika ini memastikan motor tetap berjalan setelah tombol start dilepas.

Struktur logika:

```text id="49luzh"
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Penjelasan logika:

✔ START_PB

Memberikan perintah awal untuk menjalankan motor.

Ketika START_PB aktif:

```text id="sps1dc"
RUN_CMD = TRUE
```

---

✔ RUN_CMD Holding Contact

RUN_CMD digunakan sebagai **holding contact**.

Fungsi utamanya adalah mempertahankan kondisi run walaupun tombol start sudah dilepas.

Tanpa holding contact:

```text id="ckdu1t"
START dilepas
↓
input OFF
↓
motor berhenti
```

---

✔ STOP_PB

STOP memiliki prioritas lebih tinggi.

Ketika STOP ditekan:

```text id="n7uecc"
STOP_PB = TRUE
↓
NOT STOP_PB = FALSE
↓
RUN_CMD = FALSE
↓
motor stop
```

---

Dengan struktur logika ini PLC dapat memastikan bahwa:

- motor dapat start dengan satu perintah
- motor tetap berjalan setelah tombol dilepas
- motor dapat dihentikan kapan saja dengan tombol stop.

---

## 7. System Response

Setelah sinyal dipetakan dan logic ladder dibuat, langkah berikutnya adalah memahami **bagaimana PLC memproses semua informasi tersebut secara terus-menerus**. Proses ini disebut **PLC Scan Cycle**.

PLC tidak menjalankan program hanya sekali. PLC membaca input, menjalankan logika, dan memperbarui output **berulang kali dalam siklus yang sangat cepat**.

---

✔ PLC Scan Cycle

![Image](https://theautomization.com/plc-working-principle-and-plc-scan-cycle/plc-scanning-cycle/)

![Image](https://www.researchgate.net/publication/338129116/figure/fig6/AS%3A840664354942991%401577441409736/The-scan-cycle-of-a-PLC.ppm)

Urutan dasar scan cycle PLC adalah:

```text
Input Scan
↓
Program Execution
↓
Output Update
↓
Next Scan
```

Proses ini berlangsung secara terus menerus selama PLC beroperasi.

Durasi satu siklus biasanya:

```text
5 – 20 ms
```

Artinya PLC mengevaluasi sistem kontrol **50 sampai 200 kali setiap detik**.

---

✔ Input Scan

Pada tahap ini PLC membaca seluruh **status input dari field device**.

Contoh kondisi input:

```text
START_PB = ON
STOP_PB  = OFF
MOTOR_FB = OFF
```

Input tersebut berasal dari:

- push button operator
- limit switch
- auxiliary contact
- instrument switch.

PLC menyimpan semua status input ini dalam **memory internal** sebelum logika dievaluasi.

Hal penting:

Perubahan input **tidak langsung mempengaruhi output** sampai tahap program execution selesai.

---

✔ Program Execution

Pada tahap ini PLC menjalankan program ladder **rung demi rung**.

Contoh logika motor control:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Jika kondisi input adalah:

```text
START_PB = ON
STOP_PB  = OFF
```

Maka hasil evaluasi:

```text
RUN_CMD = TRUE
```

Jika STOP ditekan:

```text
STOP_PB = ON
```

Maka:

```text
RUN_CMD = FALSE
```

Program execution menentukan **status logika internal PLC**.

---

✔ Output Update

Setelah semua rung dievaluasi, PLC memperbarui status output module.

Contoh:

Jika hasil logika adalah:

```text
RUN_CMD = TRUE
```

PLC akan mengaktifkan output:

```text
MOTOR_CMD = ON
```

Akibatnya:

```text
kontaktor MCC energize
↓
motor menerima supply listrik
↓
motor mulai berputar
```

Jika pada scan berikutnya kondisi berubah (misalnya STOP ditekan), PLC akan mematikan output pada siklus berikutnya.

---

✔ Continuous Response

Karena scan cycle berjalan sangat cepat, sistem kontrol terlihat **merespon secara real-time**.

Contoh respon sistem:

Scenario A — Start Motor

```text
START_PB = ON
STOP_PB  = OFF
↓
RUN_CMD = TRUE
↓
MOTOR_CMD = ON
↓
motor start
```

Scenario B — Stop Motor

```text
STOP_PB = ON
↓
RUN_CMD = FALSE
↓
MOTOR_CMD = OFF
↓
motor stop
```

Setiap perubahan input akan diproses pada **scan cycle berikutnya**.

Inilah yang membuat PLC mampu mengontrol equipment secara stabil dan konsisten.

---

## 8. Troubleshooting Guide

Memahami **PLC scan cycle** memberikan keuntungan besar saat melakukan troubleshooting di plant. Engineer dapat melacak **di tahap mana sinyal kontrol terputus**, karena setiap respon sistem selalu mengikuti urutan tetap:

```text
Field Device
↓
PLC Input
↓
Ladder Logic
↓
PLC Output
↓
Electrical Equipment
```

Dengan pendekatan ini troubleshooting tidak dilakukan secara acak, tetapi mengikuti **alur sinyal kontrol yang diproses oleh PLC**.

---

✔ Step 1 — Periksa Input PLC

Langkah pertama adalah memastikan **PLC benar-benar menerima sinyal dari field device**.

Contoh kasus: operator menekan tombol start.

Engineer harus memverifikasi status input PLC:

```text
START_PB = ON
```

Jika input tidak berubah:

Kemungkinan penyebab:

- push button rusak
- kabel field putus
- terminal wiring longgar
- input module PLC bermasalah.

Dalam kondisi ini ladder logic tidak akan pernah dievaluasi dengan benar karena **PLC tidak membaca perintah operator**.

---

✔ Step 2 — Periksa Logic Ladder

Jika input PLC sudah benar, langkah berikutnya adalah memeriksa **hasil evaluasi rung ladder**.

Engineer harus melihat apakah rung menghasilkan kondisi berikut:

```text
RUN_CMD = TRUE
```

Jika rung tidak aktif walaupun START_PB sudah ON, kemungkinan masalah adalah:

- STOP_PB aktif
- permissive condition tidak terpenuhi
- kesalahan alamat tag pada ladder
- logika rung salah.

Online monitoring di software PLC biasanya menunjukkan **status setiap kontak pada rung ladder**, sehingga engineer dapat melihat dengan cepat **kontak mana yang memblok logika**.

---

✔ Step 3 — Periksa Output PLC

Jika ladder logic sudah menghasilkan kondisi run, langkah berikutnya adalah memeriksa **output PLC**.

Engineer harus memverifikasi status output berikut:

```text
MOTOR_CMD = ON
```

Jika output tidak aktif walaupun rung benar:

Kemungkinan penyebab:

- alamat output salah
- output module PLC rusak
- channel output disable.

Dalam tahap ini engineer memastikan bahwa **PLC benar-benar mengirim command ke equipment electrical**.

---

✔ Step 4 — Periksa Equipment Electrical

Jika output PLC sudah aktif tetapi motor tetap tidak berjalan, maka masalah berada pada **sistem electrical di MCC**.

Beberapa kemungkinan:

- coil kontaktor rusak
- overload relay trip
- supply MCC tidak tersedia
- interlock electrical aktif.

Dalam kondisi ini PLC sebenarnya sudah memberikan command, tetapi **equipment tidak merespon perintah tersebut**.

---

✔ Metode Troubleshooting Berbasis Scan Cycle

Pendekatan troubleshooting dapat diringkas menjadi alur berikut:

```text
Apakah input PLC berubah?
↓
Jika YA → periksa logic ladder
↓
Apakah rung menghasilkan output?
↓
Jika YA → periksa output PLC
↓
Apakah output PLC aktif?
↓
Jika YA → periksa MCC / motor starter
```

Dengan metode ini engineer dapat menemukan sumber masalah secara sistematis tanpa harus memeriksa seluruh sistem secara acak.

---

## Kesimpulan Teknis

PLC control system bekerja melalui **scan cycle berulang** yang terdiri dari tiga tahap utama:

```text
Input Scan
Program Execution
Output Update
```

Setiap respon equipment selalu mengikuti urutan ini.

Memahami scan cycle memberikan tiga manfaat utama bagi engineer:

1. **Menentukan titik kegagalan kontrol dengan cepat**
2. **Mempercepat troubleshooting sistem PLC**
3. **Memisahkan masalah antara field device, PLC logic, dan electrical equipment**

Dalam praktik plant, kemampuan memahami scan cycle adalah **fondasi sebelum mempelajari logika kontrol yang lebih kompleks**, seperti permissive, interlock, sequence control, dan shutdown logic.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
