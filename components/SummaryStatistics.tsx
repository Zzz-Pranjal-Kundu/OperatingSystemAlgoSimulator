"use client";

import React from "react";

type SummaryStatisticsProps = {
  totalProcesses: number;
  totalWaiting: number;
  totalTurnaround: number;
  totalTime: number;
  busyTime: number;
  cpuUtil: number;
};

export default function SummaryStatistics({
  totalProcesses,
  totalWaiting,
  totalTurnaround,
  totalTime,
  busyTime,
  cpuUtil,
}: SummaryStatisticsProps) {
  const avgWaiting = totalProcesses
    ? (totalWaiting / totalProcesses).toFixed(2)
    : "0.00";
  const avgTurnaround = totalProcesses
    ? (totalTurnaround / totalProcesses).toFixed(2)
    : "0.00";
  const throughput = totalTime
    ? (totalProcesses / totalTime).toFixed(2)
    : "0.00";
  const utilPct = cpuUtil.toFixed(2);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4 max-w-md">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Summary Statistics
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="font-medium">Avg Waiting Time</div>
          <div>{avgWaiting}</div>
        </div>
        <div>
          <div className="font-medium">Avg Turnaround Time</div>
          <div>{avgTurnaround}</div>
        </div>
        <div>
          <div className="font-medium">Throughput</div>
          <div>{throughput} proc/unit</div>
        </div>
        <div>
          <div className="font-medium">CPU Utilization</div>
          <div>{utilPct}%</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div>Total Time: {totalTime}</div>
        <div>Busy Time: {busyTime}</div>
      </div>
    </div>
  );
}
