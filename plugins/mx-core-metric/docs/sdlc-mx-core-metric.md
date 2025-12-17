---
title: Blueprint Pengembangan mx-core-metric – KPI Planning, Recording & Forecasting Platform
authors: ['sam']
date: '2025-12-16'
tags:
  [
    'SDLC',
    'software-development',
    'industrial-software',
    'enterprise-architecture',
    'predictive-maintenance',
    'ai-maintenance',
    'mx-core-case-study',
    'brs-srs-hld-lld',
    'system-design',
    'functional-requirements',
    'technical-specification',
    'low-level-design',
    'high-level-design',
    'use-case-design',
    'documentation-standards',
    'devops-implementation',
    'ai-integration',
    'data-modeling',
    'maintenance-engineering',
    'project-lifecycle-management',
  ]
draft: false
summary: Artikel ini menyajikan panduan lengkap pengembangan perangkat lunak industri berbasis Software Development Life Cycle (SDLC), mulai dari tahap Business Requirement Specification (BRS) hingga Maintenance. Disusun secara sistematis dengan studi kasus nyata mx-core-docs, plugin AI untuk prediktif maintenance di lingkungan petrokimia. Setiap fase—BRS, SRS, HLD, LLD, implementasi, testing, deployment, hingga dukungan pasca-produksi—dibahas dengan contoh dokumen, alur kerja, dan praktik terbaik. Artikel ini menjadi referensi menyeluruh untuk tim engineer, arsitek sistem, dan manajemen proyek dalam membangun sistem cerdas berbasis data industri.
---

**Blueprint Pengembangan mx-core-metric – KPI Planning, Recording & Forecasting Platform**

---

