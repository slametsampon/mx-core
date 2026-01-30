---
title: Failure Tree Analysis (FTA) – Modul Metode dalam Ekosistem RCA–RBM
authors: ['sam', 'amr']
date: '2023-10-25'
tags:
  [
    'failure-tree-analysis',
    'fault-tree-analysis',
    'analisis-risiko',
    'process-safety',
    'pemeliharaan-pabrik-petrokimia',
    'risk-based-maintenance',
    'rca-framework',
    'keandalan-sistem',
    'safety-engineering',
  ]
draft: false
summary: Artikel ini membahas Failure Tree Analysis (FTA) sebagai metode analisis risiko yang bersifat proaktif dan sistemik untuk memetakan jalur kegagalan pada sistem kompleks, khususnya di industri petrokimia. Dengan pendekatan top-down dan logika Boolean (AND, OR, NOT), FTA membantu mengidentifikasi kombinasi kegagalan yang dapat memicu top event berkonsekuensi tinggi, terutama terkait process safety dan keandalan peralatan kritikal. Artikel ini menegaskan posisi FTA dalam ekosistem RCA berbasis Risk-Based Maintenance (RBM), membedakannya dari RCFA, FMEA, dan Fishbone Diagram, serta menekankan pentingnya batasan penggunaan dan stop rule agar FTA tidak disalahgunakan atau berujung pada over-analysis.
---

**_Failure Tree Analysis (FTA) – Modul Metode dalam Ekosistem RCA–RBM_**

---

