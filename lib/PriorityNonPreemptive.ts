// lib/PriorityNonPreemptive.ts

export type Process = {
  process_id: number;
  arrival_time: number;
  burst_time: number;
  background: string;
  priority: number; // Lower value = higher priority
};

/**
 * Non-Preemptive Priority Scheduling.
 * At each decision point, picks the waiting process with the highest priority.
 */
export function nonPreemptivePriority(processes: Process[]): Process[] {
  // Clone & sort inputs by arrival time
  const remaining = [...processes].sort(
    (a, b) => a.arrival_time - b.arrival_time
  );
  const result: Process[] = [];
  let currentTime = 0;

  while (remaining.length) {
    // Build ready queue: arrived and not yet scheduled
    const ready = remaining.filter((p) => p.arrival_time <= currentTime);
    if (ready.length === 0) {
      // No one is ready: jump to next arrival
      currentTime = remaining[0].arrival_time;
      continue;
    }

    // Select highest priority (lowest number), tie-break by arrival_time
    ready.sort(
      (a, b) => a.priority - b.priority || a.arrival_time - b.arrival_time
    );
    const next = ready[0];

    // Schedule it
    result.push(next);
    currentTime += next.burst_time;

    // Remove from remaining
    const idx = remaining.findIndex((p) => p.process_id === next.process_id);
    remaining.splice(idx, 1);
  }

  return result;
}
