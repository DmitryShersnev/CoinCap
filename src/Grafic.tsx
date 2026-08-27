import React from "react";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Grafic: React.FC = ({ coin }) => {
  if (!coin) {
    return <h2>Загрузка данных монеты...</h2>;
  }

  const timeLabels = coin.sparkline_in_7d.price.map(
    (_: number, index: number) => {
      const day = Math.floor(index / 24) + 1;
      const hour = index % 24;
      return `День ${day}, ${hour.toString().padStart(2, "0")}:00`;
    },
  );

  const graficData = {
    labels: timeLabels,
    datasets: [
      {
        label: "Цена ($)",
        data: coin.sparkline_in_7d.price,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const graficOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
        title: { display: true, text: "Цена" },
      },
      x: {
        title: { display: true, text: "Дни" },
        grid: {
          display: false,
        },

        ticks: {
          callback: function (val: any, index: number) {
            return index % 24 === 0 ? `День ${Math.floor(index / 24) + 1}` : "";
          },
          maxRotation: 0,
          autoSkip: false,
        },
      },
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "График изменения цены",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <div className="grafic">
      <Line data={graficData} options={graficOptions} />
    </div>
  );
};

export default Grafic;
