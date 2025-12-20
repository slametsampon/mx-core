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

export function useColumnInference(
  headerRow: string[],
  rows: any[]
): InferredField[] {
  return useMemo(() => {
    return headerRow.map((label) => {
      const suggestedName = toSnakeCase(label);
      const sampleValues = rows.map((row) => row[label]);

      const fieldType = guessType(sampleValues);
      const unit = extractUnit(label);

      return {
        label,
        suggestedName,
        type: fieldType,
        required: sampleValues.some((v) => v !== '' && v !== null),
        include: true,
        ...(unit ? { unit } : {}),
      };
    });
  }, [headerRow, rows]);
}
