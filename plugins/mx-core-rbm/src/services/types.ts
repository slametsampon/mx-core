// plugins/mx-core-rbm/src/services/types.ts

export interface CrudService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: T): Promise<T>;
  update(id: string, data: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
