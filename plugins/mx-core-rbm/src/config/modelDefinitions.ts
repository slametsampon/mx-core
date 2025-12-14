// plugins/mx-core-rbm/src/config/modelDefinitions.ts

export const modelOptions = [
  { id: 'asset-category', label: 'Asset Category' },
  { id: 'asset-type', label: 'Asset Type' },
  { id: 'asset', label: 'Asset' },
] as const;

export type ModelName = (typeof modelOptions)[number]['id'];
