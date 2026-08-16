import type { FilterState } from "../types/call";
export const PAGE_SIZE = 20;
export const DEFAULT_FILTERS: FilterState = {
  agents: [],
  outcomes: [],
  from: "",
  to: "",
  minDuration: "",
  maxDuration: "",
  search: "",
  page: 1,
  sort: "timestamp",
  direction: "desc",
};
export const OUTCOME_LABELS = {
  qualified: "Qualified",
  callback: "Callback",
  rejected: "Rejected",
  no_answer: "No answer",
} as const;
