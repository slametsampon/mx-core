// plugins/mx-core-metric/src/hooks/useApiData.ts

import { useEffect, useState } from 'react';
import { getService } from '@/services/getService';
import type { ModelName } from '@/config/modelDefinitions';

export function useApiData(model: ModelName) {
  const service = getService(model);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await service.getAll();
      setData(res);
    } catch (err) {
      console.error('[useApiData] Failed to fetch:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [model]);

  return { data, loading, refresh: fetchData };
}
