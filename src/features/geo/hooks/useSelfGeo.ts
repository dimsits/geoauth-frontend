import { useQuery } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { getSelfGeo } from "../../../api/geo.api";
import { geoKeys } from "../geo.keys";
import type { GeoSnapshot } from "../geo.types";
import { getToken } from "../../auth/auth.storage";

/**
 * Fetch geolocation info for the currently authenticated user's IP.
 *
 * - Enabled only when an auth token exists
 * - Returns `null` if geo cannot be resolved (valid state)
 * - Errors are normalized by http.ts -> AppError
 */
export function useSelfGeo() {
  const hasToken = Boolean(getToken());

  return useQuery<GeoSnapshot | null, AppError>({
    queryKey: geoKeys.self(),
    queryFn: async () => {
      const res = await getSelfGeo();
      return res.geo;
    },
    enabled: hasToken,
    staleTime: 60_000, // 1 minute
  });
}
