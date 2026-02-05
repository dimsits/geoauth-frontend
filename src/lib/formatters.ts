// src/lib/formatters.ts

/**
 * Joins location parts into a readable string.
 * Falls back to "Unknown location" if all parts are missing.
 */
export function formatLocation(
  city?: string | null,
  region?: string | null,
  country?: string | null
): string {
  const parts = [city, region, country]
    .map(part => (typeof part === "string" ? part.trim() : ""))
    .filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "Unknown location";
}

/**
 * Formats latitude/longitude into a concise string.
 * Returns "—" when coordinates are unavailable.
 */
export function formatCoords(
  latitude?: number | null,
  longitude?: number | null,
  decimals: number = 4
): string {
  if (
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    Number.isNaN(latitude) ||
    Number.isNaN(longitude)
  ) {
    return "—";
  }

  const lat = latitude.toFixed(decimals);
  const lng = longitude.toFixed(decimals);

  return `${lat}, ${lng}`;
}

/**
 * Formats an ISO timestamp into a human-readable date/time string
 * using the user's locale.
 */
export function formatDateTime(iso: string): string {
  if (!iso) return "—";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Truncates a string to a maximum length and appends an ellipsis if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Formats organization / ISP names.
 * Falls back to "Unknown ISP" when missing.
 */
export function formatOrg(org?: string | null): string {
  if (typeof org !== "string" || org.trim() === "") {
    return "Unknown ISP";
  }

  return org.trim();
}
