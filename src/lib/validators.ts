import validator from "validator";

/**
 * Checks whether a value is a non-empty string after trimming.
 * Acts as a basic "required field" validator.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Validates an email address.
 * Trims input before validation.
 */
export function isValidEmail(email: string): boolean {
  if (!isNonEmptyString(email)) return false;
  return validator.isEmail(email.trim());
}

/**
 * Validates an IPv4 or IPv6 address.
 * Trims input before validation.
 */
export function isValidIp(ip: string): boolean {
  if (!isNonEmptyString(ip)) return false;
  return validator.isIP(ip.trim());
}

/**
 * Validates a UUID string.
 * Defaults to accepting any UUID version.
 */
export function isValidUuid(id: string): boolean {
  if (!isNonEmptyString(id)) return false;
  return validator.isUUID(id.trim());
}

/**
 * Validates an array of UUIDs.
 * Useful for bulk delete payloads.
 */
export function areValidUuids(ids: unknown): ids is string[] {
  if (!Array.isArray(ids) || ids.length === 0) return false;
  return ids.every(id => typeof id === "string" && isValidUuid(id));
}

/**
 * Safely parses a numeric limit value.
 * Ensures a positive integer within bounds.
 */
export function parseLimit(
  input: unknown,
  options?: { defaultValue?: number; max?: number }
): number {
  const defaultValue = options?.defaultValue ?? 100;
  const max = options?.max ?? 100;

  if (typeof input !== "string" && typeof input !== "number") {
    return defaultValue;
  }

  const parsed = Number(input);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return Math.min(parsed, max);
}
