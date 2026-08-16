export function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="h-12 rounded bg-slate-100" />
        <div className="h-12 rounded bg-slate-100" />
        <div className="h-12 rounded bg-slate-100" />
      </div>
      <p className="mt-5 text-center text-sm text-slate-500">
        Loading the call feed…
      </p>
    </div>
  );
}
export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
      <div className="text-3xl">!</div>
      <h2 className="mt-2 font-bold text-rose-900">
        We couldn't load the call feed
      </h2>
      <p className="mt-1 text-sm text-rose-700">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 rounded-xl bg-rose-700 px-4 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="text-3xl">⌕</div>
      <h2 className="mt-2 font-bold">No calls match these filters</h2>
      <p className="mt-1 text-sm text-slate-500">
        Adjust your filters or clear them to see the full call feed.
      </p>
      <button
        onClick={onReset}
        className="mt-4 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white"
      >
        Clear filters
      </button>
    </div>
  );
}
