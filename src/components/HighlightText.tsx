export function HighlightText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  const q = query.trim();
  if (!q) return <>{text}</>;
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLocaleLowerCase() === q.toLocaleLowerCase() ? (
          <mark key={i}>{p}</mark>
        ) : (
          p
        ),
      )}
    </>
  );
}
