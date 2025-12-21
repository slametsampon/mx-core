// plugins/mx-core-rbm/src/components/configuration/import/AssetTypeListEditor.tsx

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  WorksheetDefinition,
  parseAssetTypeWorkbook,
} from '@/services/importer';
import { exportAllSchemasToJSON } from '@/services/exporter';
import PaginationControls from '@/components/configuration/PaginationControls';

import { getService } from '@/services/getService';
import type { AssetCategory } from '@/models/asset/asset-category';

const ITEMS_PER_PAGE = 15;

/**
 * Local extended type
 * (TIDAK mengubah WorksheetDefinition global)
 */
type AssetTypeRow = WorksheetDefinition & {
  include: boolean;
};

export default function AssetTypeListEditor() {
  const [allSchemas, setAllSchemas] = useState<AssetTypeRow[]>([]);
  const [categories, setCategories] = useState<AssetCategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const categoryService = getService<AssetCategory>('asset-category');

  /* ======================================================
   * LOAD DATA
   * ====================================================== */
  useEffect(() => {
    const load = async () => {
      const result = await parseAssetTypeWorkbook();

      // ⬇ sort by label + inject include flag
      const prepared: AssetTypeRow[] = result.worksheetDefs
        .map((w) => ({
          ...w,
          include: true, // default checked
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

      setAllSchemas(prepared);

      const cats = await categoryService.getAll();
      setCategories(cats);
    };

    load();
  }, []);

  /* ======================================================
   * HANDLERS
   * ====================================================== */
  const updateRow = (index: number, patch: Partial<AssetTypeRow>) => {
    const updated = [...allSchemas];
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    updated[globalIndex] = {
      ...updated[globalIndex],
      ...patch,
    };
    setAllSchemas(updated);
  };

  /* ======================================================
   * PAGINATION
   * ====================================================== */
  const totalPages = Math.ceil(allSchemas.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = useMemo(
    () => allSchemas.slice(startIndex, startIndex + ITEMS_PER_PAGE),
    [allSchemas, startIndex]
  );

  /* ======================================================
   * VALIDATION BEFORE EXPORT
   * ====================================================== */
  const validateBeforeExport = (rows: AssetTypeRow[]) => {
    if (rows.length === 0) {
      alert('⚠️ Tidak ada asset-type yang dipilih (include)');
      return false;
    }

    // wajib terisi
    for (const r of rows) {
      if (!r.suggestedSchemaName.trim()) {
        alert(`⚠️ Suggested Name kosong pada "${r.label}"`);
        return false;
      }
      if (!r.categoryId) {
        alert(`⚠️ Category belum dipilih pada "${r.label}"`);
        return false;
      }
    }

    // tidak boleh duplicate suggested name
    const names = rows.map((r) => r.suggestedSchemaName);
    const unique = new Set(names);
    if (unique.size !== names.length) {
      alert('⚠️ Suggested Name tidak boleh duplikat');
      return false;
    }

    return true;
  };

  /* ======================================================
   * EXPORT
   * ====================================================== */
  const handleExport = () => {
    const included = allSchemas.filter((s) => s.include);

    if (!validateBeforeExport(included)) return;

    const payload = included.map((s) => ({
      asset_type_id: s.suggestedSchemaName,
      label: s.label,
      category_id: s.categoryId!,
    }));

    exportAllSchemasToJSON(payload);
  };

  /* ======================================================
   * RENDER
   * ====================================================== */
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">📦 Asset Type List</h2>

      {/* ================= TABLE ================= */}
      <table className="min-w-full table-fixed border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="w-8 border px-2 py-1 text-center">
              <input
                type="checkbox"
                checked={allSchemas.every((s) => s.include)}
                onChange={(e) =>
                  setAllSchemas((prev) =>
                    prev.map((s) => ({
                      ...s,
                      include: e.target.checked,
                    }))
                  )
                }
              />
            </th>
            <th className="w-8 border px-2 py-1">No</th>
            <th className="border px-2 py-1">Label Name</th>
            <th className="border px-2 py-1">Suggested Name</th>
            <th className="border px-2 py-1">Category</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, idx) => (
            <tr key={item.worksheet}>
              <td className="border px-2 py-1 text-center">
                <input
                  type="checkbox"
                  checked={item.include}
                  onChange={(e) =>
                    updateRow(idx, { include: e.target.checked })
                  }
                />
              </td>

              <td className="border px-2 py-1">{startIndex + idx + 1}</td>

              <td className="border px-2 py-1">{item.label}</td>

              <td className="border px-2 py-1">
                <input
                  type="text"
                  className="w-full border px-1 py-0.5"
                  value={item.suggestedSchemaName}
                  onChange={(e) =>
                    updateRow(idx, {
                      suggestedSchemaName: e.target.value,
                    })
                  }
                />
              </td>

              <td className="border px-2 py-1">
                <select
                  className="w-full border px-1 py-0.5"
                  value={item.categoryId}
                  onChange={(e) =>
                    updateRow(idx, { categoryId: e.target.value })
                  }
                >
                  <option value="">-- Pilih --</option>
                  {categories.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= FOOTER ================= */}
      <div className="flex items-center justify-between pt-2">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
          onRowsPerPageChange={() => {}}
        />

        <button
          onClick={handleExport}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          💾 Export as JSON
        </button>
      </div>
    </div>
  );
}
