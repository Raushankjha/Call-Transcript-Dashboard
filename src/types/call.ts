export const OUTCOMES = [
  "qualified",
  "callback",
  "rejected",
  "no_answer",
] as const;
export type Outcome = (typeof OUTCOMES)[number];
export interface CallRecord {
  id: string;
  agent: string;
  duration: number;
  timestamp: string;
  outcome: Outcome;
  sentiment: number | null;
  transcript: string;
}
export type SortKey =
  | "agent"
  | "duration"
  | "timestamp"
  | "outcome"
  | "sentiment";
export type SortDirection = "asc" | "desc";
export interface FilterState {
  agents: string[];
  outcomes: Outcome[];
  from: string;
  to: string;
  minDuration: string;
  maxDuration: string;
  search: string;
  page: number;
  sort: SortKey;
  direction: SortDirection;
}
