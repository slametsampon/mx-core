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
  kpi_id: z.string(),
  department_id: z.string(),
  unit_id: z.string().optional(),
  periode: z.string(), // atau bisa diubah ke z.date().optional()
  value: z.number(),
  note: z.string().optional(),
  source: z.enum(['manual', 'sensor', 'imported']),
  created_by: z.string().optional(),
  created_at: z.string().optional(),
});
