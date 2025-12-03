// plugins/mx-core-metric/src/services/kpiService.ts

import { KpiRecord } from '@/models/kpiRecord';
import { USE_MOCK, API_BASE, logTrace } from '@/config';

export async function getKpiRecords(): Promise<KpiRecord[]> {
  const label = 'KPIService:getKpiRecords';
  try {
    if (USE_MOCK) {
      logTrace(label, '🔁 Using mock data from /mocks/kpi_record.json');
      const res = await fetch('/mocks/kpi_record.json');
      return await res.json();
    } else {
      const url = `${API_BASE}/api/kpi-records`;
      logTrace(label, `🌐 Fetching from API: ${url}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      logTrace(label, '✅ Fetched from API', data);
      return data;
    }
  } catch (err: any) {
    logTrace(label, '❌ Error fetching KPI Records', err);
    return [];
  }
}
