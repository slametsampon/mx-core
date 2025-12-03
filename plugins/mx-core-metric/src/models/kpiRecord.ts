// plugins/mx-core-metric/src/models/kpiRecord.ts

import { z } from 'zod';

export type DataSource = 'manual' | 'sensor' | 'imported';

export interface KpiRecord {
  id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string;
  value: number;
  note: string;
  source: DataSource;
  created_by?: string;
  created_at: string;
}

// 🧩 Tambahkan Zod schema
export const kpiRecordSchema = z.object({
  id: z.string().optional(),
  kpi_id: z.string().min(1, 'KPI ID wajib diisi'),
  department_id: z.string().min(1, 'Departemen wajib diisi'),
  unit_id: z.string().min(1, 'Unit wajib diisi'),
  periode: z.string().min(1, 'Periode wajib diisi'),
  value: z.number(),
  note: z.string().optional(),
  source: z.enum(['manual', 'sensor', 'imported']),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
});
