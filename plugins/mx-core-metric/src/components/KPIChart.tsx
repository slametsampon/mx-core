// plugins/mx-core-metric/src/components/KPIChart.tsx

'use client';
import { Line } from 'react-chartjs-2';
import { useKpiData } from '@/hooks/useKpiData';
import { groupKPIByMonth } from '@/utils/groupByMonth';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function KPIChart() {
  const { data, loading } = useKpiData();
  if (loading || !data) return <p>Loading chart...</p>;

  const year = new Date().getFullYear();
  const grouped = groupKPIByMonth(data, year);

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: `KPI ${year}`,
        data: Object.values(grouped),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div className="my-6">
      <h3 className="mb-2 text-lg font-semibold">📈 KPI Trend ({year})</h3>
      <Line data={chartData} />
    </div>
  );
}
