// components/cpu/ProcessForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GradientPicker } from "@/components/GradientPicker";
import { useEffect } from "react";

const ProcessSchema = z.object({
  arrival_time: z.coerce.number().min(0).lte(100),
  burst_time: z.coerce.number().min(1).lte(100),
  // leave priority out if not shown
  background: z.string().nonempty(),
});

// We declare priority optional in the form values, but only render+validate it if showPriority=true
export type ProcessFormValues = z.infer<typeof ProcessSchema> & {
  priority?: number;
};

type ProcessFormProps = {
  addProcess: (process: ProcessFormValues) => void;
  initialValues?: Partial<ProcessFormValues>;
  showPriority: boolean; // <-- new
};

export function ProcessForm({
  addProcess,
  initialValues,
  showPriority,
}: ProcessFormProps) {
  const schema = showPriority
    ? ProcessSchema.extend({
        priority: z.coerce.number().min(1).max(10),
      })
    : ProcessSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      arrival_time: 0,
      burst_time: 1,
      ...(showPriority ? { priority: 1 } : {}),
      background: "#ffe83f",
      ...(initialValues ?? {}),
    },
  });

  useEffect(() => {
    if (initialValues) {
      form.reset({ ...form.getValues(), ...initialValues });
    }
  }, [initialValues]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    addProcess(data as ProcessFormValues);
    form.reset({
      arrival_time: 0,
      burst_time: 1,
      ...(showPriority ? { priority: 1 } : {}),
      background: "#ffe83f",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Arrival Time */}
        <FormField
          control={form.control}
          name="arrival_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Time</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Burst Time */}
        <FormField
          control={form.control}
          name="burst_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Burst Time</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority only if showPriority */}
        {showPriority && (
          <FormField
            control={form.control}
            name={"priority" as any} // workaround for conditional schema
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority (1–10)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Background Color */}
        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose color</FormLabel>
              <GradientPicker
                className="w-full truncate"
                background={field.value}
                setBackground={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
