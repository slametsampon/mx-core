// plugins/mx-core-rbm/src/hooks/useColumnInference.ts

import { useMemo } from 'react';
import { toSnakeCase } from '@/utils/snakeCase';

export type InferredField = {
  label: string;
  suggestedName: string;
  type: 'string' | 'number' | 'boolean' | 'enum';
  required: boolean;
  unit?: string;
  include: boolean;
};

function guessType(values: any[]): 'string' | 'number' | 'boolean' | 'enum' {
  const nonEmpty = values.filter(
    (v) => v !== '' && v !== null && v !== undefined
  );

  const numValues = nonEmpty.filter((v) => !isNaN(Number(v)));
  const boolValues = nonEmpty.filter((v) =>
    ['true', 'false', 'yes', 'no'].includes(String(v).toLowerCase())
  );

  if (boolValues.length === nonEmpty.length) return 'boolean';
  if (numValues.length === nonEmpty.length) return 'number';

  const unique = [...new Set(nonEmpty.map((v) => String(v).trim()))];
  if (unique.length > 1 && unique.length <= 6) return 'enum';

  return 'string';
}

function extractUnit(header: string): string | undefined {
  const match = header.match(/\((.*?)\)/);
  return match ? match[1] : undefined;
}

// 🔍 Tambahan: Deteksi baris dengan NO = 1
function findRowWithNo1(rows: any[]): Record<string, any> | null {
  const potentialNoKeys = ['no', 'no.', 'nomor', 'number'];

  for (const row of rows) {
    const matchKey = Object.keys(row).find((k) =>
      potentialNoKeys.includes(k.trim().toLowerCase())
    );
    if (matchKey && String(row[matchKey]).trim() === '1') {
      return row;
    }
  }

  return null;
}

export function useColumnInference(
  headerRow: string[],
  rows: any[]
): InferredField[] {
  return useMemo(() => {
    const rowNo1 = findRowWithNo1(rows); // 🎯 prioritas inferensi dari baris NO = 1

    return headerRow.map((label) => {
      const suggestedName = toSnakeCase(label);
      const sampleValues = rows.map((row) => row[label]);
      const unit = extractUnit(label);

      // 🎯 Prefill type dari row NO=1 jika memungkinkan
      let type: InferredField['type'] = guessType(sampleValues);
      if (rowNo1 && label in rowNo1) {
        const value = rowNo1[label];
        if (typeof value === 'boolean') {
          type = 'boolean';
        } else if (!isNaN(Number(value))) {
          type = 'number';
        } else {
          const valStr = String(value).toLowerCase().trim();
          if (['yes', 'no', 'true', 'false'].includes(valStr)) {
            type = 'boolean';
          } else if (valStr.length > 0 && valStr.length <= 20) {
            type = 'string';
          }
        }
      }

      return {
        label,
        suggestedName,
        type,
        required: sampleValues.some((v) => v !== '' && v !== null),
        include: true,
        ...(unit ? { unit } : {}),
      };
    });
  }, [headerRow, rows]);
}
