// components/page/PageChart.tsx
"use client";

import React from "react";

interface PageChartProps {
  /**
   * The simulation “sequence” is an array of time-steps,
   * each entry is an array of length = number of frames,
   * giving the page number (or -1 if empty) in each frame.
   *
   * sequence[t][f] === page in frame f at time t
   */
  sequence: number[][];
}

export default function PageChart({ sequence }: PageChartProps) {
  if (!sequence || sequence.length === 0) return null;

  const numSteps = sequence.length;
  const numFrames = sequence[0].length;

  // Transpose so that rows = frames, cols = time-steps
  const frameRows: number[][] = Array.from({ length: numFrames }, (_, f) =>
    sequence.map((step) => step[f])
  );

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full table-fixed">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="p-2 border text-left font-medium text-gray-800 dark:text-gray-200">
              Frame ⧵ Time →
            </th>
            {Array.from({ length: numSteps }).map((_, t) => (
              <th
                key={t}
                className="p-2 border text-center font-medium text-gray-800 dark:text-gray-200"
              >
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {frameRows.map((row, f) => (
            <tr
              key={f}
              className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
            >
              {/* Frame label */}
              <td className="p-2 border font-medium text-gray-800 dark:text-gray-200">
                Frame {f}
              </td>

              {/* Time-step cells */}
              {row.map((page, t) => {
                // At t=0 any non-empty page is a fault; thereafter compare to previous
                const prev = t > 0 ? row[t - 1] : null;
                const isFault = page !== -1 && (t === 0 || page !== prev);

                let cellCls = "p-2 border text-center ";
                if (page === -1) {
                  // empty frame
                  cellCls +=
                    "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400";
                } else if (isFault) {
                  // page fault
                  cellCls +=
                    "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300";
                } else {
                  // page hit
                  cellCls +=
                    "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300";
                }

                return (
                  <td key={t} className={cellCls}>
                    {page === -1 ? "" : page}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
