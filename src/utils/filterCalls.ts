import type { CallRecord, FilterState } from "../types/call";
export function filterAndSortCalls(calls: CallRecord[], f: FilterState) {
  const q = f.search.trim().toLocaleLowerCase();
  const min = f.minDuration === "" ? null : Number(f.minDuration);
  const max = f.maxDuration === "" ? null : Number(f.maxDuration);
  const from = f.from ? new Date(`${f.from}T00:00:00`).getTime() : null;
  const to = f.to ? new Date(`${f.to}T23:59:59.999`).getTime() : null;
  const filtered = calls.filter((c) => {
    const t = new Date(c.timestamp).getTime();
    return (
      (!f.agents.length || f.agents.includes(c.agent)) &&
      (!f.outcomes.length || f.outcomes.includes(c.outcome)) &&
      (from === null || t >= from) &&
      (to === null || t <= to) &&
      (min === null || c.duration >= min) &&
      (max === null || c.duration <= max) &&
      (!q || c.transcript.toLocaleLowerCase().includes(q))
    );
  });
  return [...filtered].sort((a, b) => {
    let x: string | number = a[f.sort] ?? -Infinity;
    let y: string | number = b[f.sort] ?? -Infinity;
    if (f.sort === "timestamp") {
      x = new Date(a.timestamp).getTime();
      y = new Date(b.timestamp).getTime();
    }
    const result =
      typeof x === "string"
        ? x.localeCompare(String(y))
        : Number(x) - Number(y);
    return f.direction === "asc" ? result : -result;
  });
}
