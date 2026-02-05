import { http } from "./http";

export type GeoSnapshot = {
  ip: string;

  network: string | null;

  city: string | null;
  region: string | null;
  regionCode: string | null;

  country: string | null;
  countryCode: string | null;

  continent: string | null;
  continentCode: string | null;

  latitude: number | null;
  longitude: number | null;

  timezone: string | null;
  postalCode: string | null;

  source: "ipinfo";
  resolvedAt: string; // ISO timestamp
};

export type GeoResponse = {
  geo: GeoSnapshot | null;
};

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
