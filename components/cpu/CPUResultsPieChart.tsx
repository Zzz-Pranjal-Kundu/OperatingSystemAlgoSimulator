// components/cpu/CPUResultsPieChart.tsx
'use client';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#AA00FF'];

interface Props {
  results: {
    [key: string]: {
      metrics: {
        totalWaiting: number;
        totalTurnaround: number;
      };
    };
  };
  type: 'totalWaiting' | 'totalTurnaround';
}

export default function CPUResultsPieChart({ results, type }: Props) {
  const data = Object.entries(results).map(([key, val]) => ({
    name: key,
    value: val.metrics[type],
  }));

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-xl font-semibold mb-2">
        {type === 'totalWaiting' ? 'Total Waiting Time' : 'Total Turnaround Time'}
      </h2>
      <PieChart width={400} height={300}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
