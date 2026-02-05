import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { login, me } from "../../../api/auth.api";
import { setToken } from "../auth.storage";
import { authKeys } from "../auth.keys";
import type { AuthUser, LoginRequest, LoginResponse } from "../auth.types";

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

      // 2) Refresh session cache so the app can bootstrap user state
      await queryClient.invalidateQueries({ queryKey: authKeys.me() });

      // Optional: eagerly fetch /me so UI can react immediately.
      // If you prefer to avoid eager fetch, remove this block.
      await queryClient.fetchQuery<AuthUser>({
        queryKey: authKeys.me(),
        queryFn: async () => (await me()).user,
      });
    },
  });
}
