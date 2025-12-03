// plugins/mx-core-metric/src/models/kpiTarget.ts

import { z } from 'zod';

export interface KpiTarget {
  id: string;
  annual_target_id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string;
  granularity: 'monthly' | 'weekly' | 'daily';
  value: number;
  note: string;
  created_at: string;
}

export const kpiTargetSchema = z.object({
  id: z.string().optional(),
  annual_target_id: z.string().min(1, 'Annual Target wajib diisi'),
  kpi_id: z.string().min(1, 'KPI wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  periode: z.string().min(1, 'Periode wajib diisi'),
  granularity: z.enum(['monthly', 'weekly', 'daily']),
  value: z.number(),
  note: z.string().optional(),
  created_at: z.string().optional(),
});
