// plugins/mx-core-rbm/src/models/AssetTypeSchemaDb .ts

import { z } from 'zod';
import { assetTypeSchemaSchema } from './asset-type-schema';

// Optional: define JSON if not imported from elsewhere
type Json = any;

export interface AssetTypeSchemaDb {
  id: string;
  asset_type_id: string;
  schema: Json;
  version?: string;
  created_at: string;
  updated_at: string;
}

export const assetTypeSchemaDbSchema = z.object({
  id: z.string().uuid().optional(),
  asset_type_id: z.string(),
  schema: assetTypeSchemaSchema,
  version: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
