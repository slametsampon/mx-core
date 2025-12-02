// src/models/kpiForecast.ts

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
