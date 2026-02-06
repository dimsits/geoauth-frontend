import { http } from "./http";
import type {
  HistorySearchRequest,
  HistorySearchResponse,
  HistoryListResponse,
  HistoryDeleteRequest,
  HistoryDeleteResponse,
} from "../features/history/history.types";

/**
 * POST /api/history/search
 * Resolves an IP via the backend geo service and records a history row (best-effort).
 */
export async function searchIp(ip: string): Promise<HistorySearchResponse> {
  const payload: HistorySearchRequest = { ip: ip.trim() };
  const res = await http.post<HistorySearchResponse>("/api/history/search", payload);
  return res.data;
}

/**
 * GET /api/history
 * Fetches the current user's history records, ordered by createdAt desc (backend behavior).
 */
export async function getHistory(limit?: number): Promise<HistoryListResponse> {
  const res = await http.get<HistoryListResponse>("/api/history", {
    params: typeof limit === "number" ? { limit } : undefined,
  });
  return res.data;
}

/**
 * DELETE /api/history
 * Bulk deletes history rows by id (only those belonging to the current user).
 */
export async function deleteHistory(ids: string[]): Promise<HistoryDeleteResponse> {
  const payload: HistoryDeleteRequest = { ids };
  const res = await http.delete<HistoryDeleteResponse>("/api/history", { data: payload });
  return res.data;
}
