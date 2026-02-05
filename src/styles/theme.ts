// Global theme controller.
// - Single source of truth for light/dark mode
// - Persists user choice
// - Defaults to system preference
// - Applies by toggling <html class="dark">

const STORAGE_KEY = "geoauth-theme";

export type Theme = "light" | "dark";

/**
 * Resolve the preferred theme.
 * Priority:
 * 1) Explicit user choice (localStorage)
 * 2) System preference
 * 3) Light (fallback)
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

/**
 * Apply a theme by toggling the `dark` class on <html>
 * and persisting the choice.
 */
export function setTheme(theme: Theme): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem(STORAGE_KEY, theme);
}

/**
 * Toggle between light and dark themes.
 * Returns the newly applied theme.
 */
export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/**
 * Optional helper: clear stored preference and re-sync with system.
 * Useful for a "Use system theme" action.
 */
export function resetThemeToSystem(): Theme {
  localStorage.removeItem(STORAGE_KEY);
  const system = getTheme();
  setTheme(system);
  return system;
}
