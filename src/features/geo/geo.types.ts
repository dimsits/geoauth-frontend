// src/features/geo/geo.types.ts
//
// Canonical Geo domain types (DTOs and app-facing shapes).
// Keep this file pure: types/interfaces only.

export type GeoSource = "ipinfo";

export type GeoSnapshot = {
  ip: string;

  asn: string | null;
  as_name: string | null;
  as_domain: string | null;

  country: string | null;
  country_code: string | null;

  continent: string | null;
  continent_code: string | null;
};

export type GeoResponse = {
  geo: GeoSnapshot | null;
};
