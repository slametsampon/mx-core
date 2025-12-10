## 🎯 **Tujuan Sistem**

**mx-core-metric** adalah platform digital berbasis web untuk:

- **Perencanaan, pencatatan, dan pemantauan KPI** secara menyeluruh lintas departemen
- Mendukung **KPI numerik maupun non-numerik** (kegiatan)
- Memungkinkan **perencanaan jangka panjang (tahunan)** hingga **pemantauan real-time (mingguan/harian)**
- Mendukung sistem **forecast otomatis**, dan pelaporan berbasis unit kerja, waktu, dan performa

---

## 🧭 **Alur Sistem & Proses Data**

### 🟢 1. **Perencanaan KPI Tahunan**

Setiap akhir tahun berjalan, masing-masing departemen melakukan:

- Penetapan **KPI utama tahunan** melalui `kpi_target_annual`
- Contoh KPI:

  - Produksi: Volume produksi = 120.000 ton/tahun
  - Maintenance: RHM = 6.000 jam/tahun
  - K3: Zero accident = 1 (target tercapai)

KPI ini bisa spesifik untuk departemen saja atau hingga ke level `unit` tertentu (misal: Utility, NPG, Syngas, dll)

---

### 🟡 2. **Breakdown KPI ke Bulanan/Mingguan**

Setelah target tahunan ditetapkan, sistem (atau user) melakukan:

- Pembagian target ke **kpi_target** (bulanan/mingguan/harian)
- Contoh:

  - Januari: 10.000 ton (monthly)
  - Minggu 1 Januari: 2.500 ton (weekly)

Pembagian bisa:

- **Otomatis**: sistem bantu pecah target tahunan secara proporsional
- **Manual**: user sesuaikan secara custom per waktu

> Semua breakdown target memiliki referensi ke target tahunan (via `annual_target_id`)

---

### 🟠 3. **Pelaksanaan & Capaian Aktual**

Setiap periode berjalan (misalnya setiap minggu atau bulan):

- User mencatat **aktual capaian KPI** ke `kpi_record`

  - Contoh:

    - Volume produksi Januari = 9.500 ton
    - Audit SOP = dilakukan (value = 1)
    - RHM Unit A = 480 jam

- Jika terjadi gangguan (downtime), user menginput data ke `disturbance_log`:

  - Kategori: electrical, mechanical, dll
  - Sumber: PLN, PGN, internal
  - Durasi (menit)

> Gangguan dapat berdampak langsung pada KPI aktual (misalnya pengurangan RHM)

---

### 🔵 4. **Forecast Capaian Akhir Tahun**

Sistem melakukan kalkulasi otomatis menggunakan:

- Data `kpi_record` bulan/minggu sebelumnya
- Tren pergerakan capaian KPI
- Metode forecasting (`manual`, `linear`, atau algoritma lanjutan)

Output disimpan di `kpi_forecast` dan ditampilkan di dashboard.

---

### 🟣 5. **Dashboard Monitoring**

Manajemen dan user lapangan dapat mengakses dashboard yang menampilkan:

#### 🔍 KPI Overview:

- Target vs Aktual (per bulan, minggu, YTD)
- Capaian % terhadap target tahunan
- KPI kritikal dan deviasi

#### ⚠️ Disturbance Insight:

- Jumlah & durasi gangguan
- Perbandingan internal vs eksternal
- Dampak gangguan ke KPI

#### 📈 Forecast Visualization:

- Estimasi akhir tahun
- Deviasi terhadap target tahunan

#### 📂 Breakdown Hierarki:

- Departemen → Unit → KPI → Waktu

---

## 🧱 **Struktur Data Pendukung**

| Tabel                | Fungsi                                          |
| -------------------- | ----------------------------------------------- |
| `kpi`                | Master definisi KPI (numeric/boolean/status)    |
| `kpi_target_annual`  | Target KPI tahunan                              |
| `kpi_target`         | Target KPI granular (bulanan, mingguan, harian) |
| `kpi_record`         | Aktual pencapaian KPI                           |
| `kpi_forecast`       | Prediksi akhir tahun                            |
| `disturbance_log`    | Catatan gangguan operasional                    |
| `disturbance_source` | Sumber penyebab gangguan                        |
| `unit`               | Lokasi fisik atau plant                         |
| `department`         | Divisi organisasi                               |

---

