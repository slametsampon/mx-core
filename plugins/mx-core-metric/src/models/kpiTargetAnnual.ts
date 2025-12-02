// src/models/kpiTargetAnnual.ts

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
