// Centralized React Query keys for the History feature.

export const historyKeys = {
  /**
   * Base namespace for all history-related queries.
   */
  all: () => ["history"] as const,

  /**
   * History list queries.
   * Optionally parameterized by limit.
   */
  lists: () => [...historyKeys.all(), "list"] as const,

  list: (limit?: number) =>
    limit !== undefined
      ? [...historyKeys.lists(), { limit }] as const
      : [...historyKeys.lists()] as const,

  /**
   * Individual history item.
   */
  items: () => [...historyKeys.all(), "item"] as const,

  item: (id: string) => [...historyKeys.items(), id] as const,

  /**
   * IP search (used if search results are cached).
   */
  searches: () => [...historyKeys.all(), "search"] as const,

  search: (ip: string) => [...historyKeys.searches(), ip] as const,
};
