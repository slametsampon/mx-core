// plugins/mx-core-metric/src/models/unit.ts

import { z } from 'zod';

export interface Unit {
  id: string;
  department_id: string;
  name: string;
  location: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export const unitSchema = z.object({
  id: z.string(),
  department_id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  is_active: z.boolean(),
  created_at: z.string(),
});
