import type { AxiosError } from "axios";

export type AppError = {
  /** UI-safe message (always present) */
  message: string;
  /** HTTP status code when available */
  status?: number;
  /** Backend error code when available (e.g. INVALID_CREDENTIALS) */
  code?: string;
  /** Optional extra data from backend */
  details?: unknown;
  /** Original thrown value (useful for logging in dev) */
  raw?: unknown;
};

/**
 * Backend error envelope (GeoAuth API convention)
 * { error: string, code?: string, details?: any }
 */
type ApiErrorEnvelope = {
  error?: unknown;
  code?: unknown;
  details?: unknown;
};

/**
 * Type guard for Axios errors.
 */
function isAxiosError(err: unknown): err is AxiosError {
  return typeof err === "object" && err !== null && (err as any).isAxiosError === true;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/**
 * Convert an unknown thrown value into a stable AppError.
 * No side effects. No routing. No logout.
 */
export function toAppError(err: unknown): AppError {
  // 1) Axios error (most common in API calls)
  if (isAxiosError(err)) {
    const status = err.response?.status;

    // A) Backend responded with JSON body (possibly our envelope)
    const data = err.response?.data;

    if (isObject(data)) {
      const envelope = data as ApiErrorEnvelope;

      const message =
        typeof envelope.error === "string" && envelope.error.trim() !== ""
          ? envelope.error
          : err.message || "Request failed.";

      const code = typeof envelope.code === "string" ? envelope.code : undefined;

      return {
        message,
        status,
        code,
        details: envelope.details,
        raw: err,
      };
    }

    // B) No response data (network/CORS/down)
    if (!err.response) {
      // Axios uses err.code like 'ERR_NETWORK', 'ECONNABORTED' etc.
      const isTimeout = (err as any).code === "ECONNABORTED";
      return {
        message: isTimeout
          ? "Request timed out. Please try again."
          : "Network error. Please check your connection and try again.",
        status: undefined,
        code: undefined,
        details: undefined,
        raw: err,
      };
    }

    // C) Response exists but data is not our envelope (string, html, etc.)
    return {
      message: err.message || "Request failed.",
      status,
      code: undefined,
      details: data,
      raw: err,
    };
  }

  // 2) Normal Error instance
  if (err instanceof Error) {
    return {
      message: err.message || "Something went wrong.",
      raw: err,
    };
  }

  // 3) String thrown or other primitives
  if (typeof err === "string") {
    return {
      message: err.trim() !== "" ? err : "Something went wrong.",
      raw: err,
    };
  }

  // 4) Fallback
  return {
    message: "Something went wrong.",
    raw: err,
  };
}

/**
 * True if the error indicates the user is unauthorized (expired/invalid token).
 */
export function isUnauthorized(err: unknown): boolean {
  const e = toAppError(err);
  return e.status === 401 || e.code === "UNAUTHORIZED";
}

/**
 * Convenience: UI-safe message extraction.
 */
export function getUserMessage(err: unknown): string {
  return toAppError(err).message;
}

/**
 * Optional: identify common validation failures.
 * Useful for inline form messages and conditional UI behavior.
 */
export function isValidationError(err: unknown): boolean {
  const e = toAppError(err);
  if (e.status === 400) return true;

  // GeoAuth-specific validation codes (expand only if you actually branch on these)
  const validationCodes = new Set([
    "VALIDATION_ERROR",
    "INVALID_EMAIL",
    "INVALID_PASSWORD",
    "INVALID_IP",
    "INVALID_JSON",
  ]);

  return typeof e.code === "string" && validationCodes.has(e.code);
}
