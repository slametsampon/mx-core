- [Komparasi Metode – **5 Whys vs Fishbone Diagram**](#komparasi-metode--5-whys-vs-fishbone-diagram)
  - [Interpretasi Decision-Tree (Ini yang Penting)](#interpretasi-decision-tree-ini-yang-penting)
    - [🔹 Kapan Decision-Tree Mengarah ke **5 Whys**](#-kapan-decision-tree-mengarah-ke-5-whys)
    - [🔹 Kapan Decision-Tree Mengarah ke **Fishbone**](#-kapan-decision-tree-mengarah-ke-fishbone)
  - [Penegasan Teknis (Wajib Konsisten di Artikel)](#penegasan-teknis-wajib-konsisten-di-artikel)
  - [Interpretasi Decision-Tree (Poin Kunci)](#interpretasi-decision-tree-poin-kunci)
    - [🔹 Decision-Tree Mengarah ke **FTA** Jika:](#-decision-tree-mengarah-ke-fta-jika)
    - [🔹 Decision-Tree Mengarah ke **FMEA** Jika:](#-decision-tree-mengarah-ke-fmea-jika)
  - [Penegasan Teknis (Kunci Artikel)](#penegasan-teknis-kunci-artikel)
  - [Kalimat Kunci (Siap Ditanam di Bab Decision-Tree)](#kalimat-kunci-siap-ditanam-di-bab-decision-tree)
  - [Interpretasi Decision-Tree (Ini Inti Navigasi)](#interpretasi-decision-tree-ini-inti-navigasi)
    - [🔹 Decision-Tree Mengarah ke **RCFA** Jika:](#-decision-tree-mengarah-ke-rcfa-jika)
    - [🔹 Decision-Tree Mengarah ke **8D** Jika:](#-decision-tree-mengarah-ke-8d-jika)
    - [🔹 Decision-Tree Mengarah ke **Bowtie** Jika:](#-decision-tree-mengarah-ke-bowtie-jika)
    - [Penegasan Kunci (Wajib Dikunci di Artikel)](#penegasan-kunci-wajib-dikunci-di-artikel)
    - [Kalimat Kunci (Siap Masuk Bab VI – Decision-Tree)](#kalimat-kunci-siap-masuk-bab-vi--decision-tree)

# Komparasi Metode – **5 Whys vs Fishbone Diagram**

_(Kelas Kompleksitas Rendah, RBM-aware)_

| **Domain**     | **Parameter**             | **5 Whys**                           | **Fishbone Diagram (Ishikawa)**                    |
| -------------- | ------------------------- | ------------------------------------ | -------------------------------------------------- |
| **Masalah**    | **Struktur sebab–akibat** | Linear, berurutan, satu rantai sebab | Multivariat eksploratif (belum tervalidasi)        |
| **Masalah**    | **Jumlah jalur penyebab** | Satu jalur dominan                   | Banyak kemungkinan jalur (parallel hypothesis)     |
| **Risiko**     | **Severity**              | Rendah – kegagalan lokal             | Rendah – belum menyentuh konsekuensi sistemik      |
| **Risiko**     | **Potensi eskalasi**      | Rendah, terkendali                   | Rendah, namun _potensi tersembunyi_ bisa muncul    |
| **Sistem**     | **Interlock & barrier**   | Tidak dianalisis                     | Tidak dianalisis secara logika                     |
| **Sistem**     | **Human vs sistem**       | Bias ke teknis / aksi langsung       | Menangkap human, method, dan environment           |
| **Tujuan**     | **Intent keputusan**      | Menemukan **akar penyebab dominan**  | Mengidentifikasi **spektrum kemungkinan penyebab** |
| **Output**     | **Jenis output**          | Satu root cause + corrective action  | Daftar kandidat penyebab (belum diputuskan)        |
| **Governance** | **Audit requirement**     | Minimal, internal                    | Minimal, internal                                  |
| **Governance** | **Dampak keputusan**      | Lokal, operasional                   | Lokal, tahap pra-keputusan                         |

---

## Interpretasi Decision-Tree (Ini yang Penting)

### 🔹 Kapan Decision-Tree Mengarah ke **5 Whys**

- masalah **sudah cukup jelas**,
- dugaan penyebab **sudah mengerucut**,
- tujuan: **menutup masalah secara cepat dan tepat**.

➡️ **Decision intent:** _closure cepat, tanpa eksplorasi luas._

---

### 🔹 Kapan Decision-Tree Mengarah ke **Fishbone**

- masalah **belum jelas arahnya**,
- ada **banyak asumsi awal**,
- perlu **menyatukan persepsi lintas fungsi**.

➡️ **Decision intent:** _exploration sebelum keputusan._

---

## Penegasan Teknis (Wajib Konsisten di Artikel)

> Fishbone **bukan alternatif** dari 5 Whys.
> Fishbone adalah **pra-analisis**,
> sedangkan 5 Whys adalah **analisis keputusan**.

Dalam decision-tree:

- Fishbone **mendahului** 5 Whys,
- **bukan menggantikannya**.

---

> Komparasi Metode – **FTA vs FMEA**

_(Kelas Kompleksitas Sedang, Risk-Based Decision)_

| **Domain**     | **Parameter**             | **Fault Tree Analysis (FTA)**                               | **FMEA (Failure Mode and Effects Analysis)**          |
| -------------- | ------------------------- | ----------------------------------------------------------- | ----------------------------------------------------- |
| **Masalah**    | **Struktur sebab–akibat** | Top-down, logika sebab–akibat terstruktur (AND/OR)          | Bottom-up, berbasis mode kegagalan per komponen       |
| **Masalah**    | **Jumlah jalur penyebab** | Banyak jalur penyebab yang saling berinteraksi              | Banyak mode kegagalan, dianalisis satu per satu       |
| **Risiko**     | **Severity**              | Menengah – dapat menuju risiko tinggi bila eskalasi terjadi | Menengah – dikalkulasi eksplisit (Severity score)     |
| **Risiko**     | **Potensi eskalasi**      | Dievaluasi melalui kombinasi logika kegagalan               | Diantisipasi melalui prioritas RPN                    |
| **Sistem**     | **Interlock & barrier**   | Dianalisis secara eksplisit dalam logika sistem             | Tidak dianalisis sebagai logika sistem                |
| **Sistem**     | **Human vs sistem**       | Fokus sistem & kontrol (human error implisit)               | Human error bisa dimodelkan sebagai failure mode      |
| **Tujuan**     | **Intent keputusan**      | Memahami **bagaimana sistem gagal**                         | Menentukan **apa yang paling berisiko untuk dicegah** |
| **Output**     | **Jenis output**          | Jalur kegagalan kritis & kombinasi penyebab                 | Daftar prioritas risiko (RPN) & preventive action     |
| **Governance** | **Audit requirement**     | Menengah – defensible untuk review teknis                   | Menengah – defensible untuk risk review               |
| **Governance** | **Dampak keputusan**      | Lintas fungsi (operasi, E&I, process)                       | Lintas fungsi (maintenance, reliability, design)      |

---

## Interpretasi Decision-Tree (Poin Kunci)

### 🔹 Decision-Tree Mengarah ke **FTA** Jika:

- masalah **berkaitan dengan kegagalan sistem atau interlock**,
- perlu memahami **kombinasi kejadian yang menyebabkan top event**,
- pertanyaan utama adalah:

> _“Bagaimana sistem ini bisa gagal?”_

➡️ **Decision intent:** _diagnosis logika kegagalan aktual._

---

### 🔹 Decision-Tree Mengarah ke **FMEA** Jika:

- sistem memiliki **banyak potensi kegagalan**,
- perlu **prioritas risiko sebelum kejadian**,
- pertanyaan utama adalah:

> _“Kegagalan mana yang paling berisiko dan harus ditangani dulu?”_

➡️ **Decision intent:** _risk prioritization & prevention._

---

## Penegasan Teknis (Kunci Artikel)

> **FTA dan FMEA bukan alternatif satu sama lain.**
> FTA menjawab _bagaimana kegagalan terjadi_,
> FMEA menjawab _kegagalan mana yang paling berbahaya_.

Dalam decision-tree RBM:

- **FTA** → _failure logic driven_
- **FMEA** → _risk priority driven_

---

## Kalimat Kunci (Siap Ditanam di Bab Decision-Tree)

> _“Gunakan FTA ketika kegagalan sistem perlu dipahami secara logis.
> Gunakan FMEA ketika keputusan harus berbasis prioritas risiko sebelum kegagalan terjadi.”_

---

> Komparasi Metode – **RCFA vs 8D vs Bowtie**

_(Kelas Kompleksitas Tinggi, High-Risk & Governance-Critical)_

| **Domain**     | **Parameter**             | **RCFA (Root Cause Failure Analysis)**                 | **8D Problem Solving**                         | **Bowtie Analysis**                              |
| -------------- | ------------------------- | ------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------ |
| **Masalah**    | **Struktur sebab–akibat** | Mekanisme kegagalan fisik mendalam (failure mechanism) | Multilayer: teknis, manusia, sistem            | Hubungan ancaman → top event → konsekuensi       |
| **Masalah**    | **Jumlah jalur penyebab** | Beberapa jalur teknis saling terkait                   | Banyak jalur lintas fungsi & organisasi        | Banyak jalur ancaman & eskalasi                  |
| **Risiko**     | **Severity**              | Tinggi – kegagalan peralatan kritikal                  | Tinggi – dampak sistemik & berulang            | Tinggi – process safety & major accident         |
| **Risiko**     | **Potensi eskalasi**      | Eskalasi teknis → sistemik                             | Eskalasi organisasi & operasional              | Eskalasi keselamatan, lingkungan, publik         |
| **Sistem**     | **Interlock & barrier**   | Dianalisis sebagai bagian dari kegagalan               | Dievaluasi sebagai bagian proses & disiplin    | Fokus utama: preventive & mitigative barriers    |
| **Sistem**     | **Human vs sistem**       | Dominan sistem & desain (human factor sekunder)        | Human–system–organization seimbang             | Human sebagai barrier & threat                   |
| **Tujuan**     | **Intent keputusan**      | Menentukan **mekanisme kegagalan & redesign teknis**   | Mengendalikan masalah lintas fungsi & budaya   | Mengendalikan risiko melalui barrier             |
| **Output**     | **Jenis output**          | Rekomendasi teknis, redesign, material/spec change     | Action plan D0–D8, governance & accountability | Risk control framework & barrier management      |
| **Governance** | **Audit requirement**     | Tinggi – defensible untuk engineering & regulator      | Tinggi – defensible untuk audit manajemen      | Sangat tinggi – regulator & process safety audit |
| **Governance** | **Dampak keputusan**      | Strategis (CAPEX, redesign, standard change)           | Strategis (policy, SOP, training, culture)     | Strategis (PSM, LOPA alignment, safety case)     |

---

## Interpretasi Decision-Tree (Ini Inti Navigasi)

### 🔹 Decision-Tree Mengarah ke **RCFA** Jika:

- ada **kerusakan fisik nyata**,
- diperlukan pemahaman **bagaimana komponen gagal secara mekanis**,
- keputusan berujung pada **redesign atau engineering change**.

> ❓ _“Mengapa peralatan ini gagal secara teknis?”_

➡️ **Decision intent:** _engineering diagnosis & redesign._

---

### 🔹 Decision-Tree Mengarah ke **8D** Jika:

- kegagalan **berulang atau lintas departemen**,
- akar masalah menyentuh **proses, disiplin, dan koordinasi manusia**,
- perlu **governance & closure formal**.

> ❓ _“Mengapa organisasi gagal mencegah masalah ini?”_

➡️ **Decision intent:** _systemic organizational correction._

---

### 🔹 Decision-Tree Mengarah ke **Bowtie** Jika:

- risiko keselamatan **tidak dapat ditoleransi**,
- perlu memastikan **barrier pencegahan & mitigasi efektif**,
- konteksnya **process safety & major accident hazard**.

> ❓ _“Bagaimana risiko ini dikendalikan sebelum dan sesudah kejadian?”_

➡️ **Decision intent:** _risk control & safety assurance._

---

### Penegasan Kunci (Wajib Dikunci di Artikel)

> **RCFA, 8D, dan Bowtie bukan alternatif satu sama lain.**
> Mereka menjawab **pertanyaan yang berbeda pada level risiko tertinggi**.

- **RCFA** → _engineering failure logic_
- **8D** → _organizational failure discipline_
- **Bowtie** → _risk & barrier integrity_

Decision-tree yang baik **tidak memilih salah satu**,
tetapi **menentukan kapan masing-masing wajib digunakan**.

---

### Kalimat Kunci (Siap Masuk Bab VI – Decision-Tree)

> _“Ketika kegagalan tidak dapat ditoleransi dan keputusan berdampak strategis, pemilihan metode RCA bukan soal preferensi, tetapi soal tanggung jawab teknis dan keselamatan.”_

---