## 💡 **Contoh Kasus Nyata**

> Departemen Maintenance menetapkan target RHM tahunan 6.000 jam

- Dipecah menjadi target bulanan 500 jam
- Januari: hanya tercapai 480 jam → input ke `kpi_record`
- Gangguan PLN selama 2 jam → input ke `disturbance_log`
- Forecast akhir tahun hanya 5.800 jam → deviasi -200 jam
- Dashboard menyala indikator warning 🚨

---

## ✅ Manfaat Arsitektur Ini

| Fitur                   | Manfaat                                                 |
| ----------------------- | ------------------------------------------------------- |
| 📅 Target multi-level   | Bisa monitor dari tahun hingga harian                   |
| 📊 Forecast & deviasi   | Sistem bantu prediksi tren & intervensi                 |
| ⚠️ Integrasi gangguan   | Menghubungkan gangguan ke penurunan KPI                 |
| 🔁 Fleksibel & scalable | Bisa diadaptasi untuk semua departemen                  |
| 📡 Siap IoT             | Terbuka untuk integrasi sensor langsung ke `kpi_record` |

---

## 🎯 Keunggulan Struktur Ini

- **Skalabel**: bisa bertambah mesin/departemen tanpa ubah skema besar
- **Fleksibel**: mendukung KPI statis dan dinamis (melalui master_kpis)
- **Real-time Ready**: bisa integrasi sensor untuk log gangguan (via MQTT → API → Supabase)
- **Forecast Friendly**: siap digunakan untuk prediksi dan pelaporan manajemen

---

## 🧾 **ERD Script (format dbdiagram.io / DSL)**

```dbml
//////////////////////////////////////////////////
// mx-core-metric ERD - Updated with Latest Models
// Generated from src/models/*.ts
//////////////////////////////////////////////////

Table department {
  id          varchar [pk]
  name        varchar
  created_at  datetime
}

Table unit {
  id            varchar [pk]
  department_id varchar [ref: > department.id]
  name          varchar
  location      varchar
  description   varchar
  is_active     boolean
  created_at    datetime
}

Table disturbance_source {
  id          varchar [pk]
  name        varchar
  type        varchar // 'internal' | 'external'
  description varchar
  is_active   boolean
  created_at  datetime
}

Table disturbance_log {
  id               varchar [pk]
  department_id    varchar [ref: > department.id]
  unit_id          varchar [ref: > unit.id]
  periode          date
  source_id        varchar [ref: > disturbance_source.id]
  duration_minutes int
  category         varchar // 'electrical' | 'mechanical' | 'instrument' | 'utility' | 'other'
  description      varchar
  created_by       varchar
  created_at       datetime
}

Table kpi {
  id          varchar [pk]
  name        varchar
  description varchar
  unit        varchar
  type        varchar // 'numeric' | 'boolean' | 'status'
  is_active   boolean
  created_at  datetime
}

Table kpi_target_annual {
  id            varchar [pk]
  kpi_id        varchar [ref: > kpi.id]
  department_id varchar [ref: > department.id]
  unit_id       varchar [ref: > unit.id]
  year          int
  value         float
  note          varchar
  created_at    datetime
}

Table kpi_target {
  id              varchar [pk]
  annual_target_id varchar [ref: > kpi_target_annual.id]
  kpi_id          varchar [ref: > kpi.id]
  department_id   varchar [ref: > department.id]
  unit_id         varchar [ref: > unit.id]
  periode         date
  granularity     varchar // 'monthly' | 'weekly' | 'daily'
  value           float
  note            varchar
  created_at      datetime
}

Table kpi_record {
  id            varchar [pk]
  kpi_id        varchar [ref: > kpi.id]
  department_id varchar [ref: > department.id]
  unit_id       varchar [ref: > unit.id]
  periode       date
  value         float
  note          varchar
  source        varchar // 'manual' | 'sensor' | 'imported'
  created_by    varchar
  created_at    datetime
}

Table kpi_forecast {
  id               varchar [pk]
  kpi_id           varchar [ref: > kpi.id]
  department_id    varchar [ref: > department.id]
  unit_id          varchar [ref: > unit.id]
  periode          date
  value            float
  method           varchar // 'manual' | 'linear' | 'ml_model'
  annual_target_id varchar [ref: > kpi_target_annual.id]
  created_at       datetime
}
```
