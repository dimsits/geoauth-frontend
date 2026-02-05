import { http } from "./http";
import type { GeoSnapshot } from "./geo.api";

export type HistoryItem = {
  id: string;
  ip: string;
  geo: GeoSnapshot | null;
  createdAt: string; // ISO timestamp
};

export type SearchHistoryRequest = {
  ip: string;
};

export type SearchHistoryResponse = {
  geo: GeoSnapshot | null;
};

export type GetHistoryResponse = {
  items: HistoryItem[];
};

export type DeleteHistoryRequest = {
  ids: string[];
};

export type DeleteHistoryResponse = {
  deleted: number;
};

/**
 * POST /api/history/search
 * Resolves an IP via the backend geo service and records a history row (best-effort).
 */
export async function searchIp(ip: string): Promise<SearchHistoryResponse> {
  const payload: SearchHistoryRequest = { ip: ip.trim() };
  const res = await http.post<SearchHistoryResponse>("/api/history/search", payload);
  return res.data;
}

/**
 * GET /api/history
 * Fetches the current user's history records, ordered by createdAt desc (backend behavior).
 */
export async function getHistory(limit?: number): Promise<GetHistoryResponse> {
  const res = await http.get<GetHistoryResponse>("/api/history", {
    params: typeof limit === "number" ? { limit } : undefined,
  });
  return res.data;
}

/**
 * DELETE /api/history
 * Bulk deletes history rows by id (only those belonging to the current user).
 */
export async function deleteHistory(ids: string[]): Promise<DeleteHistoryResponse> {
  const payload: DeleteHistoryRequest = { ids };
  const res = await http.delete<DeleteHistoryResponse>("/api/history", { data: payload });
  return res.data;
}
