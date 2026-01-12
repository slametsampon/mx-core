// plugins/mx-core-rbm/src/components/configuration/ConfigurationPage.tsx

'use client';

import { useState, useMemo } from 'react';
import SelectCategory from './SelectCategory';
import SelectAssetType from './SelectAssetType';
import SchemaPreview from './SchemaPreview';
import PPCStrategyPanel from './PPCStrategyPanel';
import SparePartsTable from './SparePartsTable';
import AssetList from './AssetList';
import AssetDetailView from './AssetDetailView';

import { useConfigurationData } from '@/hooks/useConfigurationData-old';

const tabs = [
  'Asset Type Schema',
  'PPC Strategy',
  'Spare Parts',
  'Asset',
  'Asset Detail',
];

interface Props {
  defaultAssetTypeId?: string;
}

export default function ConfigurationPage({ defaultAssetTypeId }: Props) {
  const {
    categories,
    assetTypes,
    filteredAssetTypes,
    selectedCategory,
    selectedAssetTypeId,
    schema,
    assets,
    assetDetails,
    setSelectedCategory,
    setSelectedAssetTypeId,
    loading,
  } = useConfigurationData();

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const assetTypeOptions = useMemo(() => {
    return assetTypes.filter((a) => a.category_id === selectedCategory);
  }, [assetTypes, selectedCategory]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-bold">
        ⚙️ Konfigurasi Aset: {selectedAssetTypeId || '—'}
      </h1>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <SelectCategory
          categories={categories.map((c) => ({ category_id: c, name: c }))}
          value={selectedCategory}
          onChange={setSelectedCategory}
        />

        <SelectAssetType
          category={selectedCategory}
          assetTypes={assetTypeOptions}
          value={selectedAssetTypeId}
          onChange={setSelectedAssetTypeId}
        />
      </div>

      {/* Tabs Navigation */}
      <div className="mb-4 border-b">
        <nav className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`border-b-2 px-4 py-2 ${
                activeTab === tab
                  ? 'border-blue-600 font-semibold text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-blue-500'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="rounded-md border bg-white p-4">
        {loading ? (
          <p>🔄 Memuat data...</p>
        ) : (
          <>
            {activeTab === 'Asset Type Schema' && schema && (
              <SchemaPreview schema={schema} />
            )}

            {activeTab === 'PPC Strategy' && schema && (
              <PPCStrategyPanel value={schema.ppc_strategy} readOnly />
            )}

            {activeTab === 'Spare Parts' && schema && (
              <SparePartsTable value={schema.spare_parts} readOnly />
            )}

            {activeTab === 'Asset' && assets && <AssetList data={assets} />}

            {activeTab === 'Asset Detail' && assetDetails && schema && (
              <AssetDetailView data={assetDetails[0]} fields={schema.fields} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
