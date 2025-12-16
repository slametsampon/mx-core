---
title: Blueprint Pengembangan Software Industri - SDLC + Studi Kasus Mx-Core-metric
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

**Blueprint Pengembangan Software Industri: SDLC + Studi Kasus Mx-Core-metric**

---

- [**I. Pendahuluan**](#i-pendahuluan)
  - [Apa itu SDLC?](#apa-itu-sdlc)
  - [Mengapa SDLC Penting untuk Proyek Berskala Industri?](#mengapa-sdlc-penting-untuk-proyek-berskala-industri)
  - [Peran SDLC dalam Sistem Cerdas seperti `mx-core-metric`](#peran-sdlc-dalam-sistem-cerdas-seperti-mx-core-metric)
- [**II. Ringkasan SDLC dan Alur Tahapan**](#ii-ringkasan-sdlc-dan-alur-tahapan)
  - [Diagram Alur Waterfall (dengan Iteratif Opsional)](#diagram-alur-waterfall-dengan-iteratif-opsional)
  - [Hubungan Hirarkis Antar Dokumen](#hubungan-hirarkis-antar-dokumen)
  - [Traceability antar Artefak](#traceability-antar-artefak)
- [**III. BRS – Business Requirement Specification**](#iii-brs--business-requirement-specification)
  - [Fungsi BRS](#fungsi-brs)
  - [Komponen Dokumen BRS](#komponen-dokumen-brs)
  - [Studi Kasus: Mx-Core-metric](#studi-kasus-mx-core-metric)
    - [Kebutuhan Bisnis](#kebutuhan-bisnis)
    - [Stakeholder dan Objektif](#stakeholder-dan-objektif)
  - [Contoh Format Tabel BRS](#contoh-format-tabel-brs)
- [**IV. SRS – Software Requirement Specification**](#iv-srs--software-requirement-specification)
  - [Perbedaan SRS dengan BRS](#perbedaan-srs-dengan-brs)
  - [Fungsi dan Isi SRS](#fungsi-dan-isi-srs)
    - [Isi Umum Dokumen SRS:](#isi-umum-dokumen-srs)
  - [Integrasi Use-Case](#integrasi-use-case)
    - [Format Use-Case (Narratif)](#format-use-case-narratif)
    - [(Opsional) Diagram Use-Case UML](#opsional-diagram-use-case-uml)
  - [Use-Case Studi Kasus: “Prediksi Kegagalan Pompa Kritikal”](#use-case-studi-kasus-prediksi-kegagalan-pompa-kritikal)
    - [Narasi Use-Case:](#narasi-use-case)
    - [Kebutuhan Turunan dari Use-Case:](#kebutuhan-turunan-dari-use-case)
  - [Traceability dari BRS ke SRS](#traceability-dari-brs-ke-srs)
- [**V. System Design**](#v-system-design)
  - [🔷 A. High-Level Design (HLD)](#-a-high-level-design-hld)
    - [Modul Utama dan Komunikasi Antar Plugin](#modul-utama-dan-komunikasi-antar-plugin)
    - [Diagram Arsitektur Mx-Core-metric](#diagram-arsitektur-mx-core-metric)
    - [Integrasi dengan Sistem Eksternal](#integrasi-dengan-sistem-eksternal)
  - [🔷 B. Low-Level Design (LLD)](#-b-low-level-design-lld)
    - [Struktur Data – ERD dan Tabel DB](#struktur-data--erd-dan-tabel-db)
    - [Algoritma AI – Deskripsi \& Parameter](#algoritma-ai--deskripsi--parameter)
    - [API Schema – Contoh Endpoint Prediksi RUL](#api-schema--contoh-endpoint-prediksi-rul)
    - [Versi Model dan Retraining Schedule](#versi-model-dan-retraining-schedule)
- [**VI. Implementation**](#vi-implementation)
  - [Struktur Kode Plugin Mx-Core-metric](#struktur-kode-plugin-mx-core-metric)
  - [Teknologi yang Digunakan](#teknologi-yang-digunakan)
  - [CI/CD Pipeline Ringkas](#cicd-pipeline-ringkas)
  - [Kode vs Dokumentasi (LLD Linkage)](#kode-vs-dokumentasi-lld-linkage)
- [**VII. Testing**](#vii-testing)
  - [Test Plan dan Test Case](#test-plan-dan-test-case)
    - [Test Plan](#test-plan)
    - [Test Case](#test-case)
  - [Keterkaitan dengan Use-Case](#keterkaitan-dengan-use-case)
  - [UAT untuk Sistem Prediksi](#uat-untuk-sistem-prediksi)
  - [Tools yang Digunakan](#tools-yang-digunakan)
- [**VIII. Deployment**](#viii-deployment)
  - [Deployment Pipeline](#deployment-pipeline)
    - [Contoh Alur CI/CD Pipeline:](#contoh-alur-cicd-pipeline)
    - [Sample: Konfigurasi GitHub Actions](#sample-konfigurasi-github-actions)
  - [Environment Setup (Dev, QA, Prod)](#environment-setup-dev-qa-prod)
    - [Konfigurasi Umum per Environment:](#konfigurasi-umum-per-environment)
  - [Rollback \& Release Notes](#rollback--release-notes)
    - [Rollback](#rollback)
    - [Release Notes](#release-notes)
  - [Integrasi ke Ekosistem Mx-Core](#integrasi-ke-ekosistem-mx-core)
    - [Bentuk Integrasi:](#bentuk-integrasi)
- [**IX. Maintenance**](#ix-maintenance)
  - [1. Post-deployment Monitoring](#1-post-deployment-monitoring)
    - [Komponen Monitoring:](#komponen-monitoring)
    - [Contoh Alert Otomatis:](#contoh-alert-otomatis)
  - [2. SLA dan Respon Insiden](#2-sla-dan-respon-insiden)
  - [3. Model Retraining dan Model Drift Handling](#3-model-retraining-dan-model-drift-handling)
    - [Jadwal dan Strategi Retraining:](#jadwal-dan-strategi-retraining)
    - [Handling Model Drift](#handling-model-drift)
  - [4. Change Request Management](#4-change-request-management)
    - [Siklus Change Request:](#siklus-change-request)
    - [Contoh CR:](#contoh-cr)
- [**X. Dokumentasi \& Deliverable**](#x-dokumentasi--deliverable)
  - [1. Tabel Daftar Dokumen Tiap Fase SDLC](#1-tabel-daftar-dokumen-tiap-fase-sdlc)
  - [2. Template / Contoh File Dokumentasi](#2-template--contoh-file-dokumentasi)
    - [📄 BRS Template (`.docx`)](#-brs-template-docx)
    - [📊 Test Case Format (`.xlsx`)](#-test-case-format-xlsx)
    - [🧾 API Schema (`.json`)](#-api-schema-json)
    - [📘 Release Notes Format (`.md`)](#-release-notes-format-md)
  - [3. Best Practices dalam Penyusunan \& Pengelolaan Dokumen](#3-best-practices-dalam-penyusunan--pengelolaan-dokumen)
    - [✅ Prinsip Utama](#-prinsip-utama)
    - [📦 Tools Pendukung](#-tools-pendukung)
- [**XI. Penutup**](#xi-penutup)
  - [🔁 Ringkasan: Pentingnya Keterpaduan BRS ➝ SRS ➝ Desain ➝ Implementasi](#-ringkasan-pentingnya-keterpaduan-brs--srs--desain--implementasi)
  - [🛠️ Rekomendasi: Gunakan SDLC sebagai Standar Proyek Digital Maintenance](#️-rekomendasi-gunakan-sdlc-sebagai-standar-proyek-digital-maintenance)
  - [✅ Checklist: Sukses Implementasi SDLC di Proyek Industrial / AI](#-checklist-sukses-implementasi-sdlc-di-proyek-industrial--ai)

---

## **I. Pendahuluan**

### Apa itu SDLC?

**SDLC** (Software Development Life Cycle) adalah sebuah kerangka kerja sistematis yang menggambarkan tahapan-tahapan yang harus dilalui dalam pengembangan perangkat lunak, mulai dari perencanaan awal hingga pemeliharaan setelah deployment. SDLC berfungsi sebagai panduan agar proses pengembangan software menjadi lebih terstruktur, terdokumentasi, dan dapat direplikasi dengan baik.

### Mengapa SDLC Penting untuk Proyek Berskala Industri?

Dalam konteks proyek berskala industri, pengembangan software memiliki kompleksitas tinggi karena harus melibatkan banyak stakeholder, kepatuhan terhadap standar industri, serta ekspektasi performa dan keandalan yang tinggi. Oleh karena itu, pendekatan SDLC menjadi sangat krusial karena:

- **Menjamin kualitas** melalui validasi di setiap fase.
- **Mengurangi risiko** dengan perencanaan dan dokumentasi yang matang.
- **Mempermudah kolaborasi lintas tim**, terutama ketika tim terdiri dari berbagai disiplin (developer, QA, AI engineer, devops, dan engineer lapangan).
- **Memastikan traceability** dari kebutuhan bisnis ke fitur teknis.

### Peran SDLC dalam Sistem Cerdas seperti `mx-core-metric`

`mx-core-metric` adalah sistem pemantauan KPI maintenance berbasis data real-time, yang digunakan untuk memprediksi dan menangani potensi gangguan mesin industri secara dini. Sistem ini termasuk dalam kategori **intelligent maintenance system**, karena menggabungkan pengumpulan data sensor, analitik berbasis AI/ML, serta integrasi ke dashboard pemantauan.

Dalam konteks ini, SDLC:

- Membantu memastikan bahwa **kebutuhan bisnis seperti menurunkan MTTR dan meningkatkan uptime** dapat diturunkan menjadi fitur teknis yang terukur.
- Menyediakan kerangka kerja untuk **mengintegrasikan berbagai komponen**, mulai dari perangkat IoT (ESP32, MQTT), sistem backend, hingga dashboard berbasis Next.js.
- Memastikan bahwa siklus pembaruan model AI dan feedback dari lapangan dapat ditangani melalui proses **iteratif dan terdokumentasi**.

---

## **II. Ringkasan SDLC dan Alur Tahapan**

### Diagram Alur Waterfall (dengan Iteratif Opsional)

SDLC secara umum dapat diimplementasikan dalam berbagai model proses — yang paling klasik adalah model **waterfall**. Namun, dalam praktik industri modern, pendekatan waterfall sering dikombinasikan dengan iterasi (semi-agile), terutama pada tahap desain dan implementasi.

Berikut adalah alur fase utama SDLC yang akan dibahas dalam studi kasus `mx-core-metric`:

```
[BRS] → [SRS + Use-Case] → [HLD → LLD] → [Implementation] → [Testing] → [Deployment] → [Maintenance]
```

**Keterangan Singkat Tiap Tahap:**

1. **BRS (Business Requirement Specification)**
   Menyusun kebutuhan bisnis dari sisi stakeholder (misal: mengurangi downtime mesin industri).

2. **SRS (Software Requirement Specification) + Use-Case**
   Menjabarkan kebutuhan bisnis menjadi kebutuhan teknis, termasuk skenario penggunaan (use-case).

3. **HLD (High-Level Design) → LLD (Low-Level Design)**
   Mendesain arsitektur sistem (HLD), lalu merinci struktur data, API, dan algoritma (LLD).

4. **Implementation**
   Tahap pengembangan perangkat lunak sesuai desain teknis, termasuk integrasi sistem IoT, backend, dan frontend.

5. **Testing**
   Pengujian unit, integrasi, hingga user acceptance untuk memastikan sistem bekerja sesuai kebutuhan awal.

6. **Deployment**
   Proses rilis ke lingkungan produksi, termasuk setup pipeline CI/CD dan environment.

7. **Maintenance**
   Perawatan sistem pasca-deploy, termasuk monitoring, retraining model AI, dan penanganan change request.

---

### Hubungan Hirarkis Antar Dokumen

Dokumen dalam SDLC memiliki **struktur hierarkis**, dari level kebutuhan bisnis ke level teknis, hingga artefak implementasi. Hirarki ini penting agar setiap keputusan teknis bisa ditelusuri balik ke kebutuhan bisnisnya.

Contoh hierarki dokumen:

- **BRS**
  ↳ menjadi acuan utama bagi seluruh proyek (apa yang dibutuhkan stakeholder)

- **SRS**
  ↳ turunan langsung dari BRS dalam bentuk kebutuhan software yang terukur
  ↳ berisi use-case, spesifikasi input/output, dan kebutuhan sistem lainnya

- **HLD/LLD**
  ↳ merupakan realisasi teknis dari SRS
  ↳ menjabarkan modul, komponen, arsitektur data, skema API, hingga algoritma

- **Test Plan & Test Case**
  ↳ disusun berdasarkan SRS dan use-case
  ↳ menguji apakah sistem memenuhi requirement

---

### Traceability antar Artefak

**Traceability** adalah kemampuan untuk melacak asal-usul dan keterkaitan antar artefak dalam SDLC. Hal ini sangat penting dalam proyek industri, terutama untuk:

- Audit & compliance
- Analisis dampak perubahan (change impact analysis)
- Validasi fungsionalitas sistem

Dalam `mx-core-metric`, traceability membantu memastikan bahwa:

- Setiap **metrik yang ditampilkan di dashboard** bisa ditelusuri kembali ke requirement di SRS.
- Setiap **model AI** yang digunakan bisa dihubungkan ke use-case spesifik di BRS.
- Setiap **test case** bisa memverifikasi satu atau lebih kebutuhan dari SRS.

Contoh traceability sederhana:

| Artefak Sumber                       | Artefak Turunan                                       | Keterangan                         |
| ------------------------------------ | ----------------------------------------------------- | ---------------------------------- |
| BRS-01: Sistem harus mengurangi MTTR | SRS-05: Sistem harus mendeteksi anomali dalam 5 menit | Diubah menjadi requirement teknis  |
| SRS-05                               | UC-02: Anomali Deteksi Real-Time                      | Dijabarkan dalam use-case          |
| UC-02                                | TC-10: Simulasi kerusakan dan respons sistem          | Dijadikan test case untuk validasi |

---

## **III. BRS – Business Requirement Specification**

### Fungsi BRS

**BRS (Business Requirement Specification)** adalah dokumen yang menggambarkan kebutuhan dan tujuan bisnis dari sistem yang akan dikembangkan. Fokus utama BRS bukan pada aspek teknis, melainkan pada **apa yang dibutuhkan oleh bisnis** agar solusi digital yang dibangun benar-benar memberikan nilai tambah.

Dalam konteks pengembangan sistem industri seperti `mx-core-metric`, BRS berperan penting untuk:

- Menyelaraskan ekspektasi stakeholder dengan ruang lingkup sistem.
- Menjadi dasar turunan untuk dokumen teknis seperti SRS dan desain sistem.
- Menghindari misinterpretasi di antara tim pengembang, QA, dan manajemen.

---

### Komponen Dokumen BRS

Sebuah dokumen BRS yang baik umumnya mencakup:

| Komponen             | Deskripsi                                                               |
| -------------------- | ----------------------------------------------------------------------- |
| **Latar Belakang**   | Penjelasan umum tentang permasalahan atau tantangan bisnis saat ini     |
| **Tujuan Sistem**    | Gambaran besar tentang apa yang ingin dicapai oleh sistem               |
| **Ruang Lingkup**    | Batasan sistem, termasuk yang tidak termasuk ke dalam sistem            |
| **Stakeholder**      | Pihak-pihak yang terkait langsung, seperti engineer, manajer, tim IT    |
| **Kebutuhan Bisnis** | Pernyataan kebutuhan dalam bahasa bisnis, belum teknis                  |
| **KPI atau Target**  | Indikator keberhasilan sistem, seperti pengurangan downtime >20%        |
| **Keterbatasan**     | Batasan sistem, seperti integrasi dengan sistem lama, atau SLA jaringan |

---

### Studi Kasus: Mx-Core-metric

#### Kebutuhan Bisnis

Sistem `mx-core-metric` dirancang sebagai solusi pemantauan dan prediksi performa maintenance di sektor industri. Kebutuhan bisnis utamanya mencakup:

- **Mengurangi downtime tidak terencana**, dengan mendeteksi anomali dan prediksi kegagalan lebih awal.
- **Meningkatkan efektivitas tim teknis**, melalui sistem notifikasi dan dashboard yang memberikan informasi kontekstual.
- **Mendukung pengambilan keputusan manajerial**, melalui visualisasi tren KPI (seperti MTTR, MTBF, utilization rate).
- **Integrasi dengan sistem yang sudah ada** seperti CMMS dan sensor berbasis MQTT.

#### Stakeholder dan Objektif

| Stakeholder              | Peran dalam Sistem                    | Tujuan/Objektif                                    |
| ------------------------ | ------------------------------------- | -------------------------------------------------- |
| **Manajer Operasional**  | Melihat laporan KPI dan tren per site | Meningkatkan uptime operasional                    |
| **Teknisi Lapangan**     | Menerima notifikasi peringatan dini   | Tindakan preventif sebelum terjadi kerusakan besar |
| **Data Engineer**        | Integrasi data sensor dan CMMS        | Menjaga kualitas dan kontinuitas data              |
| **Tim IT Infrastruktur** | Deploy dan maintenance aplikasi       | Menyediakan sistem yang scalable dan reliable      |

---

### Contoh Format Tabel BRS

| ID     | Kebutuhan Bisnis                                                                | Prioritas | Stakeholder Terkait          | Catatan                                      |
| ------ | ------------------------------------------------------------------------------- | --------- | ---------------------------- | -------------------------------------------- |
| BRS-01 | Sistem harus mampu mendeteksi potensi kerusakan mesin sebelum terjadi kegagalan | Tinggi    | Teknisi, Manajer Operasional | Berbasis data sensor real-time               |
| BRS-02 | Menyediakan dashboard tren KPI (MTTR, MTBF, dll)                                | Sedang    | Manajer Operasional          | Akses via browser desktop dan mobile         |
| BRS-03 | Sistem harus memberikan notifikasi via WA/email jika terjadi anomali            | Tinggi    | Teknisi                      | Dikirim < 1 menit setelah anomali terdeteksi |
| BRS-04 | Integrasi dengan sistem CMMS internal                                           | Sedang    | Tim IT, Data Engineer        | Melalui API REST/GraphQL                     |
| BRS-05 | Sistem dapat menangani 100+ perangkat aktif secara bersamaan                    | Tinggi    | Tim Infrastruktur            | Menggunakan WebSocket atau MQTT              |

---

## **IV. SRS – Software Requirement Specification**

### Perbedaan SRS dengan BRS

| Aspek              | BRS (Business Requirement Specification)     | SRS (Software Requirement Specification)                   |
| ------------------ | -------------------------------------------- | ---------------------------------------------------------- |
| Fokus              | Tujuan dan kebutuhan dari sisi bisnis        | Spesifikasi teknis dari fitur dan fungsi sistem            |
| Bahasa             | Non-teknis (bahasa bisnis)                   | Semi-teknis hingga teknis                                  |
| Siapa yang membuat | Business analyst, product owner, stakeholder | System analyst, software architect, developer              |
| Siapa yang membaca | Semua stakeholder                            | Tim teknis, QA, developer                                  |
| Tujuan             | Menjelaskan "apa yang dibutuhkan"            | Menjelaskan "bagaimana sistem memenuhi kebutuhan tersebut" |

---

### Fungsi dan Isi SRS

**SRS** adalah dokumen yang menjabarkan semua kebutuhan software secara **jelas, terukur, dan dapat diuji**. SRS berfungsi sebagai kontrak antara tim teknis dan bisnis, serta menjadi dasar untuk desain, implementasi, dan pengujian sistem.

#### Isi Umum Dokumen SRS:

| Bagian                          | Penjelasan                                                             |
| ------------------------------- | ---------------------------------------------------------------------- |
| **Tujuan Sistem**               | Merujuk pada kebutuhan bisnis dari BRS                                 |
| **Deskripsi Umum Sistem**       | Menjelaskan alur utama sistem secara ringkas                           |
| **Fungsi Sistem**               | Daftar fitur utama: notifikasi, grafik tren, manajemen user            |
| **Non-Functional Requirements** | Performa, skalabilitas, keamanan, uptime                               |
| **Use-Case dan Skenario**       | Menjelaskan interaksi user dengan sistem                               |
| **Batasan Sistem**              | Misal: tidak mendukung perangkat analog lawas, tergantung konektivitas |

---

### Integrasi Use-Case

Setiap **use-case** mendeskripsikan interaksi spesifik antara aktor (user/system) dan sistem, biasanya diturunkan langsung dari kebutuhan bisnis.

#### Format Use-Case (Narratif)

| Elemen             | Isi                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **Use-Case ID**    | UC-001                                                                                                  |
| **Nama Use-Case**  | Prediksi kegagalan pompa kritikal                                                                       |
| **Aktor**          | Sistem + Teknisi                                                                                        |
| **Deskripsi**      | Sistem memproses data sensor untuk mendeteksi potensi kegagalan, lalu memberi notifikasi kepada teknisi |
| **Pre-condition**  | Sensor dan koneksi MQTT aktif                                                                           |
| **Post-condition** | Teknisi menerima notifikasi dan dapat melihat detail prediksi                                           |
| **Alur Utama**     | 1. Data dikirim → 2. Anomali terdeteksi → 3. Prediksi dijalankan → 4. Notifikasi dikirim                |
| **Exception**      | Model gagal memuat, koneksi terputus                                                                    |

#### (Opsional) Diagram Use-Case UML

```plaintext
       +---------+        +----------------------------+
       | Teknisi | -----> | Prediksi Kegagalan Pompa   |
       +---------+        +----------------------------+
                               ^         ^
                               |         |
                          +----+     +---------------+
                          | Sensor    | Sistem AI    |
                          +-----------+---------------+
```

---

### Use-Case Studi Kasus: “Prediksi Kegagalan Pompa Kritikal”

#### Narasi Use-Case:

- Sistem menerima data sensor (vibrasi, tekanan, suhu) dari pompa kritikal melalui MQTT.
- Data ini diproses secara batch dan real-time menggunakan algoritma prediksi RUL (Remaining Useful Life).
- Jika hasil prediksi menunjukkan risiko kegagalan dalam < 48 jam, sistem akan:

  - Mengirim notifikasi ke teknisi via WhatsApp/email.
  - Menandai mesin sebagai “kritis” di dashboard.
  - Menyimpan hasil prediksi ke histori untuk pelatihan ulang model.

#### Kebutuhan Turunan dari Use-Case:

| ID     | Requirement Teknis                                                 | Terkait Use-Case |
| ------ | ------------------------------------------------------------------ | ---------------- |
| SRS-01 | Sistem harus memproses data sensor dalam waktu < 2 detik           | UC-001           |
| SRS-02 | Sistem harus mengirim notifikasi anomali < 1 menit setelah deteksi | UC-001           |
| SRS-03 | Dashboard harus menampilkan status prediksi terkini                | UC-001           |

---

### Traceability dari BRS ke SRS

Traceability memastikan bahwa setiap kebutuhan bisnis diterjemahkan ke kebutuhan teknis, dan selanjutnya bisa diuji.

Contoh tabel traceability:

| ID BRS | Deskripsi Kebutuhan Bisnis                 | ID SRS | Deskripsi Kebutuhan Teknis                                   |
| ------ | ------------------------------------------ | ------ | ------------------------------------------------------------ |
| BRS-01 | Mendeteksi kerusakan mesin sebelum terjadi | SRS-01 | Sistem memproses data dalam < 2 detik                        |
|        |                                            | SRS-02 | Notifikasi dikirim dalam < 1 menit                           |
| BRS-02 | Tampilkan tren KPI ke manajer              | SRS-04 | Dashboard menyajikan grafik line/bar chart KPI mingguan      |
| BRS-03 | Mendukung >100 perangkat aktif             | SRS-06 | Sistem scalable dengan WebSocket atau MQTT concurrency > 100 |

---

## **V. System Design**

Desain sistem adalah tahap kritikal dalam SDLC karena berfungsi sebagai blueprint teknis yang akan diimplementasikan oleh tim pengembang. Pada sistem seperti `mx-core-metric`, desain harus mampu mengakomodasi **skala industri**, **real-time processing**, serta integrasi dengan berbagai komponen seperti perangkat IoT, CMMS, dashboard, dan sistem AI.

---

### 🔷 A. High-Level Design (HLD)

#### Modul Utama dan Komunikasi Antar Plugin

Sistem `mx-core-metric` memiliki sejumlah modul utama yang berjalan sebagai microservices atau plugin terintegrasi, dengan komunikasi berbasis HTTP API, MQTT, dan WebSocket.

| Modul/Komponen          | Fungsi Utama                                                 |
| ----------------------- | ------------------------------------------------------------ |
| **Data Ingest**         | Menerima data sensor via MQTT                                |
| **Anomaly Detection**   | Menjalankan model AI untuk mendeteksi anomali                |
| **RUL Prediction**      | Mengestimasi Remaining Useful Life (RUL)                     |
| **Notification Engine** | Mengirim peringatan ke user (email, WhatsApp, webhook, dll.) |
| **Dashboard Web App**   | Visualisasi metrik dan status perangkat                      |
| **CMMS Connector**      | Sinkronisasi status mesin & log ke sistem CMMS perusahaan    |
| **Admin & Role System** | Manajemen user dan otorisasi akses                           |

#### Diagram Arsitektur Mx-Core-metric

```plaintext
               +-----------------------+
               |    Web Dashboard      |
               | (Next.js + Tailwind)  |
               +-----------+-----------+
                           |
                 HTTPS / WebSocket
                           |
               +-----------v-----------+
               |      API Gateway      |
               |  (Next.js API Routes) |
               +---+----+----+----+----+
                   |    |    |    |
                   |    |    |    |
         +---------v+ +--v-----+ +-v------------+
         | RUL Pred. | | Notif  | | CMMS Bridge |
         | (Python)  | | Engine | | Sync API     |
         +-----------+ +--------+ +--------------+
                   ^
                   |
       +-----------v------------+
       |   Anomaly Detection    |
       |   (TensorFlow Model)   |
       +-----------+------------+
                   |
               gRPC / REST
                   |
       +-----------v------------+
       |  MQTT Broker (EMQX)    |
       +-----------+------------+
                   |
           +-------v--------+
           |   ESP32 Device  |
           +-----------------+
```

#### Integrasi dengan Sistem Eksternal

- **CMMS**: Untuk sinkronisasi status dan histori perawatan.
- **Dashboard**: Menyajikan hasil prediksi/anomali secara visual.
- **Device (IoT)**: Menggunakan protokol MQTT untuk komunikasi low-latency.
- **Notification Platform**: WhatsApp API, Email, SMS gateway.

---

### 🔷 B. Low-Level Design (LLD)

Jika HLD menjelaskan arsitektur makro, maka **LLD** memecahnya menjadi desain teknis rinci seperti struktur data, skema API, logika algoritma, dan flow tiap komponen.

#### Struktur Data – ERD dan Tabel DB

Menggunakan Supabase (PostgreSQL) sebagai backend database, berikut contoh struktur entitas utama:

**Entity Relationship Diagram (ERD) Ringkas:**

```plaintext
[Device] ---< [SensorData] >--- [Anomaly]
                     |
                 [Prediction]
                     |
                [NotificationLog]
```

| Tabel             | Kolom Kunci                                     |
| ----------------- | ----------------------------------------------- |
| `Device`          | `id`, `name`, `location`, `last_seen`           |
| `SensorData`      | `id`, `device_id`, `timestamp`, `temp`, `vib`   |
| `Anomaly`         | `id`, `sensor_data_id`, `score`, `is_critical`  |
| `Prediction`      | `id`, `sensor_data_id`, `rul_hours`, `model_id` |
| `NotificationLog` | `id`, `prediction_id`, `channel`, `sent_at`     |

#### Algoritma AI – Deskripsi & Parameter

Model AI utama yang digunakan terdiri dari dua jenis:

1. **Anomaly Detection**

   - Model: Autoencoder LSTM
   - Input: Sliding window dari sensor (vibrasi, suhu, tekanan)
   - Output: Reconstruction error score
   - Threshold: Ditentukan berdasarkan data historis per mesin

2. **Remaining Useful Life (RUL) Prediction**

   - Model: GRU-based regression
   - Input: Time-series sensor data
   - Output: Estimasi waktu (dalam jam) sebelum kegagalan
   - Output diklasifikasikan ke: Aman / Waspada / Kritis

#### API Schema – Contoh Endpoint Prediksi RUL

```http
POST /api/predict/rul

Request Body:
{
  "deviceId": "ESP32-001",
  "windowSize": 30,
  "sensorData": [
    { "timestamp": "...", "temp": 58.1, "vib": 0.41 },
    ...
  ]
}

Response:
{
  "rulHours": 46,
  "status": "critical",
  "modelVersion": "v1.2.3"
}
```

#### Versi Model dan Retraining Schedule

Untuk menjaga akurasi model, sistem mendukung **versioning** dan retraining terjadwal:

| Model           | Versi Aktif | Terakhir Retrain | Jadwal Berikutnya | Metode Deploy         |
| --------------- | ----------- | ---------------- | ----------------- | --------------------- |
| AnomalyDetector | v1.0.4      | 01-Des-2025      | 01-Jan-2026       | Dockerized API        |
| RULPredictor    | v1.2.3      | 05-Des-2025      | 05-Jan-2026       | TensorFlow SavedModel |

Sistem akan menyimpan seluruh hasil prediksi dan skor error sebagai bagian dari dataset untuk pelatihan ulang berikutnya.

---

## **VI. Implementation**

Tahap implementasi adalah fase di mana seluruh desain sistem—baik HLD maupun LLD—ditransformasikan menjadi **kode program yang berjalan**. Dalam proyek seperti `mx-core-metric`, pendekatan modular dan multi-teknologi sangat umum karena kebutuhan sistem yang beragam: dari komunikasi IoT, pengolahan data, AI, hingga antarmuka pengguna.

---

### Struktur Kode Plugin Mx-Core-metric

Arsitektur `mx-core-metric` mengadopsi pendekatan **plugin/microservice-based**, yang artinya tiap fungsi inti dipisahkan sebagai module independen dengan komunikasi melalui API atau event.

Contoh struktur repositori:

```
mx-core-metric/
├── apps/
│   ├── dashboard/              # Frontend web (Next.js)
│   ├── api-gateway/            # API entry point (Next.js API Routes)
│   ├── cmms-connector/         # Integrasi dengan CMMS
├── services/
│   ├── anomaly-detector/       # Deteksi anomali (Python, TensorFlow)
│   ├── rul-predictor/          # Prediksi umur mesin (RUL)
│   ├── notifier/               # Pengiriman notifikasi WA/email
├── libs/
│   ├── shared-types/           # TypeScript types untuk integrasi antar modul
│   ├── db-utils/               # ORM + koneksi database (Supabase / Prisma)
├── .github/
│   ├── workflows/              # CI/CD pipeline config
├── docker-compose.yml         # Orkestrasi lokal antar container
└── README.md
```

Struktur ini memudahkan:

- Isolasi logika tiap fungsi (misalnya retrain model tanpa mengubah dashboard).
- Deployment terpisah (notifikasi bisa di-scale sendiri).
- Sinkronisasi dokumentasi antar modul (dengan shared types dan LLD references).

---

### Teknologi yang Digunakan

| Layer                 | Teknologi                           | Alasan Pemilihan                                        |
| --------------------- | ----------------------------------- | ------------------------------------------------------- |
| **Frontend**          | Next.js + Tailwind CSS + TypeScript | SSR + SPA untuk performa dashboard dan maintainability  |
| **API Gateway**       | Next.js API Routes / Express.js     | Unified entry point dan integrasi auth/user management  |
| **Backend AI**        | Python (FastAPI) + TensorFlow       | AI/ML fleksibel dan production-ready API dengan Python  |
| **Database**          | PostgreSQL (via Supabase)           | Relasional, scalable, dan mendukung trigger/webhook     |
| **IoT Communication** | MQTT (EMQX)                         | Low-latency protocol ideal untuk komunikasi device      |
| **Notifikasi**        | Node.js + WhatsApp API              | Responsif dan mudah dikembangkan dengan ekosistem JS    |
| **Containerisasi**    | Docker, Docker Compose              | Standar industri, mempermudah CI/CD dan dev environment |

---

### CI/CD Pipeline Ringkas

CI/CD disusun untuk mendukung proses otomatisasi dalam:

- Build & Test
- Deploy
- Notifikasi perubahan

Contoh ringkasan pipeline (GitHub Actions):

```yaml
name: Mx-Core CI/CD

on:
  push:
    branches: ['main']

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js + Python
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install --prefix apps/dashboard
      - run: npm run build --prefix apps/dashboard
      - run: pytest services/anomaly-detector/tests/
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        run: |
          ssh user@server "docker-compose pull && docker-compose up -d"
```

Pipeline ini dapat diperluas untuk:

- Deploy berbeda ke **Dev**, **QA**, dan **Prod**
- **Retrain trigger otomatis** saat data baru masuk
- **Slack/email notifikasi** untuk tim

---

### Kode vs Dokumentasi (LLD Linkage)

Untuk memastikan konsistensi antara **kode** dan **desain teknis (LLD)**, praktik berikut digunakan:

| Strategi                            | Penjelasan                                                                   |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| **Inline Docstring / JSDoc**        | Menjelaskan API, input/output sesuai dengan spesifikasi di LLD               |
| **Auto-generated Docs**             | Menggunakan tools seperti Swagger (FastAPI) dan `tRPC` untuk dokumentasi API |
| **Shared Types / JSON Schema**      | Skema data disimpan sebagai referensi tunggal (`libs/shared-types/`)         |
| **Kode Repositori + Link LLD**      | Header file/module mengacu ke bagian dokumen LLD                             |
| **Testing mengacu ke LLD Use-case** | Unit/integration test disusun berdasarkan skenario dari LLD                  |

Contoh dokumentasi endpoint (FastAPI):

```python
@app.post("/predict/rul", response_model=PredictionResponse)
def predict_rul(input: SensorDataBatch):
    """
    Mengestimasi Remaining Useful Life (RUL)
    - LLD Ref: Section 5.B.3
    - Input: 30 data terakhir dari 3 sensor
    - Output: Estimasi umur pakai dalam jam
    """
    ...
```

---

## **VII. Testing**

Tahap pengujian adalah fase krusial dalam SDLC untuk memastikan bahwa implementasi sistem sesuai dengan **requirement (SRS)** dan **use-case** yang telah ditentukan sebelumnya. Pada sistem industri seperti `mx-core-metric`, pengujian tidak hanya fokus pada fungsionalitas, tetapi juga pada **keandalan**, **respons waktu**, dan **akurasi sistem prediksi AI**.

---

### Test Plan dan Test Case

#### Test Plan

Dokumen **test plan** menjelaskan strategi umum pengujian sistem, termasuk ruang lingkup, metode, dan tanggung jawab tiap tim.

| Komponen            | Isi                                                               |
| ------------------- | ----------------------------------------------------------------- |
| **Tujuan Uji**      | Validasi fungsionalitas, performa, dan keakuratan prediksi        |
| **Lingkup Uji**     | Modul utama: sensor ingest, prediksi RUL, notifikasi, dashboard   |
| **Jenis Pengujian** | Unit test, integration test, API test, model accuracy test, UAT   |
| **Tim Terlibat**    | QA engineer, data scientist, software developer, teknisi lapangan |
| **Lingkungan Uji**  | QA environment yang identik dengan staging                        |

#### Test Case

Setiap **test case** dirancang berdasarkan **use-case** dan requirement di dokumen SRS.

Contoh test case untuk use-case UC-001: _Prediksi kegagalan pompa kritikal_

| ID     | Nama Test Case                            | Input                         | Ekspektasi Output                           | Status |
| ------ | ----------------------------------------- | ----------------------------- | ------------------------------------------- | ------ |
| TC-001 | Prediksi RUL valid                        | Data sensor 30 menit terakhir | RUL (dalam jam) muncul, status = critical   | ✅     |
| TC-002 | Notifikasi dikirim saat prediksi < 48 jam | Prediksi RUL = 36 jam         | WhatsApp/email dikirim ke teknisi           | ✅     |
| TC-003 | Anomali score threshold trigger           | Sensor anomali > threshold    | Tercatat di DB dan ditampilkan di dashboard | ✅     |
| TC-004 | Validasi autentikasi dashboard            | User login dengan token       | Akses dashboard berhasil jika role valid    | ✅     |

---

### Keterkaitan dengan Use-Case

Pengujian **harus bersifat traceable ke use-case dan SRS**. Ini memastikan bahwa setiap kebutuhan teknis yang diturunkan dari kebutuhan bisnis benar-benar diuji.

Contoh traceability testing:

| Use-Case ID | Requirement (SRS)                  | Test Case ID | Jenis Test  |
| ----------- | ---------------------------------- | ------------ | ----------- |
| UC-001      | SRS-02: Notifikasi < 1 menit       | TC-002       | Integration |
| UC-001      | SRS-01: Prediksi RUL akurat        | TC-001       | Model test  |
| UC-002      | SRS-05: Dashboard tampil real-time | TC-005       | UI/API Test |

---

### UAT untuk Sistem Prediksi

**UAT (User Acceptance Testing)** merupakan pengujian dari perspektif pengguna akhir, untuk memastikan sistem memenuhi kebutuhan operasional nyata di lapangan.

Pada `mx-core-metric`, UAT dilakukan oleh:

- **Teknisi lapangan**: mengevaluasi notifikasi, kejelasan data di dashboard.
- **Manajer operasional**: menilai akurasi KPI dan kemudahan akses informasi.
- **Data engineer/QA**: memverifikasi bahwa data sensor masuk sesuai alur.

Contoh checklist UAT:

| No  | Uji                                                  | Hasil yang Diharapkan                            | Status |
| --- | ---------------------------------------------------- | ------------------------------------------------ | ------ |
| 1   | Sistem menampilkan status “kritis” saat RUL < 48 jam | Label status muncul di dashboard, berwarna merah | ✅     |
| 2   | Notifikasi diterima teknisi                          | WA masuk dengan isi yang informatif dan ringkas  | ✅     |
| 3   | Data historis disimpan                               | Prediksi dan skor disimpan dan bisa ditracking   | ✅     |

---

### Tools yang Digunakan

Beberapa tools populer yang digunakan dalam proses pengujian `mx-core-metric`:

| Tool                 | Fungsi                                                          |
| -------------------- | --------------------------------------------------------------- |
| **Postman**          | Menguji API endpoint, validasi input/output                     |
| **TestRail**         | Manajemen test plan dan test case, termasuk traceability matrix |
| **Jest**             | Unit testing untuk modul Node.js / frontend (Next.js)           |
| **Pytest**           | Testing untuk service Python (anomaly, RUL predictor)           |
| **Supabase Studio**  | Validasi isi database, perubahan status real-time               |
| **Grafana (QA Env)** | Monitoring log dan error trace saat UAT                         |

---

## **VIII. Deployment**

Tahap **deployment** dalam SDLC adalah proses memindahkan sistem dari lingkungan pengembangan ke lingkungan operasional. Untuk sistem industri seperti `mx-core-metric`, proses ini harus menjamin **zero-downtime**, **keamanan data**, serta **kemampuan rollback jika terjadi kegagalan**.

---

### Deployment Pipeline

`mx-core-metric` menggunakan pendekatan **automated deployment pipeline** berbasis GitHub Actions dan Docker. Pipeline ini bertugas:

- Build image setiap commit ke branch `main`
- Menjalankan pengujian otomatis
- Deploy ke server QA / Production sesuai environment target
- Kirim notifikasi hasil deployment ke tim (Slack/email)

#### Contoh Alur CI/CD Pipeline:

```plaintext
Commit ke main
    ↓
Build Docker image
    ↓
Jalankan unit test (Jest / Pytest)
    ↓
Push ke container registry
    ↓
Deploy ke environment (QA atau Prod)
    ↓
Jalankan health-check otomatis
    ↓
Kirim notifikasi status ke Slack
```

#### Sample: Konfigurasi GitHub Actions

```yaml
name: Deploy Mx-Core

on:
  push:
    branches: ['main']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker-compose -f docker-compose.prod.yml build
      - run: docker-compose -f docker-compose.prod.yml up -d
      - name: Health Check
        run: curl -f http://your-domain.com/health || exit 1
```

---

### Environment Setup (Dev, QA, Prod)

Untuk menjaga stabilitas dan konsistensi, deployment dilakukan melalui **tiga tahapan environment**:

| Environment | Tujuan                                   | Akses & Konfigurasi                                 |
| ----------- | ---------------------------------------- | --------------------------------------------------- |
| **Dev**     | Untuk pengujian lokal & eksperimen fitur | Docker Compose, database dummy, model non-produktif |
| **QA**      | UAT & pre-release testing                | Mirror dari prod (data sintetik / semi-realistis)   |
| **Prod**    | Sistem operasional aktual                | Server stabil, model AI versi teruji, data asli     |

#### Konfigurasi Umum per Environment:

- `.env.dev`, `.env.qa`, `.env.prod`
- Skema database tetap konsisten
- Penggunaan **feature flag** untuk mengaktifkan fitur tertentu di Dev saja

---

### Rollback & Release Notes

#### Rollback

Rollback dirancang untuk kasus deployment gagal atau muncul bug kritikal pasca rilis.

Strategi yang digunakan:

- **Versioned Docker Image**: Setiap versi dirilis dengan tag unik (`mx-core:v1.3.2`)
- **Backup otomatis**: Database dan model AI disimpan sebelum upgrade
- **Revert script**: `docker-compose -f rollback.yml up` untuk memulihkan versi sebelumnya

#### Release Notes

Release notes disusun dan dibagikan untuk setiap rilis versi baru, mencakup:

| Elemen             | Deskripsi                                                         |
| ------------------ | ----------------------------------------------------------------- |
| **Versi**          | v1.3.2                                                            |
| **Tanggal Rilis**  | 15 Desember 2025                                                  |
| **Perubahan Baru** | - Penambahan notifikasi via email<br>- Optimasi akurasi model RUL |
| **Bug Fixes**      | - Fix error status “unknown” di dashboard saat device offline     |
| **Dokumentasi**    | Link ke LLD & endpoint API yang diperbarui                        |

Release notes ini didistribusikan via Confluence atau sebagai `CHANGELOG.md` di repo Git utama.

---

### Integrasi ke Ekosistem Mx-Core

`mx-core-metric` bukan sistem yang berdiri sendiri. Ia merupakan bagian dari ekosistem **Mx-Core**, yang mencakup:

- **mx-core-docs**: sistem dokumentasi interaktif dan auto-traceable
- **mx-core-cmms**: sistem manajemen maintenance dan inspeksi lapangan
- **mx-core-dashboard**: dashboard agregat untuk monitoring multi-plant

#### Bentuk Integrasi:

| Sistem Eksternal    | Bentuk Integrasi                                          |
| ------------------- | --------------------------------------------------------- |
| `mx-core-docs`      | Setiap endpoint dan model terhubung ke referensi LLD/SRS  |
| `mx-core-cmms`      | Status prediksi otomatis mengisi field CMMS               |
| `mx-core-dashboard` | Widget “Health Score” ditarik dari modul `mx-core-metric` |
| MQTT Broker (EMQX)  | Publikasi status RUL via topik `plant/metric/status`      |

Integrasi ini membuat `mx-core-metric` tidak hanya menjalankan fungsinya sendiri, tetapi juga **berkontribusi pada sistem monitoring dan pengambilan keputusan secara menyeluruh.**

---

## **IX. Maintenance**

Tahap **maintenance** dalam SDLC mencakup semua aktivitas yang dilakukan **setelah sistem dirilis ke produksi**, termasuk pemantauan performa, perbaikan bug, pembaruan model AI, dan penyesuaian terhadap kebutuhan baru.

Untuk sistem industri seperti `mx-core-metric`, maintenance bukan hanya soal stabilitas sistem, tetapi juga **responsivitas terhadap dinamika operasional**, seperti perubahan pola data sensor, kebutuhan bisnis baru, dan integrasi tambahan.

---

### 1. Post-deployment Monitoring

Monitoring dilakukan untuk memastikan sistem tetap berjalan stabil dan dapat dideteksi lebih awal jika terjadi anomali operasional.

#### Komponen Monitoring:

| Aspek yang Dipantau       | Tools / Strategi                            |
| ------------------------- | ------------------------------------------- |
| **Status Service**        | Uptime monitoring via Grafana + Prometheus  |
| **Log Error**             | ELK Stack / Supabase log, log level standar |
| **MQTT Traffic**          | EMQX dashboard, packet drop, topic lag      |
| **Database Health**       | Query time monitoring, deadlock detection   |
| **AI Output Consistency** | Range checking dan histogram prediksi       |

#### Contoh Alert Otomatis:

- Jika tidak ada data masuk > 10 menit → alert ke Slack DevOps
- Jika anomali meningkat 3x lipat dalam 1 jam → notifikasi ke Data Engineer
- Jika latency prediksi > 5 detik → masuk ke incident queue

---

### 2. SLA dan Respon Insiden

SLA (**Service Level Agreement**) mendefinisikan standar waktu respon dan waktu pemulihan jika terjadi gangguan sistem. Ini penting untuk sistem industri yang digunakan dalam operasi 24/7.

| Tipe Insiden                  | SLA Respon Awal | Waktu Pemulihan Target | Tim Terkait            |
| ----------------------------- | --------------- | ---------------------- | ---------------------- |
| **Service Down**              | ≤ 15 menit      | ≤ 2 jam                | DevOps / Infrastruktur |
| **Prediksi Tidak Jalan**      | ≤ 30 menit      | ≤ 4 jam                | Data Engineer / ML Ops |
| **Notifikasi Gagal Terkirim** | ≤ 1 jam         | ≤ 6 jam                | Backend / Integration  |
| **Kesalahan Prediksi Tinggi** | ≤ 1 hari        | ≤ 3 hari (via retrain) | ML Engineer            |

Insiden dicatat dan ditindaklanjuti melalui **incident ticketing system** seperti Jira atau GitHub Issues.

---

### 3. Model Retraining dan Model Drift Handling

Karena `mx-core-metric` menggunakan model AI untuk deteksi anomali dan prediksi RUL, **retraining model** adalah bagian penting dari maintenance.

#### Jadwal dan Strategi Retraining:

| Model            | Frekuensi Retrain | Trigger Otomatis                           |
| ---------------- | ----------------- | ------------------------------------------ |
| Anomaly Detector | Bulanan           | Akurasi menurun > 10%                      |
| RUL Predictor    | Setiap 2 bulan    | Error prediksi meningkat berturut 2 minggu |

#### Handling Model Drift

Model drift terjadi saat performa model menurun karena pola data berubah. Tanda-tandanya:

- Prediksi sering terlalu cepat/lambat
- Anomali score meningkat tanpa gangguan nyata
- Feedback teknisi bertentangan dengan hasil prediksi

**Solusi:**

- Evaluasi ulang dataset
- Tambah fitur baru (misalnya: load mesin, shift kerja)
- Terapkan **continual learning pipeline** (opsional)
- Log dan simpan semua hasil prediksi untuk audit dan fine-tuning

---

### 4. Change Request Management

Dalam sistem industri, **kebutuhan bisnis dapat berubah** (misalnya, integrasi plant baru atau perubahan metrik KPI). Maka dibutuhkan proses formal untuk manajemen **Change Request (CR).**

#### Siklus Change Request:

1. **Pengajuan CR**
   → oleh stakeholder melalui form CR (bisa di Confluence, Jira, atau sistem custom)

2. **Analisis Dampak**
   → dilakukan oleh tim arsitek dan developer: modul yang terpengaruh, effort estimasi, downtime potensial

3. **Persetujuan CR**
   → oleh manajer proyek atau product owner

4. **Implementasi Terjadwal**
   → dilakukan dalam sprint mendatang atau patch release

5. **Retesting & Deployment**
   → testing difokuskan pada area yang terdampak, dengan tambahan regresi test

#### Contoh CR:

| ID CR  | Deskripsi Perubahan                            | Status    | Dampak Utama               |
| ------ | ---------------------------------------------- | --------- | -------------------------- |
| CR-014 | Tambah prediksi RUL untuk mesin baru (IDN-109) | Disetujui | Perlu retrain + mapping DB |
| CR-015 | Tambah endpoint untuk webhook internal CMMS    | Draft     | Perubahan API Gateway      |
| CR-016 | Ubah threshold status “critical”               | Closed    | Hanya config, tanpa deploy |

---

## **X. Dokumentasi & Deliverable**

Dokumentasi adalah fondasi penting dalam pengembangan software skala industri. Di luar implementasi teknis, **kualitas dokumentasi menentukan keberhasilan komunikasi, audit, pelatihan, dan keberlanjutan sistem**. Dalam proyek seperti `mx-core-metric`, dokumentasi bukan sekadar formalitas—tetapi bagian integral dari alur kerja teknis dan bisnis.

---

### 1. Tabel Daftar Dokumen Tiap Fase SDLC

Berikut adalah mapping dokumen terhadap tiap fase dalam SDLC `mx-core-metric`:

| Fase SDLC             | Dokumen Utama                                | Format              | Status Deliverable                      |
| --------------------- | -------------------------------------------- | ------------------- | --------------------------------------- |
| **BRS**               | Business Requirement Specification           | `.docx`             | ✅ Mandatory                            |
| **SRS + Use Case**    | Software Requirement Specification, Use-Case | `.docx`, `.xlsx`    | ✅ Mandatory                            |
| **HLD**               | High-Level Design Diagram & Deskripsi        | `.pptx`, `.drawio`  | ✅ Mandatory                            |
| **LLD**               | Low-Level Design: ERD, API, Algoritma        | `.md`, `.json`      | ✅ Mandatory                            |
| **Implementation**    | Struktur repositori, kode, `README.md`       | `.md`, `.ts`, `.py` | ✅ Mandatory                            |
| **Testing**           | Test Plan, Test Case, UAT Report             | `.xlsx`, `.pdf`     | ✅ Mandatory                            |
| **Deployment**        | Deployment SOP, CI/CD config, Release Notes  | `.md`, `.yml`       | ✅ Mandatory                            |
| **Maintenance**       | Log retrain, Incident Report, CR List        | `.xlsx`, `.docx`    | ✅ Opsional (wajib jika ada insiden/CR) |
| **Dokumentasi Akhir** | Master Dokumen SDLC + Checklist Implementasi | `.xlsx`, `.docx`    | ✅ Mandatory                            |

---

### 2. Template / Contoh File Dokumentasi

Agar konsistensi dan traceability terjaga, berikut beberapa contoh format atau template yang digunakan:

#### 📄 BRS Template (`.docx`)

```plaintext
1. Latar Belakang
2. Tujuan Sistem
3. Ruang Lingkup
4. Stakeholder
5. Kebutuhan Bisnis (tabel prioritas)
6. KPI / Target
7. Keterbatasan Sistem
```

#### 📊 Test Case Format (`.xlsx`)

| Test Case ID | Nama Test           | Input Data       | Expected Output             | Status | Terkait Use-Case |
| ------------ | ------------------- | ---------------- | --------------------------- | ------ | ---------------- |
| TC-01        | Prediksi RUL akurat | 30 window sensor | RUL dalam jam (≤ error 10%) | ✅     | UC-001           |

#### 🧾 API Schema (`.json`)

File `rul-predictor.openapi.json`:

```json
{
  "paths": {
    "/api/predict/rul": {
      "post": {
        "summary": "Prediksi Remaining Useful Life",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/SensorWindow" }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Prediksi berhasil",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/RULResponse" }
              }
            }
          }
        }
      }
    }
  }
}
```

#### 📘 Release Notes Format (`.md`)

```markdown
## v1.3.2 - 15 Desember 2025

### 🔼 Fitur Baru

- Notifikasi email tambahan untuk status `critical`
- Monitoring latency prediksi (metrics API)

### 🐞 Bug Fixes

- Perbaikan error parsing data MQTT dari sensor legacy

### 📎 Dokumen Terkait

- LLD Ref: v1.3.2/design/llm-predictor.md
- Test Case Ref: QA-TC-043
```

---

### 3. Best Practices dalam Penyusunan & Pengelolaan Dokumen

#### ✅ Prinsip Utama

| Prinsip                        | Penjelasan                                                                          |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| **Single Source of Truth**     | Dokumen hanya disimpan di satu lokasi resmi (mis. Git, Confluence)                  |
| **Version Control**            | Semua dokumen penting di-track via Git (`.md`, `.json`, `.yaml`, `.drawio`)         |
| **Linkage dan Traceability**   | Setiap dokumen harus mengacu ke dokumen sebelumnya dan berikutnya (misal SRS ➝ HLD) |
| **Live Documentation**         | Gunakan auto-generated docs untuk API, ERD, test result                             |
| **Format Konsisten**           | Gunakan template standar perusahaan/klien                                           |
| **Dokumentasi = Implementasi** | Jika dokumentasi berubah, kode/fitur harus ikut diperbarui (dan sebaliknya)         |

#### 📦 Tools Pendukung

| Kebutuhan                 | Tools / Format                    |
| ------------------------- | --------------------------------- |
| Document repository       | GitHub, GitLab, Confluence        |
| API documentation         | Swagger, Redoc, Postman Docs      |
| Diagram & ERD             | dbdiagram.io, draw.io, Lucidchart |
| Dokumentasi berbasis kode | README.md, JSDoc, docstring       |
| Spreadsheet testing       | Excel, Google Sheets, TestRail    |

---

Dengan dokumentasi yang **terstandar, traceable, dan versioned**, proyek seperti `mx-core-metric` akan:

- **Lebih mudah dipelihara**
- **Lebih cepat di-audit**
- **Mendukung onboarding tim baru**
- **Siap untuk skalabilitas lintas site atau pabrik**

---

## **XI. Penutup**

### 🔁 Ringkasan: Pentingnya Keterpaduan BRS ➝ SRS ➝ Desain ➝ Implementasi

Dalam pengembangan software industri yang kompleks dan kritikal seperti `mx-core-metric`, **keterpaduan antar fase SDLC bukanlah opsi—melainkan kebutuhan**.

Setiap fase saling terkait secara **vertikal dan logis**:

- **BRS** menjabarkan _apa_ yang dibutuhkan dari sisi bisnis.
- **SRS** menerjemahkan kebutuhan tersebut menjadi _apa yang harus dilakukan oleh sistem_.
- **Desain (HLD & LLD)** mengubah SRS menjadi _bagaimana sistem akan dibangun dan bekerja_.
- **Implementasi** mewujudkan desain dalam bentuk _kode nyata dan layanan produksi_.

Tanpa alur yang terstruktur ini:

- Tim mudah kehilangan arah saat skala proyek membesar.
- Perubahan bisnis tidak cepat diakomodasi secara teknis.
- Sistem rawan error, sulit diuji, dan sulit dikembangkan ulang.

Dengan alur yang terstruktur:

- Perubahan dapat ditelusuri dan dikendalikan.
- Dokumentasi mendukung kolaborasi dan audit.
- Kualitas sistem meningkat secara signifikan.

---

### 🛠️ Rekomendasi: Gunakan SDLC sebagai Standar Proyek Digital Maintenance

Berikut rekomendasi untuk perusahaan industri atau tim pengembang dalam membangun **sistem digital maintenance** berbasis data dan AI:

1. **Standarkan penggunaan SDLC untuk seluruh proyek** — mulai dari sistem dashboard sederhana hingga prediksi berbasis machine learning.
2. **Jadikan dokumen BRS/SRS sebagai bahan komunikasi lintas fungsi** — agar tim bisnis dan teknis berbicara dalam satu kerangka.
3. **Sisipkan prinsip agile secara taktis** — terutama pada fase desain, implementasi, dan retraining model AI.
4. **Otomatiskan sebanyak mungkin** — CI/CD, testing, monitoring, retraining, hingga dokumentasi API.
5. **Integrasikan SDLC ke dalam budaya kerja proyek industri** — bukan sekadar checklist, tetapi sebagai kerangka berpikir kolaboratif.

---

### ✅ Checklist: Sukses Implementasi SDLC di Proyek Industrial / AI

| Aspek                           | Tindakan Kunci                                               | Status |
| ------------------------------- | ------------------------------------------------------------ | ------ |
| 🔹 **BRS Disetujui**            | Terdapat dokumen kebutuhan bisnis dengan stakeholder lengkap | ✅     |
| 🔹 **SRS Tersusun Rinci**       | Use-case, skenario, NFR, dan traceability tersedia           | ✅     |
| 🔹 **Desain Terstruktur**       | HLD & LLD terdokumentasi dan bisa diimplementasikan          | ✅     |
| 🔹 **Kode Modular & Testable**  | Implementasi mengikuti arsitektur dan LLD                    | ✅     |
| 🔹 **Testing Terverifikasi**    | Test case mencakup semua use-case utama + UAT                | ✅     |
| 🔹 **Deploy Otomatis**          | CI/CD pipeline mendukung update aman                         | ✅     |
| 🔹 **Monitoring Aktif**         | Sistem log, alert, dan health check berjalan pasca deploy    | ✅     |
| 🔹 **Model AI Terkelola**       | Retrain schedule, versioning, dan drift monitoring ada       | ✅     |
| 🔹 **Dokumentasi Terintegrasi** | Semua artefak terdokumentasi dan traceable                   | ✅     |

---

Dengan menerapkan pendekatan ini, proyek seperti `mx-core-metric` tidak hanya menjadi solusi fungsional, tapi juga **menjadi standar baru dalam pengembangan sistem AI untuk dunia industri** — yang transparan, terukur, dan berkelanjutan.

---

📘 **Akhir Kata**
Blueprint ini diharapkan dapat menjadi panduan praktis bagi tim teknis dan manajerial dalam mengembangkan solusi digital maintenance yang berbasis data, AI, dan IoT — dengan struktur SDLC sebagai tulang punggung utama.

Jika dibutuhkan, blueprint ini juga bisa dikembangkan menjadi **template proyek siap pakai** atau basis untuk membangun platform SDLC internal perusahaan.

---
