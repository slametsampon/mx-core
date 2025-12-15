# 📄 **Business Requirements Specification (BRS)**

## Mx-Core AI Plugin

---

### 1. **Document Control**

| Item    | Detail                                  |
| ------- | --------------------------------------- |
| Project | Mx-Core Monorepo                        |
| Module  | mx-core-ai (AI Plugin)                  |
| Owner   | Digital Maintenance Transformation Team |
| Date    | 15 December 2025                        |
| Version | 1.0 – Initial Draft                     |

---

### 2. **Business Context**

Perusahaan menghadapi tantangan dalam meminimalkan downtime, meningkatkan reliabilitas aset, dan mengoptimalkan biaya pemeliharaan. Pendekatan reaktif dan periodik tidak lagi memadai untuk lingkungan operasional kompleks seperti petrokimia dan manufaktur berat. Oleh karena itu, diperlukan solusi **AI-driven** yang dapat:

- Memprediksi kegagalan secara dini
- Mendeteksi anomali dalam parameter operasional
- Memberikan insight berbasis data historis & real-time
- Memfasilitasi interaksi manusia dengan sistem pemeliharaan menggunakan bahasa natural

---

### 3. **Business Objectives**

| No  | Objective                                                                      |
| --- | ------------------------------------------------------------------------------ |
| 1   | Meningkatkan _equipment availability_ melalui prediksi kegagalan               |
| 2   | Menurunkan biaya total pemeliharaan dengan pendekatan prediktif                |
| 3   | Menyediakan insight berbasis AI untuk mendukung pengambilan keputusan teknikal |
| 4   | Meningkatkan efisiensi operasional melalui interaksi berbasis NLP              |
| 5   | Menyediakan visualisasi dan dokumentasi hasil inference AI secara terintegrasi |

---

### 4. **Scope of Plugin `mx-core-ai`**

| Area | Termasuk                                        |
| ---- | ----------------------------------------------- |
| ✅   | Anomaly detection                               |
| ✅   | Predictive maintenance (RUL estimation)         |
| ✅   | Intelligent work order suggestion               |
| ✅   | NLP-based query assistant                       |
| ✅   | Health scoring asset                            |
| ✅   | AI-assisted root cause analysis                 |
| ❌   | Hardware interface (sensor acquisition)         |
| ❌   | Scheduling CMMS (ditangani oleh `mx-core-cmms`) |

---

### 5. **Stakeholders**

| Role                 | Interest                                       |
| -------------------- | ---------------------------------------------- |
| Maintenance Planner  | Menerima rekomendasi AI untuk WO dan prioritas |
| Reliability Engineer | Menganalisis health scoring dan anomaly        |
| Operator             | Mengakses insight melalui UI / dashboard       |
| IT/Data Team         | Integrasi data & maintenance AI model          |
| Management           | Evaluasi KPI hasil implementasi AI             |

---

### 6. **Functional Requirements Summary**

| ID    | Function        | Description                                                              |
| ----- | --------------- | ------------------------------------------------------------------------ |
| FR-01 | Predict Failure | Memprediksi waktu kegagalan aset berdasarkan data historis dan real-time |
| FR-02 | Detect Anomaly  | Deteksi perilaku tidak normal dari parameter operasional                 |
| FR-03 | Suggest WO      | Memberikan saran pembuatan work order berdasarkan prediksi AI            |
| FR-04 | NLP Interface   | Memungkinkan user bertanya dalam bahasa natural                          |
| FR-05 | Visual Insight  | Menyajikan hasil prediksi dalam bentuk grafik, tabel, dan notifikasi     |
| FR-06 | RCA Assistant   | Memberi hipotesis akar penyebab kegagalan berdasarkan pola historis      |

---

### 7. **Use-Case Referensi (Rangkuman)**

Use-case yang telah dijabarkan sebelumnya dikonsolidasikan ke dalam sistem ini:

- Predictive Maintenance
- Anomaly Detection
- Intelligent Work Order Suggestion
- NLP Assistant
- KPI Optimization
- AI-based Root Cause Analysis

---

### 8. **System Integration Map**

| Plugin              | Peran                                        |
| ------------------- | -------------------------------------------- |
| `mx-core-metric`    | Memberikan input data KPI dan sensor         |
| `mx-core-cmms`      | Menerima rekomendasi AI untuk WO             |
| `mx-core-dashboard` | Menampilkan insight prediksi dan anomaly     |
| `mx-core-docs`      | Dokumentasi hasil dan referensi RCA          |
| `mx-core-rbm`       | Menyediakan health baseline & feedback ke AI |

---

## 🧭 Narasi & Alur Use-Case

