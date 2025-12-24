// apps/frontend/components/ThemeToggle.tsx

'use client';

import { useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // dummy only

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      title="Toggle Theme"
      className="rounded bg-indigo-500 px-2 py-1 text-sm text-white hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
