Baik. Kita mulai dari **WBS overhaul API pump multi-stage** yang _implementatif_ dan siap diturunkan menjadi **sequence + durasi + CPM**.

Agar WBS ini “nyambung” ke CPM, saya susun dengan prinsip:

- **Definisinya jelas (deliverable-based)**, bukan sekadar “aktivitas umum”.
- Setiap item **bisa diberi durasi** dan **punya predecessor/successor**.
- Memuat kontrol **SHE** (Permit, JSA, LOTO) dan kewaspadaan **cairan mudah terbakar** (rujuk praktik aman penanganan area pompa di service hidrokarbon; selaras dengan prinsip pengendalian sumber nyala dan housekeeping yang juga relevan pada NFPA 30).

> **Asumsi minimum untuk studi kasus ini (boleh Anda ubah):**
> Pompa API multi-stage (BB3/BB4/BB5 atau sejenis), service hidrokarbon, overhaul di workshop, scope: bearing+seal+inspection rotor/casing, alignment & commissioning.

---

## 1) WBS Overhaul API Pump Multi-Stage (Level 1–3)

### **1.0 Inisiasi & Perencanaan**

- **1.1 Kick-off pekerjaan**

  - 1.1.1 Konfirmasi scope, batasan, target waktu (SLA/TA window)
  - 1.1.2 Ketersediaan drawing/manual, data vibrasi, histori failure

- **1.2 Persiapan dokumen kerja**

  - 1.2.1 Job Plan / Work Instruction (WI)
  - 1.2.2 JSA/JHA + hazard register (termasuk potensi kebakaran/flash fire)
  - 1.2.3 Permit plan (PTW): hot work/cold work/confined space bila relevan

- **1.3 Material & resource readiness**

  - 1.3.1 Kesiapan spare part kit (bearing, seal, gasket, O-ring)
  - 1.3.2 Kesiapan alat khusus (puller, dial gauge, micrometer, torque wrench)
  - 1.3.3 Kesiapan jasa balancing/alignment (jika outsource)

---

### **2.0 Isolasi, Depressurize, Drain & Make Safe (SHE Gate 1)**

- **2.1 Persiapan area kerja**

  - 2.1.1 Barricade, signage, spill kit, fire extinguisher readiness
  - 2.1.2 Gas test / LEL check (bila hidrokarbon volatil)

- **2.2 Isolasi energi & fluida**

  - 2.2.1 LOTO electrical (MCC/Local isolator)
  - 2.2.2 Isolasi proses: block valve, blind/spade (sesuai prosedur)
  - 2.2.3 Depressurize & drain ke sistem yang disetujui (closed drain/slop)

- **2.3 Flushing/purging (jika disyaratkan)**

  - 2.3.1 Flushing line/pump casing
  - 2.3.2 Purging inert (N₂) bila relevan untuk safety

> **Hold Point SHE Gate 1:** pekerjaan mekanik hanya boleh mulai setelah “energy zero” dan kondisi aman terverifikasi.

---

### **3.0 Dismantling & Removal**

- **3.1 Persiapan pelepasan**

  - 3.1.1 Marking coupling & shim record
  - 3.1.2 Lepas coupling guard

- **3.2 Lepas coupling & alignment check awal**

  - 3.2.1 Uncouple motor–pump
  - 3.2.2 Catat as-found alignment (baseline)

- **3.3 Lepas instrumen/auxiliary**

  - 3.3.1 Seal support system (flush plan/API plan), tubing, cooling line
  - 3.3.2 Bearing RTD/vibration probe (jika ada)

- **3.4 Lifting/rigging dan removal**

  - 3.4.1 Rigging plan + lifting execution
  - 3.4.2 Transport ke workshop/maintenance bay

---

### **4.0 Workshop Overhaul**

- **4.1 Cleaning & incoming inspection**

  - 4.1.1 External cleaning/degreasing
  - 4.1.2 Nameplate check, dimensional baseline record

- **4.2 Dismantle internal**

  - 4.2.1 Buka casing sesuai manual (multi-stage casing)
  - 4.2.2 Lepas rotor/shaft assembly
  - 4.2.3 Lepas impeller/diffuser/stage components

- **4.3 Inspection & measurement**

  - 4.3.1 Visual + NDT (PT/MT) area kritikal (sesuai kebutuhan)
  - 4.3.2 Dimensional check: shaft runout, wear ring clearance, impeller fit
  - 4.3.3 Bearing housing check, seal chamber check

