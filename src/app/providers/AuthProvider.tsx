import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import type { AppError } from "../../lib/errors";
import { isUnauthorized } from "../../lib/errors";

import { clearToken, getToken } from "../../features/auth/auth.storage";
import { useMe } from "../../features/auth/hooks/useMe";
import type { AuthUser } from "../../features/auth/auth.types";

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
  const [error, setError] = useState<AppError | null>(null);

  /**
   * Session bootstrap via React Query.
   * Enabled only when a token exists.
   */
  const meQuery = useMe();

  /**
   * Sync provider state with /me query results.
   */
  useEffect(() => {
    if (meQuery.data) {
      setUser(meQuery.data);
      setError(null);
      return;
    }

    if (meQuery.error) {
      setError(meQuery.error);

      // Invalid / expired token → clear session
      if (isUnauthorized(meQuery.error)) {
        clearToken();
        setUser(null);
      }
    }
  }, [meQuery.data, meQuery.error]);

  /**
   * Logout action exposed to consumers.
   */
  const logout = () => {
    clearToken();
    setUser(null);
    setError(null);
  };

  const value = useMemo<AuthContextValue>(() => {
    const hasToken = Boolean(getToken());

    return {
      user,
      isAuthenticated: Boolean(hasToken && user),
      isLoading: hasToken && meQuery.isLoading,
      error,

      setUser,
      logout,
    };
  }, [user, meQuery.isLoading, error]);

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
