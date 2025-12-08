// plugins/mx-core-metric/src/config/viewDefinitions.ts

export const viewDefinitions = {
  v_department_kpi_target: {
    label: 'KPI Target per Department',
    fields: [
      { key: 'department_name', label: 'Department' },
      { key: 'kpi_name', label: 'KPI' },
      { key: 'kpi_type', label: 'Tipe' },
      { key: 'year', label: 'Tahun' },
      { key: 'annual_value', label: 'Target' },
      { key: 'note', label: 'Catatan' },
    ],
  },

  v_kpi_record_detail: {
    label: 'KPI Record Detail',
    fields: [
      { key: 'periode', label: 'Periode' },
      { key: 'kpi_name', label: 'KPI' },
      { key: 'value', label: 'Nilai' },
      { key: 'source', label: 'Sumber' },
      { key: 'department_name', label: 'Departemen' },
      { key: 'unit_name', label: 'Unit' },
    ],
  },

  // Tambahkan definisi view lainnya di sini
} as const;

export type ViewKey = keyof typeof viewDefinitions;