Sebagai bagian dari transformasi digital maintenance, plugin `mx-core-ai` dihadirkan untuk menjadi **“digital brain”** bagi ekosistem Mx-Core. Dalam operasionalnya, AI tidak menggantikan engineer, melainkan bertindak sebagai **decision-support system** berbasis data.

Misalnya:

- Sensor vibrasi dan suhu dari pompa dikirim ke `mx-core-metric`.
- AI di `mx-core-ai` mengidentifikasi pola anomali atau mendeteksi potensi kegagalan dalam 5 hari ke depan.
- Rekomendasi dikirim ke `mx-core-cmms` sebagai draft Work Order.
- Hasil visualisasi dapat dilihat pada `mx-core-dashboard`.
- Dokumentasi rekomendasi AI otomatis dicatat dalam `mx-core-docs`.

Di sinilah AI menjadi komponen yang menjembatani data dan aksi, membentuk siklus _continuous reliability improvement_.

---

Berikut adalah dokumen **Software Requirements Specification (SRS)** untuk plugin **`mx-core-ai`**, yang disusun mengacu pada dokumen **Business Requirements Specification (BRS)** sebelumnya. Dokumen ini disusun sesuai dengan struktur standar IEEE 830-1998 yang umum digunakan dalam proyek rekayasa perangkat lunak industri.

---

# 📄 **Software Requirements Specification (SRS)**

## Mx-Core AI Plugin

---

### 1. **Introduction**

#### 1.1 Purpose

Dokumen ini menjelaskan spesifikasi perangkat lunak untuk plugin `mx-core-ai`, bagian dari ekosistem monorepo Mx-Core. Plugin ini menyediakan fitur Artificial Intelligence (AI) dan Machine Learning (ML) yang berfungsi untuk:

- Memprediksi kegagalan peralatan
- Mendeteksi anomali secara real-time
- Memberikan rekomendasi perawatan
- Mendukung interaksi pengguna melalui Natural Language Processing (NLP)

#### 1.2 Scope

`mx-core-ai` akan beroperasi sebagai modul independen dalam Mx-Core, terintegrasi dengan:

- `mx-core-metric` untuk data KPI dan sensor
- `mx-core-cmms` untuk manajemen Work Order
- `mx-core-dashboard` untuk visualisasi
- `mx-core-docs` untuk dokumentasi hasil inference
- `mx-core-rbm` untuk health baseline data

#### 1.3 Definitions

- **RUL**: Remaining Useful Life
- **KPI**: Key Performance Indicator
- **WO**: Work Order
- **NLP**: Natural Language Processing
- **RCA**: Root Cause Analysis

---

### 2. **Overall Description**

#### 2.1 Product Perspective

Plugin ini dibangun sebagai bagian dari monorepo modular Mx-Core, dan akan:

- Mengambil data dari plugin lain melalui shared interfaces
- Menyediakan API internal untuk inference dan hasil prediksi
- Menyimpan model dan log inference di local storage atau AI DB

#### 2.2 User Classes and Characteristics

| User     | Role                                               |
| -------- | -------------------------------------------------- |
| Operator | Menggunakan antarmuka NLP                          |
| Engineer | Mengakses hasil prediksi kegagalan dan rekomendasi |
| Planner  | Mengambil keputusan berdasarkan saran AI           |
| Manager  | Memantau hasil dan efektivitas AI dari dashboard   |

#### 2.3 Operating Environment

- Backend: Node.js / TypeScript
- AI Framework: Python (TensorFlow / PyTorch), via microservice
- Data Storage: PostgreSQL / InfluxDB / Object Storage
- Communication: REST API / internal shared services

---

### 3. **Functional Requirements**

| ID    | Nama Fitur                | Deskripsi                                                                                  |
| ----- | ------------------------- | ------------------------------------------------------------------------------------------ |
| FR-01 | Failure Prediction Engine | Menyediakan estimasi Remaining Useful Life (RUL) berdasarkan sensor historis dan real-time |
| FR-02 | Anomaly Detection Engine  | Mengidentifikasi kelainan pada parameter operasi berdasarkan model statistik dan ML        |
| FR-03 | Work Order Suggestion     | Menyusun draft WO otomatis berdasarkan hasil inference                                     |
| FR-04 | NLP Assistant             | Menerjemahkan permintaan pengguna ke dalam query teknikal                                  |
| FR-05 | RCA Assistant             | Memberikan hipotesis penyebab utama kegagalan berdasarkan histori dan data serupa          |
| FR-06 | Health Scoring            | Memberikan skor kesehatan peralatan dalam rentang 0–100                                    |
| FR-07 | Visual Insight API        | Menyediakan data siap visualisasi untuk `mx-core-dashboard`                                |
| FR-08 | Logging & Auditing        | Menyimpan hasil inference, confidence level, dan tindakan yang diambil                     |

---

### 4. **Non-Functional Requirements**

