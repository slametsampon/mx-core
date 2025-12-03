// plugins/mx-core-metric/src/models/disturbanceSource.ts

import { z } from 'zod';

export type DisturbanceType = 'internal' | 'external';

export interface DisturbanceSource {
  id: string;
  name: string;
  type: DisturbanceType;
  description: string;
  is_active: boolean;
  created_at: string;
}

export const disturbanceSourceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  type: z.enum(['internal', 'external']),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().optional(),
});
