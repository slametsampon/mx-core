// plugins/mx-core-metric/src/hooks/useKpiData.ts

import { useEffect, useState } from 'react';
import { getKpiRecords } from '@/services/kpiService';
import { KpiRecord } from '@/models/kpiRecord';

export function useKpiData() {
  const [data, setData] = useState<KpiRecord[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getKpiRecords()
      .then(setData)
      .catch((err) => {
        console.error('Error in useKpiData:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
