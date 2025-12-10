// plugins/mx-core-rbm/src/components/ConfigurationView.tsx

'use client';

import { useEffect, useState } from 'react';
import { DynamicForm } from './DynamicForm';
import { DynamicTable } from './DynamicTable';
import { fetchAssetTypeSchemaById } from '@/services/assetTypeSchemaService';
import { fetchAssetDetailData } from '@/services/assetDetailDataService';
import { AssetTypeSchema } from '@/models/asset-type-schema';

type Props = {
  assetTypeId: string;
};

export function ConfigurationView({ assetTypeId }: Props) {
  const [schema, setSchema] = useState<AssetTypeSchema | null>(null);
  const [data, setData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const loadSchemaAndData = async () => {
      const s = await fetchAssetTypeSchemaById(assetTypeId);
      const d = await fetchAssetDetailData(assetTypeId); // assume already filtered
      setSchema(s);
      setData(d);
    };
    loadSchemaAndData();
    console.log('schema=', schema);
  }, [assetTypeId]);

  const handleSubmit = (formData: Record<string, any>) => {
    // You could save this to database or just log for now
    console.log('Saving:', formData);
    setData((prev) => [...prev, formData]);
  };

  if (!schema) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-6xl py-8">
      <h2 className="mb-6 text-2xl font-bold capitalize">
        Konfigurasi: {assetTypeId.replace('-', ' ')}
      </h2>
      <DynamicForm schema={schema} onSubmit={handleSubmit} />
      <DynamicTable schema={schema} data={data} />
    </div>
  );
}
