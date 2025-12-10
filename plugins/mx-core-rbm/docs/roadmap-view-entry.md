Dengan senang hati. Berikut ini adalah **langkah-langkah rinci, sistematis, dan berurutan** untuk membangun **halaman Configuration yang komprehensif** berdasarkan data, model, dan arsitektur yang telah Anda sediakan.

---

## ✅ TUJUAN UTAMA

Membuat halaman `Configuration` yang mendukung:

- Entry dan view untuk 5 entitas utama (`Asset Category`, `Asset Type`, `Asset Type Schema`, `Asset`, `Asset Detail`)
- **Dinamis berbasis schema**
- **Switchable antara `mock` dan `live` backend** menggunakan `.env`
- Modular dan reusable

---

## 🧭 LANGKAH RINCI DAN BERURUTAN

### I. 🔧 **Konfigurasi Environment (MODE_DATA)**

1. Tambahkan ke `.env.local`:

   ```env
   MODE_DATA=mock
   ```

2. Buat file `src/config.ts`:

   ```ts
   export const MODE_DATA = process.env.MODE_DATA || 'mock';
   export const isMock = MODE_DATA === 'mock';

   export const API_BASE = isMock ? '/mocks' : 'https://api.yourdomain.com';
   export const SCHEMA_BASE = isMock
     ? '/schemas/asset-types'
     : 'https://api.yourdomain.com/schema';
   ```

---

### II. ♻️ **Refactor Service Layer agar switchable**

> Gunakan `API_BASE`, `SCHEMA_BASE` dari `config.ts` pada semua service.

Contoh refactor: `assetService.ts`

```ts
import { API_BASE } from '@/config';
import { Asset } from '@/models/asset';
import { logger } from '@/utils/logger';

export async function fetchAssetsByType(assetTypeId: string): Promise<Asset[]> {
  const url = `${API_BASE}/assets/${assetTypeId}.json`;
  logger.info(`📥 Fetching asset list from: ${url}`);
  // ... (rest of the logic)
}
```

🔁 Lakukan hal serupa untuk:

- `assetDetailDataService.ts`
- `assetTypeService.ts`
- `assetTypeSchemaService.ts`

---

### III. 🧱 **Struktur Halaman `ConfigurationPage.tsx`**

> Komponen utama berisi dropdown, tab navigasi, form dan tabel.

#### Struktur UI:

```
<ConfigurationPage>
  ├── <SelectCategory />
  ├── <SelectAssetType />
  └── <Tabs>
       ├── Tab "Asset Type Schema"
       ├── Tab "PPC Strategy"
       ├── Tab "Spare Parts"
       ├── Tab "Asset"
       └── Tab "Asset Detail"
```

#### 1. Pilih Kategori Aset

```tsx
<SelectCategory value={selectedCategory} onChange={setSelectedCategory} />
```

- Ambil dari `asset-type.json`, filter by `category_id`.

#### 2. Pilih Asset Type (terkait dengan category)

```tsx
<SelectAssetType
  category={selectedCategory}
  value={selectedAssetTypeId}
  onChange={setSelectedAssetTypeId}
/>
```

---

### IV. 🧩 **Komponen-Konponen Fungsional**

#### 1. `DynamicForm`

Untuk input `asset-detail.data` berdasarkan schema.

#### 2. `DynamicTable`

Menampilkan data `asset-detail.data` dalam tabel dinamis.

#### 3. `SchemaPreview`

Menampilkan schema (read-only) dari file `*.json`.

#### 4. `PPCStrategyPanel`

Form untuk input 3 jenis strategi:

- Preventive
- Predictive
- Corrective

#### 5. `SparePartsTable`

Form tabular untuk input:

- Part Name
- Part Number
- UoM
- Quantity
- Remarks

#### 6. `AssetList`

Menampilkan daftar aset (dari `asset.json`), berdasarkan `asset_type_id`.

#### 7. `AssetDetailView`

Render per `tag_number` berdasarkan struktur `schema.fields`.

---

### V. 📦 **Data Management & Hook**

Buat satu hook terpadu untuk load semua data:

```ts
// useConfigurationData.ts
export function useConfigurationData(assetTypeId: string) {
  return {
    assetTypes: fetchAssetTypes(),
    assetTypeSchema: fetchAssetTypeSchema(assetTypeId),
    assets: fetchAssetsByType(assetTypeId),
    assetDetails: fetchAssetDetailData(assetTypeId),
  };
}
```

---

### VI. 🧪 Validasi & Entry

1. Gunakan `zod` untuk validasi form `asset-type-schema` dan `asset-detail`.

2. Validasi sebelum simpan:

```ts
try {
  const valid = assetTypeSchemaSchema.parse(formData);
  // Lanjutkan simpan
} catch (err) {
  // Tampilkan error
}
```

---

### VII. 🔐 Tambahkan Simpan ke LocalStorage (opsional)

Untuk prototipe:

```ts
localStorage.setItem(`schema-${assetTypeId}`, JSON.stringify(schemaData));
```

---

### VIII. 🛠 Fitur Tambahan yang Direkomendasikan

