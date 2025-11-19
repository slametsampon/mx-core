// apps/frontend/app/page.tsx

'use client';

import { useEffect, useState } from 'react';

interface PluginMeta {
  name: string;
  basePath: string;
  description: string;
  [key: string]: any;
}

export default function HomePage() {
  const [plugins, setPlugins] = useState<PluginMeta[]>([]);

  useEffect(() => {
    fetch('/plugin-manifest.json')
      .then((res) => res.json())
      .then(setPlugins);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Frontend Home</h1>

      <div className="space-y-2">
        {plugins.map((plugin) => (
          <a
            key={plugin.name}
            href={plugin.basePath}
            className="block rounded border p-4 hover:bg-gray-100"
          >
            <h2 className="text-xl font-semibold">{plugin.name}</h2>
            <p className="text-sm text-gray-600">{plugin.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
