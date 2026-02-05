import { http } from "./http";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type MeResponse = {
  user: {
    id: string;
    email: string;
    createdAt?: string;
  };
};

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
