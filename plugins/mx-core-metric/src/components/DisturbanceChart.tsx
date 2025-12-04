// plugins/mx-core-metric/src/components/DisturbanceChart.tsx

'use client';
import { useDisturbanceData } from '@/hooks/useDisturbanceData';
import { groupDisturbanceByMonth } from '@/utils/groupDisturbanceByMonth';
import { Bar } from 'react-chartjs-2';
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

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DisturbanceChart() {
  const { data, loading, error } = useDisturbanceData();
  const year = new Date().getFullYear();

  if (loading || !data) return <p>Loading disturbance chart...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const grouped = groupDisturbanceByMonth(data, year);

  const chartData = {
    labels: Object.keys(grouped),
    datasets: [
      {
        label: `Total Durasi Gangguan (${year})`,
        data: Object.values(grouped),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="my-6">
      <h3 className="mb-2 text-lg font-semibold">
        ⚠️ Grafik Durasi Gangguan ({year})
      </h3>
      <Bar data={chartData} />
    </div>
  );
}