- **4.4 Corrective action / repair**

  - 4.4.1 Replace bearing set
  - 4.4.2 Replace mechanical seal / cartridge seal
  - 4.4.3 Replace wear ring / sleeve (bila out of tolerance)
  - 4.4.4 Repair minor (lapping, polishing, deburring) sesuai acceptance criteria

- **4.5 Reassembly**

  - 4.5.1 Assemble stage-by-stage (impeller/diffuser)
  - 4.5.2 Set axial clearance/end float
  - 4.5.3 Torqueing sesuai prosedur (torque map)

- **4.6 Testing di workshop (bila tersedia)**

  - 4.6.1 Run test / hydrotest casing (jika disyaratkan)
  - 4.6.2 Dynamic balancing rotor (jika disyaratkan/indikasi vibrasi)

> **Hold Point Quality Gate:** release hanya setelah hasil inspeksi & clearance memenuhi acceptance criteria.

---

### **5.0 Re-Installation di Lapangan**

- **5.1 Foundation & baseplate readiness**

  - 5.1.1 Check level baseplate, soft foot check
  - 5.1.2 Grout check (bila ada)

- **5.2 Install pump**

  - 5.2.1 Rigging install ke baseplate
  - 5.2.2 Initial alignment (rough)

- **5.3 Reconnect auxiliary & piping**

  - 5.3.1 Reconnect seal plan (flush, cooler, filter)
  - 5.3.2 Reconnect instrument (RTD/vibration)
  - 5.3.3 Piping strain check (nozzle load) bila prosedur tersedia

---

### **6.0 Commissioning & Start-up (SHE Gate 2)**

- **6.1 Pre-commissioning**

  - 6.1.1 Lube oil fill/flush (bearing housing)
  - 6.1.2 Seal system readiness (flush pressure/flow)
  - 6.1.3 Rotation check, bump test

- **6.2 Final alignment**

  - 6.2.1 Final alignment cold (dial/laser)
  - 6.2.2 Re-check setelah tightening & piping connected

- **6.3 Start-up & performance monitoring**

  - 6.3.1 Controlled start (operational procedure)
  - 6.3.2 Monitor: vibration, bearing temp, seal leakage, flow/pressure
  - 6.3.3 Stabilization run & handover ke operasi

> **Hold Point SHE Gate 2:** start-up hanya jika permit closed-out, guarding terpasang, dan proteksi kebakaran/LEL aman.

---

### **7.0 Close-out & Lessons Learned**

- **7.1 Dokumentasi**

  - 7.1.1 As-found vs as-left data, clearance sheet, alignment report
  - 7.1.2 Update CMMS: failure code, action, spare usage

- **7.2 Evaluasi reliabilitas**

  - 7.2.1 RCA singkat (jika failure-driven)
  - 7.2.2 Rekomendasi PdM (vibration/oil analysis interval)

---

## Output WBS yang Akan Kita Pakai untuk CPM

Agar nanti mudah dibuat CPM, kita akan pilih item WBS “level aktivitas” (biasanya Level 3) yang:

- punya durasi tunggal,
- punya ketergantungan jelas,
- bisa dipantau di harian TA.

Jika Anda setuju, langkah berikutnya:

1. Saya turunkan WBS Level-3 menjadi daftar aktivitas CPM (mis. A01…A25).
2. Kita buat **sequence predecessor–successor** dan **durasi realistis** (jam/hari).

---

Baik — kita pakai **asumsi standar workshop**. Saya akan turunkan WBS tadi menjadi **daftar aktivitas CPM** yang siap dipakai untuk:

- sequence (predecessor/successor),
- durasi,
- diagram CPM (node & panah),
- perhitungan jalur kritikal.

> **Satuan durasi**: jam kerja efektif (work-hour), dengan asumsi 1 shift 8 jam (nanti bisa kita konversi ke hari TA).

---

# 1) Daftar Aktivitas CPM (Turunan WBS) — Standar Workshop

Saya beri kode **A01…A24** agar rapi saat membuat network CPM.

## A. Inisiasi, SHE Gate, dan Make Safe

**A01** Kick-off & konfirmasi scope + dokumen (manual/drawing, histori) — **1 jam**
**A02** JSA/JHA + Permit Plan + LOTO plan disetujui (SHE readiness) — **2 jam**
**A03** Persiapan area kerja (barricade, spill kit, APAR, gas test bila perlu) — **1 jam**
**A04** Isolasi energi & proses (LOTO electrical + isolasi valve/blind) — **2 jam**
**A05** Depressurize & drain + verifikasi “energy zero” (SHE Gate 1) — **2 jam**

