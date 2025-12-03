// plugins/mx-core-metric/src/services/disturbanceService.ts

import { DisturbanceLog } from '@/models/disturbanceLog';
import { USE_MOCK, API_BASE, logTrace } from '@/config';

export async function getDisturbanceLogs(): Promise<DisturbanceLog[]> {
  const label = 'DisturbanceService:getLogs';
  try {
    if (USE_MOCK) {
      logTrace(label, '🔁 Using mock data from /mocks/disturbance_log.json');
      const res = await fetch('/mocks/disturbance_log.json');
      return await res.json();
    } else {
      const url = `${API_BASE}/api/disturbance-logs`;
      logTrace(label, `🌐 Fetching from API: ${url}`);
      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      logTrace(label, '✅ Fetched from API', data);
      return data;
    }
  } catch (err: any) {
    logTrace(label, '❌ Error fetching disturbances', err);
    return [];
  }
}
