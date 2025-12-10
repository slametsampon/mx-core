// plugins/mx-core-rbm/src/models/asset.ts

import { z } from 'zod';

export type AssetStatus = 'Active' | 'Spare' | 'Retired';
export type AssetCriticality = 'Kritis' | 'Normal';
export type AssetTier = 'Tier1' | 'Tier2' | 'Tier3';

export interface Asset {
  tag_number: string;
  description: string;
  asset_type_id: string;
  unit: string;
  area: string;
  status: AssetStatus;
  criticality?: AssetCriticality;
  tier?: AssetTier;
  installation_date?: string;
}

export const assetSchema = z.object({
  tag_number: z.string().min(1, 'Tag number is required'),
  description: z.string().min(1, 'Description is required'),
  asset_type_id: z.string().min(1, 'Asset type is required'),
  unit: z.string().min(1, 'Unit is required'),
  area: z.string().min(1, 'Area is required'),
  status: z.enum(['Active', 'Spare', 'Retired']),
  criticality: z.enum(['Kritis', 'Normal']).optional(),
  tier: z.enum(['Tier1', 'Tier2', 'Tier3']).optional(),
  installation_date: z.string().optional(),
});
