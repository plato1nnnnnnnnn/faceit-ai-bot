import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Регистрация модулей Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Интерфейс для элемента данных графика.
 */
interface DataItem {
  label: string;
  value: number;
}

/**
 * Свойства компонента AnalysisResultsChart.
 */
interface AnalysisResultsChartProps {
  data: DataItem[];
}

/**
 * Компонент для отображения графика результатов анализа.
 * @param {AnalysisResultsChartProps} props - Свойства компонента.
 * @returns JSX.Element
 */
const AnalysisResultsChart: React.FC<AnalysisResultsChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: 'Анализ результатов',
        data: data.map((item) => item.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Указываем строгое значение
      },
      title: {
        display: true,
        text: 'Результаты анализа',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default AnalysisResultsChart;