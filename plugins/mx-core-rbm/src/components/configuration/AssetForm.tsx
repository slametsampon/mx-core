// plugins/mx-core-rbm/src/components/configuration/AssetForm.tsx

'use client';

import { Asset } from '@/models/asset';

interface Props {
  asset: Asset;
}

export default function AssetForm({ asset }: Props) {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="tag_number" className="block text-sm font-medium">
          Tag Number
        </label>
        <input
          id="tag_number"
          type="text"
          value={asset.tag_number}
          readOnly
          className="w-full rounded border bg-gray-100 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={asset.description}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="asset_type_id" className="block text-sm font-medium">
          Asset Type ID
        </label>
        <input
          id="asset_type_id"
          type="text"
          value={asset.asset_type_id}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="unit" className="block text-sm font-medium">
          Unit
        </label>
        <input
          id="unit"
          type="text"
          value={asset.unit}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="area" className="block text-sm font-medium">
          Area
        </label>
        <input
          id="area"
          type="text"
          value={asset.area}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium">
          Status
        </label>
        <input
          id="status"
          type="text"
          value={asset.status}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      {asset.installation_date && (
        <div>
          <label
            htmlFor="installation_date"
            className="block text-sm font-medium"
          >
            Installation Date
          </label>
          <input
            id="installation_date"
            type="date"
            value={asset.installation_date}
            className="w-full rounded border px-3 py-2"
          />
        </div>
      )}
    </form>
  );
}
