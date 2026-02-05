// src/features/auth/auth.storage.ts
//
// Centralized authentication storage utilities.
// This is the only place in the app that touches localStorage for auth.
// Keep this file small, synchronous, and side-effect free.

const STORAGE_KEY = "geoauth_token";

/**
 * Read the persisted auth token.
 * Returns null if not present or if storage is unavailable.
 */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Persist the auth token.
 */
export function setToken(token: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // Intentionally silent:
    // - storage quota issues
    // - private mode restrictions
  }
}

/**
 * Clear the persisted auth token.
 */
export function clearToken(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Intentionally silent
  }
}

/**
 * Convenience helper.
 */
export function hasToken(): boolean {
  return Boolean(getToken());
}
