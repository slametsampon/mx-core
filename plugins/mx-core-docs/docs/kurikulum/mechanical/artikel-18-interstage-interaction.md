---
title: Stage Interaction & Intercooler Awareness pada Dual-Stage Reciprocating Compressor
authors: ['sam']
date: '2026-02-17'
tags:
  [
    'dual-stage-compressor',
    'intercooler-performance',
    'stage-interaction-analysis',
    'pressure-ratio-imbalance',
    'api-618-awareness',
    'nfpa-30-safety',
    'hydrocarbon-overheating-risk',
    'pemeliharaan-pabrik-petrokimia',
  ]
draft: false
summary: Artikel ini membahas interaksi antar stage dan peran intercooler pada dual-stage reciprocating compressor dengan pendekatan sistemik. Ditekankan pentingnya analisa pressure ratio dan temperatur per stage untuk mendeteksi ketidakseimbangan distribusi beban kompresi. Studi kasus menunjukkan kenaikan discharge temperature Stage 2 akibat fouling intercooler yang menurunkan efektivitas pendinginan, meningkatkan beban kompresi, dan risiko overheating pada gas hydrocarbon. Artikel mengintegrasikan aspek mechanical–instrument–control serta pertimbangan keselamatan sesuai API 618 dan prinsip pencegahan bahaya cairan mudah terbakar. Pendekatan berbasis trend ΔT intercooler dan pressure ratio memastikan diagnosis akurat sebelum pembongkaran cylinder dilakukan.
---

# 📘 ARTIKEL 18: Stage Interaction & Intercooler Awareness pada Dual-Stage Reciprocating Compressor

---

