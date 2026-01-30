---
title: Dari Risk-Based Thinking ke Reliability-Driven Organization - Panduan Lengkap Maintenance System Handbook
authors: ['sam']
date: '2026-01-24'
tags:
  [
    'maintenance-system-handbook',
    'risk-based-maintenance-rbm',
    'asset-management-iso-55000',
    'maintenance-strategy',
    'she-system-constraint',
    'turnaround-management',
    'reliability-growth',
    'continuous-improvement',
    'maintenance-maturity-model',
    'pemeliharaan-pabrik-petrokimia',
  ]
draft: false
summary: Maintenance System Handbook (MSH) merupakan kerangka terpadu yang menempatkan pemeliharaan sebagai sistem pengambilan keputusan berbasis risiko, siklus hidup aset, dan pembelajaran berkelanjutan. MSH mengintegrasikan filosofi risk-based thinking, strategi Risk-Based Maintenance (RBM), kejelasan organisasi dan KPI, disiplin eksekusi, batas SHE sebagai system constraint, hingga alignment dengan Turnaround dan lifecycle asset management. Handbook ini tidak dirancang sebagai kumpulan metode teknis, melainkan sebagai sistem hidup yang ditinjau secara periodik, dapat diaudit, dan terus ditingkatkan. Melalui MSH Maturity Assessment Tool, organisasi dapat memetakan tingkat kematangan sistemnya dan menyusun roadmap peningkatan yang realistis, defensible, dan berkelanjutan.
---

**_Dari Risk-Based Thinking ke Reliability-Driven Organization: Panduan Lengkap Maintenance System Handbook_**

---