## B. Removal & Transport ke Workshop

**A06** Lepas coupling guard + marking + catat shim record — **1 jam**
**A07** Uncouple + as-found alignment check (baseline) — **1 jam**
**A08** Lepas instrument & seal auxiliary (seal plan tubing/cooling/RTD) — **2 jam**
**A09** Rigging & removal pump dari baseplate — **2 jam**
**A10** Transport ke workshop + receiving — **1 jam**

## C. Workshop Overhaul (core)

**A11** External cleaning & degreasing + nameplate check — **2 jam**
**A12** Dismantle casing & internal disassembly multi-stage — **4 jam**
**A13** Inspection & measurement (clearance sheet: runout, wear ring, sleeve) — **4 jam**
**A14** NDT spot check (PT/MT area kritikal bila diperlukan) — **3 jam**
**A15** Part assessment + final spare pick/issue (bearing, seal, gasket, O-ring) — **2 jam**
**A16** Replace bearing set + bearing housing check — **3 jam**
**A17** Replace mechanical seal (cartridge) + seal chamber check — **3 jam**
**A18** Rework minor (polish/deburr/lapping) sesuai temuan _minor_ — **3 jam**
**A19** Reassembly stage-by-stage + set axial/end float + torque map — **6 jam**
**A20** QC/inspection as-left + clearance verification (Quality Gate) — **2 jam**

## D. Return, Install, Commissioning & Start-up

**A21** Transport balik ke lapangan + staging — **1 jam**
**A22** Install pump (rigging on baseplate) + rough alignment — **3 jam**
**A23** Reconnect piping & auxiliary (seal plan/instrument) + strain check basic — **3 jam**
**A24** Pre-commissioning + final alignment + start-up monitoring (SHE Gate 2) — **6 jam**

## E. Close-out

**A25** Close-out dokumentasi (alignment report, clearance sheet, CMMS update) — **2 jam**

---

# 2) Struktur WBS yang “Nyambung ke CPM”

Secara WBS, aktivitas di atas mewakili deliverable utama:

- **2.0 Make Safe 완료** → A01–A05
- **3.0 Removal 완료** → A06–A10
- **4.0 Workshop Overhaul 완료** → A11–A20
- **5.0 Re-Install + Commissioning 완료** → A21–A24
- **7.0 Close-out 완료** → A25

---

# 3) Catatan Praktis untuk TA / SHE (Supaya WBS ini realistis)

1. **A02 & A05** adalah _hold point_; tanpa itu aktivitas mekanik tidak boleh jalan (praktik SHE).
2. Untuk service hidrokarbon, **A03–A05** harus memastikan kontrol sumber nyala, drain yang benar, dan verifikasi aman sebelum pembongkaran (praktik sejalan dengan prinsip pengendalian bahaya cairan mudah terbakar).
3. **A20 (Quality Gate)** wajib sebelum reinstall — ini yang sering jadi akar rework bila dilewati.

---

Baik — kita pakai **asumsi standar workshop**. Saya akan turunkan WBS tadi menjadi **daftar aktivitas CPM** yang siap dipakai untuk:

- sequence (predecessor/successor),
- durasi,
- diagram CPM (node & panah),
- perhitungan jalur kritikal.

> **Satuan durasi**: jam kerja efektif (work-hour), dengan asumsi 1 shift 8 jam (nanti bisa kita konversi ke hari TA).

---

# 1) Daftar Aktivitas CPM (Turunan WBS) — Standar Workshop

Saya beri kode **A01…A24** agar rapi saat membuat network CPM.

## A. Inisiasi, SHE Gate, dan Make Safe

**A01** Kick-off & konfirmasi scope + dokumen (manual/drawing, histori) — **1 jam**
**A02** JSA/JHA + Permit Plan + LOTO plan disetujui (SHE readiness) — **2 jam**
**A03** Persiapan area kerja (barricade, spill kit, APAR, gas test bila perlu) — **1 jam**
**A04** Isolasi energi & proses (LOTO electrical + isolasi valve/blind) — **2 jam**
**A05** Depressurize & drain + verifikasi “energy zero” (SHE Gate 1) — **2 jam**

## B. Removal & Transport ke Workshop

**A06** Lepas coupling guard + marking + catat shim record — **1 jam**
**A07** Uncouple + as-found alignment check (baseline) — **1 jam**
**A08** Lepas instrument & seal auxiliary (seal plan tubing/cooling/RTD) — **2 jam**
**A09** Rigging & removal pump dari baseplate — **2 jam**
**A10** Transport ke workshop + receiving — **1 jam**

