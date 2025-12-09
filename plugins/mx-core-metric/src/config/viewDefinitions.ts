// plugins/mx-core-metric/src/config/viewDefinitions.ts

export type ViewField = {
  key: string;
  label: string;
  filter?: boolean; // <-- optional
};

export type ViewDefinition = {
  label: string;
  fields: ViewField[];
};

export const viewDefinitions: Record<string, ViewDefinition> = {
  v_department_kpi_target: {
    label: '🎯 KPI Target per Department',
    fields: [
      { key: 'department_name', label: 'Department', filter: true },
      { key: 'kpi_name', label: 'KPI', filter: true },
      { key: 'kpi_type', label: 'Tipe' },
      { key: 'year', label: 'Tahun', filter: true },
      { key: 'annual_value', label: 'Target' },
      { key: 'note', label: 'Catatan' },
    ],
  },

  v_kpi_forecast: {
    label: '📈 KPI Forecast',
    fields: [
      { key: 'department_name', label: 'Department', filter: true },
      { key: 'unit_name', label: 'Unit', filter: true },
      { key: 'kpi_name', label: 'KPI', filter: true },
      { key: 'periode', label: 'Periode', filter: true },
      { key: 'value', label: 'Forecast Value' },
      { key: 'method', label: 'Method' },
    ],
  },

  v_kpi_record_detail: {
    label: '📋 KPI Record Detail',
    fields: [
      { key: 'department_name', label: 'Department', filter: true },
      { key: 'unit_name', label: 'Unit', filter: true },
      { key: 'kpi_name', label: 'KPI', filter: true },
      { key: 'periode', label: 'Periode' },
      { key: 'value', label: 'Value' },
      { key: 'note', label: 'Note' },
      { key: 'source', label: 'Source' },
    ],
  },

  v_kpi_periodic_target: {
    label: '🎯 KPI Periodic Target',
    fields: [
      { key: 'department_name', label: 'Department', filter: true },
      { key: 'unit_name', label: 'Unit', filter: true },
      { key: 'kpi_name', label: 'KPI', filter: true },
      { key: 'periode', label: 'Periode', filter: true },
      { key: 'granularity', label: 'Granularity' },
      { key: 'target_value', label: 'Target' },
      { key: 'actual_value', label: 'Actual' },
      { key: 'actual_note', label: 'Catatan' },
    ],
  },

  v_disturbance_log_detail: {
    label: '⚠️ Disturbance Log Detail',
    fields: [
      { key: 'department_name', label: 'Department', filter: true },
      { key: 'unit_name', label: 'Unit', filter: true },
      { key: 'periode', label: 'Periode', filter: true },
      { key: 'source_name', label: 'Sumber Gangguan', filter: true },
      { key: 'duration_minutes', label: 'Durasi (menit)' },
      { key: 'category', label: 'Kategori', filter: true },
      { key: 'description', label: 'Deskripsi' },
    ],
  },
};

export type ViewKey = keyof typeof viewDefinitions;
