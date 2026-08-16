export function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm sm:flex-row">
      <p className="text-slate-500">
        Page <strong className="text-slate-900">{page}</strong> of{" "}
        <strong className="text-slate-900">{totalPages}</strong> · {total}{" "}
        results
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="rounded-lg border border-slate-300 px-3 py-2 font-medium disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
