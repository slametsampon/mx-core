// plugins/mx-core-rbm/src/components/configuration/ModelFormRenderer.tsx

import TabbedFormAsset from './TabbedFormAsset';
import TabbedFormSchema from './TabbedFormSchema';
import DynamicForm from './DynamicForm';
import { Asset } from '@/models/asset/asset';
import { AssetTypeSchema } from '@/models/asset/asset-type-schema';
import { saveMockData } from '@/services/mockDataService';

type Props = {
  selectedModel: string;
  schema: AssetTypeSchema | null;
  data: Record<string, any>[];
  editIndex: number | null;
  onSave: (data: Record<string, any>) => void;
  setSchema?: (schema: AssetTypeSchema) => void;
  setData?: (data: Record<string, any>[]) => void;
  setEditIndex?: (index: number | null) => void;
};

export default function ModelFormRenderer({
  selectedModel,
  schema,
  data,
  editIndex,
  onSave,
  setSchema,
  setData,
  setEditIndex,
}: Props) {
  if (!schema) return <p>⚠️ Schema belum tersedia.</p>;
  if (!Array.isArray(data) || data.length === 0)
    return <p>⚠️ Data belum tersedia.</p>;

  if (selectedModel === 'asset') {
    const asset =
      editIndex !== null ? (data[editIndex] as Asset) : (data[0] as Asset);
    return (
      <TabbedFormAsset
        key={asset.tag_number ?? editIndex}
        asset={asset}
        onSave={onSave}
      />
    );
  }

  if (selectedModel === 'asset-type' && setData && setEditIndex && setSchema) {
    return (
      <TabbedFormSchema
        schema={schema}
        onSave={(updated) => {
          const updatedData = [...data];
          if (editIndex !== null) {
            updatedData[editIndex] = updated;
            setData(updatedData);
            setEditIndex(null);
          } else {
            updatedData.push(updated);
            setData(updatedData);
          }
          setSchema(updated);
          saveMockData('asset-type', updatedData);
        }}
      />
    );
  }

  if (selectedModel === 'asset-category') {
    const initialData = editIndex !== null ? data[editIndex] : undefined;
    return (
      <DynamicForm
        fields={schema.fields}
        onSubmit={onSave}
        initialData={initialData}
      />
    );
  }

  return <p>⚠️ Tidak ada form yang cocok untuk model ini.</p>;
}
