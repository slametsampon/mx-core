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
- [1. Operational Context](#1-operational-context)
- [2. System Mechanism](#2-system-mechanism)
- [3. Signal Flow](#3-signal-flow)
- [4. PLC Behaviour](#4-plc-behaviour)
  - [Industrial Context](#industrial-context)
- [5. Practical Example](#5-practical-example)
    - [Step 1 — Read Inputs](#step-1--read-inputs)
    - [Step 2 — Execute Logic](#step-2--execute-logic)
    - [Step 3 — Update Outputs](#step-3--update-outputs)
- [6. Troubleshooting Insight](#6-troubleshooting-insight)
    - [Periksa Input](#periksa-input)
    - [Periksa Logic](#periksa-logic)
    - [Periksa Output](#periksa-output)
    - [Periksa Equipment](#periksa-equipment)

---

# 1. Operational Context

Dalam sistem kontrol industri, **Programmable Logic Controller (PLC)** digunakan untuk membaca kondisi proses dan mengontrol equipment seperti:

- motor
- pump
- valve
- conveyor
- compressor

PLC berfungsi sebagai **sistem pengambil keputusan logika** yang menghubungkan kondisi proses dengan aksi equipment.

Hubungan dasar sistem kontrol dapat digambarkan sebagai berikut.

```text
Process Condition
↓
Instrument Signal
↓
PLC Logic
↓
Equipment Response
```

![Image](https://automationindustrial.com/cdn/shop/articles/industrial_automation_levels.jpg?v=1611934259)

Contoh sederhana terjadi pada **motor pump di plant industri**.

Operator menekan tombol **START** pada panel kontrol.

Sistem kontrol kemudian harus melakukan beberapa langkah:

1. membaca sinyal dari **push button start**
2. mengevaluasi logika kontrol dalam program PLC
3. mengaktifkan output untuk menjalankan motor

Namun dalam praktik operasi plant sering muncul kondisi seperti berikut:

> tombol start ditekan tetapi motor tidak berjalan.

Masalah ini dapat terjadi pada berbagai bagian sistem kontrol, seperti:

- sinyal input tidak terbaca oleh PLC
- logika kontrol tidak terpenuhi
- output PLC tidak aktif
- contactor motor gagal bekerja

Untuk memahami penyebab masalah tersebut, engineer harus memahami **bagaimana PLC memproses sinyal dalam satu siklus kerja**.

PLC bekerja menggunakan **siklus pemrosesan berulang** yang disebut **PLC Scan Cycle**.

---

Berikut **section Anda tanpa perubahan teks**, hanya **menambahkan gambar engineering Siemens S7 tepat di bawah setiap diagram konsep** sesuai instruksi.

---

# 2. System Mechanism

PLC tidak memproses sinyal secara kontinu seperti sistem kontrol analog.

Sebaliknya, PLC bekerja menggunakan **siklus pemrosesan berulang** yang disebut **scan cycle**.

Dalam setiap siklus, PLC melakukan tiga langkah utama.

```text
Read Inputs
↓
Execute Logic
↓
Update Outputs
```

![Image](https://www.researchgate.net/publication/338129116/figure/fig6/AS%3A840664354942991%401577441409736/The-scan-cycle-of-a-PLC.ppm)

Setelah tahap terakhir selesai, PLC kembali ke tahap pertama dan mengulangi proses yang sama.

Durasi satu scan cycle biasanya hanya **beberapa milidetik**, tergantung pada:

- tipe CPU PLC
- ukuran program
- jumlah I/O yang diproses

Secara konseptual mekanisme ini dapat digambarkan sebagai berikut.

```text
INPUT MODULE
(read field signals)
↓
PLC MEMORY
(store input status)
↓
EXECUTE PROGRAM
(run ladder logic)
↓
OUTPUT MEMORY
(store output status)
↓
OUTPUT MODULE
(send signal to equipment)
```

![Image](https://support.industry.siemens.com/cs/images/109767576/109767576_Redundant_IO_S7_1500_01.png)

Urutan pemrosesan ini menjadi dasar bagaimana PLC merespon setiap perubahan sinyal dalam sistem kontrol.

---

Baik. Berikut **Section 3 langsung diperbaiki** tanpa perubahan teks Anda, **langsung ditingkatkan** dengan **3 gambar engineering kuat**:

- **Signal chain (instrument → controller)**
- **Siemens S7 I/O architecture**
- **PLC process image model**

Semua ditempatkan **tepat di bawah diagram konsep**, siap **copas**.

---

# 3. Signal Flow

Pada awal setiap **scan cycle**, PLC membaca seluruh sinyal dari **input module** yang terhubung dengan field device.

Field device adalah perangkat yang mendeteksi kondisi proses di lapangan, seperti:

- push button
- limit switch
- pressure switch
- temperature switch
- motor running feedback

Sinyal listrik dari field device masuk ke **input module PLC**, kemudian dikonversi menjadi data digital yang dapat diproses oleh CPU PLC.

Aliran sinyal dari lapangan menuju PLC dapat digambarkan sebagai berikut.

```text
FIELD DEVICE
(push button, switch, sensor)
        │
        ▼
INPUT MODULE
(digital / analog input)
        │
        ▼
PLC CPU
```

![Image](https://cdn.automationforum.co/uploads/2023/05/1-9.png)

![Image](https://www.researchgate.net/publication/350110488/figure/fig1/AS%3A1019865951375360%401620166399766/Architecture-of-PLC-3.png)

Namun PLC tidak langsung menggunakan data dari input module ketika menjalankan program.

Pada awal scan cycle, PLC terlebih dahulu menyalin seluruh status input ke dalam **Input Memory**, yang sering disebut sebagai **Process Image Input Table**.

```text
FIELD DEVICE
        │
        ▼
INPUT MODULE
        │
        ▼
PROCESS IMAGE INPUT
(Input Memory Snapshot)
        │
        ▼
PLC PROGRAM EXECUTION
```

![Image](https://media.licdn.com/dms/image/v2/D5622AQFvUO8ULVOkCg/feedshare-shrink_800/B56Zfs0d2THcAg-/0/1752024868636?e=2147483647&t=JbfG-T7XYuMKG10acLhynTv5Ty_JeTAJAQpxmbEwMac&v=beta)

Process Image berfungsi sebagai **snapshot kondisi input pada awal scan cycle**.

Contoh isi Process Image Input Table:

```text
I0.0  Start Push Button   = 1
I0.1  Stop Push Button    = 0
I0.2  Motor Feedback      = 0
I0.3  Valve Limit Switch  = 1
```

Selama program ladder dijalankan, PLC **tidak membaca ulang input module**.

Perubahan sinyal baru akan diproses pada **scan cycle berikutnya**.

---

Berikut **Section 4 tanpa perubahan teks Anda**, hanya **menambahkan gambar engineering relevan** tepat **di bawah setiap diagram konsep**.

Siap **langsung copas**.

---

# 4. PLC Behaviour

Setelah PLC membaca seluruh input dan menyimpannya di **Input Memory**, CPU PLC mulai menjalankan **program ladder logic**.

Program PLC dieksekusi secara **berurutan dari atas ke bawah**.

```text id="r9u2fe"
PLC Program Scan

Rung 1
↓
Rung 2
↓
Rung 3
↓
Rung 4
↓
Update Output Memory
```

![Image](https://cdn.prod.website-files.com/63dea6cb95e58cb38bb98cbd/6830777728b9763b99de72f5_AD_4nXcOLkF1sL4E0EQ2lWACzOG6SHW4ngny9iGytOQC5J0aHbPIdxz_kGBSqaq7VR59iPiBCy63VQvsjK-ueVBROaECYw7aOBnqqGF5K-UC7opRNvf6eLUs99faUN0sHHvh5UNF9nUPLQ.png)

Setiap rung ladder dievaluasi menggunakan data input dari **Input Memory**.

Contoh ladder sederhana:

```text id="j7x1vq"
Start PB     Stop PB
---[ ]--------[/]--------( Motor )
```

![Image](https://control.com/uploads/articles/startstop_1.jpg)

![Image](https://control.com/uploads/articles/startstop_10.jpg)

![Image](https://www.kronotech.com/LadderLogic/Basic/images/motor1.gif)

Penjelasan:

- Start PB = contact NO
- Stop PB = contact NC
- Motor = output coil

Contoh kondisi input:

```text id="guxh6m"
Start Push Button = ON
Stop Push Button  = OFF
```

Evaluasi logika:

```text id="h0g4ci"
Motor Coil = TRUE
```

Jika kondisi rung TRUE, PLC akan mengaktifkan coil pada **Output Memory**.

```text id="m9sp0q"
INPUT MEMORY
(Start = ON, Stop = OFF)
        │
        ▼
LADDER LOGIC EXECUTION
        │
        ▼
OUTPUT MEMORY
(Motor = ON)
```

![Image](https://cdn.automationforum.co/uploads/2021/04/Untitled-24.jpg)

Output baru dikirim ke **output module** pada tahap akhir scan cycle.

---

## Industrial Context

Dalam sistem kontrol industri yang sebenarnya, motor biasanya menggunakan **seal-in circuit** agar motor tetap berjalan setelah tombol start dilepas.

Contoh ladder yang lebih umum digunakan:

```text id="o7h2an"
Start PB     Stop PB
---[ ]--------[/]----+----( Motor )
                     |
Motor Contact -------+
```

![Image](https://www.allaboutcircuits.com/uploads/articles/switch-motor-stop.jpg)

Logika ini membuat motor tetap aktif setelah start command dilepas.

Namun untuk menjelaskan **scan cycle PLC**, ladder sederhana sudah cukup karena fokusnya adalah mekanisme:

```text id="x3n48b"
Input Memory
↓
Logic Execution
↓
Output Memory
```

![Image](https://www.researchgate.net/publication/338129116/figure/fig6/AS%3A840664354942991%401577441409736/The-scan-cycle-of-a-PLC.ppm)

Detail motor control akan dibahas pada artikel berikutnya.

---

Berikut **Section 5 tanpa perubahan teks Anda**, hanya **menambahkan gambar engineering relevan tepat di bawah diagram konsep**, siap **langsung copas**.

---

# 5. Practical Example

Contoh operasi sederhana pada **motor start**.

Operator menekan **Start Push Button**.

```text
START PUSH BUTTON
↓
INPUT MODULE
↓
PLC PROGRAM
↓
OUTPUT MODULE
↓
MOTOR CONTACTOR
↓
MOTOR RUNNING
```

![Image](https://cdn.automationforum.co/uploads/2025/07/PLC-Program-for-Motor-Starter-with-Low-Level-Switch-Interlock-3-scaled.jpg)

Proses dalam satu scan cycle:

### Step 1 — Read Inputs

```text
Start Push Button = ON
Stop Push Button  = OFF
Motor Feedback    = OFF
```

![Image](https://cdn.forumautomation.com/original/2X/9/999405a89b845f330c8ec5b41c5ea03224a96386.png)

![Image](https://control.com/uploads/articles/Poster_PLCIO_Wiring.png)

### Step 2 — Execute Logic

PLC mengevaluasi ladder:

```text
Start PB     Stop PB
---[ ]--------[/]--------( Motor )
```

![Image](https://i.pinimg.com/736x/0d/f8/c2/0df8c218df4ab5fed86ccd3abe247949.jpg)

Hasil:

```text
Motor Coil = TRUE
```

### Step 3 — Update Outputs

```text
Motor Output = ON
```

![Image](https://europe1.discourse-cdn.com/arduino/optimized/4X/b/d/d/bddad1308d74be3cddef7e1f7e53d694e606568e_2_1024x576.jpeg)

Output module kemudian mengaktifkan **motor contactor** sehingga motor mulai berputar.

---

# 6. Troubleshooting Insight

Pemahaman scan cycle sangat penting untuk troubleshooting sistem kontrol.

Engineer biasanya menganalisis sistem menggunakan urutan berikut.

```
FIELD DEVICE
↓
INPUT SIGNAL
↓
PLC INPUT MEMORY
↓
PLC LOGIC
↓
OUTPUT MEMORY
↓
OUTPUT MODULE
↓
EQUIPMENT
```

Langkah troubleshooting:

### Periksa Input

```
Start Push Button = ON
```

Jika input tidak berubah, kemungkinan masalah:

- push button rusak
- wiring bermasalah
- input module gagal membaca sinyal

---

### Periksa Logic

```
Start PB = TRUE
Stop PB  = TRUE
→ Motor Coil = TRUE
```

Jika logika tidak terpenuhi, PLC tidak akan mengaktifkan output.

---

### Periksa Output

```
Motor Output = ON
```

Jika output tidak aktif:

- output module rusak
- konfigurasi PLC salah

---

### Periksa Equipment

Jika output aktif tetapi motor tidak berjalan:

- contactor motor rusak
- motor overload trip
- supply listrik terputus

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
