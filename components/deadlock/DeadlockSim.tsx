// components/deadlock/DeadlockSim.tsx
"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankersAlgorithm, DeadlockResult } from "@/lib/BankersAlgorithm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

/** Zod schema for the Banker’s form */
const Schema = z.object({
  processes: z.coerce.number().min(1).max(10),
  resources: z.coerce.number().min(1).max(10),
  allocation: z.string().nonempty(),
  max: z.string().nonempty(),
  available: z.string().nonempty(),
});
type FormValues = z.infer<typeof Schema>;

/** A toggle card for one Coffman condition */
function ConditionCard({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`p-4 rounded-lg border transition ${
        enabled
          ? "bg-blue-50 border-blue-300"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      }`}
    >
      <label className="flex items-start space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={onToggle}
          className="mt-1 h-5 w-5 text-blue-600"
        />
        <div>
          <h4
            className={`font-medium ${
              enabled ? "text-blue-800" : "text-gray-900 dark:text-gray-100"
            }`}
          >
            {title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </label>
    </div>
  );
}

/** Helper to render a matrix in a card */
function MatrixCard({ title, matrix }: { title: string; matrix: number[][] }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow border">
      <h5 className="font-medium mb-2">{title}</h5>
      <div className="overflow-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="p-2 border"></th>
              {matrix[0].map((_, j) => (
                <th key={j} className="p-2 border text-center">
                  R{j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800"
              >
                <td className="p-2 border font-medium text-center">P{i}</td>
                {row.map((val, j) => (
                  <td key={j} className="p-2 border text-center">
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** Main DeadlockSim component */
export default function DeadlockSim() {
  // Tab state: 0 = Conditions, 1 = Banker's
  const [tab, setTab] = useState<0 | 1>(0);

  // Coffman conditions
  const [mutualExclusion, setMutualExclusion] = useState(false);
  const [holdAndWait, setHoldAndWait] = useState(false);
  const [noPreemption, setNoPreemption] = useState(false);
  const [circularWait, setCircularWait] = useState(false);

  // Banker’s form & result
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      processes: 3,
      resources: 3,
      allocation: "0,1,0;2,0,0;3,0,2",
      max: "7,5,3;3,2,2;9,0,2",
      available: "3,3,2",
    },
  });
  const [result, setResult] = useState<DeadlockResult | null>(null);
  const [matrices, setMatrices] = useState<{
    alloc: number[][];
    max: number[][];
    need: number[][];
    avail: number[];
  } | null>(null);

  /** Handle Banker’s submission */
  const onSubmit = (data: FormValues) => {
    const alloc = data.allocation
      .split(";")
      .map((r) => r.split(",").map((n) => parseInt(n.trim(), 10)));
    const max = data.max
      .split(";")
      .map((r) => r.split(",").map((n) => parseInt(n.trim(), 10)));
    const avail = data.available.split(",").map((n) => parseInt(n.trim(), 10));

    // compute need
    const need = alloc.map((row, i) => row.map((a, j) => max[i][j] - a));

    const res = bankersAlgorithm(alloc, max, avail);
    setMatrices({ alloc, max, need, avail });
    setResult(res);
  };

  /** Build Work progression steps */
  const steps = useMemo(() => {
    if (!matrices || !result) return [];
    const { alloc, avail } = matrices;
    let work = [...avail];
    const seq = result.sequence;
    const seqSteps: number[][] = [[...work]];

    seq.forEach((pid) => {
      alloc[pid].forEach((a, j) => (work[j] += a));
      seqSteps.push([...work]);
    });
    return seqSteps;
  }, [matrices, result]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Tab Buttons */}
      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setTab(0)}
          className={`px-4 py-2 rounded-t-lg ${
            tab === 0
              ? "bg-white dark:bg-gray-900 border-t border-l border-r border-gray-300 dark:border-gray-700 font-semibold"
              : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Deadlock Conditions
        </button>
        <button
          onClick={() => setTab(1)}
          className={`px-4 py-2 rounded-t-lg ${
            tab === 1
              ? "bg-white dark:bg-gray-900 border-t border-l border-r border-gray-300 dark:border-gray-700 font-semibold"
              : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Banker’s Algorithm
        </button>
      </div>

      {/* Tab 0: Coffman Conditions */}
      {tab === 0 && (
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">
            Toggle the necessary conditions for deadlock. When all four are
            active, a circular wait arises:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConditionCard
              title="Mutual Exclusion"
              description="Resources cannot be shared."
              enabled={mutualExclusion}
              onToggle={() => setMutualExclusion((x) => !x)}
            />
            <ConditionCard
              title="Hold and Wait"
              description="Holders may request more."
              enabled={holdAndWait}
              onToggle={() => setHoldAndWait((x) => !x)}
            />
            <ConditionCard
              title="No Preemption"
              description="Resources cannot be forcibly taken."
              enabled={noPreemption}
              onToggle={() => setNoPreemption((x) => !x)}
            />
            <ConditionCard
              title="Circular Wait"
              description="Cycle of processes waiting."
              enabled={circularWait}
              onToggle={() => setCircularWait((x) => !x)}
            />
          </div>

          {mutualExclusion && holdAndWait && noPreemption && circularWait && (
            <div className="mt-6 p-6 bg-red-50 dark:bg-red-900 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-300">
                🔄 Deadlock: Circular Wait Achieved
              </h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                All four Coffman conditions are present.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 1: Banker's Algorithm */}
      {tab === 1 && (
        <div className="space-y-6">
          {/* Input Card */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow border">
            <h3 className="text-xl font-semibold mb-4">Banker’s Algorithm</h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <FormField
                  control={form.control}
                  name="processes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Processes (n)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="resources"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resource Types (m)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="available"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Available Vector</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="allocation"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Allocation Matrix</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Max Demand Matrix</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-3 flex justify-end">
                  <Button type="submit">Run Simulation</Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Result */}
          {result && matrices && (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-lg text-lg font-medium ${
                  result.safe
                    ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
                }`}
              >
                {result.safe
                  ? `✔️ Safe state. Sequence: ${result.sequence
                      .map((i) => `P${i}`)
                      .join(" → ")}`
                  : "❌ Unsafe state (no safe sequence)."}
              </div>

              {/* Matrices */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MatrixCard title="Allocation" matrix={matrices.alloc} />
                <MatrixCard title="Max Demand" matrix={matrices.max} />
                <MatrixCard title="Need" matrix={matrices.need} />
              </div>

              {/* Work progression */}
              <div>
                <h4 className="text-lg font-semibold mb-2">
                  Work Vector Progression
                </h4>
                <div className="overflow-auto border rounded-lg shadow">
                  <table className="min-w-full table-fixed">
                    <thead className="bg-gray-100 dark:bg-gray-800">
                      <tr>
                        <th className="p-2 border">Step</th>
                        {matrices.avail.map((_, j) => (
                          <th key={j} className="p-2 border text-center">
                            R{j}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {steps.map((work, s) => (
                        <tr
                          key={s}
                          className={`odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 ${
                            s < result.sequence.length
                              ? "hover:bg-yellow-100 dark:hover:bg-yellow-800"
                              : ""
                          }`}
                        >
                          <td className="p-2 border">
                            {s === 0
                              ? "Init"
                              : `After P${result.sequence[s - 1]}`}
                          </td>
                          {work.map((w, j) => (
                            <td key={j} className="p-2 border text-center">
                              {w}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
