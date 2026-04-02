---
title: PLC Control Design Core Principles
authors: ['sam']
date: '2026-03-29'
tags:
  [
    'plc-design-principles',
    'control-logic',
    'deterministic-system',
    'industrial-automation',
    'engineering-standard',
  ]
draft: false
summary: Prinsip desain control logic PLC membentuk sistem aturan yang memastikan logic bersifat deterministic, terstruktur, dan aman. Setiap prinsip seperti single responsibility, state persistence, hingga fail-safe saling terhubung dalam satu alur desain dari signal hingga aksi. Pelanggaran terhadap prinsip ini akan menghasilkan dampak nyata seperti instability, ambiguity, dan unsafe behavior di lapangan. Dengan menggunakan checklist evaluasi, engineer dapat menilai kualitas desain sebelum implementasi. Prinsip ini menjadi fondasi untuk seluruh tahap berikutnya, khususnya dalam penyusunan signal dan layering, sehingga desain control dapat konsisten, scalable, dan sesuai dengan standar industri.
---

# 🚀 **_ARTICLE 5: PLC Control Design Core Principles_**

---

- [🚀 **_ARTICLE 5: PLC Control Design Core Principles_**](#-article-5-plc-control-design-core-principles)
  - [1. Objective](#1-objective)
  - [Tujuan akhir](#tujuan-akhir)
  - [2. Position dalam Serial](#2-position-dalam-serial)
  - [Dependency](#dependency)
  - [Peran Artikel](#peran-artikel)
  - [3. Scope / Boundary](#3-scope--boundary)
- [4.1 Kenapa Design Principle Dibutuhkan](#41-kenapa-design-principle-dibutuhkan)
  - [Tujuan](#tujuan)
  - [Problem tanpa prinsip](#problem-tanpa-prinsip)
  - [Root Cause](#root-cause)
  - [Implikasi Engineering](#implikasi-engineering)
- [4.2 Prinsip 1 — Single Responsibility](#42-prinsip-1--single-responsibility)
  - [Definisi](#definisi)
  - [Ilustrasi Separation Logic](#ilustrasi-separation-logic)
  - [Fungsi yang harus dipisah](#fungsi-yang-harus-dipisah)
  - [Pelanggaran](#pelanggaran)
  - [Dampak](#dampak)
  - [Konsekuensi Desain](#konsekuensi-desain)
- [4.3 Prinsip 2 — Deterministic Logic](#43-prinsip-2--deterministic-logic)
  - [Definisi](#definisi-1)
  - [Basis (Artikel 4)](#basis-artikel-4)
  - [Ilustrasi Deterministic vs Non-Deterministic](#ilustrasi-deterministic-vs-non-deterministic)
  - [Pelanggaran](#pelanggaran-1)
  - [Dampak](#dampak-1)
  - [Konsekuensi Desain](#konsekuensi-desain-1)
- [4.4 Prinsip 3 — No Cross Dependency](#44-prinsip-3--no-cross-dependency)
  - [Definisi](#definisi-2)
  - [Ilustrasi Dependency Logic](#ilustrasi-dependency-logic)
  - [Dependency yang Benar](#dependency-yang-benar)
  - [Karakteristik](#karakteristik)
  - [Pelanggaran](#pelanggaran-2)
  - [Dampak](#dampak-2)
  - [Konsekuensi Desain](#konsekuensi-desain-2)
- [4.5 Prinsip 4 — State Persistence](#45-prinsip-4--state-persistence)
  - [Definisi](#definisi-3)
  - [Ilustrasi State Persistence](#ilustrasi-state-persistence)
  - [Kenapa Penting](#kenapa-penting)
  - [Contoh State](#contoh-state)
  - [Pelanggaran](#pelanggaran-3)
  - [Dampak](#dampak-3)
  - [Implikasi Engineering](#implikasi-engineering-1)
  - [Konsekuensi Desain](#konsekuensi-desain-3)
- [4.6 Prinsip 5 — Separation of Control, Protection, Safety](#46-prinsip-5--separation-of-control-protection-safety)
  - [Definisi](#definisi-4)
  - [Mapping (LOPA — Artikel 2)](#mapping-lopa--artikel-2)
  - [Ilustrasi Separation](#ilustrasi-separation)
  - [Pelanggaran](#pelanggaran-4)
  - [Dampak](#dampak-4)
  - [Implikasi Engineering](#implikasi-engineering-2)
  - [Konsekuensi Desain](#konsekuensi-desain-4)
- [4.7 Prinsip 6 — Control Authority](#47-prinsip-6--control-authority)
  - [Definisi](#definisi-5)
  - [Ilustrasi Multiple Command Source](#ilustrasi-multiple-command-source)
  - [Sumber Command](#sumber-command)
  - [Pelanggaran](#pelanggaran-5)
  - [Dampak](#dampak-5)
  - [Implikasi Engineering](#implikasi-engineering-3)
  - [Konsekuensi Desain](#konsekuensi-desain-5)
- [4.8 Prinsip 7 — Fail-Safe Thinking](#48-prinsip-7--fail-safe-thinking)
  - [Definisi](#definisi-6)
  - [Ilustrasi Fail-Safe Concept](#ilustrasi-fail-safe-concept)
  - [Kondisi Failure](#kondisi-failure)
  - [Contoh Implementasi](#contoh-implementasi)
  - [Pelanggaran](#pelanggaran-6)
  - [Dampak](#dampak-6)
  - [Implikasi Engineering](#implikasi-engineering-4)
  - [Konsekuensi Desain](#konsekuensi-desain-6)
- [4.9 Prinsip 8 — Interface Separation](#49-prinsip-8--interface-separation)
  - [Definisi](#definisi-7)
  - [Ilustrasi Interface Separation](#ilustrasi-interface-separation)
  - [Pelanggaran](#pelanggaran-7)
  - [Dampak](#dampak-7)
  - [Implikasi Engineering](#implikasi-engineering-5)
  - [Konsekuensi Desain](#konsekuensi-desain-7)
- [4.10 Prinsip 9 — Signal Transformation](#410-prinsip-9--signal-transformation)
  - [Definisi](#definisi-8)
  - [Ilustrasi Signal Transformation](#ilustrasi-signal-transformation)
  - [Contoh](#contoh)
  - [Pelanggaran](#pelanggaran-8)
  - [Dampak](#dampak-8)
  - [Implikasi Engineering](#implikasi-engineering-6)
  - [Konsekuensi Desain](#konsekuensi-desain-8)
- [4.11 Prinsip 10 — Readability \& Maintainability](#411-prinsip-10--readability--maintainability)
  - [Definisi](#definisi-9)
  - [Ilustrasi Readable vs Non-Readable Logic](#ilustrasi-readable-vs-non-readable-logic)
  - [Faktor Penentu](#faktor-penentu)
  - [Pelanggaran](#pelanggaran-9)
  - [Dampak](#dampak-9)
  - [Implikasi Engineering](#implikasi-engineering-7)
  - [Konsekuensi Desain](#konsekuensi-desain-9)
- [4.12 Hubungan Antar Prinsip (SYSTEM VIEW)](#412-hubungan-antar-prinsip-system-view)
  - [Tujuan](#tujuan-1)
  - [Flow Desain](#flow-desain)
  - [Mapping ke Prinsip](#mapping-ke-prinsip)
  - [Ilustrasi System Design Flow](#ilustrasi-system-design-flow)
  - [Implikasi Engineering](#implikasi-engineering-8)
- [4.13 Design Consequence (CRITICAL)](#413-design-consequence-critical)
  - [Tujuan](#tujuan-2)
  - [Prinsip Utama](#prinsip-utama)
  - [Dampak Pelanggaran](#dampak-pelanggaran)
  - [Ilustrasi Design vs Behaviour](#ilustrasi-design-vs-behaviour)
  - [Implikasi Engineering](#implikasi-engineering-9)
- [4.14 Design Evaluation Checklist (WAJIB)](#414-design-evaluation-checklist-wajib)
  - [Tujuan](#tujuan-3)
  - [Checklist](#checklist)
  - [Ilustrasi Evaluation Framework](#ilustrasi-evaluation-framework)
  - [Implikasi](#implikasi)
- [4.15 Kesalahan Fundamental yang Dicegah oleh Prinsip Ini](#415-kesalahan-fundamental-yang-dicegah-oleh-prinsip-ini)
  - [Daftar Kesalahan](#daftar-kesalahan)
  - [Implikasi Engineering](#implikasi-engineering-10)
- [4.16 Transition ke Artikel Berikutnya](#416-transition-ke-artikel-berikutnya)
  - [Arah Pembelajaran](#arah-pembelajaran)

---

## 1. Objective

Mendefinisikan seperangkat prinsip dasar dalam desain control logic PLC yang:

- memastikan logic deterministic
- mencegah pencampuran fungsi
- menjaga konsistensi antar engineer
- membentuk standar evaluasi desain

---

## Tujuan akhir

```text id="goal_a5"
Engineer mampu:
- mendesain logic secara benar sejak awal
- mengidentifikasi kesalahan desain
- mengevaluasi kualitas ladder secara sistematis
```

---

## 2. Position dalam Serial

Artikel ini adalah:

```text id="bridge_a5"
bridge antara:
- understanding (Artikel 1–4)
dan
- design implementation (Artikel 6–8)
```

---

## Dependency

- Article 1 → system
- Article 2 → LOPA
- Article 3 → architecture
- Article 4 → execution model

---

## Peran Artikel

```text id="role_a5"
menjadi rule engine untuk seluruh desain berikutnya
```

---

## 3. Scope / Boundary

---

✓ Dibahas

- prinsip desain control logic
- hubungan antar variabel
- constraint dalam desain
- konsekuensi pelanggaran
- evaluasi desain

---

---

✓ Tidak dibahas

- signal detail
- layering
- workflow
- implementasi ladder

---

# 4.1 Kenapa Design Principle Dibutuhkan

---

## Tujuan

Menjelaskan kebutuhan rule dalam desain PLC

---

## Problem tanpa prinsip

---

✓ 1. Variasi antar engineer

- solusi berbeda untuk kasus yang sama

---

✓ 2. Logic tidak terstruktur

- permissive bercampur trip
- alarm mempengaruhi control

---

✓ 3. Sulit troubleshooting

---

✓ 4. Tidak scalable

---

## Root Cause

```text id="root_a5"
tidak adanya rule desain yang konsisten
```

---

## Implikasi Engineering

```text id="imp_a5"
desain PLC harus mengikuti prinsip,
bukan preferensi individu
```

---

# 4.2 Prinsip 1 — Single Responsibility

---

## Definisi

```text id="sr_def"
setiap logic block hanya memiliki satu fungsi
```

---

## Ilustrasi Separation Logic

![Image](https://cdn.automationforum.co/uploads/2025/06/Explore-how-permissive-logic-and-trip-interlocks-ensure-safe-equipment-operation-in-DCS-PLC-and-SIS-based-automation-systems.-1-scaled.jpg)

---

## Fungsi yang harus dipisah

- permissive
- trip
- alarm
- command
- latch

---

## Pelanggaran

```text id="sr_violation"
permissive + trip dalam satu rung
```

---

## Dampak

- ambiguity
- debugging sulit

---

## Konsekuensi Desain

---

- logic harus dipecah sebelum implementasi
- setiap fungsi dibuat sebagai block terpisah

---

# 4.3 Prinsip 2 — Deterministic Logic

---

## Definisi

```text id="det_def"
output harus selalu predictable untuk input yang sama
```

---

## Basis (Artikel 4)

- cyclic execution
- sequential execution

---

## Ilustrasi Deterministic vs Non-Deterministic

![Image](https://res.cloudinary.com/codecrucks/images/c_scale%2Cw_625%2Ch_278%2Cdpr_2/f_webp%2Cq_auto/v1671265262/determinstic-vs-non-deterministic/determinstic-vs-non-deterministic.png?_i=AA)

---

## Pelanggaran

- output tergantung urutan tidak jelas
- dependency implicit

---

## Dampak

- unpredictable behaviour
- sulit diuji

---

## Konsekuensi Desain

---

- urutan logic harus eksplisit
- dependency harus jelas
- tidak boleh ada ambiguity

---

# 4.4 Prinsip 3 — No Cross Dependency

---

## Definisi

```text id="ncd_def"
logic tidak boleh bergantung pada layer atau keputusan setelahnya
```

---

## Ilustrasi Dependency Logic

![Image](https://8.eewimg.cn/news/uploadfile/2025/0923/20250923092054157.jpg)

---

## Dependency yang Benar

```text id="dep_flow"
Input → Command → Permissive → Latch → Trip
```

---

## Karakteristik

- alur satu arah
- tidak ada feedback ke layer sebelumnya

---

## Pelanggaran

---

✓ 1. Permissive bergantung pada RUN_LATCH

---

✓ 2. Alarm bergantung pada output

---

✓ 3. Command dipengaruhi state setelahnya

---

## Dampak

```text id="ncd_impact"
- circular logic
- oscillation
- behaviour tidak stabil
```

---

## Konsekuensi Desain

---

- dependency harus linear
- tidak boleh ada loop dalam logic
- urutan harus mengikuti layer

---

# 4.5 Prinsip 4 — State Persistence

---

## Definisi

```text id="sp_def"
PLC harus menyimpan state antar scan cycle
```

---

## Ilustrasi State Persistence

![Image](https://cdn.automationforum.co/uploads/2018/12/latchiing.png)

![Image](https://www.allaboutcircuits.com/uploads/articles/latch-the-control-circuit.jpg)

---

## Kenapa Penting

- PLC bekerja secara cyclic (Artikel 4)
- tanpa state → sistem tidak memiliki memori

---

## Contoh State

- RUN_LATCH
- TRIP_ACTIVE

---

## Pelanggaran

```text id="sp_violation"
output langsung mengikuti pushbutton
```

---

## Dampak

- motor hanya ON saat tombol ditekan
- sistem tidak usable
- tidak stabil

---

## Implikasi Engineering

- semua aksi harus berbasis state
- bukan hanya input langsung

---

## Konsekuensi Desain

---

- gunakan latch untuk mempertahankan kondisi
- pisahkan antara:

  - command
  - state

---

# 4.6 Prinsip 5 — Separation of Control, Protection, Safety

---

## Definisi

```text id="sep_def"
Control ≠ Protection ≠ Safety
```

---

## Mapping (LOPA — Artikel 2)

| Domain     | Fungsi           |
| ---------- | ---------------- |
| Control    | operasi normal   |
| Protection | trip / interlock |
| Safety     | SIS              |

---

## Ilustrasi Separation

![Image](https://www.researchgate.net/publication/270572366/figure/fig1/AS%3A295110446206979%401447371221461/Architecture-of-Basic-Process-Control-System-BPCS-and-Risk-Reduction-Layer-SIS-for-a.png)

![Image](https://www.researchgate.net/profile/Adalberto-Ospino/publication/336886693/figure/fig1/AS%3A826711956537344%401574114898003/Safety-layers-of-protection-gies-Vasquez-et-al-2013-Industrial-plant-safety-involves.png)

---

## Pelanggaran

---

✓ 1. Safety logic diimplementasikan di BPCS tanpa awareness

---

✓ 2. Alarm mempengaruhi control

---

✓ 3. Trip bercampur dengan control logic

---

## Dampak

```text id="sep_impact"
- unsafe system
- desain tidak compliant
- pelanggaran prinsip LOPA
```

---

## Implikasi Engineering

- setiap fungsi harus berada pada domain yang benar
- tidak boleh overlap tanpa justifikasi

---

## Konsekuensi Desain

---

- control logic hanya untuk operasi
- protection untuk menjaga sistem
- safety harus independent (SIS)

---

# 4.7 Prinsip 6 — Control Authority

---

## Definisi

```text id="ca_def"
harus jelas siapa yang memiliki kontrol terhadap sistem
```

---

## Ilustrasi Multiple Command Source

![Image](https://control.com/uploads/thumbnails/Thumbnail_29_5.jpg)

---

## Sumber Command

- local (pushbutton)
- remote (HMI / SCADA)
- sequence (auto logic)

---

## Pelanggaran

---

✓ 1. Multiple command tanpa arbitration

---

✓ 2. Dua command aktif bersamaan

---

## Dampak

```text id="ca_impact"
- konflik command
- behaviour tidak konsisten
- sulit diprediksi
```

---

## Implikasi Engineering

- harus ada satu sumber aktif
- harus ada mekanisme seleksi

---

## Konsekuensi Desain

---

- gunakan logic arbitration
- definisikan priority command

---

# 4.8 Prinsip 7 — Fail-Safe Thinking

---

## Definisi

```text id="fs_def"
sistem harus menuju kondisi aman saat terjadi failure
```

---

## Ilustrasi Fail-Safe Concept

![Image](https://cdn.automationforum.co/uploads/2025/06/Understanding-Fail-Safe-Logic-in-Industrial-Automation-Systems-1-scaled.jpg)

---

## Kondisi Failure

- loss signal
- power loss
- communication failure

---

## Contoh Implementasi

---

✓ 1. Permissive hilang → stop

---

✓ 2. Feedback tidak muncul → trip

---

## Pelanggaran

---

✓ 1. Sistem tetap berjalan saat fault

---

✓ 2. Tidak ada reaction terhadap abnormal condition

---

## Dampak

```text id="fs_impact"
- dangerous condition
- equipment damage
- safety risk
```

---

## Implikasi Engineering

- semua kondisi abnormal harus dipertimbangkan
- desain harus mengantisipasi failure

---

## Konsekuensi Desain

---

- default state harus aman
- semua logic harus mempertimbangkan failure

---

# 4.9 Prinsip 8 — Interface Separation

---

## Definisi

```text id="is_def"
I/O ≠ Logic ≠ Communication
```

---

## Ilustrasi Interface Separation

![Image](https://control.com/uploads/articles/image3_29_7.jpg)

---

## Pelanggaran

---

✓ 1. HMI langsung mengontrol output

---

✓ 2. PLC logic bergantung langsung pada communication

---

## Dampak

```text id="is_impact"
- bypass logic
- sistem tidak robust
- dependency eksternal tinggi
```

---

## Implikasi Engineering

- semua signal harus melalui control layer
- tidak boleh ada direct access

---

## Konsekuensi Desain

---

- I/O hanya interface
- communication hanya integrasi
- control layer pusat keputusan

---

# 4.10 Prinsip 9 — Signal Transformation

---

## Definisi

```text id="st_def"
Raw Signal → Conditioned Signal → Decision
```

---

## Ilustrasi Signal Transformation

![Image](https://www.analog.com/en/_/media/images/analog-dialogue/en/volume-40/number-3/articles/precision-plc-signal-processing-data-conversion/precision-plc-signal-processing-data-conversion_fig01.jpg?rev=ab6c201f401e43bca61f188b981efe05&sc_lang=en)

---

## Contoh

---

✓ 1. Digital

- MCC_RDY → MCC_HEALTHY

---

✓ 2. Analog

- PT101 → SUCT_PRESS_LOW

---

## Pelanggaran

---

✓ 1. Raw signal langsung digunakan

---

## Dampak

```text id="st_impact"
- logic kompleks
- tidak reusable
- sulit dibaca
```

---

## Implikasi Engineering

- semua signal harus dikondisikan sebelum digunakan

---

## Konsekuensi Desain

---

- wajib ada layer conditioning
- pisahkan raw vs logic signal

---

# 4.11 Prinsip 10 — Readability & Maintainability

---

## Definisi

```text id="rm_def"
logic harus dapat dipahami oleh engineer lain
```

---

## Ilustrasi Readable vs Non-Readable Logic

![Image](https://cdn.prod.website-files.com/63dea6cb95e58cb38bb98cbd/6830777728b9763b99de72f5_AD_4nXcOLkF1sL4E0EQ2lWACzOG6SHW4ngny9iGytOQC5J0aHbPIdxz_kGBSqaq7VR59iPiBCy63VQvsjK-ueVBROaECYw7aOBnqqGF5K-UC7opRNvf6eLUs99faUN0sHHvh5UNF9nUPLQ.png)

![Image](https://www.altexsoft.com/static/content-image/2024/12/62bfa363-b579-429e-940d-937b8a62b99e.png)

![Image](https://cdn.prod.website-files.com/670526c69cb938e8bd8b4754/68481a4d8d2149316f373142_10th_June_2025_E.jpg)

---

## Faktor Penentu

- struktur
- naming
- layering

---

## Pelanggaran

---

✓ 1. Logic hanya dipahami pembuat

---

## Dampak

```text id="rm_impact"
- sulit maintenance
- risiko tinggi saat modifikasi
- knowledge tidak transferable
```

---

## Implikasi Engineering

- logic harus menjadi dokumentasi hidup
- harus bisa dibaca tanpa penjelasan tambahan

---

## Konsekuensi Desain

---

- gunakan struktur konsisten
- gunakan naming yang jelas
- gunakan layering

---

# 4.12 Hubungan Antar Prinsip (SYSTEM VIEW)

---

## Tujuan

Menggabungkan seluruh prinsip menjadi satu sistem desain yang utuh

---

## Flow Desain

```text id="flow_a5"
Signal
→ Conditioned Signal
→ Decision Logic
→ State
→ Action
```

---

## Mapping ke Prinsip

| Stage    | Prinsip                             |
| -------- | ----------------------------------- |
| Signal   | Signal Transformation               |
| Decision | Deterministic + No Cross Dependency |
| State    | State Persistence                   |
| Action   | Single Responsibility               |
| System   | Separation + Authority              |

---

## Ilustrasi System Design Flow

![Image](https://www.mdpi.com/actuators/actuators-14-00201/article_deploy/html/images/actuators-14-00201-g006-550.jpg)

![Image](https://www.researchgate.net/publication/3421718/figure/fig1/AS%3A394703557152775%401471116069563/Structure-of-a-typical-industrial-automation-system.png)

---

## Implikasi Engineering

```text id="system_view"
semua prinsip tidak berdiri sendiri,
tetapi membentuk sistem desain terintegrasi
```

---

# 4.13 Design Consequence (CRITICAL)

---

## Tujuan

Menghubungkan prinsip dengan dampak nyata di lapangan

---

## Prinsip Utama

```text id="main_dc"
design error selalu muncul sebagai behaviour error di lapangan
```

---

## Dampak Pelanggaran

---

✓ 1. Ambiguity

- logic tidak jelas
- sulit dianalisis

---

✓ 2. Instability

- output berubah-ubah
- tidak konsisten

---

✓ 3. Unsafe Behaviour

- sistem beroperasi saat tidak aman

---

✓ 4. Non-Deterministic Output

- hasil tidak dapat diprediksi

---

## Ilustrasi Design vs Behaviour

![Image](https://www.ic-components.com/upfile/images/89/20260128163940785.jpg)

![Image](https://www.researchgate.net/profile/Jamie-Brown-24/publication/318966440/figure/fig9/AS%3A525128301199360%401502211751039/Automation-Bias-adapted-from-Wickens-et-al65.png)

---

## Implikasi Engineering

- kualitas desain langsung menentukan behaviour sistem
- error tidak muncul di code, tetapi di operasi

---

# 4.14 Design Evaluation Checklist (WAJIB)

---

## Tujuan

Memberikan tool evaluasi praktis untuk engineer

---

## Checklist

```text id="chk_a5"
[ ] 1 logic = 1 fungsi?
[ ] dependency satu arah?
[ ] output deterministic?
[ ] state disimpan?
[ ] control/protection/safety terpisah?
[ ] authority jelas?
[ ] fail-safe sudah dipertimbangkan?
[ ] tidak ada bypass dari HMI/comm?
[ ] signal sudah dikondisikan?
[ ] logic readable?
```

---

## Ilustrasi Evaluation Framework

![Image](https://cdn.automationforum.co/uploads/2026/01/PLC-Permissive-Logic-Troubleshooting-Procedure-for-Instrumentation-Engineers-4-1024x670.jpg)

---

## Implikasi

```text id="eval_imp"
engineer dapat mengevaluasi logic tanpa melihat implementasi detail
```

---

# 4.15 Kesalahan Fundamental yang Dicegah oleh Prinsip Ini

---

## Daftar Kesalahan

---

✓ 1. Mixing Logic

- permissive + trip + alarm

---

✓ 2. Direct Control

- input langsung mengontrol output

---

✓ 3. No Latch

- tidak ada state

---

✓ 4. Hidden Dependency

- dependency tidak terlihat

---

✓ 5. Unsafe Assumption

- menganggap sistem aman tanpa validasi

---

✓ 6. Poor Structure

- logic tidak terorganisir

---

## Implikasi Engineering

```text id="error_prevent"
semua kesalahan ini dicegah jika prinsip diikuti secara konsisten
```

---

# 4.16 Transition ke Artikel Berikutnya

---

Artikel berikutnya akan membahas:

```text id="next_a5"
bagaimana signal disusun dan diklasifikasikan
agar dapat digunakan dalam control logic secara benar
```

---

## Arah Pembelajaran

```text id="flow_next_a5"
dari:
design principles

menuju:
signal architecture
```

---

<small>
  **_Catatan Penyusunan_** Artikel ini disusun sebagai materi edukasi dan
  referensi umum berdasarkan berbagai sumber pustaka, praktik lapangan, serta
  bantuan alat penulisan. Pembaca disarankan untuk melakukan verifikasi lanjutan
  dan penyesuaian sesuai dengan kondisi serta kebutuhan masing-masing sistem.
</small>
