// plugins/mx-core-metric/src/services/getService.ts

import { USE_MOCK } from '@/config/config';
import { mockService } from './mockService';
import { apiService } from './apiService';
import type { ModelName } from '@/config/modelDefinitions';

export function getService(model: ModelName) {
  return USE_MOCK ? mockService(model) : apiService(model);
}
