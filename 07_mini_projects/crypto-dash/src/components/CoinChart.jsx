import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      const data = await res.json();

      const prices = data.prices.map((price) => ({
        x: price[0],
        y: price[1],
      }));

      //   console.log(prices);

      setChartData({
        datasets: [
          {
            label: 'Price (USD)',
            data: prices,
            fill: true,
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            pointRadius: 0,
            tension: 0.3,
          },
        ],
      });

      setLoading(false);
    };

    fetchChartData();
  }, [coinId]);

  if (loading) return <p>Loading chart...</p>;
  return (
    <div style={{ marginTop: '30px' }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: { ticks: { callback: (value) => `$${value.toLocaleString()}` } },
          },
        }}
      />
    </div>
  );
};

export default CoinChart;
