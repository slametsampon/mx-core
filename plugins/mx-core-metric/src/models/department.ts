// plugins/mx-core-metric/src/models/department.ts

import { z } from 'zod';

export interface Department {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export const departmentSchema = z.object({
  id: z.string().optional(), // optional for form create
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  created_at: z.string().optional(),
});
