// src/models/kpi.ts

export type KpiType = 'numeric' | 'boolean' | 'status';

export interface KPI {
  id: string;
  name: string;
  description: string;
  unit: string;
  type: KpiType;
  is_active: boolean;
  created_at: string;
  value: number | boolean | string; // ⬅️ nilai tergantung type
}
