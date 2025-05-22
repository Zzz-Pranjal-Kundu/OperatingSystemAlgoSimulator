// lib/BankersAlgorithm.ts

export type DeadlockResult = {
  safe: boolean;
  sequence: number[];
};

export function bankersAlgorithm(
  allocation: number[][],
  max: number[][],
  available: number[]
): DeadlockResult {
  const n = allocation.length,
    m = available.length;

  const need = allocation.map((row, i) =>
    row.map((alloc_j, j) => max[i][j] - alloc_j)
  );

  const work = [...available];
  const finish = Array(n).fill(false);
  const seq: number[] = [];

  let madeProgress = true;
  while (seq.length < n && madeProgress) {
    madeProgress = false;

    for (let i = 0; i < n; i++) {
      if (!finish[i] && need[i].every((req, j) => req <= work[j])) {
        // can satisfy process i
        for (let j = 0; j < m; j++) work[j] += allocation[i][j];
        finish[i] = true;
        seq.push(i);
        madeProgress = true;
      }
    }
  }

  return { safe: seq.length === n, sequence: seq };
}
