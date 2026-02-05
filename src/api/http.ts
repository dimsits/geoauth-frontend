// src/api/http.ts
import axios from "axios";
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getApiBaseUrl } from "../lib/env";
import { getToken } from "../features/auth/auth.storage";
import { toAppError } from "../lib/errors";

/**
 * Axios client used across the app.
 * Only this module configures Axios. All other API modules import `http`.
 */
export const http: AxiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Avoid hanging requests forever (tune as desired)
  timeout: 15_000,
});

/**
 * Request interceptor: attach Bearer token if present.
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => Promise.reject(toAppError(error)),
);

/**
 * Response interceptor: keep Axios' default behavior of returning the full response
 * (not response.data) so API wrappers remain explicit and typed.
 *
 * Normalize all errors into AppError via `toAppError`.
 */
http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => Promise.reject(toAppError(error)),
);
