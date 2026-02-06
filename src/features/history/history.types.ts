// Canonical History domain types (DTOs + app-facing shapes).
// Keep this file pure: types/interfaces only.

import type { GeoSnapshot } from "../geo/geo.types";

/**
 * A single persisted search history record owned by the authenticated user.
 *
 * Notes:
 * - `geo` is a stored snapshot from the time of search and may be null
 *   (e.g., private IP or resolver failure).
 * - `createdAt` is an ISO timestamp string from the backend.
 */
export type HistoryRecord = {
  id: string; // uuid
  ip: string;
  geo: GeoSnapshot | null;
  createdAt: string; // ISO timestamp
};

/**
 * GET /api/history?limit=<number>
 */
export type HistoryListResponse = {
  items: HistoryRecord[];
};

/**
 * POST /api/history/search
 * Body: { ip: string }
 * Response: { geo: GeoSnapshot | null }
 */
export type HistorySearchRequest = {
  ip: string;
};

export type HistorySearchResponse = {
  geo: GeoSnapshot | null;
};

/**
 * DELETE /api/history
 * Body: { ids: string[] }
 * Response: { deleted: number }
 */
export type HistoryDeleteRequest = {
  ids: string[]; // UUIDs
};

export type HistoryDeleteResponse = {
  deleted: number;
};
