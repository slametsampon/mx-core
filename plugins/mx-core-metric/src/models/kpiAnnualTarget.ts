// plugins/mx-core-metric/src/models/kpiAnnualTarget.ts

import { z } from 'zod';

export interface KpiAnnualTarget {
  id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  year: number;
  annual_value: number;
  note?: string;
  created_at: string;
}

export const kpiAnnualTargetSchema = z.object({
  id: z.string().optional(),
  kpi_id: z.string().min(1, 'KPI wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  year: z.number(),
  annual_value: z.number().min(0, 'Annual target tidak valid'),
  note: z.string().optional(),
  created_at: z.string().optional(),
});
