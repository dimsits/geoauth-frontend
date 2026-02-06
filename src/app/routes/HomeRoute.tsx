import RequireAuth from "./RequireAuth";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../../features/geo/pages/HomePage";

/**
 * Protected Home route.
 */
export const HomeRoute = {
  path: "/",
  element: (
    <RequireAuth>
        <AppLayout>
            <HomePage />
        </AppLayout>
    </RequireAuth>
  ),
};
