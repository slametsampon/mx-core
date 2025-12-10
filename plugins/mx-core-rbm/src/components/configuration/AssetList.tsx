// plugins/mx-core-rbm/src/components/configuration/AssetList.tsx

'use client';

import { Asset } from '@/models/asset';

type Props = {
  data: Asset[];
};

export default function AssetList({ data }: Props) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500">Tidak ada data aset.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="border p-2">Tag Number</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Unit</th>
            <th className="border p-2">Area</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Criticality</th>
            <th className="border p-2">Tier</th>
            <th className="border p-2">Installation Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((asset) => (
            <tr key={asset.tag_number}>
              <td className="border p-2">{asset.tag_number}</td>
              <td className="border p-2">{asset.description}</td>
              <td className="border p-2">{asset.unit}</td>
              <td className="border p-2">{asset.area}</td>
              <td className="border p-2">{asset.status}</td>
              <td className="border p-2">{asset.criticality || '-'}</td>
              <td className="border p-2">{asset.tier || '-'}</td>
              <td className="border p-2">{asset.installation_date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
