import React from "react";
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
import { Line } from "react-chartjs-2";
import { ForecastdayEntity } from "../types/forecast-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maitainAspectRatio: false,
  cubicInterpolationMode: "monotone",
};

interface ChartData {
  chartData: ForecastdayEntity[];
}

const LineChart: React.FC<ChartData> = ({ chartData }) => {
  const data = {
    labels: chartData.map((point) => point.date),
    datasets: [
      {
        label: "Max Temp",
        data: chartData.map((point) => point.day.maxtemp_c),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Avg Temp",
        data: chartData.map((point) => point.day.avgtemp_c),
        borderColor: "rgb(132, 99, 132)",
        backgroundColor: "rgba(132, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
