import RequireAuth from "./RequireAuth";
import HomePage from "../../features/geo/pages/HomePage";

/**
 * Protected Home route.
 */
export const HomeRoute = {
  path: "/",
  element: (
    <RequireAuth>
      <HomePage />
    </RequireAuth>
  ),
};
