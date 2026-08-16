import type { CallRecord, FilterState, SortKey } from "../types/call";
import { formatDate, formatDuration, sentimentLabel } from "../utils/format";
import { StatusBadge } from "./StatusBadge";
import { HighlightText } from "./HighlightText";
const columns: [SortKey, string][] = [
  ["agent", "Agent"],
  ["duration", "Duration"],
  ["timestamp", "Date & time"],
  ["outcome", "Outcome"],
  ["sentiment", "Sentiment"],
];
export function CallsTable({
  calls,
  filters,
  onSort,
  onSelect,
}: {
  calls: CallRecord[];
  filters: FilterState;
  onSort: (k: SortKey) => void;
  onSelect: (c: CallRecord) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map(([key, label]) => (
                <th key={key} className="px-4 py-3">
                  <button
                    className="flex items-center gap-1 font-semibold hover:text-slate-900"
                    onClick={() => onSort(key)}
                  >
                    {label}
                    <span aria-hidden>
                      {filters.sort === key
                        ? filters.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↕"}
                    </span>
                  </button>
                </th>
              ))}
              <th className="px-4 py-3">Transcript match</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {calls.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(c);
                  }
                }}
                tabIndex={0}
                className="cursor-pointer transition hover:bg-teal-50/50 focus:bg-teal-50"
              >
                <td className="px-4 py-4 font-medium">
                  {c.agent}
                  <div className="mt-1 text-xs font-normal text-slate-400">
                    {c.id}
                  </div>
                </td>
                <td className="px-4 py-4">{formatDuration(c.duration)}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {formatDate(c.timestamp)}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge outcome={c.outcome} />
                </td>
                <td className="px-4 py-4">
                  <div className="font-medium">
                    {c.sentiment === null ? "—" : c.sentiment.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500">
                    {sentimentLabel(c.sentiment)}
                  </div>
                </td>
                <td className="max-w-xs px-4 py-4 text-slate-600">
                  <p className="line-clamp-2 whitespace-pre-line">
                    <HighlightText
                      text={c.transcript || "No transcript available"}
                      query={filters.search}
                    />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
