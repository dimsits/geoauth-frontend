// src/features/geo/geo.types.ts
//
// Canonical Geo domain types (DTOs and app-facing shapes).
// Keep this file pure: types/interfaces only.

export type GeoSource = "ipinfo";

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

  source: GeoSource;
  resolvedAt: string; // ISO timestamp
};

export type GeoResponse = {
  geo: GeoSnapshot | null;
};
