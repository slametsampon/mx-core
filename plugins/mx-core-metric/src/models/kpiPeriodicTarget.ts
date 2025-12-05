// plugins/mx-core-metric/src/models/kpiPeriodicTarget.ts

import { z } from 'zod';

export type Granularity = 'monthly' | 'weekly' | 'daily';

export interface KpiPeriodicTarget {
  id: string;
  annual_target_id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string; // YYYY-MM-DD (start of period)
  granularity: Granularity;
  target_value: number;
  actual_value?: number;
  actual_note?: string;
  created_at: string;
}

export const kpiPeriodicTargetSchema = z.object({
  id: z.string().optional(),
  annual_target_id: z.string().min(1, 'Annual Target wajib diisi'),
  kpi_id: z.string().min(1, 'KPI wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  periode: z.string().min(1, 'Periode wajib diisi'),
  granularity: z.enum(['monthly', 'weekly', 'daily']),
  target_value: z.number(),
  actual_value: z.number().optional(),
  actual_note: z.string().optional(),
  created_at: z.string().optional(),
});
