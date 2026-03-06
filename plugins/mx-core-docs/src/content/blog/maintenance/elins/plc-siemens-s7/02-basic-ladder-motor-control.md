---
title: Basic Ladder Logic & Motor Start–Stop Control
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'ladder-diagram',
    'motor-start-stop-control',
    'seal-in-circuit',
    'industrial-automation',
    'pump-control',
    'plc-troubleshooting',
  ]
draft: false
summary: Artikel ini menjelaskan **logika dasar Ladder Diagram untuk kontrol motor start–stop menggunakan PLC** pada sistem motor–pump. Fokus utama adalah memahami pola kontrol paling fundamental dalam sistem otomasi industri yaitu **seal-in (self-holding) circuit**. Dengan logika ini motor dapat start dengan satu perintah operator, tetap berjalan setelah tombol dilepas, dan berhenti dengan prioritas stop untuk keselamatan operasi. Artikel juga menjelaskan hubungan antara **sinyal operator, ladder logic, dan respon electrical equipment di MCC**. Pemahaman pola ini menjadi fondasi sebelum engineer mempelajari logika yang lebih kompleks seperti permissive, interlock, alarm, dan sequence control dalam sistem PLC industri.
---

# **_Artikel 2: Basic Ladder Logic & Motor Start–Stop Control_**

---

