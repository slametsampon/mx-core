// plugins/mx-core-rbm/src/models/asset-detail.ts

import { z } from 'zod';

export interface AssetDetail {
  tag_number: string; // FK ke asset
  data: Record<string, any>; // JSONB, sesuai template
  created_at?: string; // Opsional: waktu dibuat
}

export const assetDetailSchema = z.object({
  tag_number: z.string().min(1, 'Tag number is required'),
  data: z.record(z.string(), z.any()),
  created_at: z.string().optional(),
});
