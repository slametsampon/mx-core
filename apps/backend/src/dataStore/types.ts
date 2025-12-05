// apps/backend/src/dataStore/types.ts

export interface DataStore {
  findAll(model: string): Promise<any[]>;
  findById(model: string, id: string): Promise<any | null>;
  create(model: string, data: any): Promise<any>;
  update(model: string, id: string, data: any): Promise<any | null>;
  delete(model: string, id: string): Promise<boolean>;
}
