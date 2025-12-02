// src/models/disturbanceSource.ts

export type DisturbanceType = 'internal' | 'external';

export interface DisturbanceSource {
  id: string;
  name: string;
  type: DisturbanceType;
  description: string;
  is_active: boolean;
  created_at: string;
}
