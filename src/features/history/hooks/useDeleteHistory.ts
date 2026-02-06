import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { deleteHistory } from "../../../api/history.api";
import { historyKeys } from "../history.keys";
import type { HistoryDeleteResponse } from "../history.types";

type DeleteHistoryVariables = {
  ids: string[];
};

/**
 * Delete history records (bulk).
 *
 * - Calls DELETE /api/history with { ids }
 * - Invalidates history list queries on success
 * - Errors are normalized by http.ts -> AppError
 */
export function useDeleteHistory() {
  const queryClient = useQueryClient();

  return useMutation<HistoryDeleteResponse, AppError, DeleteHistoryVariables>({
    mutationFn: async ({ ids }) => {
      // Defensive: avoid sending empty payloads
      const safeIds = ids.filter((x) => typeof x === "string" && x.trim() !== "");
      return deleteHistory(safeIds);
    },

    onSuccess: async () => {
      // Refresh list(s) regardless of which limit was used
      await queryClient.invalidateQueries({ queryKey: historyKeys.lists() });
    },
  });
}
