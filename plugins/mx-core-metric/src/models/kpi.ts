// plugins/mx-core-metric/src/models/kpi.ts

import { z } from 'zod';

export type KpiType = 'numeric' | 'boolean' | 'status';

export interface KPI {
  id: string;
  name: string;
  description: string;
  unit: string;
  type: KpiType;
  is_active: boolean;
  created_at: string;
  value: number | boolean | string;
}

export const kpiSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  unit: z.string(),
  type: z.enum(['numeric', 'boolean', 'status']),
  is_active: z.boolean().default(true),
  created_at: z.string().optional(),
  value: z.union([z.number(), z.boolean(), z.string()]).optional(),
});
