## ✅ **Membuat Roadmap Detail** (bukan langsung dieksekusi sembarangan)

Kenapa?

1. **Visibilitas tinggi** → tampilan utama = representasi kualitas aplikasi
2. **Sumber data kompleks (VIEW)** → rawan error kalau tidak dirancang rapi
3. **Bisa berkembang** → akan ada chart, filter, agregat, akses role, dsb
4. **Perlu kolaborasi antar tim** → frontend, backend, bahkan data analyst

---

### 🎯 Tujuan Roadmap

- Mendefinisikan **komponen utama dashboard**
- Menentukan **data view apa saja** yang ditampilkan
- Menyusun **UI/UX** untuk prioritas informasi
- Merancang **struktur kode yang scalable**
- Menyiapkan **API & service yang optimal**

---

## 🗺️ ROADMAP DASHBOARD (Ringkas)

### 🔹 Tahap 1: Design dan Struktur Data

| Task                           | Detail                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------- |
| 🧱 Identifikasi kebutuhan user | View mana yang penting (misal: `v_kpi_record_detail`, `v_department_kpi_target`) |
| 🔍 Audit data view             | Pastikan semua field sudah relevan & efisien (SELECT minimalis)                  |
| 🧾 Rancang layout dashboard    | Apakah: table? cards? charts? grid by department?                                |
| 📄 Dokumentasi data            | Buat deskripsi singkat per view dan relasi data di Notion/Markdown               |

---

### 🔹 Tahap 2: Backend Preparation

| Task                                                             | Detail |
| ---------------------------------------------------------------- | ------ |
| 🔒 Tambah endpoint read-only `/api/view/:name` (✅ Done tadi)    |        |
| 🧪 Tambahkan limit, filter (query params), pagination jika perlu |        |
| ✅ Buat service handler `fetchView(name)` di frontend            |        |
| 📦 Siapkan mock / fallback jika Postgres down (optional)         |        |

---

### 🔹 Tahap 3: Frontend UI/UX

| Task                                    | Detail                                                                    |
| --------------------------------------- | ------------------------------------------------------------------------- |
| 📊 Komponen DashboardPage               | Satu komponen utama (misal `DashboardPage`) yang memuat banyak sub-bagian |
| 🧩 Komponen per view                    | Contoh: `DepartmentTargetTable`, `KpiForecastChart`, dll                  |
| 🎛️ Tambah filtering sederhana           | Dropdown: year, department, KPI, granularity                              |
| 🎨 Gunakan Tailwind + Card style layout | Sesuaikan dengan style `mx-core-metric` sekarang                          |

---

### 🔹 Tahap 4: Opsional & Optimalisasi

| Task                                     | Detail                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| ⚙️ Caching view (Next.js + SWR atau ISR) | Untuk view statis seperti KPI annual target                                       |
| 📈 Tambahkan chart (Bar, Line, Pie)      | Pakai [Chart.js](https://www.chartjs.org/) atau [Recharts](https://recharts.org/) |
| 🛡️ Role-based access                     | Manager hanya bisa lihat departemennya sendiri                                    |
| 🧪 Testing Dashboard                     | Simulasi data besar (1000+ records), respon API, fallback UI                      |
| 📤 Export to Excel/CSV                   | Untuk kebutuhan pelaporan user                                                    |

---

## 📌 Prioritas Implementasi

1. ✅ Endpoint View (`/api/view/:name`)
2. ✅ Service fetch di frontend (`fetchView(name)`)
3. 🧩 Komponen Dashboard per view
4. 🎛️ Filtering dasar
5. 📈 Visualisasi (next step)

---

## 🚀 Lanjut?

Jika kamu setuju roadmap ini, saya bisa bantu:

- 🧭 Breakdown task ke Trello/Jira/Notion
- 🧱 Setup struktur folder di `mx-core-metric/src/app/dashboard`
- 🧪 Siapkan mock data dan testing plan

Cukup bilang:
**"Lanjut ke Task 1"** atau
**"Buatkan struktur awalnya"**
dan kita langsung mulai eksekusi roadmap ini dengan rapi dan profesional.
