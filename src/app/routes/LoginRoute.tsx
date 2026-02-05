import LoginPage from "../../features/auth/pages/LoginPage";

/**
 * Route module for the login screen.
 * Guard/redirect behavior is handled inside LoginPage (auth-aware).
 */
export const LoginRoute = {
  path: "/login",
  element: <LoginPage />,
};
