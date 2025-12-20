// plugins/mx-core-rbm/src/types/AssetTypeSchema.ts

export type FieldDefinition = {
  name: string;
  label: string;
  rawName: string;
  type: 'string' | 'number' | 'boolean' | 'enum';
  required: boolean;
  unit?: string;
  options?: string[];
  include: boolean; // ← tambahkan ini
};
