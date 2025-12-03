// plugins/mx-core-metric/src/models/kpiForecast.ts

import { z } from 'zod';

export interface KpiForecast {
  id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string;
  value: number;
  method: 'manual' | 'linear' | 'ml_model';
  annual_target_id?: string;
  created_at: string;
}

export const kpiForecastSchema = z.object({
  id: z.string().optional(),
  kpi_id: z.string().min(1, 'KPI ID wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  periode: z.string().min(1, 'Periode wajib diisi'),
  value: z.number(),
  method: z.enum(['manual', 'linear', 'ml_model']),
  annual_target_id: z.string().optional(),
  created_at: z.string().optional(),
});
