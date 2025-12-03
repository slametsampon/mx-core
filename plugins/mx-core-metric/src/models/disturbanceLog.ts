// plugins/mx-core-metric/src/models/disturbanceLog.ts

import { z } from 'zod';

export type DisturbanceCategory =
  | 'electrical'
  | 'mechanical'
  | 'instrument'
  | 'utility'
  | 'other';

export interface DisturbanceLog {
  id: string;
  department_id: string;
  unit_id: string;
  periode: string;
  source_id: string;
  duration_minutes: number;
  category: DisturbanceCategory;
  description: string;
  created_by?: string;
  created_at: string;
}

export type DisturbanceLogPayload = Omit<
  DisturbanceLog,
  'id' | 'created_at' | 'created_by'
>;

export const DISTURBANCE_CATEGORIES: {
  label: string;
  value: DisturbanceCategory;
}[] = [
  { label: 'Electrical', value: 'electrical' },
  { label: 'Mechanical', value: 'mechanical' },
  { label: 'Instrument', value: 'instrument' },
  { label: 'Utility', value: 'utility' },
  { label: 'Other', value: 'other' },
];

// 🧩 Tambahkan Zod schema
export const disturbanceLogSchema = z.object({
  id: z.string().optional(),
  department_id: z.string(),
  unit_id: z.string(),
  periode: z.string(),
  source_id: z.string(),
  duration_minutes: z.number(),
  category: z.enum([
    'electrical',
    'mechanical',
    'instrument',
    'utility',
    'other',
  ]),
  description: z.string(),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
});
