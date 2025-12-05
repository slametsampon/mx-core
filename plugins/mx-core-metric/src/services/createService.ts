// plugins/mx-core-metric/src/services/createService.ts
import { USE_MOCK } from '@/config/config';
import { mockService } from './mockService';
import { apiService } from './apiService';

export function createService(model: string) {
  return USE_MOCK ? mockService(model) : apiService(model);
}