| Kategori        | Requirement                                                               |
| --------------- | ------------------------------------------------------------------------- |
| Reliability     | Sistem inference harus berjalan ≥ 99% uptime                              |
| Performance     | Latency inference < 2 detik untuk permintaan prediksi                     |
| Scalability     | Mendukung deployment skala plant hingga ratusan equipment                 |
| Security        | Model inference hanya diakses melalui secured API                         |
| Maintainability | Model dapat diperbarui (retraining) tanpa down-time sistem                |
| Traceability    | Semua hasil AI harus dapat dilacak kembali ke data sumber dan versi model |

---

### 5. **System Interfaces**

#### 5.1 Data Input Interface

- Streaming sensor metrics via `mx-core-metric`
- CMMS histori via `mx-core-cmms`
- KPI historis dari database InfluxDB / Prometheus

#### 5.2 Output Interfaces

- REST API untuk `mx-core-cmms`, `mx-core-dashboard`, `mx-core-docs`
- WebSocket event untuk notifikasi real-time

#### 5.3 Internal Storage

- Local storage untuk trained model dan metadata
- Logs & inference output dalam PostgreSQL

---

### 6. **Logical Architecture Overview**

```text
[Sensor Data] & [CMMS Data]
         ↓
   [mx-core-metric]
         ↓
     [mx-core-ai]
      ├── Failure Prediction
      ├── Anomaly Detection
      ├── NLP Processor
      └── RCA Assistant
         ↓
+----------------------------+
| mx-core-cmms               | ← WO Recommendation
| mx-core-dashboard          | ← Health & Prediction Visual
| mx-core-docs               | ← Audit Log & Explanation
+----------------------------+
```

---

### 7. **Constraints and Assumptions**

- Model awal akan dikembangkan dari data histori yang tersedia; akurasi meningkat seiring waktu melalui retraining.
- Semua inference bersifat _assistive_, bukan pengganti pengambilan keputusan teknikal manusia.
- Data yang digunakan harus memiliki kualitas dan kelengkapan minimum untuk training.

---

### 8. **Appendix**

#### 8.1 Model Tipe Awal yang Digunakan

- RUL Prediction: Gradient Boosting Regressor
- Anomaly: Isolation Forest / LSTM Autoencoder
- NLP: BERT-based model fine-tuned for maintenance query

#### 8.2 Target Milestone (High-Level)

| Tahap                         | Waktu   |
| ----------------------------- | ------- |
| Proof of Concept (1 use-case) | Q1 2026 |
| MVP v1.0 (3 use-case)         | Q2 2026 |
| Full Rollout                  | Q4 2026 |

---

---

Tentu. Berikut ini adalah **rincian menyeluruh use-case untuk plugin `mx-core-ai`**, dirancang dalam konteks sistem **monorepo Mx-Core** dan lingkungan industri pemeliharaan (maintenance) berbasis data.

---

## 🔍 **Struktur Use-Case Plugin `mx-core-ai` dalam Konteks Mx-Core**

Untuk memberikan pemahaman yang terstruktur, setiap use-case akan dijabarkan dengan format:

- **Nama Use-Case**
- **Deskripsi Singkat**
- **Sumber Data**
- **Peran Plugin Lain (Integrasi Mx-Core)**
- **Output AI**
- **Manfaat Bisnis**
- **Nilai Tambah AI**

---

### **1. Predictive Maintenance untuk Equipment Rotating**

- **Deskripsi:** Memprediksi waktu kegagalan (Remaining Useful Life - RUL) pada pompa, kompresor, blower, dll.
- **Sumber Data:** Vibration, suhu bearing, tekanan, RPM, arus motor (dari `mx-core-metric`)
- **Plugin Terkait:**

  - `mx-core-metric` (data),
  - `mx-core-cmms` (scheduling),
  - `mx-core-dashboard` (visualisasi),
  - `mx-core-rbm` (baseline health)

- **Output AI:** Probabilitas kegagalan dalam rentang waktu 7 hari; confidence score; rekomendasi work order.
- **Manfaat Bisnis:** Mengurangi downtime tak terjadwal; menghindari over-maintenance.
- **Nilai Tambah AI:** Pembelajaran dari pola historis & real-time untuk memprediksi dengan presisi tinggi.

---

### **2. Anomaly Detection Real-Time**

- **Deskripsi:** Deteksi dini kelainan performa sebelum terjadi kerusakan.
- **Sumber Data:** Sensor online (temperatur, vibrasi, tekanan, arus motor); API `metric-stream`.
- **Plugin Terkait:**

  - `mx-core-metric`,
  - `mx-core-rbm`,
  - `mx-core-dashboard`

