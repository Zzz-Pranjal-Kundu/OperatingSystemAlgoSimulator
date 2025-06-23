"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface ComparisonBarChartProps {
  results: {
    [algorithm: string]: {
      metrics: {
        totalWaiting: number;
        totalTurnaround: number;
        totalTime: number;
        busyTime: number;
        cpuUtil: number;
      };
    };
  };
  type: "totalWaiting" | "totalTurnaround" | "cpuUtil";
  label: string;
  color?: string;
}

export default function ComparisonBarChart({
  results,
  type,
  label,
  color,
}: ComparisonBarChartProps) {
  const colorMap: Record<typeof type, string> = {
    totalWaiting: "#ef4444",      // Red-500
    totalTurnaround: "#f97316",   // Orange-500
    cpuUtil: "#eab308",           // Amber-500
  };

  const selectedColor = color || colorMap[type];

  const data = Object.entries(results).map(([name, { metrics }]) => ({
    name,
    value: type === "cpuUtil" ? metrics.cpuUtil : metrics[type],
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow border">
      <h3 className="text-lg font-semibold mb-4 text-center">{label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="value"
            fill={selectedColor}
            radius={[4, 4, 0, 0]}
            stroke="#1f2937"          // Tailwind's gray-800
            strokeWidth={1.5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
