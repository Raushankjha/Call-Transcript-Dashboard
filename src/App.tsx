import { useCallback, useMemo, useRef, useState } from "react";
import { CallsTable } from "./components/CallsTable";
import { DetailPanel } from "./components/DetailPanel";
import { FiltersPanel } from "./components/FiltersPanel";
import { Pagination } from "./components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "./components/States";
import { SummaryStrip } from "./components/SummaryStrip";
import { PAGE_SIZE } from "./constants/dashboard";
import { useCalls } from "./hooks/useCalls";
import { useUrlFilters } from "./hooks/useUrlFilters";
import type { CallRecord, Outcome, SortKey } from "./types/call";
import { filterAndSortCalls } from "./utils/filterCalls";

export default function App() {
  const { data, loading, error, retry } = useCalls();
  const { filters, update, reset } = useUrlFilters();
  const [selected, setSelected] = useState<CallRecord | null>(null);
  const scrollRef = useRef(0);

  const agents = useMemo(
    () => [...new Set(data.map((call) => call.agent))].sort(),
    [data],
  );
  const maxDuration = useMemo(
    () => Math.max(0, ...data.map((call) => call.duration)),
    [data],
  );
  const filtered = useMemo(
    () => filterAndSortCalls(data, filters),
    [data, filters],
  );
  const summaryCalls = useMemo(
    () => filterAndSortCalls(data, { ...filters, outcomes: [] }),
    [data, filters],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(filters.page, totalPages);
  const pageCalls = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const sort = (key: SortKey) => {
    update({
      sort: key,
      direction:
        filters.sort === key && filters.direction === "asc" ? "desc" : "asc",
    });
  };

  const showAllRoutes = () => {
    update({ outcomes: [] });
  };

  const showOutcomeRoutes = (outcome: Outcome) => {
    update({ outcomes: [outcome] });
  };

  const open = (call: CallRecord) => {
    scrollRef.current = scrollY;
    setSelected(call);
    document.body.style.overflow = "hidden";
  };

  const close = useCallback(() => {
    setSelected(null);
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      scrollTo({ top: scrollRef.current, behavior: "auto" });
    });
  }, []);

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-sm font-semibold text-teal-700">Adstia Agency</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Call Transcript Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Browse, filter and analyse call outcomes and transcript content from
            the local call feed.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <>
            <SummaryStrip
              calls={summaryCalls}
              activeOutcomes={filters.outcomes}
              onShowAll={showAllRoutes}
              onOutcomeSelect={showOutcomeRoutes}
            />
            <FiltersPanel
              filters={filters}
              agents={agents}
              maxDuration={maxDuration}
              onChange={update}
              onReset={reset}
            />
            {filtered.length === 0 ? (
              <EmptyState onReset={reset} />
            ) : (
              <>
                <CallsTable
                  calls={pageCalls}
                  filters={filters}
                  onSort={sort}
                  onSelect={open}
                />
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  total={filtered.length}
                  onPage={(nextPage) => {
                    update({ page: nextPage }, false);
                    scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </>
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-slate-400 sm:px-6">
        Read-only frontend dashboard &middot; {PAGE_SIZE} calls per page
      </footer>

      {selected ? (
        <DetailPanel call={selected} query={filters.search} onClose={close} />
      ) : null}
    </>
  );
}
