// plugins/mx-core-rbm/src/services/importer.ts

import * as XLSX from 'xlsx';

/* ======================================================
 * TYPES
 * ====================================================== */

export interface WorksheetDefinition {
  worksheet: string;
  label: string;
  suggestedSchemaName: string;
  categoryId: string;

  headers: string[];
  data: Record<string, any>[];
}

export interface ParsedXlsxResult {
  workbookName: string;
  rawData: Record<string, any[]>;
  worksheetDefs: WorksheetDefinition[];
}

/* ======================================================
 * CONSTANT
 * ====================================================== */

const XLSX_FILE_PATH = '/mocks/KDIA-2026.xlsx';

/* ======================================================
 * HELPERS
 * ====================================================== */

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

/**
 * 🔑 Deteksi header dinamis
 * - Cari baris dengan kolom pertama: No | NO | No.
 * - Fallback ke row index = 3 (Excel row 4)
 */
function extractTableFromSheet(sheet: XLSX.WorkSheet): {
  headers: string[];
  data: Record<string, any>[];
} {
  const ref = sheet['!ref'];
  if (!ref) return { headers: [], data: [] };

  const range = XLSX.utils.decode_range(ref);
  let headerRowIndex = -1;

  for (let r = range.s.r; r <= range.e.r; r++) {
    const cell = sheet[XLSX.utils.encode_cell({ r, c: 0 })];
    const value = cell?.v?.toString().trim().toLowerCase();

    if (value === 'no' || value === 'no.' || value === 'no ') {
      headerRowIndex = r;
      break;
    }
  }

  // Fallback jika tidak ketemu
  if (headerRowIndex === -1) {
    headerRowIndex = 3;
  }

  const table = XLSX.utils.sheet_to_json<any[]>(sheet, {
    header: 1,
    range: {
      s: { r: headerRowIndex, c: range.s.c },
      e: { r: range.e.r, c: range.e.c },
    },
    defval: '',
  });

  if (table.length === 0) {
    return { headers: [], data: [] };
  }

  const [headerRow, ...bodyRows] = table;

  const headers: string[] = headerRow.map((h: any) => String(h || '').trim());

  const data = bodyRows.map((row) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx];
    });
    return obj;
  });

  return { headers, data };
}

/* ======================================================
 * MAIN PARSER
 * ====================================================== */

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

    /* ================= MENU ================= */

    const menuSheet = workbook.Sheets['Menu'];
    const worksheetDefsBase: Omit<WorksheetDefinition, 'headers' | 'data'>[] =
      [];

    const START_ROW = 4;
    const END_ROW = 34;

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
          worksheetDefsBase.push({
            worksheet: wsValue,
            label: labelValue,
            suggestedSchemaName: normalizeLabel(labelValue),
            categoryId: '',
          });
        }
      }
    }

    /* ================= WORKSHEETS ================= */

    const rawData: Record<string, any[]> = {};
    const worksheetDefs: WorksheetDefinition[] = [];

    for (const wsName of workbook.SheetNames) {
      if (wsName === 'Menu') continue;

      const sheet = workbook.Sheets[wsName];
      const { headers, data } = extractTableFromSheet(sheet);

      rawData[wsName] = data;

      const base = worksheetDefsBase.find((d) => d.worksheet === wsName);
      if (base) {
        worksheetDefs.push({
          ...base,
          headers,
          data,
        });
      }
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
