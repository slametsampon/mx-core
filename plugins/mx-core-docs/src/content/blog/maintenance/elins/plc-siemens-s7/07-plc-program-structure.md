---
title: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'plc-program-structure',
    'function-block',
    'industrial-automation',
  ]
draft: false
summary: Pada sistem kontrol industri yang besar, program PLC harus disusun secara modular agar mudah dipahami dan dipelihara. Pada PLC Siemens S7, struktur program biasanya menggunakan Organization Block (OB), Function Block (FB), dan Data Block (DB). OB berfungsi sebagai program utama yang dijalankan oleh CPU PLC, FB berisi fungsi kontrol yang dapat digunakan kembali untuk berbagai equipment, dan DB menyimpan data operasional untuk setiap instance equipment. Pendekatan modular ini membuat program PLC lebih terorganisasi, scalable, dan mudah dikembangkan pada sistem kontrol yang kompleks.
---

# **_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**

---

- [**_Artikel 7: PLC Program Structure (OB, FB, DB) — Menyusun Program Control yang Terstruktur_**](#artikel-7-plc-program-structure-ob-fb-db--menyusun-program-control-yang-terstruktur)
- [Section 1 — Programming Problem](#section-1--programming-problem)
- [Section 2 — PLC Program Structure](#section-2--plc-program-structure)
- [Section 3 — Functional Blocks](#section-3--functional-blocks)
  - [Organization Block (OB)](#organization-block-ob)
  - [Function Block (FB)](#function-block-fb)
  - [Data Block (DB)](#data-block-db)
- [Section 4 — Data Handling](#section-4--data-handling)
- [Section 5 — Program Organization](#section-5--program-organization)
- [Section 6 — Example Architecture](#section-6--example-architecture)
- [Section 7 — Engineering Notes](#section-7--engineering-notes)
  - [Gunakan modular design](#gunakan-modular-design)
  - [Hindari program monolithic](#hindari-program-monolithic)
  - [Gunakan reusable blocks](#gunakan-reusable-blocks)

---

# Section 1 — Programming Problem

Pada sistem kontrol kecil, ladder logic sering dapat ditulis dalam satu program sederhana.

Program PLC mungkin hanya mengontrol satu atau dua equipment, sehingga seluruh logika kontrol dapat ditempatkan dalam satu blok program.

Namun pada plant industri, PLC biasanya mengontrol banyak equipment sekaligus, seperti:

- banyak **pump**
- banyak **valve**
- banyak **sensor**
- banyak **sequence proses**

Jika seluruh logika kontrol tersebut ditulis dalam satu blok program yang besar, program PLC akan menjadi:

- sulit dibaca
- sulit dipelihara
- sulit dikembangkan

Program seperti ini sering disebut sebagai **monolithic program**, di mana seluruh logika kontrol berada dalam satu bagian program tanpa struktur yang jelas.

Masalah ini menjadi semakin besar ketika sistem kontrol berkembang dan semakin banyak equipment ditambahkan ke dalam sistem.

Untuk mengatasi masalah tersebut, PLC modern menggunakan **struktur program modular**.

Pendekatan modular memungkinkan program PLC dipecah menjadi beberapa blok fungsi yang lebih kecil sehingga program menjadi lebih terorganisasi dan mudah dikelola.

---

# Section 2 — PLC Program Structure

Pada PLC **Siemens S7**, struktur program biasanya dibangun menggunakan tiga elemen utama:

- **Organization Block (OB)**
- **Function Block (FB)**
- **Data Block (DB)**

Ketiga elemen ini membentuk dasar dari **arsitektur program PLC modular**.

Hubungan dasar struktur program dapat digambarkan sebagai berikut.

```text
OB
↓
FB
↓
DB
```

Penjelasan hubungan tersebut:

- **OB** berfungsi sebagai blok utama yang dijalankan oleh CPU PLC.
- **FB** berisi fungsi kontrol yang dapat digunakan kembali untuk berbagai equipment.
- **DB** digunakan untuk menyimpan data yang terkait dengan FB.

Dengan struktur ini, program PLC dapat dipisahkan menjadi beberapa bagian yang memiliki fungsi masing-masing.

Pendekatan ini membuat program PLC menjadi:

- lebih terorganisasi
- lebih mudah dipahami
- lebih mudah dikembangkan ketika sistem kontrol bertambah besar.

---

# Section 3 — Functional Blocks

Dalam PLC **Siemens S7**, struktur program modular dibangun menggunakan beberapa jenis blok yang memiliki fungsi berbeda.

Tiga blok utama yang paling sering digunakan adalah:

- **Organization Block (OB)**
- **Function Block (FB)**
- **Data Block (DB)**

Ketiga blok ini bekerja bersama untuk membentuk **arsitektur program PLC yang terstruktur**.

---

## Organization Block (OB)

**Organization Block (OB)** adalah blok yang dijalankan langsung oleh **CPU PLC**.

OB menentukan bagaimana dan kapan program PLC dieksekusi.

Beberapa contoh OB yang umum digunakan pada Siemens S7 antara lain:

- **OB1** → main program cycle
- **OB35** → cyclic interrupt task
- **OB100** → startup routine

Dalam sebagian besar sistem kontrol, **OB1** berfungsi sebagai **program utama** yang berjalan secara terus-menerus mengikuti **PLC scan cycle**.

OB1 biasanya tidak berisi seluruh logika kontrol secara langsung, tetapi berfungsi sebagai **program utama yang memanggil blok-blok fungsi lain**.

---

## Function Block (FB)

**Function Block (FB)** digunakan untuk membuat **fungsi kontrol yang dapat digunakan kembali (reusable)**.

FB biasanya digunakan untuk mengimplementasikan logika kontrol suatu equipment atau fungsi tertentu.

Contoh penggunaan FB dalam sistem kontrol industri:

- **motor control block**
- **valve control block**
- **pump control block**

Keuntungan utama FB adalah bahwa blok ini dapat **dipanggil berkali-kali** untuk mengontrol equipment yang berbeda.

Sebagai contoh, satu FB untuk **pump control** dapat digunakan untuk mengontrol banyak pump dalam satu sistem.

Pendekatan ini membuat program PLC menjadi lebih **konsisten dan mudah dipelihara**.

---

## Data Block (DB)

**Data Block (DB)** digunakan untuk menyimpan **data yang digunakan oleh Function Block**.

Data yang disimpan dalam DB dapat berupa berbagai jenis informasi yang berkaitan dengan operasi equipment.

Contoh data yang sering disimpan dalam DB:

- **status equipment**
- **timer values**
- **process variables**

Dalam implementasi Siemens S7, setiap FB biasanya memiliki **instance DB** yang menyimpan data spesifik untuk instance tersebut.

Dengan demikian satu FB dapat digunakan oleh banyak equipment, tetapi setiap equipment memiliki **data yang berbeda**.

---

# Section 4 — Data Handling

Ketika **Function Block (FB)** dijalankan oleh PLC, sistem akan menggunakan **Data Block (DB)** untuk menyimpan data yang terkait dengan operasi blok tersebut.

Hubungan antara FB dan DB dapat digambarkan sebagai berikut.

```text
Motor Control FB
↓
Motor Data DB
```

FB berisi **logika kontrol**, sedangkan DB menyimpan **data operasional** yang digunakan oleh logika tersebut.

Contoh data yang dapat disimpan dalam DB antara lain:

- **motor running status**
- **trip status**
- **permissive conditions**

Dengan menggunakan DB, setiap equipment dapat memiliki **data yang terpisah** meskipun menggunakan FB yang sama.

Sebagai contoh, satu FB untuk **motor control** dapat digunakan untuk banyak motor, tetapi setiap motor akan memiliki **DB instance sendiri** yang menyimpan status operasinya.

Pendekatan ini memungkinkan sistem kontrol menangani banyak equipment dengan **logika yang sama tetapi data yang berbeda**.

---

# Section 5 — Program Organization

Dalam sistem PLC yang lebih besar, program biasanya diorganisasi menggunakan struktur modular yang memisahkan fungsi kontrol berdasarkan jenis equipment atau fungsi proses.

Struktur program PLC biasanya diorganisasi sebagai berikut.

```text
OB1
↓
Motor Control FB
Valve Control FB
Sequence Control FB
```

Dalam struktur ini:

- **OB1** berfungsi sebagai program utama yang dijalankan oleh PLC secara terus-menerus.
- OB1 memanggil berbagai **Function Block** yang mengontrol equipment atau fungsi tertentu.
- Setiap FB kemudian menggunakan **Data Block** untuk menyimpan data operasionalnya.

Pendekatan ini memberikan beberapa keuntungan penting dalam pengembangan sistem kontrol industri.

Program PLC menjadi:

- **modular**
- **scalable**
- **mudah dipelihara**

Dengan struktur ini, engineer dapat menambahkan equipment baru atau memodifikasi fungsi kontrol tanpa harus mengubah seluruh program PLC.

---

# Section 6 — Example Architecture

Sebagai contoh implementasi struktur program modular pada PLC **Siemens S7**, kita dapat melihat arsitektur program untuk **sistem pump**.

Struktur dasar program dapat digambarkan sebagai berikut.

```text id="pump_arch_1"
OB1
 ↓
Pump Control FB
 ↓
Pump Instance DB
```

Pada struktur ini:

- **OB1** berfungsi sebagai program utama yang dijalankan oleh CPU PLC.
- **Pump Control FB** berisi logika kontrol pump, seperti permissive logic, start–stop control, dan trip logic.
- **Pump Instance DB** menyimpan data operasional yang terkait dengan pump tersebut.

Jika sistem memiliki beberapa pump, maka **Function Block yang sama dapat digunakan kembali**, tetapi setiap pump akan memiliki **Data Block yang berbeda**.

Struktur program dapat digambarkan sebagai berikut.

```text id="pump_arch_multi"
OB1
 ↓
Pump FB → DB_P101
Pump FB → DB_P102
Pump FB → DB_P103
```

Penjelasan struktur tersebut:

- **Pump FB** digunakan sebagai blok logika yang sama untuk semua pump.
- **DB_P101**, **DB_P102**, dan **DB_P103** menyimpan data untuk masing-masing pump.

Dengan pendekatan ini, engineer tidak perlu menulis logika pump berulang kali untuk setiap equipment.

Semua pump menggunakan **logika kontrol yang sama**, tetapi memiliki **data operasional yang berbeda**.

Pendekatan ini sangat umum digunakan dalam sistem kontrol industri karena membuat program PLC lebih mudah dikelola.

---

# Section 7 — Engineering Notes

Beberapa prinsip penting perlu diperhatikan dalam perancangan **struktur program PLC modular**.

---

## Gunakan modular design

Program PLC sebaiknya dibagi menjadi beberapa blok fungsi yang mewakili equipment atau fungsi kontrol tertentu.

Sebagai contoh:

- motor control block
- valve control block
- pump control block
- sequence control block

Dengan pendekatan ini setiap equipment memiliki **blok kontrol tersendiri** yang lebih mudah dipahami dan dipelihara.

---

## Hindari program monolithic

Program yang terlalu besar dan ditulis dalam satu blok akan menjadi sulit untuk:

- dibaca
- diuji
- dipelihara

Program monolithic juga meningkatkan risiko kesalahan ketika sistem kontrol dimodifikasi.

Pendekatan modular membantu mengurangi kompleksitas program.

---

## Gunakan reusable blocks

**Function Block (FB)** memungkinkan engineer membuat fungsi kontrol yang dapat digunakan kembali untuk berbagai equipment.

Sebagai contoh, satu **Pump Control FB** dapat digunakan untuk:

- Pump P-101
- Pump P-102
- Pump P-103

Setiap pump akan menggunakan **instance Data Block yang berbeda** untuk menyimpan datanya.

Pendekatan ini membuat program PLC lebih konsisten dan mempermudah pengembangan sistem kontrol pada plant yang besar.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
