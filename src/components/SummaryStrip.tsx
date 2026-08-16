import { OUTCOME_LABELS } from "../constants/dashboard";
import { OUTCOMES, type CallRecord, type Outcome } from "../types/call";
import { formatDuration } from "../utils/format";

const outcomeCardStyles: Record<Outcome, string> = {
  qualified:
    "border-emerald-200 bg-emerald-50 text-emerald-950 before:bg-emerald-500",
  callback: "border-amber-200 bg-amber-50 text-amber-950 before:bg-amber-500",
  rejected: "border-rose-200 bg-rose-50 text-rose-950 before:bg-rose-500",
  no_answer: "border-sky-200 bg-sky-50 text-sky-950 before:bg-sky-500",
};

const activeCardStyles: Record<Outcome, string> = {
  qualified: "ring-2 ring-emerald-500",
  callback: "ring-2 ring-amber-500",
  rejected: "ring-2 ring-rose-500",
  no_answer: "ring-2 ring-sky-500",
};

type SummaryStripProps = {
  calls: CallRecord[];
  activeOutcomes: Outcome[];
  onShowAll: () => void;
  onOutcomeSelect: (outcome: Outcome) => void;
};

export function SummaryStrip({
  calls,
  activeOutcomes,
  onShowAll,
  onOutcomeSelect,
}: SummaryStripProps) {
  const avg = calls.length
    ? Math.round(
        calls.reduce((sum, call) => sum + call.duration, 0) / calls.length,
      )
    : 0;
  const allActive = activeOutcomes.length === 0;

  return (
    <section
      aria-label="Filtered call summary"
      className="grid grid-cols-2 gap-3 lg:grid-cols-6"
    >
      <button
        type="button"
        onClick={onShowAll}
        className={`relative overflow-hidden rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-left text-indigo-950 shadow-sm transition before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-indigo-500 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 ${
          allActive ? "ring-2 ring-indigo-500" : ""
        }`}
      >
        <p className="text-xs font-bold uppercase text-indigo-700">
          Total calls
        </p>
        <p className="mt-2 text-3xl font-black">{calls.length}</p>
        <p className="mt-1 text-xs font-semibold text-indigo-700">All routes</p>
      </button>

      <div className="relative overflow-hidden rounded-xl border border-violet-200 bg-violet-50 p-4 text-violet-950 shadow-sm before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-violet-500">
        <p className="text-xs font-bold uppercase text-violet-700">
          Avg duration
        </p>
        <p className="mt-2 text-3xl font-black">{formatDuration(avg)}</p>
        <p className="mt-1 text-xs font-semibold text-violet-700">
          Filtered set
        </p>
      </div>

      {OUTCOMES.map((outcome) => {
        const isActive =
          activeOutcomes.length === 1 && activeOutcomes[0] === outcome;
        const count = calls.filter((call) => call.outcome === outcome).length;

        return (
          <button
            key={outcome}
            type="button"
            onClick={() => onOutcomeSelect(outcome)}
            className={`relative overflow-hidden rounded-xl border p-4 text-left shadow-sm transition before:absolute before:inset-x-0 before:top-0 before:h-1.5 hover:-translate-y-0.5 hover:shadow-md ${outcomeCardStyles[outcome]} ${
              isActive ? activeCardStyles[outcome] : ""
            }`}
          >
            <p className="text-xs font-bold uppercase opacity-75">
              {OUTCOME_LABELS[outcome]}
            </p>
            <p className="mt-2 text-3xl font-black">{count}</p>
            <p className="mt-1 text-xs font-semibold opacity-70">
              {outcome === "qualified"
                ? "Qualified call routes"
                : "Call routes"}
            </p>
          </button>
        );
      })}
    </section>
  );
}
