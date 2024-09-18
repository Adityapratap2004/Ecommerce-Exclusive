import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const SalesBarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month), // Month names
    datasets: [
      {
        label: 'Total Sales',
        data: data.map((item) => item.totalSales),
        backgroundColor: '#DB4444',
        borderColor: '#DB4444',
        borderWidth: 1,
        barThickness: 20,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        grid: {
          lineWidth: 0.2, 
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default SalesBarChart;
