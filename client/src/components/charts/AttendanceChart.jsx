import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AttendanceChart = ({ data }) => {
  const labels = data?.labels || ['Present', 'Absent', 'Late'];
  const values = data?.values || [0, 0, 0];

  return (
    <div className="surface rounded-3xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Attendance Analytics</h3>
        <span className="badge">Live</span>
      </div>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Attendance',
              data: values,
              backgroundColor: ['#22c55e', '#ef4444', '#38bdf8'],
              borderRadius: 12
            }
          ]
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } },
            y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148,163,184,0.12)' } }
          }
        }}
      />
    </div>
  );
};

export default AttendanceChart;
