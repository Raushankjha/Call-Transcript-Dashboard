import type { CallRecord } from "../types/call";
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;
const isCall = (v: unknown): v is CallRecord =>
  isRecord(v) &&
  typeof v.id === "string" &&
  typeof v.agent === "string" &&
  typeof v.duration === "number" &&
  typeof v.timestamp === "string" &&
  ["qualified", "callback", "rejected", "no_answer"].includes(
    String(v.outcome),
  ) &&
  (typeof v.sentiment === "number" || v.sentiment === null) &&
  typeof v.transcript === "string";
export async function fetchCalls(signal?: AbortSignal): Promise<CallRecord[]> {
  const response = await fetch("/data/calls.json", { signal });
  if (!response.ok)
    throw new Error(`Unable to load calls (${response.status})`);
  const payload: unknown = await response.json();
  if (!Array.isArray(payload))
    throw new Error("Call feed has an invalid format.");
  const valid = payload.filter(isCall);
  if (!valid.length && payload.length)
    throw new Error("No valid call records were found.");
  return valid;
}
