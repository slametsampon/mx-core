Terima kasih atas update lengkap yang sangat berguna.

Dari informasi terbaru ini — khususnya struktur folder plugin `mx-core-metric`, konfigurasi `plugin.json`, dan pendekatan awal yang sudah sangat matang (termasuk mock JSON untuk simulasi) — saya akan:

---

## ✅ **REVISI DAN PENAJAMAN ROADMAP: `mx-core-metric` (Versi Plugin UI-Only)**

### 📌 TL;DR – Perubahan Penting:

| Area                 | Update                                                  |
| -------------------- | ------------------------------------------------------- |
| 🔗 API               | `api: false` di `plugin.json` → plugin UI-only          |
| 🌐 Data              | Simulasi data via file JSON di `/src/mocks/*.json`      |
| 🧠 Role-based Access | Sudah ada RBAC per-role di `plugin.json`                |
| 🧩 Komponen UI       | Akan dibangun dengan pendekatan _generic form & viewer_ |
| 🗃️ Model TypeScript  | Semua schema sudah didefinisikan di `/src/models/*.ts`  |

---

## 🧭 **A. STRATEGI EKSEKUSI DENGAN KONDISI SAAT INI**

### 1. 🔌 **Plugin UI-Only (tanpa API langsung)**

`plugin.json` menyatakan:

```json
"api": false,
"basePath": "https://mx-core-metric.vercel.app"
```

#### ✅ Implikasi:

- Tidak bertanggung jawab langsung terhadap API/backend
- Fokus di **frontend (Next.js App Router)**
- **Data sementara via mock** (`/mocks/*.json`)
- Backend API tetap disediakan oleh `/apps/backend` (Express)

---

### 2. 📁 **Struktur Plugin Sudah Ideal**

```txt
src/
├── app/                → Next.js App Router
├── components/         → Reusable UI (form, table, chart)
├── data/               → Loader atau hook data
├── mocks/              → JSON simulasi (sementara)
├── models/             → TypeScript model
├── features.ts         → Register fitur/plugin
```

#### 📌 Catatan:

Struktur ini sudah sangat **modular dan clean** – tinggal optimalkan layer data access dan component abstraction.

---

## ⚙️ **B. STRATEGI PENAMPILAN DATA (DARI MOCKS → API)**

---

### 1. ✅ **Mode Simulasi (Development): Load dari `/mocks/*.json`**

#### Langkah:

- Buat `lib/useMockData.ts` (helper hook universal)

```ts
import { useEffect, useState } from 'react';

export function useMockData<T>(filename: string): {
  data: T | null;
  loading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/mocks/${filename}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [filename]);

  return { data, loading };
}
```

#### Contoh penggunaan di halaman:

```ts
const { data, loading } = useMockData<KPIRecord[]>('kpi_record.json');
```

---

### 2. 🔁 **Mode Produksi: Ambil Data dari API di `/apps/backend`**

#### Struktur ideal endpoint di backend:

- `GET /api/kpi-records`
- `POST /api/kpi-records`
- `GET /api/kpi-targets?year=2025`
- `POST /api/disturbance-log`

#### Di frontend:

- Buat helper di `data/useApiData.ts` dan `data/postApiData.ts`
- Gunakan SWR/React Query jika perlu _caching_

---

## 🧱 **C. UI & FORM GENERIK UNTUK TIAP ENTITAS**

### 1. 📋 **Generic Table Viewer**

Komponen: `<KpiTable model="kpi_record" />`

- Kolom berdasarkan model field (`kpi_id`, `periode`, `value`, dll)
- Render dari props atau autodetect dari `models/*.ts`

#### File: `components/table/KpiTable.tsx`

---

### 2. ✍️ **Generic Form Builder**

Komponen: `<KpiForm model="kpi_record" onSubmit={...} />`

- Ambil field dari TypeScript `interface`
- Gunakan komponen form berbasis Tailwind + Headless UI

#### Enhancement:

