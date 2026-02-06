import { createBrowserRouter } from "react-router-dom";

import { LoginRoute } from "./routes/LoginRoute";
import { HomeRoute } from "./routes/HomeRoute";
import { HistoryRoute } from "./routes/HistoryRoute";

/**
 * Central route registry for the app.
 * Keep this file declarative: route objects only.
 */
export const router = createBrowserRouter([
  HomeRoute,
  LoginRoute,
  HistoryRoute,
]);
