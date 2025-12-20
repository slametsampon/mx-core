// plugins/mx-core-rbm/src/utils/cleaners.ts

export function cleanWorksheetData(
  rows: Record<string, any>[]
): Record<string, any>[] {
  return rows.map((row) => {
    const cleanedRow: Record<string, any> = {};

    for (const key in row) {
      const rawValue = row[key];

      if (typeof rawValue !== 'string') {
        cleanedRow[key] = rawValue; // biarkan value non-string (angka asli, boolean) tetap
        continue;
      }

      let value = rawValue.trim();

      // Ganti '-' (tunggal) jadi null
      if (value === '-' || value === '') {
        cleanedRow[key] = null;
        continue;
      }

      // Normalisasi desimal dengan koma → titik
      // Misal: "0,03", ",03", "1.000,5" → "0.03", "0.03", "1000.5"
      value = value
        .replace(/\./g, '') // hapus titik pemisah ribuan
        .replace(',', '.'); // ganti koma menjadi titik

      // Jika hasilnya angka valid, ubah ke number
      const asNumber = Number(value);
      if (!isNaN(asNumber) && value.match(/^[-+]?[0-9]*\.?[0-9]+$/)) {
        cleanedRow[key] = asNumber;
      } else {
        cleanedRow[key] = value;
      }
    }

    return cleanedRow;
  });
}