## C. Workshop Overhaul (core)

**A11** External cleaning & degreasing + nameplate check — **2 jam**
**A12** Dismantle casing & internal disassembly multi-stage — **4 jam**
**A13** Inspection & measurement (clearance sheet: runout, wear ring, sleeve) — **4 jam**
**A14** NDT spot check (PT/MT area kritikal bila diperlukan) — **3 jam**
**A15** Part assessment + final spare pick/issue (bearing, seal, gasket, O-ring) — **2 jam**
**A16** Replace bearing set + bearing housing check — **3 jam**
**A17** Replace mechanical seal (cartridge) + seal chamber check — **3 jam**
**A18** Rework minor (polish/deburr/lapping) sesuai temuan _minor_ — **3 jam**
**A19** Reassembly stage-by-stage + set axial/end float + torque map — **6 jam**
**A20** QC/inspection as-left + clearance verification (Quality Gate) — **2 jam**

## D. Return, Install, Commissioning & Start-up

**A21** Transport balik ke lapangan + staging — **1 jam**
**A22** Install pump (rigging on baseplate) + rough alignment — **3 jam**
**A23** Reconnect piping & auxiliary (seal plan/instrument) + strain check basic — **3 jam**
**A24** Pre-commissioning + final alignment + start-up monitoring (SHE Gate 2) — **6 jam**

## E. Close-out

**A25** Close-out dokumentasi (alignment report, clearance sheet, CMMS update) — **2 jam**

---

# 2) Struktur WBS yang “Nyambung ke CPM”

Secara WBS, aktivitas di atas mewakili deliverable utama:

- **2.0 Make Safe 완료** → A01–A05
- **3.0 Removal 완료** → A06–A10
- **4.0 Workshop Overhaul 완료** → A11–A20
- **5.0 Re-Install + Commissioning 완료** → A21–A24
- **7.0 Close-out 완료** → A25

---

# 3) Catatan Praktis untuk TA / SHE (Supaya WBS ini realistis)

1. **A02 & A05** adalah _hold point_; tanpa itu aktivitas mekanik tidak boleh jalan (praktik SHE).
2. Untuk service hidrokarbon, **A03–A05** harus memastikan kontrol sumber nyala, drain yang benar, dan verifikasi aman sebelum pembongkaran (praktik sejalan dengan prinsip pengendalian bahaya cairan mudah terbakar).
3. **A20 (Quality Gate)** wajib sebelum reinstall — ini yang sering jadi akar rework bila dilewati.

---

Baik — kita lanjut ke **Step 2: sequence (predecessor–successor) + durasi**. Saya susun dengan asumsi **standar workshop** dan _logic_ yang lazim pada overhaul **API pump multi-stage** (service hidrokarbon).

Agar implementatif untuk CPM, saya gunakan relasi dominan **Finish-to-Start (FS)**. Nanti jika Anda ingin lebih realistis, kita bisa tambahkan SS/FF (mis. pekerjaan dokumen berjalan paralel).

---

## 2) Sequence Aktivitas (Predecessor) + Durasi

**Konvensi:**

- **FS** = successor mulai setelah predecessor selesai.
- Durasi = **jam kerja efektif**.

### A. Inisiasi & Make Safe (SHE Gate 1)

| Kode | Aktivitas                                                              | Durasi | Predecessor (FS) | Catatan Praktis                  |
| ---- | ---------------------------------------------------------------------- | -----: | ---------------- | -------------------------------- |
| A01  | Kick-off & konfirmasi scope/dokumen                                    |      1 | –                | Mulai pekerjaan                  |
| A02  | JSA/JHA + Permit Plan + LOTO plan approved                             |      2 | A01              | _Hold point dokumen_             |
| A03  | Persiapan area kerja (barricade, spill kit, APAR, gas test bila perlu) |      1 | A02              | Wajib sebelum isolasi/dismantle  |
| A04  | Isolasi energi & proses (LOTO electrical + isolasi proses)             |      2 | A03              | _Energy isolation_               |
| A05  | Depressurize & drain + verifikasi “energy zero” (SHE Gate 1)           |      2 | A04              | _Hold point: aman untuk bongkar_ |

---

### B. Removal & Transport ke Workshop

