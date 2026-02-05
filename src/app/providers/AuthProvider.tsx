import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { getToken, clearToken } from "./auth.storage";
import type { AppError } from "../../lib/errors";

/**
 * Minimal user shape.
 * Extend later if backend adds more fields.
 */
export type AuthUser = {
  id: string;
  email: string;
};

/**
 * Context value contract.
 * This is the *only* way the app should read auth state.
 */
type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AppError | null;

  setUser: (user: AuthUser | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  /**
   * Bootstrap auth state.
   * For now: token presence only.
   * Next step: replace with `useMe` query.
   */
  useEffect(() => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    /**
     * We intentionally do NOT fetch `/me` here yet.
     * That will be delegated to `useMe` (React Query).
     */
    setIsLoading(false);
  }, []);

  const logout = () => {
    clearToken();
    setUser(null);
    setError(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      error,
      setUser,
      logout,
    }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Typed consumer hook.
 * Throws early if used outside provider.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
