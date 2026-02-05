import axios from "axios";
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
 * Usually: { error: string, code?: string, details?: any }
 * Sometimes: { message: string, code?: string, details?: any }
 */
type ApiErrorEnvelope = {
  error?: unknown;
  message?: unknown;
  code?: unknown;
  details?: unknown;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asEnvelope(data: unknown): ApiErrorEnvelope | undefined {
  return isObject(data) ? (data as ApiErrorEnvelope) : undefined;
}

function pickString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== "" ? value : undefined;
}

function extractMessageFromEnvelope(env: ApiErrorEnvelope): string | undefined {
  // Prefer { error } but accept { message } as common alternative
  return pickString(env.error) ?? pickString(env.message);
}

function extractCodeFromEnvelope(env: ApiErrorEnvelope): string | undefined {
  return typeof env.code === "string" ? env.code : undefined;
}

function isTimeoutAxiosError(err: AxiosError): boolean {
  // Axios: ECONNABORTED is common for timeouts; also allow ERR_NETWORK-ish codes
  const code = (err as unknown as { code?: unknown }).code;
  return code === "ECONNABORTED";
}

/**
 * Convert an unknown thrown value into a stable AppError.
 * No side effects. No routing. No logout.
 */
export function toAppError(err: unknown): AppError {
  // 1) Axios error (most common in API calls)
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;

    const env = asEnvelope(data);
    const msgFromEnv = env ? extractMessageFromEnvelope(env) : undefined;
    const codeFromEnv = env ? extractCodeFromEnvelope(env) : undefined;
    const detailsFromEnv = env ? env.details : undefined;

    // Network / no response (CORS/down/offline)
    if (!err.response) {
      return {
        message: isTimeoutAxiosError(err)
          ? "Request timed out. Please try again."
          : "Network error. Please check your connection and try again.",
        status: undefined,
        code: undefined,
        details: undefined,
        raw: err,
      };
    }

    // Response exists
    return {
      message: msgFromEnv ?? err.message ?? "Request failed.",
      status,
      code: codeFromEnv,
      // Prefer envelope.details; otherwise keep raw data for debugging
      details: detailsFromEnv ?? data,
      raw: err,
    };
  }

  // 2) Normal Error instance
  if (err instanceof Error) {
    return {
      message: pickString(err.message) ?? "Something went wrong.",
      raw: err,
    };
  }

  // 3) String thrown or other primitives
  if (typeof err === "string") {
    return {
      message: pickString(err) ?? "Something went wrong.",
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

  const validationCodes = new Set([
    "VALIDATION_ERROR",
    "INVALID_EMAIL",
    "INVALID_PASSWORD",
    "INVALID_IP",
    "INVALID_JSON",
  ]);

  return typeof e.code === "string" && validationCodes.has(e.code);
}
