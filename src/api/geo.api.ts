// src/api/geo.api.ts
import { http } from "./http";
import type { GeoResponse } from "../features/geo/geo.types";

/**
 * GET /api/geo/self
 * Returns geolocation info for the client's IP (requires Authorization header).
 */
export async function getSelfGeo(): Promise<GeoResponse> {
  const res = await http.get<GeoResponse>("/api/geo/self");
  return res.data;
}

/**
 * GET /api/geo/:ip
 * Returns geolocation info for a specific IP (requires Authorization header).
 *
 * NOTE: This function does not validate IP format.
 * Validate in lib/validators.ts or the calling feature layer for better UX.
 */
export async function getGeoForIp(ip: string): Promise<GeoResponse> {
  const safeIp = encodeURIComponent(ip.trim());
  const res = await http.get<GeoResponse>(`/api/geo/${safeIp}`);
  return res.data;
}
