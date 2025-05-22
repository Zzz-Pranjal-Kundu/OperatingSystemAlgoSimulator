"use client";

import React, { useMemo, useState } from "react";
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

const Schema = z.object({
  processes: z.coerce.number().min(1).max(10),
  resources: z.coerce.number().min(1).max(10),
  allocation: z.string().nonempty(),
  max: z.string().nonempty(),
  available: z.string().nonempty(),
});

type FormValues = z.infer<typeof Schema>;

export default function BankersPanel() {
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

  const onSubmit = (data: FormValues) => {
    // parse
    const alloc = data.allocation
      .split(";")
      .map((r) => r.split(",").map((n) => parseInt(n.trim(), 10)));
    const max = data.max
      .split(";")
      .map((r) => r.split(",").map((n) => parseInt(n.trim(), 10)));
    const avail = data.available.split(",").map((n) => parseInt(n.trim(), 10));

    // compute Need
    const need = alloc.map((row, i) => row.map((a, j) => max[i][j] - a));

    // run algorithm
    const res = bankersAlgorithm(alloc, max, avail);
    setMatrices({ alloc, max, need, avail });
    setResult(res);
  };

  // If we have a result & matrices, build step‐by‐step Work progression
  const steps = useMemo(() => {
    if (!matrices || !result) return [];
    const { alloc, need } = matrices;
    const workSequence: number[][] = [];
    let work = [...matrices.avail];
    const finished = Array(matrices.alloc.length).fill(false);

    for (const pid of result.sequence) {
      workSequence.push([...work]);
      // add allocation[pid]
      alloc[pid].forEach((a, j) => (work[j] += a));
      finished[pid] = true;
    }
    // final work
    workSequence.push([...work]);
    return workSequence;
  }, [matrices, result]);

  return (
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

      {/* If we have data, show matrices and steps */}
      {result && matrices && (
        <div className="space-y-6">
          {/* Safe state */}
          <div
            className={`p-4 rounded-lg text-lg font-medium ${
              result.safe
                ? "bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {result.safe
              ? `✔️ Safe state detected. Safe sequence: ${result.sequence
                  .map((i) => `P${i}`)
                  .join(" → ")}`
              : "❌ Unsafe state (no safe sequence)."}
          </div>

          {/* Matrices display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/** Allocation Matrix **/}
            <MatrixCard
              title="Allocation"
              matrix={matrices.alloc}
              highlightHeader
            />
            {/** Max Matrix **/}
            <MatrixCard
              title="Max Demand"
              matrix={matrices.max}
              highlightHeader
            />
            {/** Need Matrix **/}
            <MatrixCard title="Need" matrix={matrices.need} highlightHeader />
          </div>

          {/* Work progression steps */}
          <div>
            <h4 className="text-lg font-semibold mb-2">
              Work Vector Progression
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full table-fixed border-collapse">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="p-2 border font-medium text-left">Step</th>
                    {matrices.avail.map((_, j) => (
                      <th
                        key={j}
                        className="p-2 border text-center font-medium"
                      >
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
                        {s === 0 ? "Init" : `After P${result.sequence[s - 1]}`}
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
  );
}

/** Helper component to render a numeric matrix in a card **/
function MatrixCard({
  title,
  matrix,
  highlightHeader = false,
}: {
  title: string;
  matrix: number[][];
  highlightHeader?: boolean;
}) {
  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl shadow border">
      <h5 className="font-medium mb-2">{title}</h5>
      <div className="overflow-auto">
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th
                className={`p-2 border ${highlightHeader ? "bg-blue-50" : ""}`}
              ></th>
              {matrix[0].map((_, j) => (
                <th
                  key={j}
                  className={`p-2 border text-center ${
                    highlightHeader ? "bg-blue-50" : ""
                  }`}
                >
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
