// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { useEffect, useReducer } from 'react';
import { logger } from '@/utils/logger';
import { loadMockData, saveMockData } from '@/services/mockDataService';

import DynamicForm from '@/components/configuration/DynamicForm';
import DynamicTable from '@/components/configuration/DynamicTable';
import TabbedFormAsset from '@/components/configuration/TabbedFormAsset';

import { Asset, assetSchema } from '@/models/asset';
import { assetCategorySchema } from '@/models/asset-category';
import { assetTypeSchema } from '@/models/asset-type';
import { AssetTypeSchema } from '@/models/asset-type-schema';
import { zodToFieldDefs } from '@/utils/zodToFieldDefs';

const modelOptions = [
  { id: 'asset-category', label: 'Asset Category' },
  { id: 'asset-type', label: 'Asset Type' },
  { id: 'asset', label: 'Asset' },
];

type State = {
  selectedModel: string;
  data: Record<string, any>[];
  schema: AssetTypeSchema | null;
  loading: boolean;
  editIndex: number | null;
};

type Action =
  | { type: 'SET_MODEL'; payload: string }
  | { type: 'SET_DATA'; payload: Record<string, any>[] }
  | { type: 'SET_SCHEMA'; payload: AssetTypeSchema | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_EDIT_INDEX'; payload: number | null };

const initialState: State = {
  selectedModel: modelOptions[0].id,
  data: [],
  schema: null,
  loading: false,
  editIndex: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_MODEL':
      return {
        ...state,
        selectedModel: action.payload,
        editIndex: null,
        data: [],
        schema: null,
      };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_SCHEMA':
      return { ...state, schema: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EDIT_INDEX':
      return { ...state, editIndex: action.payload };
    default:
      return state;
  }
}

export default function ConfigurationRootPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedModel, data, schema, loading, editIndex } = state;

  const ready = !loading && schema !== null && Array.isArray(data);
  logger.debug(
    `[ready] loading=${loading}, schema=${!!schema}, data=${data.length}`
  );

  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      logger.info(`[useEffect] 🔁 Load model: ${selectedModel}`);

      try {
        const res = await loadMockData<any>(selectedModel);
        logger.debug(`[useEffect] ✅ Data loaded`, res);

        if (Array.isArray(res)) {
          dispatch({ type: 'SET_DATA', payload: res });

          switch (selectedModel) {
            case 'asset-category':
              logger.info(`[useEffect] 📄 Gunakan schema asset-category`);
              dispatch({
                type: 'SET_SCHEMA',
                payload: {
                  asset_type_id: 'asset-category',
                  fields: zodToFieldDefs(assetCategorySchema),
                  ppc_strategy: {
                    preventive: [],
                    predictive: [],
                    corrective: [],
                  },
                  spare_parts: [],
                },
              });
              break;

            case 'asset-type':
              logger.info(`[useEffect] 📄 Gunakan schema asset-type`);
              dispatch({
                type: 'SET_SCHEMA',
                payload: {
                  asset_type_id: 'asset-type',
                  fields: zodToFieldDefs(assetTypeSchema),
                  ppc_strategy: {
                    preventive: [],
                    predictive: [],
                    corrective: [],
                  },
                  spare_parts: [],
                },
              });
              break;

            case 'asset':
              if (res.length > 0) {
                const first = res[0] as Asset;
                try {
                  const schemaRes = await fetch(
                    `/schemas/asset-types/${first.asset_type_id}.json`
                  );
                  if (!schemaRes.ok) throw new Error('Fetch schema gagal');
                  const schemaJson = await schemaRes.json();
                  logger.info(`[useEffect] 📄 Load schema JSON berhasil`);
                  dispatch({ type: 'SET_SCHEMA', payload: schemaJson });
                } catch (error) {
                  logger.warn(`⚠️ Gagal fetch schema JSON, fallback default`);
                  dispatch({
                    type: 'SET_SCHEMA',
                    payload: {
                      asset_type_id: 'asset',
                      fields: zodToFieldDefs(assetSchema),
                      ppc_strategy: {
                        preventive: [],
                        predictive: [],
                        corrective: [],
                      },
                      spare_parts: [],
                    },
                  });
                }
              } else {
                logger.warn(`⚠️ Data asset kosong, gunakan fallback schema`);
                dispatch({
                  type: 'SET_SCHEMA',
                  payload: {
                    asset_type_id: 'asset',
                    fields: zodToFieldDefs(assetSchema),
                    ppc_strategy: {
                      preventive: [],
                      predictive: [],
                      corrective: [],
                    },
                    spare_parts: [],
                  },
                });
              }
              break;

            default:
              logger.warn(`[useEffect] ⚠️ Model tidak dikenali`);
              dispatch({ type: 'SET_SCHEMA', payload: null });
          }
        } else if (res?.data && res?.schema) {
          logger.info(`[useEffect] 📦 Format data { data, schema }`);
          logger.debug(`[schema] Struktur schema:`, res.schema); // ✅ DEBUG SCHEMA
          dispatch({ type: 'SET_DATA', payload: res.data });
          dispatch({ type: 'SET_SCHEMA', payload: res.schema });
        } else {
          logger.warn(
            `[useEffect] ⚠️ Schema kosong atau tidak valid untuk ${selectedModel}`
          );
          logger.debug(`[schema] Nilai schema:`, res?.schema); // ✅ DEBUG NULL
          dispatch({ type: 'SET_DATA', payload: res?.data || [] });
          dispatch({ type: 'SET_SCHEMA', payload: null });
        }

        logger.info(`[ConfigurationPage] ✅ Model loaded: ${selectedModel}`);
      } catch (err: any) {
        logger.error(`❌ Gagal load ${selectedModel}:`, err.message);
        dispatch({ type: 'SET_DATA', payload: [] });
        dispatch({ type: 'SET_SCHEMA', payload: null });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadData();
  }, [selectedModel]);

  const handleSave = async (formData: Record<string, any>) => {
    logger.info(`💾 Menyimpan data: ${selectedModel}`);
    logger.debug(`💾 Data disimpan:`, formData);

    try {
      const updated = [...data];
      if (editIndex !== null) {
        updated[editIndex] = formData;
        dispatch({ type: 'SET_EDIT_INDEX', payload: null });
      } else {
        updated.push(formData);
      }

      dispatch({ type: 'SET_DATA', payload: updated });
      await saveMockData(selectedModel, updated);
      logger.info(`✅ Data ${selectedModel} berhasil disimpan`);
    } catch (err: any) {
      logger.error(`❌ Gagal simpan ${selectedModel}:`, err.message);
    }
  };

  const handleEdit = (item: Record<string, any>) => {
    const index = data.findIndex((row) => row === item);
    dispatch({ type: 'SET_EDIT_INDEX', payload: index });
    logger.info(`✏️ Edit data index ${index}`, item);
  };

  const handleDelete = async (index: number) => {
    logger.warn(`🗑️ Hapus item index ${index}`);
    try {
      const updated = [...data];
      updated.splice(index, 1);
      dispatch({ type: 'SET_DATA', payload: updated });
      await saveMockData(selectedModel, updated);
      logger.info(`✅ Item dihapus dari model ${selectedModel}`);
    } catch (err: any) {
      logger.error(`❌ Gagal hapus item:`, err.message);
    }
  };

  const renderForm = () => {
    logger.info(`🧩 renderForm untuk: ${selectedModel}`);
    logger.debug(`[renderForm] Schema object:`, schema); // ✅ DEBUG SCHEMA

    if (!schema) {
      logger.warn(`⚠️ Schema belum tersedia`);
      return <p>⚠️ Schema belum tersedia.</p>;
    }

    if (!Array.isArray(data) || data.length === 0) {
      logger.warn(`⚠️ Data belum tersedia`);
      return <p>⚠️ Data belum tersedia.</p>;
    }

    if (selectedModel === 'asset') {
      const asset =
        editIndex !== null ? (data[editIndex] as Asset) : (data[0] as Asset);
      const schemaObj = schema as AssetTypeSchema;

      if (!asset || !schemaObj?.fields) {
        logger.warn(`⚠️ Asset atau field schema tidak valid`);
        return <p>⚠️ Data atau schema asset tidak valid.</p>;
      }

      logger.info(`🧩 Menampilkan <TabbedFormAsset>`);
      return (
        <TabbedFormAsset asset={asset} schema={schemaObj} onSave={handleSave} />
      );
    }

    if (schema.fields?.length) {
      logger.info(
        `🧩 Menampilkan <DynamicForm> (${schema.fields.length} fields)`
      );
      return <DynamicForm fields={schema.fields} onSubmit={handleSave} />;
    }

    logger.warn(`⚠️ Schema tidak punya field`);
    return <p>⚠️ Schema tidak memiliki field valid.</p>;
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        ⚙️ Konfigurasi Data: {selectedModel}
      </h1>

      <div className="w-full max-w-md">
        <label
          htmlFor="modelSelect"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Pilih Data Model
        </label>
        <select
          id="modelSelect"
          value={selectedModel}
          onChange={(e) =>
            dispatch({ type: 'SET_MODEL', payload: e.target.value })
          }
          className="w-full rounded border px-3 py-2 shadow-sm"
        >
          {modelOptions.map((model) => (
            <option key={model.id} value={model.id}>
              {model.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded border bg-white p-4 shadow">
        {!ready ? <p>⏳ Memuat data dan schema...</p> : renderForm()}
      </div>

      <div className="rounded border bg-white p-4 shadow">
        {!ready ? (
          <p>⏳ Memuat data dan schema...</p>
        ) : (
          <DynamicTable
            data={data}
            fields={
              selectedModel === 'asset'
                ? zodToFieldDefs(assetSchema)
                : schema?.fields ?? []
            }
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