- [**_Artikel 2: Basic Ladder Logic \& Motor Start–Stop Control_**](#artikel-2-basic-ladder-logic--motor-startstop-control)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [1. Motor hanya berjalan selama tombol START ditekan](#1-motor-hanya-berjalan-selama-tombol-start-ditekan)
    - [2. Motor tidak berhenti saat tombol STOP ditekan](#2-motor-tidak-berhenti-saat-tombol-stop-ditekan)
    - [3. Motor restart sendiri setelah listrik kembali](#3-motor-restart-sendiri-setelah-listrik-kembali)
  - [3. Physical Mechanism](#3-physical-mechanism)
    - [Masalah Tanpa Seal-In Logic](#masalah-tanpa-seal-in-logic)
    - [Prinsip Self-Holding (Seal-In)](#prinsip-self-holding-seal-in)
  - [4. Control Objective](#4-control-objective)
    - [1. Motor dapat start dengan satu perintah operator](#1-motor-dapat-start-dengan-satu-perintah-operator)
    - [2. Motor tetap berjalan setelah tombol dilepas](#2-motor-tetap-berjalan-setelah-tombol-dilepas)
    - [3. Motor harus berhenti jika tombol STOP ditekan](#3-motor-harus-berhenti-jika-tombol-stop-ditekan)
    - [4. Sistem harus mencegah restart otomatis](#4-sistem-harus-mencegah-restart-otomatis)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [START Push Button](#start-push-button)
    - [STOP Push Button](#stop-push-button)
    - [Motor Feedback (MOTOR\_FB)](#motor-feedback-motor_fb)
    - [Motor Command (MOTOR\_CMD)](#motor-command-motor_cmd)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [START\_PB](#start_pb)
    - [RUN\_CMD Holding Contact](#run_cmd-holding-contact)
    - [STOP\_PB](#stop_pb)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — Motor Start Normal](#scenario-1--motor-start-normal)
    - [Scenario 2 — Motor Stop](#scenario-2--motor-stop)
    - [Scenario 3 — Power Loss](#scenario-3--power-loss)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Motor tidak start](#motor-tidak-start)
    - [Motor hanya berjalan saat tombol START ditekan](#motor-hanya-berjalan-saat-tombol-start-ditekan)
    - [Motor tidak bisa berhenti](#motor-tidak-bisa-berhenti)
    - [Output PLC aktif tetapi motor tidak start](#output-plc-aktif-tetapi-motor-tidak-start)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Artikel ini tetap menggunakan **motor–pump system** sebagai konteks utama karena hampir semua fasilitas industri memiliki equipment jenis ini.

Contoh aplikasi nyata di plant:

- cooling water pump
- utility water pump
- transfer pump
- circulation pump

Walaupun sederhana, kontrol motor ini merupakan **fondasi hampir seluruh kontrol equipment rotating di industri**.

Komponen utama sistem:

- **Motor listrik** — penggerak mekanik pump
- **Pump** — equipment proses untuk memindahkan fluida
- **MCC motor starter** — perangkat electrical yang menghubungkan supply motor
- **Start push button** — perintah operator untuk menjalankan motor
- **Stop push button** — perintah operator untuk menghentikan motor
- **Motor auxiliary contact** — feedback status motor running
- **PLC** — controller yang menjalankan ladder logic

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen                       |
| --------------- | ------------------------------ |
| Mechanical      | pump                           |
| Electrical      | MCC contactor & overload relay |
| Instrumentation | auxiliary contact feedback     |
| Control         | PLC ladder logic               |

Dalam arsitektur kontrol ini, PLC tidak langsung menggerakkan motor. PLC hanya mengirim **command listrik ke MCC**.

Alur kontrol dasar sistem:

```text
Operator START command
↓
PLC membaca input
↓
PLC menjalankan ladder logic
↓
PLC mengaktifkan output
↓
MCC contactor energize
↓
motor berputar
↓
pump mulai memindahkan fluida
```

Dengan struktur ini PLC bertugas **mengendalikan kapan motor harus start dan kapan motor harus stop**.

---

## 2. Operational Problem

Beberapa masalah yang sering terjadi pada kontrol motor sederhana antara lain:

### 1. Motor hanya berjalan selama tombol START ditekan

Operator menekan START:

- motor berjalan

Operator melepas tombol:

- motor langsung berhenti.

Masalah ini menunjukkan **logika tidak memiliki self-holding**.

---

### 2. Motor tidak berhenti saat tombol STOP ditekan

Kondisi ini dapat disebabkan oleh:

- wiring STOP salah
- alamat input STOP salah
- logika ladder tidak memberikan prioritas stop.

Dalam sistem industri, kondisi ini berbahaya karena operator **tidak dapat menghentikan equipment dengan cepat**.

---

### 3. Motor restart sendiri setelah listrik kembali

Jika logika tidak dirancang dengan benar:

```text
power kembali
↓
PLC kembali aktif
↓
output langsung ON
↓
motor start otomatis
```

Automatic restart dapat menimbulkan risiko:

- mechanical shock
- operator tidak siap
- potensi kecelakaan kerja.

---

Sebagian besar masalah di atas terjadi karena **struktur ladder logic yang tidak tepat**.

Untuk menghindari masalah tersebut digunakan pola kontrol standar yang disebut:

**seal-in circuit (self-holding circuit)**.

Logika ini merupakan **pola paling dasar dalam hampir semua kontrol motor di industri**.

---

## 3. Physical Mechanism

Ketika motor dijalankan melalui sistem kontrol PLC, terdapat **rantai mekanisme fisik** yang menghubungkan aksi operator dengan pergerakan mekanik motor.

Walaupun logika berada di dalam PLC, sistem sebenarnya melibatkan **perangkat mekanik, electrical, dan kontrol**.

✔ Alur Fisik Start Motor

![Image](https://media.licdn.com/dms/image/v2/D4E22AQFFEtbMsggiGw/feedshare-shrink_800/B4EZlbaRr6K0Ag-/0/1758175240059?e=2147483647&t=6lhGfCeiOdBrtHpNVOpQGebWQWr50nfJUW1RCbx5PUo&v=beta)

![Image](https://media.licdn.com/dms/image/v2/D4E22AQEViaLvUxH9Ng/feedshare-shrink_800/B4EZosAqUeJgAg-/0/1761674964028?e=2147483647&t=ePC08Zk1V9K35DzrWz9Q16yWB1IgZaPH7hliP1SUNvk&v=beta)

Urutan fisik ketika operator menekan tombol START adalah sebagai berikut:

```text
Operator menekan START push button
↓
kontak push button menutup
↓
digital input PLC berubah status
↓
PLC membaca input pada scan cycle
↓
ladder logic mengevaluasi kondisi start
↓
PLC mengaktifkan output
↓
kontaktor MCC energize
↓
motor menerima supply listrik
↓
motor mulai berputar
↓
auxiliary contact berubah status
↓
PLC menerima feedback motor running
```

Setiap tahapan merupakan **rantai sebab–akibat dalam sistem kontrol industri**.

Jika salah satu tahapan gagal, motor tidak akan berjalan.

---

### Masalah Tanpa Seal-In Logic

Jika ladder logic hanya bergantung pada **START push button**, maka kondisi berikut akan terjadi:

```text
START PB ditekan
↓
PLC membaca START = ON
↓
output PLC aktif
↓
motor start
```

Namun ketika tombol dilepas:

```text
START PB kembali open
↓
input PLC menjadi OFF
↓
ladder logic menjadi FALSE
↓
output PLC mati
↓
motor berhenti
```

Artinya motor hanya berjalan selama tombol start **ditahan secara fisik oleh operator**.

Hal ini tidak praktis dan tidak sesuai dengan praktik kontrol industri.

---

### Prinsip Self-Holding (Seal-In)

Untuk menjaga motor tetap berjalan setelah perintah start diberikan, ladder logic harus memiliki **holding path**.

Konsepnya adalah:

```text
START command
↓
RUN_CMD menjadi TRUE
↓
RUN_CMD contact menjaga rung tetap aktif
```

Dengan demikian:

```text
START dilepas
↓
RUN_CMD contact tetap closed
↓
motor tetap running
```

Inilah yang disebut **seal-in circuit** atau **self-holding logic**.

Logika ini adalah **pola kontrol paling dasar pada sistem motor PLC**.

---

## 4. Control Objective

Tujuan dari struktur logika motor start–stop adalah memastikan bahwa operasi equipment mengikuti prinsip kontrol industri yang aman dan stabil.

Empat tujuan utama logika ini adalah sebagai berikut.

---

### 1. Motor dapat start dengan satu perintah operator

Operator cukup menekan tombol START satu kali.

```text
START_PB = ON
↓
RUN_CMD = TRUE
↓
motor start
```

---

### 2. Motor tetap berjalan setelah tombol dilepas

Self-holding memastikan bahwa motor tetap running walaupun operator sudah melepas tombol.

```text
START_PB = OFF
RUN_CMD contact tetap aktif
↓
motor tetap running
```

---

### 3. Motor harus berhenti jika tombol STOP ditekan

STOP push button memiliki prioritas lebih tinggi daripada start command.

```text
STOP_PB = ON
↓
NOT STOP_PB = FALSE
↓
RUN_CMD = FALSE
↓
motor stop
```

---

### 4. Sistem harus mencegah restart otomatis

Ketika PLC kehilangan power:

```text
PLC memory reset
↓
RUN_CMD hilang
↓
output OFF
↓
motor berhenti
```

Ketika listrik kembali:

```text
RUN_CMD tidak aktif
↓
motor tetap OFF
```

Hal ini mencegah **automatic restart yang tidak diinginkan**, yang dapat membahayakan operator dan equipment.

---

Struktur kontrol ini menjadi **fondasi hampir semua kontrol motor di sistem PLC industri**, sebelum engineer menambahkan logika lain seperti:

- permissive
- interlock
- alarm
- trip logic.

---

## 5. Instrument and Signal Mapping

Sebelum logika ladder dibuat, engineer harus menentukan **jalur sinyal kontrol yang menghubungkan operator, PLC, dan motor starter**. Tahap ini disebut **signal mapping**.

Signal mapping memastikan bahwa setiap sinyal memiliki:

- sumber sinyal yang jelas
- alamat I/O PLC yang benar
- fungsi logika yang terdefinisi.

Tanpa mapping yang jelas, program PLC akan sulit dibaca dan troubleshooting menjadi tidak sistematis.

✔ Arsitektur Sinyal Motor Control

![Image](https://cdn.automationforum.co/uploads/2025/07/PLC-Program-for-Motor-Starter-with-Low-Level-Switch-Interlock-3-1024x566.jpg)

![Image](https://media.licdn.com/dms/image/v2/D4D22AQHRad5fM_Ev4Q/feedshare-shrink_800/B4DZjBQ1EPGgAk-/0/1755589072790?e=2147483647&t=jsVy4yHZSEDBH57Nu3tsGmxHMnD2BOXecsZf5mJM21o&v=beta)

Dalam sistem motor start–stop sederhana, PLC menggunakan beberapa sinyal dasar berikut.

| Signal    | Source                | PLC Type | Function                   |
| --------- | --------------------- | -------- | -------------------------- |
| START_PB  | push button panel     | DI       | perintah start             |
| STOP_PB   | push button panel     | DI       | perintah stop              |
| MOTOR_FB  | MCC auxiliary contact | DI       | feedback motor running     |
| MOTOR_CMD | PLC output            | DO       | command ke kontaktor motor |

Mapping ini membentuk **jalur kontrol lengkap dari operator hingga motor**.

---

### START Push Button

START push button memberikan **perintah awal untuk menjalankan motor**.

Ketika tombol ditekan:

```text
START_PB = ON
```

PLC membaca sinyal ini pada **input scan** dan kemudian logika ladder mengevaluasi apakah motor dapat dijalankan.

---

### STOP Push Button

STOP push button digunakan untuk menghentikan motor.

Dalam praktik industri, STOP biasanya menggunakan **kontak NC (Normally Closed)**.

Tujuannya adalah **fail-safe protection**.

Jika terjadi kegagalan seperti:

- kabel putus
- terminal longgar
- input PLC rusak

maka:

```text
STOP_PB = FALSE
↓
logic stop aktif
↓
motor berhenti
```

Desain ini memastikan bahwa **kegagalan sistem kontrol tidak menyebabkan motor terus berjalan**.

---

### Motor Feedback (MOTOR_FB)

Motor feedback berasal dari **auxiliary contact pada MCC contactor**.

Ketika kontaktor motor energize:

```text
MOTOR_FB = TRUE
```

Signal ini digunakan untuk:

- konfirmasi bahwa motor benar-benar berjalan
- status running di HMI
- dasar logika alarm atau trip pada sistem yang lebih kompleks.

---

### Motor Command (MOTOR_CMD)

MOTOR_CMD adalah output PLC yang mengendalikan **coil kontaktor motor starter**.

Jika output aktif:

```text
MOTOR_CMD = TRUE
```

maka:

```text
kontaktor MCC energize
↓
motor menerima supply listrik
↓
motor berputar
```

Dengan mapping ini PLC dapat menghubungkan **perintah operator dengan respon equipment electrical**.

---

## 6. Ladder Logic Implementation

Setelah sinyal dipetakan, langkah berikutnya adalah membuat **struktur ladder logic** yang mengendalikan motor.

Logika ini dikenal sebagai **motor start–stop control** dengan **seal-in circuit**.

---

✔ Struktur Basic Ladder Logic

![Image](https://www.allaboutcircuits.com/uploads/articles/latch-the-control-circuit.jpg)

![Image](https://www.allaboutcircuits.com/uploads/articles/switch-motor-stop.jpg)

Logika utama yang digunakan:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Penjelasan setiap elemen logika.

---

### START_PB

START push button memberikan **trigger awal** untuk menjalankan motor.

Ketika START_PB aktif:

```text
RUN_CMD = TRUE
```

PLC kemudian mengaktifkan output MOTOR_CMD.

---

### RUN_CMD Holding Contact

RUN_CMD digunakan sebagai **seal-in contact**.

Fungsi utama holding contact adalah mempertahankan kondisi rung tetap aktif walaupun tombol START sudah dilepas.

Tanpa seal-in logic:

```text
START dilepas
↓
input PLC OFF
↓
output PLC OFF
↓
motor berhenti
```

Dengan seal-in:

```text
RUN_CMD contact aktif
↓
motor tetap running
```

---

### STOP_PB

STOP push button memberikan **prioritas penghentian sistem**.

Ketika STOP ditekan:

```text
STOP_PB = ON
↓
NOT STOP_PB = FALSE
↓
RUN_CMD = FALSE
↓
MOTOR_CMD OFF
↓
motor stop
```

Karena kondisi STOP berada di jalur utama logika, maka **STOP selalu memiliki prioritas tertinggi** dalam kontrol motor.

---

## 7. System Response

Setelah ladder logic dibuat, langkah berikutnya adalah memahami **bagaimana sistem merespon berbagai kondisi operasi**. Respon ini terjadi karena PLC terus menjalankan **scan cycle** sehingga setiap perubahan input akan segera mempengaruhi output.

Logika seal-in menghasilkan beberapa kondisi operasi yang umum terjadi pada sistem motor.

---

✔ Respons Sistem Motor Control

![Image](https://global.discourse-cdn.com/digikey/original/3X/8/9/893693bf129ad762dc7382ec106696b21982839b.png)

---

### Scenario 1 — Motor Start Normal

Kondisi awal sistem:

```text
START_PB = OFF
STOP_PB  = OFF
RUN_CMD  = OFF
MOTOR_CMD = OFF
```

Operator menekan tombol START:

```text
START_PB = ON
STOP_PB  = OFF
```

PLC mengevaluasi ladder logic:

```text
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Hasil evaluasi:

```text
RUN_CMD = TRUE
```

PLC kemudian mengaktifkan output:

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

Ketika tombol START dilepas:

```text
START_PB = OFF
```

motor tetap berjalan karena:

```text
RUN_CMD contact masih aktif
```

Inilah fungsi utama **seal-in circuit**.

---

### Scenario 2 — Motor Stop

Jika operator menekan tombol STOP:

```text
STOP_PB = ON
```

Maka logika ladder berubah menjadi:

```text
NOT STOP_PB = FALSE
```

Sehingga:

```text
RUN_CMD = FALSE
```

PLC kemudian mematikan output:

```text
MOTOR_CMD = OFF
```

Akibatnya:

```text
kontaktor MCC de-energize
↓
supply listrik ke motor terputus
↓
motor berhenti
```

Karena STOP berada dalam jalur utama logika, maka **STOP selalu memiliki prioritas tertinggi dalam kontrol motor**.

---

### Scenario 3 — Power Loss

Kehilangan power pada PLC atau MCC merupakan kondisi yang harus dipertimbangkan dalam desain kontrol.

Jika PLC kehilangan power:

```text
PLC memory reset
↓
RUN_CMD hilang
↓
output PLC OFF
```

Akibatnya:

```text
MOTOR_CMD = OFF
↓
kontaktor MCC de-energize
↓
motor berhenti
```

Ketika power kembali:

```text
START_PB = OFF
RUN_CMD = OFF
```

motor **tidak akan restart secara otomatis**.

Hal ini penting untuk:

- keselamatan operator
- mencegah mechanical shock
- memastikan operator melakukan restart secara sadar.

---

Respon sistem ini menunjukkan bahwa **struktur seal-in ladder logic mengontrol tiga kondisi utama operasi motor**:

1. start normal
2. stop command
3. kehilangan power.

---

## 8. Troubleshooting Guide

Ketika sistem motor tidak merespon sesuai dengan logika ladder yang dirancang, engineer harus melakukan troubleshooting dengan pendekatan **alur sinyal kontrol**.

Prinsip dasar troubleshooting PLC adalah mengikuti urutan berikut:

```text id="j6qsp8"
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

Dengan metode ini engineer dapat menentukan **di titik mana rantai kontrol terputus**.

---

✔ Alur Diagnosa Sistem Motor

![Image](https://www.researchgate.net/publication/333489346/figure/fig5/AS%3A764358757994497%401559248737628/A-simplified-flow-chart-of-the-PLC-logic-program-As-shown-in-Figure-6-four-types-of.png)

---

### Motor tidak start

Jika operator menekan START tetapi motor tidak berjalan, lakukan pemeriksaan berikut.

Periksa status input START di PLC.

```text id="d9as4u"
START_PB = ON ?
```

Jika input tidak berubah:

Kemungkinan penyebab:

- push button rusak
- kabel field putus
- terminal wiring longgar
- input module PLC rusak.

Jika input benar tetapi motor tidak start, periksa rung logika.

```text id="efanpt"
RUN_CMD = TRUE ?
```

Jika tidak TRUE, kemungkinan:

- STOP_PB aktif
- logika ladder salah
- permissive condition belum terpenuhi.

---

### Motor hanya berjalan saat tombol START ditekan

Kondisi ini menunjukkan **seal-in circuit tidak bekerja**.

Ketika START ditekan:

```text id="q1d1m4"
START_PB = ON
↓
RUN_CMD = TRUE
```

Namun saat START dilepas:

```text id="q95s32"
START_PB = OFF
↓
RUN_CMD = FALSE
↓
motor stop
```

Penyebab umum:

- tidak ada holding contact
- RUN_CMD tidak digunakan sebagai seal-in contact
- alamat tag RUN_CMD salah.

---

### Motor tidak bisa berhenti

Jika motor tetap berjalan walaupun tombol STOP ditekan, kemungkinan terjadi masalah pada jalur stop.

Periksa status input STOP.

```text id="ruysj0"
STOP_PB = ON ?
```

Jika tidak berubah:

Kemungkinan:

- push button STOP rusak
- wiring putus
- alamat input salah.

Jika input berubah tetapi motor tetap berjalan:

Periksa logika:

```text id="dxfvfb"
NOT STOP_PB
```

Jika kondisi ini tidak mempengaruhi rung, kemungkinan logika ladder tidak memberikan **prioritas stop**.

---

### Output PLC aktif tetapi motor tidak start

Jika ladder logic menghasilkan output tetapi motor tidak berjalan, masalah biasanya berada pada sistem electrical.

Periksa status output PLC:

```text id="2lchd1"
MOTOR_CMD = ON ?
```

Jika output aktif tetapi motor tidak berjalan:

Kemungkinan penyebab:

- overload relay trip
- coil kontaktor rusak
- supply MCC hilang
- interlock electrical aktif.

Dalam kondisi ini PLC sebenarnya sudah memberikan command, tetapi **equipment tidak merespon perintah tersebut**.

---

### Kesimpulan Teknis

Motor start–stop control menggunakan **seal-in ladder logic** untuk memastikan motor tetap berjalan setelah perintah start diberikan.

Struktur logika utama adalah:

```text id="ykp7qg"
RUN_CMD =
(START_PB OR RUN_CMD)
AND NOT STOP_PB
```

Struktur ini memastikan bahwa:

- motor dapat start dengan satu perintah
- motor tetap berjalan setelah tombol dilepas
- motor dapat dihentikan kapan saja melalui tombol stop.

Logika seal-in ini merupakan **fondasi hampir semua kontrol motor dalam sistem PLC industri**, sebelum ditambahkan logika yang lebih kompleks seperti:

- permissive
- interlock
- alarm
- sequence control.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
