// plugins/mx-core-rbm/src/components/configuration/import/UnitSelector.tsx

'use client';

import React from 'react';
import { COMMON_UNITS } from '@/constants/units';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function UnitSelector({ value, onChange }: Props) {
  return (
    <select
      className="w-full rounded border px-2 py-1"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
    >
      {COMMON_UNITS.map((unit) => (
        <option key={unit} value={unit}>
          {unit === '' ? '--' : unit}
        </option>
      ))}
    </select>
  );
}
