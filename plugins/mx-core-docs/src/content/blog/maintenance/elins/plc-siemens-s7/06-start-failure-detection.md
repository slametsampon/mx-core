---
title: Start Failure Detection — Mendeteksi Equipment Gagal Start
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'start-failure-detection',
    'equipment-diagnostics',
    'pump-control',
  ]
draft: false
summary: Start failure detection digunakan dalam sistem kontrol industri untuk mendeteksi kondisi ketika perintah start telah diberikan tetapi equipment tidak berhasil mencapai kondisi running. PLC memonitor hubungan antara start command dan running feedback menggunakan timer delay untuk memberikan waktu bagi equipment mencapai kondisi operasi normal. Jika setelah waktu delay running feedback tidak muncul, sistem akan menghasilkan start failure alarm. Logika ini membantu operator dan engineer mendeteksi kegagalan start dengan cepat serta mempercepat proses troubleshooting pada equipment seperti pump, fan, dan compressor.
---

# **_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**

---

- [**_Artikel 6: Start Failure Detection — Mendeteksi Equipment Gagal Start_**](#artikel-6-start-failure-detection--mendeteksi-equipment-gagal-start)
- [Section 1 — Operational Context](#section-1--operational-context)
- [Section 2 — Equipment Behaviour](#section-2--equipment-behaviour)
- [Section 3 — Control Requirement](#section-3--control-requirement)
- [Section 4 — Signal Logic](#section-4--signal-logic)
- [Section 5 — Ladder Logic Pattern](#section-5--ladder-logic-pattern)
- [Section 6 — Practical Example](#section-6--practical-example)
- [Section 7 — Engineering Notes](#section-7--engineering-notes)
  - [Gunakan timer yang sesuai dengan karakteristik equipment](#gunakan-timer-yang-sesuai-dengan-karakteristik-equipment)
  - [Feedback harus berasal dari sumber yang valid](#feedback-harus-berasal-dari-sumber-yang-valid)
  - [Start failure detection membantu troubleshooting](#start-failure-detection-membantu-troubleshooting)

---

# Section 1 — Operational Context

Dalam operasi plant industri, banyak equipment seperti **pump, fan, dan compressor** dikendalikan melalui sistem kontrol otomatis berbasis PLC.

Operator biasanya memberikan perintah operasi melalui **start command** pada panel kontrol atau HMI.

Ketika operator menekan tombol **RUN**, PLC akan mengirimkan sinyal untuk mengaktifkan equipment.

Alur kontrol sederhana dapat digambarkan sebagai berikut.

```
Operator Command
↓
PLC Start Command
↓
Motor Contactor
↓
Equipment Start
```

Namun dalam praktik operasi plant, terdapat kondisi di mana **start command telah diberikan tetapi equipment tidak benar-benar start**.

Beberapa penyebab umum kegagalan start antara lain:

- motor overload trip
- breaker terbuka
- contactor gagal aktif
- mechanical jam pada equipment

Jika kondisi ini tidak terdeteksi oleh sistem kontrol, operator dapat mengira equipment telah berjalan padahal sebenarnya equipment tidak beroperasi.

Situasi ini dapat menyebabkan gangguan proses karena sistem kontrol menganggap equipment telah aktif.

Untuk mengatasi masalah ini, sistem kontrol sering menggunakan **start failure detection logic**.

Logika ini bertujuan untuk mendeteksi kondisi ketika **perintah start telah diberikan tetapi equipment tidak berhasil mencapai kondisi running**.

---

# Section 2 — Equipment Behaviour

Untuk memahami konsep start failure detection, kita dapat melihat contoh perilaku sistem pada **pump system**.

Misalkan operator memberikan perintah untuk menjalankan pump.

```
RUN command = ON
```

PLC kemudian mengaktifkan output yang mengendalikan **motor contactor**.

Dalam kondisi normal, ketika motor benar-benar beroperasi, sistem akan menerima sinyal konfirmasi berupa **running feedback**.

Hubungan antara perintah start dan feedback dapat digambarkan sebagai berikut.

```
RUN Command
↓
Motor Start
↓
Running Feedback
```

Running feedback biasanya berasal dari:

- auxiliary contact pada contactor
- motor running signal dari MCC
- sensor proses seperti flow switch

Namun jika motor gagal start, maka sistem akan mendeteksi kondisi berikut.

```
RUN command ON
AND
RUN feedback OFF
```

Kondisi ini menunjukkan bahwa **perintah start telah diberikan tetapi equipment tidak berhasil mencapai kondisi running**.

Situasi ini dikenal sebagai **start failure**.

Start failure detection memungkinkan sistem kontrol mengetahui bahwa equipment gagal start sehingga operator dapat segera melakukan pemeriksaan terhadap penyebab kegagalan tersebut.

---

# Section 3 — Control Requirement

Dalam sistem kontrol industri, PLC harus mampu mendeteksi kondisi ketika **perintah start telah diberikan tetapi equipment tidak berhasil mencapai kondisi running**.

Kondisi yang harus dideteksi oleh sistem kontrol adalah sebagai berikut.

```text id="start_fail_condition"
Start command aktif
Tetapi equipment tidak memberikan feedback running
```

Namun deteksi kegagalan start tidak boleh dilakukan secara langsung setelah perintah start diberikan.

Hal ini karena sebagian besar equipment memerlukan **waktu tertentu untuk mencapai kondisi running**.

Contoh waktu yang diperlukan oleh equipment:

- **motor acceleration time**
- **valve opening time**
- **pump priming time**

Jika sistem kontrol memeriksa running feedback terlalu cepat, maka sistem dapat menghasilkan **false alarm** meskipun equipment sebenarnya sedang dalam proses start.

Karena itu sistem kontrol biasanya menggunakan **timer delay** sebelum melakukan pemeriksaan start failure.

Timer ini memberikan waktu yang cukup bagi equipment untuk mencapai kondisi running.

---

# Section 4 — Signal Logic

Logika dasar dalam **start failure detection** melibatkan hubungan antara perintah start dan sinyal running feedback.

Hubungan ini dapat digambarkan sebagai berikut.

```text id="start_feedback_flow"
RUN command
↓
Equipment Start
↓
Running Feedback
```

Dalam kondisi normal, ketika perintah RUN diberikan, equipment akan start dan kemudian menghasilkan **running feedback** sebagai konfirmasi bahwa equipment benar-benar beroperasi.

Namun dalam kondisi kegagalan start, sistem akan mendeteksi pola berikut.

```text id="start_fail_logic"
RUN command ON
AND
Running Feedback OFF
AFTER delay
→ Start Failure Alarm
```

Logika ini berarti bahwa PLC akan memeriksa apakah **running feedback muncul setelah waktu tertentu**.

Jika setelah waktu delay tersebut feedback masih belum muncul, maka sistem akan menghasilkan **Start Failure Alarm**.

Timer delay digunakan untuk memberikan waktu yang cukup bagi equipment untuk mencapai kondisi running sebelum sistem menyatakan bahwa start telah gagal.

---

# Section 5 — Ladder Logic Pattern

Dalam PLC, start failure detection biasanya diimplementasikan menggunakan **timer dan pemeriksaan running feedback**.

Contoh pattern ladder sederhana dapat digambarkan sebagai berikut.

```text id="start_fail_ladder"
RUN Command
----[ ]--------------------( Start Timer )

Start Timer Done
----[ ]----[/ Running Feedback ]----( Start Fail Alarm )
```

Penjelasan logika:

1. Ketika **RUN command aktif**, PLC akan memulai **start timer**.
2. Timer memberikan waktu bagi equipment untuk mencapai kondisi running.
3. Setelah timer selesai (**Timer Done**), PLC memeriksa status **running feedback**.
4. Jika running feedback masih OFF, sistem akan menghasilkan alarm **Start Fail**.

Dengan logika ini, sistem kontrol dapat membedakan antara:

```text id="start_result"
Normal Start
→ Running Feedback muncul

Start Failure
→ Running Feedback tidak muncul
```

Sehingga operator dapat mengetahui bahwa equipment gagal start dan melakukan pemeriksaan lebih lanjut.

---

# Section 6 — Practical Example

Sebagai contoh implementasi **start failure detection**, kita dapat melihat kasus pada **Pump P-101**.

Operator memberikan perintah untuk menjalankan pump.

```text id="p101_start_cmd"
Start P-101
```

PLC kemudian mengaktifkan output yang mengendalikan **motor contactor** sehingga pump mulai melakukan proses start.

Dalam kondisi normal, setelah motor berhasil start, sistem akan menerima sinyal konfirmasi berupa **running feedback**.

```text id="p101_running_feedback"
Motor Running Feedback
```

Running feedback biasanya berasal dari:

- auxiliary contact pada contactor
- motor running signal dari MCC
- sensor proses seperti flow switch

Namun jika pump gagal start, running feedback tidak akan muncul.

Untuk mendeteksi kondisi ini, PLC menggunakan **timer delay** sebelum melakukan pemeriksaan feedback.

Sebagai contoh, sistem dapat menggunakan delay selama **5 detik**.

Logika sistem dapat digambarkan sebagai berikut.

```text id="p101_start_fail_logic"
Start Command
↓
Start Timer (5 s)
↓
Check Running Feedback
```

Jika setelah 5 detik **running feedback tidak muncul**, sistem akan menghasilkan alarm kegagalan start.

```text id="p101_start_fail_alarm"
Start Fail Alarm = ON
```

Alarm ini memberi informasi kepada operator bahwa **Pump P-101 gagal start**, sehingga operator dapat segera memeriksa penyebab kegagalan tersebut.

---

# Section 7 — Engineering Notes

Beberapa prinsip penting perlu diperhatikan dalam implementasi **start failure detection logic**.

---

## Gunakan timer yang sesuai dengan karakteristik equipment

Waktu delay pada start failure detection harus disesuaikan dengan karakteristik equipment.

Sebagai contoh:

- **motor kecil** biasanya memiliki waktu start yang relatif singkat
- **motor besar** dapat memerlukan waktu akselerasi yang lebih lama

Jika timer terlalu pendek, sistem dapat menghasilkan **false start failure alarm** meskipun equipment sebenarnya sedang dalam proses start.

---

## Feedback harus berasal dari sumber yang valid

Sinyal running feedback harus berasal dari sumber yang benar-benar menunjukkan bahwa equipment telah beroperasi.

Contoh sumber feedback yang umum digunakan:

- **auxiliary contact contactor**
- **motor running signal dari MCC**
- **flow switch pada pump**

Pemilihan sumber feedback yang tepat sangat penting agar sistem dapat mendeteksi kondisi running secara akurat.

---

## Start failure detection membantu troubleshooting

Start failure detection sangat membantu dalam proses **troubleshooting sistem kontrol**.

Dengan adanya logika ini, operator dapat segera mengetahui bahwa equipment gagal start tanpa harus langsung melakukan pemeriksaan ke lapangan.

Informasi ini memungkinkan operator dan engineer untuk:

- mempercepat identifikasi masalah
- mengurangi waktu downtime equipment
- meningkatkan keandalan sistem kontrol.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
```
