// apps/frontend/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
// Ambil BASE_PATH langsung dari public runtime config
const BASE_PATH = process.env.BASE_PATH ?? '';
export default function HomePage() {
    const [plugins, setPlugins] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const manifestPath = `${BASE_PATH}/plugin-manifest.json`;
        console.log('📦 Loading plugin manifest...');
        console.log('🔍 BASE_PATH:', BASE_PATH);
        console.log('🔗 Final fetch URL:', manifestPath);
        fetch(manifestPath)
            .then((res) => {
            console.log('📡 Fetch status:', res.status);
            if (!res.ok) {
                throw new Error(`❌ Failed to fetch manifest (${res.status}) from ${manifestPath}`);
            }
            return res.json();
        })
            .then((data) => {
            console.log('✅ Plugin manifest loaded:', data);
            setPlugins(data);
        })
            .catch((err) => {
            console.error('🚨 Error loading plugin manifest:', err.message);
            setError(err.message);
        });
    }, []);
    return (<div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Frontend Home</h1>

      {error && (<div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-800">
          ⚠️ {error}
        </div>)}

      <div className="space-y-2">
        {plugins.map((plugin) => (<a key={plugin.name} href={`${BASE_PATH}${plugin.basePath}`} className="block rounded border p-4 hover:bg-gray-100">
            <h2 className="text-xl font-semibold">{plugin.name}</h2>
            <p className="text-sm text-gray-600">{plugin.description}</p>
          </a>))}
      </div>
    </div>);
}
