import { useEffect, useState } from "react";
import { fetchCalls } from "../services/callsApi";
import type { CallRecord } from "../types/call";
export function useCalls() {
  const [data, setData] = useState<CallRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchCalls(controller.signal)
      .then(setData)
      .catch((e) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setError(e instanceof Error ? e.message : "Something went wrong.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retryKey]);
  return { data, loading, error, retry: () => setRetryKey((v) => v + 1) };
}
