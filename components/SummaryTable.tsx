// components/cpu/SummaryTable.tsx
"use client";

import React, { useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type ScheduledSlice = {
  process_id: number;
  arrival_time: number; // actual start time of this slice
  burst_time: number;
  background: string;
  priority?: number;
};

export type OriginalProcess = {
  process_id: number;
  arrival_time: number;
  burst_time: number;
  background: string;
  priority?: number;
};

export type SummaryTableProps = {
  originalProcesses: OriginalProcess[];
  scheduledProcesses: ScheduledSlice[];
  algorithm: string;
  onMetrics?: (metrics: {
    totalWaiting: number;
    totalTurnaround: number;
    totalTime: number;
    busyTime: number;
    cpuUtil: number;
  }) => void;
};

export default function SummaryTable({
  originalProcesses,
  scheduledProcesses,
  algorithm,
  onMetrics,
}: SummaryTableProps) {
  // Group slices by PID
  const slicesByPid = useMemo(() => {
    const map = new Map<number, ScheduledSlice[]>();
    scheduledProcesses.forEach((slc) => {
      const arr = map.get(slc.process_id) || [];
      arr.push(slc);
      map.set(slc.process_id, arr);
    });
    return map;
  }, [scheduledProcesses]);

  // Compute per-process waiting & turnaround
  const perProcess = useMemo(() => {
    return originalProcesses.map((proc) => {
      const slices = (slicesByPid.get(proc.process_id) || []).sort(
        (a, b) => a.arrival_time - b.arrival_time
      );

      let currentTime = proc.arrival_time;
      let waiting = 0;
      let service = 0;

      slices.forEach((slc) => {
        if (slc.arrival_time > currentTime) {
          waiting += slc.arrival_time - currentTime;
        }
        currentTime = slc.arrival_time + slc.burst_time;
        service += slc.burst_time;
      });

      return {
        ...proc,
        waitingTime: waiting,
        turnaroundTime: waiting + service,
      };
    });
  }, [originalProcesses, slicesByPid]);

  // Aggregate metrics
  const totalWaiting = perProcess.reduce((sum, p) => sum + p.waitingTime, 0);
  const totalTurnaround = perProcess.reduce(
    (sum, p) => sum + p.turnaroundTime,
    0
  );

  const firstTime =
    scheduledProcesses.length > 0
      ? Math.min(...scheduledProcesses.map((p) => p.arrival_time))
      : 0;
  const lastTime =
    scheduledProcesses.length > 0
      ? Math.max(
          ...scheduledProcesses.map((p) => p.arrival_time + p.burst_time)
        )
      : 0;
  const totalTime = lastTime - firstTime;
  const busyTime = scheduledProcesses.reduce((sum, p) => sum + p.burst_time, 0);
  const cpuUtil = totalTime > 0 ? (busyTime / totalTime) * 100 : 0;

  // Emit metrics to parent
  useEffect(() => {
    onMetrics?.({
      totalWaiting,
      totalTurnaround,
      totalTime,
      busyTime,
      cpuUtil,
    });
  }, [totalWaiting, totalTurnaround, totalTime, busyTime, cpuUtil, onMetrics]);

  return (
    <div className="overflow-auto rounded-xl border dark:border-gray-700">
      <Table>
        <TableCaption>
          Metrics for <strong>{algorithm}</strong> scheduling
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">PID</TableHead>
            <TableHead className="text-center">Arrival</TableHead>
            <TableHead className="text-center">Burst</TableHead>
            {(algorithm === "NPPS" || algorithm === "PPS") && (
              <TableHead className="text-center">Priority</TableHead>
            )}
            <TableHead className="text-center">Waiting</TableHead>
            <TableHead className="text-center">Turnaround</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {perProcess.map((p) => (
            <TableRow key={p.process_id}>
              <TableCell className="text-center">{p.process_id}</TableCell>
              <TableCell className="text-center">{p.arrival_time}</TableCell>
              <TableCell className="text-center">{p.burst_time}</TableCell>
              {(algorithm === "NPPS" || algorithm === "PPS") && (
                <TableCell className="text-center">{p.priority}</TableCell>
              )}
              <TableCell className="text-center">{p.waitingTime}</TableCell>
              <TableCell className="text-center">{p.turnaroundTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold">
              Totals
            </TableCell>
            {(algorithm === "NPPS" || algorithm === "PPS") && <TableCell />}
            <TableCell className="text-center font-medium">
              {totalWaiting}
            </TableCell>
            <TableCell className="text-center font-medium">
              {totalTurnaround}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className="p-4 flex flex-wrap justify-around text-sm  space-x-6">
        <div>
          <strong>Total Time: </strong>
          {totalTime}
        </div>
        <div>
          <strong>Busy Time: </strong>
          {busyTime}
        </div>
        <div>
          <strong>CPU Utilization: </strong>
          {cpuUtil.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
