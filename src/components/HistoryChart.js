



// components/HistoryChart.js
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
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
  Legend
);

const HistoryChart = ({ user }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.email) return;
      try {
        const q = query(collection(db, "history"), where("email", "==", user.email));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => doc.data());
        setData(results);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, [user]);

  const chartData = {
    labels: data.map(
      item => `${item.city} (${new Date(item.timestamp?.seconds * 1000).toLocaleDateString()})`
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map(item => item.temperature),
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
        fill: false,
      },
      {
        label: "Rainfall (mm)",
        data: data.map(item => item.rainfall),
        borderColor: "rgba(16,185,129,1)",
        backgroundColor: "rgba(16,185,129,0.2)",
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Weather History",
      },
    },
  };

  return (
    <div className="mt-10 bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Weather History</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HistoryChart;
