import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../../app/providers/AuthProvider";
import LoginForm from "../components/loginForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // While bootstrapping session (/me), avoid flashing the login page
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-3xl p-4">
          <p className="text-sm text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-2">
          <h1 className="text-3xl font-bold">Sign in</h1>
          <p className="text-sm text-muted">
            Enter your credentials to access GeoAuth.
          </p>
        </div>

        <div className="mt-4 w-full max-w-md">
          <LoginForm onSuccess={() => navigate("/", { replace: true })} />
        </div>
      </div>
    </div>
  );
}