| Kode | Aktivitas                                                        | Durasi | Predecessor (FS) | Catatan Praktis                   |
| ---- | ---------------------------------------------------------------- | -----: | ---------------- | --------------------------------- |
| A06  | Lepas coupling guard + marking + catat shim record               |      1 | A05              | Data shim penting untuk reinstall |
| A07  | Uncouple + as-found alignment check                              |      1 | A06              | Baseline evaluasi misalignment    |
| A08  | Lepas instrument & seal auxiliary (seal plan/tubing/cooling/RTD) |      2 | A07              | Pastikan blind/plug rapi          |
| A09  | Rigging & removal pump dari baseplate                            |      2 | A08              | Ikuti rigging plan                |
| A10  | Transport ke workshop + receiving                                |      1 | A09              | Masuk tahap workshop              |

---

### C. Workshop Overhaul (dengan paralel yang realistis)

| Kode | Aktivitas                                                             | Durasi | Predecessor (FS) | Catatan Praktis                                   |
| ---- | --------------------------------------------------------------------- | -----: | ---------------- | ------------------------------------------------- |
| A11  | External cleaning & degreasing + nameplate check                      |      2 | A10              | Menghindari kontaminasi saat ukur                 |
| A12  | Dismantle casing & internal disassembly multi-stage                   |      4 | A11              | Tahap kritikal (butuh skill)                      |
| A13  | Inspection & measurement (clearance sheet: runout, wear ring, sleeve) |      4 | A12              | Output: data keputusan repair                     |
| A14  | NDT spot check (PT/MT bila perlu)                                     |      3 | A13              | Bisa dipicu oleh temuan A13                       |
| A15  | Part assessment + final spare pick/issue                              |      2 | A13              | **Paralel** dengan A14 dimungkinkan               |
| A16  | Replace bearing set + bearing housing check                           |      3 | A15              | Syarat: spare bearing siap                        |
| A17  | Replace mechanical seal (cartridge) + seal chamber check              |      3 | A15              | Syarat: seal kit siap                             |
| A18  | Rework minor (polish/deburr/lapping) sesuai temuan minor              |      3 | A14              | Jika NDT tidak wajib, bisa dibuat “optional gate” |
| A19  | Reassembly stage-by-stage + set axial/end float + torque map          |      6 | A16, A17, A18    | **Join point** (harus tunggu semua)               |
| A20  | QC/inspection as-left + clearance verification (Quality Gate)         |      2 | A19              | _Hold point_ sebelum keluar workshop              |

**Catatan penting untuk CPM:**

- Setelah **A13**, ada cabang paralel:

  - Cabang 1: **A14 → A18**
  - Cabang 2: **A15 → A16 dan A15 → A17**

- **A19** menunggu semua cabang selesai (**merge**).

---

### D. Return, Install, Commissioning & Start-up (SHE Gate 2)

| Kode | Aktivitas                                                                | Durasi | Predecessor (FS) | Catatan Praktis                              |
| ---- | ------------------------------------------------------------------------ | -----: | ---------------- | -------------------------------------------- |
| A21  | Transport balik ke lapangan + staging                                    |      1 | A20              | Release QC wajib                             |
| A22  | Install pump (rigging on baseplate) + rough alignment                    |      3 | A21              | Pastikan soft foot check saat awal           |
| A23  | Reconnect piping & auxiliary (seal plan/instrument) + strain check basic |      3 | A22              | Nozzle load jangan “dipaksa”                 |
| A24  | Pre-commissioning + final alignment + start-up monitoring (SHE Gate 2)   |      6 | A23              | Include bump test, guarding, monitoring awal |

---

### E. Close-out

| Kode | Aktivitas                                                              | Durasi | Predecessor (FS) | Catatan Praktis                                      |
| ---- | ---------------------------------------------------------------------- | -----: | ---------------- | ---------------------------------------------------- |
| A25  | Close-out dokumentasi (alignment report, clearance sheet, CMMS update) |      2 | A24              | Bisa dibuat paralel sebagian, tapi kita buat FS dulu |

---

## 2.1 Ringkasan Durasi Total (baseline)

Jika dikerjakan seri murni (tanpa paralel), total = penjumlahan semua durasi.
Namun pada network ini ada paralel (A14 vs A15, dan A16/A17 paralel sebagian), sehingga total proyek **ditentukan oleh jalur terpanjang** (critical path) — itu yang akan kita hitung pada Step 4.

---

Baik — kita masuk **Step 3: Membuat CPM lengkap** (model **AON – Activity on Node**), lalu langsung saya siapkan agar **Step 4 (perhitungan jalur kritikal)** tinggal dihitung.

Di bawah ini saya berikan:

