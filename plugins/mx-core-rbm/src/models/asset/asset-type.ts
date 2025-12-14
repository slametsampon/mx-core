// plugins/mx-core-rbm/src/models/asset-type.ts

import { z } from 'zod';

export interface AssetType {
  asset_type_id: string; // unique slug
  label: string; // tampil di UI
  category_id: string; // relasi ke kategori
}

export const assetTypeSchema = z.object({
  asset_type_id: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Gunakan lowercase, angka, dan tanda hubung')
    .optional(),
  label: z.string().min(1, 'Nama asset type wajib diisi'),
  category_id: z.string().min(1, 'Kategori harus diisi'),
});
