Baik — saya terima koreksi Anda. Roadmap sebelumnya memang **terlalu “mengusulkan struktur baru”** sehingga **tidak matching** dengan outline artikel yang sudah ada (Bab 1–7) dan berisiko mengganggu koherensi Bab 3 dan Bab 5.

Di bawah ini saya buat **roadmap upgrade yang akurat, cermat, dan trace-able** dengan dua prinsip kunci:

1. **Outline inti TIDAK diubah** (Bab 1–7 tetap).
2. Materi baru (**AOA, AON, Case Study overhaul API pump multi-stage**) ditambahkan sebagai **subsection/insert** pada bab yang paling tepat, tanpa merusak alur artikel.

---

# ROADMAP UPGRADE AKURAT (MATCH OUTLINE BAB 1–7)

## A. Aturan “Traceability” (Dikunci Sebagai Rujukan)

Agar upgrade konsisten dan bisa diaudit:

1. **Tidak mengubah nomor bab utama (1–7).**
2. Setiap materi baru harus punya:

   - **Lokasi penempatan (Bab.Subbab)**
   - **Tujuan pembelajaran** (apa yang selesai dipahami pembaca)
   - **Artefak** (gambar/diagram/tabel)
   - **Acceptance Criteria** (indikator “selesai dan benar”)

3. **Bab 3 tetap fokus implementasi TA**, bukan teori murni.
4. **Bab 5 tetap fokus evaluatif (keuntungan/tantangan)**, bukan lokasi utama materi definisi AOA/AON.

---

# B. Pemetaan Materi Diskusi → Lokasi dalam Artikel (Yang Benar)

## 1) Materi **AON & AOA**

**Lokasi paling tepat:** **Bab 2 (Konsep Dasar CPM)**
Karena AON/AOA adalah **representasi network** (konsep dasar), bukan langkah implementasi.

> Jadi: AON/AOA masuk Bab 2 sebagai perluasan terminologi + network representation.

## 2) Materi **Case Study Overhaul API Pump Multi-Stage**

**Lokasi paling tepat:** **Bab 4 (Studi Kasus Implementasi CPM)**
Karena Bab 4 memang ruang untuk “aplikasi nyata”.
Studi kasus generik TA yang ada sekarang bisa:

- **tetap dipertahankan sebagai “Studi Kasus A (Ringkas)”**, dan
- Overhaul pump menjadi **“Studi Kasus B (Industrial Detail)”**.

Dengan cara ini, artikel jadi “one-stop”: ada contoh makro (TA) dan mikro (equipment overhaul).

---

# C. Roadmap Upgrade Per Bab (Tanpa Merusak Outline)

## ✅ BAB 2 — Konsep Dasar CPM (Upgrade AON/AOA disisipkan di sini)

### 2.1 Terminologi dalam CPM (Tambahan kecil)

**Tambahkan 2 istilah baru:**

- **AON (Activity-on-Node)**
- **AOA (Activity-on-Arrow)**

**Artefak:** definisi singkat + 1 paragraf konteks TA/process plant.

**Acceptance criteria:**

- Pembaca paham: “Node itu bisa aktivitas (AON) atau event (AOA)”.

---

### 2.2 Langkah-langkah Utama dalam CPM (Tambahan “mini-bridge”)

**Tambahkan subbagian baru (tanpa mengganti struktur Bab 2):**

#### **2.2.x Representasi Jaringan: PDM (AON) vs AOA**

Isi minimal yang wajib ada:

- Apa itu **PDM** (Precedence Diagramming Method) → AON
- Apa itu **Event-Oriented Network** → AOA
- Kapan dipakai di petrokimia:

  - **AON**: planning, TA execution schedule, Primavera/MSP
  - **AOA**: start-up/shutdown logic, commissioning sequence

**Artefak:**

- **Tabel perbandingan AON vs AOA** (ringkas, 6–8 baris)

**Acceptance criteria:**

- Pembaca bisa memilih: “untuk TA schedule gunakan AON; untuk start-up logic bisa AOA”.

---

### 2.3 (Bagian “Pembuatan Jaringan Aktivitas / Activity Network” di Bab 2)

Saat ini Anda sudah punya gambar `diagram-activity.png`.

**Upgrade yang tepat (tidak merusak):**

- Pertahankan gambar existing sebagai contoh umum.
- Tambahkan 1 paragraf: “Gambar ini adalah AON/PDM style”.
- Tambahkan 1 gambar tambahan: contoh **AOA kecil** (5–7 aktivitas) untuk menunjukkan beda simbol.

**Acceptance criteria:**

- Pembaca melihat dua gaya diagram dan tidak bingung.

---

## ✅ BAB 3 — Langkah-langkah Implementasi CPM dalam TA (Bab ini jangan “dipenuhi teori”)

Bab 3 harus tetap “praktis”, maka AON/AOA di sini **hanya dipakai sebagai cara kerja**, bukan definisi.

### 3.2 Pembuatan Diagram Jaringan (Upgrade)

Tambahkan sub-subsection implementatif:

#### **3.2.x Checklist kualitas network (TA-ready)**

Isi:

- Pastikan predecessor/successor lengkap
- Hindari logic hole
- Tandai **hold point SHE** (LOTO/energy zero, PTW gate)
- Tandai **quality gate** (QC release sebelum reinstall)

**Artefak:** checklist bullet (10–12 item).

**Acceptance criteria:**

- Network yang dibuat pembaca bisa dipakai untuk monitoring harian, bukan sekadar gambar.

---

### 3.4 Identifikasi Jalur Kritikal (Upgrade dengan referensi node time)

Tambahkan satu blok penjelasan ringkas tentang:

- **Forward pass**: ES/EF
- **Backward pass**: LS/LF
- **Float = LS-ES**

