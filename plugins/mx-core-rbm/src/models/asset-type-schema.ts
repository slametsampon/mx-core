// plugins/mx-core-rbm/src/models/asset-type-schema.ts

import { z } from 'zod';

//
// FIELD DEFINITION
//
export interface FieldDefinition {
  name: string; // misal: "flowMax"
  label: string; // misal: "Flow Maksimum"
  type: 'string' | 'number' | 'enum' | 'boolean' | 'date';
  required: boolean;
  unit?: string; // misal: "bar", "m³/h"
  options?: string[]; // hanya jika type === 'enum'
}

export const fieldDefinitionSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['string', 'number', 'enum', 'boolean', 'date']),
  required: z.boolean(),
  unit: z.string().optional(),
  options: z.array(z.string()).optional(),
});

//
// PPC STRATEGY TEMPLATE
//
export interface PpcStrategyDefinition {
  preventive: string[]; // daftar kegiatan preventif
  predictive: string[]; // daftar kegiatan prediktif
  corrective: string[]; // daftar kegiatan korektif
}

export const ppcStrategySchema = z.object({
  preventive: z.array(z.string()),
  predictive: z.array(z.string()),
  corrective: z.array(z.string()),
});

//
// SPARE PART TEMPLATE
//
export interface SparePartTemplate {
  name: string;
  partNumber?: string;
  uom: string;
  quantity: number;
  remarks?: string;
}

export const sparePartTemplateSchema = z.object({
  name: z.string(),
  partNumber: z.string().optional(),
  uom: z.string(),
  quantity: z.number(),
  remarks: z.string().optional(),
});

//
// FINAL: ASSET TYPE SCHEMA
//
export interface AssetTypeSchema {
  asset_type_id: string; // sesuai daftar master asset-type
  fields: FieldDefinition[]; // field teknis per aset
  ppc_strategy: PpcStrategyDefinition; // treatment PPC default
  spare_parts: SparePartTemplate[]; // parts umum
}

export const assetTypeSchemaSchema = z.object({
  asset_type_id: z.string().min(1),
  fields: z.array(fieldDefinitionSchema),
  ppc_strategy: ppcStrategySchema,
  spare_parts: z.array(sparePartTemplateSchema),
});