- [**Pendahuluan**](#pendahuluan)
  - [**Latar Belakang Kebutuhan Sistem Pemeliharaan Modern di Industri Proses**](#latar-belakang-kebutuhan-sistem-pemeliharaan-modern-di-industri-proses)
  - [**Keterbatasan Pendekatan Maintenance Konvensional**](#keterbatasan-pendekatan-maintenance-konvensional)
  - [**Posisi Maintenance System Handbook (MSH) sebagai Integrated Decision System**](#posisi-maintenance-system-handbook-msh-sebagai-integrated-decision-system)
- [**Bagian I — Executive Summary Maintenance System Handbook (MSH)**](#bagian-i--executive-summary-maintenance-system-handbook-msh)
  - [🎯 Latar Belakang dan Tujuan](#-latar-belakang-dan-tujuan)
  - [🧩 Gambaran Sistem per Modul](#-gambaran-sistem-per-modul)
  - [🧠 Nilai Strategis bagi Manajemen](#-nilai-strategis-bagi-manajemen)
- [**Bagian II — Roadmap Pemahaman dan Implementasi Maintenance System Handbook (MSH)**](#bagian-ii--roadmap-pemahaman-dan-implementasi-maintenance-system-handbook-msh)
  - [**A. Roadmap 1 — Cara Membaca \& Memahami Maintenance System Handbook (MSH)**](#a-roadmap-1--cara-membaca--memahami-maintenance-system-handbook-msh)
  - [**B. Roadmap 2 — Implementasi Maintenance System Handbook (MSH)**](#b-roadmap-2--implementasi-maintenance-system-handbook-msh)
  - [🧠 Penegasan Akhir Roadmap](#-penegasan-akhir-roadmap)
- [**Bagian III — MSH Maturity Assessment Tool**](#bagian-iii--msh-maturity-assessment-tool)
  - [📌 Tujuan Alat Ini](#-tujuan-alat-ini)
  - [🧠 Kerangka Dasar Penilaian](#-kerangka-dasar-penilaian)
  - [📊 Skala Maturity (Level 1–5)](#-skala-maturity-level-15)
  - [🧩 Struktur Assessment per Modul](#-struktur-assessment-per-modul)
  - [📋 Contoh Format Assessment (Ringkas)](#-contoh-format-assessment-ringkas)
  - [🛠️ Output yang Diharapkan](#️-output-yang-diharapkan)
  - [🧠 Prinsip Penutup](#-prinsip-penutup)

---

## **Pendahuluan**

Industri proses—khususnya petrokimia, energi, dan manufaktur berbasis operasi kontinu—beroperasi dalam lingkungan yang ditandai oleh **kompleksitas teknis tinggi, risiko keselamatan signifikan, dan konsekuensi kegagalan yang bersifat sistemik**. Dalam konteks ini, pemeliharaan tidak lagi dapat diperlakukan sebagai fungsi pendukung yang bersifat reaktif atau sekadar pemenuhan jadwal teknis.

Perubahan tuntutan bisnis, regulasi keselamatan dan lingkungan yang semakin ketat, serta meningkatnya ekspektasi keandalan operasi mendorong organisasi untuk **menggeser paradigma pemeliharaan**: dari sekadar aktivitas perbaikan menjadi **sistem pengambilan keputusan strategis** yang memengaruhi keberlanjutan operasi jangka panjang.

Maintenance System Handbook (MSH) disusun sebagai respon terhadap kebutuhan tersebut—bukan untuk menggantikan standar atau metode yang ada, melainkan untuk **mengintegrasikan seluruh elemen pemeliharaan ke dalam satu kerangka sistem yang koheren, defensible, dan berorientasi risiko**.

MSH disusun dalam bentuk **struktur modular yang komprehensif**, terdiri dari **8 modul utama (Module 0–7)** yang saling terhubung serta **1 panduan implementasi lengkap** sebagai pengikat keseluruhan sistem. Pendekatan modular ini dirancang agar handbook dapat digunakan secara **fleksibel namun konsisten**—baik sebagai referensi strategis manajemen, panduan operasional engineer, maupun kerangka evaluasi sistem pemeliharaan secara menyeluruh.

Handbook ini **tidak menawarkan satu metode pemeliharaan tunggal**, karena kompleksitas industri proses tidak pernah dapat diselesaikan dengan pendekatan linear atau solusi generik. Sebaliknya, MSH menghadirkan **kerangka sistemik end-to-end** yang mengaitkan secara eksplisit dan terstruktur:

- **filosofi** pemeliharaan dan posisi strategisnya dalam bisnis,
- **logika risiko** sebagai dasar pengambilan keputusan teknis,
- **strategi pemeliharaan** (RBM, TBM adaptif, CBM, PdM) sebagai alat eksekusi,
- **organisasi, peran, dan KPI** sebagai penjamin akuntabilitas,
- **eksekusi, troubleshooting, dan pembelajaran sistem** sebagai penggerak peningkatan,
- **SHE** sebagai batas keputusan yang tidak dapat dikompromikan,
- hingga **continuous improvement dan lifecycle asset management** sebagai penjaga relevansi jangka panjang.

Dengan struktur tersebut, MSH memposisikan pemeliharaan bukan sebagai kumpulan aktivitas terpisah, melainkan sebagai **satu sistem keputusan terpadu** yang dapat dipahami, diimplementasikan, dievaluasi, dan dipertanggungjawabkan dalam horizon operasional maupun strategis.

---

### **Latar Belakang Kebutuhan Sistem Pemeliharaan Modern di Industri Proses**

Industri proses kontinu memiliki karakteristik yang berbeda secara fundamental dibandingkan industri diskrit. Satu kegagalan peralatan dapat memicu:

- shutdown sistemik lintas unit,
- potensi insiden keselamatan dan lingkungan,
- kerugian finansial dalam skala besar,
- serta degradasi keandalan jangka panjang.

Dalam kondisi ini, **keandalan aset bukan sekadar isu teknis**, melainkan isu strategis yang menyentuh aspek produksi, SHE, reputasi perusahaan, dan keberlangsungan bisnis.

Pemeliharaan modern dituntut untuk mampu:

- memprioritaskan sumber daya secara rasional,
- mengelola risiko secara eksplisit dan terdokumentasi,
- mendukung pengambilan keputusan lintas fungsi,
- serta beradaptasi terhadap perubahan kondisi aset sepanjang siklus hidupnya.

Tanpa sistem yang terstruktur, organisasi cenderung terjebak dalam pola **reaktif, fragmentatif, dan berbasis kebiasaan**, yang sulit dipertanggungjawabkan secara teknis maupun manajerial.

---

### **Keterbatasan Pendekatan Maintenance Konvensional**

Pendekatan pemeliharaan konvensional—walaupun menggunakan _Time-Based Maintenance (TBM)_ murni maupun _corrective-driven maintenance_—memiliki keterbatasan struktural ketika diterapkan pada sistem industri proses yang kompleks dan berisiko tinggi. Keterbatasan tersebut bukan terletak pada metode teknis yang digunakan, melainkan pada **cara pandang terhadap risiko dan kontribusi peralatan terhadap sistem**, antara lain:

1. **Asumsi kesetaraan kontribusi peralatan**, di mana seluruh aset diperlakukan memiliki tingkat kepentingan yang sama terhadap keselamatan, kontinuitas operasi, dan dampak bisnis. Pendekatan ini mengabaikan fakta bahwa dalam sistem proses kontinu, kegagalan satu peralatan tertentu dapat menimbulkan konsekuensi yang jauh lebih besar dibandingkan kegagalan peralatan lainnya.

2. **Fokus pada kepatuhan aktivitas, bukan pengendalian risiko**, sehingga keberhasilan pemeliharaan diukur dari terlaksananya jadwal atau jumlah pekerjaan yang diselesaikan, bukan dari seberapa besar risiko kegagalan sistem berhasil dikurangi.

3. **Tidak adanya diferensiasi strategi berdasarkan risiko**, meskipun secara teknis menggunakan metode yang sama seperti TBM. Dalam praktik konvensional, TBM diterapkan secara seragam, sementara dalam pendekatan berbasis risiko, TBM merupakan salah satu alat yang digunakan secara selektif sesuai tingkat risiko aset.

4. **Minimnya mekanisme pembelajaran sistemik**, di mana histori kegagalan, hasil analisa akar masalah, dan tren gangguan tidak secara konsisten diterjemahkan menjadi perubahan strategi pemeliharaan.

5. **Keterbatasan dalam audit dan review manajemen**, karena keputusan pemeliharaan tidak memiliki justifikasi risiko yang eksplisit, sehingga sulit dipertahankan secara teknis, bisnis, maupun regulatori.

Pendekatan-pendekatan konvensional tersebut **tidak sepenuhnya keliru**, dan dalam banyak kasus tetap relevan sebagai bagian dari sistem pemeliharaan. Namun, pendekatan ini menjadi **tidak memadai ketika berdiri sendiri**, tanpa kerangka _risk-based thinking_, governance yang jelas, serta mekanisme evaluasi dan pembelajaran berkelanjutan.

Dalam konteks inilah _Risk-Based Maintenance (RBM)_ tidak dimaksudkan untuk menggantikan TBM atau metode teknis lainnya, melainkan untuk **mengubah cara organisasi menentukan di mana, kapan, dan sejauh mana metode-metode tersebut diterapkan** berdasarkan risiko nyata terhadap keselamatan, lingkungan, dan keberlangsungan operasi.

---

### **Posisi Maintenance System Handbook (MSH) sebagai Integrated Decision System**

Maintenance System Handbook (MSH) diposisikan bukan sebagai panduan teknis parsial, melainkan sebagai **integrated decision system** yang menghubungkan:

- **risk-based thinking** sebagai fondasi,
- **Risk-Based Maintenance (RBM)** sebagai strategi seleksi metode,
- **organisasi, KPI, dan governance** sebagai penjamin akuntabilitas,
- **eksekusi, troubleshooting, dan learning loop** sebagai mesin peningkatan,
- **SHE sebagai system constraint**,
- serta **lifecycle asset management dan turnaround** sebagai kerangka jangka panjang.

MSH menjawab pertanyaan yang sering terpisah dalam praktik:

- _Apa yang harus dipelihara lebih ketat, dan mengapa?_
- _Siapa yang bertanggung jawab atas keputusan tersebut?_
- _Bagaimana keputusan itu dievaluasi dan diperbaiki?_
- _Di mana batas keputusan yang tidak boleh dilampaui?_

Dengan demikian, MSH berfungsi sebagai **panduan strategis dan operasional** yang menyatukan engineer, manajemen, dan fungsi SHE dalam satu bahasa keputusan yang konsisten, dapat diaudit, dan relevan untuk horizon jangka panjang.

---

## **Bagian I — Executive Summary Maintenance System Handbook (MSH)**

---

### 🎯 Latar Belakang dan Tujuan

**Maintenance System Handbook** disusun untuk menjawab tantangan utama industri proses dan petrokimia modern:
bagaimana membangun **sistem pemeliharaan yang andal, aman, dan berkelanjutan**, tanpa terjebak pada pola reaktif, over-maintenance, atau keputusan jangka pendek.

Handbook ini tidak menawarkan metode tunggal, melainkan **kerangka sistemik end-to-end** yang mengaitkan:

- filosofi,
- logika risiko,
- strategi teknis,
- organisasi,
- eksekusi,
- SHE,
- hingga continuous improvement.

Tujuan utamanya adalah memastikan bahwa **setiap keputusan maintenance dapat dipertanggungjawabkan secara teknis, bisnis, dan keselamatan**.

---

### 🧩 Gambaran Sistem per Modul

- **Module 0–1 | Konteks & Filosofi**

[_Module 0 – Konteks Industri dan Alasan Sistem Pemeliharaan Harus Berevolusi_](/blog/Management/MSH/MSH-0-maintenance-evolusi)

[_Module 1 – Filosofi dan Fondasi Risiko Sistem Pemeliharaan_](/blog/Management/MSH/MSH-1-maintenance-fondasi-risiko)

Menetapkan **arah sistem pemeliharaan**:
maintenance diposisikan sebagai **fungsi manajemen risiko dan keandalan**, bukan sekadar cost center atau aktivitas teknis.

👉 Output utama: _maintenance philosophy_ yang konsisten dan menjadi rujukan seluruh keputusan.

---

- **Module 2 | Risk-Based Decision Logic**

[_Module 2 – Model Risiko dan Logika Pengambilan Keputusan Pemeliharaan_](/blog/Management/MSH/MSH-2-model-risiko)

Membangun **logika keputusan berbasis risiko** sebagai fondasi sistem.
Setiap keputusan maintenance harus dapat dijelaskan melalui **konsekuensi kegagalan (CoF)** dan **risk acceptance** yang eksplisit.

👉 Output utama: keputusan yang **rasional, konsisten, dan defensible**.

---

- **Module 3 | Risk-Based Maintenance (RBM)**

[_Module 3 – Risk-Based Maintenance sebagai Strategi Pemeliharaan Praktis_](/blog/Management/MSH/MSH-3-rbm)

Menerjemahkan risiko menjadi **strategi pemeliharaan nyata** (TBM, CBM, PdM, redesign).
RBM diposisikan sebagai **kerangka seleksi strategi**, bukan metode baru.

👉 Output utama: fokus pada aset kritis, eliminasi over-maintenance.

---

- **Module 4 | Organisasi, KPI & Akuntabilitas**

[_Module 4 – Organisasi, KPI, dan Akuntabilitas dalam Sistem Pemeliharaan_](/blog/Management/MSH/MSH-5-organization)

Menegaskan bahwa sistem hanya bekerja jika ada:

- **pemilik keputusan yang jelas**,
- **KPI berbasis peran**, dan
- **governance yang tegas**.

👉 Output utama: organisasi yang **accountable**, bukan abu-abu.

---

- **Module 5 | Eksekusi, Troubleshooting & Learning**

[_Module 5 – Eksekusi, Troubleshooting, dan Sistem Pembelajaran Pemeliharaan_](/blog/Management/MSH/MSH-6-eksekusi)

Memastikan setiap gangguan menghasilkan **pembelajaran sistem**, melalui:

- troubleshooting terstruktur,
- RCA yang disiplin,
- dokumentasi sebagai memori organisasi.

👉 Output utama: penurunan kegagalan berulang, bukan sekadar perbaikan cepat.

---

- **Module 6 | SHE sebagai System Constraint**

[_Module 6 – SHE sebagai Batas Sistem dalam Pengambilan Keputusan Pemeliharaan_](/blog/Management/MSH/MSH-7-she-compliance)

Menempatkan **SHE sebagai batas keras (hard boundary)** dalam seluruh keputusan maintenance.
Tidak ada efisiensi, optimasi biaya, atau inovasi yang sah jika melewati batas keselamatan.

👉 Output utama: keputusan yang **aman, legal, dan etis**.

---

- **Module 7 | Lifecycle, Turnaround & Continuous Improvement**

[_Module 7 – Lifecycle Aset, Turnaround, dan Continuous Improvement Sistem Pemeliharaan_](/blog/Management/MSH/MSH-8-lifecycle-ta)

Mengikat seluruh modul ke dalam **siklus hidup aset jangka panjang** (10–20 tahun).
Maintenance diposisikan sebagai **living system** yang ditinjau, ditingkatkan, dan disesuaikan secara berkala.

👉 Output utama: sistem yang **tetap relevan dan tangguh sepanjang usia aset**.

---

### 🧠 Nilai Strategis bagi Manajemen

Dengan menerapkan **Maintenance System Handbook**, organisasi memperoleh:

- keputusan maintenance yang **konsisten lintas level**,
- pengendalian risiko yang lebih baik,
- pengurangan kegagalan berulang dan biaya laten,
- kesiapan audit dan regulasi,
- serta **keandalan jangka panjang** yang terukur.

Handbook ini dirancang agar:

- **pragmatis di lapangan**,
- **konservatif terhadap risiko**, dan
- **selaras dengan praktik industri petrokimia**.

---

## **Bagian II — Roadmap Pemahaman dan Implementasi Maintenance System Handbook (MSH)**

---

### **A. Roadmap 1 — Cara Membaca & Memahami Maintenance System Handbook (MSH)**

- 🎯 Tujuan

Memastikan MSH dipahami **sebagai satu sistem utuh**, bukan kumpulan modul terpisah atau dokumen teoritis.

---

- **Tahap 1 — Orientasi Sistem (Wajib untuk Semua Level)**

**Target audiens:**
Manajemen, superintendent, engineer senior

**Modul yang dibaca:**

- **Module 0** – Konteks & urgensi perubahan
  [_Module 0 – Konteks Industri dan Alasan Sistem Pemeliharaan Harus Berevolusi_](/blog/Management/MSH/MSH-0-maintenance-evolusi)
- **Module 1** – Filosofi sistem maintenance
  [_Module 1 – Filosofi dan Fondasi Risiko Sistem Pemeliharaan_](/blog/Management/MSH/MSH-1-maintenance-fondasi-risiko)

**Fokus pemahaman:**

- Mengapa maintenance **bukan cost center**
- Mengapa sistem harus **risk-driven**
- Mengapa tidak semua masalah perlu solusi teknis mahal

📌 **Output yang diharapkan:**

- Kesepahaman filosofi lintas fungsi
- Tidak ada lagi perdebatan metode tanpa konteks risiko

---

- **Tahap 2 — Logika Keputusan (Decision Literacy)**

**Target audiens:**
Engineer, supervisor, superintendent

**Modul yang dibaca:**

- **Module 2** – Risk model & decision logic
  [_Module 2 – Model Risiko dan Logika Pengambilan Keputusan Pemeliharaan_](/blog/Management/MSH/MSH-2-model-risiko)

**Fokus pemahaman:**

- Risiko ≠ probabilitas semata
- Konsep **risk acceptance**
- ESC sebagai bahasa bersama (engineering–SHE–manajemen)

📌 **Output yang diharapkan:**

- Engineer mampu menjelaskan _mengapa_ suatu keputusan diambil
- Manajemen memahami _mengapa_ keputusan tertentu mahal tapi sah

---

- **Tahap 3 — Strategi Teknis Nyata (Operational Strategy)**

**Target audiens:**
Maintenance team inti

**Modul yang dibaca:**

- **Module 3** – RBM sebagai strategi praktis
  [_Module 3 – Risk-Based Maintenance sebagai Strategi Pemeliharaan Praktis_](/blog/Management/MSH/MSH-3-rbm)

**Fokus pemahaman:**

- RBM ≠ metode baru
- RBM sebagai **kerangka seleksi strategi**
- TBM, CBM, PdM tetap dipakai — tapi **tidak untuk semua aset**

📌 **Output yang diharapkan:**

- Fokus maintenance lebih tajam
- Over-maintenance mulai berkurang

---

- **Tahap 4 — Organisasi & Akuntabilitas**

**Target audiens:**
Manajemen, HR teknis, supervisor

**Modul yang dibaca:**

- **Module 4** – Organization, KPI & accountability
  [_Module 4 – Organisasi, KPI, dan Akuntabilitas dalam Sistem Pemeliharaan_](/blog/Management/MSH/MSH-5-organization)

**Fokus pemahaman:**

- JobDesc sebagai alat kontrol
- KPI berbasis peran, bukan seragam
- Satu keputusan = satu owner

📌 **Output yang diharapkan:**

- Tidak ada lagi “semua bertanggung jawab tapi tidak ada yang accountable”

---

- **Tahap 5 — Eksekusi & Pembelajaran**

**Target audiens:**
Seluruh level maintenance

**Modul yang dibaca:**

- **Module 5** – Execution, troubleshooting & learning
  [_Module 5 – Eksekusi, Troubleshooting, dan Sistem Pembelajaran Pemeliharaan_](/blog/Management/MSH/MSH-6-eksekusi)

**Fokus pemahaman:**

- Troubleshooting bukan insting
- RCA bukan formalitas
- Dokumentasi sebagai memori organisasi

📌 **Output yang diharapkan:**

- Penurunan failure berulang
- First-time fix meningkat

---

- **Tahap 6 — Batas SHE & Keberlanjutan**

**Target audiens:**
Semua level, wajib untuk leader

**Modul yang dibaca:**

- **Module 6** – SHE sebagai system constraint
  [_Module 6 – SHE sebagai Batas Sistem dalam Pengambilan Keputusan Pemeliharaan_](/blog/Management/MSH/MSH-7-she-compliance)
- **Module 7** – Lifecycle & continuous improvement
  [_Module 7 – Lifecycle Aset, Turnaround, dan Continuous Improvement Sistem Pemeliharaan_](/blog/Management/MSH/MSH-8-lifecycle-ta)

**Fokus pemahaman:**

- Tidak semua keputusan boleh diambil
- Sistem harus hidup 10–20 tahun
- Review dan TA adalah bagian sistem, bukan proyek terpisah

📌 **Output yang diharapkan:**

- Keputusan lebih tegas
- Sistem tahan audit dan perubahan manajemen

---

### **B. Roadmap 2 — Implementasi Maintenance System Handbook (MSH)**

- 🎯 Prinsip Dasar Implementasi

> **MSH tidak diimplementasikan sekaligus, tetapi bertahap dan sadar risiko.**

---

- **Fase 1 — Baseline Assessment (Menggunakan MSH Maturity Assessment Tool)**

**Durasi:** 2–4 minggu

**Aktivitas utama:**

- Mengisi **MSH Maturity Assessment Tool**
- Penilaian per domain:

  - Risk logic
  - RBM application
  - Organization & KPI
  - Execution & learning
  - SHE integration
  - Lifecycle governance

**Hasil utama:**

- Skor maturity per domain
- Klasifikasi level:

  - Reaktif
  - Preventive generik
  - Risk-based
  - Preventive–adaptive
  - Reliability-driven

📌 **Catatan penting:**
Assessment **bukan audit**, tetapi **cermin kondisi aktual**.

---

- **Fase 2 — Gap Analysis & Prioritization**

**Durasi:** 2–3 minggu

**Aktivitas utama:**

- Identifikasi gap terbesar terhadap:

  - risiko,
  - keselamatan,
  - keberlanjutan operasi

- Penentuan **quick wins vs strategic gaps**

📌 **Contoh prioritas awal:**

- Aset kritis tanpa ESC → prioritas tinggi
- KPI tidak nyambung JobDesc → prioritas menengah
- Dokumentasi buruk → prioritas tinggi

---

- **Fase 3 — Implementasi Bertahap per Modul**

**Durasi:** 6–18 bulan (adaptif)

| Area      | Fokus Implementasi                 |
| --------- | ---------------------------------- |
| Modul 2–3 | Risk model & RBM pada aset kritis  |
| Modul 4   | Penyesuaian JobDesc & KPI          |
| Modul 5   | Standarisasi troubleshooting & RCA |
| Modul 6   | Integrasi SHE ke decision gate     |
| Modul 7   | Review 6 bulanan & TA alignment    |

📌 **Prinsip penting:**
Lebih baik **1 modul matang**, daripada **7 modul setengah jalan**.

---

- **Fase 4 — Review Berkala & Re-Assessment**

**Frekuensi:**

- Review internal: 6 bulanan
- Re-assessment MSH maturity: tahunan

**Tujuan:**

- Mengukur reliability growth
- Menghindari system drift
- Menjaga konsistensi meski terjadi pergantian personel

---

### 🧠 Penegasan Akhir Roadmap

- **MSH adalah sistem berpikir sebelum sistem kerja**
- **Assessment bukan penghakiman, tetapi alat navigasi**
- **Maturity tidak harus sempurna, tapi harus bergerak naik**

> **Sistem pemeliharaan yang dewasa
> tidak diukur dari banyaknya prosedur,
> tetapi dari kualitas keputusan yang diambil.**

---

## **Bagian III — MSH Maturity Assessment Tool**

**(Maintenance System Handbook – Maturity Evaluation Framework)**

---

### 📌 Tujuan Alat Ini

**MSH Maturity Assessment Tool** dirancang untuk:

- mengukur **tingkat kematangan sistem pemeliharaan** secara objektif,
- memetakan **gap antara kondisi eksisting dan target sistem**, serta
- menjadi **alat kontrol manajemen** untuk roadmap peningkatan jangka menengah–panjang.

Alat ini **bukan audit kepatuhan**, melainkan **diagnostic tool** untuk:

- pimpinan,
- maintenance manager,
- reliability engineer,
- dan tim continuous improvement.

📌 **Prinsip utama:**

> _You cannot improve what you cannot objectively assess._

---

### 🧠 Kerangka Dasar Penilaian

Assessment dibangun berdasarkan **seluruh modul Maintenance System Handbook (Module 0–7)** dan diselaraskan dengan:

- **ISO 55000 (Asset Management Lifecycle)**
- **RBM maturity model**
- praktik industri petrokimia konservatif

* Dimensi Penilaian Utama

| Dimensi                         | Cakupan   |
| ------------------------------- | --------- |
| **Filosofi & Governance**       | Modul 0–1 |
| **Risk & Decision Logic**       | Modul 2   |
| **Strategi Pemeliharaan (RBM)** | Modul 3   |
| **Organisasi & KPI**            | Modul 4   |
| **Eksekusi & Learning**         | Modul 5   |
| **SHE sebagai Constraint**      | Modul 6   |
| **Lifecycle & Improvement**     | Modul 7   |

---

### 📊 Skala Maturity (Level 1–5)

| Level                             | Karakteristik Umum                            |
| --------------------------------- | --------------------------------------------- |
| **Level 1 – Reaktif**             | Perbaikan setelah rusak, keputusan instingtif |
| **Level 2 – Preventive Generik**  | PM berbasis kalender, KPI administratif       |
| **Level 3 – Risk-Based**          | Klasifikasi aset, prioritas berbasis risiko   |
| **Level 4 – Preventive–Adaptive** | Interval dinamis, learning loop aktif         |
| **Level 5 – Reliability-Driven**  | Reliability growth sebagai target sistem      |

📌 **Catatan penting:**
Tidak semua plant _harus_ berada di Level 5, tetapi **tidak boleh stagnan**.

---

### 🧩 Struktur Assessment per Modul

- 🔹 1. Modul 0–1: Filosofi & Arah Sistem

**Pertanyaan Kunci:**

- Apakah maintenance diposisikan sebagai **cost center atau risk & reliability function**?
- Apakah filosofi tertulis dan dipahami lintas level?

**Indikator:**

- Ada/tidaknya _maintenance policy_
- Konsistensi keputusan dengan filosofi

---

- 🔹 2. Modul 2: Risk-Based Decision Logic

**Pertanyaan Kunci:**

- Apakah keputusan maintenance berbasis **risiko terukur**?
- Apakah ada mekanisme risk acceptance?

**Indikator:**

- Matriks risiko formal
- Keterkaitan risiko → strategi → anggaran

---

- 🔹 3. Modul 3: RBM sebagai Strategi Operasional

**Pertanyaan Kunci:**

- Apakah RBM hanya konsep, atau benar-benar digunakan?
- Apakah TBM, CBM, PdM ditetapkan berbasis klasifikasi aset?

**Indikator:**

- Tiering aset
- Diferensiasi strategi pemeliharaan

---

- 🔹 4. Modul 4: Organisasi, KPI & Akuntabilitas

**Pertanyaan Kunci:**

- Apakah setiap keputusan punya **owner jelas**?
- Apakah KPI relevan dengan peran?

**Indikator:**

- JobDesc ↔ KPI ↔ authority selaras
- KPI digunakan untuk keputusan

---

- 🔹 5. Modul 5: Eksekusi, RCA & Learning Loop

**Pertanyaan Kunci:**

- Apakah masalah yang sama berulang?
- Apakah RCA menghasilkan perubahan sistem?

**Indikator:**

- First-time fix
- Update strategi pasca kegagalan

---

- 🔹 6. Modul 6: SHE sebagai System Constraint

**Pertanyaan Kunci:**

- Apakah keputusan maintenance pernah “menawar” SHE?
- Apakah SHE menjadi alasan sah menolak optimasi biaya?

**Indikator:**

- Integrasi ESC
- Konsistensi keputusan konservatif

---

- 🔹 7. Modul 7: Lifecycle, TA & Continuous Improvement

**Pertanyaan Kunci:**

- Apakah sistem ditinjau berkala?
- Apakah ada reliability growth?

**Indikator:**

- Review 6 bulanan/tahunan
- Perubahan strategi seiring usia aset

---

### 📋 Contoh Format Assessment (Ringkas)

| Modul | Pernyataan Evaluasi                   | Skor (1–5) | Catatan                           |
| ----- | ------------------------------------- | ---------- | --------------------------------- |
| M2    | Keputusan maintenance berbasis risiko | 3          | Risiko sudah ada, belum konsisten |
| M3    | RBM digunakan dalam penjadwalan       | 2          | Masih dominan kalender            |
| M5    | RCA mengubah sistem                   | 4          | Update interval TBM               |

📌 **Output utama:**

- Radar maturity
- Daftar gap prioritas
- Rekomendasi roadmap

---

### 🛠️ Output yang Diharapkan

1. **Maturity Profile Plant**
2. **Gap Analysis per Modul**
3. **Prioritized Improvement Roadmap (12–36 bulan)**
4. **Bahan diskusi manajemen & audit internal**
5. **Baseline sebelum transformasi sistem**

---

### 🧠 Prinsip Penutup

> **Maturity assessment bukan untuk menghakimi,
> tetapi untuk memastikan sistem bergerak ke arah yang benar.**

Dengan **MSH Maturity Assessment Tool**, organisasi memiliki:

- cermin objektif sistem pemeliharaan,
- bahasa bersama lintas fungsi,
- dan dasar kuat untuk keputusan strategis jangka panjang.

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