**Artefak:** tabel formula kecil (tanpa panjang).

**Acceptance criteria:**

- Pembaca bisa menghitung ES/EF/LS/LF pada contoh kecil.

> Catatan: Detail “tiga angka di node lingkaran” lebih cocok ditempatkan sebagai _callout_ di Bab 2 atau Bab 3.4 (bukan Bab 5).

---

## ✅ BAB 4 — Studi Kasus Implementasi CPM dalam TA (Masuknya Case Study Overhaul Pump)

### 4.0 Struktur Bab 4 (Upgrade minimal, tetap dalam Bab 4)

Usulan penempatan (tanpa mengganggu studi kasus yang ada):

#### **4.1 Studi Kasus A — Turn Around skala pabrik (existing)**

Biarkan seperti sekarang, mungkin dipadatkan sedikit bila perlu.

#### **4.2 Studi Kasus B — Overhaul API Pump Multi-Stage (Industrial Detail)**

Ini inti upgrade dari diskusi kita.

Isi subbagian yang _trace-able_:

- **4.2.1 Scope & asumsi standar workshop**
- **4.2.2 WBS Overhaul (A01–A25)**
- **4.2.3 Sequencing + Durasi**
- **4.2.4 Diagram CPM AON (gambar network lengkap)**
- **4.2.5 Perhitungan Critical Path (ringkas tapi lengkap)**

  - tampilkan jalur kritikal final (mis. A01→…→A25)
  - tampilkan durasi total proyek

- **4.2.6 Lesson learned untuk TA execution**

  - apa yang harus dimonitor harian
  - contoh “recovery action” bila aktivitas kritikal slip

**Artefak wajib Bab 4.2:**

- WBS table (A01–A25)
- Predecessor table
- Gambar CPM AON
- (Opsional) mini AOA versi ringkas untuk menunjukkan event-based view

**Acceptance criteria:**

- Case study ini bisa dipakai planner untuk membuat schedule pump overhaul nyata.

---

## ✅ BAB 5 — Keuntungan dan Tantangan (Bab ini tidak boleh jadi tempat teori AON/AOA)

Di Bab 5, materi AON/AOA dan case study hanya dipakai sebagai **bukti/argumen**, bukan dijelaskan ulang.

### 5.1 Keuntungan (Upgrade berbasis bukti dari case study)

Tambahkan “evidence-based bullets”:

- Contoh: “Pada case pump, merge point A19 menunjukkan mengapa paralel workstream penting…”
- Contoh: “Hold point SHE Gate mencegah rework/incident…”

### 5.2 Tantangan (Upgrade realistis TA)

Tambahkan tantangan yang benar-benar terjadi:

- dependency salah → jalur kritikal salah
- data durasi tidak akurat
- resource bottleneck (crane, rigging crew, seal specialist)
- rework akibat QC gate tidak disiplin

**Acceptance criteria:**

- Bab 5 terasa seperti evaluasi pengalaman lapangan, bukan generik.

---

## ✅ BAB 6 — Tools & Sumber Daya (Upgrade ringan)

Tambahkan 1 sub-subsection:

### 6.x “Tool mapping: AON/AOA di software”

- Nyatakan: Primavera/MSP dominan AON (PDM)
- AOA sering digambar manual/engineering logic diagram

Tambahkan rekomendasi: template Excel predecessor list → import ke MSP/Primavera.

---

## ✅ BAB 7 — Kesimpulan (Upgrade ringkas)

Tambahkan 2 kalimat:

- CPM efektif bila network valid (dependency + gates)
- Case study pump menunjukkan CPM bisa dipakai pada level equipment untuk monitoring TA

---

# D. Deliverables Roadmap (Agar Trace-able)

## Deliverable 1 — Bab 2 (AON/AOA Pack)

- Definisi AON/AOA + tabel perbandingan
- 1 mini gambar AOA + 1 mini gambar AON

## Deliverable 2 — Bab 4 (Case Study Pack)

- WBS A01–A25
- Sequence + durasi + predecessor table
- CPM AON diagram lengkap (gambar)
- Ringkasan critical path & total duration

## Deliverable 3 — Bab 3 & Bab 5 (Practical Integration Pack)

- Checklist kualitas network (Bab 3.2)
- Formula forward/backward pass ringkas (Bab 3.4)
- Evidence-based advantages/tantangan (Bab 5) yang merujuk case study

---

# E. Quality Gate (Supaya “One-Stop Reference” Bukan Klaim)

Artikel dianggap “one-stop reference” jika memenuhi:

1. Pembaca paham **AON vs AOA** dan kapan dipakai.
2. Pembaca bisa membuat **WBS → predecessor → network → critical path** dari contoh nyata.
3. Pembaca mendapat checklist TA-relevant: **SHE gate + quality gate**.
4. Bab 5 memberi insight yang bisa dipakai untuk mitigasi jadwal, bukan sekadar daftar umum.

---

## Langkah berikutnya (tanpa mengubah struktur besar)

Saya sarankan kita eksekusi roadmap mulai dari yang paling aman dan berdampak:

1. **Tambahkan Bab 2: AON vs AOA** (paket definisi + tabel + 2 ilustrasi mini)
2. **Tambahkan Bab 4.2: Case Study Overhaul Pump** (WBS→sequence→AON→critical path)

Kalau Anda setuju, saya langsung tuliskan **konten siap tempel (MDX)** untuk:

- **Bab 2 (AON/AOA)** lengkap, termasuk tabel dan caption gambar,
  atau langsung ke
- **Bab 4.2 (Case Study Pump)** lengkap sampai diagram & hasil critical path.

Anda pilih mulai dari **Bab 2** atau **Bab 4.2**.
