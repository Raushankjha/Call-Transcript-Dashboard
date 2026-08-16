import { OUTCOME_LABELS } from "../constants/dashboard";
import type { Outcome } from "../types/call";
const styles: Record<Outcome, string> = {
  qualified: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  callback: "bg-amber-50 text-amber-700 ring-amber-600/20",
  rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  no_answer: "bg-slate-100 text-slate-600 ring-slate-500/20",
};
export function StatusBadge({ outcome }: { outcome: Outcome }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[outcome]}`}
    >
      {OUTCOME_LABELS[outcome]}
    </span>
  );
}
