---
title: Basic Ladder Logic & Motor Start–Stop Control
authors: ['sam']
date: '2026-03-04'
tags:
  ['plc', 'siemens-s7', 'ladder-logic', 'motor-start-stop', 'seal-in-circuit']
draft: false
summary: Motor dalam sistem kontrol industri biasanya dioperasikan menggunakan logika start–stop control. Dalam ladder logic PLC, kontrol ini dibangun menggunakan elemen dasar seperti contact (NO/NC) dan coil. Agar motor tetap berjalan setelah tombol start dilepas, digunakan pola logika seal-in circuit yang memanfaatkan auxiliary contact untuk menjaga coil tetap aktif. Pola ini memungkinkan motor terus berjalan sampai operator menekan tombol stop. Memahami seal-in circuit penting bagi engineer untuk merancang logika kontrol motor serta melakukan troubleshooting sistem start–stop pada equipment seperti pump, fan, dan conveyor.
---

# **_Artikel 2: Basic Ladder Logic & Motor Start–Stop Control_**

---

- [**_Artikel 2: Basic Ladder Logic \& Motor Start–Stop Control_**](#artikel-2-basic-ladder-logic--motor-startstop-control)
- [Section 1 — Operational Context](#section-1--operational-context)
- [Section 2 — System Mechanism](#section-2--system-mechanism)
  - [Contact](#contact)
    - [Normally Open (NO)](#normally-open-no)
    - [Normally Closed (NC)](#normally-closed-nc)
  - [Coil](#coil)
- [Section 3 — Signal Flow](#section-3--signal-flow)
- [Section 5 — Practical Example — Seal-In Circuit](#section-5--practical-example--seal-in-circuit)
  - [Logika Kerja Seal-In Circuit](#logika-kerja-seal-in-circuit)
  - [Kondisi Stop](#kondisi-stop)
- [Section 6 — Troubleshooting Insight](#section-6--troubleshooting-insight)
  - [Step 1 — Periksa Start Push Button](#step-1--periksa-start-push-button)
  - [Step 2 — Periksa Stop Push Button](#step-2--periksa-stop-push-button)
  - [Step 3 — Periksa PLC Logic](#step-3--periksa-plc-logic)
  - [Step 4 — Periksa Motor Output dan Contactor](#step-4--periksa-motor-output-dan-contactor)
  - [Troubleshooting Principle](#troubleshooting-principle)

---

# Section 1 — Operational Context

Di plant industri, banyak equipment digerakkan oleh **motor listrik**. Motor ini biasanya digunakan untuk menggerakkan berbagai sistem proses, seperti:

- **pump motor** untuk memindahkan fluida
- **fan motor** untuk sistem ventilasi atau pendinginan
- **conveyor motor** untuk transport material

Dalam sistem otomasi modern, motor-motor tersebut umumnya dikontrol oleh **PLC (Programmable Logic Controller)**.

Operator biasanya mengoperasikan motor melalui **panel kontrol atau HMI**, menggunakan dua perintah dasar:

- **Start push button**
- **Stop push button**

Konsep kontrol ini dapat digambarkan secara sederhana sebagai berikut.

```text id="motor_control_concept"
Operator Command
      │
      ▼
Start / Stop Push Button
      │
      ▼
PLC Control Logic
      │
      ▼
Motor Contactor
      │
      ▼
Motor Running
```

Ketika operator menekan **Start Push Button**, PLC harus mengaktifkan output yang mengendalikan **motor contactor**, sehingga motor mulai beroperasi.

Namun terdapat satu perilaku penting dalam sistem kontrol motor industri:

> Motor tidak boleh berhenti hanya karena tombol start dilepas.

Jika sistem kontrol hanya membaca kondisi tombol start secara langsung, motor akan berhenti segera setelah operator melepaskan tombol tersebut.

Padahal dalam operasi plant, motor harus **tetap berjalan secara kontinu** sampai operator memberikan perintah berhenti.

Dengan kata lain, sistem kontrol harus memenuhi perilaku berikut:

```text id="motor_control_requirement"
Start Command
→ Motor Running

Stop Command
→ Motor Stop
```

Untuk mencapai perilaku ini, PLC menggunakan pola logika khusus dalam ladder logic yang disebut **seal-in circuit**.

Seal-in circuit memungkinkan PLC **menjaga coil output tetap aktif** meskipun tombol start sudah dilepas.

Konsep ini merupakan salah satu pola logika paling dasar dan paling sering digunakan dalam sistem kontrol industri.

---

# Section 2 — System Mechanism

Dalam sistem PLC, logika kontrol biasanya ditulis menggunakan **Ladder Logic**.
Ladder logic adalah bahasa pemrograman yang dirancang menyerupai **diagram rangkaian relay listrik**.

Struktur ladder logic terdiri dari beberapa **rung** yang dieksekusi oleh PLC selama **scan cycle**.

Setiap rung ladder biasanya terdiri dari dua elemen dasar:

- **Contact**
- **Coil**

Kedua elemen ini membentuk dasar dari hampir semua logika kontrol dalam sistem PLC.

---

## Contact

**Contact** digunakan untuk membaca kondisi suatu sinyal atau variabel dalam program PLC.

Contact biasanya mewakili kondisi dari:

- push button
- limit switch
- sensor
- status internal PLC

Terdapat dua jenis contact yang umum digunakan.

### Normally Open (NO)

Contact **Normally Open (NO)** akan bernilai TRUE ketika sinyal yang dibacanya aktif.

Representasi ladder:

```text id="contact_no"
---[ ]---
```

Contoh penggunaan:

- Start Push Button
- Running feedback

Ketika sinyal aktif, contact akan **menutup secara logika** dan memungkinkan aliran logika menuju coil.

---

### Normally Closed (NC)

Contact **Normally Closed (NC)** akan bernilai TRUE ketika sinyal yang dibacanya tidak aktif.

Representasi ladder:

```text id="contact_nc"
---[/]---
```

Contoh penggunaan:

- Stop Push Button
- Trip signal

Jika sinyal aktif, contact akan **membuka secara logika** dan memutus aliran logika.

---

## Coil

**Coil** digunakan untuk menghasilkan aksi atau mengaktifkan suatu output dalam program PLC.

Representasi ladder:

```text id="coil01"
---( )---
```

Coil biasanya digunakan untuk:

- mengaktifkan output PLC
- menyimpan status internal
- mengontrol equipment

Contoh coil dalam sistem motor control:

```text id="motor_coil"
Motor Coil
```

Jika kondisi logika pada rung terpenuhi, PLC akan mengaktifkan coil tersebut.

Aktivasi coil kemudian akan menyebabkan **output PLC aktif**, yang pada sistem motor control biasanya akan mengaktifkan **motor contactor**.

Hubungan antara contact dan coil dalam ladder logic dapat digambarkan sebagai berikut.

```text id="ladder_basic_structure"
Contact Conditions
        │
        ▼
    Ladder Logic
        │
        ▼
        Coil
        │
        ▼
   Output Activation
```

Elemen contact dan coil inilah yang menjadi dasar untuk membangun berbagai pola logika kontrol, termasuk **motor start–stop control** yang akan dibahas pada bagian berikutnya.

---

# Section 3 — Signal Flow

Dalam sistem kontrol motor berbasis PLC, sinyal kontrol berasal dari **operator** yang memberikan perintah melalui **push button**.

Dua sinyal utama yang digunakan dalam kontrol motor sederhana adalah:

- **Start Push Button**
- **Stop Push Button**

Sinyal dari push button tersebut masuk ke PLC melalui **input module**, kemudian diproses oleh **ladder logic** untuk menentukan apakah motor harus dijalankan atau dihentikan.

Hubungan aliran sinyal dalam sistem kontrol motor sederhana dapat digambarkan sebagai berikut.

```text id="flow02"
Start Push Button
↓
PLC Ladder Logic
↓
Motor Contactor
↓
Motor Running
```

Penjelasan aliran sinyal:

1. **Start Push Button**
   Operator menekan tombol start untuk memberikan perintah menjalankan motor.

2. **PLC Ladder Logic**
   PLC membaca kondisi input dan mengevaluasi logika ladder untuk menentukan apakah coil motor harus diaktifkan.

3. **Motor Contactor**
   Jika logika terpenuhi, PLC mengaktifkan output yang mengendalikan motor contactor.

4. **Motor Running**
   Motor contactor menutup rangkaian daya motor sehingga motor mulai beroperasi.

Dalam implementasi sebenarnya, beberapa sinyal tambahan juga terlibat dalam logika kontrol motor.

Contoh sinyal yang umum digunakan:

- **Start PB** — perintah menjalankan motor
- **Stop PB** — perintah menghentikan motor
- **Motor Coil** — output PLC yang mengaktifkan motor contactor
- **Motor Auxiliary Contact** — feedback status motor dari contactor

Hubungan antara sinyal-sinyal tersebut dapat digambarkan sebagai berikut.

```text id="motor_signal_structure"
Start PB
Stop PB
Motor Auxiliary Contact
        │
        ▼
PLC Ladder Logic
        │
        ▼
Motor Coil
        │
        ▼
Motor Contactor
        │
        ▼
Motor Running
```

Aliran sinyal ini menunjukkan bagaimana PLC bertindak sebagai **penghubung antara perintah operator dan operasi equipment**.

Pada bagian berikutnya akan dijelaskan bagaimana PLC mengevaluasi sinyal-sinyal tersebut menggunakan **ladder logic** dalam rung program.

---

# Section 5 — Practical Example — Seal-In Circuit

Untuk menjaga motor tetap berjalan setelah tombol **Start** dilepas, sistem kontrol menggunakan pola logika yang disebut **seal-in circuit**.

Seal-in circuit memungkinkan PLC **menjaga coil output tetap aktif** dengan menggunakan kontak umpan balik dari output itu sendiri.

Contoh ladder logic untuk seal-in circuit adalah sebagai berikut.

```text id="ladder03"
Start PB     Stop PB
---[ ]--------[/]----+----( Motor )
                     |
Motor Contact -------+
```

Pada ladder ini terdapat tiga elemen utama:

- **Start Push Button** — memberikan perintah awal untuk menjalankan motor
- **Stop Push Button** — menghentikan motor
- **Motor Contact (Auxiliary Contact)** — menjaga coil tetap aktif

Kontak **Motor Contact** berasal dari **auxiliary contact pada motor contactor** atau status internal output PLC.

---

## Logika Kerja Seal-In Circuit

Urutan operasi dapat dijelaskan sebagai berikut.

1. **Operator menekan Start PB**

   Ketika tombol start ditekan, contact **Start PB** menjadi TRUE sehingga PLC mengaktifkan **Motor Coil**.

2. **Motor coil aktif**

   PLC mengaktifkan output yang mengendalikan **motor contactor**.

3. **Motor auxiliary contact ikut aktif**

   Ketika contactor motor aktif, **auxiliary contact motor** juga berubah menjadi aktif.

4. **Auxiliary contact menjaga coil tetap aktif**

   Kontak ini membentuk jalur paralel dengan **Start PB**, sehingga coil tetap aktif meskipun tombol start sudah dilepas.

Diagram logika ini membuat sistem memiliki perilaku berikut:

```text id="seal_in_behavior"
Start PB ditekan
→ Motor Start

Start PB dilepas
→ Motor tetap running
```

Motor akan terus berjalan sampai operator memberikan perintah berhenti.

---

## Kondisi Stop

Motor akan berhenti ketika **Stop Push Button ditekan**.

```text id="stop02"
Stop PB ditekan
```

Ketika tombol stop ditekan, contact **Stop PB (NC)** akan membuka sehingga aliran logika menuju coil terputus.

Akibatnya:

- Motor coil menjadi OFF
- Motor contactor membuka
- Motor berhenti

Seal-in circuit ini merupakan salah satu **pola logika paling dasar dalam sistem kontrol motor berbasis PLC** dan sangat umum digunakan pada berbagai equipment industri seperti pump, fan, dan conveyor.

---

# Section 6 — Troubleshooting Insight

Pemahaman mengenai **seal-in circuit** sangat penting bagi engineer yang melakukan troubleshooting sistem kontrol motor di plant industri.

Ketika motor tidak dapat start atau tidak dapat tetap berjalan, penyebabnya sering berkaitan dengan salah satu elemen dalam **rangkaian start–stop control**.

Pendekatan troubleshooting biasanya mengikuti urutan aliran kontrol berikut.

```text id="trb02"
Start Push Button
↓
Stop Push Button
↓
PLC Logic
↓
Motor Output
↓
Motor Contactor
```

Dengan mengikuti urutan ini, engineer dapat mengisolasi sumber masalah secara sistematis.

---

## Step 1 — Periksa Start Push Button

Langkah pertama adalah memastikan **Start Push Button berfungsi dengan benar**.

Engineer perlu memeriksa apakah sinyal start benar-benar diterima oleh PLC.

Kemungkinan masalah:

- push button rusak
- wiring input terputus
- input module PLC tidak membaca sinyal

Jika sinyal start tidak pernah berubah menjadi TRUE di PLC, motor tidak akan dapat start.

---

## Step 2 — Periksa Stop Push Button

Stop push button biasanya menggunakan **contact Normally Closed (NC)**.

Jika contact ini selalu terbuka, aliran logika menuju coil akan selalu terputus.

Kemungkinan masalah:

- stop push button rusak
- wiring terputus
- safety interlock terbuka

Akibatnya motor tidak akan pernah dapat start.

---

## Step 3 — Periksa PLC Logic

Jika sinyal start dan stop sudah benar, langkah berikutnya adalah memeriksa **ladder logic PLC**.

Engineer harus memastikan bahwa kondisi rung terpenuhi sehingga **Motor Coil dapat aktif**.

Jika logika tidak terpenuhi, PLC tidak akan mengaktifkan output motor.

---

## Step 4 — Periksa Motor Output dan Contactor

Jika PLC output sudah aktif tetapi motor tetap tidak berjalan, kemungkinan masalah berada pada **perangkat lapangan**.

Beberapa kemungkinan penyebab:

- motor contactor gagal menarik
- overload relay trip
- supply listrik ke motor terputus

Engineer biasanya memeriksa status berikut:

```text id="motor_output_check"
Motor Output = ON
Motor Contactor = OFF
```

Jika kondisi ini terjadi, berarti masalah berada pada **rangkaian daya motor**, bukan pada logika PLC.

---

## Troubleshooting Principle

Dengan memahami struktur seal-in circuit, engineer dapat menganalisis sistem kontrol motor menggunakan pendekatan berikut.

```text id="seal_in_troubleshooting_flow"
Start Command
↓
Stop Circuit
↓
PLC Logic
↓
Motor Output
↓
Contactor
↓
Motor
```

Pendekatan ini membantu engineer menemukan penyebab masalah secara sistematis tanpa harus langsung membongkar seluruh sistem kontrol.

---

Silakan **review Section 6**.

Jika sudah **OK**, langkah terakhir adalah menambahkan:

- **Summary (≤100 words)**
- **Tags**

sehingga **Artikel 2 selesai sepenuhnya seperti Artikel 1**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
