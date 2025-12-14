// plugins/mx-core-rbm/src/models/rbm/asset-rbm-grading.ts

import { z } from 'zod';

export interface EscGrading {
  tag_number: string;
  safety: number;
  environment: number;
  production: number;
  graded_by: string;
  graded_at: string;
  note?: string;
}

export const escGradingSchema = z.object({
  tag_number: z.string().min(1, 'Tag number is required'),
  safety: z.number().min(1).max(5),
  environment: z.number().min(1).max(5),
  production: z.number().min(1).max(5),
  graded_by: z.string().min(1, 'Grader name is required'),
  graded_at: z.string(), // ISO datetime string
  note: z.string().optional(),
});
