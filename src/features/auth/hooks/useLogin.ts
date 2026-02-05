import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { login, type LoginRequest, type LoginResponse, me } from "../../../api/auth.api";
import { setToken } from "../auth.storage";
import { authKeys } from "../auth.keys";

// Query key for the current session/user
export const AUTH_ME_QUERY_KEY = ["auth", "me"] as const;

/**
 * Login mutation:
 * - calls POST /api/login
 * - persists token
 * - refreshes the "me" query so the app can bootstrap user state
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AppError, LoginRequest>({
    mutationFn: (payload) => login(payload),

    onSuccess: async (data) => {
      // 1) Persist token immediately so http.ts can attach it
      setToken(data.token);

      /**
       * 2) Refresh session:
       * - populate cache with /api/me (best for immediate app auth state)
       * - if it fails, it will surface through normal error flows later
       */
      await queryClient.invalidateQueries({ queryKey: authKeys.me() });

      // Optional: eagerly fetch /me so UI can react immediately.
      // If you prefer to avoid eager fetch, remove this block.
      await queryClient.fetchQuery({
        queryKey: AUTH_ME_QUERY_KEY,
        queryFn: async () => (await me()).user,
      });
    },
  });
}
