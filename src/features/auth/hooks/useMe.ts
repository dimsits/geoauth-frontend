import { useQuery } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { me } from "../../../api/auth.api";
import { getToken } from "../auth.storage";
import { authKeys } from "../auth.keys";
import type { AuthUser } from "../auth.types";

/**
 * Fetch the currently authenticated user.
 *
 * - Enabled only when a token exists
 * - Returns the user object (not the full API envelope)
 * - Errors are normalized by http.ts -> AppError
 */
export function useMe() {
  const hasToken = Boolean(getToken());

  return useQuery<AuthUser, AppError>({
    queryKey: authKeys.me(),
    queryFn: async () => (await me()).user,
    enabled: hasToken,
    staleTime: 60_000,
  });
}
