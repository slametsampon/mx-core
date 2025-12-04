// plugins/mx-core-metric/src/utils/groupByMonth.ts

export function groupKPIByMonth(data: any[], year: number) {
  const grouped: Record<string, number> = {};

  for (const item of data) {
    const date = new Date(item.periode);
    if (date.getFullYear() !== year) continue;

    const month = date.toLocaleString('default', { month: 'short' });
    grouped[month] = (grouped[month] || 0) + item.value;
  }

  return grouped;
}
