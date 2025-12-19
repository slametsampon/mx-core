// plugins/mx-core-rbm/src/contexts/ImportSchemaContext.tsx

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { parseAssetTypeWorkbook, ParsedXlsxResult } from '@/services/importer';

type ImportSchemaContextType = {
  isLoading: boolean;
  error: string | null;
  worksheetDefs: ParsedXlsxResult['worksheetDefs'];
  rawData: ParsedXlsxResult['rawData'];
  getWorksheetRows: (ws: string) => any[];
};

const ImportSchemaContext = createContext<ImportSchemaContextType | undefined>(
  undefined
);

export const ImportSchemaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [worksheetDefs, setWorksheetDefs] = useState<
    ParsedXlsxResult['worksheetDefs']
  >([]);
  const [rawData, setRawData] = useState<ParsedXlsxResult['rawData']>({});

  useEffect(() => {
    async function load() {
      try {
        const result = await parseAssetTypeWorkbook();
        setWorksheetDefs(result.worksheetDefs);
        setRawData(result.rawData);
      } catch (err: any) {
        setError(err.message || 'Gagal memuat file XLSX.');
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const getWorksheetRows = (ws: string) => rawData[ws] ?? [];

  return (
    <ImportSchemaContext.Provider
      value={{
        isLoading,
        error,
        worksheetDefs,
        rawData,
        getWorksheetRows,
      }}
    >
      {children}
    </ImportSchemaContext.Provider>
  );
};

export const useImportSchema = () => {
  const ctx = useContext(ImportSchemaContext);
  if (!ctx) {
    throw new Error('useImportSchema must be used within ImportSchemaProvider');
  }
  return ctx;
};