- **Output AI:** Alarm berbasis threshold dinamis; klasifikasi jenis abnormalitas.
- **Manfaat Bisnis:** Deteksi dini kegagalan, respon cepat, tindakan preventif.
- **Nilai Tambah AI:** Model pembelajaran tidak bergantung pada batas statis, tetapi pada pola perubahan data.

---

### **3. Intelligent Work Order Suggestion (AI-Driven CMMS)**

- **Deskripsi:** Rekomendasi otomatis pembuatan work order berdasarkan hasil analitik AI.
- **Sumber Data:** Hasil prediksi AI; histori breakdown; manual SOP.
- **Plugin Terkait:**

  - `mx-core-cmms`,
  - `mx-core-ai`,
  - `mx-core-docs`

- **Output AI:** Draft work order, prioritas level, estimasi lead time dan spare part.
- **Manfaat Bisnis:** Percepatan proses maintenance planning; peningkatan akurasi perencanaan.
- **Nilai Tambah AI:** Decision support berbasis data dan pola historis.

---

### **4. Health Scoring Asset**

- **Deskripsi:** Memberikan skor kesehatan (health index) pada aset kritikal secara berkala.
- **Sumber Data:** Kombinasi metric operasional, histori perawatan, histori kegagalan.
- **Plugin Terkait:**

  - `mx-core-rbm`,
  - `mx-core-dashboard`,
  - `mx-core-cmms`

- **Output AI:** Skor 0–100 untuk setiap equipment; rekomendasi action.
- **Manfaat Bisnis:** Monitoring berkala; fokus ke aset dengan nilai rendah.
- **Nilai Tambah AI:** Penilaian menyeluruh, bukan hanya berbasis satu parameter.

---

### **5. Failure Root-Cause Analysis (AI-Assisted RCA)**

- **Deskripsi:** Membantu engineer melakukan analisis akar masalah dari kegagalan.
- **Sumber Data:** Failure log, data histori sensor, work order, notifikasi sistem.
- **Plugin Terkait:**

  - `mx-core-docs`,
  - `mx-core-cmms`,
  - `mx-core-ai`

- **Output AI:** Kemungkinan penyebab dominan; insight berdasarkan pola sebelumnya.
- **Manfaat Bisnis:** Mempercepat RCA, mengurangi ketergantungan pada pakar.
- **Nilai Tambah AI:** Analitik korelasi multivariat yang sulit dilakukan secara manual.

---

### **6. Natural Language Query ke Sistem Pemeliharaan**

- **Deskripsi:** User (planner/operator) mengakses informasi teknis menggunakan bahasa natural.
- **Sumber Data:** Basis data CMMS, dokumen SOP, hasil prediksi AI.
- **Plugin Terkait:**

  - `mx-core-ai`,
  - `mx-core-docs`,
  - `mx-core-dashboard`

- **Output AI:** Jawaban berbasis teks/grafik; link ke dokumentasi.
- **Manfaat Bisnis:** Efisiensi akses informasi teknis; menurunkan dependency pada interface kompleks.
- **Nilai Tambah AI:** Kemampuan NLP untuk memahami konteks teknikal dan maintenance.

---

### **7. KPI Optimization**

- **Deskripsi:** Menganalisis dampak tindakan maintenance terhadap KPI seperti MTBF, MTTR, availability.
- **Sumber Data:** Data historis perawatan dan performa dari `mx-core-metric`.
- **Plugin Terkait:**

  - `mx-core-metric`,
  - `mx-core-dashboard`,
  - `mx-core-cmms`

- **Output AI:** Simulasi strategi dan pengaruh terhadap KPI.
- **Manfaat Bisnis:** Pengambilan keputusan berbasis impact analysis.
- **Nilai Tambah AI:** Prediktif KPI modeling dan skenario what-if analysis.

---

## 🔄 **Skema Alur Umum AI Plugin dalam Monorepo Mx-Core**

```
+------------------+       +------------------+      +-----------------+
|  Sensor Metrics  | --->  | mx-core-metric    | ---> | mx-core-ai       |
|  & CMMS Data     |       | (streaming/KPI)  |      | (inference)     |
+------------------+       +------------------+      +-----------------+
                                                         |
                                                         v
                                                +------------------+
                                                |  mx-core-cmms     |  ← Action Plan
                                                |  mx-core-dashboard|  ← Visualisasi
                                                |  mx-core-docs     |  ← Dokumentasi
                                                +------------------+
```

---

## ✅ **Kesimpulan Umum**

Plugin `mx-core-ai` dalam arsitektur **monorepo Mx-Core**:

- Bertindak sebagai **AI-driven enabler** yang memperkaya fitur dan insight pada modul lain.
- Dirancang **modular dan opsional**, agar dapat diadopsi bertahap.
- Use-case difokuskan pada **predictive insight, anomaly detection, NLP interface, dan RCA** — selaras dengan kebutuhan industri petrokimia dan manufaktur modern.
