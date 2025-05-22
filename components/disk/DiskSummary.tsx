"use client";

import React from "react";

interface DiskSummaryProps {
  sequence: number[]; // full sequence including initial head
  totalMovement: number;
}

export default function DiskSummary({
  sequence,
  totalMovement,
}: DiskSummaryProps) {
  const steps = sequence.length - 1;
  const average = (totalMovement / steps).toFixed(2);

  // Build per-step rows: from → to, movement
  const rows = sequence.slice(1).map((track, i) => {
    const from = sequence[i];
    const movement = Math.abs(track - from);
    return { step: i + 1, from, to: track, movement };
  });

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow border border-gray-200 dark:border-gray-700 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Summary
      </h3>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center space-x-2">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Total Movements
          </span>
          <span className="font-bold text-lg">{steps}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Total Head Movement
          </span>
          <span className="font-bold text-lg">{totalMovement}</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            Avg. Seek Distance
          </span>
          <span className="font-bold text-lg">{average}</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="px-3 py-2">Step</th>
              <th className="px-3 py-2">From</th>
              <th className="px-3 py-2">To</th>
              <th className="px-3 py-2">Movement</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.step}
                className="odd:bg-gray-50 dark:odd:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="px-3 py-2">{r.step}</td>
                <td className="px-3 py-2">{r.from}</td>
                <td className="px-3 py-2">{r.to}</td>
                <td className="px-3 py-2">{r.movement}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
