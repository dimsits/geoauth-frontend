// Centralized React Query keys for the geo domain.
// Always use these helpers instead of hardcoded arrays.

export const geoKeys = {
  all: ["geo"] as const,

  /**
   * Geo info for the currently authenticated user's IP.
   */
  self: () => [...geoKeys.all, "self"] as const,

  /**
   * Geo info for a specific IP search.
   */
  search: (ip: string) => [...geoKeys.all, "search", ip] as const,
};
