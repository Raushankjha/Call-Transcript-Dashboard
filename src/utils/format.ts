export const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m ? `${m}m ${s}s` : `${s}s`;
};
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
export const sentimentLabel = (v: number | null) =>
  v === null
    ? "Unknown"
    : v >= 0.35
      ? "Positive"
      : v <= -0.2
        ? "Negative"
        : "Neutral";
