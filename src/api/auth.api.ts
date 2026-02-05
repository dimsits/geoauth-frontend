import { http } from "./http";
import type { LoginRequest, LoginResponse, MeResponse } from "../features/auth/auth.types";

/**
 * POST /api/login
 * Authenticates a user and returns a JWT token.
 */
export async function login(payload: LoginRequest): Promise<LoginResponse> {
  const res = await http.post<LoginResponse>("/api/login", payload);
  return res.data;
}

/**
 * GET /api/me
 * Returns the currently authenticated user (requires Authorization header).
 */
export async function me(): Promise<MeResponse> {
  const res = await http.get<MeResponse>("/api/me");
  return res.data;
}
