// plugins/mx-core-metric/src/config/modelDefinitions.ts

import { disturbanceLogSchema } from '@/models/disturbanceLog';
import { departmentSchema } from '@/models/department';
import { disturbanceSourceSchema } from '@/models/disturbanceSource';
import { unitSchema } from '@/models/unit';
import { kpiSchema } from '@/models/kpi';
import { kpiRecordSchema } from '@/models/kpiRecord';
import { kpiAnnualTargetSchema } from '@/models/kpiAnnualTarget';
import { kpiPeriodicTargetSchema } from '@/models/kpiPeriodicTarget';

export const modelDefinitions = {
  kpi_record: {
    label: 'KPI Record',
    schema: kpiRecordSchema,
    fields: [
      { key: 'periode', label: 'Periode' },
      { key: 'kpi_id', label: 'KPI ID' },
      { key: 'value', label: 'Value' },
      { key: 'source', label: 'Source' },
      { key: 'note', label: 'Note' },
    ],
  },

  disturbance_log: {
    label: 'Disturbance Log',
    schema: disturbanceLogSchema,
    fields: [
      { key: 'periode', label: 'Periode' },
      { key: 'unit_id', label: 'Unit' },
      { key: 'source_id', label: 'Source' },
      { key: 'duration_minutes', label: 'Durasi (menit)' },
      { key: 'category', label: 'Kategori' },
      { key: 'description', label: 'Deskripsi' },
    ],
  },

  department: {
    label: 'Department',
    schema: departmentSchema,
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
    ],
  },

  disturbance_source: {
    label: 'Disturbance Source',
    schema: disturbanceSourceSchema,
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'type', label: 'Type' },
      { key: 'description', label: 'Description' },
      { key: 'is_active', label: 'Active?' },
    ],
  },

  kpi: {
    label: 'KPI',
    schema: kpiSchema,
    fields: [
      { key: 'name', label: 'Name' },
      { key: 'description', label: 'Description' },
      { key: 'unit', label: 'Unit' },
      { key: 'type', label: 'Type' },
      { key: 'is_active', label: 'Active?' },
      { key: 'value', label: 'Initial Value' },
    ],
  },

  kpi_annual_target: {
    label: 'KPI Annual Target',
    schema: kpiAnnualTargetSchema,
    fields: [
      { key: 'kpi_id', label: 'KPI ID' },
      { key: 'department_id', label: 'Department ID' },
      { key: 'unit_id', label: 'Unit ID' },
      { key: 'year', label: 'Year' },
      { key: 'annual_value', label: 'Annual Target' },
      { key: 'note', label: 'Note' },
    ],
  },

  kpi_periodic_target: {
    label: 'KPI Periodic Target',
    schema: kpiPeriodicTargetSchema,
    fields: [
      { key: 'annual_target_id', label: 'Annual Target ID' },
      { key: 'kpi_id', label: 'KPI ID' },
      { key: 'department_id', label: 'Department ID' },
      { key: 'unit_id', label: 'Unit ID' },
      { key: 'periode', label: 'Periode' },
      { key: 'granularity', label: 'Granularity' },
      { key: 'target_value', label: 'Target Value' },
      { key: 'actual_value', label: 'Actual Value' },
      { key: 'actual_note', label: 'Actual Note' },
    ],
  },

  unit: {
    label: 'Unit',
    schema: unitSchema,
    fields: [
      { key: 'department_id', label: 'Department ID' },
      { key: 'name', label: 'Unit Name' },
      { key: 'location', label: 'Location' },
      { key: 'description', label: 'Description' },
      { key: 'is_active', label: 'Active?' },
    ],
  },
} as const;

export type ModelKey = keyof typeof modelDefinitions;
export type ModelName = ModelKey;
