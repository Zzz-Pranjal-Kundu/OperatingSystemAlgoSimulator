// lib/diskScheduler.ts

export type DiskSchedulingResult = {
  order: number[]; // service sequence (including initial head)
  totalHeadMovement: number; // total movement
};

/** Helper to step through an array of targets from a start position */
function traverse(
  start: number,
  seq: number[]
): { order: number[]; movement: number } {
  let current = start;
  let movement = 0;
  const order: number[] = [];

  for (const nxt of seq) {
    order.push(nxt);
    movement += Math.abs(current - nxt);
    current = nxt;
  }
  return { order, movement };
}

export function diskFCFS(
  initial: number,
  requests: number[]
): DiskSchedulingResult {
  // FCFS serves requests in the order they arrive
  const seq = [...requests]; // copy to avoid modifying the original

  const { order, movement } = traverse(initial, seq);
  return { order, totalHeadMovement: movement };
}

export function diskSSTF(
  initial: number,
  requests: number[]
): DiskSchedulingResult {
  const remaining = [...requests];
  const seq: number[] = [];
  let head = initial;

  while (remaining.length) {
    // pick closest
    let idx = 0;
    let bestDist = Math.abs(head - remaining[0]);
    for (let i = 1; i < remaining.length; i++) {
      const d = Math.abs(head - remaining[i]);
      if (d < bestDist) {
        bestDist = d;
        idx = i;
      }
    }
    head = remaining.splice(idx, 1)[0];
    seq.push(head);
  }

  const { order, movement } = traverse(initial, seq);
  return { order, totalHeadMovement: movement };
}

export function diskSCAN(
  initial: number,
  requests: number[],
  diskSize: number,
  direction: "up" | "down" = "up"
): DiskSchedulingResult {
  const sorted = [...requests].sort((a, b) => a - b);
  const upSeq = sorted.filter((r) => r >= initial);
  const downSeq = sorted.filter((r) => r < initial).reverse();

  let service: number[] = [];
  if (direction === "up") {
    service = [...upSeq, diskSize - 1, ...downSeq];
  } else {
    service = [...downSeq, 0, ...upSeq];
  }

  const { order, movement } = traverse(initial, service);
  return { order, totalHeadMovement: movement };
}

export function diskCSCAN(
  initial: number,
  requests: number[],
  diskSize: number
): DiskSchedulingResult {
  const sorted = [...requests].sort((a, b) => a - b);
  const upSeq = sorted.filter((r) => r >= initial);
  const downSeq = sorted.filter((r) => r < initial);

  const service = [...upSeq, diskSize - 1, 0, ...downSeq];
  const { order, movement } = traverse(initial, service);
  return { order, totalHeadMovement: movement };
}

export function diskLOOK(
  initial: number,
  requests: number[],
  direction: "up" | "down" = "up"
): DiskSchedulingResult {
  const sorted = [...requests].sort((a, b) => a - b);
  const upSeq = sorted.filter((r) => r >= initial);
  const downSeq = sorted.filter((r) => r < initial).reverse();

  const service =
    direction === "up" ? [...upSeq, ...downSeq] : [...downSeq, ...upSeq];
  const { order, movement } = traverse(initial, service);
  return { order, totalHeadMovement: movement };
}

export function diskCLOOK(
  initial: number,
  requests: number[]
): DiskSchedulingResult {
  const sorted = [...requests].sort((a, b) => a - b);
  const upSeq = sorted.filter((r) => r >= initial);
  const downSeq = sorted.filter((r) => r < initial);

  const service = [...upSeq, ...downSeq];
  const { order, movement } = traverse(initial, service);
  return { order, totalHeadMovement: movement };
}
