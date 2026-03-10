---
title: Shutdown Logic & Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat
authors: ['sam']
date: '2026-03-04'
tags:
  [
    'plc',
    'siemens-s7',
    'shutdown-logic',
    'cause-effect-matrix',
    'process-safety',
    'pump-control',
    'industrial-automation',
    'emergency-shutdown',
  ]
draft: false
summary: Artikel ini membahas Shutdown Logic dan Cause–Effect Matrix pada sistem kontrol PLC untuk menghentikan operasi proses secara aman ketika kondisi darurat terjadi. Menggunakan contoh pump transfer system, artikel menjelaskan bagaimana PLC menggabungkan beberapa sinyal proses seperti high level tank, high pressure piping, dan emergency stop untuk memicu shutdown sistem. Logika shutdown kemudian menghasilkan beberapa aksi sekaligus seperti menghentikan pump, menutup isolation valve, dan mengirim alarm ke operator. Pendekatan cause–effect memastikan bahwa respon shutdown berlangsung cepat, terkoordinasi, dan mampu mencegah eskalasi kegagalan proses yang dapat menyebabkan kerusakan equipment atau insiden keselamatan.
---

# **_Artikel 10: Shutdown Logic & Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat_**

---

- [**_Artikel 10: Shutdown Logic \& Cause–Effect — Menghentikan Sistem Secara Aman Saat Kondisi Darurat_**](#artikel-10-shutdown-logic--causeeffect--menghentikan-sistem-secara-aman-saat-kondisi-darurat)
  - [1. Equipment Context](#1-equipment-context)
  - [2. Operational Problem](#2-operational-problem)
    - [Equipment berhenti terlalu lambat](#equipment-berhenti-terlalu-lambat)
    - [Shutdown tidak terkoordinasi](#shutdown-tidak-terkoordinasi)
    - [Operator tidak mengetahui penyebab shutdown](#operator-tidak-mengetahui-penyebab-shutdown)
  - [3. Physical Mechanism](#3-physical-mechanism)
  - [4. Control Objective](#4-control-objective)
    - [1. Menghentikan equipment secara cepat](#1-menghentikan-equipment-secara-cepat)
    - [2. Mencegah eskalasi kondisi proses](#2-mencegah-eskalasi-kondisi-proses)
    - [3. Mengidentifikasi penyebab shutdown](#3-mengidentifikasi-penyebab-shutdown)
    - [4. Mengkoordinasikan respon beberapa equipment](#4-mengkoordinasikan-respon-beberapa-equipment)
  - [5. Instrument and Signal Mapping](#5-instrument-and-signal-mapping)
    - [Mapping Sinyal Shutdown System](#mapping-sinyal-shutdown-system)
    - [Process Instrument Signal](#process-instrument-signal)
    - [Emergency Shutdown Signal](#emergency-shutdown-signal)
    - [Shutdown Logic Signal](#shutdown-logic-signal)
    - [Output Shutdown Command](#output-shutdown-command)
    - [Hubungan Cause dan Effect](#hubungan-cause-dan-effect)
  - [6. Ladder Logic Implementation](#6-ladder-logic-implementation)
    - [Struktur Cause–Effect Shutdown Logic](#struktur-causeeffect-shutdown-logic)
    - [Shutdown Trigger Logic](#shutdown-trigger-logic)
    - [Effect 1 — Stop Pump](#effect-1--stop-pump)
    - [Effect 2 — Close Isolation Valve](#effect-2--close-isolation-valve)
    - [Effect 3 — Generate Alarm](#effect-3--generate-alarm)
    - [Struktur Cause–Effect Matrix](#struktur-causeeffect-matrix)
    - [Karakteristik Shutdown Logic](#karakteristik-shutdown-logic)
  - [7. System Response](#7-system-response)
    - [Scenario 1 — High Level Tank](#scenario-1--high-level-tank)
    - [Scenario 2 — High Pressure Piping](#scenario-2--high-pressure-piping)
    - [Scenario 3 — Emergency Stop](#scenario-3--emergency-stop)
    - [Karakteristik Respon Shutdown System](#karakteristik-respon-shutdown-system)
  - [8. Troubleshooting Guide](#8-troubleshooting-guide)
    - [Step 1 — Identifikasi Cause](#step-1--identifikasi-cause)
    - [Step 2 — Verifikasi Kondisi Proses](#step-2--verifikasi-kondisi-proses)
    - [Step 3 — Periksa Instrument](#step-3--periksa-instrument)
    - [Step 4 — Periksa Logic PLC](#step-4--periksa-logic-plc)
    - [Kesimpulan Teknis](#kesimpulan-teknis)

---

## 1. Equipment Context

Pada level sistem proses, penghentian equipment sering kali melibatkan **beberapa peralatan sekaligus**.

Satu kondisi abnormal dapat mempengaruhi keseluruhan sistem proses.

Contoh sistem yang digunakan pada artikel ini adalah **pump transfer system**.

Komponen utama sistem:

- **Transfer pump**
- **Suction piping**
- **Discharge piping**
- **Storage tank**
- **Isolation valve**

Komponen instrumentasi dan kontrol:

- **Level transmitter**
- **Pressure transmitter**
- **Motor starter MCC**
- **PLC**

Hubungan antar disiplin dalam sistem:

| Discipline      | Komponen                     |
| --------------- | ---------------------------- |
| Mechanical      | pump, piping, valve          |
| Electrical      | motor starter                |
| Instrumentation | pressure & level transmitter |
| Control         | PLC shutdown logic           |

Pada sistem seperti ini, satu kondisi abnormal dapat memicu **shutdown beberapa equipment secara bersamaan**.

Contoh:

```text
tank penuh
↓
pump harus berhenti
↓
valve harus ditutup
```

PLC mengelola respon ini melalui **shutdown logic berbasis cause–effect**.

---

## 2. Operational Problem

Jika shutdown logic tidak dirancang dengan benar, beberapa masalah dapat terjadi.

---

### Equipment berhenti terlalu lambat

Jika pump terus berjalan ketika sistem sudah berada dalam kondisi tidak aman:

```text
tank penuh
↓
pump tetap running
↓
tekanan discharge meningkat
```

Hal ini dapat menyebabkan **overpressure pada piping system**.

---

### Shutdown tidak terkoordinasi

Jika beberapa equipment berhenti tanpa urutan yang benar:

```text
pump stop
↓
valve tetap terbuka
↓
reverse flow
```

Kondisi ini dapat merusak pump atau sistem downstream.

---

### Operator tidak mengetahui penyebab shutdown

Jika sistem hanya mematikan equipment tanpa memberikan informasi penyebabnya:

- operator sulit melakukan recovery
- troubleshooting menjadi lambat.

Karena itu sistem shutdown harus dirancang menggunakan **cause–effect logic**.

---

## 3. Physical Mechanism

Shutdown logic biasanya dibuat berdasarkan **mekanisme fisik kegagalan proses**.

Contoh pada **transfer pump system ketika tank downstream penuh**.

```text
level tank meningkat
↓
tank mencapai kapasitas maksimum
↓
fluida tidak dapat diterima oleh tank
↓
tekanan discharge meningkat
↓
piping dan valve mengalami stress
↓
potensi kebocoran fluida
```

Jika pump tidak dihentikan, tekanan dapat terus meningkat hingga melebihi batas desain piping.

---

✔ Mekanisme Overpressure pada Sistem Transfer Pump

![Image](https://vhost-ln-s01-cdn.hcwebsite.com/34c0fa9eac4849f03323d944a556707d/res/en/20240808/86a42f8f12507989_57_0_auto.jpg?_=mSth5gMf&rid=2862)

![Image](https://www.pumpfundamentals.com/images/tutorial/pump_15.jpg)

![Image](https://control.com/uploads/textbooks/psv_09.jpg)

![Image](https://control.com/uploads/textbooks/psv_02.jpg)

Instrument seperti **level transmitter** digunakan untuk mendeteksi kondisi tersebut.

Ketika level tank mencapai batas tertentu:

```text
HIGH_LEVEL = TRUE
↓
PLC menerima sinyal trip
↓
pump dihentikan
```

Shutdown ini mencegah tekanan sistem meningkat lebih lanjut.

---

## 4. Control Objective

Shutdown logic dirancang untuk mencapai beberapa tujuan utama.

---

### 1. Menghentikan equipment secara cepat

Ketika kondisi berbahaya terdeteksi, PLC harus segera menghentikan equipment.

Contoh:

```text
HIGH_PRESS
↓
pump stop
```

Respon yang cepat mencegah kerusakan equipment.

---

### 2. Mencegah eskalasi kondisi proses

Shutdown dilakukan sebelum kondisi proses berkembang menjadi insiden besar.

Contoh eskalasi yang ingin dicegah:

- overpressure
- overflow tank
- piping rupture.

---

### 3. Mengidentifikasi penyebab shutdown

Sistem harus mampu menunjukkan **cause yang memicu shutdown**.

Contoh:

```text
cause = HIGH_LEVEL
effect = pump stop
```

Informasi ini penting untuk troubleshooting.

---

### 4. Mengkoordinasikan respon beberapa equipment

Dalam banyak sistem proses, satu cause dapat menghasilkan beberapa effect.

Contoh:

```text
HIGH_LEVEL
↓
stop pump
close valve
generate alarm
```

Struktur ini disebut **cause–effect matrix**.

---

## 5. Instrument and Signal Mapping

Agar PLC dapat menjalankan **shutdown logic berbasis cause–effect**, PLC harus menerima sinyal dari berbagai instrument proses dan sistem proteksi.

Sinyal ini digunakan untuk:

- mendeteksi **kondisi berbahaya (cause)**
- memicu **aksi shutdown (effect)** pada beberapa equipment sekaligus.

Dalam sistem pump transfer, PLC memonitor kondisi proses seperti:

- level tank
- tekanan piping
- emergency stop system.

---

✔ Arsitektur Sinyal Cause–Effect Shutdown

![Image](https://cdn.automationforum.co/uploads/2021/09/image-14.png)

![Image](https://cdn.automationforum.co/uploads/2023/01/cause-and-effect-drawing.png)

![Image](https://cdn.automationforum.co/uploads/2025/04/Signals-for-Emergency-Valve-Shutdown-in-Critical-Processes-4-1024x670.jpg)

![Image](https://www.researchgate.net/publication/301269975/figure/fig1/AS%3A361428235112448%401463182614448/st-separation-system-with-the-ESD-system-19-Rectangular-with-dot-line-in-Figure-1_Q320.jpg)

PLC menggabungkan berbagai sinyal **shutdown cause** menjadi satu status logika yang disebut:

```text id="4qf2gq"
SHUTDOWN_ACTIVE
```

Jika status ini aktif maka PLC menjalankan respon shutdown.

---

### Mapping Sinyal Shutdown System

Contoh mapping sinyal untuk pump shutdown system.

| Signal          | Source                | PLC Type | Function           |
| --------------- | --------------------- | -------- | ------------------ |
| HIGH_LEVEL      | level transmitter     | DI       | shutdown cause     |
| HIGH_PRESS      | pressure transmitter  | DI       | shutdown cause     |
| ESD_SIGNAL      | emergency stop system | DI       | emergency shutdown |
| SHUTDOWN_ACTIVE | PLC logic             | internal | shutdown state     |
| MOTOR_CMD       | PLC output            | DO       | motor control      |
| VALVE_CLOSE_CMD | PLC output            | DO       | isolation valve    |

Mapping ini membentuk **jalur proteksi proses** dari instrument hingga equipment shutdown.

---

### Process Instrument Signal

Instrument proses digunakan untuk mendeteksi kondisi abnormal pada sistem.

Contoh:

```text id="vph2th"
HIGH_LEVEL
HIGH_PRESS
```

Sinyal ini biasanya berasal dari:

- **level transmitter dengan high-high setpoint**
- **pressure transmitter dengan trip setpoint**

Ketika salah satu sinyal aktif, PLC menganggap sistem berada dalam kondisi tidak aman.

---

### Emergency Shutdown Signal

Selain instrument proses, shutdown juga dapat dipicu oleh **Emergency Stop System (ESD)**.

Contoh:

```text id="ycyw2d"
ESD_SIGNAL
```

Sinyal ini biasanya berasal dari:

- push button emergency stop
- fire and gas system
- plant shutdown system.

Jika ESD aktif maka PLC harus menghentikan seluruh equipment terkait.

---

### Shutdown Logic Signal

Semua sinyal cause digabungkan dalam satu logika shutdown.

```text id="3s8pdt"
SHUTDOWN_ACTIVE =
HIGH_LEVEL
OR HIGH_PRESS
OR ESD_SIGNAL
```

Jika salah satu cause aktif maka sistem memasuki kondisi shutdown.

---

### Output Shutdown Command

Ketika shutdown aktif, PLC mengirim beberapa command sekaligus.

Contoh output command:

```text id="b30q07"
MOTOR_CMD = OFF
VALVE_CLOSE_CMD = ON
```

Urutan respon sistem:

```text id="9t9j87"
PLC shutdown logic
↓
pump stop
↓
isolation valve close
↓
alarm operator
```

Output ini memastikan bahwa **aliran fluida dihentikan dan sistem proses diisolasi**.

---

### Hubungan Cause dan Effect

Dalam shutdown system, hubungan cause dan effect biasanya disusun dalam bentuk **cause–effect matrix**.

Contoh sederhana:

| Cause      | Effect                  |
| ---------- | ----------------------- |
| HIGH_LEVEL | stop pump               |
| HIGH_PRESS | stop pump               |
| ESD_SIGNAL | stop pump + close valve |

Dengan struktur ini PLC dapat memberikan respon shutdown yang **cepat dan terkoordinasi**.

---

## 6. Ladder Logic Implementation

### Struktur Cause–Effect Shutdown Logic

Shutdown logic pada PLC biasanya dibangun menggunakan **logika cause–effect**.
Setiap **cause** adalah kondisi proses berbahaya yang memicu respon sistem.

Struktur dasar shutdown:

```text
CAUSE
↓
SHUTDOWN LOGIC
↓
EFFECT
```

PLC memonitor beberapa sinyal cause secara bersamaan dan kemudian mengaktifkan **shutdown state** jika salah satu cause aktif.

---

✔ Struktur Ladder Cause–Effect Shutdown

![Image](https://www.ato.com/Content/Images/uploaded/blog/plc-water-level-control-start-stop-logic.jpg)

![Image](https://media.licdn.com/dms/image/v2/D5612AQEHHMhgo1FNiA/article-inline_image-shrink_400_744/article-inline_image-shrink_400_744/0/1699162459842?e=2147483647&t=2h7bDFbJQ022zelBgNLHzER0OowbRyvNJJ94Ggv1TOA&v=beta)

![Image](https://www.researchgate.net/publication/382070403/figure/fig5/AS%3A11431281259334909%401720441305192/Emergency-stop-state-logic-diagram-for-PLC-software.png)

![Image](https://www.researchgate.net/publication/280845910/figure/fig5/AS%3A668580588822549%401536413442899/Diagram-of-supply-and-emergency-stop-of-the-installation.jpg)

Langkah pertama dalam implementasi ladder adalah membangun **shutdown trigger logic**.

---

### Shutdown Trigger Logic

Semua cause digabungkan menggunakan logika **OR**.

```text
SHUTDOWN_ACTIVE =
HIGH_LEVEL
OR HIGH_PRESS
OR ESD_SIGNAL
```

Jika salah satu kondisi aktif maka:

```text
SHUTDOWN_ACTIVE = TRUE
```

PLC kemudian menjalankan respon shutdown.

---

### Effect 1 — Stop Pump

Efek pertama dari shutdown biasanya adalah menghentikan equipment utama.

Contoh pada pump system:

```text
IF SHUTDOWN_ACTIVE
→ MOTOR_CMD = OFF
```

Respon fisik sistem:

```text
PLC output OFF
↓
kontaktor MCC de-energize
↓
motor stop
↓
pump berhenti
```

Ini menghentikan aliran fluida menuju sistem downstream.

---

### Effect 2 — Close Isolation Valve

Selain menghentikan pump, sistem juga dapat menutup valve untuk mengisolasi proses.

Logika ladder:

```text
IF SHUTDOWN_ACTIVE
→ VALVE_CLOSE_CMD = ON
```

Respon sistem:

```text
PLC output
↓
valve actuator bergerak
↓
isolation valve menutup
```

Hal ini mencegah fluida terus mengalir dalam sistem.

---

### Effect 3 — Generate Alarm

Shutdown juga harus memberikan informasi kepada operator.

Logika alarm:

```text
IF SHUTDOWN_ACTIVE
→ SHUTDOWN_ALARM = TRUE
```

Alarm akan muncul pada:

- **HMI**
- **SCADA system**
- **control room annunciator**

Operator dapat segera mengetahui bahwa sistem telah memasuki kondisi shutdown.

---

### Struktur Cause–Effect Matrix

Dalam sistem yang lebih kompleks, hubungan cause–effect biasanya disusun dalam bentuk **matrix**.

Contoh sederhana:

| Cause      | Effect                  |
| ---------- | ----------------------- |
| HIGH_LEVEL | stop pump               |
| HIGH_PRESS | stop pump               |
| ESD_SIGNAL | stop pump + close valve |

PLC menerjemahkan matrix ini menjadi rung ladder yang menghubungkan cause dengan effect.

---

### Karakteristik Shutdown Logic

Shutdown logic memiliki beberapa karakteristik penting:

1. **multiple cause detection**
2. **simultaneous equipment shutdown**
3. **fast response time**

Shutdown biasanya diprioritaskan di atas semua logika kontrol lainnya untuk memastikan **keselamatan sistem proses**.

---

## 7. System Response

Setelah **shutdown logic** diimplementasikan dalam PLC, sistem akan terus memonitor seluruh **shutdown cause** pada setiap **scan cycle**.

Jika salah satu cause aktif, PLC segera mengubah status sistem menjadi:

```text
SHUTDOWN_ACTIVE = TRUE
```

Status ini kemudian memicu berbagai **effect shutdown** secara bersamaan.

Struktur respon shutdown dapat digambarkan sebagai berikut:

```text
CAUSE DETECTED
↓
SHUTDOWN_ACTIVE
↓
STOP EQUIPMENT
↓
ISOLATE PROCESS
↓
GENERATE ALARM
```

Dengan pendekatan ini sistem dapat **menghentikan proses secara cepat sebelum kondisi berkembang menjadi kegagalan sistem**.

---

✔ Respon Sistem Shutdown Logic

![Image](https://www.mdpi.com/energies/energies-17-01157/article_deploy/html/images/energies-17-01157-g001.png)

![Image](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1007%2Fs11668-022-01359-z/MediaObjects/11668_2022_1359_Fig4_HTML.png)

![Image](https://d36z6dgmsq8u8z.cloudfront.net/userfiles/dezurik/valve-selection-for-pump-station-dezurik-012322_pdf.jpg)

![Image](https://www.researchgate.net/publication/364148392/figure/fig2/AS%3A11431281242335201%401715433642952/Process-diagram-V1-feed-pump-relief-valve-V3-low-pressure-feed-flow-control-valve.tif)

---

### Scenario 1 — High Level Tank

Jika level tank mencapai batas maksimum.

Status instrument:

```text
HIGH_LEVEL = TRUE
```

PLC mengevaluasi shutdown logic.

```text
SHUTDOWN_ACTIVE = TRUE
```

PLC kemudian mengeksekusi effect shutdown.

```text
MOTOR_CMD = OFF
VALVE_CLOSE_CMD = ON
```

Respon sistem:

```text
pump stop
↓
isolation valve close
↓
aliran fluida dihentikan
```

Shutdown ini mencegah:

- **tank overflow**
- **overpressure pada piping**

---

### Scenario 2 — High Pressure Piping

Jika tekanan pada discharge piping melebihi batas aman.

Status instrument:

```text
HIGH_PRESS = TRUE
```

PLC mengaktifkan shutdown state.

```text
SHUTDOWN_ACTIVE = TRUE
```

Respon sistem:

```text
pump stop
↓
flow berhenti
↓
pressure sistem turun
```

Shutdown ini melindungi:

- piping system
- flange connection
- valve seat.

Jika pump terus berjalan dalam kondisi ini, tekanan dapat melebihi **design pressure piping**.

---

### Scenario 3 — Emergency Stop

Emergency stop biasanya digunakan untuk **kondisi darurat plant**.

Status sinyal:

```text
ESD_SIGNAL = TRUE
```

PLC segera menjalankan shutdown.

```text
SHUTDOWN_ACTIVE = TRUE
```

Respon sistem:

```text
pump stop
↓
isolation valve close
↓
alarm aktif
```

Emergency shutdown biasanya memiliki prioritas tertinggi dalam sistem kontrol.

---

### Karakteristik Respon Shutdown System

Shutdown logic memiliki beberapa karakteristik penting:

1. **respon cepat terhadap kondisi berbahaya**
2. **shutdown beberapa equipment sekaligus**
3. **prioritas lebih tinggi dari kontrol normal**

Dengan struktur ini PLC dapat memastikan bahwa sistem proses tetap berada dalam **batas operasi yang aman**.

---

## 8. Troubleshooting Guide

Ketika sistem proses memasuki kondisi **shutdown**, langkah pertama engineer adalah menentukan **cause yang memicu shutdown**.

Karena shutdown logic berbasis **cause–effect**, setiap shutdown selalu memiliki **trigger condition** yang dapat ditelusuri.

Urutan diagnosa biasanya mengikuti alur berikut:

```text id="zst2l2"
SHUTDOWN_ACTIVE
↓
identifikasi cause
↓
verifikasi kondisi proses
↓
verifikasi instrument
↓
verifikasi logic PLC
```

Pendekatan ini memastikan bahwa troubleshooting dilakukan secara sistematis dan tidak langsung menyalahkan PLC atau equipment tanpa verifikasi kondisi proses.

---

✔ Alur Diagnosa Shutdown System

![Image](https://cdn.automationforum.co/uploads/2024/03/on-off-val-trousho-1-scaled.jpg)

![Image](https://www.mdpi.com/engproc/engproc-70-00023/article_deploy/html/images/engproc-70-00023-g001.png)

![Image](https://www.researchgate.net/publication/382070403/figure/fig5/AS%3A11431281259334909%401720441305192/Emergency-stop-state-logic-diagram-for-PLC-software.png)

![Image](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11668-022-01359-z/MediaObjects/11668_2022_1359_Fig4_HTML.png)

Engineer harus memverifikasi empat hal utama:

1. **cause shutdown**
2. **kondisi proses**
3. **status instrument**
4. **logika shutdown PLC**

---

### Step 1 — Identifikasi Cause

Langkah pertama adalah menentukan **sinyal mana yang memicu shutdown**.

Contoh cause pada sistem pump:

```text id="5qv2be"
HIGH_LEVEL
HIGH_PRESS
ESD_SIGNAL
```

Engineer harus memeriksa status sinyal ini di PLC.

Contoh:

```text id="2m95i1"
HIGH_LEVEL = TRUE
```

Ini menunjukkan bahwa shutdown dipicu oleh **level tank yang terlalu tinggi**.

---

### Step 2 — Verifikasi Kondisi Proses

Setelah cause ditemukan, engineer harus memverifikasi kondisi proses di lapangan.

Contoh jika shutdown disebabkan oleh **HIGH_LEVEL**:

Engineer harus memeriksa:

- level tank aktual
- flow masuk tank
- status valve downstream.

Jika level memang tinggi maka shutdown adalah **respon sistem yang benar**.

---

### Step 3 — Periksa Instrument

Jika kondisi proses normal tetapi shutdown tetap terjadi, kemungkinan masalah berada pada instrument.

Contoh masalah instrument:

- transmitter drift
- sensor rusak
- impulse line tersumbat
- wiring instrument bermasalah.

Contoh kasus:

```text id="uw9vo8"
HIGH_PRESS = TRUE
```

Namun tekanan sebenarnya normal.

Ini menunjukkan kemungkinan **pressure transmitter error**.

---

### Step 4 — Periksa Logic PLC

Jika instrument normal tetapi shutdown tetap terjadi, engineer harus memeriksa logika PLC.

Beberapa kemungkinan kesalahan:

- alamat input salah
- logika OR yang tidak benar
- mapping sinyal yang salah.

Contoh kesalahan logika:

```text id="pmh6dr"
SHUTDOWN_ACTIVE =
HIGH_LEVEL
OR HIGH_PRESS
OR WRONG_SIGNAL
```

Jika sinyal yang tidak relevan dimasukkan dalam shutdown logic maka sistem dapat shutdown secara tidak normal.

---

### Kesimpulan Teknis

Shutdown logic digunakan untuk menghentikan sistem proses ketika kondisi operasi mencapai **batas berbahaya**.

Struktur cause–effect shutdown:

```text id="nwrv6h"
CAUSE
↓
SHUTDOWN LOGIC
↓
EFFECT
```

Troubleshooting shutdown harus mengikuti urutan diagnosa berikut:

```text id="m9c9us"
identifikasi cause
↓
verifikasi proses
↓
periksa instrument
↓
verifikasi logic PLC
```

Pendekatan ini memastikan bahwa engineer dapat menentukan **apakah shutdown terjadi karena kondisi proses yang benar, kegagalan instrument, atau kesalahan logika sistem kontrol**.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
