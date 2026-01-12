// plugins/mx-core-rbm/src/components/configuration/ImportExportControls.tsx

import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { FieldDefinition } from '@/models/asset/asset-type-schema';

type Props = {
  fields: FieldDefinition[];
  sortedData: Record<string, any>[];
  setData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

export default function ImportExportControls({
  fields,
  sortedData,
  setData,
}: Props) {
  const handleExportCSV = () => {
    const csv = Papa.unparse(sortedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'export.csv');
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const importedData = results.data as Record<string, any>[];

        const validColumns = fields.map((f) => f.name);
        const isValid = importedData.every((item) =>
          validColumns.every((col) => col in item)
        );

        if (!isValid) {
          alert('❌ CSV tidak valid. Pastikan semua kolom sesuai format.');
          return;
        }

        setData((prev) => [...prev, ...importedData]);
        e.target.value = '';
      },
      error: function (err) {
        alert(`❌ Gagal import CSV: ${err.message}`);
      },
    });
  };

  return (
    <div className="flex gap-4 text-sm">
      <label className="cursor-pointer text-blue-600 hover:underline">
        Import CSV
        <input
          type="file"
          accept=".csv"
          onChange={handleImportCSV}
          className="hidden"
        />
      </label>

      <button
        onClick={handleExportCSV}
        className="text-green-600 hover:underline"
      >
        Export CSV
      </button>
    </div>
  );
}