1. **Diagram CPM (AON) dalam bentuk teks** yang jelas (mudah dipindah ke artikel/MDX)
2. **Daftar dependensi** (untuk verifikasi)
3. **Check-point SHE & Quality Gate** (untuk realisme TA)

---

# 3) Diagram CPM Overhaul API Pump Multi-Stage (AON)

**Legenda:**

- Kotak = aktivitas (Axx) + durasi
- Panah = hubungan **FS**
- Cabang = aktivitas paralel
- Merge = aktivitas menunggu beberapa predecessor

---

## 3.1 Alur Utama (serial sampai inspeksi)

**START**
→ **A01 (1h)** Kick-off
→ **A02 (2h)** JSA/JHA + Permit + LOTO plan approved _(SHE readiness)_
→ **A03 (1h)** Persiapan area kerja
→ **A04 (2h)** Isolasi energi & proses (LOTO + isolasi proses)
→ **A05 (2h)** Depressurize & drain + verifikasi “energy zero” _(SHE Gate 1)_
→ **A06 (1h)** Lepas guard + marking + shim record
→ **A07 (1h)** Uncouple + as-found alignment
→ **A08 (2h)** Lepas instrument & seal auxiliary
→ **A09 (2h)** Rigging & removal
→ **A10 (1h)** Transport ke workshop
→ **A11 (2h)** Cleaning + nameplate check
→ **A12 (4h)** Dismantle internal multi-stage
→ **A13 (4h)** Inspection & measurement (clearance sheet)

Sampai **A13** ini jalur masih satu garis.

---

## 3.2 Cabang Paralel Setelah Inspeksi (A13)

Setelah **A13**, network bercabang menjadi **dua jalur**:

### Jalur 1 — NDT + Rework minor

**A13**
→ **A14 (3h)** NDT spot check (PT/MT bila perlu)
→ **A18 (3h)** Rework minor (polish/deburr/lapping)

### Jalur 2 — Spare assessment + replacement

**A13**
→ **A15 (2h)** Part assessment + spare issue
↘︎ **A16 (3h)** Replace bearing set
↘︎ **A17 (3h)** Replace mechanical seal (cartridge)

Catatan: **A16 dan A17 paralel** (dua workstream berbeda) setelah A15.

---

## 3.3 Merge Point (Join) Menuju Reassembly & Start-up

Aktivitas berikutnya **menunggu semua cabang selesai**:

**A16, A17, A18**
→ **A19 (6h)** Reassembly + set axial/end float + torque map
→ **A20 (2h)** QC/inspection as-left _(Quality Gate)_
→ **A21 (1h)** Transport balik ke lapangan
→ **A22 (3h)** Install + rough alignment
→ **A23 (3h)** Reconnect piping & auxiliary + strain check basic
→ **A24 (6h)** Pre-comm + final alignment + start-up monitoring _(SHE Gate 2)_
→ **A25 (2h)** Close-out dokumentasi (CMMS + report)
→ **FINISH**

---

# 3.4 Representasi “Network” Ringkas (Format CPM yang sangat mudah dibaca)

Untuk kebutuhan artikel, format ini biasanya paling enak:

- START → A01 → A02 → A03 → A04 → A05 → A06 → A07 → A08 → A09 → A10 → A11 → A12 → A13
- A13 → A14 → A18
- A13 → A15 → A16
- A13 → A15 → A17
- (A16, A17, A18) → A19 → A20 → A21 → A22 → A23 → A24 → A25 → FINISH

---

# 3.5 Checklist Validasi CPM (agar tidak ada “logic hole”)

✅ A05 (make safe) harus selesai sebelum dismantling (A06)
✅ A10 harus selesai sebelum workshop start (A11)
✅ A13 adalah “decision gate” yang memicu spare & NDT
✅ A19 tidak boleh mulai sebelum: bearing done + seal done + rework minor done
✅ QC release (A20) harus selesai sebelum reinstall (A22)

---

# Berikutnya: Step 4 — Hitung Jalur Terpanjang & Tentukan Critical Path

Langkah berikutnya saya akan lakukan **perhitungan CPM lengkap**:

1. **Forward Pass**: ES/EF tiap aktivitas
2. **Backward Pass**: LS/LF tiap aktivitas
3. **Total Float**
4. **Critical Path = float 0**
5. Durasi total proyek (berdasarkan jalur terpanjang)

Saya lanjutkan langsung ke perhitungan numeriknya (ES/EF/LS/LF) memakai durasi jam yang sudah kita sepakati.
