import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FILTERS } from "../constants/dashboard";
import {
  OUTCOMES,
  type FilterState,
  type Outcome,
  type SortDirection,
  type SortKey,
} from "../types/call";
const SORTS: SortKey[] = [
  "agent",
  "duration",
  "timestamp",
  "outcome",
  "sentiment",
];
const read = (): FilterState => {
  const p = new URLSearchParams(location.search);
  const sort = p.get("sort") as SortKey;
  const dir = p.get("dir") as SortDirection;
  return {
    agents: p.getAll("agent"),
    outcomes: p
      .getAll("outcome")
      .filter((x): x is Outcome => OUTCOMES.includes(x as Outcome)),
    from: p.get("from") || "",
    to: p.get("to") || "",
    minDuration: p.get("minDuration") || "",
    maxDuration: p.get("maxDuration") || "",
    search: p.get("q") || "",
    page: Math.max(1, Number(p.get("page")) || 1),
    sort: SORTS.includes(sort) ? sort : DEFAULT_FILTERS.sort,
    direction:
      dir === "asc" || dir === "desc" ? dir : DEFAULT_FILTERS.direction,
  };
};
const write = (f: FilterState) => {
  const p = new URLSearchParams();
  f.agents.forEach((v) => p.append("agent", v));
  f.outcomes.forEach((v) => p.append("outcome", v));
  if (f.from) p.set("from", f.from);
  if (f.to) p.set("to", f.to);
  if (f.minDuration) p.set("minDuration", f.minDuration);
  if (f.maxDuration) p.set("maxDuration", f.maxDuration);
  if (f.search) p.set("q", f.search);
  if (f.page !== 1) p.set("page", String(f.page));
  if (f.sort !== DEFAULT_FILTERS.sort) p.set("sort", f.sort);
  if (f.direction !== DEFAULT_FILTERS.direction) p.set("dir", f.direction);
  const qs = p.toString();
  history.replaceState(
    null,
    "",
    `${location.pathname}${qs ? `?${qs}` : ""}${location.hash}`,
  );
};
export function useUrlFilters() {
  const [filters, setFilters] = useState<FilterState>(read);
  useEffect(() => write(filters), [filters]);
  useEffect(() => {
    const h = () => setFilters(read());
    addEventListener("popstate", h);
    return () => removeEventListener("popstate", h);
  }, []);
  const update = useCallback(
    (patch: Partial<FilterState>, resetPage = true) =>
      setFilters((v) => ({
        ...v,
        ...patch,
        ...(resetPage ? { page: 1 } : {}),
      })),
    [],
  );
  const reset = useCallback(() => setFilters(DEFAULT_FILTERS), []);
  return { filters, update, reset };
}
