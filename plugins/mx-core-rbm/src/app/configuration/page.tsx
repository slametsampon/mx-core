// plugins/mx-core-rbm/src/app/configuration/page.tsx

'use client';

import { ImportSchemaProvider } from '@/contexts/ImportSchemaContext';
import ConfigurationContent from './ConfigurationContent'; // ✅ Tambahkan komponen pemisah (lihat bawah)

export default function ConfigurationRootPage() {
  return (
    <ImportSchemaProvider>
      <ConfigurationContent />
    </ImportSchemaProvider>
  );
}
