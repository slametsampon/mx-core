// plugins/mx-core-metric/src/models/kpiTargetAnnual.ts

import { z } from 'zod';

export interface KpiTargetAnnual {
  id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  year: number;
  value: number;
  note: string;
  created_at: string;
}

export const kpiTargetAnnualSchema = z.object({
  id: z.string().optional(),
  kpi_id: z.string().min(1, 'KPI wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  year: z.number(),
  value: z.number(),
  note: z.string().optional(),
  created_at: z.string().optional(),
});
