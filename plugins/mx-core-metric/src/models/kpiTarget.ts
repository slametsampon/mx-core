// src/models/kpiTarget.ts

export interface KpiTarget {
  id: string;
  annual_target_id: string;
  kpi_id: string;
  department_id: string;
  unit_id?: string;
  periode: string; // ISO date
  granularity: 'monthly' | 'weekly' | 'daily';
  value: number;
  note: string;
  created_at: string;
}
