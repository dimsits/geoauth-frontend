/**
 * Centralized environment variable access.
 * No other file should read import.meta.env directly.
 */

/**
 * Reads a raw environment variable from Vite.
 */
function readEnv(key: string): string | undefined {
  return import.meta.env[key];
}

/**
 * Ensures a required environment variable exists.
 * Throws a descriptive error if missing.
 */
function requireEnv(key: string): string {
  const value = readEnv(key);

  if (!value || value.trim() === "") {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
      `Define it in your .env file or deployment environment.`
    );
  }

  return value;
}

/**
 * Normalizes a base URL by removing trailing slashes.
 */
function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

/**
 * Returns the backend API base URL.
 * Example: https://geoauth-api.onrender.com
 */
export function getApiBaseUrl(): string {
  const rawUrl = requireEnv("VITE_API_BASE_URL");
  return normalizeBaseUrl(rawUrl);
}

