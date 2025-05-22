"use client";

import { useState } from "react";
import DiskChart from "./DiskChart";
import DiskSummary from "./DiskSummary";
import {
  diskSSTF,
  diskSCAN,
  diskCSCAN,
  diskLOOK,
  diskCLOOK,
  DiskSchedulingResult,
  diskFCFS,
} from "@/lib/diskScheduler";

type Algo = "FCFS" | "SSTF" | "SCAN" | "CSCAN" | "LOOK" | "CLOOK";
type Direction = "up" | "down";

export default function DiskForm() {
  const [diskSize, setDiskSize] = useState<number>(200);
  const [head, setHead] = useState<number>(0);
  const [requests, setRequests] = useState<string>("");
  const [algorithm, setAlgorithm] = useState<Algo>("SSTF");
  const [direction, setDirection] = useState<Direction>("up");
  const [result, setResult] = useState<DiskSchedulingResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reqs = requests
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n >= 0 && n < diskSize);

    let res: DiskSchedulingResult;
    switch (algorithm) {
      case "FCFS":
        res = diskFCFS(head, reqs);
        break;
      case "SSTF":
        res = diskSSTF(head, reqs);
        break;
      case "SCAN":
        res = diskSCAN(head, reqs, diskSize, direction);
        break;
      case "CSCAN":
        res = diskCSCAN(head, reqs, diskSize);
        break;
      case "LOOK":
        res = diskLOOK(head, reqs, direction);
        break;
      case "CLOOK":
        res = diskCLOOK(head, reqs);
        break;
    }

    // Prepend initial head as step 0
    setResult({
      order: [head, ...res.order],
      totalHeadMovement: res.totalHeadMovement,
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Parameter Card */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Disk Scheduling Parameters
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Disk Size */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Disk Size (tracks)
            </label>
            <input
              type="number"
              value={diskSize}
              onChange={(e) => setDiskSize(Number(e.target.value))}
              min={1}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-600"
            />
          </div>

          {/* Initial Head */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Initial Head Position
            </label>
            <input
              type="number"
              value={head}
              onChange={(e) => setHead(Number(e.target.value))}
              min={0}
              max={diskSize - 1}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-600"
            />
          </div>

          {/* Requests */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 dark:text-gray-300">
              Disk Requests (comma-separated)
            </label>
            <input
              type="text"
              value={requests}
              onChange={(e) => setRequests(e.target.value)}
              placeholder={`e.g. 10, 50, 190 (0 – ${diskSize - 1})`}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-600"
            />
          </div>

          {/* Algorithm */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300">
              Algorithm
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as Algo)}
              className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-600"
            >
              <option value="FCFS">FCFS</option>
              <option value="SSTF">SSTF</option>
              <option value="SCAN">SCAN</option>
              <option value="CSCAN">C-SCAN</option>
              <option value="LOOK">LOOK</option>
              <option value="CLOOK">C-LOOK</option>
            </select>
          </div>

          {/* Direction for SCAN/LOOK */}
          {(algorithm === "SCAN" || algorithm === "LOOK") && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300">
                Direction
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value as Direction)}
                className="mt-1 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border rounded-md focus:ring focus:ring-indigo-300 dark:border-gray-600"
              >
                <option value="up">Up (toward max track)</option>
                <option value="down">Down (toward track 0)</option>
              </select>
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition"
            >
              Simulate
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-8">
          {/* Interactive Line Chart */}
          <DiskChart sequence={result.order} />

          {/* Detailed Summary & Table */}
          <DiskSummary
            sequence={result.order}
            totalMovement={result.totalHeadMovement}
          />
        </div>
      )}
    </div>
  );
}
