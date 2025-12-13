// plugins/mx-core-rbm/src/components/configuration/PPCStrategyPanel.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { PpcStrategyDefinition } from '@/models/asset-type-schema';

type Props = {
  value: PpcStrategyDefinition;
  onChange?: (updated: PpcStrategyDefinition) => void;
  readOnly?: boolean;
};

export default function PPCStrategyPanel({
  value,
  onChange,
  readOnly = false,
}: Props) {
  const [strategy, setStrategy] = useState<PpcStrategyDefinition>(value);

  useEffect(() => {
    setStrategy(value);
  }, [value]);

  const handleChange = (
    type: keyof PpcStrategyDefinition,
    index: number,
    newValue: string
  ) => {
    const updated = { ...strategy };
    updated[type][index] = newValue;
    setStrategy(updated);
    onChange?.(updated);
  };

  const handleAdd = (type: keyof PpcStrategyDefinition) => {
    const updated = { ...strategy };
    updated[type] = [...updated[type], ''];
    setStrategy(updated);
    onChange?.(updated);
  };

  const handleRemove = (type: keyof PpcStrategyDefinition, index: number) => {
    const updated = { ...strategy };
    updated[type] = updated[type].filter((_, i) => i !== index);
    setStrategy(updated);
    onChange?.(updated);
  };

  const renderStrategyList = (
    type: keyof PpcStrategyDefinition,
    label: string
  ) => (
    <div>
      <h4 className="mb-2 font-semibold">{label}</h4>
      <ul className="space-y-2">
        {Array.isArray(strategy?.[type]) &&
          strategy[type].map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              {readOnly ? (
                <span className="text-sm">{item}</span>
              ) : (
                <>
                  <textarea
                    value={item}
                    onChange={(e) => handleChange(type, index, e.target.value)}
                    className="w-full rounded border border-gray-300 p-2 text-sm"
                  />
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={() => handleRemove(type, index)}
                  >
                    ✕
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
      {!readOnly && (
        <button
          type="button"
          className="mt-2 text-sm text-blue-600 hover:underline"
          onClick={() => handleAdd(type)}
        >
          + Tambah {label}
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderStrategyList('preventive', 'Preventive')}
      {renderStrategyList('predictive', 'Predictive')}
      {renderStrategyList('corrective', 'Corrective')}
    </div>
  );
}
