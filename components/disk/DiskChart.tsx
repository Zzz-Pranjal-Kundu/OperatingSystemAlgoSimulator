// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface DiskChartProps {
//   sequence: number[];
// }

// export default function DiskChart({ sequence }: DiskChartProps) {
//   // build { step, track } data
//   const data = sequence.map((track, idx) => ({ step: idx, track }));
//   return (
//     <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="step"
//             label={{ value: "Step", position: "insideBottom", offset: -5 }}
//           />
//           <YAxis
//             label={{ value: "Track#", angle: -90, position: "insideLeft" }}
//           />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="track"
//             stroke="#3b82f6"
//             dot={{ r: 4 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


// "use client";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface DiskChartProps {
//   sequence: number[];
// }

// export default function DiskChart({ sequence }: DiskChartProps) {
//   // Convert sequence to stepped format:
//   // between each track movement, add intermediate horizontal steps
//   const data = [];

//   for (let i = 0; i < sequence.length; i++) {
//     if (i !== 0) {
//       data.push({ step: i * 2 - 1, track: sequence[i - 1] }); // horizontal line
//     }
//     data.push({ step: i * 2, track: sequence[i] }); // vertical line
//   }

//   return (
//     <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-all duration-500">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis
//             dataKey="step"
//             label={{ value: "Step", position: "insideBottom", offset: -5 }}
//             tick={{ fill: "#6b7280" }}
//           />
//           <YAxis
//             label={{
//               value: "Track #",
//               angle: -90,
//               position: "insideLeft",
//             }}
//             tick={{ fill: "#6b7280" }}
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#111827",
//               border: "none",
//               color: "#fff",
//             }}
//             labelStyle={{ color: "#93c5fd" }}
//             itemStyle={{ color: "#fff" }}
//           />
//           <Line
//             type="stepAfter"
//             dataKey="track"
//             stroke="#3b82f6"
//             strokeWidth={2}
//             dot={{ r: 4 }}
//             isAnimationActive={true}
//             animationDuration={1000}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DiskChartProps {
  sequence: number[];
}

export default function DiskChart({ sequence }: DiskChartProps) {
  const data = sequence.map((track, idx) => ({ step: idx, track }));

  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 rounded-xl shadow p-4 transition-all duration-500">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="track"
            label={{ value: "Track #", position: "insideBottom", offset: -5 }}
            tick={{ fill: "#6b7280" }}
          />
          <YAxis
            type="number"
            dataKey="step"
            label={{ value: "Step", angle: -90, position: "insideLeft" }}
            tick={{ fill: "#6b7280" }}
            domain={[data.length - 1, 0]} // Flip Y-axis domain to invert direction
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#111827", border: "none", color: "#fff" }}
            labelStyle={{ color: "#93c5fd" }}
            itemStyle={{ color: "#fff" }}
          />
          <Line
            type="stepAfter"
            dataKey="track"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