- [**1. BRS - Business Requirement Specification**](#1-brs---business-requirement-specification)
- [📘 **2. SRS – Software Requirement Specification**](#-2-srs--software-requirement-specification)
  - [📌 **1. Tujuan Dokumen**](#-1-tujuan-dokumen)
  - [📦 **2. Ruang Lingkup Sistem**](#-2-ruang-lingkup-sistem)
  - [📚 **3. Definisi dan Akronim**](#-3-definisi-dan-akronim)
  - [📈 **4. Deskripsi Umum Sistem**](#-4-deskripsi-umum-sistem)
  - [⚙️ **5. Fungsi Sistem (Functional Requirements Overview)**](#️-5-fungsi-sistem-functional-requirements-overview)
  - [🔐 **6. Non-Functional Requirements (NFR)**](#-6-non-functional-requirements-nfr)
  - [⛔ **7. Batasan Sistem**](#-7-batasan-sistem)
  - [📌 1. **Use-Case List**](#-1-use-case-list)
  - [📑 2. **Use-Case Detail (Narratif)**](#-2-use-case-detail-narratif)
  - [📌 Traceability Matrix](#-traceability-matrix)
  - [✅ **🔼 Prioritas Pengembangan (MoSCoW)**](#--prioritas-pengembangan-moscow)
- [🎯 **3. System Design**](#-3-system-design)
  - [🔷 **3.1. High-Level Design (HLD)** → kita bahas sekarang](#-31-high-level-design-hld--kita-bahas-sekarang)
- [🎯 **4. Implementation (Coding)**](#-4-implementation-coding)
  - [1️⃣ **Setup Repositori (Git)**](#1️⃣-setup-repositori-git)
  - [2️⃣ **Coding by Module/Sprint**](#2️⃣-coding-by-modulesprint)
  - [✅ 3️⃣ Kode Mengacu pada LLD](#-3️⃣-kode-mengacu-pada-lld)
  - [🗂️ 6. **Modularisasi File Sesuai Struktur HLD \& LLD**](#️-6-modularisasi-file-sesuai-struktur-hld--lld)
  - [✅ 4️⃣ Versioning dan Dokumentasi](#-4️⃣-versioning-dan-dokumentasi)
  - [✅ 5️⃣ Code Review \& Integration Checklist](#-5️⃣-code-review--integration-checklist)
  - [✅ 6️⃣ Output: Source Code Versi Alpha](#-6️⃣-output-source-code-versi-alpha)
  - [🧠 Keterkaitan dengan SRS, HLD, dan LLD](#-keterkaitan-dengan-srs-hld-dan-lld)
- [📘 \*\*5 Testing \*\*](#-5-testing-)
  - [✅ 1. **Unit Test**](#-1-unit-test)
  - [✅ 2. **Integration Test**](#-2-integration-test)
  - [✅ 3. **System Test**](#-3-system-test)
  - [✅ 4. **User Acceptance Test (UAT)**](#-4-user-acceptance-test-uat)
  - [🧠 Korelasi dengan SRS \& UC](#-korelasi-dengan-srs--uc)
  - [📝 5️⃣ **Test Plan**](#-5️⃣-test-plan)
  - [✅ 6️⃣ **Test Case**](#-6️⃣-test-case)
  - [🐞 7️⃣ **Bug Log \& Traceability Matrix**](#-7️⃣-bug-log--traceability-matrix)
  - [🧩 8️⃣ **Release Candidate (RC) Definition**](#-8️⃣-release-candidate-rc-definition)
  - [📤 **Output Tahap Testing**](#-output-tahap-testing)
  - [🧠 Keterkaitan dengan Tahap Sebelumnya](#-keterkaitan-dengan-tahap-sebelumnya)
- [📘 **6 Deployment – mx-core-metric**](#-6-deployment--mx-core-metric)
  - [✅ 1. **Build \& CI/CD Pipeline**](#-1-build--cicd-pipeline)
  - [✅ 2. **Environment Setup**](#-2-environment-setup)
    - [Variabel Lingkungan (`.env`)](#variabel-lingkungan-env)
  - [✅ 3. **Backup \& Rollback Plan**](#-3-backup--rollback-plan)
  - [✅ 4. **Dokumen Release Notes**](#-4-dokumen-release-notes)
  - [✅ 5. **Deployment Log**](#-5-deployment-log)
- [📘 **7 Maintenance \& Support – mx-core-metric**](#-7-maintenance--support--mx-core-metric)
  - [✅ 1. **Monitoring Performance**](#-1-monitoring-performance)
  - [✅ 2. **Patch \& Bug Fix**](#-2-patch--bug-fix)
  - [✅ 3. **User Feedback Loop**](#-3-user-feedback-loop)
  - [✅ 4. **Model Retraining (Jika Menggunakan AI)**](#-4-model-retraining-jika-menggunakan-ai)
  - [✅ 5. **Feature Improvement Roadmap**](#-5-feature-improvement-roadmap)
  - [✅ Output: SLA \& KPI Pemeliharaan](#-output-sla--kpi-pemeliharaan)

---

## **1. BRS - Business Requirement Specification**

- 📌 **Latar Belakang Masalah**

Dalam operasional industri berskala besar, pemantauan performa lintas departemen secara real-time menjadi tantangan besar. Selama ini:

- Perencanaan KPI dilakukan secara manual dan tersebar di berbagai format (Excel, form offline).
- Tidak ada sistem terpadu yang mengaitkan target KPI dengan aktual capaian serta dampak gangguan operasional.
- Sulit melakukan **monitoring berkala** (mingguan/bulanan), apalagi memprediksi capaian akhir tahun.
- Forecasting dilakukan secara manual atau tidak akurat, mengandalkan penilaian subjektif.
- Belum ada integrasi dengan data sensor/IoT untuk otomatisasi pencatatan aktual.

---

- 🎯 **Visi dan Tujuan Bisnis**

**Visi:**
Membangun sistem KPI terpadu yang mampu mencatat, mengelola, dan memprediksi performa operasional lintas departemen secara otomatis, fleksibel, dan dapat diintegrasikan dengan sistem sensor/IoT.

**Tujuan:**

- Menyediakan platform digital untuk perencanaan dan pemantauan KPI numerik/non-numerik secara multi-level (tahunan → harian).
- Menghubungkan aktual capaian dengan gangguan operasional yang terjadi.
- Menyediakan fitur prediksi capaian akhir tahun menggunakan metode manual dan otomatis.
- Menyajikan dashboard interaktif yang membantu manajemen mengambil keputusan berbasis data real-time.
- Mempersiapkan sistem untuk integrasi IoT & otomatisasi data (sensor → MQTT → API).

---

- 👥 **Stakeholders dan Peran**

| Peran                   | Deskripsi                                                           |
| ----------------------- | ------------------------------------------------------------------- |
| **Manajemen Pusat**     | Pengguna utama dashboard untuk melihat performa & membuat keputusan |
| **Kepala Departemen**   | Penanggung jawab KPI tahunan dan pemantauan capaian tiap unit       |
| **Operator Lapangan**   | Mencatat capaian aktual & gangguan operasional                      |
| **IT & Developer Team** | Membangun dan memelihara sistem mx-core-metric                      |
| **Tim IoT & Integrasi** | Menghubungkan sistem dengan data dari sensor                        |
| **QA dan Support**      | Menguji sistem, memastikan kualitas dan mendukung user              |

---

- 🧭 **Kebutuhan Bisnis Tingkat Tinggi**

1. Sistem mampu mengelola target KPI tahunan dan breakdown periodik (bulanan/mingguan/harian).
2. Sistem mendukung input aktual capaian KPI dan gangguan (disturbance) secara manual maupun otomatis.
3. Sistem menyediakan fitur prediksi (forecast) capaian akhir tahun berdasarkan data historis.
4. Sistem menyediakan dashboard untuk memantau KPI, deviasi, dan dampak gangguan.
5. Sistem memungkinkan integrasi dengan sensor eksternal (via MQTT) untuk pencatatan otomatis.

---

- 🏁 **Kriteria Keberhasilan Proyek**

| Kriteria                   | Indikator                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| 🎯 **Fungsionalitas**      | Semua proses KPI (rencana → catat → pantau → prediksi) dapat dilakukan dalam satu sistem |
| 📈 **Akurasi Forecasting** | Prediksi sistem mendekati hasil aktual (deviasi ≤10%) untuk KPI numerik                  |
| ⚙️ **Stabilitas Sistem**   | Uptime sistem ≥ 99.5% selama jam operasional                                             |
| 🔌 **Keterhubungan**       | Sistem dapat menerima data otomatis dari sensor MQTT dengan latency < 3 detik            |
| 🧠 **Adopsi User**         | >80% departemen menggunakan sistem secara aktif dalam 3 bulan setelah peluncuran         |

---

- 🧱 **Batasan dan Asumsi**

| Batasan                                             | Asumsi                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------- |
| Tidak semua KPI bisa diukur secara numerik          | KPI bertipe boolean/status tetap didukung                                 |
| Tidak semua gangguan berdampak langsung pada KPI    | Sistem akan menyediakan fitur "link manual" antara disturbance dan KPI    |
| Prediksi tidak menggunakan ML canggih di tahap awal | Forecast awal menggunakan metode manual & linear, ML ditambahkan kemudian |
| Integrasi sensor hanya untuk unit tertentu          | Pilot dilakukan di unit yang sudah memiliki sensor & gateway MQTT         |

---

- 📚 **Referensi Pendukung**

- Dokumen ERD & Struktur Data `mx-core-metric`
- Studi kasus penggunaan KPI di Maintenance, Produksi, dan K3
- Rencana strategis korporat terkait digitalisasi performa dan dashboardisasi
- Standar ISO 22400 (Key Performance Indicators for Manufacturing Operations)

---

- ✅ **Output BRS**

✅ Dokumen BRS ini menjadi dasar pengembangan kebutuhan teknis di tahap berikutnya (**SRS**).
Semua stakeholder bisnis dapat meninjau dan menyetujui visi, peran, dan kebutuhan yang dijabarkan.

---

## 📘 **2. SRS – Software Requirement Specification**

---

### 📌 **1. Tujuan Dokumen**

Dokumen ini menjabarkan kebutuhan teknis sistem `mx-core-metric` yang akan dikembangkan. Dokumen ini menjadi rujukan utama bagi tim teknis (developer, QA, devops) dalam proses desain, implementasi, dan pengujian.

---

### 📦 **2. Ruang Lingkup Sistem**

`mx-core-metric` adalah plugin dalam monorepo `mx-core` yang berfungsi sebagai platform pengelolaan Key Performance Indicator (KPI) lintas departemen dan unit operasional. Fitur utama sistem ini mencakup:

- Perencanaan KPI tahunan dan breakdown ke target periodik
- Input dan pencatatan capaian aktual KPI
- Pencatatan gangguan operasional (disturbance)
- Forecasting capaian KPI akhir tahun
- Dashboard performa & insight gangguan
- Dukungan integrasi sensor melalui MQTT

---

### 📚 **3. Definisi dan Akronim**

| Istilah/Akronim | Definisi                                                                      |
| --------------- | ----------------------------------------------------------------------------- |
| KPI             | Key Performance Indicator – indikator kinerja yang terukur                    |
| Forecast        | Prediksi capaian akhir berdasarkan data historis                              |
| MQTT            | Message Queue Telemetry Transport – protokol komunikasi lightweight untuk IoT |
| IoT             | Internet of Things – integrasi perangkat fisik dan sistem digital             |
| Disturbance     | Gangguan operasional yang dapat memengaruhi KPI                               |
| Unit            | Sub-divisi atau lokasi fisik dalam departemen                                 |
| Granular Target | Target KPI dengan resolusi waktu lebih kecil (bulanan, mingguan, harian)      |

---

### 📈 **4. Deskripsi Umum Sistem**

- 🧭 Alur Sistem:

1. **Perencanaan KPI**: Ditentukan setahun sekali, terdiri dari target tahunan per departemen/unit.
2. **Breakdown Target**: Target tahunan dipecah ke periode lebih kecil (bulan, minggu, hari).
3. **Input Capaian Aktual**: User atau sistem mencatat capaian aktual pada periode berjalan.
4. **Gangguan Operasional**: Dicatat sebagai disturbance, bisa dihubungkan ke KPI tertentu.
5. **Forecast Otomatis**: Sistem menghitung estimasi capaian akhir tahun secara otomatis.
6. **Dashboard Monitoring**: Menyediakan visualisasi KPI, forecast, deviasi, dan insight gangguan.

---

### ⚙️ **5. Fungsi Sistem (Functional Requirements Overview)**

Berikut daftar kebutuhan fungsional sistem `mx-core-metric`:

| ID    | Nama Fitur                        | Deskripsi Singkat                                                              |
| ----- | --------------------------------- | ------------------------------------------------------------------------------ |
| FR-01 | Manajemen KPI Master              | CRUD master KPI (nama, jenis, satuan, aktif/tidak)                             |
| FR-02 | Penetapan Target KPI Tahunan      | User menetapkan target tahunan tiap KPI                                        |
| FR-03 | Breakdown Target Periodik         | Target tahunan dibagi ke target bulanan/mingguan/harian (otomatis/manual)      |
| FR-04 | Input Capaian Aktual KPI          | Input nilai aktual KPI per periode (manual/sensor/import)                      |
| FR-05 | Pencatatan Gangguan (Disturbance) | Input gangguan berdasarkan sumber, kategori, durasi                            |
| FR-06 | Link Gangguan ke KPI              | Hubungkan disturbance dengan KPI tertentu untuk analisis dampak                |
| FR-07 | Forecast Capaian Otomatis         | Prediksi capaian akhir tahun berdasarkan trend data aktual                     |
| FR-08 | Visualisasi Dashboard             | Tampilan KPI vs target, forecast, deviasi, dan gangguan per unit/departemen    |
| FR-09 | Role Management & Akses           | Role-based access: admin, department head, operator                            |
| FR-10 | Integrasi Sensor IoT via MQTT     | Sistem menerima data aktual dari perangkat IoT dan mencatat ke `kpi_record`    |
| FR-11 | Logging & Audit Trail             | Mencatat semua perubahan data penting (created_by, updated_by, timestamp, dll) |
| FR-12 | Export & Laporan                  | Ekspor data KPI, forecast, dan gangguan ke format Excel/CSV/PDF                |

---

### 🔐 **6. Non-Functional Requirements (NFR)**

| ID     | Kebutuhan                     | Detail                                                                |
| ------ | ----------------------------- | --------------------------------------------------------------------- |
| NFR-01 | **Availability**              | Sistem tersedia 24/7 dengan uptime ≥ 99.5%                            |
| NFR-02 | **Scalability**               | Dapat menangani pertumbuhan KPI & unit tanpa degradasi performa       |
| NFR-03 | **Security & Access Control** | Role-based access, autentikasi token/jwt, audit trail semua aktivitas |
| NFR-04 | **Performance**               | Dashboard harus memuat dalam <2 detik untuk 100 KPI aktif             |
| NFR-05 | **Data Integrity**            | Validasi ketat pada input dan keterkaitan antar entitas (foreign key) |
| NFR-06 | **Latency Integrasi IoT**     | Data dari MQTT → record masuk ke DB dalam waktu ≤ 3 detik             |
| NFR-07 | **Backup & Recovery**         | Backup harian, kemampuan rollback data hingga 7 hari kebelakang       |

---

### ⛔ **7. Batasan Sistem**

| Kode  | Batasan                                                             |
| ----- | ------------------------------------------------------------------- |
| BL-01 | Sistem belum mendukung visualisasi geografis atau peta unit         |
| BL-02 | Tidak semua gangguan otomatis berdampak pada KPI, perlu link manual |
| BL-03 | Prediksi masih berbasis linear/manual, belum pakai ML kompleks      |
| BL-04 | Belum mendukung offline input (harus via online/web UI/API)         |
| BL-05 | Input sensor hanya mendukung format MQTT JSON tertentu (predefined) |

---

- ✅ **Ringkasan Output Tahap Ini**

* [x] Tujuan dan ruang lingkup sistem terdefinisi
* [x] Kebutuhan fungsional (FR-01 s.d FR-12) terdokumentasi
* [x] Kebutuhan non-fungsional (availability, security, performance, dll)
* [x] Batasan sistem dijelaskan agar ekspektasi terukur

---

### 📌 1. **Use-Case List**

| Use-Case ID | Nama Use-Case                | Aktor                     | FR/NFR/BL Terkait    |
| ----------- | ---------------------------- | ------------------------- | -------------------- |
| UC-001      | Manajemen Master KPI         | Admin                     | FR-01, NFR-03        |
| UC-002      | Penetapan Target KPI Tahunan | Dept Head/Admin           | FR-02, NFR-03        |
| UC-003      | Breakdown Target Periodik    | Dept Head/Admin           | FR-03, NFR-05, BL-03 |
| UC-004      | Input Capaian Aktual KPI     | Operator/System (sensor)  | FR-04, FR-10, NFR-06 |
| UC-005      | Input Gangguan Operasional   | Operator                  | FR-05, NFR-05        |
| UC-006      | Hubungkan Gangguan ke KPI    | Dept Head/Analyst         | FR-06, BL-02         |
| UC-007      | Proses Forecast Otomatis     | System                    | FR-07, NFR-04, BL-03 |
| UC-008      | Visualisasi Dashboard KPI    | Semua user (viewer/admin) | FR-08, NFR-04        |
| UC-009      | Manajemen Role & Hak Akses   | Admin                     | FR-09, NFR-03        |
| UC-010      | Terima Data Sensor via MQTT  | System (MQTT broker)      | FR-10, NFR-06, BL-05 |
| UC-011      | Audit Trail Perubahan Data   | System                    | FR-11, NFR-03        |
| UC-012      | Ekspor Data & Laporan        | User/Manajemen            | FR-12, NFR-04        |

---

### 📑 2. **Use-Case Detail (Narratif)**

Berikut beberapa use-case utama yang mewakili seluruh FR dan NFR:

---

- 🟦 UC-001 — **Manajemen Master KPI**

| Elemen         | Deskripsi                                                      |
| -------------- | -------------------------------------------------------------- |
| Use-Case ID    | UC-001                                                         |
| Aktor          | Admin                                                          |
| Deskripsi      | Admin membuat, mengubah, dan menonaktifkan master data KPI     |
| Pre-condition  | User memiliki hak akses Admin                                  |
| Post-condition | Data KPI aktif siap digunakan pada target dan record           |
| Alur Utama     | 1. Admin login → 2. Akses modul KPI → 3. Tambah/edit/hapus KPI |
| Exception      | Data duplikat, referensi digunakan di target/record            |
| Relasi FR/NFR  | FR-01, NFR-03                                                  |

---

- 🟨 UC-003 — **Breakdown Target Periodik**

| Elemen         | Deskripsi                                                            |
| -------------- | -------------------------------------------------------------------- |
| Use-Case ID    | UC-003                                                               |
| Aktor          | Admin / Dept Head                                                    |
| Deskripsi      | User membagi target tahunan menjadi target periodik                  |
| Pre-condition  | Target tahunan sudah tersedia                                        |
| Post-condition | Target periodik tersimpan dan ditautkan ke target tahunan            |
| Alur Utama     | 1. Pilih KPI tahunan → 2. Pilih metode (otomatis/manual) → 3. Simpan |
| Exception      | Periode tumpang tindih, nilai tidak proporsional                     |
| Relasi         | FR-03, NFR-05, BL-03                                                 |

---

- 🟩 UC-004 — **Input Capaian Aktual KPI (Manual & Sensor)**

| Elemen         | Deskripsi                                                     |
| -------------- | ------------------------------------------------------------- |
| Use-Case ID    | UC-004                                                        |
| Aktor          | Operator / System (IoT Gateway)                               |
| Deskripsi      | Sistem atau user menginput nilai aktual capaian KPI           |
| Pre-condition  | KPI & target periodik sudah terdaftar                         |
| Post-condition | Capaian aktual tercatat dan siap digunakan untuk forecasting  |
| Alur Utama     | 1. Input manual → atau MQTT publish → 2. Validasi → 3. Simpan |
| Exception      | Format data tidak valid, referensi KPI tidak ditemukan        |
| Relasi         | FR-04, FR-10, NFR-06, BL-05                                   |

---

- 🟥 UC-007 — **Forecast Capaian Otomatis**

| Elemen         | Deskripsi                                                               |
| -------------- | ----------------------------------------------------------------------- |
| Use-Case ID    | UC-007                                                                  |
| Aktor          | Sistem                                                                  |
| Deskripsi      | Sistem menghitung estimasi akhir tahun dari data capaian historis       |
| Pre-condition  | Minimal 2 data historis tersedia                                        |
| Post-condition | Data forecast tersedia di dashboard dan `kpi_forecast`                  |
| Alur Utama     | 1. Cron jalan → 2. Ambil data historis → 3. Hitung → 4. Simpan forecast |
| Exception      | Tidak ada data historis, metode belum tersedia                          |
| Relasi         | FR-07, NFR-04, BL-03                                                    |

---

- 🟪 UC-008 — **Visualisasi Dashboard KPI & Gangguan**

| Elemen         | Deskripsi                                                             |
| -------------- | --------------------------------------------------------------------- |
| Use-Case ID    | UC-008                                                                |
| Aktor          | Semua pengguna                                                        |
| Deskripsi      | User mengakses tampilan performa KPI, deviasi, gangguan, dan forecast |
| Pre-condition  | Data KPI, disturbance, dan forecast tersedia                          |
| Post-condition | Insight ditampilkan dalam format grafik & tabel                       |
| Alur Utama     | 1. User login → 2. Pilih dashboard → 3. Lihat summary dan detail      |
| Exception      | Data kosong, gagal fetch API backend                                  |
| Relasi         | FR-08, NFR-04                                                         |

---

- 🟨 UC-009 — **Manajemen Role & Hak Akses**

| Elemen         | Deskripsi                                                                   |
| -------------- | --------------------------------------------------------------------------- |
| Use-Case ID    | UC-009                                                                      |
| Aktor          | Admin                                                                       |
| Deskripsi      | Admin mengelola peran pengguna dan hak akses berdasarkan peran (role-based) |
| Pre-condition  | User sudah terdaftar sebagai user aktif                                     |
| Post-condition | Role pengguna ditentukan, membatasi akses fitur tertentu                    |
| Alur Utama     | 1. Admin login → 2. Akses modul user → 3. Atur role (viewer/operator/admin) |
| Exception      | Akses tanpa role, konflik hak akses                                         |
| Relasi FR/NFR  | FR-09, NFR-03                                                               |

---

- 🟩 UC-010 — **Terima Data Sensor via MQTT**

| Elemen         | Deskripsi                                                                               |
| -------------- | --------------------------------------------------------------------------------------- |
| Use-Case ID    | UC-010                                                                                  |
| Aktor          | System (MQTT broker / IoT Gateway)                                                      |
| Deskripsi      | Sistem menerima payload JSON dari perangkat sensor via protokol MQTT                    |
| Pre-condition  | Sensor aktif, format payload sesuai skema                                               |
| Post-condition | Nilai otomatis disimpan ke `kpi_record` dengan `source: "sensor"`                       |
| Alur Utama     | 1. Sensor publish → 2. MQTT Gateway menerima → 3. Format diverifikasi → 4. Insert ke DB |
| Exception      | Payload invalid, timeout koneksi MQTT                                                   |
| Relasi         | FR-10, NFR-06, BL-05                                                                    |

---

- 🟥 UC-011 — **Audit Trail Perubahan Data**

| Elemen         | Deskripsi                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------- |
| Use-Case ID    | UC-011                                                                                          |
| Aktor          | Sistem (otomatis)                                                                               |
| Deskripsi      | Sistem mencatat setiap perubahan data penting untuk keperluan audit                             |
| Pre-condition  | Operasi data dilakukan oleh user/sensor                                                         |
| Post-condition | Data tersimpan dalam bentuk log/audit trail dengan identitas user                               |
| Alur Utama     | 1. User/sensor melakukan perubahan → 2. Sistem simpan log `created_by`, `updated_by`, timestamp |
| Exception      | Akses tanpa otorisasi, data tidak lengkap                                                       |
| Relasi         | FR-11, NFR-03                                                                                   |

---

- 🟦 UC-012 — **Ekspor Data & Laporan**

| Elemen         | Deskripsi                                                                    |
| -------------- | ---------------------------------------------------------------------------- |
| Use-Case ID    | UC-012                                                                       |
| Aktor          | User (Admin / Dept Head / Viewer)                                            |
| Deskripsi      | User mengekspor data KPI, forecast, dan gangguan dalam format CSV/PDF/Excel  |
| Pre-condition  | Data sudah tersedia dan terfilter sesuai kriteria user                       |
| Post-condition | File unduhan berhasil dihasilkan dan tersedia                                |
| Alur Utama     | 1. User pilih tipe data → 2. Filter periode/departemen/unit → 3. Klik ekspor |
| Exception      | Data kosong, gagal generate file                                             |
| Relasi         | FR-12, NFR-04                                                                |

---

### 📌 Traceability Matrix

| FR / NFR / BL | Use-Case ID | Keterangan Singkat                 |
| ------------- | ----------- | ---------------------------------- |
| FR-01         | UC-001      | Master KPI                         |
| FR-02         | UC-002      | Target tahunan                     |
| FR-03         | UC-003      | Breakdown periodik                 |
| FR-04         | UC-004      | Input capaian manual               |
| FR-05         | UC-005      | Input gangguan                     |
| FR-06         | UC-006      | Link disturbance ke KPI            |
| FR-07         | UC-007      | Forecast sistem                    |
| FR-08         | UC-008      | Dashboard                          |
| FR-09         | UC-009      | Role-based access                  |
| FR-10         | UC-010      | MQTT sensor input                  |
| FR-11         | UC-011      | Audit trail                        |
| FR-12         | UC-012      | Export laporan                     |
| NFR-01–07     | UC-001–012  | Diterapkan lintas use-case         |
| BL-01         | -           | Belum dukung visualisasi geografis |
| BL-02         | UC-006      | Gangguan → KPI butuh link manual   |
| BL-03         | UC-003,007  | Forecast masih linear/manual       |
| BL-04         | -           | Tidak mendukung input offline      |
| BL-05         | UC-010      | Format sensor MQTT terbatas        |

---

### ✅ **🔼 Prioritas Pengembangan (MoSCoW)**

Berikut adalah versi **terbaru dan lengkap**:

| Prioritas  | Modul/Fungsi                                          | FR / UC Terkait               | Keterangan                                                     |
| ---------- | ----------------------------------------------------- | ----------------------------- | -------------------------------------------------------------- |
| **Must**   | Manajemen Master KPI                                  | FR-01 / UC-001                | Fitur dasar sebagai fondasi semua target & record KPI          |
| **Must**   | Penetapan Target KPI Tahunan                          | FR-02 / UC-002                | Fondasi perencanaan tahunan KPI                                |
| **Must**   | Breakdown Target Periodik                             | FR-03 / UC-003                | Membagi target tahunan ke bulanan/mingguan/harian              |
| **Must**   | Input capaian aktual KPI (manual + sensor/IoT)        | FR-04, FR-10 / UC-004, UC-010 | Inti dari sistem pengukuran performa KPI                       |
| **Must**   | Forecast capaian akhir tahun                          | FR-07 / UC-007                | Menyediakan prediksi real-time berbasis data historis          |
| **Must**   | Visualisasi dashboard performa dan deviasi KPI        | FR-08 / UC-008                | Wadah utama manajemen melihat insight capaian                  |
| **Should** | Pencatatan gangguan operasional (disturbance)         | FR-05 / UC-005                | Menyediakan konteks penyebab deviasi performa                  |
| **Should** | Link gangguan ke KPI tertentu                         | FR-06 / UC-006                | Memberi analisis dampak terhadap KPI                           |
| **Should** | Ekspor laporan dan data KPI                           | FR-12 / UC-012                | Mempermudah pelaporan offline / backup                         |
| **Could**  | Role management & akses kontrol                       | FR-09 / UC-009                | Berguna untuk skala besar, tapi bisa default 1 level dulu      |
| **Could**  | Audit trail aktivitas data                            | FR-11 / UC-011                | Penting untuk traceability, bisa menyusul jika fase awal kecil |
| **Won’t**  | Integrasi AI/ML forecasting lanjutan (di luar linear) | - / (BL-03)                   | Disimpan untuk fase pengembangan selanjutnya                   |

---

## 🎯 **3. System Design**

Tahap **System Design** bertujuan untuk **menerjemahkan semua kebutuhan sistem (FR, NFR, UC, BL)** menjadi bentuk **arsitektur teknis** yang siap diimplementasikan. System Design memastikan bahwa:

- Semua kebutuhan telah **dipetakan ke komponen dan modul sistem**
- Arsitektur sistem dibuat agar **modular, scalable, maintainable**
- Desain teknis disusun hingga ke level **implementasi database, API, dan logika bisnis**

---

- 🔧 **Substruktur System Design**

System Design dibagi menjadi **dua level utama:**

| Bagian | Nama                        | Tujuan Utama                                                              |
| ------ | --------------------------- | ------------------------------------------------------------------------- |
| 🔷     | **High-Level Design (HLD)** | Mendeskripsikan sistem secara global dan modular                          |
| 🔶     | **Low-Level Design (LLD)**  | Mendeskripsikan detail teknis seperti database, algoritma, dan API schema |

---

- 🗂️ **Konten High-Level Design (HLD)**

| Bagian                    | Penjelasan                                        |
| ------------------------- | ------------------------------------------------- |
| Arsitektur Modular        | Modul utama sistem dan tanggung jawabnya          |
| Diagram Arsitektur Sistem | Ilustrasi visual atau teks arsitektur             |
| Alur Komunikasi           | Interaksi antar modul, protokol, arah data        |
| Flow Autentikasi & Role   | Model otorisasi dan peran pengguna                |
| Integrasi Eksternal       | Sistem eksternal seperti MQTT, IoT device, SSO    |
| Pemetaan ke SRS           | Menunjukkan bahwa semua FR/NFR/UC/BL terakomodasi |

---

- 📂 **Konten Low-Level Design (LLD)**

| Bagian                            | Penjelasan                                                 |
| --------------------------------- | ---------------------------------------------------------- |
| Entity Relationship Diagram (ERD) | Struktur data dan relasi antar tabel dari sistem KPI       |
| Data Dictionary                   | Deskripsi tiap kolom/tabel, tipe data, constraint, dsb     |
| Skema API (REST / GraphQL)        | Endpoint, payload, dan response yang digunakan             |
| Algoritma Forecasting             | Formula dan metode logika perhitungan prediksi capaian KPI |
| Konfigurasi MQTT & Format Payload | Format pesan sensor IoT, topik MQTT, dan validasi payload  |

---

- 🧠 **Validasi System Design terhadap SRS**

System Design (baik HLD maupun LLD nanti) harus memenuhi semua elemen berikut:

| Tipe                     | Divalidasi dalam                 | Status                        |
| ------------------------ | -------------------------------- | ----------------------------- |
| Functional Req (FR)      | Modul dan API                    | ✅ Sudah ditetapkan di HLD    |
| Non-Functional Req (NFR) | Security, performance, integrasi | ✅ Dicakup                    |
| Use-Case (UC)            | Modul & Alur UI-Backend          | ✅ Telah dipetakan            |
| Batasan (BL)             | Dikenali dan disikapi            | ✅ Diantisipasi di arsitektur |

---

### 🔷 **3.1. High-Level Design (HLD)** → kita bahas sekarang

Tujuan dari **High-Level Design (HLD)** adalah memberikan **gambaran arsitektur sistem secara modular**, hubungan antar komponen, serta alur komunikasi dan integrasi — **berdasarkan kebutuhan yang telah ditentukan di SRS (FR, NFR, BL, UC).**

---

- 🔷 1. **Tujuan High-Level Design**

* Mendeskripsikan **arsitektur sistem mx-core-metric** secara modular
* Menjelaskan **komponen utama**, relasi, dan **alur data**
* Mendasari pengambilan keputusan desain teknis di LLD nanti

---

- 🧩 2. **Komponen Utama Sistem**

Sistem `mx-core-metric` memiliki beberapa **sub-komponen modul** yang saling terhubung, dengan tanggung jawab sebagai berikut:

| Modul                     | Deskripsi Singkat                                                     |
| ------------------------- | --------------------------------------------------------------------- |
| **KPI Management**        | Manajemen master KPI, jenis, satuan, dan status aktif                 |
| **Target Planner**        | Menangani input target tahunan dan breakdown ke target periodik       |
| **KPI Recorder**          | Mencatat capaian aktual KPI dari user/manual, import, atau sensor IoT |
| **Disturbance Manager**   | Pencatatan gangguan dan link ke KPI tertentu                          |
| **Forecast Engine**       | Proses perhitungan estimasi capaian akhir tahun                       |
| **Dashboard & Analytics** | Menyediakan tampilan visual KPI, deviasi, gangguan, forecast          |
| **User & Role Manager**   | Manajemen user, autentikasi, dan hak akses                            |
| **MQTT Data Ingestor**    | Penerimaan dan parsing data dari sensor via MQTT                      |
| **Audit Logger**          | Logging otomatis untuk semua transaksi kritikal                       |
| **Reporting Module**      | Ekspor data dan laporan ke Excel/CSV/PDF                              |

---

- 🏗️ 3. **Diagram Arsitektur Modular**

```plaintext
                                +-----------------------------+
                                |         User Interface      |
                                |     (Web Dashboard UI)      |
                                +-------------+---------------+
                                              |
              +-------------------------------+-----------------------------+
              |                                                             |
+---------------------------+                           +------------------+------------------+
|       REST API Gateway    |                           |        MQTT Broker (IoT)            |
|   (Next.js API Routes)    |                           |   [mosquitto / cloud-based MQTT]    |
+-------------+-------------+                           +----------+---------------------------+
              |                                                    |
   +----------+----------+                               +---------v----------+
   |     Application     |                               |    MQTT Ingestor   |
   |       Layer         |                               |  (Data Parser +    |
   |  (Nest.js service*) |                               |   Validator)       |
   +---+--------+--------+                               +---------+----------+
       |        |                                                  |
       |        |                                +-----------------+-----------------+
       |        |                                |                                   |
+------v+    +--v------+             +------------v------------+      +---------------v---------------+
|  KPI  |    | Target  |             |   KPI Recorder          |      |   Disturbance Manager        |
| Mgmt  |    | Planner |             | (Manual + Sensor Input) |      | (Logs, Source, Link to KPI)  |
+-------+    +---------+             +------------+------------+      +---------------+---------------+
                                                  |                                       |
                                                  |                                       |
                                     +------------v------------+             +------------v------------+
                                     |     Forecast Engine     |             |      Audit Logger        |
                                     | (Linear, Manual, Future |             | (Perubahan data penting) |
                                     |  ML-ready)              |             +---------------------------+
                                     +------------+------------+
                                                  |
                                      +-----------v-----------+
                                      |   Dashboard & Report  |
                                      +-----------------------+
```

> Catatan:
>
> - Backend dapat menggunakan monolith Next.js API routes atau dipisah microservice (Nest.js)
> - MQTT listener bisa dijalankan sebagai service terpisah dengan worker/job scheduler

---

- 🔗 4. **Alur Komunikasi Sistem**

| Komunikasi             | Protokol/Metode          | Keterangan                                                     |
| ---------------------- | ------------------------ | -------------------------------------------------------------- |
| UI ↔ Backend API       | HTTPS REST API           | Form input KPI, target, disturbance, dll                       |
| Sensor ↔ MQTT Broker   | MQTT                     | Sensor publish ke topic, misal `kpi/update/unit-a`             |
| MQTT Broker ↔ Ingestor | MQTT subscription        | Ingestor subscribe dan parsing payload JSON                    |
| Ingestor ↔ Database    | ORM / SQL                | Menyimpan nilai ke `kpi_record`, dengan source = "sensor"      |
| Forecast Engine ↔ DB   | Cronjob/Worker + SQL/ORM | Ambil data `kpi_record`, hitung, lalu simpan ke `kpi_forecast` |
| Dashboard ↔ API        | REST/GraphQL             | Menampilkan semua performa KPI, gangguan, forecast             |
| Auth System ↔ Frontend | Token-based (JWT/OAuth2) | Autentikasi user & role-based access                           |

---

- 🔒 5. **Security & Auth Flow**

| Elemen            | Implementasi                                                 |
| ----------------- | ------------------------------------------------------------ |
| **Auth**          | Token-based auth (JWT) atau OAuth2 flow                      |
| **Role Access**   | Role disimpan dalam session/token (admin/operator/viewer)    |
| **Audit Trail**   | Modul logger menyimpan `created_by`, `updated_by`, timestamp |
| **MQTT Auth**     | Username/password auth di broker MQTT (opsional ACL)         |
| **Rate Limiting** | Untuk API dan MQTT listener agar tidak overload              |

---

- 🌐 6. **External Interface**

| Sistem Eksternal    | Jenis Integrasi   | Keterangan                                      |
| ------------------- | ----------------- | ----------------------------------------------- |
| MQTT Broker         | MQTT v3.1 / v5    | Ingest data dari sensor IoT                     |
| IoT Sensor          | MQTT Publisher    | Perangkat publikasi payload JSON                |
| Dashboard Frontend  | Web App (Next.js) | UI interaktif, menggunakan API internal         |
| Export PDF/Excel    | Library eksternal | File generator (contoh: jsPDF, ExcelJS)         |
| SSO / Auth Provider | OAuth2 (opsional) | Untuk user manajemen terpusat (jika enterprise) |

---

- 🧠 7. **Pemetaan ke SRS**

Semua bagian HLD ini sudah **terpenuhi dan sesuai** dengan SRS (FR/NFR/UC/BL):

| Kategori | Referensi         | Penjelasan                                                              |
| -------- | ----------------- | ----------------------------------------------------------------------- |
| FR       | FR-01 s/d FR-12   | Semua fitur memiliki modul dan komunikasi terpetakan                    |
| NFR      | NFR-01 s/d NFR-07 | Dibahas melalui uptime, scalability, latency, auth, dan audit           |
| UC       | UC-001 s/d UC-012 | Semua use-case tercermin dalam modul utama HLD                          |
| BL       | BL-01 s/d BL-05   | Batasan visualisasi, AI, format MQTT, dan offline telah dipertimbangkan |

---

- ✅ Ringkasan HLD

* ✅ Arsitektur sistem modular sudah ditentukan
* ✅ Komunikasi antar modul dan protokol eksternal jelas
* ✅ Desain terbuka untuk integrasi dan bersifat scalable
* ✅ Selaras dengan semua kebutuhan di SRS

---

- 🎯 **3.2 Low-Level Design (LLD)**

Low-Level Design bertujuan untuk:

- Menjabarkan **detail teknis tiap modul** berdasarkan HLD
- Menyediakan **spesifikasi implementasi** untuk database, API, algoritma, dan integrasi
- Memastikan **semua kebutuhan fungsional (FR), non-fungsional (NFR), dan batasan (BL)** dari **SRS** dapat diimplementasikan secara **terukur dan konsisten**

---

- 🧱 1. **Entity Relationship Diagram (ERD)**

LLD ini mengacu penuh pada ERD yang telah Anda lampirkan sebelumnya (format `dbdiagram.io`). Berikut adalah ringkasannya dalam bentuk modul:

📂 **Tabel Utama: KPI & Target**

| Tabel               | Modul HLD Terkait | Deskripsi Fungsi                     |
| ------------------- | ----------------- | ------------------------------------ |
| `kpi`               | KPI Management    | Master data KPI                      |
| `kpi_target_annual` | Target Planner    | Target tahunan KPI                   |
| `kpi_target`        | Target Planner    | Breakdown ke periodik (monthly, dll) |
| `kpi_record`        | KPI Recorder      | Input capaian aktual                 |
| `kpi_forecast`      | Forecast Engine   | Hasil prediksi capaian akhir tahun   |

📂 **Tabel Gangguan**

| Tabel                | Modul HLD Terkait   | Deskripsi Fungsi       |
| -------------------- | ------------------- | ---------------------- |
| `disturbance_log`    | Disturbance Manager | Gangguan operasional   |
| `disturbance_source` | Disturbance Manager | Master sumber gangguan |

📂 **Tabel Organisasi & User**

| Tabel        | Modul HLD Terkait    | Deskripsi Fungsi            |
| ------------ | -------------------- | --------------------------- |
| `unit`       | User Context Manager | Unit fisik dalam organisasi |
| `department` | User Context Manager | Departemen induk            |

---

- 📖 2. **Data Dictionary (Contoh)**

Berikut cuplikan struktur **field-level** yang relevan untuk pengembangan:

🔹 Tabel `kpi_record`

| Field           | Tipe Data    | Deskripsi                       |          |            |
| --------------- | ------------ | ------------------------------- | -------- | ---------- |
| `id`            | varchar (pk) | Primary key                     |          |            |
| `kpi_id`        | varchar      | FK ke `kpi`                     |          |            |
| `department_id` | varchar      | FK ke `department`              |          |            |
| `unit_id`       | varchar      | FK ke `unit`                    |          |            |
| `periode`       | date         | Tanggal pencapaian              |          |            |
| `value`         | float        | Nilai aktual (sesuai jenis KPI) |          |            |
| `note`          | varchar      | Catatan tambahan                |          |            |
| `source`        | enum         | 'manual'                        | 'sensor' | 'imported' |
| `created_by`    | varchar      | User pencatat / sistem IoT      |          |            |
| `created_at`    | datetime     | Timestamp                       |          |            |

---

- 🌐 3. **Skema API (REST API)**

Sesuai dengan arsitektur HLD (Next.js API / Nest.js), berikut contoh endpoint utama:

🔹 `POST /api/kpi-record`

| Deskripsi       | Mencatat capaian KPI manual atau dari sensor |
| --------------- | -------------------------------------------- |
| Payload Example |                                              |

```json
{
  "kpi_id": "kpi-001",
  "unit_id": "unit-a",
  "department_id": "dept-prod",
  "periode": "2025-12-01",
  "value": 9500,
  "source": "manual",
  "note": "Capaian minggu ke-1",
  "created_by": "user-001"
}
```

| Response |

```json
{
  "status": "success",
  "data": {
    "id": "record-12345"
  }
}
```

---

🔹 `POST /api/mqtt-ingest`

| Deskripsi | Endpoint untuk menerima payload dari MQTT listener (internal call) |
| Payload |

```json
{
  "topic": "kpi/update/unit-a",
  "payload": {
    "kpi_id": "kpi-001",
    "value": 480,
    "periode": "2025-12-02",
    "source": "sensor"
  }
}
```

---

🔹 `GET /api/dashboard/summary`

| Fungsi | Mendapatkan ringkasan KPI vs target untuk dashboard |
| Query Params | `periode`, `unit_id`, `department_id` |
| Response Example |

```json
{
  "target": 10000,
  "actual": 9500,
  "achievement_percent": 95,
  "status": "warning"
}
```

---

- 🧠 4. **Algoritma Forecasting**

Modul `Forecast Engine` akan menjalankan perhitungan otomatis dengan metode:

📌 Default Method: **Linear Projection**

```ts
/**
 * Linear Forecast
 * @param actuals Array of past values with known time delta (weekly/monthly)
 * @param currentIndex Index of current period (e.g. month 8 of 12)
 */
function forecastLinear(actuals: number[], currentIndex: number): number {
  const sum = actuals.reduce((a, b) => a + b, 0);
  const avg = sum / currentIndex;
  const projectedTotal = avg * 12;
  return projectedTotal;
}
```

**Catatan:**

- Untuk NFR **forecast cepat**, algoritma ini sangat ringan
- Di masa depan bisa diganti dengan **regression, LSTM**, dsb (sesuai roadmap)

---

- 🧪 5. **Validasi Payload Sensor (MQTT Format)**

| Format MQTT Payload (JSON) | Topik: `kpi/update/{unit}` |

```json
{
  "kpi_id": "kpi-001",
  "value": 123.45,
  "periode": "2025-12-10"
}
```

| Validasi saat diterima:               |
| ------------------------------------- |
| ✅ Apakah `kpi_id` valid?             |
| ✅ Apakah `periode` dalam format ISO? |
| ✅ Apakah `value` numerik?            |
| ✅ Apakah unit/kpi aktif?             |

> Jika tidak valid → reject & log error

---

- ⚙️ 6. **MQTT Listener Design**

* **Broker:** Bisa pakai `Mosquitto` atau MQTT Cloud (e.g. HiveMQ, EMQX)
* **Topik Standar:**
  Format: `kpi/update/{unit_id}`
  Payload: JSON (sesuai skema di atas)
* **Processor:** Listener subscribe ke topik, validasi, lalu simpan ke DB

---

- 🔐 7. **Konfigurasi Role & Logging**

| Role      | Hak Akses Modul                     |
| --------- | ----------------------------------- |
| Admin     | Semua modul                         |
| Dept Head | KPI & Target di departemen tertentu |
| Operator  | Input capaian & gangguan            |
| Viewer    | Read-only akses dashboard & laporan |

| Logging | Entitas yang dilog: `kpi_record`, `target`, `forecast`, `disturbance` |

---

- ✅ Sinkronisasi LLD dengan HLD & SRS

| Elemen        | Dipetakan dalam LLD                                                                  |
| ------------- | ------------------------------------------------------------------------------------ |
| FR-01 s/d 12  | CRUD API, struktur data, relasi                                                      |
| NFR-01 s/d 07 | Latency MQTT, security, scalability                                                  |
| UC-001–012    | Setiap modul terwakili                                                               |
| BL-01 s/d 05  | Dihindari / ditangani (misal BL-03: forecasting linear, BL-05: validasi MQTT format) |

---

- 📦 Ringkasan Output LLD

✅ Struktur tabel dan field lengkap (ERD & data dictionary)
✅ API endpoint & payload lengkap untuk tiap fungsi utama
✅ Algoritma forecast sudah ditentukan
✅ Format dan arsitektur integrasi sensor via MQTT
✅ Role access dan audit trail siap diimplementasikan

---

## 🎯 **4. Implementation (Coding)**

Tahap ini menerjemahkan semua desain dari HLD dan LLD menjadi **kode sumber nyata**, melalui struktur kerja yang **terorganisasi dan dapat ditinjau**. Tahap ini juga menjadi dasar untuk penentuan **milestone sprint**, pengelolaan repositori, dan distribusi tugas tim dev.

---

### 1️⃣ **Setup Repositori (Git)**

- 📁 Struktur Direktori (Monorepo – Plugin `mx-core-metric`)

Karena `mx-core-metric` adalah **submodul** dari monorepo `mx-core`, maka struktur awalnya mengikuti standar plugin:

```
mx-core/
│
├── apps/
│   ├── dashboard/         ← Aplikasi utama (Next.js Web UI)
│   └── api/               ← Next.js API routes (jika monolith)
│
├── packages/
│   ├── mx-core-metric/    ← Plugin KPI & metric (kode kita)
│   └── mx-core-auth/      ← Plugin lain (misal: auth, user)
│
├── libs/                  ← Library bersama (utils, UI kit, dsb)
│
└── .github/               ← CI/CD, workflows
```

- 🔧 Naming Repositori Internal

* Package Name: `@mx-core/metric`
* Folder Path: `packages/mx-core-metric`
* Namespace: `metric`, dengan ekspor modular (e.g. `metric.api`, `metric.forecast`, `metric.utils`)

- 🛠️ Inisialisasi Repositori

* Git branch default: `main`
* Branch protection: ✔ PR required, ✔ review 1x
* Template commit: [Conventional Commits](https://www.conventionalcommits.org/)

  - `feat(metric): add forecast calculation`
  - `fix(metric): validate MQTT payload before insert`

* Setup tool: `turbo` (untuk monorepo builder)

---

### 2️⃣ **Coding by Module/Sprint**

- 📆 Sprint Breakdown (Rekomendasi: 2 minggu/sprint)

| Sprint | Fokus Modul                        | FR/UC Terkait                |
| ------ | ---------------------------------- | ---------------------------- |
| S1     | KPI Master, Target Tahunan         | FR-01, FR-02, UC-001, UC-002 |
| S2     | Breakdown Target Periodik          | FR-03, UC-003                |
| S3     | Input KPI Manual                   | FR-04, UC-004                |
| S4     | MQTT Ingestion + Input Sensor      | FR-10, UC-010                |
| S5     | Forecast Engine                    | FR-07, UC-007                |
| S6     | Gangguan Operasional + Link ke KPI | FR-05, FR-06, UC-005, UC-006 |
| S7     | Dashboard Viewer & Summary         | FR-08, UC-008                |
| S8     | Export & Reporting                 | FR-12, UC-012                |
| S9     | Role, Auth, Logging                | FR-09, FR-11, UC-009, UC-011 |

- 📦 Struktur Modular Package (Coding Level)

Dalam `packages/mx-core-metric`:

```
mx-core-metric/
│
├── src/
│   ├── api/                     ← API handler per endpoint
│   ├── services/                ← Logic per modul (forecast, record, etc)
│   ├── models/                  ← Tipe data (TypeScript) dan skema DB
│   ├── utils/                   ← Helper functions
│   └── config/                  ← Config MQTT, forecast, dsb
│
├── tests/                      ← Unit & integration tests
├── README.md
├── tsconfig.json
└── package.json
```

- 📌 Contoh Modul Sprint: `Forecast Engine`

* Lokasi: `src/services/forecast/linear.ts`
* Tipe: `manual`, `linear`, dan disiapkan untuk `ml_model`
* Dipanggil dari: `src/api/forecast.ts`

```ts
export function forecastLinear(
  actuals: number[],
  currentIndex: number
): number {
  const sum = actuals.reduce((a, b) => a + b, 0);
  const avg = sum / currentIndex;
  return avg * 12;
}
```

---

### ✅ 3️⃣ Kode Mengacu pada LLD

- 🧩 1. **Acuan Data Model & Tipe Data**

✅ Kode sumber **menggunakan model TypeScript** yang merepresentasikan entitas dari ERD:

```ts
// src/models/KpiRecord.ts
export interface KpiRecord {
  id: string;
  kpi_id: string;
  unit_id: string;
  department_id: string;
  periode: string; // ISO 8601
  value: number;
  source: 'manual' | 'sensor' | 'imported';
  note?: string;
  created_by: string;
  created_at: string;
}
```

🟢 Sesuai dengan **LLD → Data Dictionary → Table `kpi_record`**

---

- 🔧 2. **Validasi Input Sesuai Spesifikasi LLD**

> Setiap endpoint (manual maupun MQTT) wajib **validasi schema** sebelum insert/update.

✅ Contoh: Validasi payload `POST /api/kpi-record`:

```ts
import { z } from 'zod';

const kpiRecordSchema = z.object({
  kpi_id: z.string().min(1),
  unit_id: z.string().min(1),
  department_id: z.string().min(1),
  periode: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  value: z.number(),
  source: z.enum(['manual', 'sensor', 'imported']),
  note: z.string().optional(),
  created_by: z.string().min(1),
});

export type KpiRecordInput = z.infer<typeof kpiRecordSchema>;
```

🟢 Ini sesuai dengan **LLD → API Schema & Validasi Payload MQTT**

---

- 📊 3. **Penerapan Algoritma Forecast Sesuai LLD**

✅ Implementasi kalkulasi linear projection:

```ts
// src/services/forecast/linear.ts
export function forecastLinear(values: number[], currentIndex: number): number {
  const sum = values.reduce((a, b) => a + b, 0);
  const avg = sum / currentIndex;
  return avg * 12;
}
```

- Sudah sesuai dengan **algoritma yang didefinisikan di LLD**
- Forecast siap dipanggil via scheduler atau cron

---

- 🌐 4. **Endpoint Sesuai Spesifikasi API LLD**

| Endpoint                     | Tipe             | Sesuai LLD |
| ---------------------------- | ---------------- | ---------- |
| `POST /api/kpi-record`       | Manual Entry KPI | ✅         |
| `POST /api/mqtt-ingest`      | MQTT data push   | ✅         |
| `GET /api/dashboard/summary` | Ringkasan KPI    | ✅         |

> Semua endpoint memanfaatkan input schema, response handler, dan ORM layer yang mengacu ke model LLD

---

- 🔐 5. **Role & Auth Flow Sesuai LLD**

* ✅ Role di-_inject_ dari token JWT
* ✅ Role digunakan untuk _gate_ API (e.g. hanya `admin` bisa input KPI tahunan)

```ts
// Middleware (pseudo)
if (user.role !== 'admin') {
  return res.status(403).json({ error: 'Forbidden' });
}
```

🟢 Sesuai dengan **LLD → Role Access** dan NFR-03

---

### 🗂️ 6. **Modularisasi File Sesuai Struktur HLD & LLD**

- Modul `services/`, `api/`, `models/`, `utils/`, dan `config/` digunakan sesuai fungsinya
- Struktur kode **mengikuti struktur modular HLD**
- Memudahkan pengujian dan refactor per modul

---

- 🔄 7. **Traceability dari FR/UC ke Kode**

| FR / UC        | Modul & File yang Diimplementasi                 |
| -------------- | ------------------------------------------------ |
| FR-01 / UC-001 | `services/kpi.ts`, `models/Kpi.ts`               |
| FR-04 / UC-004 | `api/kpi-record.ts`, `services/record.ts`        |
| FR-10 / UC-010 | `api/mqtt-ingest.ts`, `services/mqtt.ts`         |
| FR-07 / UC-007 | `services/forecast/linear.ts`, `api/forecast.ts` |
| FR-09 / UC-009 | Middleware Auth, Role Guard                      |

> Semua fitur utama **terhubung langsung ke SRS dan LLD**

---

### ✅ 4️⃣ Versioning dan Dokumentasi

- 🧭 Versioning Strategy (Git + Semver)

| Aspek         | Strategi Implementasi                                  |
| ------------- | ------------------------------------------------------ |
| **VCS**       | Git (GitHub / GitLab)                                  |
| **Branching** | `main`, `dev`, `feature/*`, `bugfix/*`                 |
| **Tagging**   | Semantic Versioning (SemVer) → `v1.0.0`, `v1.1.0`, dll |
| **Release**   | Dirilis berdasarkan tag & CI pipeline                  |

- 🚀 Semantic Versioning (SemVer)

| Versi   | Kapan digunakan                         |
| ------- | --------------------------------------- |
| `MAJOR` | Perubahan besar / breaking changes      |
| `MINOR` | Penambahan fitur tanpa merusak existing |
| `PATCH` | Perbaikan bug atau perbaikan kecil      |

---

- 📚 Dokumentasi Kode

✅ Disusun per modul dalam folder `docs/` atau dalam file `README.md` tiap direktori:

| Lokasi File           | Isi                                                |
| --------------------- | -------------------------------------------------- |
| `docs/forecast.md`    | Penjelasan algoritma, input/output, metode linear  |
| `docs/mqtt-ingest.md` | Format payload, validasi, error handling           |
| `README.md` root      | Deskripsi plugin `mx-core-metric`, struktur folder |

📌 Format dokumentasi: **Markdown**, ditulis ringkas dan fokus pada integrasi + pemakaian

---

### ✅ 5️⃣ Code Review & Integration Checklist

- 🧩 Pull Request Workflow

| Langkah                | Checklist                                                 |
| ---------------------- | --------------------------------------------------------- |
| ⬆️ PR dibuat           | Dari `feature/*` ke `dev`                                 |
| 👀 Reviewer ditugaskan | 1–2 orang (minimal 1 reviewer)                            |
| ✅ Checklist PR        | - Deskripsi jelas<br>- Link ke FR/UC<br>- Lolos unit test |
| 🔒 Proteksi branch     | Tidak bisa merge langsung ke `main` tanpa review          |

- ✅ Integration Checklist

| Area                                                        | Checklist                         |
| ----------------------------------------------------------- | --------------------------------- |
| ⬜ Modul terhubung antar API                                | Endpoint saling panggil berhasil  |
| ⬜ Validasi input JSON dan response API                     | Sesuai schema (Zod / Yup)         |
| ⬜ Forecast dapat dijalankan otomatis (manual trigger/cron) |                                   |
| ⬜ MQTT listener bisa terima payload valid                  | Payload masuk DB dengan status OK |
| ⬜ Role-based access jalan                                  | Tes akses admin vs viewer         |
| ⬜ Audit trail tercatat                                     | Created_by, updated_at, dsb       |

📌 Checklist ini dijalankan oleh **tim dev** sebelum lanjut ke testing/UAT

---

### ✅ 6️⃣ Output: Source Code Versi Alpha

- 🚧 Kriteria Versi Alpha

| Kriteria                                | Status |
| --------------------------------------- | ------ |
| Seluruh FR prioritas “Must” sudah ada   | ✅     |
| Endpoint API utama sudah tersedia       | ✅     |
| DB schema stabil dan siap migrasi       | ✅     |
| MQTT listener menerima data             | ✅     |
| Forecast dapat dijalankan (manual/auto) | ✅     |
| Role dan auth berjalan sesuai peran     | ✅     |
| Dokumentasi awal tersedia               | ✅     |

> 📌 Versi Alpha ini bisa diberi tag: `v0.1.0-alpha`

---

### 🧠 Keterkaitan dengan SRS, HLD, dan LLD

| Dokumen          | Status Integrasi dalam Implementasi                              |
| ---------------- | ---------------------------------------------------------------- |
| **SRS (FR, UC)** | ✅ Semua FR/UC diterjemahkan jadi modul/kode                     |
| **HLD**          | ✅ Semua komponen modular diimplementasikan                      |
| **LLD**          | ✅ Semua struktur data, API, dan algoritma dipakai sesuai desain |

---

## 📘 **5 Testing **

---

🎯 Tujuan:

> **Memastikan sistem `mx-core-metric` berjalan sesuai SRS dan Use-Case**
> Validasi dilakukan secara bertahap, dari unit terkecil (fungsi) hingga keseluruhan sistem (UAT).

### ✅ 1. **Unit Test**

> Menguji fungsi/method individual untuk memastikan logika berjalan sesuai ekspektasi.

- Contoh Unit yang Diuji:

| Fungsi / Modul                  | Pengujian                          |
| ------------------------------- | ---------------------------------- |
| `forecastLinear()`              | Output sesuai dengan data historis |
| `validateKpiRecordInput()`      | Validasi semua field payload       |
| `calculateAchievementPercent()` | Hitung % capaian KPI dari target   |
| `parseMqttPayload()`            | Format, nilai, tipe data           |

- Tools:

* `Jest` (untuk TypeScript)
* Coverage target: ≥ 80% modul `services/` dan `utils/`

---

### ✅ 2. **Integration Test**

> Menguji interaksi antar modul: API ↔ DB, API ↔ Service, MQTT ↔ Handler.

- Contoh Skenario:

| Modul Terkait                 | Pengujian                                        |
| ----------------------------- | ------------------------------------------------ |
| API `POST /api/kpi-record`    | Data tersimpan ke DB dan response benar          |
| MQTT Listener → DB            | Payload valid masuk, invalid di-reject           |
| Forecast Engine → Write ke DB | Hasil forecast tersimpan dan muncul di dashboard |
| Role-Based Access Middleware  | Akses dibatasi sesuai peran (admin/operator)     |

- Tools:

* `Supertest` untuk REST API
* `ts-mockito` / `msw` untuk mocking service

---

### ✅ 3. **System Test**

> Simulasi alur end-to-end berdasarkan **Use-Case**

- Contoh Alur UC yang Diuji:

| Use-Case ID | Nama Use-Case        | Alur E2E yang Diuji                                      |
| ----------- | -------------------- | -------------------------------------------------------- |
| UC-004      | Input Capaian KPI    | Form input → Validasi → DB insert → Dashboard muncul     |
| UC-007      | Forecast Otomatis    | Data historis → Run forecast → Nilai muncul di dashboard |
| UC-006      | Link Gangguan ke KPI | Input disturbance → Hubungkan ke KPI → Lihat deviasi     |
| UC-010      | MQTT Data Sensor     | Publish MQTT → Listener proses → DB record tercatat      |

- Coverage:

* Minimal 1 test untuk setiap UC prioritas `Must` dan `Should`
* Fokus pada alur utama dan validasi kondisi sukses

---

### ✅ 4. **User Acceptance Test (UAT)**

> Validasi oleh **end-user** bahwa sistem sesuai ekspektasi fungsional.

- Pelaksanaan:

* Peserta: Perwakilan **dept. Maintenance, Produksi, K3**
* Format: Workshop + form checklist
* Fokus:

  - Kemudahan input & navigasi
  - Visualisasi data KPI, forecast, gangguan
  - Sesuai terminologi dan struktur organisasi user

- Form Checklist UAT:

| Item yang Diuji                    | Sukses | Catatan           |
| ---------------------------------- | ------ | ----------------- |
| Input KPI manual                   | ✅     |                   |
| Forecast update otomatis           | ✅     | Forecast > real?  |
| Capaian KPI per unit muncul benar  | ✅     |                   |
| Link gangguan → KPI terlihat jelas | ⚠️     | Butuh tooltip     |
| Export PDF                         | ✅     | Format sudah rapi |

---

### 🧠 Korelasi dengan SRS & UC

| Jenis Tes   | FR/UC yang Terkait               |
| ----------- | -------------------------------- |
| Unit Test   | FR-04, FR-07, FR-10              |
| Integration | FR-01 s/d FR-12                  |
| System Test | UC-001 s/d UC-012                |
| UAT         | Semua FR prioritas Must & Should |

---

### 📝 5️⃣ **Test Plan**

> Rencana pengujian secara menyeluruh terhadap sistem `mx-core-metric`.

- 📌 Struktur Test Plan

| Elemen                   | Isi                                                             |
| ------------------------ | --------------------------------------------------------------- |
| **Nama Proyek**          | `mx-core-metric`                                                |
| **Tujuan Pengujian**     | Memastikan sistem berjalan sesuai SRS & UC                      |
| **Lingkup Pengujian**    | Semua modul: KPI, Target, Input, Forecast, MQTT, Dashboard, dsb |
| **Jenis Testing**        | Unit, Integration, System, UAT                                  |
| **Lingkungan Pengujian** | Env: `staging-mx-core`, DB clone production, MQTT test broker   |
| **Tools yang Digunakan** | Jest, Supertest, Postman, MQTTBox, Google Sheet (UAT checklist) |
| **Tim Pengujian**        | QA Engineer, Developer, Perwakilan User                         |
| **Kriteria Sukses**      | Semua test case prioritas MUST dan SHOULD lolos                 |
| **Exit Criteria**        | Tidak ada bug kritikal/blocker aktif                            |

---

### ✅ 6️⃣ **Test Case**

> Daftar skenario pengujian berdasarkan **Use-Case & FR**

- 📋 Contoh Format Test Case (Tabel)

| ID     | Modul            | Deskripsi Pengujian                        | Input                    | Expected Result                        | Status |
| ------ | ---------------- | ------------------------------------------ | ------------------------ | -------------------------------------- | ------ |
| TC-001 | KPI Record       | Input KPI manual valid                     | Payload JSON             | Data tersimpan, response 200           | ✅     |
| TC-002 | KPI Record       | Input KPI dengan value kosong              | Payload `{ value: "" }`  | Response 400, pesan error muncul       | ✅     |
| TC-003 | Forecast Engine  | Hitung forecast dari 6 bulan data historis | `values[]`               | Output total forecast ≥ rata-rata × 12 | ✅     |
| TC-004 | MQTT Ingest      | Payload valid dikirim dari sensor          | JSON via MQTT            | Data masuk DB, status “sensor”         | ✅     |
| TC-005 | Auth Middleware  | User tanpa role coba akses POST KPI        | No JWT / role: viewer    | Response 403                           | ✅     |
| TC-006 | Dashboard API    | Ambil ringkasan KPI                        | `GET /dashboard/summary` | Output JSON dengan target, actual, %   | ✅     |
| TC-007 | Disturbance Link | Gangguan dikaitkan ke KPI                  | UI link → save           | Link berhasil & muncul di dashboard    | ✅     |

- 📌 Kriteria:

* Mapped ke **UC dan FR**
* Harus cover:

  - Positive test
  - Negative test (validasi gagal)
  - Boundary (nilai ekstrem, null, 0, max float)

* Status: ✅ = Lolos, ❌ = Gagal, ⚠ = Butuh review

---

### 🐞 7️⃣ **Bug Log & Traceability Matrix**

- 🐞 Bug Log

| Bug ID  | Modul       | Deskripsi                           | Severity | Status | Ditemukan oleh |
| ------- | ----------- | ----------------------------------- | -------- | ------ | -------------- |
| BUG-001 | Forecast    | Forecast salah total jika data < 3  | Medium   | Open   | QA             |
| BUG-002 | MQTT Ingest | Payload gagal karena `periode` null | High     | Fixed  | Dev            |
| BUG-003 | Export PDF  | Format kolom terpotong di mobile    | Low      | Open   | User           |

- Tool: GitHub Issues / Linear / Notion
- Severity:

  - **Blocker**: Tidak bisa lanjut proses
  - **High**: Gangguan fitur utama
  - **Medium/Low**: Tidak berdampak signifikan

---

- 🔁 Traceability Matrix (SRS → Test Case)

| FR/UC          | Test Case ID | Status | Keterangan           |
| -------------- | ------------ | ------ | -------------------- |
| FR-01 / UC-001 | TC-001       | ✅     | Input KPI master     |
| FR-04 / UC-004 | TC-001–002   | ✅     | Input capaian manual |
| FR-10 / UC-010 | TC-004       | ✅     | MQTT → Record        |
| FR-07 / UC-007 | TC-003       | ✅     | Forecast linear      |
| FR-09 / UC-009 | TC-005       | ✅     | Role-based access    |
| FR-08 / UC-008 | TC-006       | ✅     | Dashboard ringkasan  |
| FR-06 / UC-006 | TC-007       | ✅     | Link gangguan ke KPI |

> 📌 **Semua FR dan UC utama tercover dalam test case**

---

### 🧩 8️⃣ **Release Candidate (RC) Definition**

- 📦 **Apa itu Release Candidate?**

> Versi kode yang dianggap **feature-complete dan telah lolos semua pengujian kritikal**, siap untuk:

- Di-_freeze_ (tidak ditambah fitur lagi)
- Diuji regresi secara menyeluruh
- Dideploy ke staging atau production (setelah approval)

---

- ✅ **Kriteria RC untuk mx-core-metric**

| Kriteria                                           | Status |
| -------------------------------------------------- | ------ |
| ✅ Semua **FR prioritas Must & Should** selesai    | ✅     |
| ✅ Semua **UC utama** diuji lewat system test      | ✅     |
| ✅ Seluruh test case “Pass” atau minor issue saja  | ✅     |
| ✅ Tidak ada **bug blocker / severity high aktif** | ✅     |
| ✅ MQTT ingestion stabil di staging                | ✅     |
| ✅ Forecast engine menghasilkan output valid       | ✅     |
| ✅ Role-based access diverifikasi                  | ✅     |
| ✅ Dokumentasi pengguna minimal sudah tersedia     | ✅     |

> 📌 **RC Tag:** `v1.0.0-rc.1`

---

- 🧪 **Regresi & Final Check**

> Dilakukan untuk memastikan **fitur-fitur eksisting tidak rusak** akibat perubahan/penambahan terbaru.

| Area yang Dites Ulang    | Status |
| ------------------------ | ------ |
| Dashboard summary        | ✅     |
| Input KPI manual         | ✅     |
| Forecast update otomatis | ✅     |
| MQTT payload → DB        | ✅     |
| Export PDF & CSV         | ✅     |

---

### 📤 **Output Tahap Testing**

| Item                         | Status / File                         |
| ---------------------------- | ------------------------------------- |
| ✅ Test Plan                 | `docs/test-plan.md`                   |
| ✅ Test Case                 | `docs/test-cases.xlsx` / Notion Table |
| ✅ Bug Log                   | `issues` / Notion / Linear            |
| ✅ Traceability Matrix       | `docs/traceability.md`                |
| ✅ Release Candidate Build   | `v1.0.0-rc.1` (tag di GitHub/CI/CD)   |
| ✅ UAT Form Checklist (user) | Google Sheet / Notion / PDF signed    |

---

### 🧠 Keterkaitan dengan Tahap Sebelumnya

| Dokumen Referensi | Status Sinkron            |
| ----------------- | ------------------------- |
| SRS               | ✅ Covered                |
| HLD & LLD         | ✅ Diimplementasi & Diuji |
| Implementation    | ✅ Semua fitur diuji      |

---

## 📘 **6 Deployment – mx-core-metric**

> Menyusun strategi dan checklist implementasi untuk **meluncurkan sistem `mx-core-metric` ke production** secara aman, terdokumentasi, dan dapat di-_rollback_ jika diperlukan.

Deployment dilakukan dari hasil **release candidate** (`v1.0.0-rc.1`) yang telah lolos semua pengujian sebelumnya.

🔹 **Checklist Deployment**

---

### ✅ 1. **Build & CI/CD Pipeline**

| Elemen                   | Rincian                                                  |
| ------------------------ | -------------------------------------------------------- |
| **Build Tool**           | `turbo` (monorepo builder), `next build`, `tsc`          |
| **CI/CD**                | GitHub Actions / GitLab CI                               |
| **Lint & Test Otomatis** | Setiap push & PR menjalankan `lint`, `typecheck`, `test` |
| **Build Artifact**       | `/dist`, `/out`, dan image Docker untuk deploy           |
| **Docker Image**         | `mx-core-metric:1.0.0-rc.1`                              |
| **Release Trigger**      | Manual deploy dari CI (dengan tag `v1.0.0`)              |

---

### ✅ 2. **Environment Setup**

| Lingkungan  | URL/Host              | Tujuan                    | Catatan                         |
| ----------- | --------------------- | ------------------------- | ------------------------------- |
| **Dev**     | `localhost`, `dev-mx` | Pengujian internal dev    | Tidak stabil, semua fitur aktif |
| **Staging** | `stg.mxcore.local`    | UAT & simulasi production | Mirror data production          |
| **Prod**    | `mxcore.domain.com`   | Live untuk end-user       | Stable, read-only di non-admin  |

#### Variabel Lingkungan (`.env`)

| Kunci             | Contoh Nilai                     | Deskripsi            |
| ----------------- | -------------------------------- | -------------------- |
| `DATABASE_URL`    | `postgres://...`                 | DB utama             |
| `MQTT_BROKER_URL` | `mqtt://broker.stg.local`        | Broker sensor        |
| `FORECAST_METHOD` | `linear`                         | Default forecasting  |
| `AUTH_SECRET`     | `xxxxx`                          | JWT Signing Key      |
| `ENVIRONMENT`     | `development`, `staging`, `prod` | Untuk logging & mode |

---

### ✅ 3. **Backup & Rollback Plan**

| Elemen             | Rencana                                                        |
| ------------------ | -------------------------------------------------------------- |
| **Database**       | Backup full dump via cron (`pg_dump`) sebelum deploy           |
| **App Version**    | Image Docker `v1.0.0-rc.1` disimpan                            |
| **Rollback Plan**  | Gunakan image versi sebelumnya (`v0.9.3`) jika gagal deploy    |
| **Log Monitoring** | Pantau log error 24 jam pertama via Grafana, Loki, atau Sentry |
| **Alerting**       | Integrasi ke Telegram/email jika error ≥ threshold tertentu    |

---

### ✅ 4. **Dokumen Release Notes**

| Versi       | `v1.0.0` (Initial Production) |
| ----------- | ----------------------------- |
| Rilis Fitur | - Input KPI manual dan sensor |

```
           - Target tahunan dan periodik
           - Forecast capaian
           - Dashboard
           - Gangguan operasional & linking
           - Export PDF/CSV
           - Role & akses berbasis peran
```

| Perbaikan | - Validasi input ketat

- Format payload MQTT
- Error handling endpoint
  | Known Issue | - Belum ada notifikasi otomatis
- Belum support forecasting berbasis ML

📄 File: `RELEASE_NOTES_v1.0.0.md`

---

### ✅ 5. **Deployment Log**

Disimpan otomatis oleh CI/CD dan/atau dicatat manual oleh DevOps:

| Tanggal    | Versi       | Lingkungan | Status    | Catatan                           |
| ---------- | ----------- | ---------- | --------- | --------------------------------- |
| 2025-12-17 | v1.0.0-rc.1 | Staging    | ✅ Sukses | UAT selesai, siap ke prod         |
| 2025-12-18 | v1.0.0      | Production | ✅ Sukses | Deployed dengan Docker            |
| 2025-12-19 | v1.0.0      | Production | ⚠ Minor   | CPU spike – forecast cron ditunda |

📄 File: `deployment-log.yaml`

---

- ✅ Output

| Elemen                               | Status |
| ------------------------------------ | ------ |
| ✅ Aplikasi live di Production       | ✅     |
| ✅ Versi dikunci (`v1.0.0`)          | ✅     |
| ✅ Log & release note terdokumentasi | ✅     |
| ✅ Backup & rollback plan aktif      | ✅     |

---

- 🧠 Keterkaitan dengan SDLC Sebelumnya

| Tahap          | Status Sinkron                  |
| -------------- | ------------------------------- |
| SRS            | ✅ Terimplementasi              |
| HLD & LLD      | ✅ Terwujud di infra & pipeline |
| Implementation | ✅ Code release version stabil  |
| Testing        | ✅ Release Candidate lulus UAT  |

---

## 📘 **7 Maintenance & Support – mx-core-metric**

---

🎯 **Tujuan**

Menjamin bahwa sistem `mx-core-metric`:

- Berjalan secara **berkelanjutan (sustain)**
- **Adaptif terhadap kebutuhan pengguna**
- Mendapatkan **perbaikan cepat** jika terjadi kendala
- Dapat **ditingkatkan (scalable)** tanpa mengganggu sistem yang sudah live

---

### ✅ 1. **Monitoring Performance**

🎯 Tujuan:

- Deteksi dini terhadap penurunan performa sistem
- Pemantauan uptime, latency, error rate

🔧 Tools & Praktik:

| Aspek                   | Implementasi                                  |
| ----------------------- | --------------------------------------------- |
| **Error Logging**       | Sentry / LogRocket / Loki                     |
| **Performance Metrics** | Grafana + Prometheus                          |
| **Service Health**      | Endpoint `/healthz` + alert ke Telegram/email |
| **Uptime Monitor**      | StatusCake / Uptime Kuma / Pingdom            |
| **Resource Monitor**    | Node exporter, PostgreSQL exporter            |

---

### ✅ 2. **Patch & Bug Fix**

🛠️ Prosedur:

1. Bug dilaporkan via user / QA
2. Tercatat di **Bug Tracker** (GitHub Issues / Notion)
3. Diperbaiki dan di-_merge_ ke branch `hotfix/`
4. Rilis dengan tag `vX.Y.Z-patch`
5. Update changelog & log deploy

SLA Target:

| Severity    | Target Respon | Target Perbaikan |
| ----------- | ------------- | ---------------- |
| **Blocker** | < 1 jam       | < 4 jam          |
| **High**    | < 4 jam       | < 1 hari         |
| **Medium**  | < 1 hari      | < 2 hari         |
| **Low**     | < 2 hari      | Dalam 3 hari     |

---

### ✅ 3. **User Feedback Loop**

📥 Sumber Feedback:

- User lapangan (operator, supervisor)
- Admin KPI
- Manajemen (dashboard visibility, export)

🔄 Siklus Feedback:

1. Kumpulkan → melalui form, survey, atau WA group user
2. Triage → Tentukan apakah bug, usulan fitur, atau edukasi
3. Simpan → Dalam backlog Notion atau board Linear
4. Prioritaskan → Gunakan MoSCoW atau RICE score

📌 Contoh Feedback Nyata:

| Feedback                                        | Aksi                               |
| ----------------------------------------------- | ---------------------------------- |
| “Filter per unit di dashboard kurang fleksibel” | Tambahkan dropdown + autocomplete  |
| “Forecast tidak akurat di Q4”                   | Review metode & tambahkan model ML |
| “Perlu export Excel”                            | Sudah diimplementasi v1.1.0        |

---

### ✅ 4. **Model Retraining (Jika Menggunakan AI)**

> Untuk sistem forecast KPI berbasis tren, bisa berkembang ke **ML-based forecasting**

🧠 Pipeline Sederhana:

1. Ambil data historis dari `kpi_record`
2. Jalankan training setiap bulan (job cron)
3. Simpan model terbaru
4. Bandingkan hasil forecast ML vs Linear
5. Gunakan yang terbaik

📌 Ini dapat menjadi fitur fase 2 (UC-013 / BL-03)

---

### ✅ 5. **Feature Improvement Roadmap**

> Dirancang dari hasil UAT, feedback user, dan evaluasi sistem.

📅 Rencana Peningkatan (Sample Roadmap)

| Kuartal | Fitur / Perbaikan                         | Status    |
| ------- | ----------------------------------------- | --------- |
| Q1      | Forecast ML (regression / LSTM)           | On Plan   |
| Q1      | Notifikasi telegram untuk KPI kritis      | Planned   |
| Q2      | Integrasi sensor produksi tambahan (MQTT) | Backlog   |
| Q2      | Multi-language support                    | Backlog   |
| Q3      | UI/UX refresh & dark mode                 | Open Idea |

---

### ✅ Output: SLA & KPI Pemeliharaan

- 📊 SLA (Service Level Agreement)

| Kategori          | Target                         |
| ----------------- | ------------------------------ |
| **Availability**  | ≥ 99.5% uptime (bulanan)       |
| **Response Time** | ≤ 2 detik rata-rata halaman    |
| **Bug Response**  | Sesuai tabel SLA patch di atas |

- 📈 KPI Maintenance Tim Dev

| Indikator                        | Target Bulanan          |
| -------------------------------- | ----------------------- |
| Bug resolved time (avg)          | < 24 jam                |
| Uptime system                    | > 99.5%                 |
| User feedback resolved           | ≥ 90% feedback ditindak |
| Fitur baru dirilis (minor/patch) | ≥ 2 rilis per bulan     |

---

- 🧠 Integrasi dengan Tahap SDLC Sebelumnya

| Elemen     | Status Sinkron                            |
| ---------- | ----------------------------------------- |
| SRS        | Ditetapkan sebagai acuan evaluasi         |
| HLD/LLD    | Jadi referensi saat bug fixing            |
| Testing    | Hasil UAT jadi masukan roadmap            |
| Deployment | Infrastruktur monitoring & rollback aktif |

---

- ✅ Kesimpulan Tahap Maintenance

| Komponen                               | Status |
| -------------------------------------- | ------ |
| Monitoring dan alerting aktif          | ✅     |
| SLA & KPI terdefinisi                  | ✅     |
| Feedback loop terjadwal                | ✅     |
| Perencanaan pengembangan berkelanjutan | ✅     |
| Model retraining roadmap tersedia      | ✅     |
