// plugins/mx-core-rbm/src/services/getService.ts

import { USE_MOCK } from '@/config/config';
import { mockDataService } from './mockDataService';
import { apiService } from './apiService';
import { ModelName } from '@/config/modelDefinitions';
import type { CrudService } from './types';

export function getService<T extends Record<string, any>>(
  model: ModelName
): CrudService<T> {
  return USE_MOCK ? mockDataService<T>(model) : apiService<T>(model);
}
