// src/models/kpiRecord.ts

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
