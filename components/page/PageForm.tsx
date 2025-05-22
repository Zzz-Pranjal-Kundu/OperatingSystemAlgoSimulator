"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
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
import PageChart from "./PageChart";
import PageSummary from "./PageSummary";
import { fifo, lru, optimal } from "@/lib/pageReplacement";

const Schema = z.object({
  frames: z.coerce
    .number()
    .min(1, "Must have at least 1 frame")
    .max(10, "Max 10 frames"),
  referenceString: z
    .string()
    .nonempty("Enter a comma-separated reference string"),
  algorithm: z.enum(["FIFO", "LRU", "Optimal"] as const),
});

type FormValues = z.infer<typeof Schema>;

export default function PageForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: {
      frames: 3,
      referenceString: "7,0,1,2,0,3,0,4,2,3",
      algorithm: "FIFO",
    },
  });

  const [sequence, setSequence] = useState<number[][]>([]);
  const [faults, setFaults] = useState<number>(0);

  const onSubmit = (data: FormValues) => {
    const refs = data.referenceString
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    let result: { frames: number[][]; faults: number };

    switch (data.algorithm) {
      case "FIFO":
        result = fifo(data.frames, refs);
        break;
      case "LRU":
        result = lru(data.frames, refs);
        break;
      case "Optimal":
        result = optimal(data.frames, refs);
        break;
    }

    setSequence(result.frames);
    setFaults(result.faults);
  };

  return (
    <div className="space-y-8">
      {/* Parameter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Page Replacement Simulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Frames */}
              <FormField
                control={form.control}
                name="frames"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frames</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reference String */}
              <FormField
                control={form.control}
                name="referenceString"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Reference String</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. 7,0,1,2,0,3,0,4,2,3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Algorithm */}
              <FormField
                control={form.control}
                name="algorithm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Algorithm</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="FIFO">FIFO</option>
                        <option value="LRU">LRU</option>
                        <option value="Optimal">Optimal</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="md:col-span-3 flex justify-end">
                <Button type="submit">Run Simulation</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Results */}
      {sequence.length > 0 && (
        <>
          <PageSummary faults={faults} />
          <PageChart sequence={sequence} />
        </>
      )}
    </div>
  );
}
