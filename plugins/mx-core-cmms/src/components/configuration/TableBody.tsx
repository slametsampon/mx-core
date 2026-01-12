// plugins/mx-core-rbm/src/components/configuration/TableBody.tsx

import { FieldDefinition } from '@/models/asset/asset-type-schema';

type Props = {
  data: Record<string, any>[];
  fields: FieldDefinition[];
  currentPage: number;
  rowsPerPage: number;
  onEdit?: (item: Record<string, any>) => void;
  onDelete?: (index: number) => void;
};

export default function TableBody({
  data,
  fields,
  currentPage,
  rowsPerPage,
  onEdit,
  onDelete,
}: Props) {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={fields.length + 2}
            className="px-4 py-4 text-center text-gray-500"
          >
            Tidak ada data ditemukan.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((item, idx) => (
        <tr key={idx} className="hover:bg-gray-50">
          <td className="px-4 py-2">
            {(currentPage - 1) * rowsPerPage + idx + 1}
          </td>
          {fields.map((f) => (
            <td key={f.name} className="px-4 py-2">
              {item[f.name] ?? '-'}
            </td>
          ))}
          {(onEdit || onDelete) && (
            <td className="space-x-2 px-4 py-2 text-center">
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() =>
                    onDelete((currentPage - 1) * rowsPerPage + idx)
                  }
                  className="text-red-600 hover:underline"
                >
                  🗑️
                </button>
              )}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}
