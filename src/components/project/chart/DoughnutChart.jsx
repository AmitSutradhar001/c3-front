import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";
import { useEffect, useRef } from "react";
import "../../../css/components/project/chart/DoughnutChart.css";

// Register the necessary components
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: {
        labels: ["Total Problems", " Problems solved", " Problems unsolved"],
        datasets: [
          {
            data: [43, 25, 18],
            backgroundColor: [
              "rgb(54, 162, 235)",
              "rgb(144, 238, 144)",
              "rgb(255, 99, 132)",
            ],
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="dn-div">
      <h2 className="dn-h2">Progress Report</h2>
      <canvas ref={chartRef} style={{ width: "50px", height: "50px" }} />
    </div>
  );
};

export default DoughnutChart;
