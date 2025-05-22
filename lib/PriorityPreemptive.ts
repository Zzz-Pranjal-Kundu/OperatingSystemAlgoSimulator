// lib/PriorityPreemptive.ts

export type Process = {
  process_id: number;
  arrival_time: number; // original arrival; slices will overwrite this with actual start time
  burst_time: number;
  background: string;
  priority: number; // Lower value = higher priority
};

type Rem = Process & { remaining: number };

/**
 * Preemptive Priority Scheduling.
 * At each time unit, may switch to any newly arrived process with higher priority.
 * Each 1-unit slice is stamped with the actual clock time at which it ran.
 */
export function preemptivePriority(processes: Process[]): Process[] {
  let time = 0;

  // Create a working copy with remaining time
  const rem: Rem[] = processes.map((p) => ({
    ...p,
    remaining: p.burst_time,
  }));

  const schedule: Process[] = [];

  // Continue until all processes complete
  while (rem.some((p) => p.remaining > 0)) {
    // Find all ready processes
    const ready = rem
      .filter((p) => p.arrival_time <= time && p.remaining > 0)
      .sort((a, b) => a.priority - b.priority); // highest priority first (lowest number)

    if (ready.length === 0) {
      // No process ready: CPU idle for 1 unit
      time++;
      continue;
    }

    // Pick the highest-priority process
    const current = ready[0];

    // Execute one unit and record it with the actual start time
    schedule.push({
      process_id: current.process_id,
      arrival_time: time, // stamp with current clock
      burst_time: 1,
      background: current.background,
      priority: current.priority,
    });

    // Decrement remaining time and advance clock
    current.remaining -= 1;
    time++;
  }

  return schedule;
}
