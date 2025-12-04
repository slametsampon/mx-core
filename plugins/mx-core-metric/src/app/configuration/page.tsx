// plugins/mx-core-metric/src/app/configuration/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { modelDefinitions, ModelKey } from '@/config/modelDefinitions';
import { DynamicForm } from '@/components/DynamicForm';
import { DynamicTable } from '@/components/DynamicTable';
import { getService } from '@/services/getService';
import { logFrontendStatus } from '@/config/config';

export default function FormPage() {
  const [model, setModel] = useState<ModelKey>('kpi_record');
  const [dataList, setDataList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [formMode, setFormMode] = useState<'new' | 'edit'>('new');

  const service = getService(model);

  // 🔄 Load data saat model berubah
  useEffect(() => {
    refreshData();
    resetForm();
  }, [model]);

  async function refreshData() {
    try {
      const res = await service.getAll();
      setDataList(res);
    } catch (err) {
      console.error('❌ Failed to fetch data:', err);
      if (err instanceof Error) {
        logFrontendStatus('page.tsx', '❌ Gagal fetch data awal', err.message);
      } else {
        logFrontendStatus(
          'page.tsx',
          '❌ Gagal fetch data awal (non-error)',
          err
        );
      }
    }
  }

  function resetForm() {
    setSelectedData(null);
    setFormMode('new');
  }

  async function handleSave(payload: any) {
    try {
      if (formMode === 'edit' && selectedData?.id) {
        await service.update(selectedData.id, payload);
      } else {
        await service.create(payload);
      }

      await refreshData();
      resetForm();
    } catch (err) {
      console.error('❌ Save failed:', err);
    }
  }

  async function handleDelete(item: any) {
    const confirmDelete = window.confirm('Yakin ingin menghapus data ini?');
    if (!confirmDelete) return;

    try {
      await service.delete(item.id);
      await refreshData();
    } catch (err) {
      console.error('❌ Delete failed:', err);
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 p-6">
      {/* 🧩 FORM SECTION */}
      <div>
        <h1 className="mb-4 text-xl font-bold">🧩 Dynamic Form</h1>

        {/* Select Model */}
        <div className="mb-4">
          <label htmlFor="model-selector" className="mb-1 block font-medium">
            Pilih Model
          </label>
          <select
            id="model-selector"
            value={model}
            onChange={(e) => setModel(e.target.value as ModelKey)}
            className="w-full rounded border px-3 py-2"
          >
            {Object.entries(modelDefinitions).map(([key, def]) => (
              <option key={key} value={key}>
                {def.label}
              </option>
            ))}
          </select>
        </div>

        <DynamicForm
          model={model}
          mode={formMode}
          initialData={selectedData}
          onSaved={handleSave}
          onCancel={resetForm}
        />
      </div>

      {/* 📋 TABLE SECTION */}
      <DynamicTable
        model={model}
        items={dataList}
        onEdit={(data) => {
          setSelectedData(data);
          setFormMode('edit');
        }}
        onDelete={handleDelete}
      />
    </div>
  );
}
