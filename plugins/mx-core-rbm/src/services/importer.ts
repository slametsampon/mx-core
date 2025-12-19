// plugins/mx-core-rbm/src/services/importer.ts

import * as XLSX from 'xlsx';

export interface WorksheetDefinition {
  worksheet: string;
  label: string;
  suggestedSchemaName: string;
  categoryId: string;
}

export interface ParsedXlsxResult {
  workbookName: string;
  rawData: Record<string, any[]>;
  worksheetDefs: WorksheetDefinition[];
}

const XLSX_FILE_PATH = '/mocks/KDIA-2026.xlsx';

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .trim();
}

function readCell(sheet: XLSX.WorkSheet, cell: string): string | null {
  return sheet[cell]?.v?.toString().trim() || null;
}

export async function parseAssetTypeWorkbook(): Promise<ParsedXlsxResult> {
  try {
    const res = await fetch(XLSX_FILE_PATH);
    if (!res.ok) {
      throw new Error(`File tidak ditemukan: ${XLSX_FILE_PATH}`);
    }

    const buffer = await res.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });

    if (!workbook.SheetNames.includes('Menu')) {
      throw new Error('Worksheet "Menu" tidak ditemukan.');
    }

    const menuSheet = workbook.Sheets['Menu'];
    const worksheetDefs: WorksheetDefinition[] = [];

    // 🔑 BARIS DATA FIX
    const START_ROW = 4;
    const END_ROW = 34;

    // 🔑 3 KELOMPOK KOLOM
    const columnGroups = [
      { ws: 'A', label: 'B' },
      { ws: 'E', label: 'F' },
      { ws: 'I', label: 'J' },
    ];

    for (let row = START_ROW; row <= END_ROW; row++) {
      for (const col of columnGroups) {
        const wsValue = readCell(menuSheet, `${col.ws}${row}`);
        const labelValue = readCell(menuSheet, `${col.label}${row}`);

        if (wsValue && labelValue) {
          worksheetDefs.push({
            worksheet: wsValue,
            label: labelValue,
            suggestedSchemaName: normalizeLabel(labelValue),
            categoryId: '',
          });
        }
      }
    }

    // ✅ EKSTRAK SEMUA WORKSHEET DATA
    const rawData: Record<string, any[]> = {};
    for (const wsName of workbook.SheetNames) {
      const sheet = workbook.Sheets[wsName];
      rawData[wsName] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    }

    return {
      workbookName: workbook.Props?.Title ?? 'KDIA 2026',
      rawData,
      worksheetDefs,
    };
  } catch (error: any) {
    console.error('[importer] Error:', error.message);
    throw new Error('Gagal memuat dan memproses file XLSX.');
  }
}
