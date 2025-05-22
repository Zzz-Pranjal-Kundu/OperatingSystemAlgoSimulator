// lib/pageReplacement.ts

export function fifo(frames: number, refs: number[]) {
  const buffer: number[] = [];
  const timeline: number[][] = [];
  let faults = 0;

  refs.forEach((r) => {
    if (!buffer.includes(r)) {
      // page fault
      faults++;
      if (buffer.length < frames) buffer.push(r);
      else {
        buffer.shift();
        buffer.push(r);
      }
    }
    // record snapshot (-1 for empty slot)
    timeline.push(Array.from({ length: frames }, (_, i) => buffer[i] ?? -1));
  });

  return { frames: timeline, faults };
}

export function lru(frames: number, refs: number[]) {
  const buffer: number[] = [];
  const timeline: number[][] = [];
  let faults = 0;

  refs.forEach((r, idx) => {
    if (!buffer.includes(r)) {
      faults++;
      if (buffer.length < frames) buffer.push(r);
      else {
        // evict least recently used
        let lruPage = buffer[0],
          lruIndex = idx;
        buffer.forEach((p) => {
          const lastUse = refs.slice(0, idx).lastIndexOf(p);
          if (lastUse < lruIndex) {
            lruIndex = lastUse;
            lruPage = p;
          }
        });
        buffer[buffer.indexOf(lruPage)] = r;
      }
    }
    timeline.push(Array.from({ length: frames }, (_, i) => buffer[i] ?? -1));
  });

  return { frames: timeline, faults };
}

export function optimal(frames: number, refs: number[]) {
  const buffer: number[] = [];
  const timeline: number[][] = [];
  let faults = 0;

  refs.forEach((r, idx) => {
    if (!buffer.includes(r)) {
      faults++;
      if (buffer.length < frames) buffer.push(r);
      else {
        // evict page with farthest next use
        let victim = buffer[0],
          farthest = -1;
        buffer.forEach((p) => {
          const nextUse = refs.slice(idx + 1).indexOf(p);
          if (nextUse === -1) {
            victim = p;
            farthest = Infinity;
          } else if (nextUse > farthest) {
            farthest = nextUse;
            victim = p;
          }
        });
        buffer[buffer.indexOf(victim)] = r;
      }
    }
    timeline.push(Array.from({ length: frames }, (_, i) => buffer[i] ?? -1));
  });

  return { frames: timeline, faults };
}
