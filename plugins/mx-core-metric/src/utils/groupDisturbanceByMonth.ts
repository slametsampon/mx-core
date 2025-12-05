// plugins/mx-core-metric/src/utils/groupDisturbanceByMonth.ts

export function groupDisturbanceByMonth(data: any[], year: number) {
  const result: Record<string, number> = {};

  for (const item of data) {
    const date = new Date(item.periode);
    if (date.getFullYear() !== year) continue;

    const month = date.toLocaleString('default', { month: 'short' });

    // Total durasi per bulan
    result[month] = (result[month] || 0) + item.duration_minutes;
  }

  return result;
}
