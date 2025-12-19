// plugins/mx-core-rbm/src/types/AssetTypeSchema.ts

export type FieldDefinition = {
  name: string; // camelCase name
  label: string; // original header (display)
  rawName: string; // original raw name from Excel
  type: 'string' | 'number' | 'boolean' | 'enum';
  required: boolean;
  unit?: string;
  options?: string[]; // if type === 'enum'
};
