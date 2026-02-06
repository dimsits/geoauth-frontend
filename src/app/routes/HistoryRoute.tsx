import RequireAuth from "./RequireAuth";
import AppLayout from "../layouts/AppLayout";
import HistoryPage from "../../features/history/pages/HistoryPage";

/**
 * Protected History route.
 */
export const HistoryRoute = {
  path: "/history",
  element: (
    <RequireAuth>
        <AppLayout>
            <HistoryPage />
        </AppLayout>
    </RequireAuth>
  ),
};
