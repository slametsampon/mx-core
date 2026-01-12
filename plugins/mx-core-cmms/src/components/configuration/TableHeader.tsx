// plugins/mx-core-rbm/src/components/configuration/TableHeader.tsx

import { FieldDefinition } from '@/models/asset/asset-type-schema';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type Props = {
  fields: FieldDefinition[];
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: (fieldName: string) => void;
  hasActionColumn?: boolean;
};

export default function TableHeader({
  fields,
  sortField,
  sortDirection,
  onSort,
  hasActionColumn = false,
}: Props) {
  return (
    <thead>
      <tr className="bg-gray-100 text-left">
        <th className="px-4 py-2">#</th>
        {fields.map((f) => {
          const isSorted = sortField === f.name;
          const SortIcon = () => {
            if (!isSorted) return null;
            return sortDirection === 'asc' ? (
              <ChevronUpIcon className="ml-1 inline h-4 w-4 text-gray-600" />
            ) : (
              <ChevronDownIcon className="ml-1 inline h-4 w-4 text-gray-600" />
            );
          };

          return (
            <th
              key={f.name}
              className="cursor-pointer select-none px-4 py-2 hover:underline"
              onClick={() => onSort(f.name)}
            >
              <span className="inline-flex items-center">
                {f.label}
                {isSorted && <SortIcon />}
              </span>
            </th>
          );
        })}
        {hasActionColumn && <th className="px-4 py-2 text-center">Aksi</th>}
      </tr>
    </thead>
  );
}
