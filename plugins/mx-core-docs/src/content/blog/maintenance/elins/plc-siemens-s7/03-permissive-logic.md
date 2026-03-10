---
title: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman
authors: ['sam']
date: '2026-03-04'
tags: ['plc', 'siemens-s7', 'ladder-logic', 'permissive-logic', 'pump-control']
draft: false
summary: Permissive logic digunakan dalam sistem kontrol industri untuk memastikan bahwa equipment hanya dapat start ketika kondisi operasi yang diperlukan telah terpenuhi. PLC memeriksa beberapa sinyal permissive seperti status MCC, posisi valve, dan kondisi trip sebelum menerima start command dari operator. Jika semua kondisi permissive terpenuhi, PLC akan mengizinkan equipment untuk start. Jika salah satu kondisi tidak terpenuhi, start command akan ditolak. Pendekatan ini membantu mencegah equipment beroperasi dalam kondisi yang tidak aman dan melindungi sistem proses dari potensi kerusakan.
---

# **_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**

---

- [**_Artikel 3: Permissive Logic — Mencegah Equipment Start dalam Kondisi Tidak Aman_**](#artikel-3-permissive-logic--mencegah-equipment-start-dalam-kondisi-tidak-aman)
- [Section 1 — Operational Context](#section-1--operational-context)
- [Section 2 — Equipment Behaviour](#section-2--equipment-behaviour)
- [Section 3 — Control Requirement](#section-3--control-requirement)
- [Section 4 — Signal Logic](#section-4--signal-logic)
- [Section 5 — Ladder Logic Pattern](#section-5--ladder-logic-pattern)
- [Section 6 — Practical Example](#section-6--practical-example)
- [Section 7 — Engineering Notes](#section-7--engineering-notes)
  - [Permissive bukan Trip](#permissive-bukan-trip)
  - [Permissive biasanya berasal dari Instrument](#permissive-biasanya-berasal-dari-instrument)
  - [Permissive membantu mencegah operasi yang tidak aman](#permissive-membantu-mencegah-operasi-yang-tidak-aman)

---

# Section 1 — Operational Context

Dalam operasi plant industri, banyak equipment seperti **pump, compressor, dan fan** yang dikendalikan melalui sistem kontrol otomatis.

Operator biasanya memberikan perintah operasi melalui **start command** pada panel kontrol atau HMI.

Namun dalam sistem proses industri, equipment tidak boleh langsung start hanya karena operator menekan tombol **RUN**.

Sebelum equipment diizinkan untuk start, beberapa kondisi operasi harus terlebih dahulu terpenuhi.

Contoh kondisi yang sering digunakan sebagai syarat start:

- **Motor Control Center (MCC) dalam kondisi siap**
- **Valve berada pada posisi yang benar**
- **Tekanan proses berada dalam batas aman**

Kondisi-kondisi ini disebut sebagai **permissive conditions**.

Sistem kontrol harus memeriksa kondisi tersebut sebelum menerima perintah start dari operator.

Konsep ini disebut **permissive logic**.

Permissive logic memastikan bahwa **equipment hanya dapat start ketika kondisi operasi aman telah terpenuhi**.

Hubungan dasar antara perintah operator dan kondisi operasi dapat digambarkan sebagai berikut.

```
Operator Start Command
        │
        ▼
Permissive Conditions Check
        │
        ▼
Equipment Start Allowed
```

Dengan pendekatan ini, sistem kontrol mencegah equipment beroperasi pada kondisi yang dapat menyebabkan:

- kerusakan equipment
- gangguan proses
- kondisi operasi yang tidak aman

Permissive logic merupakan salah satu mekanisme dasar dalam **control logic equipment** pada sistem otomasi industri.

---

# Section 2 — Equipment Behaviour

Untuk memahami permissive logic, kita dapat melihat contoh perilaku sistem pada **pump system**.

Pump dalam sistem proses biasanya digunakan untuk memindahkan fluida dari satu bagian proses ke bagian lain. Agar pump dapat beroperasi dengan aman, beberapa kondisi operasi harus dipenuhi sebelum pump diizinkan untuk start.

Contoh kondisi penting pada sistem pump adalah **posisi valve pada sisi suction**.

Jika suction valve tertutup, pump tidak boleh start karena dapat menyebabkan gangguan operasi seperti **aliran tidak terbentuk atau kerusakan pada pump**.

Misalkan operator menekan tombol **START PUMP**.

Namun pump hanya boleh start jika dua kondisi berikut terpenuhi:

- **Suction valve sudah dalam posisi open**
- **Motor Control Center (MCC) tidak dalam kondisi trip**

Jika salah satu kondisi tersebut belum terpenuhi, sistem kontrol harus menolak perintah start meskipun operator menekan tombol start.

Perilaku sistem yang diharapkan dapat digambarkan sebagai berikut.

```text id="permissive_behavior"
Start Command
AND Permissive Conditions
→ Pump Start
```

Dalam kondisi ini, **start command dari operator tidak langsung menjalankan pump**.

Sebaliknya, sistem kontrol terlebih dahulu memeriksa apakah semua kondisi permissive telah terpenuhi.

Jika semua kondisi permissive terpenuhi, PLC akan mengizinkan pump untuk start.

Jika salah satu kondisi permissive tidak terpenuhi, pump tidak akan start meskipun terdapat perintah start dari operator.

Perilaku ini memastikan bahwa pump hanya beroperasi ketika kondisi operasi berada dalam batas yang aman.

---

# Section 3 — Control Requirement

Dalam sistem kontrol industri, **start command dari operator tidak boleh langsung mengaktifkan equipment**. Sistem kontrol harus terlebih dahulu memastikan bahwa semua kondisi operasi yang diperlukan telah terpenuhi.

Kondisi-kondisi ini disebut **permissive conditions**.

PLC harus memeriksa seluruh permissive conditions sebelum mengizinkan equipment untuk start.

Sebagai contoh pada **pump system**, beberapa kondisi permissive yang umum digunakan adalah:

```text id="perm_pump_conditions"
MCC Healthy
AND
Suction Valve Open
AND
No Active Trip
```

Penjelasan kondisi permissive:

- **MCC Healthy**
  Motor Control Center harus dalam kondisi siap dan tidak mengalami trip.

- **Suction Valve Open**
  Valve pada sisi suction pump harus berada pada posisi open agar aliran fluida dapat masuk ke pump.

- **No Active Trip**
  Tidak terdapat kondisi trip yang masih aktif pada sistem proteksi pump.

PLC harus memeriksa seluruh kondisi tersebut sebelum menerima **start command dari operator**.

Hubungan antara start command dan permissive conditions dapat digambarkan sebagai berikut.

```text id="perm_logic_structure"
Start Command
AND
All Permissive Conditions
↓
Start Allowed
```

Jika semua kondisi permissive terpenuhi, PLC dapat mengizinkan start command dan mengaktifkan output untuk menjalankan pump.

Sebaliknya, jika salah satu kondisi permissive tidak terpenuhi, maka **start command harus ditolak** sehingga pump tidak akan dijalankan.

Pendekatan ini memastikan bahwa equipment hanya dapat beroperasi ketika kondisi operasi berada dalam batas yang aman.

---

# Section 4 — Signal Logic

Dalam permissive logic, PLC harus memeriksa beberapa sinyal sebelum mengizinkan equipment untuk start.

Proses ini disebut **permissive check**.

Hubungan dasar antara perintah start dan pemeriksaan kondisi permissive dapat digambarkan sebagai berikut.

```text id="perm_signal_logic"
Start Command
↓
Permissive Check
↓
Start Allowed
```

Ketika operator memberikan **start command**, PLC tidak langsung mengaktifkan output start.
PLC terlebih dahulu mengevaluasi seluruh sinyal permissive yang terkait dengan equipment tersebut.

Beberapa contoh sinyal permissive yang umum digunakan pada sistem pump adalah:

```text id="perm_signals"
Suction Valve Limit Switch
MCC Ready Signal
Trip Reset Status
```

Penjelasan sinyal permissive:

- **Suction Valve Limit Switch**
  Memberikan indikasi bahwa valve pada sisi suction sudah berada pada posisi open.

- **MCC Ready Signal**
  Menunjukkan bahwa motor control center dalam kondisi siap dan tidak mengalami trip.

- **Trip Reset Status**
  Menunjukkan bahwa tidak ada kondisi trip aktif yang mencegah pump untuk beroperasi.

PLC akan memeriksa seluruh sinyal tersebut selama eksekusi program.

Jika semua sinyal permissive berada pada kondisi yang benar, maka sistem kontrol akan mengizinkan start command.

Sebaliknya, jika salah satu sinyal permissive tidak terpenuhi, PLC tidak akan mengaktifkan output start sehingga equipment tetap dalam kondisi berhenti.

Pendekatan ini memastikan bahwa equipment hanya dapat dijalankan ketika semua kondisi operasi telah terpenuhi.

---

# Section 5 — Ladder Logic Pattern

Permissive logic dalam PLC biasanya diimplementasikan menggunakan **ladder logic** yang memeriksa seluruh kondisi permissive sebelum mengizinkan equipment untuk start.

Contoh ladder logic sederhana untuk permissive start dapat digambarkan sebagai berikut.

```text id="perm_ladder_pattern"
Start PB
---[ ]--------------------+
                          |
Suction Valve Open -------+
                          |
MCC Ready ----------------+
                          |
No Trip ------------------+
                          |
-------------------------( Pump Start )
```

Pada ladder ini terdapat beberapa kondisi yang harus terpenuhi sebelum coil **Pump Start** dapat aktif.

Elemen dalam ladder tersebut terdiri dari:

- **Start PB**
  Perintah start dari operator.

- **Suction Valve Open**
  Sinyal dari limit switch yang menunjukkan bahwa suction valve berada pada posisi open.

- **MCC Ready**
  Status bahwa motor control center siap untuk menjalankan motor.

- **No Trip**
  Menunjukkan bahwa tidak ada kondisi trip aktif pada sistem proteksi.

PLC akan mengevaluasi seluruh kondisi tersebut selama eksekusi rung ladder.

Logika yang diterapkan dapat dirangkum sebagai berikut.

```text id="perm_logic_equation"
Start Command
AND
Suction Valve Open
AND
MCC Ready
AND
No Trip
→ Pump Start
```

Artinya **pump hanya dapat start jika semua kondisi permissive terpenuhi**.

Jika salah satu kondisi permissive tidak terpenuhi, rung ladder akan bernilai FALSE sehingga coil **Pump Start** tidak akan aktif dan pump tidak akan dijalankan.

Pola ladder seperti ini merupakan bentuk dasar dari **permissive logic** yang digunakan dalam berbagai sistem kontrol equipment di plant industri.

---

# Section 6 — Practical Example

Sebagai contoh implementasi permissive logic dalam sistem kontrol industri, kita dapat melihat kasus pada **Pump P-101**.

Pump ini digunakan untuk memindahkan fluida dalam suatu sistem proses dan hanya boleh beroperasi ketika kondisi operasi telah memenuhi persyaratan yang aman.

Beberapa kondisi permissive yang digunakan pada sistem ini adalah sebagai berikut.

```text id="perm_p101"
Suction Valve Open
AND MCC Healthy
AND No Trip Active
```

Penjelasan kondisi permissive:

- **Suction Valve Open**
  Limit switch pada suction valve menunjukkan bahwa valve berada pada posisi open sehingga aliran fluida dapat masuk ke pump.

- **MCC Healthy**
  Motor Control Center dalam kondisi siap dan tidak mengalami trip.

- **No Trip Active**
  Tidak terdapat kondisi trip aktif yang mencegah pump untuk beroperasi.

Ketika operator menekan **Start P-101**, PLC tidak langsung mengaktifkan pump.

PLC terlebih dahulu memeriksa seluruh kondisi permissive yang telah ditentukan.

Alur logika kontrol dapat digambarkan sebagai berikut.

```text id="perm_start_sequence"
Start P-101 Command
↓
Permissive Conditions Check
↓
Pump Start Allowed
```

Jika semua kondisi permissive terpenuhi, PLC akan mengaktifkan output start untuk pump.

```text id="p101_start_output"
Pump Start Output = ON
```

Output ini kemudian mengaktifkan **motor contactor** sehingga pump mulai beroperasi.

Namun jika salah satu kondisi permissive tidak terpenuhi, PLC tidak akan mengaktifkan output start.

Akibatnya pump tetap berada dalam kondisi berhenti meskipun operator memberikan perintah start.

Pendekatan ini memastikan bahwa **Pump P-101 hanya dapat start ketika kondisi operasi berada dalam batas yang aman**.

---

# Section 7 — Engineering Notes

Beberapa prinsip penting perlu diperhatikan dalam implementasi **permissive logic** pada sistem kontrol industri.

---

## Permissive bukan Trip

Permissive logic hanya menentukan **apakah equipment diizinkan untuk start**.

Permissive tidak digunakan untuk menghentikan equipment yang sudah berjalan.

Dengan kata lain:

```text
Permissive → Start Authorization
Trip → Equipment Stop
```

Jika permissive condition tidak terpenuhi, PLC hanya akan **menolak start command**.

Namun jika equipment sudah berjalan, permissive logic tidak akan menghentikan equipment tersebut.

Fungsi penghentian equipment biasanya ditangani oleh **trip logic** atau **interlock system**, yang akan dibahas pada artikel berikutnya.

---

## Permissive biasanya berasal dari Instrument

Sebagian besar permissive signal berasal dari **instrument atau status equipment** di lapangan.

Contoh sumber permissive signal antara lain:

- **valve position switch**
- **pressure switch**
- **MCC ready signal**

Sinyal-sinyal ini memberikan informasi kepada PLC mengenai **kondisi operasi sistem**.

PLC kemudian menggunakan sinyal tersebut sebagai bagian dari **permissive check** sebelum mengizinkan equipment start.

---

## Permissive membantu mencegah operasi yang tidak aman

Salah satu tujuan utama permissive logic adalah **mencegah equipment beroperasi dalam kondisi yang berpotensi merusak sistem**.

Sebagai contoh pada sistem pump:

Pump tidak boleh start jika **suction valve tertutup**.

Jika pump dijalankan pada kondisi tersebut, aliran fluida tidak dapat terbentuk dan dapat menyebabkan fenomena seperti **pump cavitation** atau kerusakan mekanis pada pump.

Dengan menggunakan permissive logic, sistem kontrol dapat memastikan bahwa pump hanya diizinkan untuk start ketika kondisi operasi telah memenuhi persyaratan yang aman.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
