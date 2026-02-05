// Centralized React Query keys for the auth domain.
// Always use these helpers instead of hardcoding arrays.

export const authKeys = {
  all: ["auth"] as const,

  /**
   * Current authenticated user (/me)
   */
  me: () => [...authKeys.all, "me"] as const,
};
