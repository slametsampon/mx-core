// plugins/mx-core-metric/src/data/useMockData.ts

import { useEffect, useState } from 'react';

export function useMockData<T>(filename: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/mocks/${filename}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  }, [filename]);

  return { data, loading };
}