Gunakan schema dari Zod / JSON Schema jika ingin _form builder_ otomatis (future).

---

### 3. 📊 **KPI Dashboard Komprehensif**

File: `/app/dashboard/page.tsx`

#### Section:

- 📈 KPI Overview → `BarChart`, `LineChart`
- ⚠️ Disturbance Insight → Pie + Table
- 🧮 Forecast Trend → Area Chart
- 📂 Breakdown Hierarki → Dropdown Departemen → Unit → KPI

Gunakan Recharts / ECharts:

```ts
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
```

---

## 🔐 **D. RBAC & Fitur Berdasarkan Role**

RBAC didefinisikan di `plugin.json`:

```json
"rbac": [
  { "role": "Operator", "resource": "kpi", "action": "read" },
  { "role": "Manager", "resource": "kpi", "action": "approve" }
]
```

### 🔐 Implementasi:

1. Buat `lib/useRole.ts` untuk akses role saat ini
2. Buat wrapper:

```tsx
<Access role="Manager" action="approve">
  <ApproveButton />
</Access>
```

3. `Access` mengecek terhadap role aktif + resource dari context/auth

---

## 🔗 **E. Hubungan Plugin dengan `/apps/backend` (Express API)**

Walau plugin ini `api: false`, tetap butuh integrasi ke backend utama:

| Entitas             | Endpoint Backend                       |
| ------------------- | -------------------------------------- |
| `kpi_record`        | `GET/POST /api/kpi-records`            |
| `disturbance_log`   | `GET/POST /api/disturbance-logs`       |
| `kpi_target_annual` | `GET /api/kpi-target-annual?year=2025` |
| `forecast`          | `GET /api/forecast?kpi_id=...`         |

### 📦 Implementasi:

- Endpoint berada di `/apps/backend/src/routes/kpi.ts`
- Gunakan SQLite atau Supabase untuk persistence

---

## ✅ **F. REVISI ROADMAP IMPLEMENTASI**

### 🧩 **Tahap 1: UI Static + Mock**

- ✅ Halaman dashboard (`/app/dashboard`)
- ✅ Load data dari `/mocks/*.json`
- 🔨 Buat `KpiTable`, `KpiForm`, `DisturbanceTable`

---

### 🔁 **Tahap 2: Dynamic Form + Viewer**

- 🔨 Generic form builder untuk semua model
- 🔄 Bisa switch antara "mock mode" vs "live API"
- Buat enum di `.env` misal `MODE=mock | live`

---

### 🖇️ **Tahap 3: Integrasi API Backend**

- 🔌 Hubungkan ke Express API (`/apps/backend`)
- Buat `useApiData`, `postApiData`

---

### 📊 **Tahap 4: Full Dashboard + Charting**

- Line chart, Bar chart KPI per waktu
- Filter berdasarkan tahun, unit, departemen

---

### 📡 **Tahap 5: IoT & Auto Input (optional)**

- Setup MQTT listener → push ke `kpi_record`
- Tambahkan API ingestion `/api/kpi-record/sensor`

---

### ✅ **Tahap 6: Role-based UI + Forecast**

- Gunakan `plugin.json` RBAC
- Tampilkan tombol hanya untuk role tertentu
- Kalkulasi forecast otomatis → tampilkan tren YTD

---

## 🧾 PENUTUP & SARAN

### 💡 Poin Kuat:

- Arsitektur plugin modular
- Desain tabel normalisasi tinggi
- Mocking siap → transisi mudah ke real API
- UI berbasis Next.js App Router → future proof

### 🚀 Saran Tambahan:

- Tambahkan playground page (`/dev`) untuk uji semua komponen form
- Buat storybook / preview UI dari `packages/ui`
- Logging input/output antar role → tracking validasi KPI

---

Jika Anda ingin saya bantu membuat:

- Boilerplate `<GenericForm />` atau
- SWR hook untuk data mock/API switch
- Forecast calculator sederhana (linear regression)

Saya siap bantu.

Terima kasih 🙌
