// src/app/routes/RequireAuth.tsx
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../providers/AuthProvider";

type RequireAuthProps = PropsWithChildren<{
  /**
   * Where to send users who are not authenticated.
   */
  redirectTo?: string;
}>;

/**
 * App-layer auth guard.
 * - Blocks access when not authenticated
 * - Prevents route flashes while auth is bootstrapping
 */
export default function RequireAuth({
  children,
  redirectTo = "/login",
}: RequireAuthProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-4">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
