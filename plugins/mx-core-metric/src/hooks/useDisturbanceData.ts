// plugins/mx-core-metric/src/hooks/useDisturbanceData.ts

import { useEffect, useState } from 'react';
import { getDisturbanceLogs } from '@/services/disturbanceService';
import { DisturbanceLog } from '@/models/disturbanceLog';

export function useDisturbanceData() {
  const [data, setData] = useState<DisturbanceLog[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDisturbanceLogs()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
