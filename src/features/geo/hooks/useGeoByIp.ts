import { useQuery } from "@tanstack/react-query";

import type { AppError } from "../../../lib/errors";
import { getGeoForIp } from "../../../api/geo.api";
import { geoKeys } from "../geo.keys";
import type { GeoSnapshot } from "../geo.types";
import { getToken } from "../../auth/auth.storage";
import { isValidIp } from "../../../lib/validators";

type UseGeoByIpOptions = {
  /**
   * Disable auto-fetch (manual mode).
   * Useful if you only want to fetch on form submit.
   */
  enabled?: boolean;
};

/**
 * Fetch geolocation info for a specific IP.
 *
 * - Enabled only when:
 *   - auth token exists
 *   - ip is non-empty
 *   - ip is valid (IPv4/IPv6)
 * - Returns `null` if geo cannot be resolved (valid state)
 * - Errors are normalized by http.ts -> AppError
 */
export function useGeoByIp(ip: string, options: UseGeoByIpOptions = {}) {
  const hasToken = Boolean(getToken());
  const safeIp = ip.trim();

  const canFetch = hasToken && safeIp.length > 0 && isValidIp(safeIp);
  const enabled = options.enabled ?? true;

  return useQuery<GeoSnapshot | null, AppError>({
    queryKey: geoKeys.search(safeIp),
    queryFn: async () => {
      const res = await getGeoForIp(safeIp);
      return res.geo;
    },
    enabled: enabled && canFetch,
    staleTime: 60_000,
  });
}
