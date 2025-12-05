// plugins/mx-core-metric/src/models/kpiRecord.ts

import { z } from 'zod';

export type RecordSource = 'manual' | 'sensor' | 'system' | 'imported';

export interface KpiRecord {
  id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string;
  value: number;
  note?: string;
  source: RecordSource;
  created_by?: string;
  created_at: string;
}

export const kpiRecordSchema = z.object({
  id: z.string().optional(),
  kpi_id: z.string().min(1, 'KPI ID wajib diisi'),
  department_id: z.string().min(1, 'Department wajib diisi'),
  unit_id: z.string().optional(),
  periode: z.string().min(1, 'Periode wajib diisi'),
  value: z.number(),
  note: z.string().optional(),
  source: z.enum(['manual', 'sensor', 'system', 'imported']),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
});
