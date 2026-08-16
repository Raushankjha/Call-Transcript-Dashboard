import { OUTCOMES, type FilterState, type Outcome } from "../types/call";
import { OUTCOME_LABELS } from "../constants/dashboard";
export function FiltersPanel({
  filters,
  agents,
  maxDuration,
  onChange,
  onReset,
}: {
  filters: FilterState;
  agents: string[];
  maxDuration: number;
  onChange: (p: Partial<FilterState>) => void;
  onReset: () => void;
}) {
  const toggleAgent = (a: string) =>
    onChange({
      agents: filters.agents.includes(a)
        ? filters.agents.filter((x) => x !== a)
        : [...filters.agents, a],
    });
  const toggleOutcome = (o: Outcome) =>
    onChange({
      outcomes: filters.outcomes.includes(o)
        ? filters.outcomes.filter((x) => x !== o)
        : [...filters.outcomes, o],
    });
  const active =
    filters.agents.length +
    filters.outcomes.length +
    Number(!!filters.from) +
    Number(!!filters.to) +
    Number(!!filters.minDuration) +
    Number(!!filters.maxDuration) +
    Number(!!filters.search);
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Filters</h2>
          <p className="text-sm text-slate-500">
            Combine filters to narrow the call feed.
          </p>
        </div>
        <button
          onClick={onReset}
          disabled={!active}
          className="rounded-lg px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Clear all {active ? `(${active})` : ""}
        </button>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium">
            Transcript search
          </span>
          <input
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Search transcript…"
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm focus:border-teal-600"
          />
        </label>
        <div>
          <span className="mb-1.5 block text-sm font-medium">Agent</span>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm">
              {filters.agents.length
                ? `${filters.agents.length} selected`
                : "All agents"}
            </summary>
            <div className="absolute z-20 mt-1 max-h-64 w-full min-w-56 overflow-auto rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              {agents.map((a) => (
                <label
                  key={a}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={filters.agents.includes(a)}
                    onChange={() => toggleAgent(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </details>
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-medium">Outcome</span>
          <details className="relative">
            <summary className="cursor-pointer list-none rounded-xl border border-slate-300 px-3 py-2.5 text-sm">
              {filters.outcomes.length
                ? `${filters.outcomes.length} selected`
                : "All outcomes"}
            </summary>
            <div className="absolute z-20 mt-1 w-full min-w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
              {OUTCOMES.map((o) => (
                <label
                  key={o}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    checked={filters.outcomes.includes(o)}
                    onChange={() => toggleOutcome(o)}
                  />
                  {OUTCOME_LABELS[o]}
                </label>
              ))}
            </div>
          </details>
        </div>
        <div>
          <span className="mb-1.5 block text-sm font-medium">
            Duration (seconds)
          </span>
          <div className="flex gap-2">
            <input
              aria-label="Minimum duration"
              type="number"
              min="0"
              max={maxDuration}
              value={filters.minDuration}
              onChange={(e) => onChange({ minDuration: e.target.value })}
              placeholder="Min"
              className="w-1/2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
            />
            <input
              aria-label="Maximum duration"
              type="number"
              min="0"
              max={maxDuration}
              value={filters.maxDuration}
              onChange={(e) => onChange({ maxDuration: e.target.value })}
              placeholder={`Max ${maxDuration}`}
              className="w-1/2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
            />
          </div>
        </div>
        <label>
          <span className="mb-1.5 block text-sm font-medium">From</span>
          <input
            type="date"
            value={filters.from}
            max={filters.to || undefined}
            onChange={(e) => onChange({ from: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
        <label>
          <span className="mb-1.5 block text-sm font-medium">To</span>
          <input
            type="date"
            value={filters.to}
            min={filters.from || undefined}
            onChange={(e) => onChange({ to: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
          />
        </label>
      </div>
    </section>
  );
}
