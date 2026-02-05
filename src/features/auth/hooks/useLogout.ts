import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { clearToken } from "../auth.storage";
import { useAuth } from "../../../app/providers/AuthProvider";
import { AUTH_ME_QUERY_KEY } from "./useMe";

/**
 * Logout hook.
 *
 * Clears auth state, token storage, and cached data.
 * No navigation or UI side effects.
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { setUser } = useAuth();

  return useCallback(() => {
    // 1) Clear persisted auth
    clearToken();

    // 2) Reset in-memory auth state
    setUser(null);

    // 3) Clear auth-related cache
    queryClient.removeQueries({ queryKey: AUTH_ME_QUERY_KEY });

    // Optional: clear all cached data to avoid cross-user leakage
    queryClient.clear();
  }, [queryClient, setUser]);
}