- [📘 ARTIKEL 18: Stage Interaction \& Intercooler Awareness pada Dual-Stage Reciprocating Compressor](#-artikel-18-stage-interaction--intercooler-awareness-pada-dual-stage-reciprocating-compressor)
- [1️⃣ Informasi Umum](#1️⃣-informasi-umum)
- [2️⃣ Learning Objective (Measurable \& Skill-Based)](#2️⃣-learning-objective-measurable--skill-based)
- [3️⃣ System Context \& Criticality](#3️⃣-system-context--criticality)
  - [A. Konfigurasi Sistem Dual-Stage](#a-konfigurasi-sistem-dual-stage)
  - [B. Fungsi Intercooler](#b-fungsi-intercooler)
  - [C. Dampak Jika Intercooler Gagal](#c-dampak-jika-intercooler-gagal)
  - [D. Interaksi Lintas Disiplin (Mechanical–Instrument–Control)](#d-interaksi-lintas-disiplin-mechanicalinstrumentcontrol)
- [4️⃣ Diagram Literacy Section (WAJIB)](#4️⃣-diagram-literacy-section-wajib)
  - [A. Posisi Discharge Stage 1](#a-posisi-discharge-stage-1)
  - [B. Jalur Intercooler (Cooling Water In/Out)](#b-jalur-intercooler-cooling-water-inout)
  - [C. Suction Stage 2](#c-suction-stage-2)
  - [D. Titik Pressure Measurement per Stage](#d-titik-pressure-measurement-per-stage)
  - [E. Titik Isolasi \& Proteksi](#e-titik-isolasi--proteksi)
  - [F. Jalur Energi (Energy Path)](#f-jalur-energi-energy-path)
- [5️⃣ Background \& Failure Scenario](#5️⃣-background--failure-scenario)
  - [A. Kronologi](#a-kronologi)
  - [B. Data Aktual](#b-data-aktual)
- [6️⃣ Symptom \& Initial Finding](#6️⃣-symptom--initial-finding)
  - [A. Terlihat (Observasi Lapangan)](#a-terlihat-observasi-lapangan)
  - [B. Terukur (Data Operasi)](#b-terukur-data-operasi)
  - [C. Asumsi Operator](#c-asumsi-operator)
- [7️⃣ Possible Causes (Structured Hypothesis)](#7️⃣-possible-causes-structured-hypothesis)
  - [A. Electrical](#a-electrical)
  - [B. Mechanical](#b-mechanical)
  - [C. Instrument](#c-instrument)
  - [D. Human Error](#d-human-error)
  - [E. System Interaction (Khusus Dual-Stage)](#e-system-interaction-khusus-dual-stage)
- [8️⃣ Step-by-Step Investigation Flow](#8️⃣-step-by-step-investigation-flow)
  - [1️⃣ Kumpulkan Data Pressure per Stage](#1️⃣-kumpulkan-data-pressure-per-stage)
  - [2️⃣ Bandingkan Temperatur Sebelum \& Sesudah Intercooler](#2️⃣-bandingkan-temperatur-sebelum--sesudah-intercooler)
  - [3️⃣ Verifikasi Cooling Water ΔT (Inlet vs Outlet)](#3️⃣-verifikasi-cooling-water-δt-inlet-vs-outlet)
  - [4️⃣ Review Trend Power Consumption](#4️⃣-review-trend-power-consumption)
  - [5️⃣ Eliminasi Kemungkinan Sensor Error](#5️⃣-eliminasi-kemungkinan-sensor-error)
  - [6️⃣ Verifikasi Lapangan Intercooler](#6️⃣-verifikasi-lapangan-intercooler)
    - [🔎 Decision Point Utama](#-decision-point-utama)
- [9️⃣ Root Cause \& Contributing Factor](#9️⃣-root-cause--contributing-factor)
  - [✅ Root Cause Teknis](#-root-cause-teknis)
  - [⚠ Contributing Factor](#-contributing-factor)
- [🔟 Reference to Standard \& Gap Analysis](#-reference-to-standard--gap-analysis)
  - [📉 Gap yang Ditemukan](#-gap-yang-ditemukan)
- [1️⃣1️⃣ Corrective \& Preventive Action](#1️⃣1️⃣-corrective--preventive-action)
  - [🔧 Immediate Action](#-immediate-action)
  - [🛠 Permanent Fix](#-permanent-fix)
  - [🔄 System Improvement](#-system-improvement)
  - [📊 Monitoring Plan](#-monitoring-plan)
- [1️⃣2️⃣ Risk \& Safety Reflection](#1️⃣2️⃣-risk--safety-reflection)
  - [⚠ Potensi Bahaya Terbesar](#-potensi-bahaya-terbesar)
  - [🔐 Permit \& Prosedur Wajib](#-permit--prosedur-wajib)
- [1️⃣3️⃣ Data Interpretation \& Trend Awareness](#1️⃣3️⃣-data-interpretation--trend-awareness)
  - [📈 Parameter Penting](#-parameter-penting)
  - [🔎 Early Warning Indicator](#-early-warning-indicator)
  - [📌 Prinsip Kunci](#-prinsip-kunci)
- [1️⃣4️⃣ Competency Mapping](#1️⃣4️⃣-competency-mapping)
  - [Kompetensi yang Diharapkan Setelah Pembelajaran](#kompetensi-yang-diharapkan-setelah-pembelajaran)
- [1️⃣5️⃣ Discussion Question (Toolbox Use)](#1️⃣5️⃣-discussion-question-toolbox-use)
- [1️⃣6️⃣ Key Takeaway (Max 7 Bullet)](#1️⃣6️⃣-key-takeaway-max-7-bullet)

---

# 1️⃣ Informasi Umum

1. **Judul Artikel**: Stage Interaction & Intercooler Awareness pada Dual-Stage Reciprocating Compressor

2. **Disiplin**: Mechanical (dengan interaksi Instrument & Control)

3. **Level**: Junior

4. **Kategori**:

   - Troubleshooting
   - Reliability
   - System Interaction

5. **Equipment / System Terkait**: Dual-Stage Reciprocating Compressor – Stage 1, Intercooler, Stage 2

6. **Referensi Standar**:

   - API 618
   - ASME Section VIII
   - NFPA 30

Artikel ini melengkapi pembahasan valve dan clearance dengan fokus pada **interaksi antar stage dan peran intercooler** sebagai elemen kritikal keseimbangan sistem kompresi.

<ResourceBox
  title="Artikel terkait :"
  items={[
    {
      name: 'Panduan Lengkap Kurikulum & Matriks Kompetensi',
      href: '/blog/maintenance/mechanical/panduan-kurikulum-mechanical',
      description:
        'Panduan Lengkap Kurikulum & Matriks Kompetensi – Teknisi Mechanical – Industri Petrokimia',
    },
    {
      name: 'Compressor Discharge Temperature Tinggi',
      href: '/blog/maintenance/mechanical/kurikulum/artikel-15-compressor-discharge',
      description:
        'Compressor Discharge Temperature Tinggi – Valve, Clearance, Cooling, atau Stage Interaction?',
    },
    {
      name: 'Valve Failure Symptoms',
      href: '/blog/maintenance/mechanical/kurikulum/artikel-16-valve-failure-symptoms',
      description:
        'Valve Failure Symptoms – Bagaimana Mendeteksi Sebelum Rusak Total?',
    },
    {
      name: 'Clearance Measurement Awareness',
      href: '/blog/maintenance/mechanical/kurikulum/artikel-17-clearance-measurement',
      description:
        'Clearance Measurement Awareness – Mengapa Clearance Penting pada Reciprocating Compressor?',
    },
  ]}
  note="Artikel-artikel di atas merupakan bagian dari serial peningkatan kompetensi Electrical & Instrumentation yang dirancang untuk diikuti secara berurutan guna membangun pemahaman sistematis dan bertahap. Meskipun demikian, setiap artikel tetap dapat digunakan sebagai referensi mandiri sesuai kebutuhan teknis di lapangan. Pembaca tetap disarankan melakukan verifikasi lanjutan dan penyesuaian sesuai standar perusahaan serta regulasi keselamatan yang berlaku."
/>

---

# 2️⃣ Learning Objective (Measurable & Skill-Based)

Setelah membaca artikel ini, teknisi mampu:

- **LO1** – Menghitung dan membandingkan pressure ratio per stage (PR1 dan PR2) secara mandiri.
- **LO2** – Mengidentifikasi ketidakseimbangan temperatur antar stage dan mengaitkannya dengan performa intercooler.
- **LO3** – Menjelaskan risiko keselamatan akibat kegagalan intercooler pada sistem gas hydrocarbon (overheating, ignition risk, relief activation).

⚠ LO3 memastikan pemahaman bahwa kegagalan intercooler berdampak langsung pada keselamatan proses.

---

# 3️⃣ System Context & Criticality

## A. Konfigurasi Sistem Dual-Stage

Urutan kerja sistem:

**Stage 1 → Intercooler → Stage 2 → Aftercooler → Downstream Process**

Setiap stage memiliki:

- Suction pressure
- Discharge pressure
- Discharge temperature

Distribusi pressure ratio harus seimbang agar kerja kompresi optimal.

---

## B. Fungsi Intercooler

Intercooler berfungsi untuk:

1. Menurunkan temperatur discharge Stage 1
2. Mengurangi kerja kompresi pada Stage 2
3. Menjaga efisiensi termodinamika sistem
4. Menstabilkan distribusi pressure ratio antar stage

Secara termodinamik:

Gas panas dari Stage 1 → didinginkan → densitas meningkat → masuk Stage 2 dalam kondisi lebih stabil.

---

## C. Dampak Jika Intercooler Gagal

Jika intercooler tidak efektif (mis. fouling internal):

- Stage 2 suction temperature naik
- Pressure ratio Stage 2 meningkat
- Discharge temperature final melonjak
- Power consumption meningkat
- Beban mekanis piston & rod bertambah
- Risiko overheating pada gas mudah terbakar meningkat

Dalam service hydrocarbon, kenaikan temperatur signifikan dapat meningkatkan risiko **auto-ignition** atau kondisi berbahaya sesuai prinsip pengendalian bahaya pada NFPA 30.

---

## D. Interaksi Lintas Disiplin (Mechanical–Instrument–Control)

Rantai interaksi:

Intercooler fouling
→ Stage 2 suction temperature naik
→ Temperature transmitter membaca abnormal
→ Alarm aktif
→ Trip logic bekerja
→ Shutdown compressor

👉 Kegagalan intercooler bukan hanya masalah mechanical, tetapi sistemik dan berdampak langsung pada reliability serta safety proses.

---

# 4️⃣ Diagram Literacy Section (WAJIB)

![Image](https://www.researchgate.net/publication/351514342/figure/fig2/AS%3A1022554823213061%401620807476786/Detailed-diagram-of-two-stage-turbo-compressor-with-an-intercooler.png)

![Image](https://www.tpub.com/engine3/en3_files/image450.jpg)

Section ini memastikan teknisi mampu membaca P&ID dan menghubungkannya dengan fenomena stage interaction.

---

## A. Posisi Discharge Stage 1

Pada P&ID, teknisi harus mampu menunjukkan:

- Discharge nozzle Stage 1
- Temperature transmitter (TT-Stage1-Discharge)
- Pressure transmitter (PT-Stage1-Discharge)

Titik ini menjadi input utama sebelum gas masuk intercooler.

---

## B. Jalur Intercooler (Cooling Water In/Out)

Teknisi wajib memahami:

- Jalur gas dari Stage 1 menuju intercooler shell/tube side
- Cooling water inlet dan outlet
- Directional flow indicator

Titik penting:

- Block valve cooling water inlet
- Block valve cooling water outlet
- Drain & vent intercooler

Jika cooling water inlet temperature normal tetapi outlet gas tetap tinggi, indikasi fouling internal meningkat.

---

## C. Suction Stage 2

Setelah intercooler:

- Gas masuk ke suction Stage 2
- Suction pressure transmitter Stage 2 harus dibandingkan dengan discharge Stage 1

Distribusi pressure ratio harus dianalisis:

PR1 = Pd1 / Ps1
PR2 = Pd2 / Ps2

Ketidakseimbangan sering terlihat pada PR2 meningkat.

---

## D. Titik Pressure Measurement per Stage

Teknisi harus mampu menunjukkan:

- Ps1 dan Pd1
- Ps2 dan Pd2

Tanpa membaca per stage, analisa sistem menjadi tidak akurat.

---

## E. Titik Isolasi & Proteksi

Wajib dapat diidentifikasi:

- Block valve suction & discharge masing-masing stage
- Relief valve pada intercooler shell
- High temperature trip pada discharge Stage 2

Proteksi ini mencegah overpressure dan overheating ekstrem.

---

## F. Jalur Energi (Energy Path)

Gas tekanan tinggi dari Stage 1
→ Masuk intercooler
→ Temperatur turun (heat transfer ke cooling water)
→ Densitas meningkat
→ Masuk Stage 2 dengan kondisi termodinamik lebih stabil

Jika intercooler tidak efektif:

- Stage 2 menerima gas panas
- Beban kompresi meningkat
- Discharge temperature final melonjak

---

# 5️⃣ Background & Failure Scenario

## A. Kronologi

- Compressor dual-stage beroperasi normal selama 6 bulan
- Dalam 3 hari terakhir, discharge Stage 2 meningkat dari 150°C menjadi 178°C
- Tidak ada alarm suction abnormal
- Power consumption meningkat 8%

Perubahan terjadi bertahap, bukan mendadak.

---

## B. Data Aktual

- Stage 1 discharge temperature naik 10°C
- Intercooler outlet temperature lebih tinggi dari baseline
- Cooling water inlet temperature normal
- Tidak ada indikasi valve failure langsung

Interpretasi awal:

- Cooling water supply bukan penyebab utama
- Heat transfer di intercooler kemungkinan menurun
- Stage interaction terganggu

Pola ini konsisten dengan indikasi **fouling intercooler internal**, bukan langsung kegagalan valve.

---

# 6️⃣ Symptom & Initial Finding

Section ini memisahkan secara tegas antara observasi visual, data terukur, dan asumsi operator agar analisa tidak bias terhadap satu komponen tertentu.

---

## A. Terlihat (Observasi Lapangan)

- Tidak ada kebocoran eksternal pada intercooler maupun cylinder
- Tidak ada noise abnormal signifikan pada Stage 2
- Tidak ada vibrasi ekstrem yang mengindikasikan kerusakan mekanis mendadak

Karakteristik ini tidak konsisten dengan kegagalan valve catastrophic.

---

## B. Terukur (Data Operasi)

- **Stage 2 suction temperature meningkat** dibanding baseline
- **Pressure ratio Stage 2 lebih tinggi dari desain**
- Power consumption meningkat ±8%
- Stage 1 discharge temperature naik moderat

Interpretasi awal berbasis data:

- Stage 2 menerima gas dengan temperatur lebih tinggi
- Beban kompresi Stage 2 meningkat
- Terjadi ketidakseimbangan distribusi pressure ratio

---

## C. Asumsi Operator

- Valve Stage 2 bocor

Namun:

- Tidak ada kenaikan pulsation signifikan
- Tidak ada indikasi re-compression dominan
- Stage 2 discharge pressure tidak menunjukkan pola leakage khas

⚠ Tanpa analisa stage interaction dan efektivitas intercooler, asumsi valve leakage belum dapat dibenarkan.

---

# 7️⃣ Possible Causes (Structured Hypothesis)

Hipotesis disusun lintas disiplin sesuai template agar investigasi tetap objektif.

---

## A. Electrical

- Sensor temperature drift (TT Stage 2)
- Kesalahan pembacaan akibat wiring atau grounding

Eliminasi melalui:

- Cross-check dengan indikator lokal
- Bandingkan dengan sensor redundant (jika ada)

---

## B. Mechanical

- Valve leakage Stage 1
- Valve leakage Stage 2
- Clearance imbalance antar stage

Indikasi perlu diverifikasi dengan:

- Analisa pulsation
- Perbandingan pressure ratio PR1 vs PR2

---

## C. Instrument

- Pressure transmitter error
- Offset kalibrasi pada PT Stage 2

Verifikasi melalui:

- Perbandingan dengan gauge manual
- Trend konsistensi data

---

## D. Human Error

- Tidak dilakukan cleaning intercooler sesuai jadwal
- Tidak ada trending ΔT intercooler
- Tidak ada review stage-specific data rutin

---

## E. System Interaction (Khusus Dual-Stage)

- **Intercooler fouling internal**
- Pressure ratio tidak seimbang antar stage
- Cooling water flow stagnan sebagian (maldistribution)
- Heat transfer area tertutup deposit

Hipotesis sistemik ini paling konsisten dengan:

- Stage 2 suction temperature naik
- PR2 meningkat
- Stage 1 discharge naik moderat
- Tidak ada indikasi valve leakage kuat

---

# 8️⃣ Step-by-Step Investigation Flow

Investigasi dilakukan secara **stage-specific dan berbasis data**, bukan asumsi komponen tunggal.

---

## 1️⃣ Kumpulkan Data Pressure per Stage

Hitung:

$$
PR_1 = \frac{P_{dis1}}{P_{suc1}} \quad ; \quad
PR_2 = \frac{P_{dis2}}{P_{suc2}}
$$

Bandingkan dengan design pressure ratio.

Indikasi abnormal:

- PR2 meningkat signifikan
- PR1 relatif normal

👉 Mengarah pada masalah setelah Stage 1.

---

## 2️⃣ Bandingkan Temperatur Sebelum & Sesudah Intercooler

Evaluasi:

$$
\Delta T_{IC} = T_{dis1} - T_{suc2}
$$

Decision Point:

- Jika ΔT besar dan sesuai desain → intercooler efektif
- Jika ΔT menurun → efektivitas pendinginan turun

Intercooler yang sehat harus menurunkan temperatur mendekati desain suction Stage 2.

---

## 3️⃣ Verifikasi Cooling Water ΔT (Inlet vs Outlet)

$$
\Delta T_{CW} = T_{out} - T_{in}
$$

Interpretasi:

- ΔT terlalu kecil → indikasi fouling gas-side
- ΔT terlalu besar → potensi fouling water-side atau flow rendah

⚠ Cooling water inlet normal bukan berarti heat transfer efektif.

---

## 4️⃣ Review Trend Power Consumption

Over-compression akibat suhu suction tinggi akan:

- Meningkatkan kerja kompresi Stage 2
- Meningkatkan daya motor

Jika daya naik tanpa indikasi valve leakage kuat → fokus ke sistem pendinginan.

---

## 5️⃣ Eliminasi Kemungkinan Sensor Error

- Bandingkan TT & PT dengan indikator lokal
- Evaluasi stabilitas sinyal
- Review histori kalibrasi

Langkah ini mencegah pembongkaran akibat kesalahan instrumen.

---

## 6️⃣ Verifikasi Lapangan Intercooler

- Inspeksi fouling internal (gas-side & water-side)
- Cek distribusi cooling water
- Periksa adanya deposit atau scaling

---

### 🔎 Decision Point Utama

> Jangan membuka cylinder sebelum memastikan intercooler sehat.

Pembongkaran cylinder tanpa analisa stage interaction berpotensi menjadi tindakan reaktif yang tidak menyelesaikan akar masalah.

---

# 9️⃣ Root Cause & Contributing Factor

## ✅ Root Cause Teknis

**Intercooler internal fouling** menyebabkan Stage 2 menerima gas dengan temperatur lebih tinggi dari desain.

Dampak langsung:

- Stage 2 suction temperature naik
- Pressure ratio Stage 2 meningkat
- Discharge temperature melonjak
- Power consumption meningkat

Terjadi efek domino thermodynamic.

---

## ⚠ Contributing Factor

- Interval cleaning intercooler tidak terdokumentasi
- Tidak ada trending ΔT intercooler
- Tidak ada evaluasi imbalance antar stage

Kegagalan bukan hanya fouling, tetapi kegagalan sistem monitoring.

---

# 🔟 Reference to Standard & Gap Analysis

Mengacu pada **API 618**:

- Temperatur discharge per stage wajib dimonitor
- Distribusi pressure ratio antar stage harus seimbang
- Intercooler adalah bagian integral sistem kompresi

Dalam konteks keselamatan fluida mudah terbakar, **NFPA 30** menekankan pengendalian temperatur untuk mencegah kondisi berbahaya akibat overheating.

---

## 📉 Gap yang Ditemukan

- Tidak ada trending ΔT intercooler
- Tidak ada alarm imbalance antar stage
- Maintenance interval tidak berbasis data fouling
- Tidak ada evaluasi pressure ratio per stage secara rutin

---

Analisa ini menegaskan bahwa:

> Stage interaction lebih sering menjadi penyebab overheating dibanding kegagalan valve tunggal.

Section berikutnya akan menutup dengan tindakan korektif, refleksi risiko, dan penguatan kompetensi teknisi.

---

# 1️⃣1️⃣ Corrective & Preventive Action

## 🔧 Immediate Action

1. **Lakukan cleaning intercooler (gas-side & water-side)**

   - Identifikasi fouling type (hydrocarbon deposit, scaling, corrosion product).
   - Pastikan isolasi mekanis dan drain sebelum pembukaan.

2. **Verifikasi kembali discharge temperature per stage**

   - Bandingkan nilai sebelum dan sesudah cleaning.
   - Pastikan Stage 2 suction temperature kembali mendekati design value.

3. **Evaluasi ulang pressure ratio per stage**

   - Pastikan distribusi rasio kembali seimbang.

---

## 🛠 Permanent Fix

1. **Tentukan interval cleaning berbasis ΔT trend**, bukan kalender tetap.
2. Tetapkan batas kontrol:

$$
\Delta T_{IC(min)} = \text{Batas minimal efektivitas intercooler}
$$

Jika ΔT turun melewati batas → jadwalkan cleaning terencana.

---

## 🔄 System Improvement

- Tambahkan parameter monitoring:

  - (T*{dis1}) vs (T*{suc2})
  - Pressure ratio per stage

- Implementasikan dashboard stage interaction analysis.
- Integrasikan data dengan review mingguan reliability meeting.

---

## 📊 Monitoring Plan

- Trend **pressure ratio Stage 1 & Stage 2**
- Trend **intercooler outlet temperature**
- Review **power consumption bulanan**
- Dokumentasikan ΔT intercooler dalam report operasi

> Monitoring berbasis data mencegah pembongkaran cylinder yang tidak perlu.

---

# 1️⃣2️⃣ Risk & Safety Reflection

## ⚠ Potensi Bahaya Terbesar

- Overheating gas hydrocarbon
- Explosion risk akibat hot surface
- Relief valve lifting akibat overpressure
- Thermal stress pada cylinder & piping

Dalam konteks **NFPA 30**:

- Temperatur tinggi pada fluida mudah terbakar dapat meningkatkan risiko ignition source exposure.
- Pengendalian temperatur adalah bagian dari mitigasi bahaya kebakaran.

---

## 🔐 Permit & Prosedur Wajib

Sebelum membuka intercooler:

1. Pressure isolation penuh
2. Depressurization hingga nol tekanan
3. Drain & venting
4. Gas testing (LEL check)
5. Lock-Out Tag-Out (LOTO)

⚠ Intercooler adalah pressure vessel. Pembukaan tanpa isolasi lengkap berisiko fatal.

---

# 1️⃣3️⃣ Data Interpretation & Trend Awareness

## 📈 Parameter Penting

- Pressure ratio Stage 1
- Pressure ratio Stage 2
- Intercooler outlet temperature
- ΔT intercooler
- Power consumption

---

## 🔎 Early Warning Indicator

1. ΔT intercooler menurun bertahap
2. Stage 2 suction temperature naik sebelum alarm
3. Pressure ratio Stage 2 meningkat perlahan
4. Power naik tanpa indikasi valve leakage

---

## 📌 Prinsip Kunci

- Alarm adalah **indikator akhir**, bukan awal.
- Trend 3–14 hari sering menunjukkan degradasi sebelum proteksi aktif.
- Imbalance antar stage lebih berbahaya daripada kenaikan temperatur sesaat.

> Data historis adalah alat diagnosis paling kuat dalam analisa stage interaction.

---

# 1️⃣4️⃣ Competency Mapping

**Skill Area:** Stage Interaction Analysis

**Level Saat Ini:** W
**Target Setelah Artikel:** Menuju I

## Kompetensi yang Diharapkan Setelah Pembelajaran

1. **Mampu menghitung pressure ratio per stage secara akurat**

   $$
   PR = \frac{P_{dis}}{P_{suc}}
   $$

2. **Menganalisa ketidakseimbangan distribusi kerja kompresi antar stage**

   - Mengidentifikasi Stage 1 overworked vs Stage 2 overworked
   - Menghubungkan imbalance dengan kenaikan temperatur

3. **Membedakan gejala valve leakage vs intercooler fouling**

4. **Melakukan diagnosis berbasis data sebelum pembongkaran mechanical**

5. **Memahami interaksi Mechanical–Instrument–Control dalam konteks stage imbalance**

---

# 1️⃣5️⃣ Discussion Question (Toolbox Use)

1. Mengapa pressure ratio harus dibagi per stage, bukan dianalisa sebagai total compression ratio saja?
2. Apa dampak thermodynamic terhadap kerja kompresi jika intercooler tidak efektif?
3. Bagaimana kenaikan suction temperature Stage 2 mempengaruhi beban motor?
4. Apa risiko keselamatan jika Stage 2 menerima gas terlalu panas dalam sistem hydrocarbon bertekanan tinggi?
5. Mengapa trend ΔT intercooler lebih penting daripada satu kali pembacaan temperatur?

---

# 1️⃣6️⃣ Key Takeaway (Max 7 Bullet)

- Dual-stage compressor wajib dianalisis per stage, bukan total saja
- Intercooler menjaga keseimbangan distribusi kerja kompresi
- Pressure ratio imbalance meningkatkan temperatur & beban mekanis
- Jangan langsung membuka cylinder tanpa analisa data sistem
- Trend ΔT intercooler adalah early warning degradasi performa
- Overheating adalah isu reliability sekaligus safety
- Stage interaction yang sehat menentukan umur valve, ring, dan piston

---

<small>
  **_Catatan Penyusunan_** Artikel ini merupakan bagian dari serial peningkatan
  kompetensi yang dirancang untuk diikuti secara berurutan guna membangun
  pemahaman sistematis dan bertahap. Meskipun demikian, setiap artikel tetap
  dapat dibaca secara terpisah sebagai referensi mandiri sesuai kebutuhan
  pembaca. Materi disusun berdasarkan berbagai sumber pustaka teknis, praktik
  lapangan industri, serta dukungan alat bantu penulisan. Pembaca disarankan
  melakukan verifikasi lanjutan dan penyesuaian teknis sesuai dengan standar
  perusahaan, kondisi aktual peralatan, serta regulasi keselamatan yang berlaku.
</small>
