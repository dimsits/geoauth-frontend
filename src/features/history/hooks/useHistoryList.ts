import { useQuery } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { getHistory } from "../../../api/history.api";
import { historyKeys } from "../history.keys";
import type { HistoryRecord } from "../history.types";
import { getToken } from "../../auth/auth.storage";

type UseHistoryListOptions = {
  /**
   * Optional limit passed to GET /api/history?limit=
   * If omitted, backend default is used.
   */
  limit?: number;

  /**
   * Override auto-fetch behavior (default: true).
   * Useful for conditional screens or manual refetch patterns.
   */
  enabled?: boolean;
};

/**
 * Fetch the authenticated user's search history.
 *
 * - Enabled only when an auth token exists
 * - Returns items (HistoryRecord[]) for UI convenience
 * - Errors are normalized by http.ts -> AppError
 */
export function useHistoryList(options: UseHistoryListOptions = {}) {
  const hasToken = Boolean(getToken());
  const enabled = options.enabled ?? true;
  const limit = options.limit;

  return useQuery<HistoryRecord[], AppError>({
    queryKey: historyKeys.list(limit),
    queryFn: async () => {
      const res = await getHistory(limit);
      return res.items;
    },
    enabled: enabled && hasToken,
    staleTime: 30_000, // 30s; history can change after searches/deletes
  });
}
