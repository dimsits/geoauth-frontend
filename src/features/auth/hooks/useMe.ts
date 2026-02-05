import { useQuery } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { me } from "../../../api/auth.api";
import { getToken } from "../auth.storage";
import { authKeys } from "../auth.keys";

/**
 * Canonical query key for the current authenticated user.
 * Must match the key used by useLogin.
 */
export const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

/**
 * Fetch the currently authenticated user.
 *
 * - Enabled only when a token exists
 * - Returns the user object (not the full API envelope)
 * - Errors are normalized by http.ts -> AppError
 */
export function useMe() {
  const hasToken = Boolean(getToken());

  return useQuery<
    Awaited<ReturnType<typeof me>>["user"],
    AppError
  >({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await me();
      return res.user;
    },
    enabled: hasToken,
    staleTime: 60_000, // 1 minute; adjust if needed
  });
}
