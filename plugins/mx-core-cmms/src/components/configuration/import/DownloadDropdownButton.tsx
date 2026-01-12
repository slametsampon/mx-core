// plugins/mx-core-rbm/src/components/configuration/import/DownloadDropdownButton.tsx

'use client';

import React, { useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { FieldDefinition } from '@/types/AssetTypeSchema';
import {
  buildSchemaJSON,
  convertRowsToCSV,
  triggerDownload,
} from '@/services/exporter';

type Props = {
  assetTypeId: string;
  label: string;
  categoryId: string;
  fields: FieldDefinition[];
  disabled?: boolean;
  dataRows: Record<string, any>[];
};

export default function DownloadDropdownButton({
  assetTypeId,
  label,
  categoryId,
  fields,
  disabled,
  dataRows,
}: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportJSON = () => {
    const json = buildSchemaJSON(assetTypeId, label, categoryId, fields);
    triggerDownload(json, `${assetTypeId}.json`, 'application/json');
  };

  const handleExportCSV = () => {
    try {
      setIsExporting(true);
      const csv = convertRowsToCSV(fields, dataRows);
      triggerDownload(csv, `${assetTypeId}.csv`, 'text/csv;charset=utf-8;');
    } catch (err) {
      alert('⚠️ Gagal export CSV');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        disabled={disabled}
        className={`rounded border bg-white px-4 py-2 text-sm font-medium shadow ${
          disabled
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        💾 Download ▾
      </MenuButton>

      <MenuItems className="absolute z-10 mt-2 w-48 origin-top-left divide-y divide-gray-200 rounded border bg-white shadow-lg focus:outline-none">
        <div className="py-1 text-sm">
          <MenuItem>
            <button
              onClick={handleExportJSON}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              📁 Export Schema (.json)
            </button>
          </MenuItem>

          <MenuItem>
            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              📊 Export Data (.csv)
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