| Fitur              | Deskripsi                                |
| ------------------ | ---------------------------------------- |
| 🔍 Pencarian aset  | Filter aset berdasarkan nama, area, unit |
| 📤 Ekspor          | Ekspor `asset + detail` ke CSV/Excel     |
| 💾 Simpan semua    | Tombol simpan global untuk semua tab     |
| 🧠 Live Validation | Validasi dinamis saat isi form           |

---

### IX. 🧪 Uji & Debug

1. Aktifkan `logger` di semua service
2. Periksa apakah semua data:

   - Tampil dengan benar
   - Dapat diisi ulang (form dinamis)
   - Validasi berfungsi

3. Ganti `MODE_DATA=live` dan pastikan endpoint backend bisa merespon dengan format yang sama seperti `mocks`.

---

### X. 📂 Struktur Folder Direkomendasikan

## 🗂️ Struktur Folder + page.tsx

```bash
src/
├── app/
│   ├── configuration/               <-- ✅ Root page untuk konfigurasi
│   │   └── page.tsx                 <-- 1. Halaman utama konfigurasi
│   │
│   ├── configuration/[assetType]/  <-- ✅ Halaman per assetType (opsional untuk deep-linking)
│   │   └── page.tsx                 <-- 2. View detail + entry berdasarkan assetType
│   │
│   ├── assets/                      <-- ✅ Halaman lihat daftar aset (tanpa konfigurasi)
│   │   └── page.tsx                 <-- 3. Viewer/list untuk aset & asset-detail
│   │
│   ├── dashboard/                   <-- Halaman utama dashboard (jika ada)
│   │   └── page.tsx
│   │
│   └── page.tsx                     <-- (opsional) halaman landing / redirect
/components
  └── Configuration/
        ├── ConfigurationPage.tsx
        ├── SelectCategory.tsx
        ├── SelectAssetType.tsx
        ├── DynamicForm.tsx
        ├── DynamicTable.tsx
        ├── PPCStrategyPanel.tsx
        ├── SparePartsTable.tsx
        ├── SchemaPreview.tsx
        ├── AssetList.tsx
        └── AssetDetailView.tsx

/hooks
  └── useConfigurationData.ts

/services
  └── assetService.ts
  └── assetDetailDataService.ts
  └── assetTypeService.ts
  └── assetTypeSchemaService.ts

/models
  └── *.ts

/public
  └── mocks/
  └── schemas/
```

---

## 🧩 CONTOH ALUR USER

1. Pilih kategori "controller"
2. Pilih asset-type: `control-system`
3. Tab 1 → lihat/edit field schema
4. Tab 2 → isi PPC strategy
5. Tab 3 → spare parts
6. Tab 4 → lihat daftar aset: `DCS-01`, `PLC-102`, dll.
7. Tab 5 → lihat detail teknis tiap aset, isi tambahan jika kosong

---

## 🧭 Penjelasan per `page.tsx`

### 1. `/configuration/page.tsx`

- **Tujuan**: Halaman pusat konfigurasi semua aset
- **Isi**:

  - Dropdown `Asset Category`
  - Dropdown `Asset Type`
  - Tabs: Schema, Spareparts, PPC Strategy, Asset, Asset Detail

- **Komponen**: `ConfigurationPage`, `ConfigurationView`, dll.

➡️ **Inilah halaman utama untuk pengelolaan dan entry**

---

### 2. `/configuration/[assetType]/page.tsx`

- **Tujuan**: Deep-link ke satu `assetType` (misal: `control-valve`)
- **Contoh URL**: `/configuration/control-valve`
- **Isi**:

  - Otomatis memuat data untuk `assetType` tsb
  - Skip dropdown
  - Tetap tampilkan tabs konfigurasi

➡️ **Bermanfaat untuk bookmark atau navigasi langsung dari dashboard**

---

### 3. `/assets/page.tsx`

- **Tujuan**: Halaman untuk melihat seluruh aset dari semua kategori
- **Isi**:

  - Tabel dengan semua `asset` dari `asset.json`
  - Filter berdasarkan kategori, tipe, status, unit, area
  - Integrasi dengan `asset-detail` untuk preview teknis

➡️ **Fokus untuk operasi dan overview, bukan entry data**

---

## 💡 Opsional Lain (Jika Dibutuhkan)

| Halaman                 | Deskripsi                                                             |
| ----------------------- | --------------------------------------------------------------------- |
| `/configuration/schema` | Admin-only page untuk buat/ubah `asset-type-schema` (raw JSON editor) |
| `/admin/asset-category` | CRUD halaman kategori aset                                            |
| `/admin/asset-type`     | CRUD asset-type dan relasinya                                         |

---

## 📌 Kesimpulan Integrasi `page.tsx`

| Path                         | page.tsx | Fungsi                                 |
| ---------------------------- | -------- | -------------------------------------- |
| `/configuration`             | Ya       | Entry & konfigurasi aset               |
| `/configuration/[assetType]` | Ya       | Fokus pada satu `assetType`            |
| `/assets`                    | Ya       | Viewer / pemantauan aset dan detailnya |

---