- [1) **Prolog**](#1-prolog)
- [2) **Pengenalan**](#2-pengenalan)
  - [Tujuan Praktis Penerapan FTA](#tujuan-praktis-penerapan-fta)
  - [Batasan Eksplisit Penggunaan FTA](#batasan-eksplisit-penggunaan-fta)
- [3) **Posisi**](#3-posisi)
  - [Posisi FTA dalam Alur RCA Berbasis RBM](#posisi-fta-dalam-alur-rca-berbasis-rbm)
  - [Kondisi yang Cocok Menggunakan FTA](#kondisi-yang-cocok-menggunakan-fta)
  - [Kondisi yang Tidak Cocok Menggunakan FTA](#kondisi-yang-tidak-cocok-menggunakan-fta)
  - [Relasi FTA dengan Metode Lain (Hulu–Hilir)](#relasi-fta-dengan-metode-lain-huluhilir)
- [4) **Stop Rule**](#4-stop-rule)
  - [1. Top Event Telah Terekspos Menjadi Single Dominant Cause](#1-top-event-telah-terekspos-menjadi-single-dominant-cause)
  - [2. Perluasan Pohon Tidak Lagi Mengubah Keputusan Teknis](#2-perluasan-pohon-tidak-lagi-mengubah-keputusan-teknis)
  - [3. Risiko Telah Berada pada Level **ALARP**](#3-risiko-telah-berada-pada-level-alarp)
  - [4. Analisis Mulai Kehilangan Integritas Teknis](#4-analisis-mulai-kehilangan-integritas-teknis)
- [🔁 Trigger Eskalasi Metode](#-trigger-eskalasi-metode)
- [5) **Case Study**](#5-case-study)
  - [Kasus Tunggal – _Defensible Case_](#kasus-tunggal--defensible-case)
  - [Alasan Pemilihan FTA](#alasan-pemilihan-fta)
  - [Tahapan Ringkas Penerapan FTA](#tahapan-ringkas-penerapan-fta)
  - [Keputusan Eksplisit Berbasis Stop Rule](#keputusan-eksplisit-berbasis-stop-rule)
  - [Konsistensi dengan RBM dan Process Safety Boundary](#konsistensi-dengan-rbm-dan-process-safety-boundary)
- [6) **Integrasi**](#6-integrasi)
  - [Relasi FTA dengan Metode RCA Lain](#relasi-fta-dengan-metode-rca-lain)
  - [Penegasan Prinsip Utama](#penegasan-prinsip-utama)
  - [Prinsip Pengambilan Keputusan](#prinsip-pengambilan-keputusan)
- [**Penutup Singkat (Opsional Modul)**](#penutup-singkat-opsional-modul)
- [**Referensi**](#referensi)

---

### 1) **Prolog**

Artikel ini disusun sebagai **modul metode Failure Tree Analysis (FTA)** dalam ekosistem **Root Cause Analysis (RCA) berbasis Risk-Based Maintenance (RBM)**. Dengan demikian, artikel ini **bukan pengantar RCA**, bukan pula panduan pemilihan metode analisis, melainkan **panduan operasional penggunaan FTA** pada konteks yang tepat.

FTA **digunakan setelah proses risk framing dilakukan**, yaitu ketika risiko telah didefinisikan secara jelas dari sisi **konsekuensi, probabilitas, dan batasan process safety**. Pada tahap ini, organisasi sudah memahami bahwa permasalahan yang dihadapi bersifat **kompleks, sistemik, dan berpotensi berdampak besar**, sehingga memerlukan pendekatan analisis berbasis logika dan struktur kegagalan.

Penting untuk ditegaskan bahwa **FTA bukan alat pemilihan metode RCA**. FTA adalah **alat analisis risiko sistemik**, yang berfungsi untuk memodelkan kombinasi kegagalan (single maupun multiple failures) yang dapat memicu **top event berkonsekuensi tinggi**. Penggunaan FTA tanpa risk framing yang memadai berisiko menghasilkan analisis yang panjang namun tidak berdampak pada kualitas keputusan.

Oleh karena itu, sebelum menggunakan modul ini, pembaca **wajib** memahami dan merujuk pada dokumen berikut:

- **Artikel Induk: _Decision Framework RCA–RBM_**
  Digunakan untuk menentukan **kapan FTA relevan**, dan kapan metode lain seperti Fishbone, FMEA, RCFA, atau Bowtie lebih tepat digunakan.

- **Artikel Klasifikasi Masalah dan Risk Class**
  Digunakan untuk memastikan bahwa permasalahan yang dianalisis berada pada **kelas risiko yang sesuai** (high consequence, low tolerance, atau process safety related), sehingga penerapan FTA bersifat **defensible secara teknis dan manajerial**.

Dengan posisi ini, modul FTA diharapkan digunakan secara **disiplin, tepat sasaran, dan selaras dengan keputusan berbasis risiko**, bukan sekadar untuk melengkapi dokumentasi analisis.

<ResourceBox
title="Korelasi internal-link modul:"
items={[
{
name: 'Panduan Troubleshooting & Pemilihan Metode RCA',
href: '/blog/management/rca-panduan-lengkap',
description:
'Panduan Troubleshooting & Pemilihan Metode RCA Berbasis Risk-Based Maintenance (RBM)',
},
{
name: '5 Whys dalam Kerangka RCA',
href: '/blog/management/RCA/rca-5whys',
description:
'5 Whys dalam Kerangka RCA Berbasis Risk-Based Maintenance (RBM)',
},
{
name: 'Fishbone Diagram',
href: '/blog/management/RCA/rca-fishbone-diagram',
description:
'Optimasi Proses dalam Industri Petrokimia Menggunakan Fishbone Diagram',
},
{
name: 'Failure Mode and Effects Analysis (FMEA)',
href: '/blog/management/RCA/rca-fmea',
description:
'Mengungkap Keunggulan FMEA dalam Meningkatkan Keandalan di Industri Petrokimia',
},
{
name: 'Root Cause Failure Analysis (RCFA)',
href: '/blog/management/RCA/rca-rcfa',
description:
'Mengungkap Akar Masalah - Panduan Lengkap Analisis Akar Penyebab Kegagalan (RCFA)',
},
{
name: '8D Problem Solving dalam Kerangka RCA',
href: '/blog/management/RCA/rca-8d-problem-solving',
description:
'8D Problem Solving dalam Kerangka RCA Berbasis Risk-Based Maintenance (RBM)',
},
{
name: 'Bowtie Analysis dalam Kerangka RCA',
href: '/blog/management/RCA/rca-bowtie',
description:
'Bowtie Analysis dalam Kerangka RCA Berbasis Risk-Based Maintenance (RBM)',
},
]}
/>

---

### 2) **Pengenalan**

**Failure Tree Analysis (FTA)** adalah metode analisis risiko yang bersifat **top-down dan berbasis logika (logic-based)**, digunakan untuk memodelkan **kombinasi kegagalan** pada suatu sistem yang secara kolektif dapat memicu **kejadian berkonsekuensi tinggi (top event)**. FTA tidak berangkat dari komponen yang gagal secara individual, melainkan dari **kejadian puncak yang tidak diinginkan**, kemudian ditelusuri secara sistematis ke bawah untuk memahami bagaimana berbagai kegagalan—baik tunggal maupun simultan—dapat berinteraksi dan menghasilkan kondisi tersebut.

![FTAimage](/static/images/artikel/FTAimage.jpg)

Dalam konteks industri petrokimia dan sistem berisiko tinggi, FTA digunakan ketika kegagalan tidak lagi bersifat linier atau sederhana, melainkan melibatkan **interaksi antar peralatan, manusia, prosedur, dan proteksi sistem**. Pendekatan ini menjadikan FTA sangat relevan untuk analisis **process safety**, sistem proteksi, dan peralatan kritikal yang memiliki **konsekuensi kegagalan tidak dapat ditoleransi**.

#### Tujuan Praktis Penerapan FTA

Penerapan FTA dalam modul ini diarahkan untuk tujuan yang **jelas dan terukur**, yaitu:

- **Memahami jalur kegagalan (failure pathways)**
  Mengidentifikasi bagaimana berbagai event dasar dapat berinteraksi melalui hubungan logika (AND/OR) hingga memicu top event.

- **Mengidentifikasi weak link dalam sistem**
  Menentukan titik paling rentan yang secara signifikan berkontribusi terhadap risiko, baik dari sisi teknis, operasional, maupun organisasi.

- **Mendukung keputusan mitigasi risiko**
  Menyediakan dasar analitis yang kuat untuk menentukan apakah mitigasi diperlukan, di mana harus diterapkan, dan sejauh mana intervensi teknis atau prosedural diperlukan.

#### Batasan Eksplisit Penggunaan FTA

Untuk mencegah kesalahan penerapan dan over-analysis, batasan berikut **harus dipahami sejak awal**:

- **FTA bukan investigasi pasca-insiden**
  Untuk kegagalan yang telah terjadi dan memerlukan pembuktian sebab fisik maupun organisatoris, metode seperti **RCFA** lebih tepat digunakan.

- **FTA bukan alat mencari siapa yang salah**
  Fokus FTA adalah pada **kegagalan sistem**, bukan individu. Analisis personal error dalam FTA hanya relevan sejauh berkontribusi terhadap jalur kegagalan sistemik.

- **FTA tidak ditujukan untuk low-risk equipment**
  Penggunaan FTA pada peralatan berisiko rendah cenderung tidak memberikan nilai tambah dan berpotensi menghabiskan sumber daya tanpa dampak keputusan yang signifikan.

Dengan definisi, tujuan, dan batasan ini, FTA diposisikan sebagai **alat analisis risiko tingkat lanjut** yang harus digunakan secara selektif, disiplin, dan selalu terikat pada kerangka **Risk-Based Maintenance (RBM)** serta batasan **process safety** yang berlaku.

---

### 3) **Posisi**

#### Posisi FTA dalam Alur RCA Berbasis RBM

Dalam kerangka **Root Cause Analysis (RCA) berbasis Risk-Based Maintenance (RBM)**, **Failure Tree Analysis (FTA)** menempati posisi **analisis menengah–lanjutan**, yang digunakan **setelah risk screening dan risk framing selesai dilakukan**. Pada tahap ini, risiko telah dipahami secara memadai dari sisi **konsekuensi, probabilitas, dan toleransi risiko**, sehingga analisis dapat difokuskan pada **mekanisme kegagalan sistemik**, bukan lagi pada identifikasi masalah secara umum.

FTA digunakan **sebelum masuk ke tahap desain barrier atau mitigasi teknis**, dengan tujuan memastikan bahwa seluruh **jalur kegagalan yang relevan** telah dipetakan secara logis. Dengan demikian, keputusan mitigasi yang diambil—baik berupa penambahan proteksi, perubahan desain, atau penguatan prosedur—bersifat **defensible secara teknis dan berbasis risiko**, bukan sekadar reaktif.

Secara ringkas, urutan logisnya adalah:

> **Risk Screening → Risk Framing → FTA → Barrier / Mitigasi / Eskalasi Metode**

---

#### Kondisi yang Cocok Menggunakan FTA

FTA **paling tepat digunakan** pada kondisi berikut:

- **High consequence failure**
  Kegagalan dengan dampak besar terhadap keselamatan, lingkungan, kontinuitas produksi, atau reputasi perusahaan.

- **Process safety related issues**
  Termasuk kegagalan sistem proteksi, interlock, relief system, atau skenario yang berpotensi menyebabkan kebakaran, ledakan, atau pelepasan bahan berbahaya.

- **Sistem kompleks dan saling bergantung**
  Sistem yang melibatkan banyak komponen, logika interlock, interaksi manusia–mesin, serta dependensi antar subsistem yang tidak dapat dianalisis secara linier.

Pada kondisi ini, pendekatan top-down FTA memberikan nilai tambah yang signifikan dibanding metode analisis sederhana.

---

#### Kondisi yang Tidak Cocok Menggunakan FTA

Sebaliknya, FTA **tidak direkomendasikan** untuk:

- **Masalah single-cause**
  Kegagalan dengan penyebab tunggal yang jelas dan langsung, yang lebih efektif dianalisis menggunakan RCFA atau metode troubleshooting dasar.

- **Failure trivial atau low impact**
  Kegagalan dengan konsekuensi rendah, baik dari sisi keselamatan maupun operasional, karena FTA berpotensi menjadi overkill tanpa dampak keputusan yang berarti.

Penggunaan FTA pada kondisi ini justru berisiko menghabiskan sumber daya tanpa peningkatan kualitas keputusan.

---

#### Relasi FTA dengan Metode Lain (Hulu–Hilir)

Dalam ekosistem metode analisis risiko dan RCA, posisi FTA dapat diringkas sebagai berikut:

- **Hulu (Before FTA):**

  - Risk assessment
  - Risk screening dan klasifikasi risk class

- **FTA (Core Analysis):**

  - Pemodelan jalur kegagalan
  - Identifikasi kombinasi kegagalan kritis

- **Hilir (After FTA):**

  - **Bowtie Analysis** untuk pemetaan barrier dan kontrol
  - **LOPA** untuk penilaian lapisan proteksi
  - **Design change / engineering modification** bila risiko tidak dapat diterima

Dengan pemahaman posisi ini, FTA digunakan secara **tepat konteks, tepat waktu, dan tepat tujuan**, selaras dengan prinsip **RBM dan process safety management**, serta mendukung pengambilan keputusan yang berbasis risiko nyata, bukan sekadar kelengkapan analisis.

---

### 4) **Stop Rule**

Dalam praktik industri, **Failure Tree Analysis (FTA)** sering gagal bukan karena metodenya lemah, melainkan karena **tidak ada aturan berhenti yang jelas**. Oleh karena itu, penerapan FTA **harus memiliki stop rule yang tegas**, agar analisis tetap **relevan, efisien, dan berdampak pada keputusan**.

FTA **WAJIB DIHENTIKAN** apabila salah satu kondisi berikut terpenuhi:

---

#### 1. Top Event Telah Terekspos Menjadi Single Dominant Cause

Apabila hasil pemodelan menunjukkan bahwa **top event pada akhirnya didominasi oleh satu penyebab utama**, baik kegagalan teknis, prosedural, maupun organisasi, maka:

- nilai tambah FTA telah tercapai,
- analisis tidak perlu diperluas lebih jauh,
- **eskalasi ke RCFA menjadi langkah yang tepat**.

Pada titik ini, pendekatan **investigatif dan evidential** RCFA lebih efektif dibandingkan perluasan fault tree yang bersifat redundant.

---

#### 2. Perluasan Pohon Tidak Lagi Mengubah Keputusan Teknis

FTA harus dihentikan ketika:

- penambahan basic event atau cabang baru,
- tidak lagi memengaruhi pilihan mitigasi,
- tidak mengubah prioritas risiko,
- tidak menghasilkan opsi keputusan teknis baru.

Melanjutkan analisis pada kondisi ini hanya akan menghasilkan **kompleksitas tanpa nilai keputusan** (analysis for the sake of analysis).

---

#### 3. Risiko Telah Berada pada Level **ALARP**

Jika berdasarkan hasil analisis:

- probabilitas dan konsekuensi telah ditekan,
- risiko berada pada tingkat **As Low As Reasonably Practicable (ALARP)**,
- dan tidak ada mitigasi tambahan yang rasional secara teknis maupun ekonomis,

maka FTA **harus dihentikan**, dan fokus dialihkan ke **monitoring, assurance, dan governance**.

---

#### 4. Analisis Mulai Kehilangan Integritas Teknis

FTA harus segera dihentikan bila analisis mulai menunjukkan gejala berikut:

- **spekulatif** (berbasis asumsi tanpa dukungan data atau pengalaman lapangan),
- **tidak berbasis data** historis, engineering judgement yang sah, atau referensi teknis,
- **tidak berdampak pada keputusan**, baik desain, operasi, maupun kebijakan.

Kondisi ini menandakan bahwa FTA telah melampaui batas kegunaannya sebagai alat bantu keputusan.

---

### 🔁 Trigger Eskalasi Metode

Stop rule FTA secara langsung terkait dengan **eskalasi ke metode lain** yang lebih sesuai, sebagai berikut:

- **Eskalasi ke RCFA**
  Dilakukan bila kegagalan **telah terjadi** dan diperlukan analisis akar penyebab berbasis bukti untuk mencegah pengulangan.

- **Eskalasi ke Bowtie Analysis**
  Dilakukan bila fokus utama bergeser ke **identifikasi barrier, kontrol pencegahan, dan mitigasi konsekuensi** dari jalur kegagalan yang telah dipetakan.

- **Eskalasi ke LOPA / SIL Assessment**
  Dilakukan bila analisis berkaitan dengan **Safety Instrumented Function (SIF)**, integritas lapisan proteksi, atau kebutuhan kuantifikasi risiko yang lebih formal.

Dengan menerapkan **stop rule yang disiplin**, FTA tetap berfungsi sebagai **alat analisis risiko yang tajam dan efisien**, bukan sebagai proses yang berlarut-larut dan kehilangan relevansi terhadap keputusan teknis dan keselamatan.

---

### 5) **Case Study**

#### Kasus Tunggal – _Defensible Case_

**Sistem yang Dianalisis**
Kasus ini berfokus pada **rotating equipment kritikal**, khususnya **bearing** pada unit proses industri petrokimia yang beroperasi secara kontinyu. Peralatan ini dikategorikan **kritikal** karena kegagalannya berpotensi menyebabkan **forced shutdown**, kerusakan lanjutan pada equipment lain, serta eskalasi ke **process safety event** (misalnya overheating, ignition source, atau loss of containment sekunder).

---

#### Alasan Pemilihan FTA

FTA dipilih secara **sadar dan terjustifikasi**, dengan pertimbangan utama:

- **Konsekuensi kegagalan tinggi**
  Kegagalan bearing tidak hanya berdampak pada reliability, tetapi dapat memicu kondisi operasi tidak aman pada unit proses.

- **Multiple interacting causes**
  Penyebab kegagalan tidak bersifat tunggal, melainkan kombinasi dari faktor desain, operasi, pelumasan, monitoring, dan human interaction yang saling bergantung.

Kondisi ini menjadikan pendekatan **top-down dan logic-based** FTA lebih tepat dibanding metode single-cause analysis.

---

#### Tahapan Ringkas Penerapan FTA

1. **Definisi Top Event**
   Top event didefinisikan secara spesifik sebagai:
   **“Kegagalan bearing yang menyebabkan trip unit atau potensi eskalasi process safety.”**
   Definisi ini menegaskan bahwa fokus analisis **melampaui sekadar kegagalan mekanis**.

2. **Penyusunan Struktur AND/OR Utama**
   Pohon kegagalan dibangun dengan memetakan hubungan logika antara event utama, seperti:

   - kegagalan pelumasan,
   - misalignment,
   - beban berlebih,
   - kegagalan sistem monitoring,
   - kesalahan operasional.

   Hubungan **AND/OR** digunakan untuk menunjukkan kondisi di mana kegagalan terjadi secara simultan maupun alternatif.

3. **Identifikasi Jalur Dominan**
   Dari hasil analisis, teridentifikasi satu hingga dua **jalur kegagalan dominan** yang secara signifikan berkontribusi terhadap top event, misalnya kombinasi:

   - degradasi pelumasan **AND**
   - keterlambatan deteksi kondisi abnormal.

---

#### Keputusan Eksplisit Berbasis Stop Rule

Berdasarkan hasil FTA, diambil keputusan eksplisit sebagai berikut:

- **FTA dihentikan** ketika jalur dominan telah teridentifikasi dan perluasan pohon tidak lagi mengubah opsi mitigasi.
- Analisis **dilanjutkan ke metode lain**, yaitu:

  - **Bowtie Analysis**, untuk memetakan barrier pencegahan dan mitigasi terhadap jalur kegagalan dominan.
  - **RCFA**, apabila di kemudian hari kegagalan bearing benar-benar terjadi dan memerlukan investigasi berbasis bukti.

Keputusan ini memastikan bahwa FTA tidak berkembang menjadi analisis yang berlarut-larut tanpa nilai keputusan tambahan.

---

#### Konsistensi dengan RBM dan Process Safety Boundary

Studi kasus ini konsisten dengan prinsip:

- **Risk-Based Maintenance (RBM)**
  Fokus analisis diarahkan pada equipment dengan **risk ranking tinggi**, bukan sekadar frekuensi kegagalan.

- **Process Safety Boundary**
  Analisis berhenti pada batas yang relevan dengan keselamatan proses, dan tidak terjebak pada detail reliability murni yang tidak berdampak pada risiko keseluruhan.

Dengan pendekatan ini, FTA berfungsi sebagai **alat bantu keputusan strategis** dalam pengelolaan risiko, bukan sekadar alat analisis teknis untuk meningkatkan MTBF atau availability semata.

---

### 6) **Integrasi**

#### Relasi FTA dengan Metode RCA Lain

Dalam ekosistem **RCA berbasis Risk-Based Maintenance (RBM)**, **Failure Tree Analysis (FTA)** **tidak berdiri sendiri** dan tidak dimaksudkan untuk menggantikan metode lain. Nilai FTA justru muncul ketika ia **diintegrasikan secara tepat** dengan metode analisis lain sesuai tahapan dan tujuan analisis risiko.

Relasi FTA dengan metode RCA lainnya dapat dijelaskan sebagai berikut:

- **Fishbone Diagram → eksplorasi awal**
  Fishbone digunakan pada tahap awal untuk **menggali spektrum penyebab secara luas**, tanpa kuantifikasi dan tanpa struktur logika kegagalan. Output Fishbone sering menjadi **input awal** bagi FTA, khususnya untuk mengidentifikasi candidate basic events sebelum dimodelkan secara logis.

- **FMEA → bottom-up failure mode analysis**
  FMEA berangkat dari **failure mode komponen**, menilai dampaknya secara lokal dan sistemik. Hasil FMEA dapat melengkapi FTA dengan memberikan:

  - daftar failure mode yang relevan,
  - estimasi severity dan occurrence,
  - konteks keandalan komponen.
    Dalam praktik, FTA dan FMEA sering digunakan secara **komplementer**, bukan saling menggantikan.

- **RCFA → investigasi pasca-kejadian**
  RCFA digunakan ketika kegagalan **telah terjadi** dan diperlukan pembuktian akar penyebab berbasis fakta, data, dan bukti fisik. FTA dapat:

  - memberikan hipotesis jalur kegagalan sebelum kejadian,
  - membantu memfokuskan investigasi RCFA,
    namun **FTA tidak menggantikan RCFA** dalam konteks investigatif.

- **Bowtie Analysis → barrier management**
  Ketika jalur kegagalan dominan telah diidentifikasi melalui FTA, Bowtie digunakan untuk:

  - memetakan **barrier pencegahan dan mitigasi**,
  - mengevaluasi efektivitas kontrol eksisting,
  - mengidentifikasi gap pada sistem proteksi.
    Pada tahap ini, fokus analisis bergeser dari “bagaimana kegagalan terjadi” menjadi “bagaimana kegagalan dicegah dan dikendalikan”.

---

#### Penegasan Prinsip Utama

> **FTA adalah alat bantu keputusan, bukan pengganti risk judgement.**

FTA menyediakan **struktur berpikir dan visualisasi logika kegagalan**, tetapi keputusan akhir tetap berada pada **engineering judgement, risk appetite organisasi, dan batasan process safety**. Tidak semua jalur kegagalan yang teridentifikasi harus dimitigasi secara agresif; yang diprioritaskan adalah jalur dengan **kombinasi probabilitas dan konsekuensi yang tidak dapat diterima**.

---

#### Prinsip Pengambilan Keputusan

Seluruh keputusan yang diambil berdasarkan FTA harus memenuhi prinsip berikut:

- **Tetap berbasis risiko**
  Fokus pada pengurangan risiko nyata, bukan pada kelengkapan diagram atau kedalaman analisis semata.

- **Bukan demi kelengkapan analisis**
  Analisis yang tidak mengubah keputusan teknis, desain, atau kebijakan **tidak perlu diperdalam**.

Dengan integrasi yang disiplin dan berorientasi keputusan, FTA berfungsi sebagai **komponen strategis dalam ekosistem RCA–RBM**, mendukung pengelolaan risiko yang efektif, efisien, dan selaras dengan prinsip **process safety management**.

---

### **Penutup Singkat (Opsional Modul)**

Failure Tree Analysis (FTA) memiliki **nilai yang sangat tinggi** apabila digunakan **di tempat, waktu, dan konteks yang tepat**. Sebagai metode analisis risiko sistemik, FTA unggul dalam memodelkan **kombinasi kegagalan** yang dapat memicu kejadian berkonsekuensi besar, khususnya pada sistem kompleks dan domain **process safety**. Namun, kekuatan tersebut hanya muncul bila FTA diterapkan secara **disiplin dalam kerangka Risk-Based Maintenance (RBM)** dan pengambilan keputusan berbasis risiko.

Kesalahan terbesar dalam penerapan FTA di industri umumnya bukan terletak pada metodologinya, melainkan pada **misuse**, yaitu:

- **Dipakai terlalu dini**, sebelum risk framing dan klasifikasi risiko dilakukan dengan benar.
- **Dipakai terlalu lama**, ketika analisis tidak lagi mengubah keputusan teknis atau mitigasi.
- **Dipakai tanpa risk framing**, sehingga menghasilkan diagram kompleks namun miskin nilai keputusan.

Dengan memahami batasan ini, FTA dapat berfungsi sebagai **alat bantu keputusan strategis**, bukan sekadar artefak analisis, dan tetap selaras dengan tujuan utama manajemen risiko dan keselamatan proses.

---

### **Referensi**

1. IEC 61025: _Fault Tree Analysis (FTA)_, International Electrotechnical Commission.
2. CCPS – AIChE, _Guidelines for Hazard Evaluation Procedures_, Center for Chemical Process Safety.
3. CCPS – AIChE, _Guidelines for Risk Based Process Safety_.
4. Ericson, C. A., _Fault Tree Analysis – A History_, Reliability Engineering & System Safety.
5. Bahr, N. J., _System Safety Engineering and Risk Assessment: A Practical Approach_.
6. ISO 31000: _Risk Management – Guidelines_.
7. API RP 580 & API RP 581: _Risk-Based Inspection_.
8. Smith, D. J., _Reliability, Maintainability and Risk_.
9. Lees, F. P., _Lees’ Loss Prevention in the Process Industries_.

Referensi di atas digunakan sebagai dasar konseptual dan praktik terbaik dalam penerapan FTA, khususnya pada industri berisiko tinggi seperti petrokimia dan proses kimia.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
