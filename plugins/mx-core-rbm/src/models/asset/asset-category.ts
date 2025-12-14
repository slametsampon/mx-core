// plugins/mx-core-rbm/src/models/asset-category.ts

import { z } from 'zod';

export interface AssetCategory {
  category_id: string; // slug-style, lowercase
  name: string; // readable label
}

export const assetCategorySchema = z.object({
  category_id: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Gunakan lowercase, angka, dan tanda hubung')
    .optional(), // optional saat create
  name: z.string().min(1, 'Nama kategori wajib diisi'),
});
