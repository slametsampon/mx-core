// src/models/disturbanceLog.ts

export type DisturbanceCategory =
  | 'electrical'
  | 'mechanical'
  | 'instrument'
  | 'utility'
  | 'other';

export interface DisturbanceLog {
  id: string;
  department_id: string;
  unit_id: string;
  periode: string;
  source_id: string;
  duration_minutes: number;
  category: DisturbanceCategory;
  description: string;
  created_by?: string;
  created_at: string;
}

export type DisturbanceLogPayload = Omit<
  DisturbanceLog,
  'id' | 'created_at' | 'created_by'
>;

export const DISTURBANCE_CATEGORIES: {
  label: string;
  value: DisturbanceCategory;
}[] = [
  { label: 'Electrical', value: 'electrical' },
  { label: 'Mechanical', value: 'mechanical' },
  { label: 'Instrument', value: 'instrument' },
  { label: 'Utility', value: 'utility' },
  { label: 'Other', value: 'other' },
];
