import RequireAuth from "./RequireAuth";
import HistoryPage from "../../features/history/pages/HistoryPage";

/**
 * Protected History route.
 */
export const HistoryRoute = {
  path: "/history",
  element: (
    <RequireAuth>
      <HistoryPage />
    </RequireAuth>
  ),
};
