import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { searchIp } from "../../../api/history.api";
import { historyKeys } from "../history.keys";
import type { HistorySearchResponse } from "../history.types";

type SearchIpVariables = {
  ip: string;
};

/**
 * Search an IP via backend geo resolver and record a history row (best-effort).
 *
 * - Calls POST /api/history/search with { ip }
 * - Invalidates history list queries on success so the new entry appears
 * - Returns { geo } so UI can render the search result immediately
 * - Errors are normalized by http.ts -> AppError
 */
export function useSearchIp() {
  const queryClient = useQueryClient();

  return useMutation<HistorySearchResponse, AppError, SearchIpVariables>({
    mutationFn: async ({ ip }) => {
      const safeIp = ip.trim();
      if (!safeIp) {
        // Throwing Error is fine; http.ts normalization is for Axios errors.
        throw new Error("IP address is required.");
      }
      return searchIp(safeIp);
    },

    onSuccess: async () => {
      // Backend writes a new history entry; refresh all history lists
      await queryClient.invalidateQueries({ queryKey: historyKeys.lists() });
    },
  });
}
