import { useEffect } from "react";
import type { CallRecord } from "../types/call";
import { formatDate, formatDuration, sentimentLabel } from "../utils/format";
import { StatusBadge } from "./StatusBadge";
import { HighlightText } from "./HighlightText";
export function DetailPanel({
  call,
  query,
  onClose,
}: {
  call: CallRecord;
  query: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    addEventListener("keydown", h);
    return () => removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`Call ${call.id} details`}
    >
      <button
        aria-label="Close details"
        className="absolute inset-0 bg-slate-950/35 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
              Call detail
            </p>
            <h2 className="text-xl font-bold">{call.agent}</h2>
          </div>
          <button
            autoFocus
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            Close ✕
          </button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Call ID", call.id],
              ["Duration", formatDuration(call.duration)],
              ["Date", formatDate(call.timestamp)],
              [
                "Sentiment",
                call.sentiment === null
                  ? "Unknown"
                  : `${call.sentiment.toFixed(2)} · ${sentimentLabel(call.sentiment)}`,
              ],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">{k}</p>
                <p className="mt-1 text-sm font-semibold">{v}</p>
              </div>
            ))}
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs font-medium text-slate-500">Outcome</p>
              <div className="mt-1">
                <StatusBadge outcome={call.outcome} />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold">Full transcript</h3>
            <div className="mt-3 whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              <HighlightText
                text={
                  call.transcript || "No transcript available for this call."
                }
                query={query}
              />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
