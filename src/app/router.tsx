import { createBrowserRouter } from "react-router-dom";

import { HomeRoute } from "./routes/HomeRoute";
import { LoginRoute } from "./routes/LoginRoute";
import { HistoryRoute } from "./routes/HistoryRoute";

/**
 * Central router registry.
 * Keep declarative: route objects only.
 */
export const router = createBrowserRouter([HomeRoute, LoginRoute, HistoryRoute]);
